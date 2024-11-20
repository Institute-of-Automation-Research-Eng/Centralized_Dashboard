import { useState, useEffect } from 'react';
import { API_PATHS } from '../apiConfig';
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
        setAssetDetails(response.data);
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
          <p><strong>Value:</strong> ${assetDetails.value}</p>
          <p><strong>Criticality:</strong> {assetDetails.criticality}</p>
          <p><strong>Risk:</strong> {assetDetails.risk}</p>
        </div>
        <button onClick={() => setShowAssetPopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default AssetDetails;