import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import AssetManagementDetails from './AssetManagementDetails';
import AddAssets from './AddAssets';
import AssetRiskHistory from './AssetRiskHistory';
import './AssetManagementList.css';

const mockAssets = [
  {
    id: 'A001',
    name: 'Workstation Laptop',
    category: 'Hardware',
    owner: 'Alice Johnson',
    status: 'Active',
    risk_score: 12,
    created_at: '2025-01-15T09:30:00Z',
    updated_at: '2025-04-10T14:45:00Z'
  },
  {
    id: 'A002',
    name: 'CRM Software License',
    category: 'Software',
    owner: 'Bob Smith',
    status: 'Expired',
    risk_score: 45,
    created_at: '2024-11-20T12:00:00Z',
    updated_at: '2025-02-28T08:20:00Z'
  },
  {
    id: 'A003',
    name: 'Conference Room Projector',
    category: 'Hardware',
    owner: 'Facilities Team',
    status: 'Active',
    risk_score: 5,
    created_at: '2023-06-05T16:10:00Z',
    updated_at: '2025-03-12T10:00:00Z'
  },
  {
    id: 'A004',
    name: 'VPN Gateway Appliance',
    category: 'Network',
    owner: 'IT Security',
    status: 'Active',
    risk_score: 22,
    created_at: '2024-05-01T08:00:00Z',
    updated_at: '2025-04-20T12:30:00Z'
  },
  {
    id: 'A005',
    name: 'Accounting ERP System',
    category: 'Software',
    owner: 'Finance Dept.',
    status: 'Maintenance',
    risk_score: 30,
    created_at: '2023-09-15T10:20:00Z',
    updated_at: '2025-01-10T09:45:00Z'
  },
  {
    id: 'A006',
    name: 'Office Fiber Router',
    category: 'Network',
    owner: 'Network Team',
    status: 'Active',
    risk_score: 8,
    created_at: '2024-12-01T14:55:00Z',
    updated_at: '2025-03-01T11:15:00Z'
  }
];


const AssetManagementList = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetPopup, setShowAssetPopup] = useState(false);
  const [showAddAssetPopup, setShowAddAssetPopup] = useState(false);
  const [showRiskHistoryPopup, setShowRiskHistoryPopup] = useState(false);
  const [selectedRiskAssetId, setSelectedRiskAssetId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssetsList();
  }, []);

  const fetchAssetsList = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(API_PATHS.ASSETS_LIST);

      // if API returns an empty array, treat it as a failure
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('No assets returned; using mock data');
        setAssets(mockAssets);
      } else {
        setAssets(data);
      }
    } catch (err) {
      console.error('Error fetching assets, using mock data:', err);
      setAssets(mockAssets);
    } finally {
      setLoading(false);
    }
  };

  const handleAssetClick      = id => { setSelectedAssetId(id); setShowAssetPopup(true); };
  const handleAddAssetClick   = () => { setSelectedAsset(null); setShowAddAssetPopup(true); };
  const handleUpdateAssetClick= asset => { setSelectedAsset(asset); setShowAddAssetPopup(true); };
  const handlePredictAsset    = id => console.log('Predict for', id);
  const handleShowRiskHistory = id => { setSelectedRiskAssetId(id); setShowRiskHistoryPopup(true); };

  if (loading) return <div>Loading assets...</div>;

  return (
    <div className="asset-management">
      {error && <div className="warning">{error}</div>}

      <div className="asset-header">
        <button className="add-asset-button" onClick={handleAddAssetClick}>
          Add Asset
        </button>
      </div>

      <table className="asset-table">
        {/* …thead stays the same… */}
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id} onClick={() => handleAssetClick(asset.id)}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.category}</td>
              <td>{asset.owner}</td>
              <td>{asset.status}</td>
              <td>{asset.risk_score}</td>
              <td>{new Date(asset.created_at).toLocaleString()}</td>
              <td>{new Date(asset.updated_at).toLocaleString()}</td>
              <td>
                <button onClick={e => { e.stopPropagation(); handleUpdateAssetClick(asset); }} className="action-button">Edit</button>
                &nbsp;
                <button onClick={e => { e.stopPropagation(); handlePredictAsset(asset.id); }} className="action-button">Predict</button>
                &nbsp;
                <button onClick={e => { e.stopPropagation(); handleShowRiskHistory(asset.id); }} className="action-button">Risk History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* …popups unchanged… */}
      <AssetManagementDetails showAssetPopup={showAssetPopup} assetId={selectedAssetId} setShowAssetPopup={setShowAssetPopup} />
      <AddAssets            showAddAssetPopup={showAddAssetPopup} setShowAddAssetPopup={setShowAddAssetPopup} refreshAssetList={fetchAssetsList} assetToEdit={selectedAsset} />
      <AssetRiskHistory     showRiskHistoryPopup={showRiskHistoryPopup} assetId={selectedRiskAssetId} setShowRiskHistoryPopup={setShowRiskHistoryPopup} />
    </div>
  );
};

export default AssetManagementList;