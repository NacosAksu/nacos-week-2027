import React from 'react';
import { Link } from 'react-router-dom';

export const ClosingCTA: React.FC = () => {
  return (
    <section className="closer" aria-labelledby="closer-title">
      <div className="wrap closer__inner">
        <p className="closer__tag">NACOS Week 2027 &bull; Confluence</p>
        <h2 id="closer-title" className="closer__title">
          Be part of the Confluence.
        </h2>
        <p className="closer__desc">
          Connect your organisation with emerging talent, practical innovation, and the next generation of technology-enabled professionals at Akwa Ibom State University.
        </p>
        <div className="closer__actions">
          <Link to="/register" className="btn btn--deep">
            Register &rarr;
          </Link>
          <Link to="/partner" className="btn btn--outline">
            Partner with Us
          </Link>
        </div>
        <div className="closer__contacts">
          <span>0903 505 6134</span>
          <span>&bull;</span>
          <span>0906 484 7152</span>
          <span>&bull;</span>
          <span>hello@nacosaksu.com.ng</span>
          <span>&bull;</span>
          <span>Ikot Akpaden, Akwa Ibom State</span>
        </div>
      </div>
    </section>
  );
};
