import React from 'react';
import { Venue } from '../components/Venue';
import { FAQ } from '../components/FAQ';
import { ClosingCTA } from '../components/ClosingCTA';

export const VenueFaqPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      {/* Venue Information & Interactive Map */}
      <Venue />

      {/* Comprehensive FAQ Section */}
      <FAQ />

      <ClosingCTA />
    </div>
  );
};
