import Popup from '../../utils/Popup';

const AssetDetails = ({ 
    showAssetPopup, 
    selectedAsset, 
    setShowAssetPopup 
}) => {
  if (!showAssetPopup || !selectedAsset) return null;

  const assetDetailsContent = (
    <>
      <h3>Asset Details</h3>
      <div className="asset-details">
        <p><strong>ID:</strong> {selectedAsset.id}</p>
        <p><strong>Name:</strong> {selectedAsset.name}</p>
        <p><strong>Value:</strong> ${selectedAsset.value}</p>
        <p><strong>Criticality:</strong> {selectedAsset.criticality}</p>
        <p><strong>Risk:</strong> {selectedAsset.risk}</p>
      </div>
      <button onClick={() => setShowAssetPopup(false)}>Close</button>
    </>
  );

  return <Popup>{assetDetailsContent}</Popup>;
};

export default AssetDetails;
