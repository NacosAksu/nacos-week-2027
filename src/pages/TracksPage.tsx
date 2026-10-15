import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TrackItem {
  n: string;
  id: string;
  name: string;
  tag: string;
  summary: string;
  challenges: string[];
  roles: string;
  techStack: string[];
}

const trackDetails: TrackItem[] = [
  {
    n: '01',
    id: 'energy',
    name: 'Energy',
    tag: 'Grid & Power Systems',
    summary: 'Power generation, mini-grid distribution and smart metering. Where real-time sensor data meets the national and regional power grid.',
    challenges: [
      'Renewable mini-grid monitoring and automated load balancing for rural community clusters',
      'Smart metering tamper detection and payment verification for localized utility operators',
      'Solar energy surplus peer-to-peer trading and battery health predictive analytics'
    ],
    roles: 'Embedded engineers, IoT builders, Power system researchers, Hardware hackers',
    techStack: ['ESP32 / Arduino', 'MQTT / WebSockets', 'Python (Time Series)', 'React Dashboard', 'C++']
  },
  {
    n: '02',
    id: 'finance',
    name: 'Finance',
    tag: 'FinTech & Digital Payments',
    summary: 'Banking, merchant payments and fintech. Engineered software that securely moves money, lowers transaction overhead, and earns consumer trust.',
    challenges: [
      'Low-bandwidth offline payment verification for campus and informal open markets',
      'Micro-insurance underwriting algorithms for smallholder farmers and campus vendors',
      'Secure student remittance pipelines with transparent exchange fee reporting and instant settlement'
    ],
    roles: 'Fullstack developers, Smart contract engineers, Financial analysts, Security researchers',
    techStack: ['Node.js / Go', 'PostgreSQL', 'Web3 / Smart Contracts', 'Mobile SDKs', 'Security Proofs']
  },
  {
    n: '03',
    id: 'oil-and-gas',
    name: 'Oil & Gas',
    tag: 'Exploration & Industrial IoT',
    summary: 'Exploration, telemetry, operations and worker safety. The heavy industrial backbone that the Niger Delta economy is historically built upon.',
    challenges: [
      'Pipeline integrity drone telemetry analysis and automated leak alert dispatch',
      'Remote offshore workforce safety compliance and real-time environmental hazard monitoring',
      'Supply chain inventory tracking, logistics coordination, and decarbonisation reporting portals'
    ],
    roles: 'Computer vision engineers, Data scientists, Hardware/Robotics tinkerers, Systems architects',
    techStack: ['OpenCV / PyTorch', 'Geospatial GIS', 'FastAPI', 'Drone Telemetry APIs', 'Docker / Edge AI']
  },
  {
    n: '04',
    id: 'medicine',
    name: 'Medicine',
    tag: 'HealthTech & Telemedicine',
    summary: 'Electronic clinical records, telemedicine diagnostics and democratized access to primary care. Computing that preserves and improves human lives.',
    challenges: [
      'Offline-first electronic medical record (EMR) synchronization for rural primary health centres',
      'Assisted triage and preliminary symptomatic screening for regional community clinics',
      'Vaccine cold-chain temperature monitoring using low-cost connected sensor nodes'
    ],
    roles: 'Mobile developers, Machine learning engineers, Health-tech researchers, UI/UX designers',
    techStack: ['Flutter / React Native', 'SQLite / PGLite (Offline)', 'TensorFlow Lite', 'Bluetooth Low Energy', 'FHIR / HL7']
  },
  {
    n: '05',
    id: 'technology',
    name: 'Technology',
    tag: 'Software, Cloud & Cyber Security',
    summary: 'Core software engineering, developer tooling and cybersecurity. The foundational engineering craft that every other industrial track builds upon.',
    challenges: [
      'Developer tooling and localized natural language pipelines for regional applications',
      'Campus identity management and verifiable academic credential systems for AKSU',
      'Zero-trust network monitoring and proactive threat defense systems for distributed institutions'
    ],
    roles: 'Systems programmers, Cloud/DevOps engineers, Security researchers, Software builders',
    techStack: ['Rust / Python', 'Linux / eBPF', 'Docker / Containers', 'Next.js / Vite', 'Go']
  }
];

export const TracksPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Phones: track details start collapsed so five long cards don't fill ten screens
  const phoneQuery = '(max-width: 640px)';
  const [isPhone, setIsPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(phoneQuery).matches);
  useEffect(() => {
    const mq = window.matchMedia(phoneQuery);
    const onChange = () => setIsPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const filteredTracks = selectedFilter === 'all'
    ? trackDetails
    : trackDetails.filter((t) => t.id === selectedFilter);

  return (
    <div className="tracks-page-wrapper">
      <section className="section" id="tracks" aria-labelledby="tracks-page-title">
        <div className="wrap">
          <header className="section__head section__head--split">
            <div>
              <div className="deck-eyebrow">
                <span className="deck-eyebrow__num">03</span>
                <span className="deck-eyebrow__text">Sector Specializations</span>
              </div>
              <h1 id="tracks-page-title" className="h2">
                Five Tracks. One University.
              </h1>
            </div>
            <p className="lead">
              Every pillar of NACOS Week 2027, from the Confluence Hackathon problem statements to the Tech Conference keynotes, is anchored around five core industry sectors.
            </p>
          </header>

          {/* Minimalist Filter Bar */}
          <div className="deck-filter-bar">
            <button
              type="button"
              className={`deck-filter-btn ${selectedFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All 5 Tracks
            </button>
            {trackDetails.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`deck-filter-btn ${selectedFilter === t.id ? 'is-active' : ''}`}
                onClick={() => setSelectedFilter(t.id)}
              >
                {t.n} · {t.name}
              </button>
            ))}
          </div>

          {/* Tracks Display Grid */}
          <div className="deck-track-grid">
            {filteredTracks.map((t) => (
              <article key={t.n} className="deck-track-card">
                <div className="deck-track-card__header">
                  <div>
                    <span className="deck-track-card__num">Track {t.n}</span>
                    <h2 className="deck-track-card__title">{t.name}</h2>
                  </div>
                  <span className="deck-track-card__tag">{t.tag}</span>
                </div>

                <p className="deck-track-card__summary">
                  {t.summary}
                </p>

                <details className="deck-track-card__more" open={!isPhone || selectedFilter !== 'all'} key={`${t.n}-${isPhone}-${selectedFilter}`}>
                  <summary className="deck-track-card__toggle">See problem statements &amp; skills</summary>

                  <div className="deck-track-card__section">
                    <h3 className="deck-track-card__kicker">
                      Challenge Problem Statements
                    </h3>
                    <ul className="deck-track-card__challenges">
                      {t.challenges.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="deck-track-card__meta">
                    <div>
                      <span className="deck-track-card__kicker">Target Participant Profiles</span>
                      <p>{t.roles}</p>
                    </div>
                    <div style={{ marginTop: 'var(--space-sm)' }}>
                      <span className="deck-track-card__kicker">Relevant Technologies</span>
                      <div className="deck-track-card__stack">
                        {t.techStack.map((tech, i) => (
                          <span key={i} className="deck-track-card__stack-pill">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>

                <div className="deck-track-card__footer">
                  <Link to="/register" className="btn btn--outline" style={{ fontSize: 'var(--text-xs)', padding: '0.5rem 1rem' }}>
                    Join Hackathon in {t.name} &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-3xl)', textAlign: 'center' }}>
            <p className="lead" style={{ margin: '0 auto var(--space-md)' }}>
              Corporate sponsors and sector partners set real-world problem statements for each track.
            </p>
            <Link to="/partner" className="btn btn--deep">
              Partner with a Track &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
