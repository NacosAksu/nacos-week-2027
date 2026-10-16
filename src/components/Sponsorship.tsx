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
          <div>
            <div className="deck-eyebrow">
              <span className="deck-eyebrow__num">06</span>
              <span className="deck-eyebrow__text">Sponsorship &amp; Partnerships</span>
            </div>
            <h1 id="partner-title" className="h2">Partner with Confluence</h1>
          </div>
          <p className="lead">
            We sell outcomes, not logo space: students who sign up, talent you can hire, content you can use, and a verified impact report for your stakeholders.
          </p>
        </header>

        <ul className="deck-outcomes">
          <li>
            <span className="deck-outcomes__num">01</span>
            <h3>Talent Discovery</h3>
            <p>Direct access to opt-in student CVs, internship recruitment, and problem statement judging.</p>
          </li>
          <li>
            <span className="deck-outcomes__num">02</span>
            <h3>Direct Activation</h3>
            <p>Student sign-ups, product demonstrations, and account openings across 30,000+ students on campus.</p>
          </li>
          <li>
            <span className="deck-outcomes__num">03</span>
            <h3>Brand Visibility</h3>
            <p>Keynotes, plenary panel thought leadership, high table seating, and premium stage presence.</p>
          </li>
          <li>
            <span className="deck-outcomes__num">04</span>
            <h3>Impact &amp; Report</h3>
            <p>Agreed post-event impact report documenting measured footfall, verified attendees, and engagement.</p>
          </li>
        </ul>

        <div className="tiers-head">
          <h3 className="h3">Partnership Tiers</h3>
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
              <strong>Category exclusivity</strong> at the top tiers: one bank, one telco, one fintech, one medical, one energy company.
            </p>
            <p>
              <strong>In-kind partners</strong> (printing, catering, power, venue, jerseys, media) are credited at the matching tier by verified market value.
            </p>
            <p>
              <strong>Official Student Body Account:</strong> Payments go strictly to the NACOS AKSU association account, never a personal account.{' '}
              <span>{accountInfo}</span>
            </p>
          </div>
          <div className="partner__actions">
            {links.brochure ? (
              <a className="btn btn--deep" href={links.brochure} download data-brochure>
                Download Brochure
              </a>
            ) : (
              <span className="btn btn--deep" role="button" aria-disabled="true" data-brochure>
                Brochure Coming Soon
              </span>
            )}
            <a className="btn btn--outline" href={mailHref} data-mail="sponsorEmail">
              Contact Partnership Team
            </a>
          </div>
        </div>

        <div className="sponsor-wall" aria-labelledby="sponsor-wall-title">
          <h3 id="sponsor-wall-title" className="sponsor-wall__title">Partner Alliances</h3>
          <ul className="sponsor-wall__grid">
            <li className="sponsor-slot">
              <div className="sponsor-slot__inner">
                <span className="sponsor-slot__badge">Title Partner</span>
                <span className="sponsor-slot__label">Open Slot</span>
              </div>
            </li>
            <li className="sponsor-slot">
              <div className="sponsor-slot__inner">
                <span className="sponsor-slot__badge">Gold Partner</span>
                <span className="sponsor-slot__label">Open Slot</span>
              </div>
            </li>
            <li className="sponsor-slot">
              <div className="sponsor-slot__inner">
                <span className="sponsor-slot__badge">Silver Partner</span>
                <span className="sponsor-slot__label">Open Slot</span>
              </div>
            </li>
            <li className="sponsor-slot">
              <div className="sponsor-slot__inner">
                <span className="sponsor-slot__badge">In-Kind Partner</span>
                <span className="sponsor-slot__label">Open Slot</span>
              </div>
            </li>
          </ul>
          <p className="sponsor-wall__note">Category exclusivity applies. Partnership inquiries open.</p>
        </div>
      </div>
    </section>
  );
};
