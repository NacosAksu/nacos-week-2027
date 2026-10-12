import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface TrackItem {
  n: string;
  id: string;
  name: string;
  summary: string;
  iconName: string;
  challenges: string[];
  roles: string;
  techStack: string[];
  prizeShare: string;
}

const trackDetails: TrackItem[] = [
  {
    n: '01',
    id: 'energy',
    name: 'Energy',
    iconName: '⚡',
    summary: 'Power generation, mini-grid distribution and smart metering. Where real-time sensor data meets the national and regional power grid.',
    challenges: [
      'Renewable mini-grid monitoring & automated load balancing for rural community clusters',
      'Smart metering tamper detection & payment gateways for localized utility operators',
      'Solar energy surplus peer-to-peer trading & battery health predictive analytics'
    ],
    roles: 'Embedded engineers, IoT builders, Power system researchers, Hardware hackers',
    techStack: ['ESP32 / Arduino', 'MQTT / WebSockets', 'Python (Time Series)', 'React Dashboard', 'C++'],
    prizeShare: '₦300,000 + Hardware Kits'
  },
  {
    n: '02',
    id: 'finance',
    name: 'Finance',
    iconName: '💳',
    summary: 'Banking, merchant payments and fintech. Engineered software that securely moves money, lowers transaction overhead, and earns consumer trust.',
    challenges: [
      'Low-bandwidth offline payment verification for campus and informal open markets',
      'Micro-insurance underwriting algorithms for smallholder farmers and campus vendors',
      'Secure student remittance pipelines with transparent exchange fee reporting and instant settlement'
    ],
    roles: 'Fullstack developers, Smart contract engineers, Financial analysts, Security researchers',
    techStack: ['Node.js / Go', 'PostgreSQL', 'Web3 / Smart Contracts', 'Mobile SDKs', 'Zero-Knowledge Proofs'],
    prizeShare: '₦300,000 + Cloud Credits'
  },
  {
    n: '03',
    id: 'oil-and-gas',
    name: 'Oil & Gas',
    iconName: '🛢️',
    summary: 'Exploration, telemetry, operations and worker safety. The heavy industrial backbone that the Niger Delta economy is historically built upon.',
    challenges: [
      'Pipeline integrity drone telemetry analysis and automated leak alert dispatch',
      'Remote offshore workforce safety compliance & real-time environmental hazard monitoring',
      'Supply chain inventory tracking, logistics coordination, and decarbonisation reporting portals'
    ],
    roles: 'Computer vision engineers, Data scientists, Hardware/Robotics tinkerers, Systems architects',
    techStack: ['OpenCV / PyTorch', 'Geospatial GIS', 'FastAPI', 'Drone Telemetry APIs', 'Docker / Edge AI'],
    prizeShare: '₦300,000 + Industry Mentorship'
  },
  {
    n: '04',
    id: 'medicine',
    name: 'Medicine',
    iconName: '🩺',
    summary: 'Electronic clinical records, telemedicine diagnostics and democratized access to primary care. Computing that preserves and improves human lives.',
    challenges: [
      'Offline-first electronic medical record (EMR) synchronization for rural primary health centres',
      'AI-assisted triage and preliminary symptomatic screening for regional community clinics',
      'Vaccine cold-chain temperature monitoring using low-cost connected sensor nodes'
    ],
    roles: 'Mobile developers, Machine learning engineers, Health-tech researchers, UI/UX designers',
    techStack: ['Flutter / React Native', 'SQLite / PGLite (Offline)', 'TensorFlow Lite', 'Bluetooth Low Energy', 'FHIR / HL7'],
    prizeShare: '₦300,000 + Incubation Support'
  },
  {
    n: '05',
    id: 'technology',
    name: 'Technology',
    iconName: '💻',
    summary: 'Core software engineering, agentic AI, developer tooling and cybersecurity. The bedrock craft that every other industrial track builds upon.',
    challenges: [
      'Agentic AI developer tooling & localized LLM fine-tuning pipelines for African dialects',
      'Campus identity management & decentralized academic credential verification for AKSU',
      'Zero-trust network monitoring and proactive threat defense systems for distributed institutions'
    ],
    roles: 'Systems programmers, Cloud/DevOps engineers, Security researchers, AI developers',
    techStack: ['Rust / Python', 'LangChain / Ollama', 'Linux Kernel / eBPF', 'Docker / K8s', 'Next.js / Vite'],
    prizeShare: '₦300,000 + Developer Grant'
  }
];

