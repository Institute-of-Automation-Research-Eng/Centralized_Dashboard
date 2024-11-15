import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const userType = localStorage.getItem('userType');

  const handleLogoutClick = () => { 
    axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
      .then(() => {
        localStorage.clear();
        alert("Logout successful")
        navigate('/'); // Redirect to login page after successful logout
      })
      .catch(error => alert(error));
  };

  const allowedPaths = ['/home']; // List of paths where the list view should be visible

  return (
    <nav className="navbar">
      <div className="navbar-content">
      <Link  className="navbar-title" to="/">Centralized Dashboard</Link>

        <ul className="navbar-links">
          {allowedPaths.includes(location.pathname) && (
            <li>
              <i className="fas fa-user profile-icon"></i>
              {userName && <span className="user-name">{userName}</span>} {/* Show user name */}
              {userType === "admin" && <span className="user-type">( Admin )</span>}
              <Link to="/" onClick={handleLogoutClick}>Logout</Link>
            </li>
          )}
        </ul>        
      </div>
    </nav>
  );
};

export default Navbar;