import { useState, useEffect } from 'react';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import axios from 'axios';
// import ResolveCrisisEvent from './ResolveCrisisEvent';
import NewCrisis from './NewCrisis';
import CrisisManagementDetails from './CrisisManagementDetails'; // Import CrisisDetails Component

import './CrisisManagementList.css';

const CrisisManagementList = () => {
  const [crisisEvents, setCrisisEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showCrisisPopup, setShowCrisisPopup] = useState(false);
  const [showNewCrisisPopup, setShowNewCrisisPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch crisis events on component mount
  useEffect(() => {
    fetchCrisisEvents();
  }, []);

  // Fetch crisis events from the API
  const fetchCrisisEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_PATHS.CRISIS_LIST);
      
      const sortedCrisisEvents = response.data.sort((a, b) => a.event_id - b.event_id);
      
      setCrisisEvents(sortedCrisisEvents);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching crisis events:', err);
      setError('Failed to fetch crisis events.');
      setLoading(false);
    }
  };

  const handleCrisisClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowCrisisPopup(true);
  };

  const handleNewCrisisClick = () => {
    setShowNewCrisisPopup(true);
  };

  const handleLogCrisis = (eventId) => {
    console.log(eventId);
    
  }

  if (loading) return <div>Loading crisis events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="crisis-management">
      <div className="crisis-header">
        <button className="add-crisis-button" onClick={handleNewCrisisClick}>
          New Crisis
        </button>
      </div>

      <table className="crisis-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crisisEvents.map((crisis) => (
            <tr
              key={crisis.event_id} // Use event_id as the key
              className="crisis-row"
              onClick={() => handleCrisisClick(crisis.event_id)} 
            >
              <td>{crisis.event_id}</td>
              <td>{crisis.title}</td>
              <td>{crisis.description}</td>
              <td>{new Date(crisis.timestamp).toLocaleString()}</td>
              <td>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering row click handler
                    handleLogCrisis(crisis.event_id); 
                  }} 
                  className="log-button" // Applying the class here
                >
                  Log
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Crisis Details Popup */}
      <CrisisManagementDetails 
        showCrisisPopup={showCrisisPopup} 
        eventId={selectedEventId} 
        setShowCrisisPopup={setShowCrisisPopup} 
      />
      
      {/* Log New Crisis Popup */}
      <NewCrisis 
        showNewCrisisPopup={showNewCrisisPopup} 
        setShowNewCrisisPopup={setShowNewCrisisPopup} 
        onNewCrisisSubmit={fetchCrisisEvents} 
      />
    </div>
  );
};

export default CrisisManagementList;