export const TracksPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredTracks = selectedFilter === 'all'
    ? trackDetails
    : trackDetails.filter((t) => t.id === selectedFilter);

  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      <section className="section tracks" id="tracks" aria-labelledby="tracks-page-title">
        <div className="wrap">
          <header className="section__head section__head--split">
            <div>
              <p className="tag">Five Sectors · Three Weeks · Real Industry Impact</p>
              <h1 id="tracks-page-title" className="h2" style={{ color: 'var(--brand-off)' }}>
                Five Tracks. One University.
              </h1>
            </div>
            <p className="lead" style={{ color: 'var(--color-on-forest-muted)' }}>
              Every pillar of NACOS Week 2027—from the Confluence Hackathon problem statements to the Tech Conference keynotes—is anchored around five core industry sectors.
            </p>
          </header>

          {/* Interactive Filter Pills */}
          <div className="nacos-track-filters" style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', margin: 'var(--space-lg) 0 var(--space-xl)' }}>
            <button
              type="button"
              className={`nacos-pill ${selectedFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All 5 Tracks
            </button>
            {trackDetails.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`nacos-pill ${selectedFilter === t.id ? 'is-active' : ''}`}
                onClick={() => setSelectedFilter(t.id)}
              >
                {t.iconName} {t.name}
              </button>
            ))}
          </div>

          {/* Tracks Display Grid */}
          <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
            {filteredTracks.map((t) => (
              <article
                key={t.n}
                className="nacos-track-card"
                style={{
                  border: '1px solid var(--color-forest-rule)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-xl)',
                  background: 'rgba(0, 80, 18, 0.45)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(8px)',
                  display: 'grid',
                  gap: 'var(--space-md)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{t.iconName}</span>
                    <div>
                      <span className="track__n" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-soft)', display: 'block' }}>
                        Track {t.n}
                      </span>
                      <h2 className="track__name" style={{ fontSize: 'var(--text-2xl)', margin: 0, color: 'var(--brand-off)' }}>
                        {t.name}
                      </h2>
                    </div>
                  </div>
                  <span className="nacos-prize-badge" style={{ background: 'rgba(8, 144, 2, 0.2)', border: '1px solid var(--brand-green)', color: 'var(--brand-soft)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                    Track Prize: {t.prizeShare}
                  </span>
                </div>

                <p style={{ color: 'var(--color-on-forest-muted)', fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
                  {t.summary}
                </p>

                <div style={{ marginTop: 'var(--space-xs)' }}>
                  <h3 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-soft)', marginBottom: 'var(--space-xs)' }}>
                    Core Problem Statements &amp; Challenge Briefs
                  </h3>
                  <ul style={{ paddingLeft: 'var(--space-lg)', color: 'var(--brand-off)', display: 'grid', gap: 'var(--space-xs)' }}>
                    {t.challenges.map((c, idx) => (
                      <li key={idx} style={{ listStyleType: 'disc', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stacks */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', flexWrap: 'wrap', marginTop: 'var(--space-xs)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--brand-soft)', fontWeight: 600 }}>Recommended Stack:</span>
                  {t.techStack.map((tech, i) => (
                    <span key={i} style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--brand-off)' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--color-forest-rule)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-on-forest-muted)', margin: 0 }}>
                    <strong>Target Builder Profiles:</strong> {t.roles}
                  </p>
                  <Link
                    to="/register"
                    className="btn btn--signal btn--sm"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Register for {t.name} &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-3xl)', textAlign: 'center' }}>
            <p className="tracks__note" style={{ marginBottom: 'var(--space-lg)' }}>
              Industry partners set and evaluate the problem statements for each sector. Partners are confirmed on rolling basis.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn--signal">
                Register as Hackathon Participant
              </Link>
              <Link to="/partner" className="btn btn--ghost-night">
                Sponsor a Track Problem Statement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
