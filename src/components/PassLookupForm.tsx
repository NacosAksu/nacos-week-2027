import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface VerifiedPassData {
  passId: string;
  name: string;
  email: string;
  department: string;
  level: string;
  interests?: string[];
  registeredAt?: string;
  type: 'delegate' | 'volunteer' | 'vip';
}

interface PassLookupFormProps {
  onSwitchToRegister?: () => void;
  onSwitchToVolunteer?: () => void;
}

export const PassLookupForm: React.FC<PassLookupFormProps> = ({
  onSwitchToRegister,
  onSwitchToVolunteer
}) => {
  const [lookupQuery, setLookupQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [verifiedPass, setVerifiedPass] = useState<VerifiedPassData | null>(null);
  const [savedPass, setSavedPass] = useState<VerifiedPassData | null>(null);

  // Check if a pass exists in local storage from a recent registration
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nw27_last_pass');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.passId || parsed.email)) {
          setSavedPass(parsed);
        }
      }
    } catch {
      // Local storage unavailable or empty
    }
  }, []);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');

    const query = lookupQuery.trim().toLowerCase();
    if (!query) {
      setError('Enter the email you registered with, or your pass ID (e.g. NW27-0012).');
      return;
    }

    // Registered on this device: show the saved pass straight away
    if (savedPass && (savedPass.email.toLowerCase() === query || savedPass.passId.toLowerCase() === query)) {
      setVerifiedPass(savedPass);
      return;
    }

    const endpoint = siteConfig.forms.registrationEndpoint;
    if (!endpoint) {
      setError(`Pass lookup is not available yet. Email ${siteConfig.links.generalEmail} for help.`);
      return;
    }

    // The sheet re-sends the confirmation to the email on file; no personal details come back
    setIsSearching(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new URLSearchParams({ action: 'lookup', query })
      });
      const res = await response.json();
      if (res.result === 'sent') {
        setNotice(`Found it. We've sent your pass to ${res.to || 'your registered email'}. Check your inbox and spam folder.`);
      } else if (res.result === 'not_found') {
        setError('No registration found with that email or pass ID. Check the spelling, or register below.');
      } else {
        throw new Error('rejected');
      }
    } catch {
      setError(`We couldn't check right now. Please try again, or email ${siteConfig.links.generalEmail}.`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="section register auth-section" id="auth-portal" aria-labelledby="auth-title">
      <div className="wrap register__grid">
        {/* Left Column: Accreditation Overview */}
        <div className="register__intro">
          <span className="deck-eyebrow">Lost Your Registration ID?</span>
          <h2 id="auth-title" className="h2" style={{ margin: 'var(--space-xs) 0 var(--space-sm)', color: 'var(--brand-black)' }}>
            Find Your Pass
          </h2>
          <p className="lead" style={{ color: 'var(--color-ink-muted)' }}>
            Already registered? Enter the email you used or your registration ID and we'll email your confirmation to you again.
          </p>

          <div className="register__benefits" style={{ marginTop: 'var(--space-md)', display: 'grid', gap: 'var(--space-sm)', fontSize: 'var(--text-sm)', color: 'var(--brand-black)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>✓</span>
              <span>Works with your registered email or registration ID</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>✓</span>
              <span>Show your registration ID (NW27-xxxx) at the registration desk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>✓</span>
              <span>Sent only to the email on file, so your details stay private</span>
            </div>
          </div>

          {/* Sample of the confirmation people get (no barcode: check-in is by registration ID) */}
          <div className="pass-preview-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="pass-preview-card__header">
              <div className="pass-preview-card__live-indicator">
                <span>SAMPLE REGISTRATION</span>
              </div>
              <span className="pass-preview-card__year">FEB 2027</span>
            </div>
            <div className="pass-preview-card__body">
              <div className="pass-preview-card__theme">CONFLUENCE &bull; NACOS WEEK 27</div>
              <div className="pass-preview-card__role">YOUR NAME HERE</div>
              <div className="pass-preview-card__location">Conference Centre, Perm Site, AKSU</div>
            </div>
            <div className="pass-preview-card__footer">
              <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)' }}>Show this ID at the registration desk</span>
              <span className="pass-preview-card__id">NW27-0001</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sign In / Lookup Card */}
        <div className="form auth-card">
          {/* Header Mode Switcher inside card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-ink-border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', color: 'var(--brand-black)', fontWeight: 700 }}>
                Find Your Pass
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                We'll re-send your confirmation email with your pass ID
              </p>
            </div>
          </div>

          {/* Quick-found local storage banner */}
          {savedPass && !verifiedPass && (
            <div className="saved-pass-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-deep)' }}>
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                </svg>
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--brand-deep)' }}>
                    Registered on this device: {savedPass.passId}
                  </strong>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                    {savedPass.name} ({savedPass.email})
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn--outline"
                style={{ padding: '0.35rem 0.75rem', fontSize: 'var(--text-xs)' }}
                onClick={() => setVerifiedPass(savedPass)}
              >
                View Pass &rarr;
              </button>
            </div>
          )}

          {verifiedPass ? (
            /* Verified Pass Detail View */
            <div className="verified-pass-display">
              <div className="verified-pass-display__top">
                <span className="verified-status-tag">✓ REGISTERED ON THIS DEVICE</span>
                <span className="verified-pass-id">{verifiedPass.passId}</span>
              </div>

              <div className="pass-preview-card">
                <div className="pass-preview-card__header">
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a4f49b', fontWeight: 700 }}>
                    REGISTRATION ID
                  </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: '#fff', background: 'rgba(255,255,255,0.18)', padding: '2px 8px', borderRadius: '4px' }}>
                    {verifiedPass.passId}
                  </span>
                </div>

                <div className="pass-preview-card__body">
                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Attendee Name</span>
                    <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-black)' }}>
                      {verifiedPass.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                      {verifiedPass.email}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xs)', fontSize: '0.8rem', borderTop: '1px solid var(--color-ink-border)', paddingTop: 'var(--space-xs)' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-ink-muted)', display: 'block' }}>Faculty / Department</span>
                      <strong style={{ color: 'var(--brand-deep)' }}>{verifiedPass.department}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-ink-muted)', display: 'block' }}>Status</span>
                      <strong>{verifiedPass.level || 'Registered'}</strong>
                    </div>
                  </div>
                </div>

                <div className="pass-preview-card__footer">
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)' }}>
                    Show this ID at the registration desk
                  </span>
                  <span className="pass-preview-card__id">{verifiedPass.passId}</span>
                </div>
              </div>

              <div className="verified-actions-row">
                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => window.print()}
                >
                  Print / Save
                </button>
                <button
                  type="button"
                  className="btn btn--signal"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setVerifiedPass(null)}
                >
                  Check Another
                </button>
              </div>
            </div>
          ) : (
            /* Standard Delegate Lookup Form */
            <form onSubmit={handleLookup} noValidate style={{ display: 'grid', gap: 'var(--space-md)' }}>
              <div className="field">
                <label htmlFor="lookup-query">Email Address or Pass ID *</label>
                <input
                  id="lookup-query"
                  type="text"
                  required
                  className="field__input"
                  placeholder="e.g. victor@aksu.edu.ng or NW27-0042"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  aria-invalid={!!error}
                />
                <span style={{ fontSize: 'var(--text-xs)', color: '#4b5563' }}>
                  Your pass is sent to the email you registered with, never shown to whoever types it here.
                </span>
              </div>

              {error && <span className="field__err" role="alert">{error}</span>}
              {notice && (
                <p role="status" style={{ margin: 0, padding: 'var(--space-sm)', background: 'var(--brand-pale)', border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', color: 'var(--brand-deep)' }}>
                  {notice}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--signal"
                disabled={isSearching}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isSearching ? 'Checking...' : 'Send Me My Pass →'}
              </button>

              {/* Bottom links */}
              <div className="auth-card-footer">
                <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: '#4b5563', textAlign: 'center' }}>
                  Don&apos;t have a pass yet?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="auth-link-button"
                  >
                    Register for Free Pass &rarr;
                  </button>
                </p>
                {onSwitchToVolunteer && (
                  <p style={{ margin: 'var(--space-2xs) 0 0', fontSize: 'var(--text-xs)', color: '#4b5563', textAlign: 'center' }}>
                    Want to volunteer?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToVolunteer}
                      className="auth-link-button"
                    >
                      Join Organizing Crew &rarr;
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PassLookupForm;
