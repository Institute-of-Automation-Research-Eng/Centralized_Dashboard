import { useState } from 'react';
import './IncidentResponse.css';

// Remove later
const mockData = [
  { id: 1, description: 'Server Crash', severity: 'High', status: 'Open' },
  { id: 2, description: 'Database Timeout', severity: 'Medium', status: 'Resolved' },
  { id: 3, description: 'Network Outage', severity: 'Critical', status: 'Open' },
  { id: 4, description: 'Unauthorized Access', severity: 'Low', status: 'Open' },
  { id: 5, description: 'DDoS Attack', severity: 'Critical', status: 'Ongoing' },
  { id: 6, description: 'Data Leak', severity: 'High', status: 'Open' },
  { id: 7, description: 'Power Failure', severity: 'Medium', status: 'Resolved' },
  { id: 8, description: 'Hardware Failure', severity: 'Low', status: 'Ongoing' },
  { id: 9, description: 'SQL Injection', severity: 'Critical', status: 'Open' },
  { id: 10, description: 'Ransomware Attack', severity: 'High', status: 'Ongoing' }
];

const IncidentResponse = () => {
  const [incidents, setIncidents] = useState(mockData); // Using mock data initially
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showIncidentPopup, setShowIncidentPopup] = useState(false);
  const [showAddIncidentPopup, setShowAddIncidentPopup] = useState(false);
  const [newIncident, setNewIncident] = useState({
    description: '',
    severity: '',
    status: 'Open',
    response_playbook: ''
  });

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
    setShowIncidentPopup(true);
  };

  const handleAddIncidentClick = () => {
    setShowAddIncidentPopup(true);
  };

  const handleAddIncidentSubmit = (e) => {
    e.preventDefault();
    setIncidents([...incidents, { ...newIncident, id: incidents.length + 1 }]);
    setShowAddIncidentPopup(false);
    setNewIncident({
      description: '',
      severity: '',
      status: 'Open',
      response_playbook: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident({ ...newIncident, [name]: value });
  };

  return (
    <div className="incident-response">
      <div className="incident-header">
        <button className="add-incident-button" onClick={handleAddIncidentClick}>Report New Incident</button>
      </div>

      <table className="incident-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="incident-row"
              onClick={() => handleIncidentClick(incident)}
            >
              <td>{incident.id}</td>
              <td>{incident.description}</td>
              <td>{incident.severity}</td>
              <td>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Incident Details Popup */}
      {showIncidentPopup && selectedIncident && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Incident Details</h3>
            <div className="incident-details">
              <p><strong>ID:</strong> {selectedIncident.id}</p>
              <p><strong>Description:</strong> {selectedIncident.description}</p>
              <p><strong>Severity:</strong> {selectedIncident.severity}</p>
              <p><strong>Status:</strong> {selectedIncident.status}</p>
              <p><strong>Response Playbook:</strong> {selectedIncident.response_playbook || 'N/A'}</p>
            </div>
            <button onClick={() => setShowIncidentPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add Incident Popup */}
      {showAddIncidentPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Report New Incident</h3>
            <form onSubmit={handleAddIncidentSubmit}>
              <input
                type="text"
                name="description"
                placeholder="Incident Description"
                value={newIncident.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="severity"
                placeholder="Severity (e.g., Low, Medium, High)"
                value={newIncident.severity}
                onChange={handleInputChange}
                required
              />
              <textarea
                className='playbook-textarea'
                name="response_playbook"
                placeholder="Response Playbook"
                value={newIncident.response_playbook}
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
              <button className="button-cancel" type="button" onClick={() => setShowAddIncidentPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentResponse;
