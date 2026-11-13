import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Squiggle, Arrow } from './Hero';

const faqItems = [
  {
    q: 'When exactly is NACOS Week 2027?',
    a: 'February 2027. The exact dates are being finalised and will be published here first.'
  },
  {
    q: 'Who can attend?',
    a: 'Every student at Akwa Ibom State University, from any faculty. The Faculty of Computing and Information Technology hosts the week, but it is not limited to computing students. The Football Tournament and Fashion & Pageantry are open-crowd events for the whole AKSU community.'
  },
  {
    q: 'Does it cost anything?',
    a: 'No. Admission is free for all AKSU students.'
  },
  {
    q: 'Who can join the hackathon?',
    a: 'Eligibility and team rules are published with hackathon registration, which opens before the bootcamp starts.'
  },
  {
    q: 'Who owns what we build at the hackathon?',
    a: 'You do. Partners get the first right to a conversation with your team, not ownership of your work.'
  },
  {
    q: 'Will my details be given to sponsors?',
    a: 'Only if you tick the optional box on the registration form. If you leave it unticked, your details stay with NACOS AKSU.'
  },
  {
    q: 'Is this the first NACOS Week?',
    a: 'No. The Computer Science department has hosted NACOS Week for over a decade. 2027 is the first edition hosted by the Faculty of Computing and Information Technology.'
  },
  {
    q: 'How does my company become a partner?',
    a: 'See the partnership tiers on the Partner page, download the brochure, or write to the team. Payments go only to the NACOS AKSU student body account.'
  }
];

export const FAQ: React.FC = () => {
  return (
    <section className="tf-section" id="faq" aria-labelledby="faq-title">
      <div className="wrap tf-faq">
        <div className="tf-faq__intro">
          <p className="tf-eyebrow"><Squiggle /> FAQ</p>
          <h2 id="faq-title" className="tf-title">FAQ</h2>
          <p className="tf-head__lead">Still got questions? Write to us and we&apos;ll help.</p>
          <a href={`mailto:${siteConfig.links.generalEmail || 'hello@nacosaksu.com.ng'}`} className="tf-link">
            <Arrow /> Ask a question
          </a>
        </div>
        <div className="tf-faq__list">
          {faqItems.map((item, idx) => (
            <details key={idx}>
              <summary>
                {item.q}
                <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
