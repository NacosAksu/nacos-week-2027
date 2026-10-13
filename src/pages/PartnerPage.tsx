import React from 'react';
import { Sponsorship } from '../components/Sponsorship';
import { BoothSection } from '../components/BoothSection';
import { PastSponsors } from '../components/PastSponsors';

export const PartnerPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      {/* Sponsorship Tiers, Outcomes & Partner Wall */}
      <Sponsorship />

      {/* Exhibition & Vendor Booths Section */}
      <BoothSection />

      {/* Past Sponsors Ecosystem Marquee */}
      <PastSponsors />
    </div>
  );
};
