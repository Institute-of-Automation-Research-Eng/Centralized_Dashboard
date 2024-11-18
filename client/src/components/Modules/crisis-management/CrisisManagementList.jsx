import { useState, useEffect } from 'react';
import ResolveCrisisEvent from './ResolveCrisisEvent';
import LogNewCrisis from './LogNewCrisis';

import './CrisisManagementList.css';
// import axios from 'axios';

// Remove later
const mockCrisisData = [
    { id: 1, description: 'Cyber Attack', impact: 'High', status: 'Ongoing' },
    { id: 2, description: 'Flood in Data Center', impact: 'Medium', status: 'Ongoing' },
    { id: 3, description: 'Power Outage', impact: 'High', status: 'Resolved' },
    { id: 4, description: 'Fire in Server Room', impact: 'Critical', status: 'Ongoing' },
    { id: 5, description: 'Network Failure', impact: 'High', status: 'Open' },
    { id: 6, description: 'Hardware Malfunction', impact: 'Medium', status: 'Resolved' },
    { id: 7, description: 'Ransomware Attack', impact: 'Critical', status: 'Ongoing' },
    { id: 8, description: 'Data Leak', impact: 'High', status: 'Resolved' },
    { id: 9, description: 'Social Engineering Attack', impact: 'Low', status: 'Ongoing' },
    { id: 10, description: 'Denial of Service Attack', impact: 'High', status: 'Open' }
  ];

const CrisisManagementList = () => {
  const [crisisEvents, setCrisisEvents] = useState([]);
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const [showCrisisPopup, setShowCrisisPopup] = useState(false);
  const [showLogNewCrisisPopup, setShowLogNewCrisisPopup] = useState(false);
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
      // const response = await axios.get('/api/crisis_events');
      const response = { data: mockCrisisData }; // Mocked response for now
      setCrisisEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching crisis events:', err);
      setError('Failed to fetch crisis events.');
      setLoading(false);
    }
  };

  const handleCrisisClick = (crisis) => {
    setSelectedCrisis(crisis);
    setShowCrisisPopup(true);
  };

  const handleLogNewCrisisClick = () => {
    setShowLogNewCrisisPopup(true);
  };

  if (loading) return <div>Loading crisis events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="crisis-management">
      <div className="crisis-header">
        <button className="add-crisis-button" onClick={handleLogNewCrisisClick}>
          Log New Crisis
        </button>
      </div>

      <table className="crisis-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Impact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {crisisEvents.map((crisis) => (
            <tr
              key={crisis.id}
              className="crisis-row"
              onClick={() => handleCrisisClick(crisis)}
            >
              <td>{crisis.id}</td>
              <td>{crisis.description}</td>
              <td>{crisis.impact}</td>
              <td>{crisis.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Crisis Details Popup */}
      <ResolveCrisisEvent 
        showCrisisPopup={showCrisisPopup} 
        selectedCrisis={selectedCrisis} 
        setShowCrisisPopup={setShowCrisisPopup} 
        onResolveCrisisSubmit={fetchCrisisEvents}
      />
      
      {/* Log New Crisis Popup */}
      <LogNewCrisis 
        showLogNewCrisisPopup={showLogNewCrisisPopup} 
        setShowLogNewCrisisPopup={setShowLogNewCrisisPopup} 
        onLogNewCrisisSubmit={fetchCrisisEvents} 
      />
    </div>
  );
};

export default CrisisManagementList;