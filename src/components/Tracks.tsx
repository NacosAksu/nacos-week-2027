import React from 'react';
import { Link } from 'react-router-dom';

const tracksData = [
  {
    n: '01',
    name: 'Energy',
    tag: 'Grid & Power Systems',
    desc: 'Power generation, distribution, renewable metering, and energy analytics. Where real-time data meets the electrical grid.'
  },
  {
    n: '02',
    name: 'Finance',
    tag: 'FinTech & Digital Payments',
    desc: 'Core banking systems, algorithmic payments, and decentralized trust. Building high-resilience financial tools that move money securely.'
  },
  {
    n: '03',
    name: 'Oil & Gas',
    tag: 'Exploration & Industrial IoT',
    desc: 'Exploration telemetry, pipeline safety monitoring, and logistical automation. Modern software modernizing the Niger Delta infrastructure.'
  },
  {
    n: '04',
    name: 'Medicine',
    tag: 'HealthTech & Telemedicine',
    desc: 'Electronic health records, predictive patient diagnostics, and rural healthcare access. Software engineered to save lives.'
  },
  {
    n: '05',
    name: 'Technology',
    tag: 'Software, Cloud & Cyber Security',
    desc: 'Distributed cloud infrastructure, proactive cybersecurity, and foundational software engineering every sector builds upon.'
  }
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

        <ol className="tracks__list">
          {tracksData.map((t) => (
            <li className="track" key={t.n}>
              <div className="track__top">
                <span className="track__n">{t.n}</span>
                <span className="track__tag">{t.tag}</span>
              </div>
              <h3 className="track__name">{t.name}</h3>
              <p className="track__desc">{t.desc}</p>
            </li>
          ))}
        </ol>

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
