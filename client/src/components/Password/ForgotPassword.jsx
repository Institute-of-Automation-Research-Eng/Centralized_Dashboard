import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
  const navigate = useNavigate();

  const displayError = (message) => alert(message || 'An unexpected error occurred');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (step === 1) {
        const response = await axios.post('http://localhost:3001/request-otp', { email });
        alert(response.data.message);
        setStep(2); // Proceed to next step
      } else if (step === 2) {
        if (!otp) {
          alert('Please enter the OTP');
          return;
        }

        const response = await axios.post('http://localhost:3001/reset-password', {
          email,
          otp,
          newPassword,
        });
        alert(response.data.message || 'Password reset successfully');
        navigate('/'); // Redirect to login
      }
    } catch (error) {
      displayError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      
      <form onSubmit={handleFormSubmit}>
        {step === 1 && (
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        
        {step === 2 && (
          <>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading}>
            {loading ? (step === 1 ? 'Sending OTP...' : 'Resetting...') : step === 1 ? 'Send OTP' : 'Reset Password'}
        </button>

        {/* back to Login Link */}
        <p className="login">
          <a 
            href="#"
            onClick={() => {
              navigate('/');
            }}
          >
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;