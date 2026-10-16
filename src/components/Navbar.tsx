import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Phone menu: one group open at a time, starting with the group for the current page
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const toggleMobileGroup = (name: string) => {
    setMobileGroup(prev => (prev === name ? null : name));
  };

  const toggleDropdown = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  // Check if any subroute is active for a dropdown group
  const isProgrammeActive = ['/tracks', '/programme', '/hackathon'].some(path => location.pathname.startsWith(path));
  const isPartnersActive = ['/partner', '/booth', '/booths', '/exhibit'].some(path => location.pathname.startsWith(path));
  const isFestivalActive = ['/about', '/faq', '/auth', '/login', '/signin'].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    if (!isOpen) return;
    setMobileGroup(
      isProgrammeActive ? 'programme'
        : isPartnersActive ? 'partners'
        : ['/about', '/faq'].some(path => location.pathname.startsWith(path)) ? 'about'
        : null
    );
  }, [isOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`} aria-label="Main Navigation">
      <div className="wrap site-header__inner">
        {/* Brand / Logo */}
        <Link to="/" className="site-header__brand" aria-label="NACOS Week 2027 Home" onClick={closeMenu}>
          <img
            src="/assets/brand/nw27-wordmark-v3.png"
            alt="NACOS Week 2027"
            width="280"
            height="56"
            fetchPriority="high"
            decoding="async"
            className="site-header__logo"
          />
        </Link>

        {/* Center Navigation Links (Desktop with Clean Dropdowns) */}
        <nav className="site-header__nav" aria-label="Primary" ref={navRef}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Home
          </NavLink>

          {/* Events & Programme Dropdown */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => handleMouseEnter('programme')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`nav-dropdown__btn ${isProgrammeActive ? 'is-active' : ''}`}
              onClick={() => toggleDropdown('programme')}
              aria-expanded={activeDropdown === 'programme'}
              aria-haspopup="true"
            >
              <span>Programme</span>
              <svg className="nav-dropdown__chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {activeDropdown === 'programme' && (
              <div className="nav-dropdown__menu" role="menu">
                <Link to="/tracks" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">5 Industry Tracks</div>
                  <div className="nav-dropdown__item-desc">Energy, Fintech, Oil &amp; Gas, Medicine, Technology</div>
                </Link>
                <Link to="/programme" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">Programme</div>
                  <div className="nav-dropdown__item-desc">The five events of the week</div>
                </Link>
                <Link to="/hackathon" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">
                    Hackathon
                  </div>
                  <div className="nav-dropdown__item-desc">Team bootcamp ending in a live demo</div>
                </Link>
              </div>
            )}
          </div>

          {/* Partners & Booths Dropdown */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => handleMouseEnter('partners')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`nav-dropdown__btn ${isPartnersActive ? 'is-active' : ''}`}
              onClick={() => toggleDropdown('partners')}
              aria-expanded={activeDropdown === 'partners'}
              aria-haspopup="true"
            >
              <span>Partners &amp; Booths</span>
              <svg className="nav-dropdown__chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {activeDropdown === 'partners' && (
              <div className="nav-dropdown__menu" role="menu">
                <Link to="/partner" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">Sponsorship Packages</div>
                  <div className="nav-dropdown__item-desc">Title, Gold, Silver, Bronze &amp; Friends tiers</div>
                </Link>
                <Link to="/booth" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">
                    Exhibition Booths
                  </div>
                  <div className="nav-dropdown__item-desc">Trade Fair booths on Conference Day</div>
                </Link>
                <a
                  href={siteConfig.links.brochure || '/assets/docs/nacos-aksu-pitch-deck-2027.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-dropdown__item"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  <div className="nav-dropdown__item-title">
                    Partnership Brochure
                    <span className="nav-dropdown__item-badge">PDF</span>
                  </div>
                  <div className="nav-dropdown__item-desc">Partnership tiers, benefits and booth sizes</div>
                </a>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => handleMouseEnter('festival')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`nav-dropdown__btn ${isFestivalActive ? 'is-active' : ''}`}
              onClick={() => toggleDropdown('festival')}
              aria-expanded={activeDropdown === 'festival'}
              aria-haspopup="true"
            >
              <span>About</span>
              <svg className="nav-dropdown__chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {activeDropdown === 'festival' && (
              <div className="nav-dropdown__menu" role="menu">
                <Link to="/about" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">About NACOS AKSU</div>
                  <div className="nav-dropdown__item-desc">The chapter and the team behind the week</div>
                </Link>
                <Link to="/faq" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">Venue &amp; FAQ</div>
                  <div className="nav-dropdown__item-desc">Akwa Ibom State University location &amp; attendee guide</div>
                </Link>
                <Link to="/auth" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                  <div className="nav-dropdown__item-title">My Pass</div>
                  <div className="nav-dropdown__item-desc">Get your registration ID emailed to you again</div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="site-header__actions">
          <Link to="/register" className="btn btn--header-cta" onClick={closeMenu}>
            Register<span className="btn--header-cta__extra"> Pass</span>
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

              <div className={`site-header__mobile-group ${mobileGroup === 'programme' ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="site-header__mobile-group-btn"
                  aria-expanded={mobileGroup === 'programme'}
                  onClick={() => toggleMobileGroup('programme')}
                >
                  Programme
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
                </button>
                {mobileGroup === 'programme' && (
                  <div className="site-header__mobile-sub">
                    <NavLink to="/tracks" onClick={closeMenu}>5 Industry Tracks</NavLink>
                    <NavLink to="/programme" onClick={closeMenu}>Programme</NavLink>
                    <NavLink to="/hackathon" onClick={closeMenu}>Hackathon</NavLink>
                  </div>
                )}
              </div>

              <div className={`site-header__mobile-group ${mobileGroup === 'partners' ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="site-header__mobile-group-btn"
                  aria-expanded={mobileGroup === 'partners'}
                  onClick={() => toggleMobileGroup('partners')}
                >
                  Partners &amp; Booths
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
                </button>
                {mobileGroup === 'partners' && (
                  <div className="site-header__mobile-sub">
                    <NavLink to="/partner" onClick={closeMenu}>Sponsorship Packages</NavLink>
                    <NavLink to="/booth" onClick={closeMenu}>Exhibition Booths</NavLink>
                    <a href={siteConfig.links.brochure || '/assets/docs/nacos-aksu-pitch-deck-2027.pdf'} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                      Partnership Brochure (PDF)
                    </a>
                  </div>
                )}
              </div>

              <div className={`site-header__mobile-group ${mobileGroup === 'about' ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="site-header__mobile-group-btn"
                  aria-expanded={mobileGroup === 'about'}
                  onClick={() => toggleMobileGroup('about')}
                >
                  About
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
                </button>
                {mobileGroup === 'about' && (
                  <div className="site-header__mobile-sub">
                    <NavLink to="/about" onClick={closeMenu}>About NACOS AKSU</NavLink>
                    <NavLink to="/faq" onClick={closeMenu}>Venue &amp; FAQ</NavLink>
                  </div>
                )}
              </div>

              <NavLink to="/auth" onClick={closeMenu}>My Pass</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
