import { useState } from 'react';
import './CrisisManagement.css';

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

const CrisisManagement = () => {
  const [crisisEvents, setCrisisEvents] = useState(mockCrisisData); // Using mock data
  const [selectedCrisis, setSelectedCrisis] = useState(null);
  const [showCrisisPopup, setShowCrisisPopup] = useState(false);
  const [showAddCrisisPopup, setShowAddCrisisPopup] = useState(false);
  const [newCrisis, setNewCrisis] = useState({
    description: '',
    impact: '',
    crisis_report: ''
  });

  const handleCrisisClick = (crisis) => {
    setSelectedCrisis(crisis);
    setShowCrisisPopup(true);
  };

  const handleAddCrisisClick = () => {
    setShowAddCrisisPopup(true);
  };

  const handleAddCrisisSubmit = (e) => {
    e.preventDefault();
    setCrisisEvents([...crisisEvents, { ...newCrisis, id: crisisEvents.length + 1 }]);
    setShowAddCrisisPopup(false);
    setNewCrisis({ description: '', impact: '', crisis_report: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrisis({ ...newCrisis, [name]: value });
  };

  return (
    <div className="crisis-management">
      <div className="crisis-header">
        <button className="add-crisis-button" onClick={handleAddCrisisClick}>Log New Crisis</button>
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
      {showCrisisPopup && selectedCrisis && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Crisis Details</h3>
            <div className="crisis-details">
              <p><strong>ID:</strong> {selectedCrisis.id}</p>
              <p><strong>Description:</strong> {selectedCrisis.description}</p>
              <p><strong>Impact:</strong> {selectedCrisis.impact}</p>
              <p><strong>Status:</strong> {selectedCrisis.status}</p>
              <p><strong>Report:</strong> {selectedCrisis.crisis_report}</p>
            </div>
            <button onClick={() => setShowCrisisPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add Crisis Popup */}
      {showAddCrisisPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Log New Crisis</h3>
            <form onSubmit={handleAddCrisisSubmit}>
              <input
                type="text"
                name="description"
                placeholder="Enter Crisis Description"
                value={newCrisis.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="impact"
                placeholder="Enter Impact Level"
                value={newCrisis.impact}
                onChange={handleInputChange}
                required
              />
              <textarea
                className="crisis-report-textarea"
                name="crisis_report"
                placeholder="Enter Crisis Report"
                value={newCrisis.crisis_report}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Log Crisis</button>
              <button className="button-cancel" type="button" onClick={() => setShowAddCrisisPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrisisManagement;