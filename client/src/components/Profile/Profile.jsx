import Popup from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/utils/Popup.jsx';
import { useState, useEffect } from 'react';

const Profile = ({ 
    showProfilePopup, 
    setShowProfilePopup 
}) => {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    // Fetch user details from localStorage or an API
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail'); 
    const role = localStorage.getItem('userType');
    setUserDetails({ userName, email, role });
  }, []);

  if (!showProfilePopup) return null;

  return (
    <Popup>
      <>
        <h3>User Profile</h3>
        <div className="profile-details">
          <p><strong>Name: </strong> {userDetails.userName}</p>
          <p><strong>Email: </strong> {userDetails.email}</p>
          <p><strong>Role: </strong> {userDetails.role}</p>
        </div>
        <button onClick={() => setShowProfilePopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default Profile;
