# Centralized Dashboard
**Repository:** [Centralized Dashboard](https://github.com/Institute-of-Automation-Research-Eng/Centralized_Dashboard)

---

A modular, full-stack web application for managing assets, monitoring threats, assessing vulnerabilities, and coordinating crisis responses—all from a single, centralized interface. Built with a React/Vite frontend and an Express/MongoDB backend, it enforces secure authentication flows and cleanly separates domain concerns for scalability and maintainability.

---

## Features
- **User Authentication & Security**  
  - Signup / Login / Logout flows  
  - OTP-based password reset via email  
  - Session management with secure cookies and MongoStore  
- **Asset Management**  
  - List, add, edit, and view risk history of assets  
  - Mock-data fallback when backend is unavailable  
- **Threat Intelligence**  
  - View and search current threat listings  
  - Predictive analysis module for upcoming threats  
- **Vulnerability Risk Assessment**  
  - Assess and score vulnerabilities using custom risk algorithms  
  - Generate reports and visual summaries  
- **Crisis Management**  
  - Report new crises with detailed forms  
  - View and track crisis status and history  
- **API Communication**  
  - Centralized endpoint configuration in `apiConfig.js`  
  - Axios-powered calls with error handling  

---

## Technologies Used
- **Frontend**  
  - React • Vite • react-router-dom • Axios  
  - Tailwind CSS (or your preferred CSS framework)  
- **Backend**  
  - Node.js • Express • MongoDB • Mongoose  
  - Nodemailer for email services  
  - express-session & connect-mongo for session persistence  
- **Build & Tooling**  
  - npm • ESLint • Prettier  
- **Deployment**  
  - (Optional) Heroku / Vercel / AWS EC2  

---

## Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Institute-of-Automation-Research-Eng/Centralized_Dashboard.git
   cd Centralized_Dashboard

2. **Install Dependencies
   ```bash
   npm install

3. **Start the Back End Development Server
   ```bash
   cd server
   npm run start

4. **Start the Front End Development Server
   ```bash
   cd client
    npm run dev

Happy coding! 
