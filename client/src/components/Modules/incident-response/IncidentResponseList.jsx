import { useState, useEffect } from 'react';
import IncidentResponseDetails from './IncidentResponseDetails';
import ReportNewIncident from './ReportNewIncident';

import './IncidentResponseList.css';

// Mock data
const mockData = [
  { id: 1, description: 'Server Crash', severity: 'High', status: 'Active', response_playbook: 'Response playbook text' },
  { id: 2, description: 'Database Timeout', severity: 'Medium', status: 'Resolved', response_playbook: 'Response playbook text' },
  { id: 3, description: 'Network Outage', severity: 'Critical', status: 'Open', response_playbook: 'Response playbook text' },
  { id: 4, description: 'Unauthorized Access', severity: 'Low', status: 'Open', response_playbook: 'Response playbook text' },
  { id: 5, description: 'DDoS Attack', severity: 'Critical', status: 'Ongoing', response_playbook: 'Response playbook text' },
  { id: 6, description: 'Data Leak', severity: 'High', status: 'Open', response_playbook: 'Response playbook text' },
  { id: 7, description: 'Power Failure', severity: 'Medium', status: 'Resolved', response_playbook: 'Response playbook text' },
  { id: 8, description: 'Hardware Failure', severity: 'Low', status: 'Ongoing', response_playbook: 'Response playbook text' },
  { id: 9, description: 'SQL Injection', severity: 'Critical', status: 'Open', response_playbook: 'Response playbook text' },
  { id: 10, description: 'Ransomware Attack', severity: 'High', status: 'Ongoing', response_playbook: 'Response playbook text' }
];

const IncidentResponseList = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [showIncidentPopup, setShowIncidentPopup] = useState(false);
  const [showAddIncidentPopup, setShowAddIncidentPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    fetchIncidentsList();
  }, []);

  const fetchIncidentsList = async () => {
    try {
      setLoading(true);
      // Replace this with actual API call like:
      // const response = await axios.get('/api/incidents');
      const response = { data: mockData }; // Mocked data for now
      setIncidents(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching incidents:', err);
      setError('Failed to fetch incidents.');
      setLoading(false);
    }
  };

  const handleIncidentClick = (incident) => {
    setSelectedIncidentId(incident.id);
    setShowIncidentPopup(true);
  };

  const handleAddIncidentClick = () => {
    setShowAddIncidentPopup(true);
  };

  if (loading) return <div>Loading incidents...</div>;
  if (error) return <div>{error}</div>;

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
      <IncidentResponseDetails
          selectedIncidentId={selectedIncidentId}
          showIncidentPopup={showIncidentPopup}
          setShowIncidentPopup={setShowIncidentPopup}
        />

      {/* Show Add Incident Popup */}
      {showAddIncidentPopup && (
        <ReportNewIncident
          setShowAddIncidentPopup={setShowAddIncidentPopup}
          setIncidents={setIncidents}
          refreshIncidentsList={fetchIncidentsList}
        />
      )}
    </div>
  );
};

export default IncidentResponseList;