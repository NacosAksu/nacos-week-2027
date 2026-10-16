import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Programme } from '../components/Programme';
import { Speakers } from '../components/Speakers';
import { PhotoCarousel } from '../components/PhotoCarousel';

interface ScheduleSession {
  time: string;
  title: string;
  venue: string;
  category: 'Keynote' | 'Workshop' | 'Pitch' | 'Sports' | 'Social' | 'Gala';
  speaker?: string;
  description: string;
}

interface ScheduleDay {
  dayNumber: number;
  dateLabel: string;
  title: string;
  tagline: string;
  sessions: ScheduleSession[];
}

const scheduleData: ScheduleDay[] = [
  {
    dayNumber: 1,
    dateLabel: "Day 1 • Monday",
    title: "Bootcamp & Hackathon Kickoff",
    tagline: "Orientation, track problem statement release, and team ideation sprints.",
    sessions: [
      {
        time: "09:00 AM - 10:30 AM",
        title: "Opening Ceremony & Executive Welcome",
        venue: "FCIT Lecture Hall 1",
        category: "Keynote",
        speaker: "Dean of FCIT & NACOS Executives",
        description: "Official inaugural address welcoming participants from all departments across AKSU."
      },
      {
        time: "11:00 AM - 01:00 PM",
        title: "Track Briefings: 5 Industry Problem Statements",
        venue: "Virtual & Main Lab",
        category: "Workshop",
        speaker: "Track Partner Leads",
        description: "Deep dive into real-world challenges across Energy, Finance, Oil & Gas, Medicine, and Technology."
      },
      {
        time: "02:00 PM - 05:00 PM",
        title: "Hacking Sprint 01 & Mentor Office Hours",
        venue: "FCIT Innovation Lab",
        category: "Pitch",
        description: "Teams assemble architecture diagrams, validate APIs, and review requirements with assigned senior tech mentors."
      }
    ]
  },
  {
    dayNumber: 2,
    dateLabel: "Day 2 • Tuesday",
    title: "Annual Tech Conference & Expo",
    tagline: "The flagship intellectual gathering: keynotes, panels, and live project exhibitions.",
    sessions: [
      {
        time: "09:30 AM - 10:00 AM",
        title: "Accreditation & Badge Collection",
        venue: "Conference Centre Foyer",
        category: "Keynote",
        description: "Registration check-in, networking kits distribution, and early access to partner exhibition booths."
      },
      {
        time: "10:00 AM - 11:30 AM",
        title: "Keynote Address: Confluence: Tech Across Traditional Industries",
        venue: "Main Conference Auditorium (500-seat)",
        category: "Keynote",
        speaker: "Distinguished Guest & Keynote Speaker",
        description: "Examining how AI, distributed systems, and modern software architectures power Nigerian industrial frontiers."
      },
      {
        time: "11:45 AM - 01:15 PM",
        title: "Plenary Panel: Building Resilient Digital Grids & Fintech in Niger Delta",
        venue: "Main Conference Auditorium",
        category: "Keynote",
        speaker: "Panel of Industry Leaders & Alumni Founders",
        description: "Interactive Q&A discussing regional tech infrastructure, capital access, and technical careers for undergrads."
      },
      {
        time: "02:00 PM - 04:30 PM",
        title: "Final Hackathon Demo Day: Live Stage Pitches",
        venue: "Conference Centre Stage",
        category: "Pitch",
        speaker: "Top 10 Finalist Teams",
        description: "Finalist builders pitch their working solutions live in front of the industry judging panel for seed grants."
      }
    ]
  },
  {
    dayNumber: 3,
    dateLabel: "Day 3 • Wednesday",
    title: "Inter-Faculty Football Championship",
    tagline: "Athleticism, camaraderie, and outdoor campus tech community carnival.",
    sessions: [
      {
        time: "10:00 AM - 01:00 PM",
        title: "Preliminary Knockout Matches",
        venue: "AKSU Main Sports Complex",
        category: "Sports",
        description: "Inter-departmental fixtures between Computing, Engineering, Natural Sciences, and Management Sciences."
      },
      {
        time: "02:00 PM - 03:30 PM",
        title: "Tech Community Carnival & Outdoor Showcase",
        venue: "Pitch Side Grounds",
        category: "Social",
        description: "Music, gaming pavilions (FIFA / PES esports battles), student vendor pop-ups, and sponsor brand activations."
      },
      {
        time: "03:45 PM - 05:45 PM",
        title: "Grand Final Match & Trophy Ceremony",
        venue: "AKSU Main Sports Complex",
        category: "Sports",
        description: "Championship clash to determine the NACOS Week 2027 Football Champion with medal presentation."
      }
    ]
  },
  {
    dayNumber: 4,
    dateLabel: "Day 4 • Thursday",
    title: "Fashion, Tech Runway & Pageantry",
    tagline: "Celebrating student creativity, design aesthetics, and royal coronation.",
    sessions: [
      {
        time: "04:00 PM - 06:00 PM",
        title: "Tech Runway & Creative Wear Exhibition",
        venue: "Campus Amphitheatre",
        category: "Social",
        description: "Student fashion designers showcase contemporary streetwear, traditional couture, and futuristic wearable tech concepts."
      },
      {
        time: "06:30 PM - 09:30 PM",
        title: "Mr & Miss NACOS AKSU Pageantry Coronation",
        venue: "Campus Amphitheatre",
        category: "Social",
        description: "Contestants compete in intellect, stage presence, campus impact pitch, and poise. Crowning of the Royal Council."
      }
    ]
  },
  {
    dayNumber: 5,
    dateLabel: "Day 5 • Friday",
    title: "Gala Dinner & Awards Night",
    tagline: "Grand black-tie banquet celebrating excellence, awards, and dinner.",
    sessions: [
      {
        time: "06:00 PM - 07:00 PM",
        title: "Red Carpet, Photo Calls & Cocktails",
        venue: "Grand Banquet Hall Foyer",
        category: "Gala",
        description: "Executives, dignitaries, graduating seniors, and guests arrive in evening black-tie attire."
      },
      {
        time: "07:00 PM - 08:30 PM",
        title: "Dinner Service & Keynote Reflections",
        venue: "Grand Banquet Hall",
        category: "Gala",
        description: "Formal dining, address by Pioneer Faculty President and Patrons, reflecting on a milestone academic year."
      },
      {
        time: "08:30 PM - 10:30 PM",
        title: "Presentation of Honours, Faculty Citations & Valedictory",
        venue: "Grand Banquet Hall",
        category: "Gala",
        description: "Department honours, Student Developer of the Year, Outstanding Executive Awards, and celebration."
      }
    ]
  }
];

