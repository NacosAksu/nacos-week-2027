import React from 'react';
import { ImageSlot } from './ImageSlot';

interface TeamMember {
  name: string;
  abbr?: { title: string; text: string };
  role: string;
  photo: string;
  srcset?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Godwin Ansa",
    role: "Dean, Faculty of Computing and Information Technology",
    photo: "/assets/team/dean.jpg",
    srcset: "/assets/team/dean-400.jpg 400w, /assets/team/dean.jpg 800w"
  },
  {
    name: "Comr. Essien Daniel Saviour",
    abbr: { title: "Commander of Computing Students, AKSU", text: "CCSA" },
    role: "Pioneer Faculty President, NACOS AKSU",
    photo: "/assets/team/president.jpg?v=2",
    srcset: "/assets/team/president-400.jpg 400w, /assets/team/president.jpg?v=2 800w"
  },
  {
    name: "Comr. Okon Precious",
    abbr: { title: "Officer of Computing Students, AKSU", text: "OCSA" },
    role: "Chairman, Planning Committee (Computer Science Departmental President)",
    photo: "/assets/team/planning-chair.jpg",
    srcset: "/assets/team/planning-chair-400.jpg 400w, /assets/team/planning-chair.jpg 800w"
  },
  {
    name: "Comr. Emmanuel Ephraim Ita",
    abbr: { title: "Officer of Computing Students, AKSU", text: "OCSA" },
    role: "General Secretary",
    photo: "/assets/team/general-secretary.jpg?v=2",
    srcset: "/assets/team/general-secretary-400.jpg 400w, /assets/team/general-secretary.jpg?v=2 800w"
  }
];

export const Team: React.FC = () => {
  return (
    <section className="section team" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="team-title" className="h2">The people behind the week</h2>
        </header>
        <ul className="people people--team">
          {teamMembers.map((m, idx) => (
            <li className="person" key={idx}>
              <ImageSlot
                src={m.photo}
                srcSet={m.srcset}
                sizes="(max-width: 899px) 50vw, 25vw"
                label="Portrait"
                spec="800 x 800"
                className="ph--square person__photo"
              />
              <h3 className="person__name">
                {m.name}{' '}
                {m.abbr && <abbr title={m.abbr.title}>{m.abbr.text}</abbr>}
              </h3>
              <p className="person__role">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
