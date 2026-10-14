import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

export const Hero: React.FC = () => {
  const { event } = siteConfig;
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);

  useEffect(() => {
    if (!event.start) return;

    const target = new Date(event.start).getTime();
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.start]);

  return (
    <>
      <section className="deck-hero" aria-labelledby="hero-title">
        <div className="wrap deck-hero__inner">
          {/* Eyebrow kicker from Pitch Deck */}
          <div className="deck-hero__kicker">
            <span className="deck-hero__tag">NACOS AKSU</span>
            <span className="deck-hero__sep">/</span>
            <span>Faculty of Computing &amp; Information Technology</span>
            <span className="deck-hero__sep">/</span>
            <span>February 2027</span>
          </div>

          {/* Bold Editorial Headline */}
          <h1 id="hero-title" className="deck-hero__title">
            Where Computing Meets Industry.
          </h1>

          {/* Theme Anchor */}
          <p className="deck-hero__theme">
            NACOS Week 2027: <strong>Confluence</strong>
          </p>

          {/* Narrative Pitch Deck Description */}
          <p className="deck-hero__lead">
            Technology is no longer confined to the computing sector. It powers financial transactions, drives energy systems, transforms healthcare delivery, and strengthens oil and gas operations. Confluence brings students, innovators, and industry leaders into one shared ecosystem.
          </p>

          {/* Editorial Metadata Chips */}
          <div className="deck-hero__meta">
            <div className="deck-hero__chip">
              <span className="deck-hero__chip-label">When</span>
              <span className="deck-hero__chip-val">{event.datesLabel || 'February 2027'}</span>
            </div>
            <div className="deck-hero__chip">
              <span className="deck-hero__chip-label">Where</span>
              <span className="deck-hero__chip-val">{event.venue || 'Conference Centre'}, AKSU Perm Site</span>
            </div>
            <div className="deck-hero__chip">
              <span className="deck-hero__chip-label">Audience</span>
              <span className="deck-hero__chip-val">Open to all AKSU students</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="deck-hero__actions">
            <Link to="/register" className="btn btn--deep">
              Register for Free Pass
            </Link>
            <Link to="/partner" className="btn btn--outline">
              Partner With Us
            </Link>
            <Link to="/tracks" className="deck-hero__link">
              Explore 5 Tracks &rarr;
            </Link>
          </div>

          {/* Minimalist Countdown */}
          {timeLeft && (
            <div className="deck-countdown" aria-label="Event countdown">
              <span className="deck-countdown__label">Kickoff In</span>
              <div className="deck-countdown__grid">
                <div className="deck-countdown__item">
                  <span className="deck-countdown__val">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="deck-countdown__unit">Days</span>
                </div>
                <div className="deck-countdown__item">
                  <span className="deck-countdown__val">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="deck-countdown__unit">Hours</span>
                </div>
                <div className="deck-countdown__item">
                  <span className="deck-countdown__val">{String(timeLeft.mins).padStart(2, '0')}</span>
                  <span className="deck-countdown__unit">Mins</span>
                </div>
                <div className="deck-countdown__item">
                  <span className="deck-countdown__val">{String(timeLeft.secs).padStart(2, '0')}</span>
                  <span className="deck-countdown__unit">Secs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Editorial Key Metrics Grid */}
      <section className="deck-metrics" aria-label="Key Numbers">
        <div className="wrap deck-metrics__grid">
          <div className="deck-metrics__card">
            <span className="deck-metrics__num">05</span>
            <span className="deck-metrics__title">Industry Tracks</span>
            <span className="deck-metrics__desc">Energy, Finance, Oil &amp; Gas, Medicine, Technology</span>
          </div>
          <div className="deck-metrics__card">
            <span className="deck-metrics__num">05</span>
            <span className="deck-metrics__title">Flagship Pillars</span>
            <span className="deck-metrics__desc">Hackathon, Conference, Football, Pageantry, Dinner</span>
          </div>
          <div className="deck-metrics__card">
            <span className="deck-metrics__num">3 Wks</span>
            <span className="deck-metrics__title">Innovation Bootcamp</span>
            <span className="deck-metrics__desc">Teams race the clock on real industry problems</span>
          </div>
          <div className="deck-metrics__card">
            <span className="deck-metrics__num">500+</span>
            <span className="deck-metrics__title">Conference Hall Seats</span>
            <span className="deck-metrics__desc">Industry keynotes, live final pitches, panel debates</span>
          </div>
          <div className="deck-metrics__card">
            <span className="deck-metrics__num">30,000+</span>
            <span className="deck-metrics__title">Campus Student Reach</span>
            <span className="deck-metrics__desc">Akwa Ibom State University community-wide festival</span>
          </div>
        </div>
      </section>

      {/* Refined Brand Ticker */}
      <div className="deck-ticker" aria-hidden="true">
        <div className="deck-ticker__track">
          <span>CONFLUENCE</span><span>&bull;</span>
          <span>ENERGY</span><span>&bull;</span>
          <span>FINANCE</span><span>&bull;</span>
          <span>OIL &amp; GAS</span><span>&bull;</span>
          <span>MEDICINE</span><span>&bull;</span>
          <span>TECHNOLOGY</span><span>&bull;</span>
          <span>INNOVATION</span><span>&bull;</span>
          <span>COLLABORATION</span><span>&bull;</span>
          <span>NACOS AKSU</span><span>&bull;</span>
          <span>CONFLUENCE</span><span>&bull;</span>
          <span>ENERGY</span><span>&bull;</span>
          <span>FINANCE</span><span>&bull;</span>
          <span>OIL &amp; GAS</span><span>&bull;</span>
          <span>MEDICINE</span><span>&bull;</span>
          <span>TECHNOLOGY</span><span>&bull;</span>
          <span>INNOVATION</span><span>&bull;</span>
          <span>COLLABORATION</span><span>&bull;</span>
          <span>NACOS AKSU</span><span>&bull;</span>
        </div>
      </div>
    </>
  );
};
