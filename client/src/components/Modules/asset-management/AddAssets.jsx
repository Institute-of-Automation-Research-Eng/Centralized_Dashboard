import { useState } from 'react';
import Popup from '../../utils/Popup';

const AddAssets = ({ 
    showAddAssetPopup,
    setShowAddAssetPopup,
    onAddAssetSubmit 
}) => {
  const [newAsset, setNewAsset] = useState({
    name: '',
    value: '',
    criticality: '',
    risk: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAssetSubmit(newAsset);
    setNewAsset({ name: '', value: '', criticality: '', risk: '' });
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
    </Popup>
  );
};

export default AddAssets;
