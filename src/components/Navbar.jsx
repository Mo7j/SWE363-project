import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styels/Navbar.css';
import { useLanguage } from '../locales/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { t } = useLanguage();

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
      <ul ref={menuRef} className={`navbar-list ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/search-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t("navbar_find")}
          </Link>
        </li>
        <li>
          <Link to="/add-request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t("navbar_add")}
          </Link>
        </li>
        <li>
          <Link to="/my-requests" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t("navbar_my")}
          </Link>
        </li>
        <li>
          <Link to="/chatting" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t("navbar_chat")}
          </Link>
        </li>
        <li>
          <Link to="/settings" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t("navbar_settings")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
