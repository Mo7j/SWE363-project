import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styels/Navbar.css'; // Link to your Navbar styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle
  const menuRef = useRef(null); // Ref for the menu to detect outside clicks

  // Toggle the menu on hamburger click
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    // Close menu when clicking outside the navbar
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="hamburger-menu" onClick={toggleMenu}>
        ☰ {/* Hamburger icon */}
      </div>
      <ul
        ref={menuRef} // Attach ref to the menu
        className={`navbar-list ${isMenuOpen ? 'active' : ''}`}
      >
        <li>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/search-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Search Request
          </Link>
        </li>
        <li>
          <Link to="/add-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Add Request
          </Link>
        </li>
        <li>
          <Link to="/my-requests" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            My Requests
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
