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
            <div className="deck-eyebrow">
              <span className="deck-eyebrow__num">04</span>
              <span className="deck-eyebrow__text">The Five Pillars</span>
            </div>
            <h2 id="programme-title" className="h2">Five Events. One Flagship Week.</h2>
          </div>
          <p className="lead">
            A comprehensive festival combining deep technical problem-solving, industry dialogue, campus sports, creative pageantry, and celebration.
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
              <div className="pillar__num">01 / Flagship Product</div>
              <p className="pillar__when">
                {programme.hackathon || "Starts 3 weeks prior"}
              </p>
              <h3 className="pillar__name">Hackathon (Innovation Bootcamp)</h3>
              <p className="pillar__sub">Multi-week build across 5 industry tracks</p>
              <p>
                Student teams build real solutions against briefs set by sector sponsors. Final projects are judged live on stage at the Tech Conference, where the winners are decided.
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
              <div className="pillar__num">02 / Conference</div>
              <p className="pillar__when">
                {programme.conference || "Day 2 • Conference Centre"}
              </p>
              <h3 className="pillar__name">Tech Conference Day</h3>
              <p>Keynotes, plenary panels in Energy, FinTech, Oil &amp; Gas, Medicine, and Technology. Hackathon project exhibition and live judging.</p>
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
              <div className="pillar__num">03 / Sports</div>
              <p className="pillar__when">
                {programme.football || "Day 3 • Campus Stadium"}
              </p>
              <h3 className="pillar__name">Football Tournament</h3>
              <p>Open-crowd inter-faculty tournament drawing from the wider 30,000 student body across campus. Sportsmanship, community, and energy.</p>
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
              <div className="pillar__num">04 / Culture</div>
              <p className="pillar__when">
                {programme.fashion || "Day 4 • Open Pavilion"}
              </p>
              <h3 className="pillar__name">Fashion &amp; Pageantry</h3>
              <p>Crowns the Royal Council of NACOS AKSU. Runway elegance, student creativity, and selection of brand campus ambassadors.</p>
            </div>
          </article>

          <article className="pillar">
            <ImageSlot
              src="/assets/photos/pillar-dinner.jpg"
              srcSet="/assets/photos/pillar-dinner-800.jpg 800w, /assets/photos/pillar-dinner.jpg 1600w"
              sizes="(max-width: 699px) 100vw, 50vw"
              label="Dinner & Award Night"
              spec="1200 x 800"
              className="pillar__media"
            />
            <div className="pillar__body">
              <div className="pillar__num">05 / Celebration</div>
              <p className="pillar__when">
                {programme.dinner || "Day 5 • Banquet Hall"}
              </p>
              <h3 className="pillar__name">Dinner &amp; Award Night</h3>
              <p>A formal evening to dine, network, and honour students who have shown exceptional character, conduct, academic contribution, and leadership.</p>
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
