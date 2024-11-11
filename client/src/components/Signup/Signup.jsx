import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ userName: '', email: '', password: '', confirmPassword: '', general: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrors({ userName: '', email: '', password: '', confirmPassword: '', general: '' });

    // Validation
    if (!userName) setErrors((prev) => ({ ...prev, userName: 'Enter user name' }));
    if (!email) setErrors((prev) => ({ ...prev, email: 'Enter email' }));
    if (!password) setErrors((prev) => ({ ...prev, password: 'Enter password' }));
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    if (userName && email && password && password === confirmPassword) {
      setLoading(true);
      axios.post("http://localhost:3001/signup", { userName, email, password })
        .then(result => {
          if (result.status === 201) {
            localStorage.setItem('userName', userName);
            navigate("/home"); // Redirect to home page on successful signup
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 400) {
            setErrors((prev) => ({ ...prev, general: 'Email already exists. Use a different email.' }));
          } else {
            alert(err);
          }
        }).finally(() => {
          setLoading(false); // Set loading to false after the API call is complete
        });
    }
  };

  const navigateToLogin = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>SIGN UP</h1>

        {/* User Name Input */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            aria-label="Username"
          />
          {errors.userName && <span className="error">{errors.userName}</span>}
        </div>

        {/* Email Input */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Confirm Password Input */}
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm Password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

         {/* Show Password Checkbox */}
         <div className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((showPassword) => !showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {errors.general && <p className="general-error">{errors.general}</p>}

         {/* Login Link */}
         <p className="login-link">
          Have an account? <span onClick={navigateToLogin}>Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;