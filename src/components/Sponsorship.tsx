import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const Sponsorship: React.FC = () => {
  const { sponsorship, links, payment } = siteConfig;

  const maxPrice = Math.max(...sponsorship.tiers.map((t) => t.price));

  const formatPrice = (val: number) => {
    return `${sponsorship.currency || '₦'}${val.toLocaleString('en-NG')}`;
  };

  const accountInfo =
    payment.accountNumber && payment.accountName
      ? `Account: ${payment.accountName}, ${payment.accountNumber}${payment.bank ? `, ${payment.bank}` : ''}.`
      : 'Account details are shared on confirmation.';

  const mailHref = `mailto:${links.sponsorEmail || links.generalEmail}?subject=${encodeURIComponent(
    'Partnership: NACOS Week 2027'
  )}`;

  return (
    <section className="section partner" id="partner" aria-labelledby="partner-title">
      <div className="wrap">
        <header className="section__head section__head--split">
          <h2 id="partner-title" className="h2">Partner with Confluence</h2>
          <p className="lead">
            We sell outcomes, not logo space: students who sign up, talent you can hire, content you can use, and a report you can show your board.
          </p>
        </header>

        <ul className="outcomes">
          <li>
            <h3>Customers</h3>
            <p>Sign-ups and referral codes from students on the floor.</p>
          </li>
          <li>
            <h3>Talent</h3>
            <p>An opt-in CV bank and intern access across the university.</p>
          </li>
          <li>
            <h3>Content</h3>
            <p>Recap video and photo rights from the week.</p>
          </li>
          <li>
            <h3>Credibility</h3>
            <p>An impact report with measured footfall after the week.</p>
          </li>
        </ul>

        <div className="tiers-head">
          <h3 className="h3">Partnership tiers</h3>
          {sponsorship.status === 'provisional' && (
            <div className="notice">{sponsorship.statusNote || 'Provisional pricing, pending approval.'}</div>
          )}
        </div>

        <ol className="tiers" data-tiers>
          {sponsorship.tiers.map((t, idx) => {
            const isTitle = idx === 0;
            const w = maxPrice ? Math.max(4, Math.round((t.price / maxPrice) * 100)) : 0;

            return (
              <li className={`tier ${isTitle ? 'tier--title' : ''}`} key={t.name}>
                <div>
                  <h4 className="tier__name">{t.name}</h4>
                  <p className="tier__owns">{t.owns}</p>
                </div>

                <div>
                  <p className="tier__price">{formatPrice(t.price)}</p>
                  <div className="tier__bar" aria-hidden="true">
                    <span style={{ ['--w' as any]: `${w}%` }}></span>
                  </div>
                  <ul className="tier__perks">
                    {t.perks.map((perk, i) => (
                      <li key={i}>{perk}</li>
                    ))}
                  </ul>
                </div>

                <p className="tier__slots">
                  <strong>{t.slots}</strong>
                  {t.slots === 1 ? 'slot' : 'slots'}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="partner__foot">
          <div className="partner__terms">
            <p>
              <strong>Category exclusivity</strong> at the top tiers: one bank, one telco, one fintech, one energy company.
            </p>
            <p>
              <strong>In-kind partners</strong> (printing, catering, power, venue, jerseys, media) are credited at the matching tier by market value.
            </p>
            <p>
              <strong>Payments</strong> go only to the NACOS AKSU student body account, never a personal account.{' '}
              <span>{accountInfo}</span>
            </p>
          </div>
          <div className="partner__actions">
            {links.brochure ? (
              <a className="btn btn--deep" href={links.brochure} download data-brochure>
                Download the brochure
              </a>
            ) : (
              <span className="btn btn--deep" role="button" aria-disabled="true" data-brochure>
                Brochure coming soon
              </span>
            )}
            <a className="btn btn--outline" href={mailHref} data-mail="sponsorEmail">
              Talk to the team
            </a>
          </div>
        </div>

        <div className="sponsor-wall" aria-labelledby="sponsor-wall-title">
          <h3 id="sponsor-wall-title" className="sponsor-wall__title">Partners</h3>
          <ul className="sponsor-wall__grid">
            <li className="sponsor-slot">
              <div className="ph ph--logo ph--mystery-logo" role="img" aria-label="Revealing soon (placeholder)">
                <span className="ph__label">Revealing soon</span>
              </div>
            </li>
            <li className="sponsor-slot">
              <div className="ph ph--logo ph--mystery-logo" role="img" aria-label="Revealing soon (placeholder)">
                <span className="ph__label">Revealing soon</span>
              </div>
            </li>
            <li className="sponsor-slot">
              <div className="ph ph--logo ph--mystery-logo" role="img" aria-label="Revealing soon (placeholder)">
                <span className="ph__label">Revealing soon</span>
              </div>
            </li>
            <li className="sponsor-slot">
              <div className="ph ph--logo ph--mystery-logo" role="img" aria-label="Revealing soon (placeholder)">
                <span className="ph__label">Revealing soon</span>
              </div>
            </li>
          </ul>
          <p className="sponsor-wall__note">Your logo here. Partner slots are open.</p>
        </div>
      </div>
    </section>
  );
};
