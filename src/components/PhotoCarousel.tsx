import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Slide {
  src: string;
  srcset: string;
  alt: string;
  contain?: boolean;
  style?: React.CSSProperties;
}

const slides: Slide[] = [
  {
    src: "/assets/carousel/slide-06.jpg",
    srcset: "/assets/carousel/slide-06-800.jpg 800w, /assets/carousel/slide-06.jpg 1520w",
    alt: "Students and NACOS executives celebrating on stage at NACOS Week 2025"
  },
  {
    src: "/assets/carousel/slide-26.jpg",
    srcset: "/assets/carousel/slide-26-800.jpg 800w, /assets/carousel/slide-26.jpg 1600w",
    alt: "Executives and pageant winners on stage at NACOS Week 2025",
    style: { objectPosition: "center 15%" }
  },
  {
    src: "/assets/carousel/slide-01.jpg",
    srcset: "/assets/carousel/slide-01-800.jpg 800w, /assets/carousel/slide-01.jpg 1600w",
    alt: "Contestants dancing on stage at a previous NACOS Week"
  },
  {
    src: "/assets/carousel/slide-02.jpg",
    srcset: "/assets/carousel/slide-02-800.jpg 800w, /assets/carousel/slide-02.jpg 1600w",
    alt: "A packed hall, with pageant contestants in sashes and crowns"
  },
  {
    src: "/assets/carousel/slide-03.jpg",
    srcset: "/assets/carousel/slide-03-800.jpg 800w, /assets/carousel/slide-03.jpg 1600w",
    alt: "Students chatting in the hall between sessions"
  },
  {
    src: "/assets/carousel/slide-04.jpg",
    srcset: "/assets/carousel/slide-04-800.jpg 800w, /assets/carousel/slide-04.jpg 1600w",
    alt: "Guests seated in the audience"
  },
  {
    src: "/assets/carousel/slide-07.jpg",
    srcset: "/assets/carousel/slide-07-800.jpg 800w, /assets/carousel/slide-07.jpg 1600w",
    alt: "A full hall facing the stage"
  },
  {
    src: "/assets/carousel/slide-08.jpg",
    srcset: "/assets/carousel/slide-08-800.jpg 800w, /assets/carousel/slide-08.jpg 1600w",
    alt: "A guest speaker at the podium"
  },
  {
    src: "/assets/carousel/slide-09.jpg",
    srcset: "/assets/carousel/slide-09-800.jpg 800w, /assets/carousel/slide-09.jpg 1600w",
    alt: "Students at a sponsor's booth"
  },
  {
    src: "/assets/carousel/slide-10.jpg",
    srcset: "/assets/carousel/slide-10-800.jpg 800w, /assets/carousel/slide-10.jpg 1600w",
    alt: "A team in matching hoodies in front of the sponsor backdrop"
  },
  {
    src: "/assets/carousel/slide-11.jpg",
    srcset: "/assets/carousel/slide-11-800.jpg 800w, /assets/carousel/slide-11.jpg 1600w",
    alt: "A performer on stage with a microphone",
    contain: true
  },
  {
    src: "/assets/carousel/slide-12.jpg",
    srcset: "/assets/carousel/slide-12-800.jpg 800w, /assets/carousel/slide-12.jpg 1600w",
    alt: "Students setting up a hardware project"
  },
  {
    src: "/assets/carousel/slide-13.jpg",
    srcset: "/assets/carousel/slide-13-800.jpg 800w, /assets/carousel/slide-13.jpg 1600w",
    alt: "A student wiring up a prototype"
  },
  {
    src: "/assets/carousel/slide-14.jpg",
    srcset: "/assets/carousel/slide-14-800.jpg 800w, /assets/carousel/slide-14.jpg 1600w",
    alt: "Students in branded caps and shirts in the audience"
  },
  {
    src: "/assets/carousel/slide-15.jpg",
    srcset: "/assets/carousel/slide-15-800.jpg 800w, /assets/carousel/slide-15.jpg 1600w",
    alt: "Students on stage at NACOS Week 2024"
  },
  {
    src: "/assets/carousel/slide-16.jpg",
    srcset: "/assets/carousel/slide-16-800.jpg 800w, /assets/carousel/slide-16.jpg 1600w",
    alt: "An award presented on stage"
  },
  {
    src: "/assets/carousel/slide-17.jpg",
    srcset: "/assets/carousel/slide-17-800.jpg 800w, /assets/carousel/slide-17.jpg 1600w",
    alt: "Guests in front of the sponsor backdrop"
  },
  {
    src: "/assets/carousel/slide-18.jpg",
    srcset: "/assets/carousel/slide-18-800.jpg 800w, /assets/carousel/slide-18.jpg 1600w",
    alt: "Students checking their phones at an outdoor booth"
  },
  {
    src: "/assets/carousel/slide-19.jpg",
    srcset: "/assets/carousel/slide-19-800.jpg 800w, /assets/carousel/slide-19.jpg 1600w",
    alt: "Guests walking down the hall stairs"
  },
  {
    src: "/assets/carousel/slide-20.jpg",
    srcset: "/assets/carousel/slide-20-800.jpg 800w, /assets/carousel/slide-20.jpg 1600w",
    alt: "Students in the audience"
  },
  {
    src: "/assets/carousel/slide-21.jpg",
    srcset: "/assets/carousel/slide-21-800.jpg 800w, /assets/carousel/slide-21.jpg 1600w",
    alt: "Guests walking across the campus grounds"
  },
  {
    src: "/assets/carousel/slide-22.jpg",
    srcset: "/assets/carousel/slide-22-800.jpg 800w, /assets/carousel/slide-22.jpg 1600w",
    alt: "Guests arriving at the hall"
  },
  {
    src: "/assets/carousel/slide-23.jpg",
    srcset: "/assets/carousel/slide-23-800.jpg 800w, /assets/carousel/slide-23.jpg 1600w",
    alt: "Guests greeting each other in the hall"
  },
  {
    src: "/assets/carousel/slide-24.jpg",
    srcset: "/assets/carousel/slide-24-800.jpg 800w, /assets/carousel/slide-24.jpg 1600w",
    alt: "An award being presented"
  },
  {
    src: "/assets/carousel/slide-25.jpg",
    srcset: "/assets/carousel/slide-25-800.jpg 800w, /assets/carousel/slide-25.jpg 1600w",
    alt: "A guest waving from the audience"
  },
  {
    src: "/assets/carousel/slide-05.jpg",
    srcset: "/assets/carousel/slide-05-800.jpg 800w, /assets/carousel/slide-05.jpg 1200w",
    alt: "Quote card: Curiosity acts as the spring board of creativity, Mr Hanson Johnson, CEO Start-up Hub",
    contain: true
  }
];

