import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Profile from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/Profile/Profile.jsx'; // Import the Profile component

import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const userName = localStorage.getItem('userName');

  const handleLogoutClick = () => { 
    axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
      .then(() => {
        localStorage.clear();
        alert("Logout successful");
        navigate('/'); // Redirect to login page after successful logout
      })
      .catch(error => alert(error));
  };

  const allowedPaths = ['/home']; // List of paths where the list view should be visible

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <Link className="navbar-title" to="/">Centralized Dashboard</Link>
          <ul className="navbar-links">
            {allowedPaths.includes(location.pathname) && (
              <li>
                <i 
                  className="fas fa-user profile-icon"
                  onClick={() => setShowProfilePopup(true)} // Open the profile popup
                ></i>
                {userName && <span className="user-name">{userName}</span>} {/* Show user name */}
                <Link to="/" onClick={handleLogoutClick}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* Render Profile Popup */}
      {showProfilePopup && (
        <Profile 
          showProfilePopup={showProfilePopup} 
          setShowProfilePopup={setShowProfilePopup} 
        />
      )}
    </>
  );
};

export default Navbar;