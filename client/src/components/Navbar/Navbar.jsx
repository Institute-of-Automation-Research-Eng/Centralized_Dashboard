import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleLogoutClick = () => {
    localStorage.removeItem('userName'); // Remove the username from localStorage

    axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
      .then(response => {
        console.log(response.data); // "Logout successful"
        alert("Logout successful")
        navigate('/'); // Redirect to login page after successful logout
      })
      .catch(error => console.error("Logout error:", error));
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <span className="navbar-title">Centralized Dashboard</span>
        <ul className="navbar-links">
          {location.pathname !== '/' && location.pathname !== '/signup' && (
            <li>
              <i className="fas fa-user profile-icon"></i>
              {userName && <span className="user-name">{userName}</span>} {/* Show user name */}
              <Link to="/" onClick={handleLogoutClick}>Logout</Link>
            </li>
          )}
        </ul>        
      </div>
    </nav>
  );
};

export default Navbar;