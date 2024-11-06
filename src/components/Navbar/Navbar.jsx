import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const userName = localStorage.getItem('userName'); // Retrieve user name from local storage

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <span className="navbar-title">Centralized Dashboard</span>
        <ul className="navbar-links">
          {location.pathname !== '/' && (
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