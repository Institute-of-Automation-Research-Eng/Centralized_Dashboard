import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/users';
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

      // Simulate an async login operation
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        onLogin(); // Call the onLogin function
        localStorage.setItem('userName', userName); // Store user name
        navigate('/home');
      } else {
        setErrors((prev) => ({ ...prev, general: 'Enter valid details' }));
      }

      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>LOGIN</h1>

        {/* User Name Input */}
        <div className="form-group">
          <input
            type="text"
            placeholder="User Name"
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
            placeholder="Email"
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
            placeholder="Password"
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
      </form>
    </div>
  );
};

export default Login;