export const PhotoCarousel: React.FC = () => {
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isPaused = useRef(false);
  const isVisible = useRef(false);

  const goTo = useCallback((index: number) => {
    const nextIdx = (index + slides.length) % slides.length;
    setCurrent(nextIdx);
    if (trackRef.current) {
      const slideNodes = trackRef.current.children;
      if (slideNodes[nextIdx]) {
        const targetEl = slideNodes[nextIdx] as HTMLElement;
        trackRef.current.scrollTo({
          left: targetEl.offsetLeft - (slideNodes[0] as HTMLElement).offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const firstSlide = trackRef.current.children[0] as HTMLElement | undefined;
    const slideWidth = firstSlide?.offsetWidth || 1;
    const newIdx = Math.min(
      slides.length - 1,
      Math.max(0, Math.round(trackRef.current.scrollLeft / slideWidth))
    );
    if (newIdx !== current) {
      setCurrent(newIdx);
    }
  }, [current]);

  useEffect(() => {
    const car = carRef.current;
    const track = trackRef.current;
    if (!car || !track) return;

    let timer: number | null = null;
    const onScroll = () => {
      if (timer) cancelAnimationFrame(timer);
      timer = requestAnimationFrame(handleScroll);
    };
    track.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0].isIntersecting;
      },
      { threshold: 0.3 }
    );
    observer.observe(car);

    const autoInterval = setInterval(() => {
      if (!isPaused.current && isVisible.current && !document.hidden && lightboxIndex === null) {
        goTo(current + 1);
      }
    }, 6000);

    return () => {
      track.removeEventListener('scroll', onScroll);
      if (timer) cancelAnimationFrame(timer);
      observer.disconnect();
      clearInterval(autoInterval);
    };
  }, [current, goTo, handleScroll, lightboxIndex]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? (prev + 1) % slides.length : 0));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null ? (prev - 1 + slides.length) % slides.length : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <>
      <section className="section archive" id="archive" aria-labelledby="archive-title">
        <div className="wrap">
          <header className="section__head section__head--split">
            <div>
              <div className="deck-eyebrow">
                <span className="deck-eyebrow__num">07</span>
                <span className="deck-eyebrow__text">NACOS AKSU Gallery</span>
              </div>
              <h2 id="archive-title" className="h2">Over a Decade of Community</h2>
            </div>
            <p className="lead">
              NACOS Week has run for over a decade at Akwa Ibom State University. Captured moments of innovation, teamwork, and celebration across campus.
            </p>
          </header>

          <div
            className="carousel"
            data-carousel
            ref={carRef}
            aria-roledescription="carousel"
            aria-label="Moments from earlier editions"
            onPointerEnter={() => { isPaused.current = true; }}
            onPointerLeave={() => { isPaused.current = false; }}
            onFocusCapture={() => { isPaused.current = true; }}
            onBlurCapture={() => { isPaused.current = false; }}
          >
            <ul className="carousel__track" ref={trackRef} data-carousel-track tabIndex={0}>
              {slides.map((s, idx) => (
                <li
                  key={idx}
                  className={`carousel__slide ${s.contain ? 'carousel__slide--contain' : ''}`}
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${slides.length}`}
                  onClick={() => setLightboxIndex(idx)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view full photo"
                >
                  <img
                    src={s.src}
                    srcSet={s.srcset}
                    sizes="(max-width: 1240px) 100vw, 1200px"
                    alt={s.alt}
                    style={s.style}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="carousel__slide-hint" aria-hidden="true">
                    <span>Click to expand</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="carousel__controls">
              <button
                className="carousel__btn"
                type="button"
                data-carousel-prev
                onClick={() => goTo(current - 1)}
                aria-label="Previous photo"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="carousel__dots" data-carousel-dots>
                <span className="carousel__count">
                  {current + 1} / {slides.length}
                </span>
              </div>

              <button
                className="carousel__btn"
                type="button"
                data-carousel-next
                onClick={() => goTo(current + 1)}
                aria-label="Next photo"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="nacos-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="nacos-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="nacos-lightbox-close"
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo"
            >
              &times;
            </button>

            <div className="nacos-lightbox-media">
              <img
                src={slides[lightboxIndex].src}
                alt={slides[lightboxIndex].alt}
                style={slides[lightboxIndex].style}
              />
            </div>

            <div className="nacos-lightbox-caption">
              <div className="nacos-lightbox-meta">
                <span className="nacos-badge-index">Moment {lightboxIndex + 1} of {slides.length}</span>
                <p className="nacos-lightbox-text">{slides[lightboxIndex].alt}</p>
              </div>
              <div className="nacos-lightbox-nav">
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => setLightboxIndex((lightboxIndex - 1 + slides.length) % slides.length)}
                  aria-label="Previous image"
                >
                  &larr; Prev
                </button>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % slides.length)}
                  aria-label="Next image"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
