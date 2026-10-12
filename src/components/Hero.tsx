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
      <section className="hero on-dark" aria-labelledby="hero-title">
        {/* Background Image: AKSU Convention Photo */}
        <img
          className="hero__bg"
          src="/assets/hero/IMG_0427.jpg.jpeg"
          alt="NACOS AKSU Convention Confluence Delegates"
          fetchPriority="high"
          decoding="async"
        />

        {/* Ambient Overlay Layer */}
        <div className="hero__overlay" aria-hidden="true" />

        <div className="wrap hero__inner">
          {/* Institutional Status Badge */}
          <div className="hero__badge">
            <span className="hero__pulse-dot" aria-hidden="true" />
            <span>NACOS AKSU &bull; CONFLUENCE 2027 &bull; ANNUAL FLAGSHIP CONVENTION</span>
          </div>

          {/* Grand Main Title */}
          <h1 id="hero-title" className="hero__title">
            Confluence<span className="hero__dot">.</span>
          </h1>

          {/* Kicker / Subtitle */}
          <p className="hero__kicker">
            Where Computing, Energy &amp; Future Industries Converge
          </p>

          {/* Metadata Chips Bar */}
          <div className="hero__meta">
            <div className="hero__meta-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="hero__when">{event.datesLabel || 'February 2027'}</span>
            </div>

            <div className="hero__meta-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="hero__where">
                {event.venue || 'Conference Centre, Perm Site'}, Akwa Ibom State University
              </span>
            </div>

            <div className="hero__meta-chip hero__meta-chip--highlight">
              <span>Open to All Students</span>
            </div>
          </div>

          {/* Enterprise Deck Summary */}
          <p className="hero__deck">
            Akwa Ibom State University&apos;s premier computing convention uniting 1,000+ student innovators, researchers, and tech founders across Energy, Finance, Oil &amp; Gas, Medicine, and Software.
          </p>

          {/* Action CTAs */}
          <div className="hero__actions">
            <Link to="/register" className="btn btn--signal hero__btn-primary" data-register-link>
              <span>Register for Free Pass</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="/partner" className="btn btn--ghost-night hero__btn-secondary">
              <span>Partner With Us</span>
            </Link>
            <Link to="/tracks" className="btn hero__btn-tertiary">
              <span>Explore 5 Tracks &rarr;</span>
            </Link>
          </div>

          {/* Countdown Component */}
          {timeLeft ? (
            <div className="countdown" data-countdown aria-live="off">
              <p className="countdown__label">Convention Kickoff In</p>
              <ol className="countdown__units">
                <li><span data-cd="d">{String(timeLeft.days).padStart(2, '0')}</span>days</li>
                <li><span data-cd="h">{String(timeLeft.hours).padStart(2, '0')}</span>hours</li>
                <li><span data-cd="m">{String(timeLeft.mins).padStart(2, '0')}</span>minutes</li>
                <li><span data-cd="s">{String(timeLeft.secs).padStart(2, '0')}</span>seconds</li>
              </ol>
            </div>
          ) : (
            <div className="countdown" data-countdown hidden aria-live="off">
              <p className="countdown__label">Convention Kickoff In</p>
              <ol className="countdown__units">
                <li><span data-cd="d">00</span>days</li>
                <li><span data-cd="h">00</span>hours</li>
                <li><span data-cd="m">00</span>minutes</li>
                <li><span data-cd="s">00</span>seconds</li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Metrics Strip */}
      <div className="nacos-metric-strip">
        <div className="wrap nacos-metric-strip__grid">
          <div className="nacos-metric-item">
            <span className="nacos-metric-val">5</span>
            <span className="nacos-metric-lbl">Industry Tracks</span>
          </div>
          <div className="nacos-metric-item">
            <span className="nacos-metric-val">5</span>
            <span className="nacos-metric-lbl">Flagship Pillars</span>
          </div>
          <div className="nacos-metric-item">
            <span className="nacos-metric-val">48h</span>
            <span className="nacos-metric-lbl">Build Hackathon</span>
          </div>
          <div className="nacos-metric-item">
            <span className="nacos-metric-val">1,000+</span>
            <span className="nacos-metric-lbl">Expected Attendees</span>
          </div>
          <div className="nacos-metric-item">
            <span className="nacos-metric-val">30,000+</span>
            <span className="nacos-metric-lbl">Campus Community Reach</span>
          </div>
        </div>
      </div>

      {/* Ticker marquee */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          <span>Confluence</span><span>Technology</span><span>Energy</span><span>Finance</span><span>Oil &amp; Gas</span><span>Healthcare</span><span>Innovation</span><span>Community</span><span>AKSU</span>
          <span>Confluence</span><span>Technology</span><span>Energy</span><span>Finance</span><span>Oil &amp; Gas</span><span>Healthcare</span><span>Innovation</span><span>Community</span><span>AKSU</span>
        </div>
      </div>
    </>
  );
};
