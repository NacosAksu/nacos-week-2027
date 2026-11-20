import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import GooeyNav from './GooeyNav';

// Desktop nav: Home, then three sections whose links open in a dropdown
const GOOEY_ITEMS = [{ label: 'Home' }, { label: 'Programme' }, { label: 'Partners & Booths' }, { label: 'About' }];
const NAV_GROUPS = [null, 'programme', 'partners', 'festival'] as const;

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

  const navigate = useNavigate();
  const [menuLeft, setMenuLeft] = useState(0);
  const focusFirstRef = useRef(false);
  const gooeyItemAt = (target: EventTarget) => (target as HTMLElement).closest?.('[data-gooey-index]') as HTMLElement | null;

  // Opens (or, on click, toggles) the dropdown for a hovered or clicked nav item, centred under it
  const openGroup = (li: HTMLElement, toggle: boolean) => {
    const group = NAV_GROUPS[Number(li.dataset.gooeyIndex)];
    if (!group) {
      setActiveDropdown(null);
      return;
    }
    const navBox = navRef.current?.getBoundingClientRect();
    const box = li.getBoundingClientRect();
    if (navBox) setMenuLeft(box.left - navBox.left + box.width / 2);
    if (toggle) toggleDropdown(group);
    else handleMouseEnter(group);
  };

  useEffect(() => {
    if (!activeDropdown || !focusFirstRef.current) return;
    focusFirstRef.current = false;
    navRef.current?.querySelector<HTMLElement>('.nav-dropdown__menu a')?.focus();
  }, [activeDropdown]);

  // Check if any subroute is active for a dropdown group
  const isProgrammeActive = ['/tracks', '/programme', '/hackathon'].some(path => location.pathname.startsWith(path));
  const isPartnersActive = ['/partner', '/booth', '/booths', '/exhibit'].some(path => location.pathname.startsWith(path));
  const isFestivalActive = ['/about', '/faq', '/auth', '/login', '/signin'].some(path => location.pathname.startsWith(path));
  const gooeyActive = location.pathname === '/' ? 0 : isProgrammeActive ? 1 : isPartnersActive ? 2 : isFestivalActive ? 3 : -1;

  // Full-screen phone menu: freeze the page (and smooth scroll) behind it
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    document.documentElement.classList.toggle('menu-open', isOpen);
    if (isOpen) lenis?.stop(); else lenis?.start();
    return () => { document.documentElement.classList.remove('menu-open'); lenis?.start(); };
  }, [isOpen]);

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
            src="/assets/brand/nw27-wordmark-v3-reversed.png"
            alt="NACOS Week 2027"
            width="280"
            height="56"
            fetchPriority="high"
            decoding="async"
            className="site-header__logo"
          />
        </Link>

        {/* Desktop navigation: React Bits GooeyNav for the four sections, each section's links in a dropdown */}
        <nav
          className="site-header__nav site-header__gooey"
          aria-label="Primary"
          ref={navRef}
          onMouseOver={(e) => {
            const li = gooeyItemAt(e.target);
            if (li) openGroup(li, false);
          }}
          onMouseLeave={handleMouseLeave}
          onClickCapture={(e) => {
            const li = gooeyItemAt(e.target);
            if (!li) return;
            if (!NAV_GROUPS[Number(li.dataset.gooeyIndex)]) {
              closeMenu();
              navigate('/');
              return;
            }
            focusFirstRef.current = e.detail === 0; // opened from the keyboard: move focus into the menu
            openGroup(li, true);
          }}
        >
          <GooeyNav
            items={GOOEY_ITEMS}
            activeIndex={gooeyActive}
            theme="dark"
            size="sm"
            frame={true}
            color="#B8F0A6"
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect={true}
            style={{ '--gn-frame': 'rgba(255, 255, 255, 0.06)', '--gn-muted': 'rgba(255, 255, 255, 0.72)' } as React.CSSProperties}
          />

          {activeDropdown === 'programme' && (
            <div className="nav-dropdown__menu" role="menu" style={{ left: menuLeft }}>
              <Link to="/tracks" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                <div className="nav-dropdown__item-title">4 Industry Tracks</div>
                <div className="nav-dropdown__item-desc">Energy, Finance, Oil &amp; Gas, Medicine</div>
              </Link>
              <Link to="/programme" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                <div className="nav-dropdown__item-title">Programme</div>
                <div className="nav-dropdown__item-desc">The five events of the week</div>
              </Link>
              <Link to="/hackathon" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                <div className="nav-dropdown__item-title">Hackathon</div>
                <div className="nav-dropdown__item-desc">Team bootcamp ending in a live demo</div>
              </Link>
            </div>
          )}

          {activeDropdown === 'partners' && (
            <div className="nav-dropdown__menu" role="menu" style={{ left: menuLeft }}>
              <Link to="/partner" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                <div className="nav-dropdown__item-title">Sponsorship Packages</div>
                <div className="nav-dropdown__item-desc">Title, Gold, Silver, Bronze &amp; Friends tiers</div>
              </Link>
              <Link to="/booth" className="nav-dropdown__item" role="menuitem" onClick={closeMenu}>
                <div className="nav-dropdown__item-title">Exhibition Booths</div>
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

          {activeDropdown === 'festival' && (
            <div className="nav-dropdown__menu" role="menu" style={{ left: menuLeft }}>
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
        <div className="site-header__mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent>
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
                    <NavLink to="/tracks" onClick={closeMenu}>4 Industry Tracks</NavLink>
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

            <div className="site-header__mobile-foot">
              <Link to="/register" className="tf-pill" onClick={closeMenu}>Register for NACOS Week</Link>
              <p>{siteConfig.event.datesLabel || 'February 2027'} · Ikot Akpaden</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
