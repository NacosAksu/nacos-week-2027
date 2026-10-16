import React from 'react';
import { Link } from 'react-router-dom';
import { Hackathon } from '../components/Hackathon';
import { Speakers } from '../components/Speakers';

export const HackathonPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      {/* Hackathon Overview & Step-by-Step Flow */}
      <Hackathon />

      {/* Mentor and Judge Silhouette Grid */}
      <Speakers />

      {/* Incubation & Prizes Section */}
      <section className="section" style={{ background: 'var(--brand-deep)', color: 'var(--brand-off)' }}>
        <div className="wrap">
          <header className="section__head">
            <p className="tag">Post-Week Incubation</p>
            <h2 className="h2" style={{ color: 'var(--brand-off)' }}>Beyond the Demo Stage</h2>
            <p className="lead" style={{ color: 'var(--color-on-forest-muted)' }}>
              Projects don't die after the awards. Winning teams are planned to become the inaugural cohort of the FCIT Tech Hub Incubation programme.
            </p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-xl)', marginTop: 'var(--space-xl)' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-forest-rule)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-xs)', color: 'var(--brand-soft)' }}>Seed Grants &amp; Prizes</h3>
              <p style={{ color: 'var(--color-on-forest-muted)', fontSize: 'var(--text-sm)' }}>
                Cash rewards, developer hardware, and cloud credits sponsored directly by our sector track partners.
              </p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-forest-rule)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-xs)', color: 'var(--brand-soft)' }}>1-on-1 Sector Mentorship</h3>
              <p style={{ color: 'var(--color-on-forest-muted)', fontSize: 'var(--text-sm)' }}>
                Dedicated technical and product mentors from leading Nigerian fintech, energy, and tech ecosystems.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-3xl)', textAlign: 'center' }}>
            <Link to="/register" className="btn btn--signal">
              Register for Hackathon Updates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
