import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styels/Navbar.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuRef = useRef(null); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="hamburger-menu" onClick={toggleMenu}>
        ☰ 
      </div>
      <ul
        ref={menuRef} 
        className={`navbar-list ${isMenuOpen ? 'active' : ''}`}
      >
        <li>
          <Link to="/search-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Find roommate
          </Link>
        </li>
        <li>
          <Link to="/add-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Request a roommate
          </Link>
        </li>
        <li>
          <Link to="/my-requests" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            My Requests
          </Link>
        </li>
        <li>
          <Link to="/chatting" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Chatting
          </Link>
        </li>
        <li>
          <Link to="/settings" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
