import { useState } from 'react';
import './ThreatIntelligence.css';

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

const ThreatIntelligence = () => {
  const [threats, setThreats] = useState(mockThreatData);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [showThreatPopup, setShowThreatPopup] = useState(false);
  const [showAddThreatPopup, setShowAddThreatPopup] = useState(false);
  const [newThreat, setNewThreat] = useState({
    id: '',
    source: '',
    description: '',
    severity: '',
    classification: ''
  });

  const handleThreatClick = (threat) => {
    setSelectedThreat(threat);
    setShowThreatPopup(true);
  };

  const handleAddThreatClick = () => {
    setShowAddThreatPopup(true);
  };

  const handleAddThreatSubmit = (e) => {
    e.preventDefault();
    setThreats([...threats, { ...newThreat, id: threats.length + 1 }]);
    setShowAddThreatPopup(false);
    setNewThreat({ id: '', source: '', description: '', severity: '', classification: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThreat({ ...newThreat, [name]: value });
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

      {/* Threat Details Popup */}
      {showThreatPopup && selectedThreat && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Threat Details</h3>
            <div className="threat-details">
              <p><strong>ID:</strong> {selectedThreat.id}</p>
              <p><strong>Source:</strong> {selectedThreat.source}</p>
              <p><strong>Description:</strong> {selectedThreat.description}</p>
              <p><strong>Severity:</strong> {selectedThreat.severity}</p>
              <p><strong>Classification:</strong> {selectedThreat.classification}</p>
            </div>
            <button onClick={() => setShowThreatPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add Threat Popup */}
      {showAddThreatPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Add New Threat</h3>
            <form onSubmit={handleAddThreatSubmit}>
              <input
                type="text"
                name="source"
                placeholder="Enter Source"
                value={newThreat.source}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Enter Description"
                value={newThreat.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="severity"
                placeholder="Enter Severity"
                value={newThreat.severity}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="classification"
                placeholder="Enter Classification"
                value={newThreat.classification}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Add</button>
              <button className="button-cancel" type="button" onClick={() => setShowAddThreatPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatIntelligence;