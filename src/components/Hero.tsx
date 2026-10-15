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

          <p className="hero__eyebrow">NACOS Week 2027</p>

          {/* Bold Editorial Headline */}
          <h1 id="hero-title" className="hero__title">
            CONFLUENCE<span className="hero__dot">.</span>
          </h1>

          <p className="hero__sectors">Energy, Finance, Oil &amp; Gas, Medicine and Technology, converging with computing.</p>

          {/* When / where */}
          <div className="hero__meta" aria-label="Key event details">
            <p className="hero__date">{event.datesLabel || 'February 2027'}</p>
            <p className="hero__venue">{event.venue || 'Conference Centre, Perm Site'}</p>
          </div>

          {/* High-Contrast Action CTAs */}
          <div className="hero__actions">
            <Link to="/register" className="hero__btn-primary">
              <span>Register</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <div className="hero__actions-pair">
              <Link to="/partner" className="hero__btn-secondary">
                <span>Partner With Us</span>
              </Link>
              <a
                href={siteConfig.links.brochure || '/assets/docs/nacos-aksu-pitch-deck-2027.pdf'}
                className="hero__btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partnership brochure (PDF, opens in a new tab)"
              >
                <span className="hero__label-long">Partnership Brochure</span>
                <span className="hero__label-short">Brochure (PDF)</span>
              </a>
            </div>
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
