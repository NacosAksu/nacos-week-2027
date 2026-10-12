import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SpeakerItem {
  name: string;
  role: string;
  track: string;
  photo?: string;
  isRevealed: boolean;
  topic?: string;
}

const speakersList: SpeakerItem[] = [
  {
    name: "Keynote: Energy Systems",
    role: "Power Infrastructure & Grid Analytics Specialist",
    track: "Energy",
    photo: "/assets/speakers/speaker-01.jpg",
    isRevealed: true,
    topic: "Building Resilient Digital Grids for Emerging Economies"
  },
  {
    name: "Keynote: Fintech Architecture",
    role: "Distributed Payments & Financial Security Director",
    track: "Finance",
    photo: "/assets/speakers/speaker-02.jpg",
    isRevealed: true,
    topic: "Decentralized Financial Pipelines & High-Throughput Verification"
  },
  {
    name: "Industry Lead (Offshore Tech)",
    role: "Computer Vision & Pipeline Telemetry Engineer",
    track: "Oil & Gas",
    isRevealed: false,
    topic: "Robotics and Hazard Telemetry in Offshore Operations"
  },
  {
    name: "Health-Tech Lead",
    role: "Clinical Data Systems & AI Diagnostics Researcher",
    track: "Medicine",
    isRevealed: false,
    topic: "Offline-First Healthcare Synchronization in Primary Clinics"
  },
  {
    name: "Cybersecurity & Cloud Director",
    role: "Zero-Trust Infrastructure & Agentic AI Specialist",
    track: "Technology",
    isRevealed: false,
    topic: "Autonomous Threat Detection and Secure Campus Networks"
  }
];

export const Speakers: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [suggestForm, setSuggestForm] = useState({
    name: '',
    role: '',
    track: 'Technology',
    link: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setSuggestForm({ name: '', role: '', track: 'Technology', link: '', reason: '' });
    }, 2000);
  };

  return (
    <section className="section speakers" id="speakers" aria-labelledby="speakers-title">
      <div className="wrap">
        <header className="section__head section__head--split">
          <div>
            <p className="tag">Voices &amp; Mentors</p>
            <h2 id="speakers-title" className="h2">Speakers, Mentors and Judges</h2>
          </div>
          <p className="lead">
            Industry professionals from leading technology firms, energy operators, banks and healthcare institutions sharing knowledge with AKSU students.
          </p>
        </header>

        <ul className="people people--speakers">
          {speakersList.map((s, idx) => (
            <li className="person" key={idx}>
              {s.isRevealed && s.photo ? (
                <div className="person__photo-wrap">
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="person__photo-img"
                    loading="lazy"
                  />
                  <span className="person__track-badge">{s.track}</span>
                </div>
              ) : (
                <div
                  className="ph ph--square ph--mystery person__photo"
                  role="img"
                  aria-label={`${s.track} speaker revealing soon`}
                >
                  <span className="ph__label">Revealing soon</span>
                  <span className="person__track-badge">{s.track}</span>
                </div>
              )}
              <h3 className="person__name" style={{ fontSize: 'var(--text-base)', marginTop: 'var(--space-xs)' }}>
                {s.name}
              </h3>
              <p className="person__role" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                {s.role}
              </p>
              {s.topic && (
                <p className="person__topic" style={{ fontSize: '0.78rem', color: 'var(--brand-deep)', fontWeight: 500, marginTop: 'var(--space-2xs)' }}>
                  Topic: {s.topic}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="speakers__cta-box">
          <p className="speakers__ask">
            Know a tech leader or alumnus who should take the stage?
          </p>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setModalOpen(true)}
          >
            Suggest a Speaker / Judge &rarr;
          </button>
        </div>
      </div>

      {/* Suggest Speaker Modal */}
      {modalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="speakerModalTitle"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-x"
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close dialog"
            >
              &times;
            </button>

            <span className="tag">Community Nomination</span>
            <h3 id="speakerModalTitle" className="h3" style={{ margin: 'var(--space-xs) 0 var(--space-sm)' }}>
              Nominate a Speaker or Judge
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-md)' }}>
              Help us bring the finest practitioners to NACOS Week 2027. We reach out directly to approved nominees.
            </p>

            {submitted ? (
              <div className="status-notice status-notice--ok" style={{ padding: 'var(--space-md)', textAlign: 'center' }}>
                <strong>Thank you!</strong>
                <p style={{ marginTop: 'var(--space-2xs)' }}>Your recommendation has been submitted to the Planning Committee.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="nacos-modal-form">
                <div className="field">
                  <label className="field__label">Nominee Name *</label>
                  <input
                    type="text"
                    required
                    className="field__input"
                    placeholder="e.g. Dr. Ngozi Balogun"
                    value={suggestForm.name}
                    onChange={(e) => setSuggestForm({ ...suggestForm, name: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label className="field__label">Current Role &amp; Organization *</label>
                  <input
                    type="text"
                    required
                    className="field__input"
                    placeholder="e.g. Principal Cloud Architect at Interswitch"
                    value={suggestForm.role}
                    onChange={(e) => setSuggestForm({ ...suggestForm, role: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label className="field__label">Relevant Track *</label>
                  <select
                    className="field__input"
                    value={suggestForm.track}
                    onChange={(e) => setSuggestForm({ ...suggestForm, track: e.target.value })}
                  >
                    <option value="Energy">Energy</option>
                    <option value="Finance">Finance / FinTech</option>
                    <option value="Oil & Gas">Oil &amp; Gas</option>
                    <option value="Medicine">Medicine &amp; HealthTech</option>
                    <option value="Technology">Technology &amp; AI</option>
                  </select>
                </div>

                <div className="field">
                  <label className="field__label">LinkedIn or Website Profile</label>
                  <input
                    type="url"
                    className="field__input"
                    placeholder="https://linkedin.com/in/..."
                    value={suggestForm.link}
                    onChange={(e) => setSuggestForm({ ...suggestForm, link: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label className="field__label">Why would they be a great fit?</label>
                  <textarea
                    rows={2}
                    className="field__input"
                    placeholder="Brief reason for nomination..."
                    value={suggestForm.reason}
                    onChange={(e) => setSuggestForm({ ...suggestForm, reason: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--signal">
                    Submit Nomination
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
