import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

interface HeroSlide {
  id: number;
  src: string;
  srcset: string;
  alt: string;
  tag: string;
  caption: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    src: '/assets/hero/hero-1-1600.jpg',
    srcset: '/assets/hero/hero-1-800.jpg 800w, /assets/hero/hero-1-1600.jpg 1600w, /assets/hero/hero-1.jpeg 5000w',
    alt: 'AKSU Innovation Summit delegates and student executives on the conference stage celebrating innovation',
    tag: 'Delegates & Committee',
    caption: 'AKSU Innovation Summit 24: Student Innovators & Organizing Executive Team'
  },
  {
    id: 2,
    src: '/assets/hero/hero-2-1600.jpg',
    srcset: '/assets/hero/hero-2-800.jpg 800w, /assets/hero/hero-2-1600.jpg 1600w, /assets/hero/hero-2.jpeg 5000w',
    alt: 'Packed 500-seat auditorium at Akwa Ibom State University Conference Centre facing the keynote presentation',
    tag: 'Keynote Auditorium',
    caption: 'Conference Centre Perm Site: Over 500 students gathered for keynote sessions'
  },
  {
    id: 3,
    src: '/assets/hero/hero-3-1600.jpg',
    srcset: '/assets/hero/hero-3-800.jpg 800w, /assets/hero/hero-3-1600.jpg 1600w, /assets/hero/hero-3.jpeg 5000w',
    alt: 'Main stage and auditorium seating at the AKSU Conference Centre during presentation rehearsals',
    tag: 'Main Stage & Venue',
    caption: 'Main Auditorium: State-of-the-art keynote hall and presentation stage'
  }
];

export const Hero: React.FC = () => {
  const { event } = siteConfig;
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance background carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
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

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <>
      <section className="hero on-dark" aria-labelledby="hero-title">
        {/* Background Image Carousel with Smooth Cross-Fade */}
        <div className="hero__bg-carousel" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero__bg-slide ${index === activeSlide ? 'is-active' : ''}`}
            >
              <img
                src={slide.src}
                srcSet={slide.srcset}
                sizes="100vw"
                alt=""
                className="hero__bg-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Ambient Dark Overlay for Editorial Contrast */}
        <div className="hero__overlay" aria-hidden="true" />

        <div className="wrap hero__inner">
          {/* Eyebrow kicker from Pitch Deck */}
          <div className="hero__kicker-row">
            <div className="hero__badge">
              <span className="hero__pulse-dot" aria-hidden="true" />
              <span>NACOS AKSU &bull; CONFLUENCE 2027</span>
            </div>
            <span className="hero__kicker-sub">Faculty of Computing &amp; Information Technology</span>
          </div>

          {/* Bold Editorial Headline */}
          <h1 id="hero-title" className="hero__title">
            Where Computing Meets Industry<span className="hero__dot">.</span>
          </h1>

          {/* Theme Anchor */}
          <p className="hero__theme">
            NACOS Week 2027: <strong>Confluence</strong>
          </p>

          {/* Narrative Pitch Deck Description */}
          <p className="hero__lead">
            Technology is no longer confined to the computing sector. It powers financial transactions, drives energy systems, transforms healthcare delivery, and strengthens oil and gas operations. Confluence brings students, innovators, and industry leaders into one shared ecosystem.
          </p>

          {/* Metadata Chips Bar */}
          <div className="hero__meta">
            <div className="hero__meta-chip">
              <span className="hero__meta-chip-label">When</span>
              <span className="hero__meta-chip-val">{event.datesLabel || 'February 2027'}</span>
            </div>
            <div className="hero__meta-chip">
              <span className="hero__meta-chip-label">Where</span>
              <span className="hero__meta-chip-val">{event.venue || 'Conference Centre'}, AKSU Perm Site</span>
            </div>
            <div className="hero__meta-chip hero__meta-chip--highlight">
              <span className="hero__meta-chip-label">Audience</span>
              <span className="hero__meta-chip-val">Open to all AKSU students</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero__actions">
            <Link to="/register" className="btn btn--signal hero__btn-primary">
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

          {/* Minimalist Countdown */}
          {timeLeft && (
            <div className="hero__countdown" aria-label="Event countdown">
              <span className="hero__countdown-label">Convention Kickoff In</span>
              <div className="hero__countdown-grid">
                <div className="hero__countdown-item">
                  <span className="hero__countdown-val">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="hero__countdown-unit">Days</span>
                </div>
                <div className="hero__countdown-item">
                  <span className="hero__countdown-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="hero__countdown-unit">Hours</span>
                </div>
                <div className="hero__countdown-item">
                  <span className="hero__countdown-val">{String(timeLeft.mins).padStart(2, '0')}</span>
                  <span className="hero__countdown-unit">Mins</span>
                </div>
                <div className="hero__countdown-item">
                  <span className="hero__countdown-val">{String(timeLeft.secs).padStart(2, '0')}</span>
                  <span className="hero__countdown-unit">Secs</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Minimalist Background Carousel Status & Nav */}
        <div className="hero__bg-controls" aria-label="Background image switcher">
          <div className="wrap hero__bg-controls-inner">
            <div className="hero__bg-info">
              <span className="hero__bg-tag">{heroSlides[activeSlide].tag}</span>
              <span className="hero__bg-caption">{heroSlides[activeSlide].caption}</span>
            </div>
            <div className="hero__bg-nav">
              <button
                type="button"
                className="hero__bg-btn"
                onClick={prevSlide}
                aria-label="Previous background photo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="hero__bg-counter">
                <span>0{activeSlide + 1}</span>
                <span className="hero__bg-counter-sep">/</span>
                <span>0{heroSlides.length}</span>
              </div>
              <button
                type="button"
                className="hero__bg-btn"
                onClick={nextSlide}
                aria-label="Next background photo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
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
