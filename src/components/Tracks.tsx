import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureStack } from './FeatureStack';
import { Squiggle, Arrow } from './Hero';
import { trackDetails } from '../pages/TracksPage';

// White cards on the grey section; panels alternate black and NACOS deep green
const looks = [
  { card: 'fc-white', panel: 'fv-black' },
  { card: 'fc-white', panel: 'fv-deep' }
];

export const Tracks: React.FC = () => {
  return (
    <section className="tf-section tf-section--grey" id="tracks" aria-labelledby="tracks-title">
      <div className="wrap">
        <header className="tf-head">
          <div>
            <p className="tf-eyebrow"><Squiggle /> Tracks</p>
            <h2 id="tracks-title" className="tf-title">Four tracks. One university.</h2>
          </div>
          <p className="tf-head__lead">
            Every part of the week, from the hackathon briefs to the conference panels, is organised around four sectors that shape the regional and national economy, each converging with computing.
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
          <Link to="/tracks" className="tf-link">
            <Arrow /> All track problem statements
          </Link>
        </div>
      </div>
    </section>
  );
};
