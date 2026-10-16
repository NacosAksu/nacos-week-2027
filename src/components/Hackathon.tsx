import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

// asPage: this section opens its own page, so its heading is the page's h1
export const Hackathon: React.FC<{ asPage?: boolean }> = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  const { links } = siteConfig;

  const action = links.hackathonRegister ? (
    <a href={links.hackathonRegister} className="btn btn--deep">
      Register for the Hackathon
    </a>
  ) : (
    // No separate hackathon portal yet: the main form has a Hackathon option
    <Link to="/register" className="btn btn--deep">
      Register Your Interest &rarr;
    </Link>
  );

  return (
    <section className="section hack" id="hackathon" aria-labelledby="hack-title">
      <div className="wrap hack__grid">
        <div className="hack__intro">
          <div className="deck-eyebrow">
            <span className="deck-eyebrow__num">05</span>
            <span className="deck-eyebrow__text">Flagship Sponsorship Product</span>
          </div>
          <Heading id="hack-title" className="h2">The Confluence Hackathon</Heading>
          <p className="lead">
            Student teams build software against briefs set by sector partners. A 4-week bootcamp with mentors, ending in a live demo in front of judges on Conference Day.
          </p>
          <ul className="facts">
            <li><strong>Format</strong> Innovation Bootcamp, 4 weeks</li>
            <li><strong>Tracks</strong> Energy, Finance, Oil &amp; Gas, Medicine, Technology</li>
            <li><strong>Judging</strong> Demo day in front of the judges on Conference Day</li>
            <li><strong>Safeguard</strong> Students retain full ownership of their intellectual property</li>
          </ul>
          <div className="hack__actions">{action}</div>
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
                <p>Published by sector partners before the bootcamp starts, based on real industry challenges.</p>
              </div>
            </li>
            <li>
              <span className="deck-steps__num">03</span>
              <div>
                <h3>4-Week Bootcamp</h3>
                <p>Intensive prototyping and deployment with industry mentors from each respective sector.</p>
              </div>
            </li>
            <li>
              <span className="deck-steps__num">04</span>
              <div>
                <h3>Final Stage Demo &amp; Judging</h3>
                <p>Teams present working products to the judges on Conference Day. The judges pick the winners.</p>
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
          {/* Phones: the button comes after the steps instead of before them */}
          <div className="hack__actions hack__actions--end">{action}</div>
        </div>
      </div>
    </section>
  );
};
