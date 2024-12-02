import { useState, useEffect } from 'react';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import axios from 'axios';

import Popup from '../../utils/Popup';
import './AddAssets.css';

const AddAssets = ({ 
  showAddAssetPopup, 
  setShowAddAssetPopup, 
  refreshAssetList,
  assetToEdit // Prop passed from AssetManagementList
}) => {
  // Update state to reflect new asset fields
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: 'Critical',  // Default value
    owner: '',
    risk_score: 0.95,      // Default value
    status: 'Active',      // Default value
    type: 'Database',      // Default value (adjustable if needed)
  });

  // If assetToEdit is provided, pre-fill the form with asset details
  useEffect(() => {
    if (assetToEdit) {
      setNewAsset({
        name: assetToEdit.name,
        category: assetToEdit.category,
        owner: assetToEdit.owner,
        risk_score: assetToEdit.risk_score,
        status: assetToEdit.status,
        type: assetToEdit.type,
      });
    }
  }, [assetToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (assetToEdit) {
        // Update the asset if assetToEdit is provided
        const response = await axios.put(API_PATHS.ASSET_DETAIL(assetToEdit.id), {
          category: newAsset.category,
          name: newAsset.name,
          owner: newAsset.owner,
          risk_score: parseFloat(newAsset.risk_score),
          status: newAsset.status,
          type: newAsset.type,
        });

        alert('Asset updated successfully');
      } else {
        // Add new asset
        const response = await axios.post(API_PATHS.ADD_ASSET, {
          category: newAsset.category,
          name: newAsset.name,
          owner: newAsset.owner,
          risk_score: parseFloat(newAsset.risk_score),
          status: newAsset.status,
          type: newAsset.type,
        });

        alert('New Asset added successfully');
      }

      // Clear form fields and refresh asset list
      setNewAsset({
        name: '',
        category: 'Critical',
        owner: '',
        risk_score: 0.95,
        status: 'Active',
        type: 'Database',
      });
      
      refreshAssetList();
      setShowAddAssetPopup(false);
    } catch (err) {
      console.error('Error adding/updating asset:', err);
      alert('Failed to add/update asset. Please try again.');
    }
  };

  if (!showAddAssetPopup) return null;

  return (
    <Popup>
      <h3>{assetToEdit ? 'Edit Asset' : 'Add New Asset'}</h3>
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
          type="text"
          name="owner"
          placeholder="Enter Owner"
          value={newAsset.owner}
          onChange={handleInputChange}
          required
        />

        <select
          name="category"
          value={newAsset.category}
          onChange={handleInputChange}
          required
        >
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="number"
          name="risk_score"
          min="0" max="1" step="0.01"
          placeholder="Enter Risk Score (0.00 - 1.00)"
          value={newAsset.risk_score}
          onChange={handleInputChange}
          required
        />

        <select
          name="status"
          value={newAsset.status}
          onChange={handleInputChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          name="type"
          value={newAsset.type}
          onChange={handleInputChange}
          required
        >
          <option value="Database">Database</option>
          <option value="Server">Server</option>
          <option value="Application">Application</option>
        </select>

        <button type="submit" className="add-button">
          {assetToEdit ? 'Update' : 'Add'}
        </button>
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