import { useState } from 'react';
import IncidentResponseDetails from './IncidentResponseDetails';
import ReportNewIncident from './ReportNewIncident';

import './IncidentResponseList.css';

// Mock data
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

const IncidentResponseList = () => {
  const [incidents, setIncidents] = useState(mockData);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showIncidentPopup, setShowIncidentPopup] = useState(false);
  const [showAddIncidentPopup, setShowAddIncidentPopup] = useState(false);

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
    setShowIncidentPopup(true);
  };

  const handleAddIncidentClick = () => {
    setShowAddIncidentPopup(true);
  };

  return (
    <div className="incident-response">
      <div className="incident-header">
        <button className="add-incident-button" onClick={handleAddIncidentClick}>
          Report New Incident
        </button>
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

      {/* Show Incident Details Popup */}
      {showIncidentPopup && selectedIncident && (
        <IncidentResponseDetails
          selectedIncident={selectedIncident}
          showIncidentPopup={showIncidentPopup}
          setShowIncidentPopup={setShowIncidentPopup}
        />
      )}

      {/* Show Add Incident Popup */}
      {showAddIncidentPopup && (
        <ReportNewIncident
          setShowAddIncidentPopup={setShowAddIncidentPopup}
          setIncidents={setIncidents}
          incidents={incidents}
        />
      )}
    </div>
  );
};

export default IncidentResponseList;