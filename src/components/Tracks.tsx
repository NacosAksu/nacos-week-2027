import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureStack } from './FeatureStack';
import { trackDetails } from '../pages/TracksPage';

// Card tint and panel colour per track, cycling through the brand palette
const looks = [
  { card: 'fc-pale', panel: 'fv-deep' },
  { card: 'fc-white', panel: 'fv-black' },
  { card: 'fc-pale', panel: 'fv-green' },
  { card: 'fc-white', panel: 'fv-deep' },
  { card: 'fc-pale', panel: 'fv-black' }
];

export const Tracks: React.FC = () => {
  return (
    <section className="section tracks" id="tracks" aria-labelledby="tracks-title">
      <div className="wrap">
        <header className="section__head section__head--split">
          <div>
            <div className="deck-eyebrow">
              <span className="deck-eyebrow__num">03</span>
              <span className="deck-eyebrow__text">Sector Specializations</span>
            </div>
            <h2 id="tracks-title" className="h2">Five tracks. One university.</h2>
          </div>
          <p className="lead">
            Every pillar of the week, from the hackathon problem briefs to the Tech Conference panels, is organised around five sectors that shape the regional and national economy.
          </p>
        </header>

        <div className="tracks__stack">
          <FeatureStack>
            {trackDetails.map((t, i) => (
              <article
                className={`fc-slide ${looks[i % looks.length].card}`}
                key={t.id}
                aria-label={`Track ${i + 1} of ${trackDetails.length}: ${t.name}`}
              >
                <div className="fc-copy">
                  <span className="fc-copy__count">Track {t.n} <span>of 0{trackDetails.length}</span></span>
                  <h3 className="fc-copy__name">{t.name}</h3>
                  <p className="fc-copy__tag">{t.tag}</p>
                  <p className="fc-copy__desc">{t.summary}</p>
                  <Link to={`/tracks#${t.id}`} className="fc-copy__link">
                    Read the full brief &rarr;
                  </Link>
                </div>
                <div className={`fv ${looks[i % looks.length].panel}`}>
                  <h4 className="fv__title">What teams could build</h4>
                  <ul className="fv__list">
                    {t.challenges.map((c, k) => (
                      <li key={k}>{c}</li>
                    ))}
                  </ul>
                  <p className="fv__fit">
                    <span>Good fit for</span> {t.roles}
                  </p>
                </div>
                <span className="fc-wash" aria-hidden="true" />
              </article>
            ))}
          </FeatureStack>
        </div>

        <div className="tracks__footer">
          <p className="tracks__note">
            Track partners set real-world problem statements for the hackathon. Partner announcements are ongoing.
          </p>
          <Link to="/tracks" className="btn btn--outline tracks__btn">
            Explore All Track Problem Statements &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