export const ProgrammePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(2); // Default to Conference Day
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const currentDayData = scheduleData.find((d) => d.dayNumber === activeDay) || scheduleData[0];

  const filteredSessions = currentDayData.sessions.filter((s) => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Keynote' && s.category === 'Keynote') return true;
    if (filterCategory === 'Workshop & Hacking' && (s.category === 'Workshop' || s.category === 'Pitch')) return true;
    if (filterCategory === 'Social & Sports' && (s.category === 'Sports' || s.category === 'Social' || s.category === 'Gala')) return true;
    return false;
  });

  const downloadCalendarFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NACOS AKSU//NACOS Week 2027: Confluence//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:NACOS Week 2027: Confluence
DESCRIPTION:Five tracks, five events. Akwa Ibom State University, FCIT.
LOCATION:Conference Centre, Ikot Akpaden, Akwa Ibom State University
DTSTART:20270215T090000Z
DTEND:20270219T220000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'nacos-week-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      {/* Overview Pillars with photography */}
      <Programme />

      {/* Interactive Schedule Timetable Section (Commented Out)
      <section className="section nacos-schedule-section" id="schedule-explorer">
        <div className="wrap">
          <header className="section__head section__head--split">
            <div>
              <p className="tag">Interactive Timetable</p>
              <h2 className="h2">Day-by-Day Convention Schedule</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={downloadCalendarFile}
                title="Add to Google Calendar / Apple iCal"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Export to Calendar (.ics)
              </button>
            </div>
          </header>

          Day Tabs
          <div className="nacos-schedule-tabs" role="tablist" aria-label="Schedule days">
            {scheduleData.map((d) => (
              <button
                key={d.dayNumber}
                type="button"
                role="tab"
                aria-selected={activeDay === d.dayNumber}
                className={`nacos-schedule-tab ${activeDay === d.dayNumber ? 'is-active' : ''}`}
                onClick={() => setActiveDay(d.dayNumber)}
              >
                <span className="nacos-schedule-tab-date">{d.dateLabel}</span>
                <strong className="nacos-schedule-tab-title">{d.title}</strong>
              </button>
            ))}
          </div>

          Active Day Header
          <div className="nacos-schedule-day-banner">
            <div>
              <h3 className="h3" style={{ color: 'var(--brand-deep)', marginBottom: 'var(--space-2xs)' }}>
                {currentDayData.title}
              </h3>
              <p style={{ color: 'var(--color-ink-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>
                {currentDayData.tagline}
              </p>
            </div>

            Filter pills
            <div className="nacos-filter-pills" role="toolbar" aria-label="Filter events">
              {['All', 'Keynote', 'Workshop & Hacking', 'Social & Sports'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`nacos-pill ${filterCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          Sessions List
          <div className="nacos-sessions-grid">
            {filteredSessions.map((s, idx) => (
              <article key={idx} className="nacos-session-card">
                <div className="nacos-session-card__time">
                  <span className="nacos-time-badge">{s.time}</span>
                  <span className={`nacos-cat-badge nacos-cat-badge--${s.category.toLowerCase()}`}>
                    {s.category}
                  </span>
                </div>
                <div className="nacos-session-card__body">
                  <h4 className="nacos-session-card__title">{s.title}</h4>
                  <p className="nacos-session-card__desc">{s.description}</p>
                  <div className="nacos-session-card__meta">
                    <span className="nacos-meta-venue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {s.venue}
                    </span>
                    {s.speaker && (
                      <span className="nacos-meta-speaker">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        {s.speaker}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Confirmed Keynotes & Voices */}
      <Speakers />

      {/* Archive Carousel */}
      <PhotoCarousel />

      {/* Registration Callout */}
      <section className="section" style={{ background: 'var(--brand-deep)', color: 'var(--brand-off)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="h2" style={{ color: 'var(--brand-off)', margin: '0 0 var(--space-md)' }}>
            Register for NACOS Week 2027
          </h2>
          <p className="lead" style={{ margin: '0 auto var(--space-xl)', color: 'var(--color-on-forest-muted)', maxWidth: '640px' }}>
            Open to every student at Akwa Ibom State University, from any faculty.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn--signal">
              Register &rarr;
            </Link>
            <Link to="/faq" className="btn btn--outline" style={{ borderColor: 'var(--brand-soft)', color: 'var(--brand-off)' }}>
              Venue &amp; FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
