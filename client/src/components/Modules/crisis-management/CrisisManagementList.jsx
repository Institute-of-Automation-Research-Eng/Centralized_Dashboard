import { useState } from 'react';
import CrisisManagementDetails from './CrisisManagementDetails';
import LogNewCrisis from './LogNewCrisis';

import './CrisisManagementList.css';

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
  const [crisisEvents, setCrisisEvents] = useState(mockCrisisData);
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const [showCrisisPopup, setShowCrisisPopup] = useState(false);
  const [showLogNewCrisisPopup, setShowLogNewCrisisPopup] = useState(false);

  const handleCrisisClick = (crisis) => {
    setSelectedCrisis(crisis);
    setShowCrisisPopup(true);
  };

  const handleLogNewCrisisClick = () => {
    setShowLogNewCrisisPopup(true);
  };

  const handleLogNewCrisisSubmit = (newCrisis) => {
    setCrisisEvents([...crisisEvents, { ...newCrisis, id: crisisEvents.length + 1 }]);
    setShowLogNewCrisisPopup(false);
  };

  return (
    <div className="crisis-management">
      <div className="crisis-header">
        <button className="add-crisis-button" onClick={handleLogNewCrisisClick}>Log New Crisis</button>
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
      <CrisisManagementDetails 
        showCrisisPopup={showCrisisPopup} 
        selectedCrisis={selectedCrisis} 
        setShowCrisisPopup={setShowCrisisPopup} 
      />
      
      {/* Add Crisis Popup */}
      <LogNewCrisis 
        showLogNewCrisisPopup={showLogNewCrisisPopup} 
        setShowLogNewCrisisPopup={setShowLogNewCrisisPopup} 
        onLogNewCrisisSubmit={handleLogNewCrisisSubmit} 
      />
    </div>
  );
};

export default CrisisManagementList;