import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import AssetManagementDetails from './AssetManagementDetails';
import AddAssets from './AddAssets';

import './AssetManagementList.css';

const AssetManagementList = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null); // For storing the selected asset for update
  const [showAssetPopup, setShowAssetPopup] = useState(false);
  const [showAddAssetPopup, setShowAddAssetPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssetsList();
  }, []);

  const fetchAssetsList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_PATHS.ASSETS_LIST);
      setAssets(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError('Failed to fetch assets.');
      setLoading(false);
    }
  };

  const handleAssetClick = (assetId) => {
    setSelectedAssetId(assetId);
    setShowAssetPopup(true);
  };

  const handleAddAssetClick = () => {
    setSelectedAsset(null); // Make sure the form is reset for adding new asset
    setShowAddAssetPopup(true);
  };

  const handleUpdateAssetClick = (asset) => {
    setSelectedAsset(asset); // Pass the asset data for updating
    setShowAddAssetPopup(true); // Open the popup to edit
  };

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="asset-management">
      <div className="asset-header">
        <button className="add-asset-button" onClick={handleAddAssetClick}>
          Add Asset
        </button>
      </div>

      <table className="asset-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Risk Score</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th> {/* Added an Actions column */}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="asset-row"
              onClick={() => handleAssetClick(asset.id)} // This triggers handleAssetClick for row click
            >
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.owner}</td>
              <td>{asset.status}</td>
              <td>{asset.risk_score}</td>
              <td>{new Date(asset.created_at).toLocaleString()}</td>
              <td>{new Date(asset.updated_at).toLocaleString()}</td>
              <td>
                {/* Update button for each asset */}
                <button onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering row click handler
                  handleUpdateAssetClick(asset); // Open update form with this asset's data
                }}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AssetManagementDetails
        showAssetPopup={showAssetPopup}
        assetId={selectedAssetId}
        setShowAssetPopup={setShowAssetPopup}
      />

      <AddAssets
        showAddAssetPopup={showAddAssetPopup}
        setShowAddAssetPopup={setShowAddAssetPopup}
        refreshAssetList={fetchAssetsList}
        assetToEdit={selectedAsset} // Pass the selected asset to edit
      />
    </div>
  );
};

export default AssetManagementList;