import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab, tabOptions, isSidebar }) => {
  const formatTabName = (tabName) => {
    return tabName.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <div className={`tabs ${isSidebar ? 'sidebar' : 'horizontal'}`}>
      {tabOptions.map((tab, index) => (
        <button
          key={index}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {formatTabName(tab)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
