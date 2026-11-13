import React from 'react';
import { Squiggle } from './Hero';

// asPage: this section opens its own page, so its heading is the page's h1
export const About: React.FC<{ asPage?: boolean }> = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  return (
    <section className="tf-section tf-about" id="about" aria-labelledby="about-title">
      <div className="wrap tf-split">
        <p className="tf-eyebrow"><Squiggle /> About</p>

        <div>
          {/* Two tones, like the reference: grey for context, black for the point */}
          <Heading id="about-title" className="tf-statement">
            <span className="tf-dim">The power grid, financial systems, oil exploration and modern healthcare all run on computing. </span>
            NACOS Week 2027 puts emerging technologists in the same rooms as the industries they will build for.
          </Heading>
          <p className="tf-about__note">
            NACOS Week is the flagship annual week of NACOS AKSU (Nigeria Association of Computing Students, Akwa Ibom State University). The Computer Science department has hosted it for over a decade. In 2027 the Faculty of Computing &amp; Information Technology hosts it, open to every faculty.
          </p>

          <ul className="tf-stats" aria-label="NACOS Week 2027 in numbers">
            <li><span className="tf-stats__n">5</span><span className="tf-stats__l">Events</span></li>
            <li><span className="tf-stats__n">4</span><span className="tf-stats__l">Industry tracks</span></li>
            <li><span className="tf-stats__n">500</span><span className="tf-stats__l">Main hall seats</span></li>
            <li><span className="tf-stats__n">30,000+</span><span className="tf-stats__l">Students on campus</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
