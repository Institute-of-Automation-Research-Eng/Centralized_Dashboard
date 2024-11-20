import { useState, useEffect } from 'react';
import ThreatIntelligenceDetails from './ThreatIntelligenceDetails';
import AddThreat from './AddThreats';
// import { API_PATHS } from '../apiConfig';
// import axios from 'axios';

import './ThreatIntelligenceList.css';

// Mock Threat Data (to be removed later)
const mockThreatData = [
  { id: 1, source: 'Firewall', description: 'Attempted access to secure area', severity: 'high', classification: 'Intrusion' },
  { id: 2, source: 'Endpoint', description: 'Suspicious activity detected', severity: 'medium', classification: 'Malware' },
  { id: 3, source: 'Network', description: 'Unusual traffic volume', severity: 'low', classification: 'DDoS' },
  { id: 4, source: 'Firewall', description: 'Multiple failed login attempts', severity: 'high', classification: 'Brute Force' },
  { id: 5, source: 'Endpoint', description: 'Potential data exfiltration detected', severity: 'low', classification: 'Data Breach' },
  { id: 6, source: 'Network', description: 'Port scanning activity', severity: 'medium', classification: 'Reconnaissance' },
  { id: 7, source: 'Firewall', description: 'Suspicious inbound connection', severity: 'high', classification: 'Intrusion' },
  { id: 8, source: 'Endpoint', description: 'New unapproved application installation', severity: 'medium', classification: 'Malware' },
  { id: 9, source: 'Network', description: 'Denial of Service attack detected', severity: 'low', classification: 'DoS' },
  { id: 10, source: 'Firewall', description: 'Possible SQL injection attempt', severity: 'medium', classification: 'Injection' },
];

const ThreatIntelligenceList = () => {
  const [threats, setThreats] = useState([]);
  const [selectedThreatId, setSelectedThreatId] = useState(null);
  const [showThreatPopup, setShowThreatPopup] = useState(false);
  const [showAddThreatPopup, setShowAddThreatPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchThreatsList();
  }, []);

  const fetchThreatsList = async () => {
    try {
      setLoading(true);
      // Uncomment this line once the API is ready
      // const response = await axios.get(API_PATHS.THREATS_LIST);
      const response = { data: mockThreatData }; // Mocked response for now
      setThreats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching threats:', err);
      setError('Failed to fetch threats.');
      setLoading(false);
    }
  };

  const handleThreatClick = (threat) => {
    setSelectedThreatId(threat.id);
    setShowThreatPopup(true);
  };

  const handleAddThreatClick = () => {
    setShowAddThreatPopup(true);
  };


  if (loading) return <div>Loading threats...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="threat-intelligence">
      <div className="threat-header">
        <button className="add-threat-button" onClick={handleAddThreatClick}>Add Threat</button>
      </div>

      <table className="threat-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <tr
              key={threat.id}
              className="threat-row"
              onClick={() => handleThreatClick(threat)}
            >
              <td>{threat.id}</td>
              <td>{threat.source}</td>
              <td>{threat.description}</td>
              <td>
                <button className={`severity-button ${threat.severity}`}>
                  {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                </button>
              </td>
              <td>{threat.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Passing props to ThreatIntelligenceDetails */}
      <ThreatIntelligenceDetails
        showThreatPopup={showThreatPopup}
        threatId={selectedThreatId}
        setShowThreatPopup={setShowThreatPopup}
      />

      {/* Passing props to AddThreat */}
      <AddThreat
        showAddThreatPopup={showAddThreatPopup}
        setShowAddThreatPopup={setShowAddThreatPopup}
        refreshThreatsList={fetchThreatsList}
      />
    </div>
  );
};

export default ThreatIntelligenceList;