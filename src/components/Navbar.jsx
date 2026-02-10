import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <Logo size={28} />
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <i className="fas fa-home"></i> Home
          </Link>
          
          {currentUser && (
            <>
              {userRole === 'attendee' && (
                <Link 
                  to="/my-tickets" 
                  className={`nav-link ${location.pathname === '/my-tickets' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-ticket-alt"></i> My Tickets
                </Link>
              )}
              {userRole === 'organizer' && (
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-chart-line"></i> Dashboard
                </Link>
              )}
            </>
          )}
        </div>

        {/* User Actions */}
        <div className={`nav-actions ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {currentUser ? (
            <div className="user-menu">
              <span className="user-email">
                <i className="fas fa-user-circle"></i> {currentUser.email}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileMenu}>
                <i className="fas fa-user-plus"></i> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
