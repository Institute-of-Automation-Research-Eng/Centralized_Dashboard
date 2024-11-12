import './Popup.css';

const Popup = ({ children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        {children}
      </div>
    </div>
  );
};

export default Popup;