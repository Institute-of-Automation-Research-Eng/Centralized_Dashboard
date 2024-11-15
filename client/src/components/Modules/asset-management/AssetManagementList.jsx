import { useState, useEffect } from 'react';
// import axios from 'axios';
import AssetManagementDetails from './AssetManagementDetails';
import AddAssets from './AddAssets';

import './AssetManagementList.css';

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

const AssetManagementList = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
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
      // const response = await axios.get('/api/assets');
      const response = { data: mockData }; // Mocked empty response for now
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
    setShowAddAssetPopup(true);
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
              onClick={() => handleAssetClick(asset.id)}
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

      <AssetManagementDetails
        showAssetPopup={showAssetPopup}
        assetId={selectedAssetId}
        setShowAssetPopup={setShowAssetPopup}
      />

<AddAssets
        showAddAssetPopup={showAddAssetPopup}
        setShowAddAssetPopup={setShowAddAssetPopup}
        refreshAssetList={fetchAssetsList}
      />
    </div>
  );
};

export default AssetManagementList;