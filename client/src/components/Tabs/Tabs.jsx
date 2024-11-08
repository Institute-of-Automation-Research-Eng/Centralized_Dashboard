import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'module1', label: 'Module 01' },
    { id: 'module2', label: 'Module 02' },
    { id: 'module3', label: 'Module 03' },
    { id: 'module4', label: 'Module 04' },
    { id: 'module5', label: 'Module 05' },
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;