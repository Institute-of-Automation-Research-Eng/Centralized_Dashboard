import { useState } from 'react';
import axios from 'axios';
import Popup from '../../utils/Popup';

const AddThreats = ({ 
  showAddThreatPopup, 
  setShowAddThreatPopup, 
  refreshThreatsList 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the API to add the new threat
      const response = await axios.post('/api/threats', {
        source: newThreat.source,
        description: newThreat.description,
        severity: newThreat.severity,
      });

      // Log the response (or handle the result)
      console.log('New Threat added:', response.data);

      // Show success alert
      alert('New Threat added and classified successfully');

      // Reset form fields
      setNewThreat({
        source: '',
        description: '',
        severity: '',
        classification: ''
      });

      // Refresh the threat list in the parent component
      refreshThreatsList();

      // Close the popup
      setShowAddThreatPopup(false);

    } catch (err) {
      console.error('Error adding threat:', err);
      alert('Failed to add threat. Please try again.');
    }
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
        <button
          className="button-cancel"
          type="button"
          onClick={() => setShowAddThreatPopup(false)}
        >
          Cancel
        </button>
      </form>
    </Popup>
  );
};

export default AddThreats;