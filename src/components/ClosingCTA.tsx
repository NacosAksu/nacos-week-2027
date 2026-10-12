import React from 'react';
import { Link } from 'react-router-dom';

export const ClosingCTA: React.FC = () => {
  return (
    <section className="closer on-dark" aria-labelledby="closer-title">
      <div className="wrap closer__inner">
        <p className="closer__tag">Confluence 2027 &bull; February 2027</p>
        <h2 id="closer-title" className="closer__title">
          Be in the room where the streams meet.
        </h2>
        <p className="closer__desc">
          Four days of hands-on building, competition, and connection across Akwa Ibom State University.
        </p>
        <div className="closer__actions">
          <Link to="/register" className="btn btn--signal closer__btn-primary">
            <span>Register Free Pass &rarr;</span>
          </Link>
          <Link to="/partner" className="btn btn--ghost-night closer__btn-secondary">
            <span>Partner with Us</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
