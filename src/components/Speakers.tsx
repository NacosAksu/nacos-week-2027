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

// Speakers are not confirmed yet: blurred placeholders, no names, roles or topics.
// When one is confirmed, set name, role and topic and add the real photo.
const speakersList: SpeakerItem[] = [
  { name: "To be announced", role: "", track: "Energy", photo: "/assets/speakers/speaker-01.jpg", isRevealed: false },
  { name: "To be announced", role: "", track: "Finance", photo: "/assets/speakers/speaker-02.jpg", isRevealed: false },
  { name: "To be announced", role: "", track: "Oil & Gas", photo: "/assets/speakers/speaker-03.jpg", isRevealed: false },
  { name: "To be announced", role: "", track: "Medicine", photo: "/assets/speakers/speaker-04.jpg", isRevealed: false },
  { name: "To be announced", role: "", track: "Technology", photo: "/assets/speakers/speaker-05.jpg", isRevealed: false }
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  // Saves to the "Speaker Suggestions" tab of the registrations sheet (backend/registration.gs)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = siteConfig.forms.registrationEndpoint;
    if (!endpoint) {
      setSendError(`Suggestions are not open yet. Email ${siteConfig.links.generalEmail} instead.`);
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const body = new URLSearchParams({
        type: 'speaker_suggestion',
        nominee: suggestForm.name,
        role: suggestForm.role,
        track: suggestForm.track,
        link: suggestForm.link,
        reason: suggestForm.reason
      });
      const response = await fetch(endpoint, { method: 'POST', body });
      const res = await response.json();
      if (res.result !== 'success') throw new Error(res.error || 'rejected');
      setSubmitted(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitted(false);
        setSuggestForm({ name: '', role: '', track: 'Technology', link: '', reason: '' });
      }, 2500);
    } catch {
      setSendError(`That didn't go through. Please try again, or email ${siteConfig.links.generalEmail}.`);
    } finally {
      setSending(false);
    }
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
            Speakers from each of the five tracks. Names will be announced here.
          </p>
        </header>

        <ul className="people people--speakers">
          {speakersList.map((s, idx) => (
            <li className="person" key={idx}>
              {s.photo ? (
                <div className={`person__photo-wrap${s.isRevealed ? '' : ' person__photo-wrap--hidden'}`}>
                  <img
                    src={s.photo}
                    alt={s.isRevealed ? s.name : `${s.track} speaker, to be announced`}
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
              {s.role && (
                <p className="person__role" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                  {s.role}
                </p>
              )}
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
              Tell us who you would like to hear from. We contact the people we shortlist.
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

                {sendError && (
                  <p role="alert" style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>
                    {sendError}
                  </p>
                )}

                <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--signal" disabled={sending}>
                    {sending ? 'Sending...' : 'Submit Nomination'}
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
