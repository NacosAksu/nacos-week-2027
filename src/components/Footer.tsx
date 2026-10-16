import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const { links, event } = siteConfig;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const email = links.generalEmail || links.sponsorEmail || 'hello@nacosaksu.com.ng';

  const socialLinks = [
    {
      key: 'instagram',
      label: 'Instagram',
      url: links.instagram,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <path d="M17.5 6.5h.01" />
        </svg>
      )
    },
    {
      key: 'x',
      label: 'X',
      url: links.x,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      url: links.whatsapp,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      )
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      url: links.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      )
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      url: links.tiktok,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    },
  ].filter((s) => !!s.url);

  return (
    <footer className="footer on-dark" id="contact" aria-label="Footer">
      <div className="wrap">
        <div className="footer__body">
          {/* Brand & Organization */}
          <div className="footer__brand">
            <div className="footer__logo-lockup">
              <Link to="/" className="footer__crest-link" aria-label="NACOS AKSU Chapter Seal">
                <img
                  src="/assets/brand/nacos-logo.png"
                  alt="NACOS AKSU Chapter Seal"
                  width="52"
                  height="52"
                  loading="lazy"
                  decoding="async"
                  className="footer__crest"
                />
              </Link>
              <div className="footer__logo-divider" aria-hidden="true" />
              <Link to="/" className="footer__logo-link" aria-label="NACOS Week 2027 home">
                <img
                  src="/assets/brand/nw27-wordmark-v3-reversed.png"
                  alt="NACOS Week 2027"
                  width="1180"
                  height="240"
                  loading="lazy"
                  decoding="async"
                  className="footer__logo"
                />
              </Link>
            </div>

            <p className="footer__tagline">
              Confluence &bull; {event.datesLabel || 'February 2027'}
            </p>

            <p className="footer__desc">
              Organised by NACOS AKSU (Nigeria Association of Computing Students, Akwa Ibom State University). Hosted by the Faculty of Computing &amp; Information Technology.
            </p>

            {socialLinks.length > 0 && (
              <ul className="footer__socials" aria-label="Social media">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__social-link"
                      aria-label={s.label}
                      title={s.label}
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="footer__group">
            <h3 className="footer__heading">Navigation</h3>
            <ul className="footer__links">
              <li><Link to="/programme">Programme</Link></li>
              <li><Link to="/tracks">Tracks</Link></li>
              <li><Link to="/hackathon">Hackathon</Link></li>
              <li><Link to="/partner">Partner with us</Link></li>
              <li><Link to="/booth">Exhibition Booths</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/register?tab=volunteer">Volunteer Crew</Link></li>
              <li><Link to="/faq">Venue &amp; FAQ</Link></li>
            </ul>
          </div>

          {/* Direct Contact & Venue */}
          <div className="footer__group">
            <h3 className="footer__heading">Contact</h3>
            <div className="footer__contact-block">
              <a href={`mailto:${email}`} className="footer__contact-entry">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{email}</span>
              </a>

              {links.phone && (
                <a href={`tel:${links.phone.replace(/[^\d+]/g, '')}`} className="footer__contact-entry">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{links.phone}</span>
                </a>
              )}

              {links.phoneSecondary && (
                <a href={`tel:${links.phoneSecondary.replace(/[^\d+]/g, '')}`} className="footer__contact-entry">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{links.phoneSecondary}</span>
                </a>
              )}

              <div className="footer__location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {event.venue || 'Conference Centre, Perm Site'}, {event.location || 'Akwa Ibom State University'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean bottom line */}
        <div className="footer__baseline">
          <p className="footer__copy">
            &copy; {currentYear} NACOS AKSU. All rights reserved.
          </p>

          <div className="footer__baseline-right">
            {links.facultySite && (
              <a
                href={links.facultySite}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__faculty-link"
              >
                nacosaksu.com.ng &rarr;
              </a>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="footer__totop"
              aria-label="Scroll back to top"
            >
              <span>Back to top &uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
