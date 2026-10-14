import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const Hackathon: React.FC = () => {
  const { links } = siteConfig;

  return (
    <section className="section hack" id="hackathon" aria-labelledby="hack-title">
      <div className="wrap hack__grid">
        <div className="hack__intro">
          <div className="deck-eyebrow">
            <span className="deck-eyebrow__num">05</span>
            <span className="deck-eyebrow__text">Flagship Sponsorship Product</span>
          </div>
          <h2 id="hack-title" className="h2">The Confluence Hackathon</h2>
          <p className="lead">
            Student teams race the clock to build innovative software solutions against challenging briefs set by sector partners. A 3-week bootcamp with mentors in the room, culminating in a live stage demonstration at the Tech Conference.
          </p>
          <ul className="facts">
            <li><strong>Format</strong> Innovation Bootcamp, about three weeks</li>
            <li><strong>Tracks</strong> Energy, Finance, Oil &amp; Gas, Medicine, Technology</li>
            <li><strong>Judging</strong> Final pitches at the Tech Conference, where judges pick winners</li>
            <li><strong>Safeguard</strong> Students retain full ownership of their intellectual property</li>
          </ul>
          <div className="hack__actions">
            {links.hackathonRegister ? (
              <a href={links.hackathonRegister} className="btn btn--deep">
                Register for the Hackathon
              </a>
            ) : (
              <span className="btn btn--outline" role="button" aria-disabled="true">
                Registration Opening Soon
              </span>
            )}
          </div>
        </div>

        <div className="hack__steps">
          <ol className="deck-steps">
            <li>
              <span className="deck-steps__num">01</span>
              <div>
                <h3>Registration</h3>
                <p>Opens before the bootcamp starts. Form a multidisciplinary team or join one across faculties.</p>
              </div>
            </li>
            <li>
              <span className="deck-steps__num">02</span>
              <div>
                <h3>Problem Statements</h3>
                <p>Published by sector partners about six weeks prior, targeting real industry challenges.</p>
              </div>
            </li>
            <li>
              <span className="deck-steps__num">03</span>
              <div>
                <h3>3-Week Bootcamp</h3>
                <p>Intensive prototyping and deployment with industry mentors from each respective sector.</p>
              </div>
            </li>
            <li>
              <span className="deck-steps__num">04</span>
              <div>
                <h3>Final Stage Demo &amp; Judging</h3>
                <p>Teams present working products at the Tech Conference. Judges evaluate impact and crown winners.</p>
              </div>
            </li>
            <li>
              <span className="deck-steps__num">05</span>
              <div>
                <h3>Incubation at FCIT Tech Hub</h3>
                <p>Winning teams become the inaugural incubation cohort to turn hackathon projects into ventures.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
