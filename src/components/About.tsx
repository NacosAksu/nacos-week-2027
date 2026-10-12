import React from 'react';
import { ImageSlot } from './ImageSlot';

export const About: React.FC = () => {
  return (
    <>
      {/* ABOUT */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="wrap about__grid">
          <div className="about__text">
            <span className="tag">Institutional Vision</span>
            <h2 id="about-title" className="h2">Computing does not work alone anymore.</h2>
            <p className="lead">
              The grid, the bank, the oil field, and the hospital all run on software now. NACOS Week 2027 puts the people who build that software in the same rooms as the people who run those industries.
            </p>
            <p>
              NACOS Week is the flagship convention of NACOS AKSU, the Nigeria Association of Computing Students at Akwa Ibom State University. The Computer Science department has hosted it for over a decade. In 2027, the Faculty of Computing &amp; Information Technology (FCIT) hosts it, and the convention is open to every student at AKSU, across all faculties and departments.
            </p>
            <ul className="dept-list" aria-label="Key highlights">
              <li>
                <span className="dept-list__icon" aria-hidden="true">🏛️</span>
                <span>Hosted by FCIT</span>
              </li>
              <li>
                <span className="dept-list__icon" aria-hidden="true">🎓</span>
                <span>Open to All Faculties</span>
              </li>
              <li>
                <span className="dept-list__icon" aria-hidden="true">⚡</span>
                <span>Built with Industry</span>
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

      {/* NUMBERS */}
      <section className="numbers" aria-label="NACOS Week 2027 in numbers">
        <div className="wrap">
          <div className="numbers__head">
            <span className="tag">Scale &amp; Reach</span>
            <h2 className="numbers__title">NACOS Week 2027 at a Glance</h2>
          </div>
          <ul className="numbers__grid">
            <li>
              <span className="numbers__n" data-raw="5">5</span>
              <span className="numbers__l">Major Convention Events</span>
            </li>
            <li>
              <span className="numbers__n" data-raw="5">5</span>
              <span className="numbers__l">Core Industry Tracks</span>
            </li>
            <li>
              <span className="numbers__n" data-raw="500">500</span>
              <span className="numbers__l">Conference Centre Seats</span>
            </li>
            <li>
              <span className="numbers__n" data-raw="30,000+">
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
