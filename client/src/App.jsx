import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';

import './App.css';

const App = () => {

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;