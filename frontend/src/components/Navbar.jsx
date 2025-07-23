
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-left">
        <Link to="/" className="brand">
          AnalyzrX
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
        <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
      </div>

      <div className="theme-toggle">
        <button onClick={toggleTheme} title="Toggle Theme">
        {theme === 'light' ? '🌙' : '☀️'}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
