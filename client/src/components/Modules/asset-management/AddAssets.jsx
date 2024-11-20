import { useState } from 'react';
import { API_PATHS } from '../apiConfig';
import axios from 'axios';

import Popup from '../../utils/Popup';
import './AddAssets.css';

const AddAssets = ({ 
  showAddAssetPopup, 
  setShowAddAssetPopup, 
  refreshAssetList 
}) => {
  const [newAsset, setNewAsset] = useState({
    name: '',
    value: '',
    criticality: 'Low', // Default value.
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_PATHS.ADD_ASSET, {
        name: newAsset.name,
        value: newAsset.value,
        criticality: newAsset.criticality,
      });

      alert('New Asset added successfully');

      // Clear form fields
      setNewAsset({ name: '', value: '', criticality: 'Medium' });

      // Refresh the asset list
      refreshAssetList();

      // Close the popup
      setShowAddAssetPopup(false);
    } catch (err) {
      console.error('Error adding asset:', err);
      alert('Failed to add asset. Please try again.');
    }
  };

  if (!showAddAssetPopup) return null;

  return (
    <Popup>
      <h3>Add New Asset</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Asset Name"
          value={newAsset.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="value"
          placeholder="Enter Asset Value"
          value={newAsset.value}
          onChange={handleInputChange}
          required
        />

        <select
          name="criticality"
          className='criticality-select'
          value={newAsset.criticality}
          onChange={handleInputChange}
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit" className='add-button'>Add</button>
        <button
          className="button-cancel"
          type="button"
          onClick={() => setShowAddAssetPopup(false)}
        >
          Cancel
        </button>
      </form>
    </Popup>
  );
};

export default AddAssets;