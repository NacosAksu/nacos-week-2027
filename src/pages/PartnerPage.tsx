import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sponsorship } from '../components/Sponsorship';
import { BoothSection } from '../components/BoothSection';
import { PastSponsors } from '../components/PastSponsors';
import { siteConfig } from '../config/siteConfig';

export const PartnerPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/booth' ||
      location.pathname === '/booths' ||
      location.pathname === '/exhibit' ||
      location.hash === '#booths'
    ) {
      const el = document.getElementById('booths');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [location.pathname, location.hash]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isBoothActive =
    location.pathname === '/booth' ||
    location.pathname === '/booths' ||
    location.hash === '#booths';

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height, 4.5rem) + 1.25rem)' }}>
      {/* Editorial Header Quick Switcher Bar */}
      <div className="wrap" style={{ marginBottom: 'var(--space-md)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-sm)',
            padding: 'var(--space-xs) var(--space-sm)',
            background: '#ffffff',
            border: '1px solid var(--color-ink-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 10px rgba(11, 15, 12, 0.04)'
          }}
        >
          <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => scrollToSection('partner')}
              className={`deck-filter-btn ${!isBoothActive ? 'is-active' : ''}`}
            >
              06 / Sponsorship Tiers
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('booths')}
              className={`deck-filter-btn ${isBoothActive ? 'is-active' : ''}`}
            >
              07 / Exhibition Booths
            </button>
          </div>

          <a
            href={siteConfig.links.brochure || '/assets/docs/nacos-aksu-pitch-deck-2027.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            download="NACOS-Week-2027-Partnership-Brochure.pdf"
            className="btn btn--signal"
            style={{
              padding: '0.45rem 1rem',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '4px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download Brochure (PDF)</span>
          </a>
        </div>
      </div>

      {/* Sponsorship Tiers, Outcomes & Partner Wall */}
      <Sponsorship />

      {/* Exhibition & Vendor Booths Section */}
      <BoothSection />

      {/* Past Sponsors Ecosystem Marquee */}
      <PastSponsors />
    </div>
  );
};
