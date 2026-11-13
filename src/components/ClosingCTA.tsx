import React from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from './Hero';

export const ClosingCTA: React.FC = () => {
  return (
    <section className="tf-closer" aria-labelledby="closer-title">
      <div className="tf-glow" aria-hidden="true"><span /><span /><span /></div>
      <div className="wrap tf-closer__inner">
        <h2 id="closer-title" className="tf-closer__title">Join us in February.</h2>
        <p className="tf-closer__sub">Register for NACOS Week 2027, or bring your organisation in as a partner.</p>
        <div className="tf-actions tf-actions--center">
          <Link to="/register" className="tf-pill"><Arrow /> Register</Link>
          <Link to="/partner" className="tf-pill tf-pill--ghost">Partner with us</Link>
        </div>
      </div>
    </section>
  );
};
