import { useState } from 'react';
import './AssetManagement.css';

// Remove later
const mockData = [
  { id: 1, name: 'Web Server 1', value: 100000, criticality: 0.8, risk: 0.4 },
  { id: 2, name: 'Database Server', value: 150000, criticality: 0.9, risk: 0.6 },
  { id: 3, name: 'Application Server', value: 200000, criticality: 0.7, risk: 0.3 },
  { id: 4, name: 'Backup Server', value: 120000, criticality: 0.5, risk: 0.2 },
  { id: 5, name: 'Mail Server', value: 80000, criticality: 0.6, risk: 0.5 },
  { id: 6, name: 'FTP Server', value: 90000, criticality: 0.7, risk: 0.4 },
  { id: 7, name: 'DNS Server', value: 110000, criticality: 0.8, risk: 0.7 },
  { id: 8, name: 'Proxy Server', value: 95000, criticality: 0.6, risk: 0.3 },
  { id: 9, name: 'Load Balancer', value: 130000, criticality: 0.9, risk: 0.6 },
  { id: 10, name: 'App Server 2', value: 140000, criticality: 0.7, risk: 0.5 },
];

const AssetManagement = () => {
  const [assets, setAssets] = useState(mockData); // Using Mock Data

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetPopup, setShowAssetPopup] = useState(false);
  const [showAddAssetPopup, setShowAddAssetPopup] = useState(false);
  const [newAsset, setNewAsset] = useState({
    id: '',
    name: '',
    value: '',
    criticality: '',
    risk: ''
  });

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setShowAssetPopup(true);
  };

  const handleAddAssetClick = () => {
    setShowAddAssetPopup(true);
  };

  const handleAddAssetSubmit = (e) => {
    e.preventDefault();
    setAssets([...assets, { ...newAsset, id: assets.length + 1 }]);
    setShowAddAssetPopup(false);
    setNewAsset({ id: '', name: '', value: '', criticality: '', risk: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  return (
    <div className="asset-management">
      <div className="asset-header">
        <button className="add-asset-button" onClick={handleAddAssetClick}>Add Asset</button>
      </div>

      <table className="asset-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Criticality</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="asset-row"
              onClick={() => handleAssetClick(asset)}
            >
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.value}</td>
              <td>{asset.criticality}</td>
              <td>{asset.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Asset Details Popup */}
      {showAssetPopup && selectedAsset && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Asset Details</h3>
            <div className="asset-details">
              <p><strong>ID:</strong> {selectedAsset.id}</p>
              <p><strong>Name:</strong> {selectedAsset.name}</p>
              <p><strong>Value:</strong> ${selectedAsset.value}</p>
              <p><strong>Criticality:</strong> {selectedAsset.criticality}</p>
              <p><strong>Risk:</strong> {selectedAsset.risk}</p>
            </div>
            <button onClick={() => setShowAssetPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add Asset Popup */}
      {showAddAssetPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Add New Asset</h3>
            <form onSubmit={handleAddAssetSubmit}>
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
              <input
                type="number"
                step="0.1"
                name="criticality"
                placeholder="Enter Criticality"
                value={newAsset.criticality}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                step="0.1"
                name="risk"
                placeholder="Enter Risk"
                value={newAsset.risk}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Add</button>
              <button className="button-cancel" type="button" onClick={() => setShowAddAssetPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;