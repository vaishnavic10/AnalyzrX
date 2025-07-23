import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import UploadForm from './components/UploadForm';
import ChartDisplay from './components/ChartDisplay';
import UploadHistory from './components/UploadHistory';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
    <ThemeProvider>
    <Router>
      <Navbar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Functional Routes */}
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/analytics" element={<ChartDisplay />} />
        <Route path="/history" element={<UploadHistory />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
