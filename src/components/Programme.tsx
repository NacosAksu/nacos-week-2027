import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { ImageSlot } from './ImageSlot';

export const Programme: React.FC = () => {
  const { programme } = siteConfig;

  return (
    <section className="section programme" id="programme" aria-labelledby="programme-title">
      <div className="wrap">
        <header className="section__head section__head--split">
          <div>
            <p className="tag">Convention Pillars</p>
            <h2 id="programme-title" className="h2">Five Events. One Flagship Week.</h2>
          </div>
          <p className="lead">
            A comprehensive festival combining deep technical problem-solving, ecosystem dialogue, sports, creative pageantry, and celebration.
          </p>
        </header>

        <div className="pillars">
          <article className="pillar pillar--feature">
            <ImageSlot
              src="/assets/photos/pillar-hackathon.jpg"
              srcSet="/assets/photos/pillar-hackathon-800.jpg 800w, /assets/photos/pillar-hackathon.jpg 1600w"
              sizes="(max-width: 699px) 100vw, 50vw"
              label="Hackathon teams at work"
              spec="1600 x 1000"
              className="pillar__media"
            />
            <div className="pillar__body">
              <p className="pillar__when">
                {programme.hackathon || "Starts 3 weeks prior"}
              </p>
              <h3 className="pillar__name">Hackathon</h3>
              <p className="pillar__sub">Innovation Bootcamp &amp; Demo Day</p>
              <p>
                Three weeks of intensive problem solving around the five tracks with industry mentors. Top finalist teams pitch live on stage at the Annual Tech Conference before a panel of sector judges.
              </p>
              <Link to="/hackathon" className="link" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: 'var(--space-xs)' }}>
                How the hackathon works &rarr;
              </Link>
            </div>
          </article>

          <article className="pillar">
            <ImageSlot
              src="/assets/photos/pillar-conference.jpg"
              srcSet="/assets/photos/pillar-conference-800.jpg 800w, /assets/photos/pillar-conference.jpg 1600w"
              sizes="(max-width: 699px) 100vw, 50vw"
              label="Tech Conference stage"
              spec="1200 x 800"
              className="pillar__media"
            />
            <div className="pillar__body">
              <p className="pillar__when">
                {programme.conference || "Day 2 • Main Auditorium"}
              </p>
              <h3 className="pillar__name">Annual Tech Conference</h3>
              <p>Keynotes, plenary sessions, sector panels in Energy, FinTech, Oil &amp; Gas, Medicine, and Technology. Product showcases and live career networking.</p>
              <Link to="/programme" className="link" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: 'var(--space-xs)' }}>
                View conference agenda &rarr;
              </Link>
            </div>
          </article>

          <article className="pillar">
            <ImageSlot
              src="/assets/photos/pillar-football.jpg"
              srcSet="/assets/photos/pillar-football-800.jpg 800w, /assets/photos/pillar-football.jpg 1080w"
              sizes="(max-width: 699px) 100vw, 50vw"
              label="Football tournament"
              spec="1200 x 800"
              className="pillar__media"
            />
            <div className="pillar__body">
              <p className="pillar__when">
                {programme.football || "Day 3 • Campus Stadium"}
              </p>
              <h3 className="pillar__name">Football Championship</h3>
              <p>Inter-departmental and inter-faculty clash of titans. Uniting the entire campus student body in high-energy sports and tech carnival culture.</p>
            </div>
          </article>

          <article className="pillar">
            <ImageSlot
              src="/assets/photos/pillar-fashion.jpg"
              srcSet="/assets/photos/pillar-fashion-800.jpg 800w, /assets/photos/pillar-fashion.jpg 1600w"
              sizes="(max-width: 699px) 100vw, 50vw"
              label="Fashion & Pageantry runway"
              spec="1200 x 800"
              className="pillar__media"
            />
            <div className="pillar__body">
              <p className="pillar__when">
                {programme.fashion || "Day 4 • Open Amphitheatre"}
              </p>
              <h3 className="pillar__name">Fashion &amp; Pageantry</h3>
              <p>Runway elegance, creative computing aesthetics, and the coronation of Mr. &amp; Miss NACOS AKSU Royal Council.</p>
            </div>
          </article>

          <article className="pillar pillar--dark">
            <ImageSlot
              src="/assets/photos/pillar-dinner.jpg"
              srcSet="/assets/photos/pillar-dinner-800.jpg 800w, /assets/photos/pillar-dinner.jpg 1600w"
              sizes="(max-width: 699px) 100vw, 50vw"
              label="Dinner & Award Night"
              spec="1200 x 800"
              className="pillar__media"
            />
            <div className="pillar__body">
              <p className="pillar__when">
                {programme.dinner || "Day 5 • Banquet Hall"}
              </p>
              <h3 className="pillar__name">Gala Dinner &amp; Award Night</h3>
              <p>A black-tie evening celebrating departmental excellence, honoring graduating seniors, and presenting hackathon trophies and leadership honours.</p>
            </div>
          </article>
        </div>

        <div className="programme__footer" style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
          <Link to="/programme" className="btn btn--outline">
            View Complete 5-Day Programme &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
