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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`} aria-label="Main Navigation">
      <div className="wrap site-header__inner">
        {/* Brand / Logo */}
        <Link to="/" className="site-header__brand" aria-label="NACOS Week 2027 Home">
          <img
            src="/assets/brand/nw27-wordmark-v3.png"
            alt="NACOS Week 2027"
            width="280"
            height="56"
            fetchPriority="high"
            decoding="async"
            className="site-header__logo"
          />
          <span className="site-header__badge">
            Confluence &apos;27
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="site-header__nav" aria-label="Primary">
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
        <div className="site-header__actions">
          <Link to="/register" className="btn btn--header-cta">
            Register Pass
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`site-header__toggle ${isOpen ? 'is-open' : ''}`}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="site-header__toggle-line" />
            <span className="site-header__toggle-line" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="site-header__mobile-menu" role="dialog" aria-modal="true">
          <div className="wrap site-header__mobile-inner">
            <nav className="site-header__mobile-nav">
              <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
              <NavLink to="/tracks" onClick={closeMenu}>5 Industry Tracks</NavLink>
              <NavLink to="/programme" onClick={closeMenu}>5 Flagship Pillars</NavLink>
              <NavLink to="/hackathon" onClick={closeMenu}>Innovation Hackathon</NavLink>
              <NavLink to="/partner" onClick={closeMenu}>Sponsorship &amp; Partnerships</NavLink>
              <NavLink to="/about" onClick={closeMenu}>About NACOS AKSU</NavLink>
              <NavLink to="/faq" onClick={closeMenu}>Venue &amp; FAQ</NavLink>
              <NavLink to="/auth" onClick={closeMenu}>My Pass / Sign In</NavLink>
            </nav>
            <div className="site-header__mobile-action">
              <Link to="/register" className="btn btn--header-cta" style={{ width: '100%' }} onClick={closeMenu}>
                Register for Free Pass &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
