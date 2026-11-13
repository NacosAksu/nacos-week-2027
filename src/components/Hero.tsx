import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

const heroSlides = [1, 2, 3].map((n) => ({
  n,
  src: `/assets/hero/hero-${n}-1600.jpg`,
  srcset: `/assets/hero/hero-${n}-800.jpg 800w, /assets/hero/hero-${n}-1600.jpg 1600w`
}));

export const Hero: React.FC = () => {
  const { event } = siteConfig;
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="tf-hero" aria-labelledby="hero-title">
      <div className="tf-hero__photos" aria-hidden="true">
        {heroSlides.map((s, i) => (
          <img
            key={s.n}
            src={s.src}
            srcSet={s.srcset}
            sizes="100vw"
            alt=""
            className={i === activeSlide ? 'is-active' : ''}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        ))}
      </div>
      <div className="tf-liquid" aria-hidden="true"><span /><span /><span /><span /><span /></div>

      <div className="tf-hero__center">
        <Squiggle />
        <p className="tf-hero__kicker">NACOS Week 2027</p>
        <h1 id="hero-title" className="tf-hero__title">Confluence</h1>
        <p className="tf-hero__sub">Energy, Finance, Oil &amp; Gas and Medicine, converging with computing.</p>
        <div className="tf-hero__actions">
          <Link to="/register" className="tf-pill">
            <Arrow /> Register
          </Link>
          <Link to="/partner" className="tf-pill tf-pill--ghost">Partner with us</Link>
        </div>
        <a
          href={siteConfig.links.brochure || '/assets/docs/nacos-aksu-pitch-deck-2027.pdf'}
          className="tf-hero__brochure"
          target="_blank"
          rel="noopener noreferrer"
        >
          Partnership brochure (PDF)
        </a>

        {timeLeft && (
          <p className="tf-hero__countdown" aria-label="Countdown to NACOS Week 2027">
            {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.mins).padStart(2, '0')}m {String(timeLeft.secs).padStart(2, '0')}s
          </p>
        )}
      </div>

      <div className="tf-hero__meta" aria-label="When and where">
        <span>{event.datesLabel || 'February 2027'}</span>
        <span>{event.venue || 'Conference Centre, Perm Site'}</span>
        <span>Ikot Akpaden</span>
      </div>
    </section>
  );
};

// Small wave mark used beside eyebrows and on the hero, like the reference's "~"
export const Squiggle: React.FC<{ className?: string }> = ({ className = 'tf-squiggle' }) => (
  <svg className={className} viewBox="0 0 20 8" width="20" height="8" fill="none" aria-hidden="true">
    <path d="M1 6c2-5 4-5 6 0s4 5 6 0 4-5 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Arrow: React.FC = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
