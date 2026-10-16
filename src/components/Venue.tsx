import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const Venue: React.FC = () => {
  const { event } = siteConfig;

  return (
    <section className="section venue" id="venue" aria-labelledby="venue-title">
      <div className="wrap venue__grid">
        <div className="venue__text">
          <h1 id="venue-title" className="h2">Getting there</h1>
          <p className="venue__place">
            <span>{event.venue}</span>
          </p>
          <p className="venue__addr">
            Akwa Ibom State University, <span>{event.location}</span>
          </p>
          <p>
            The main hall seats 500. Open-crowd events (Football, Fashion &amp; Pageantry) use other grounds on campus, announced with the programme.
          </p>
          <a
            className="link"
            href="https://www.google.com/maps/search/?api=1&query=Akwa+Ibom+State+University+Ikot+Akpaden"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
        <div className="venue__map">
          <iframe
            title="Map of Akwa Ibom State University, Ikot Akpaden"
            src="https://www.google.com/maps?q=Akwa+Ibom+State+University,+Ikot+Akpaden&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
