import React from 'react';

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
    a: 'See the tiers above, download the brochure, or write to the team. Payments go only to the NACOS AKSU student body account.'
  }
];

export const FAQ: React.FC = () => {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <h2 id="faq-title" className="h2">Questions</h2>
        <div className="faq__list">
          {faqItems.map((item, idx) => (
            <details key={idx}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
