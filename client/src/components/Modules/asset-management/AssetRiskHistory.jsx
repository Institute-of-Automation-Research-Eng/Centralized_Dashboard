import { useState, useEffect } from 'react';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import axios from 'axios';
import Popup from '../../utils/Popup';

const AssetRiskHistory = ({ 
  showRiskHistoryPopup, 
  assetId, 
  setShowRiskHistoryPopup 
}) => {
  const [riskHistory, setRiskHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiskHistory = async () => {
        if (!assetId) return;
      
        try {
          setLoading(true);
          console.log('Fetching risk history for asset ID:', assetId);
      
          const response = await axios.get(API_PATHS.RISK_HISTORY(assetId));
      
          // Check if the response is an empty array
          if (response.data.length === 0) {
            setRiskHistory(null);
          } else {
            setRiskHistory(response.data[0]);  // Assuming response.data is the risk history array
            setError(null);  // Clear any previous error
          }
      
          setLoading(false);
        } catch (err) {
          console.error('Error fetching asset risk history:', err);
          setError('Failed to fetch risk history.');
          setLoading(false);
        }
      };

    fetchRiskHistory();
  }, [assetId]);

  if (!showRiskHistoryPopup) return null;

  if (loading) return <Popup>Loading asset risk history...</Popup>;

  if (error) return <Popup>{error}</Popup>;

  return (
    <Popup>
        <>
        {/* Conditionally render based on riskHistory */}
        {riskHistory ? ( 
            <>
                <h3>Asset Risk History</h3>

                <div className="risk-history">
                    <p><strong>ID:</strong> {riskHistory.id}</p>
                    <p><strong>Date:</strong> {new Date(riskHistory.date).toLocaleString()}</p>
                    <p><strong>Risk Score:</strong> {riskHistory.risk_score}</p>
                    <p><strong>Threat Type:</strong> {riskHistory.threat_type}</p>

                    {/* Display the Threat Description in a TextArea */}
                    <p><strong>Threat Description:</strong></p>
                    <textarea 
                      value={riskHistory.threat_description} 
                      readOnly 
                      rows="6" 
                      style={{ width: '100%' }} 
                    />
                </div>
            </>
         ) : (
          // If there's no risk history (empty array or null)
          <h3>No risk history found for this asset.</h3>
        )}

        <button onClick={() => setShowRiskHistoryPopup(false)}>Close</button>
        </>
    </Popup>
  );
};

export default AssetRiskHistory;