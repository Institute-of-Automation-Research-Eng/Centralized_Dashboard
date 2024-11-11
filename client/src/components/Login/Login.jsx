import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState(''); // State for user name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', userName: '', general: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({ email: '', password: '', userName: '', general: '' }); // Reset errors

    // Validation
    if (!userName) {
      setErrors((prev) => ({ ...prev, userName: 'Enter user name' }));
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Enter email' }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Enter password' }));
    }

    if (userName && email && password) {
      setLoading(true);
      axios.post("http://localhost:3001/login", { email, password }, { withCredentials: true })
        .then(result => {
          console.log(result);
          if (result.data === "Success") {
            axios.get('http://localhost:3001/user', { withCredentials: true })
              .then(response => {
                if (response.data.user) {
                  localStorage.setItem('userName', userName);
                  navigate("/home");
                }
              });
          } else {
            alert("Login failed");
          }
        })
        .catch(err => {
          // Check if the error is a response error and extract the message
          if (err.response) {
            // Extract error status and message
            const errorMessage = err.response.data || err.message;
            const statusCode = err.response.status;
    
            if (statusCode === 404) {
              alert("User not found. Please check your credentials.");
            } else if (statusCode === 401) {
              alert("Invalid password.");
            } else {
              alert("An error occurred: " + errorMessage);
            }
          } else {
            alert("Network error or server unreachable.");
          }
    
          console.error("Login error:", err);
        });
    
      setLoading(false);
    }    
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>LOGIN</h1>

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
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
        {errors.general && <p className="general-error">{errors.general}</p>}
        
        {/* Forgot Password Link */}
        <p className="forgot-password">
          <a 
            href="#"
            onClick={() => {
              navigate('/forgot-password');
            }}
          >
            Forgot Password?
          </a>
        </p>

        {/* Signup Link */}
        <p className="signup-link">
          Don't have an account? <span onClick={navigateToSignup}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;