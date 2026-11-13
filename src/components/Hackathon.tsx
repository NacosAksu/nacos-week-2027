import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Squiggle, Arrow } from './Hero';

const steps = [
  { name: 'Registration', text: 'Opens before the bootcamp starts. Form a multidisciplinary team or join one across faculties.' },
  { name: 'Problem statements', text: 'Published by sector partners before the bootcamp starts, based on real industry challenges.' },
  { name: '4-week bootcamp', text: 'Prototyping and deployment with industry mentors from each sector.' },
  { name: 'Demo & judging', text: 'Teams present working products to the judges on Conference Day. The judges pick the winners.' },
  { name: 'Incubation', text: 'Winning teams become the first incubation cohort at the FCIT Tech Hub, turning projects into ventures.' }
];

// asPage: this section opens its own page, so its heading is the page's h1
export const Hackathon: React.FC<{ asPage?: boolean }> = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  const { links } = siteConfig;

  return (
    <section className="tf-section tf-dark" id="hackathon" aria-labelledby="hack-title">
      <div className="wrap">
        <div className="tf-agenda__top">
          <p className="tf-eyebrow"><Squiggle /> 4-week bootcamp</p>
          <Heading id="hack-title" className="tf-title">Hackathon</Heading>
          <p className="tf-agenda__mark">Confluence</p>
        </div>

        <p className="tf-statement tf-statement--sm">
          <span className="tf-dim">Student teams build software against briefs set by sector partners. </span>
          A 4-week bootcamp with mentors, ending in a live demo in front of judges on Conference Day.
        </p>

        <ol className="tf-agenda">
          {steps.map((s, i) => (
            <li key={s.name}>
              <span className="tf-agenda__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="tf-agenda__name">{s.name}</h3>
              <p className="tf-agenda__text"><Squiggle /> {s.text}</p>
            </li>
          ))}
        </ol>

        <ul className="tf-facts">
          <li><span>Tracks</span>Energy, Finance, Oil &amp; Gas, Medicine</li>
          <li><span>Judging</span>Demo day in front of the judges on Conference Day</li>
          <li><span>Safeguard</span>Students keep full ownership of their intellectual property</li>
        </ul>

        <div className="tf-actions">
          {links.hackathonRegister ? (
            <a href={links.hackathonRegister} className="tf-pill"><Arrow /> Register for the hackathon</a>
          ) : (
            // No separate hackathon portal yet: the main form has a Hackathon option
            <Link to="/register" className="tf-pill"><Arrow /> Register your interest</Link>
          )}
          {!asPage && <Link to="/hackathon" className="tf-link tf-link--light">Hackathon details</Link>}
        </div>
      </div>
    </section>
  );
};
