import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const Hackathon: React.FC = () => {
  const { links } = siteConfig;

  return (
    <section className="section hack" id="hackathon" aria-labelledby="hack-title">
      <div className="wrap hack__grid">
        <div className="hack__intro">
          <h2 id="hack-title" className="h2">The Confluence Hackathon</h2>
          <p className="lead">
            Teams build real solutions for the five tracks, against problem statements set by industry partners. Three weeks, mentors in the room, and a final judging at the Tech Conference.
          </p>
          <ul className="facts">
            <li><strong>Format</strong> Innovation Bootcamp, about three weeks</li>
            <li><strong>Tracks</strong> Energy, Finance, Oil &amp; Gas, Medicine, Technology</li>
            <li><strong>Finish</strong> Judged at the Tech Conference, winners picked by the judges</li>
          </ul>
          <div className="hack__actions">
            {links.hackathonRegister ? (
              <a href={links.hackathonRegister} className="btn btn--signal">
                Register for the hackathon
              </a>
            ) : (
              <span className="btn btn--soon" role="button" aria-disabled="true">
                Opening soon
              </span>
            )}
          </div>
        </div>

        <div className="hack__steps">
          <ol className="steps">
            <li>
              <h3>Registration</h3>
              <p>Opens before the bootcamp starts. Form a team or join one.</p>
            </li>
            <li>
              <h3>Problem statements</h3>
              <p>Published by track partners about six weeks before the week.</p>
            </li>
            <li>
              <h3>Bootcamp</h3>
              <p>About three weeks of building, with mentors from each sector.</p>
            </li>
            <li>
              <h3>Judging at the Tech Conference</h3>
              <p>Teams present their final projects to the judges, who pick the winners. Judges are confirmed three weeks before.</p>
            </li>
            <li>
              <h3>After the week</h3>
              <p>Winning teams are planned to become the first incubation cohort of the FCIT Tech Hub.</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
