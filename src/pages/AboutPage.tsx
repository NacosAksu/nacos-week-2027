import React from 'react';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { PhotoCarousel } from '../components/PhotoCarousel';
import { PastSponsors } from '../components/PastSponsors';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      {/* About Overview & 4 Metric Highlights */}
      <About />

      {/* Leadership Team Behind the Week */}
      <Team />

      {/* Photo Archive */}
      <PhotoCarousel />

      {/* Past Sponsors Marquee */}
      <PastSponsors />
    </div>
  );
};
