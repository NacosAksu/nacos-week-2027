import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`nav-floating-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      <header className="nav-pill" aria-label="Main Navigation">
        {/* Brand / Logo */}
        <Link to="/" className="nav-pill__brand" aria-label="NACOS Week 2027 Home">
          <img
            src="/assets/brand/nw27-wordmark-v3-reversed.png"
            alt="NACOS Week 2027"
            width="1180"
            height="240"
            fetchPriority="high"
            decoding="async"
            className="nav-pill__logo"
          />
          <span className="nav-pill__status" aria-hidden="true">
            <span className="nav-pill__dot" />
            <span className="nav-pill__status-text">Feb &apos;27</span>
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="nav-pill__links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Home
          </NavLink>
          <NavLink to="/tracks" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Tracks
          </NavLink>
          <NavLink to="/programme" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Programme
          </NavLink>
          <NavLink to="/hackathon" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Hackathon
          </NavLink>
          <NavLink to="/partner" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Partner
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            About
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            FAQ
          </NavLink>
        </nav>

        {/* Right CTA Actions */}
        <div className="nav-pill__actions">
          <Link to="/register" className="nav-pill__cta">
            <span>Register Pass</span>
            <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
              <path fillRule="evenodd" d="M3.75 8a.75.75 0 0 1 .75-.75h5.69L7.97 5.03a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06-1.06l2.22-2.22H4.5A.75.75 0 0 1 3.75 8Z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`nav-pill__toggle ${isOpen ? 'is-active' : ''}`}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="nav-pill__toggle-bar" />
            <span className="nav-pill__toggle-bar" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Floating Panel */}
      {isOpen && (
        <div className="nav-pill__mobile-drawer" role="dialog" aria-modal="true">
          <div className="nav-pill__mobile-header">
            <span className="nav-pill__mobile-badge">
              <span className="nav-pill__dot" /> NACOS AKSU &bull; Confluence 2027
            </span>
          </div>

          <nav className="nav-pill__mobile-links">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/tracks" onClick={closeMenu}>Tracks</NavLink>
            <NavLink to="/programme" onClick={closeMenu}>Programme</NavLink>
            <NavLink to="/hackathon" onClick={closeMenu}>Hackathon</NavLink>
            <NavLink to="/partner" onClick={closeMenu}>Partner &amp; Sponsor</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About NACOS</NavLink>
            <NavLink to="/faq" onClick={closeMenu}>Venue &amp; FAQ</NavLink>
          </nav>

          <div className="nav-pill__mobile-bottom">
            <Link to="/register" className="nav-pill__mobile-cta" onClick={closeMenu}>
              Register for Free Pass &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
