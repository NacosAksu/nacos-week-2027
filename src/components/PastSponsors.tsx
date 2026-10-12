import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const PastSponsors: React.FC = () => {
  const brands = siteConfig.pastSponsors.filter((b) => b && b.logo);
  const rowCount = brands.length >= 9 ? 3 : brands.length >= 4 ? 2 : 1;

  const rows: typeof brands[] = Array.from({ length: rowCount }, () => []);
  brands.forEach((b, i) => {
    rows[i % rowCount].push(b);
  });

  return (
    <section className="section past" id="past-sponsors" aria-labelledby="past-title">
      <div className="wrap">
        <p className="past__kicker">Backed by the ecosystem</p>
        <h2 id="past-title" className="past__title">Over a decade of partners who show up.</h2>

        <div className="past__panel" data-past-sponsors>
          {rows.map((row, ri) => {
            const isReverse = ri % 2 === 1;
            const reps = Math.max(1, Math.ceil(10 / (row.length || 1)));
            let half: typeof row = [];
            for (let rep = 0; rep < reps; rep++) {
              half = half.concat(row);
            }
            const dur = Math.max(30, half.length * 5) + 's';

            return (
              <div
                key={ri}
                className={`past__row ${isReverse ? 'past__row--reverse' : ''}`}
              >
                <ul className="past__track" style={{ ['--past-dur' as any]: dur }}>
                  {[0, 1].map((copy) =>
                    half.map((b, bi) => {
                      const isEcho = copy > 0 || bi >= row.length;
                      return (
                        <li
                          key={`${copy}-${bi}`}
                          className={`past__logo ${b.dark ? 'past__logo--dark' : ''} ${
                            isEcho ? 'past__logo--echo' : ''
                          }`}
                          aria-hidden={isEcho ? true : undefined}
                        >
                          <img src={b.logo} alt={b.name || ''} decoding="async" loading="lazy" />
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
