import { useState } from 'react';
import Popup from '../../utils/Popup';

const AddThreats = ({ 
  showAddThreatPopup, 
  setShowAddThreatPopup, 
  onAddThreatSubmit 
}) => {
  const [newThreat, setNewThreat] = useState({
    source: '',
    description: '',
    severity: '',
    classification: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThreat({ ...newThreat, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddThreatSubmit(newThreat);
    setNewThreat({ source: '', description: '', severity: '', classification: '' });
  };

  if (!showAddThreatPopup) return null;

  return (
    <Popup>
      <h3>Add New Threat</h3>
      <form onSubmit={handleSubmit}>
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
    </Popup>
  );
};

export default AddThreats;