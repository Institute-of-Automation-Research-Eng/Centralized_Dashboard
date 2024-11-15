const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./model/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,   

  },
});

const Otp = mongoose.model('Otp', new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  }));

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5174', // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Setting up the session middleware with MongoDB store
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key', // Use the session secret from environment variables or fallback to default
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI // Use MongoDB URI from environment variables
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day session cookie
}));

// Routes
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, userType });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = { id: user._id, name: user.name, email: user.email }; // Store user info in session
                res.json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            res.status(404).json("No user found with that email");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

app.get('/user', async (req, res) => {
    if (req.session.user) {
        try {
            // Fetch the user from the database using the ID stored in the session
            const user = await UserModel.findById(req.session.user.id);
            if (user) {
                // Send the user's name, email, and userType in the response
                res.json({
                    name: user.name,
                    email: user.email,
                    userType: user.userType // Include userType
                });
            } else {
                res.status(404).json("User not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(401).json("Not authenticated");
    }
});


app.post('/request-otp', async (req, res) => {
    const { email } = req.body;
  
    // Check if user exists in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Generate OTP (6-digit random number)
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
  
    // Store OTP in the database
    const otpRecord = new Otp({ email, otp, expiresAt });
    await otpRecord.save();
  
    // Send OTP to the user's email
    const mailOptions = {
        from: process.env.EMAIL,
        to: email, // recipient's email address
        subject: 'Centralized Dashboard: OTP for password reset',
        text: `Your OTP for password resetting is: ${otp}`, // OTP message format
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(mailOptions);
      
      return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }
  });

  app.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    // Find the OTP record in the database
    const otpRecord = await Otp.findOne({ email, otp });
  
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  
    // Check if the OTP has expired
    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
  
    // Proceed with password reset logic
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
  
    // Delete OTP record after successful password reset
    await Otp.deleteOne({ email, otp });
  
    return res.status(200).json({ message: 'Password reset successfully' });
  });

// Starting the server
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});