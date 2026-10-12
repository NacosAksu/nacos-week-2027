import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Tracks } from '../components/Tracks';
import { Programme } from '../components/Programme';
import { Hackathon } from '../components/Hackathon';
import { PhotoCarousel } from '../components/PhotoCarousel';
import { PastSponsors } from '../components/PastSponsors';
import { ClosingCTA } from '../components/ClosingCTA';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Tracks />
      <Programme />
      <Hackathon />
      <PhotoCarousel />
      <PastSponsors />
      <ClosingCTA />
    </>
  );
};

export default HomePage;
