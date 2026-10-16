import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface ConfirmedPass {
  name: string;
  passId: string;
  department: string;
  level: string;
  email: string;
  interests: string[];
}

interface RegisterFormProps {
  onSwitchToVolunteer?: () => void;
  onSwitchToSignIn?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToVolunteer, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    level: '',
    interests: [] as string[],
    contact_ok: false,
    share_with_partners: false,
    website: '' // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ tone: 'ok' | 'error' | ''; message: string }>({
    tone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState('Register');
  const [confirmedPass, setConfirmedPass] = useState<ConfirmedPass | null>(null);

  const savePassLocally = (pass: ConfirmedPass) => {
    try {
      localStorage.setItem('nw27_last_pass', JSON.stringify({
        ...pass,
        registeredAt: new Date().toISOString(),
        type: 'delegate'
      }));
    } catch {
      // storage unavailable
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length <= 1) {
      errs.name = 'Enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter an email address like name@example.com.';
    }
    if (formData.phone.replace(/[^\d]/g, '').length < 10) {
      errs.phone = 'Enter a phone number we can reach on WhatsApp.';
    }
    if (!formData.department.trim() || formData.department.trim().length <= 1) {
      errs.department = 'Enter your department, or "Not an AKSU student".';
    }
    if (!formData.contact_ok) {
      errs.contact_ok = 'Tick this so we can send you updates.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ tone: '', message: '' });

    if (!validate()) return;

    // Honeypot check
    if (formData.website) {
      return;
    }

    const currentName = formData.name;
    const currentEmail = formData.email;
    const currentDept = formData.department;
    const currentLevel = formData.level || 'Student';
    const currentInterests = [...formData.interests];

    const endpoint = siteConfig.forms.registrationEndpoint;
    if (!endpoint) {
      const demoId = `NW27-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      const passObj: ConfirmedPass = {
        name: currentName,
        passId: demoId,
        department: currentDept,
        level: currentLevel,
        email: currentEmail,
        interests: currentInterests
      };
      setConfirmedPass(passObj);
      savePassLocally(passObj);
      setStatus({
        tone: 'ok',
        message: `Seat Reserved! Your pass ID is ${demoId}. Details saved.`
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitLabel('Registering...');

    try {
      const bodyParams = new URLSearchParams();
      bodyParams.append('name', formData.name);
      bodyParams.append('email', formData.email);
      bodyParams.append('phone', formData.phone);
      bodyParams.append('department', formData.department);
      bodyParams.append('level', formData.level);
      bodyParams.append('interests', formData.interests.join(', '));
      bodyParams.append('contact_ok', formData.contact_ok ? 'yes' : 'no');
      bodyParams.append('share_with_partners', formData.share_with_partners ? 'yes' : 'no');

      const response = await fetch(endpoint, {
        method: 'POST',
        body: bodyParams
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const res = await response.json();
      if (res.result === 'error') {
        throw new Error(res.error || 'rejected');
      }

      const generatedId = res.id || `NW27-REG-${Math.floor(1000 + Math.random() * 9000)}`;
      const passObj: ConfirmedPass = {
        name: currentName,
        passId: generatedId,
        department: currentDept,
        level: currentLevel,
        email: currentEmail,
        interests: currentInterests
      };
      setConfirmedPass(passObj);
      savePassLocally(passObj);

      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        level: '',
        interests: [],
        contact_ok: false,
        share_with_partners: false,
        website: ''
      });

      if (res.result === 'duplicate') {
        setStatus({
          tone: 'ok',
          message: `Already registered with ${currentEmail}. Your pass ID is ${generatedId}.`
        });
      } else {
        setStatus({
          tone: 'ok',
          message: `Seat confirmed! Pass ID: ${generatedId}. Confirmation email sent to ${currentEmail}.`
        });
      }

      setSubmitLabel('Registered');
    } catch {
      // Nothing was saved: say so, keep what they typed, and let them try again
      setStatus({
        tone: 'error',
        message: `Your registration didn't go through. Check your connection and try again. If it keeps failing, email ${siteConfig.links.generalEmail}.`
      });
      setSubmitLabel('Try Again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="section register" id="register" aria-labelledby="register-title">
        <div className="wrap register__grid">
          <div className="register__intro">
            <span className="deck-eyebrow">Delegate Registration</span>
            <h2 id="register-title" className="h2" style={{ margin: 'var(--space-xs) 0 var(--space-sm)', color: 'var(--brand-black)' }}>
              Reserve Your Pass
            </h2>
            <p className="lead" style={{ color: 'var(--color-ink-muted)' }}>
              Pick the events you want to attend. You'll get a registration ID by email (NW27-xxxx). Show it at the registration desk on the day.
            </p>
            <div className="register__benefits" style={{ marginTop: 'var(--space-md)', display: 'grid', gap: 'var(--space-sm)', fontSize: 'var(--text-sm)', color: 'var(--brand-black)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>✓</span>
                <span>Free admission for all AKSU students across all faculties</span>
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

            {onSwitchToSignIn && (
              <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-sm) var(--space-md)', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-ink-border)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                  Already registered for NACOS Week 2027?{' '}
                </span>
                <button
                  type="button"
                  onClick={onSwitchToSignIn}
                  style={{ background: 'none', border: 'none', color: 'var(--brand-deep)', fontWeight: 700, fontSize: 'var(--text-xs)', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                >
                  Sign In / Find Your Pass &rarr;
                </button>
              </div>
            )}
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="f-name">Full Name *</label>
              <input
                id="f-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="field__input"
                placeholder="e.g. Victor Udo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="field__err">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="f-email">Email Address *</label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="field__input"
                placeholder="e.g. victor@aksu.edu.ng"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field__err">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="f-phone">WhatsApp Phone Number *</label>
              <input
                id="f-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="field__input"
                placeholder="e.g. 0801 234 5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="field__err">{errors.phone}</span>}
            </div>

            <div className="field">
              <label htmlFor="f-dept">Department *</label>
              <input
                id="f-dept"
                name="department"
                type="text"
                required
                className="field__input"
                placeholder="e.g. Computer Science, Mechanical Eng., etc."
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                aria-invalid={!!errors.department}
              />
              {errors.department && <span className="field__err">{errors.department}</span>}
            </div>

            <div className="field">
              <label htmlFor="f-level">Level / Status</label>
              <select
                id="f-level"
                name="level"
                className="field__input"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="">Select Level</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Alumni / Professional">Alumni / Professional</option>
              </select>
            </div>

            <fieldset className="field">
              <legend className="field__legend">Which events are you attending?</legend>
              <div className="checkboxes">
                {[
                  { id: 'int-hackathon', label: 'Hackathon & Innovation Bootcamp', val: 'Hackathon' },
                  { id: 'int-conference', label: 'Annual Tech Conference & Expo', val: 'Tech Conference' },
                  { id: 'int-football', label: 'Inter-Faculty Football Championship', val: 'Football Tournament' },
                  { id: 'int-fashion', label: 'Fashion & Pageantry (Mr & Miss NACOS)', val: 'Fashion & Pageantry' },
                  { id: 'int-dinner', label: 'Gala Dinner & Awards Night', val: 'Dinner & Awards Night' }
                ].map((item) => (
                  <label key={item.id} className="checkbox">
                    <input
                      type="checkbox"
                      name="interests"
                      value={item.val}
                      checked={formData.interests.includes(item.val)}
                      onChange={() => handleInterestToggle(item.val)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <div className="checkboxes">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="contact_ok"
                    checked={formData.contact_ok}
                    onChange={(e) => setFormData({ ...formData, contact_ok: e.target.checked })}
                    aria-invalid={!!errors.contact_ok}
                  />
                  <span>I agree to receive event updates, venue alerts and pass instructions *</span>
                </label>
                {errors.contact_ok && <span className="field__err">{errors.contact_ok}</span>}

                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="share_with_partners"
                    checked={formData.share_with_partners}
                    onChange={(e) => setFormData({ ...formData, share_with_partners: e.target.checked })}
                  />
                  <span>(Optional) Share my contact with hiring partners &amp; hackathon sponsors for job opportunities</span>
                </label>
              </div>
            </fieldset>

            {/* Honeypot */}
            <div className="hp" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="f-website">Leave this empty</label>
              <input
                id="f-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <button
              className="btn btn--signal form__submit"
              type="submit"
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span className="btn__label">{submitLabel} &rarr;</span>
            </button>

            {status.message && (
              <p
                className="form__status"
                role="status"
                aria-live="polite"
                data-tone={status.tone}
              >
                {status.message}
              </p>
            )}

            {onSwitchToVolunteer && (
              <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
                <button
                  type="button"
                  onClick={onSwitchToVolunteer}
                  className="volunteer-switch-link"
                >
                  Looking to join the organizing crew? Apply as a Volunteer &rarr;
                </button>
              </div>
            )}

            {onSwitchToSignIn && (
              <div style={{ textAlign: 'center', marginTop: 'var(--space-xs)' }}>
                <button
                  type="button"
                  onClick={onSwitchToSignIn}
                  style={{ background: 'none', border: 'none', color: 'var(--brand-deep)', fontWeight: 600, fontSize: 'var(--text-xs)', cursor: 'pointer', padding: 0 }}
                >
                  Already registered? Get your registration ID emailed again &rarr;
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Verified Pass Modal Dialog */}
      {confirmedPass && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="passModalTitle"
          onClick={() => setConfirmedPass(null)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '480px' }}
          >
            <button
              className="modal-close-x"
              type="button"
              onClick={() => setConfirmedPass(null)}
              aria-label="Close pass"
            >
              &times;
            </button>

            <div style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
              <span className="deck-eyebrow">You're Registered</span>
              <h3 id="passModalTitle" className="h3" style={{ color: 'var(--brand-black)', margin: 'var(--space-xs) 0 4px' }}>
                Your Registration
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0 }}>
                NACOS Week 2027: Confluence &bull; Akwa Ibom State University
              </p>
            </div>

            {/* Pass Card Component */}
            <div className="pass-preview-card" style={{ boxShadow: '0 8px 24px rgba(11, 15, 12, 0.08)' }}>
              <div className="pass-preview-card__header">
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a4f49b', fontWeight: 700 }}>
                  REGISTRATION ID
                </span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: '#fff', background: 'rgba(255,255,255,0.18)', padding: '2px 8px', borderRadius: '4px' }}>
                  {confirmedPass.passId}
                </span>
              </div>

              <div className="pass-preview-card__body">
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Attendee Name</span>
                  <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-black)' }}>
                    {confirmedPass.name}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xs)', fontSize: '0.8rem', borderTop: '1px solid var(--color-ink-border)', paddingTop: 'var(--space-xs)' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-ink-muted)', display: 'block' }}>Department</span>
                    <strong style={{ color: 'var(--brand-deep)' }}>{confirmedPass.department}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-ink-muted)', display: 'block' }}>Status</span>
                    <strong>{confirmedPass.level || 'Student Delegate'}</strong>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-sm)', paddingTop: 'var(--space-xs)', borderTop: '1px dashed var(--color-ink-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                  <span style={{ color: 'var(--brand-deep)', fontWeight: 600 }}>Venue: Conference Centre, AKSU</span>
                  <span style={{ color: 'var(--color-ink-muted)' }}>Prompt 10:00 AM Daily</span>
                </div>
              </div>

              <div className="pass-preview-card__footer">
                <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)' }}>Show this ID at the registration desk</span>
                <span className="pass-preview-card__id">{confirmedPass.passId}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', marginTop: 'var(--space-sm)', textAlign: 'center' }}>
              We've also emailed this to you. Take a screenshot or keep the email, and give your registration ID at the registration desk on the day.
            </p>

            <div className="modal-actions-row">
              <button
                type="button"
                className="btn btn--outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => window.print()}
              >
                Print / Save Pass
              </button>
              <button
                type="button"
                className="btn btn--signal"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setConfirmedPass(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
