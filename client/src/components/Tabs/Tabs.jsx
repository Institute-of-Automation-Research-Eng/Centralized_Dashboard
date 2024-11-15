import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab, tabOptions, isSidebar }) => {
  return (
    <div className={`tabs ${isSidebar ? 'sidebar' : 'horizontal'}`}>
      {tabOptions.map((tab, index) => (
        <button
          key={index}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
