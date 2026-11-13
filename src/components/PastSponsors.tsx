import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Squiggle, Arrow } from './Hero';

export const PastSponsors: React.FC = () => {
  const brands = siteConfig.pastSponsors.filter((b) => b && b.logo);

  return (
    <section className="tf-section" id="past-sponsors" aria-labelledby="past-title">
      <div className="wrap">
        <div className="tf-split tf-split--tight">
          <p className="tf-eyebrow"><Squiggle /> Partners</p>
          <div className="tf-split__row">
            <h2 id="past-title" className="tf-statement">
              <span className="tf-dim">For over a decade, NACOS Week has been backed by </span>
              partners who show up.
            </h2>
            <Link to="/partner" className="tf-link"><Arrow /> Partner with us</Link>
          </div>
        </div>

        <ul className="tf-logos">
          {brands.map((b, i) => (
            <li key={i} className={b.dark ? 'is-dark' : ''}>
              <img src={b.logo} alt={b.name || ''} loading="lazy" decoding="async" />
            </li>
          ))}
          <li className="tf-logos__cta">
            <p>Become a partner</p>
            <Link to="/partner" className="tf-pill tf-pill--white"><Arrow /> Get in touch</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
