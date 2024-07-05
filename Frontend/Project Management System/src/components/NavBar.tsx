import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import { useAuth } from './AuthContext';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate=useNavigate()

  const {logout} = useAuth();

  const handleSignout = () =>{
      logout();
  }


  return (
    <nav className="navbar fixed-top">
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`burger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
        <li><NavLink to="/list" className={({ isActive }) => (isActive ? 'active' : '')}>List</NavLink></li>
        <li><NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>Add</NavLink></li>
        <li><NavLink to="/signout" onClick={handleSignout} className={({ isActive }) => (isActive ? 'active' : '')}>Sign Out</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
