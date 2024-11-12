import { useState } from 'react';
import ThreatIntelligenceDetails from './ThreatIntelligenceDetails';
import AddThreat from './AddThreats';
import './ThreatIntelligenceList.css';

// Remove later
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
  const [threats, setThreats] = useState(mockThreatData);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [showThreatPopup, setShowThreatPopup] = useState(false);
  const [showAddThreatPopup, setShowAddThreatPopup] = useState(false);

  const handleThreatClick = (threat) => {
    setSelectedThreat(threat);
    setShowThreatPopup(true);
  };

  const handleAddThreatClick = () => {
    setShowAddThreatPopup(true);
  };

  const handleAddThreatSubmit = (newThreat) => {
    setThreats([...threats, { ...newThreat, id: threats.length + 1 }]);
    setShowAddThreatPopup(false);
  };

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

      <ThreatIntelligenceDetails 
        showThreatPopup={showThreatPopup} 
        selectedThreat={selectedThreat} 
        setShowThreatPopup={setShowThreatPopup} 
      />
      
      <AddThreat 
        showAddThreatPopup={showAddThreatPopup} 
        setShowAddThreatPopup={setShowAddThreatPopup} 
        onAddThreatSubmit={handleAddThreatSubmit} 
      />
    </div>
  );
};

export default ThreatIntelligenceList;