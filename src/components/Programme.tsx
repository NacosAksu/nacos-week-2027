import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Squiggle, Arrow } from './Hero';
import { ImageSlot } from './ImageSlot';

// asPage: this section opens its own page, so its heading is the page's h1
export const Programme: React.FC<{ asPage?: boolean }> = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  const { programme } = siteConfig;

  const events = [
    {
      name: 'Hackathon',
      photo: 'hackathon',
      photoLabel: 'Hackathon teams at work',
      photoW: '1600',
      when: programme.hackathon || '4-week bootcamp before the week',
      text: 'Student teams build solutions against briefs set by sector partners across the 4 industry tracks, then demo to the judges on Conference Day.',
      to: '/hackathon'
    },
    {
      name: 'Tech Conference Day',
      photo: 'conference',
      photoLabel: 'Tech Conference stage',
      photoW: '1600',
      when: programme.conference || 'Conference Centre',
      text: 'Keynotes and panels in Energy, FinTech, Oil & Gas and Medicine, with the hackathon exhibition and live judging.'
    },
    {
      name: 'Football Tournament',
      photo: 'football',
      photoLabel: 'Football tournament',
      photoW: '1080',
      when: programme.football || 'Open Pavilion / Football Stadium',
      text: 'An open-crowd inter-faculty tournament drawing on the wider student body across campus.'
    },
    {
      name: 'Fashion & Pageantry',
      photo: 'fashion',
      photoLabel: 'Fashion & Pageantry runway',
      photoW: '1600',
      when: programme.fashion || 'February 2027',
      text: 'Crowns the Royal Council of NACOS AKSU, with runway, student creativity and the selection of campus ambassadors.'
    },
    {
      name: 'Dinner & Award Night',
      photo: 'dinner',
      photoLabel: 'Dinner & Award Night',
      photoW: '1600',
      when: programme.dinner || 'February 2027',
      text: 'A formal evening to dine, network and honour students for character, conduct, academic contribution and leadership.'
    }
  ];

  return (
    <section className="tf-section" id="programme" aria-labelledby="programme-title">
      <div className="wrap">
        <header className="tf-head">
          <div>
            <p className="tf-eyebrow"><Squiggle /> What&apos;s on</p>
            <Heading id="programme-title" className="tf-title">Five events. One week.</Heading>
          </div>
          <div className="tf-head__side">
            <p className="tf-head__lead">
              A hackathon, a tech conference, a football tournament, fashion and pageantry, and an awards dinner.
            </p>
            {!asPage && <Link to="/programme" className="tf-link"><Arrow /> Full programme</Link>}
          </div>
        </header>

        <ul className="tf-cards">
          {events.map((e, i) => (
            <li className="tf-card" key={e.name}>
              <div className="tf-card__top">
                <h3 className="tf-card__title">{e.name}</h3>
                <span className="tf-card__n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <ImageSlot
                src={`/assets/photos/pillar-${e.photo}.jpg`}
                srcSet={`/assets/photos/pillar-${e.photo}-800.jpg 800w, /assets/photos/pillar-${e.photo}.jpg ${e.photoW}w`}
                sizes="(max-width: 639px) 100vw, (max-width: 999px) 50vw, 33vw"
                label={e.photoLabel}
                className="tf-card__photo"
              />
              <div className="tf-card__foot">
                <p className="tf-card__when">{e.when}</p>
                <p className="tf-card__text">{e.text}</p>
                {e.to && (
                  <Link to={e.to} className="tf-link"><Arrow /> How it works</Link>
                )}
              </div>
            </li>
          ))}
          <li className="tf-card tf-card--dark">
            <div className="tf-card__top">
              <h3 className="tf-card__title">Want to be involved?</h3>
              <Squiggle />
            </div>
            <div className="tf-card__foot">
              <Link to="/partner" className="tf-pill tf-pill--white"><Arrow /> Partner with us</Link>
              <Link to="/volunteer" className="tf-link tf-link--light">Or join the volunteer crew</Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
