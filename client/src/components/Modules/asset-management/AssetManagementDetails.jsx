import { useState, useEffect } from 'react';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import axios from 'axios';
import Popup from '../../utils/Popup';

const AssetDetails = ({ 
  showAssetPopup, 
  assetId, 
  setShowAssetPopup 
}) => {
  const [assetDetails, setAssetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssetDetails = async () => {
      if (!assetId) return;

      try {
        setLoading(true);
        console.log(assetId);
        
        const response = await axios.get(API_PATHS.ASSET_DETAIL(assetId)); 
        setAssetDetails(response.data);  // Set the response data correctly
        setLoading(false);
      } catch (err) {
        console.error('Error fetching asset details:', err);
        setError('Failed to fetch asset details.');
        setLoading(false);
      }
    };

    fetchAssetDetails();
  }, [assetId]);

  if (!showAssetPopup) return null;

  if (loading) return <Popup>Loading asset details...</Popup>;

  if (error) return <Popup>{error}</Popup>;

  return (
    <Popup>
      <>
        <h3>Asset Details</h3>
        <div className="asset-details">
          <p><strong>ID:</strong> {assetDetails.id}</p>
          <p><strong>Name:</strong> {assetDetails.name}</p>
          <p><strong>Category:</strong> {assetDetails.category}</p>
          <p><strong>Owner:</strong> {assetDetails.owner}</p>
          <p><strong>Status:</strong> {assetDetails.status}</p>
          <p><strong>Risk Score:</strong> {assetDetails.risk_score}</p>
          <p><strong>Type:</strong> {assetDetails.type}</p>
          <p><strong>Created At:</strong> {new Date(assetDetails.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(assetDetails.updated_at).toLocaleString()}</p>
        </div>
        <button onClick={() => setShowAssetPopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default AssetDetails;