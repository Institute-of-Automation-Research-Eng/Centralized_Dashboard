//import React from 'react';
import './App.css';
//import Login from './Login';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; // Import Login component
import Home from './Home';   // Import Home component


/*function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
} 

export default App; */

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />     {/* Route for Login page */}
          <Route path="/home" element={<Home />} />  {/* Route for Home page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

