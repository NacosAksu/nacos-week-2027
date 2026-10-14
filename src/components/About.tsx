import React from 'react';
import { ImageSlot } from './ImageSlot';

export const About: React.FC = () => {
  return (
    <>
      {/* ABOUT */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="wrap about__grid">
          <div className="about__text">
            <div className="deck-eyebrow">
              <span className="deck-eyebrow__num">01</span>
              <span className="deck-eyebrow__text">Event Background</span>
            </div>
            <h2 id="about-title" className="h2">Computing does not work alone anymore.</h2>
            <p className="lead">
              The power grid, financial systems, oil exploration, and modern healthcare all run on computing. NACOS Week 2027 puts emerging technologists in the same rooms as the industries they will build for.
            </p>
            <p>
              NACOS Week is the flagship annual initiative of NACOS AKSU (Nigeria Association of Computing Students, Akwa Ibom State University). The Computer Science department has hosted it for over a decade. In 2027, the Faculty of Computing &amp; Information Technology (FCIT) hosts it, expanding participation beyond computing students to the entire university community across all faculties.
            </p>
            <ul className="deck-feature-list" aria-label="Key highlights">
              <li>
                <span className="deck-feature-list__num">01</span>
                <div>
                  <strong>Hosted by FCIT</strong>
                  <span>Faculty of Computing and Information Technology, AKSU</span>
                </div>
              </li>
              <li>
                <span className="deck-feature-list__num">02</span>
                <div>
                  <strong>Open to All Faculties</strong>
                  <span>Uniting 30,000+ students across every department</span>
                </div>
              </li>
              <li>
                <span className="deck-feature-list__num">03</span>
                <div>
                  <strong>Built with Industry</strong>
                  <span>Real sector problems set by leading corporate partners</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="about__media-wrap">
            <ImageSlot
              src="/assets/photos/about-crowd.jpg"
              srcSet="/assets/photos/about-crowd-800.jpg 800w, /assets/photos/about-crowd.jpg 1200w"
              sizes="(max-width: 899px) 100vw, 45vw"
              label="Students at a previous NACOS Week"
              spec="1200 x 1500, portrait"
              className="ph--tall about__photo"
            />
          </div>
        </div>
      </section>

      {/* NUMBERS / SCALE */}
      <section className="numbers" aria-label="NACOS Week 2027 in numbers">
        <div className="wrap">
          <div className="numbers__head">
            <div className="deck-eyebrow">
              <span className="deck-eyebrow__num">02</span>
              <span className="deck-eyebrow__text">Scale &amp; Reach</span>
            </div>
            <h2 className="numbers__title">NACOS Week 2027 at a Glance</h2>
          </div>
          <ul className="numbers__grid">
            <li>
              <span className="numbers__n">5</span>
              <span className="numbers__l">Flagship Pillars</span>
            </li>
            <li>
              <span className="numbers__n">5</span>
              <span className="numbers__l">Industry Tracks</span>
            </li>
            <li>
              <span className="numbers__n">500</span>
              <span className="numbers__l">Main Hall Capacity</span>
            </li>
            <li>
              <span className="numbers__n">
                30,000<span className="numbers__plus">+</span>
              </span>
              <span className="numbers__l">Students Across Campus</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
