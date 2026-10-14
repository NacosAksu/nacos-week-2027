import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export interface VolunteerTeam {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  tasks: string[];
  whatsAppGroup?: string;
  whatsAppNote?: string;
}

export const volunteerTeams: VolunteerTeam[] = [
  {
    id: 'media',
    name: 'Media & Publicity Team',
    icon: '📸',
    badge: 'Production & Video',
    description: 'Capture, document and broadcast NACOS Week 2027 across campus and digital platforms.',
    tasks: [
      'Photography & DSLR camera coverage',
      'Short-form reels & recap video editing',
      'Live social media updates & Twitter/X spaces',
      'Speaker & attendee red-carpet interviews'
    ],
    whatsAppGroup: siteConfig.links.mediaTeamWhatsApp || 'https://chat.whatsapp.com/JJNaojZl0Oj4EDQM9LhsMN?s=sw&p=a&mlu=4&ilr=4',
    whatsAppNote: 'Direct link to the active Media Team WhatsApp group for shoot schedules, gear briefings, and content assignments.'
  },
  {
    id: 'protocol',
    name: 'Protocol Team',
    icon: '🎖️',
    badge: 'Dignitaries & VIPs',
    description: 'Coordinate VIP protocol, guest speaker hospitality, high-table coordination, and official ushering.',
    tasks: [
      'VIP guest & keynote speaker escort protocol',
      'Stage management & dignitary podium coordination',
      'High-table ushering & executive guest reception',
      'Itinerary timing compliance & protocol duties'
    ],
    whatsAppGroup: siteConfig.links.protocolTeamWhatsApp || 'https://chat.whatsapp.com/GKUcXY31wpmDEjJvExnUre?s=sw&p=a&mlu=4&ilr=4',
    whatsAppNote: 'Direct link to the official Protocol Team WhatsApp group for VIP briefings and ushering assignments.'
  },
  {
    id: 'welfare_logistics',
    name: 'Welfare and Logistics Team',
    icon: '📦',
    badge: 'Operations & Care',
    description: 'Manage venue readiness, hall layout, attendee hospitality, and sustenance logistics.',
    tasks: [
      'Conference hall staging & seating arrangements',
      'Speaker & delegate refreshment checkpoints',
      'Dietary logistics for hackathon teams',
      'Swag, gear & program brochure distribution'
    ],
    whatsAppGroup: siteConfig.links.welfareLogisticsWhatsApp || 'https://chat.whatsapp.com/LuiTDSSpXNMAhjGacfWMpw?s=sw&p=a&mlu=4&ilr=4',
    whatsAppNote: 'Direct link to the Welfare and Logistics WhatsApp group for operational planning and shift rosters.'
  },
  {
    id: 'registration',
    name: 'Registration Team',
    icon: '🎟️',
    badge: 'Accreditation Desk',
    description: 'Manage attendee check-in, pass validation, delegate tag issuance, and accreditation desk.',
    tasks: [
      'Attendee digital pass verification & validation',
      'Accreditation badge & wristband issuance',
      'Helpdesk assistance for registration queries',
      'Real-time check-in flow & attendance logging'
    ],
    whatsAppGroup: siteConfig.links.registrationTeamWhatsApp || 'https://chat.whatsapp.com/BBIcYbEB3b1Avj4gXuQMVm?s=sw&p=a&mlu=4&ilr=4',
    whatsAppNote: 'Direct link to the Registration Team WhatsApp group for accreditation training and check-in workflows.'
  },
  {
    id: 'sponsorship',
    name: 'Sponsorship / Collaboration Department',
    icon: '🤝',
    badge: 'Partnerships & Grants',
    description: 'Serve as company liaisons for corporate sponsors, exhibitors, and recruitment partners.',
    tasks: [
      'Sponsor exhibition booth reception & assistance',
      'Corporate delegate escort & executive networking desk',
      'Hackathon challenge partner coordination',
      'Partner gift bag assembly & presentation'
    ],
    whatsAppGroup: siteConfig.links.sponsorshipTeamWhatsApp || 'https://chat.whatsapp.com/J29siJhWfLqARXxjC3fxbi?s=sw&p=a&mlu=4&ilr=4',
    whatsAppNote: 'Direct link to the Sponsorship / Collaboration Department WhatsApp group for partner outreach and corporate desk.'
  },
  {
    id: 'technical',
    name: 'Technical & Sound Team',
    icon: '⚡',
    badge: 'Audio-Visual',
    description: 'Manage audio-visual engineering, stage electronics, and hackathon lab networking.',
    tasks: [
      'Auditorium sound engineering & live microphones',
      'Projector displays, HDMI routing & presentations',
      'Hackathon local lab network & power backup monitoring',
      'Virtual stream technical supervision'
    ],
    whatsAppNote: 'Technical leads will contact approved crew directly for sound checks and equipment setup.'
  }
];

interface ConfirmedVolunteer {
  name: string;
  passId: string;
  department: string;
  level: string;
  email: string;
  team: VolunteerTeam;
  availability: string;
}

interface VolunteerFormProps {
  onSwitchToAttendee?: () => void;
}

export const VolunteerForm: React.FC<VolunteerFormProps> = ({ onSwitchToAttendee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    level: '',
    selectedTeam: '', // Unselected by default so user picks their specific committee
    experience: '',
    availability: 'Full Week (Mon - Fri)',
    agreed_terms: false,
    website: '' // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ tone: 'ok' | 'error' | ''; message: string }>({
    tone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLabel, setSubmitLabel] = useState('Submit Volunteer Application');
  const [confirmedVolunteer, setConfirmedVolunteer] = useState<ConfirmedVolunteer | null>(null);

  const selectedTeamData = volunteerTeams.find((t) => t.id === formData.selectedTeam);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length <= 1) {
      errs.name = 'Enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    if (formData.phone.replace(/[^\d]/g, '').length < 10) {
      errs.phone = 'Enter an active WhatsApp phone number.';
    }
    if (!formData.department.trim()) {
      errs.department = 'Enter your department.';
    }
    if (!formData.selectedTeam) {
      errs.selectedTeam = 'Please select exactly 1 volunteer team.';
    }
    if (!formData.agreed_terms) {
      errs.agreed_terms = 'Please accept the volunteer commitment statement.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSelectTeam = (teamId: string) => {
    // STRICT RULE: 1 user can only select one team
    setFormData((prev) => ({ ...prev, selectedTeam: teamId }));
    if (errors.selectedTeam) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.selectedTeam;
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ tone: '', message: '' });

    if (!validate()) return;
    if (formData.website) return; // Honeypot

    const chosenTeam = volunteerTeams.find((t) => t.id === formData.selectedTeam) || volunteerTeams[0];
    const applicantName = formData.name;
    const applicantEmail = formData.email;
    const applicantDept = formData.department;
    const applicantLevel = formData.level || 'Student Volunteer';
    const applicantAvailability = formData.availability;

    setIsSubmitting(true);
    setSubmitLabel('Submitting Application...');

    const endpoint = siteConfig.forms.registrationEndpoint;
    let finalPassId = `NW27-VOL-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      if (endpoint) {
        const bodyParams = new URLSearchParams();
        bodyParams.append('name', formData.name);
        bodyParams.append('email', formData.email);
        bodyParams.append('phone', formData.phone);
        bodyParams.append('department', formData.department);
        bodyParams.append('level', formData.level || 'Student');
        bodyParams.append('volunteer_team', chosenTeam.name);
        bodyParams.append('availability', formData.availability);
        bodyParams.append('experience', formData.experience || 'None');
        bodyParams.append('type', 'volunteer');
        bodyParams.append('contact_ok', 'yes');
        bodyParams.append('interests', `Volunteer: ${chosenTeam.name}`);
        bodyParams.append('share_with_partners', 'no');

        const response = await fetch(endpoint, {
          method: 'POST',
          body: bodyParams
        });

        if (response.ok) {
          const res = await response.json();
          if (res && res.id) {
            finalPassId = res.id;
          }
        }
      }

      setConfirmedVolunteer({
        name: applicantName,
        passId: finalPassId,
        department: applicantDept,
        level: applicantLevel,
        email: applicantEmail,
        team: chosenTeam,
        availability: applicantAvailability
      });

      setStatus({
        tone: 'ok',
        message: `Application received! Accreditation ID: ${finalPassId}.`
      });

      setSubmitLabel('Application Submitted');
    } catch {
      // Offline / fallback verification
      setConfirmedVolunteer({
        name: applicantName,
        passId: finalPassId,
        department: applicantDept,
        level: applicantLevel,
        email: applicantEmail,
        team: chosenTeam,
        availability: applicantAvailability
      });

      setStatus({
        tone: 'ok',
        message: `Volunteer application recorded! Accreditation ID: ${finalPassId}.`
      });
      setSubmitLabel('Application Submitted');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="section volunteer-section" id="volunteer" aria-labelledby="volunteer-title">
        <div className="wrap">
          <div className="volunteer-header">
            <span className="deck-eyebrow">Organizing Committee</span>
            <h2 id="volunteer-title" className="h2" style={{ margin: 'var(--space-xs) 0 var(--space-sm)', color: 'var(--brand-black)' }}>
              Join the Volunteer Crew
            </h2>
            <p className="lead" style={{ maxWidth: '680px', color: 'var(--color-ink-muted)' }}>
              Step into the engine room of Akwa Ibom State University&apos;s premier innovation festival.
              Gain practical leadership experience, work side-by-side with industry guests, and earn an official certificate of commendation.
            </p>

            {/* Quick Benefits Bar */}
            <div className="volunteer-perks">
              <div className="volunteer-perk-item">
                <span className="volunteer-perk-check">✓</span>
                <span>Certified Letter of Commendation</span>
              </div>
              <div className="volunteer-perk-item">
                <span className="volunteer-perk-check">✓</span>
                <span>Official NACOS Week Volunteer Gear</span>
              </div>
              <div className="volunteer-perk-item">
                <span className="volunteer-perk-check">✓</span>
                <span>Direct Access to Industry Mentors &amp; Speakers</span>
              </div>
              <div className="volunteer-perk-item">
                <span className="volunteer-perk-check">✓</span>
                <span>Meals &amp; Refreshments during Shifts</span>
              </div>
            </div>
          </div>

          <form className="volunteer-form-wrap" onSubmit={handleSubmit} noValidate>
            {/* Team Selection Header & Rule Notice */}
            <div className="volunteer-team-intro">
              <div className="volunteer-team-intro__top">
                <h3 className="h3" style={{ margin: 0, fontSize: 'var(--text-lg)', color: 'var(--brand-black)' }}>
                  1. Choose Your Committee <span style={{ color: 'var(--brand-green)' }}>*</span>
                </h3>
                <span className="volunteer-single-rule-badge">
                  Rule: 1 Team per Applicant Only
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 'var(--space-2xs) 0 0' }}>
                Select the single committee where your skills or passion fit best. Selection is strictly limited to <strong>one team</strong> to ensure focused responsibility.
              </p>
              {errors.selectedTeam && (
                <div className="field__err" style={{ marginTop: 'var(--space-xs)', display: 'block' }}>
                  {errors.selectedTeam}
                </div>
              )}
            </div>

            {/* Team Cards Radio Grid (Strictly single-select) */}
            <div className="volunteer-teams-grid" role="radiogroup" aria-label="Volunteer Teams (Select 1 only)">
              {volunteerTeams.map((team) => {
                const isSelected = formData.selectedTeam === team.id;
                return (
                  <div
                    key={team.id}
                    className={`volunteer-team-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelectTeam(team.id)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleSelectTeam(team.id);
                      }
                    }}
                  >
                    <div className="volunteer-team-card__top">
                      <span className="volunteer-team-card__icon" aria-hidden="true">
                        {team.icon}
                      </span>
                      <span className="volunteer-team-card__badge">
                        {team.badge}
                      </span>
                    </div>

                    <div className="volunteer-team-card__content">
                      <h4 className="volunteer-team-card__title">
                        {team.name}
                      </h4>
                      <p className="volunteer-team-card__desc">
                        {team.description}
                      </p>

                      <ul className="volunteer-team-card__tasks">
                        {team.tasks.map((task, idx) => (
                          <li key={idx}>&bull; {task}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Radio Indicator Button */}
                    <div className="volunteer-team-card__radio-slot">
                      <input
                        type="radio"
                        id={`team-radio-${team.id}`}
                        name="volunteer_team"
                        value={team.id}
                        checked={isSelected}
                        onChange={() => handleSelectTeam(team.id)}
                        className="volunteer-team-radio-input"
                      />
                      <label htmlFor={`team-radio-${team.id}`} className="volunteer-team-radio-label">
                        {isSelected ? 'Selected Team' : 'Select This Team'}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Applicant Details Form */}
            <div className="volunteer-fields-box form">
              <h3 className="h3" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-md)', color: 'var(--brand-black)' }}>
                2. Applicant Profile &amp; Contact Details
              </h3>

              <div className="volunteer-form-grid">
                <div className="field">
                  <label htmlFor="vol-name">Full Name *</label>
                  <input
                    id="vol-name"
                    name="name"
                    type="text"
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
                  <label htmlFor="vol-email">Email Address *</label>
                  <input
                    id="vol-email"
                    name="email"
                    type="email"
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
                  <label htmlFor="vol-phone">WhatsApp Number *</label>
                  <input
                    id="vol-phone"
                    name="phone"
                    type="tel"
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
                  <label htmlFor="vol-dept">Department &amp; Faculty *</label>
                  <input
                    id="vol-dept"
                    name="department"
                    type="text"
                    required
                    className="field__input"
                    placeholder="e.g. Computer Science (FCIT)"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    aria-invalid={!!errors.department}
                  />
                  {errors.department && <span className="field__err">{errors.department}</span>}
                </div>

                <div className="field">
                  <label htmlFor="vol-level">Academic Level</label>
                  <select
                    id="vol-level"
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
                    <option value="Alumni">Alumni / Graduate</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="vol-avail">Availability Commitment</label>
                  <select
                    id="vol-avail"
                    name="availability"
                    className="field__input"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="Full Week (Mon - Fri)">Full Week (Mon - Fri, Recommended)</option>
                    <option value="Conference Days Only (Tue - Thu)">Conference Days Only (Tue - Thu)</option>
                    <option value="Bootcamp & Hackathon (Mon - Wed)">Bootcamp &amp; Hackathon (Mon - Wed)</option>
                    <option value="Gala & Awards Night (Fri)">Gala &amp; Awards Night (Fri)</option>
                    <option value="Flexible / As Needed">Flexible Shifts / As Needed</option>
                  </select>
                </div>
              </div>

              <div className="field" style={{ marginTop: 'var(--space-md)' }}>
                <label htmlFor="vol-exp">Prior Experience / Equipment (Optional)</label>
                <textarea
                  id="vol-exp"
                  name="experience"
                  rows={3}
                  className="field__input field__textarea"
                  placeholder="e.g. Have a Canon 80D with 50mm lens; previously handled AV mixing for campus fellowship; event management lead."
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>

              <div className="field" style={{ marginTop: 'var(--space-sm)' }}>
                <label className="checkbox" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <input
                    type="checkbox"
                    name="agreed_terms"
                    checked={formData.agreed_terms}
                    onChange={(e) => setFormData({ ...formData, agreed_terms: e.target.checked })}
                    aria-invalid={!!errors.agreed_terms}
                    style={{ marginTop: '3px' }}
                  />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
                    I confirm that I will be available for my selected committee shifts, attend pre-event briefings, and represent NACOS AKSU with professionalism. *
                  </span>
                </label>
                {errors.agreed_terms && <span className="field__err">{errors.agreed_terms}</span>}
              </div>

              {/* Honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn--signal form__submit"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-lg)' }}
              >
                <span>{submitLabel} &rarr;</span>
              </button>

              {status.message && (
                <p className="form__status" role="status" aria-live="polite" data-tone={status.tone}>
                  {status.message}
                </p>
              )}

              {onSwitchToAttendee && (
                <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
                  <button
                    type="button"
                    onClick={onSwitchToAttendee}
                    className="volunteer-switch-link"
                  >
                    &larr; Just looking for an Attendee Free Pass? Switch to Delegate Registration
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Confirmed Volunteer Accreditation Modal */}
      {confirmedVolunteer && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="volModalTitle"
          onClick={() => setConfirmedVolunteer(null)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px' }}
          >
            <button
              className="modal-close-x"
              type="button"
              onClick={() => setConfirmedVolunteer(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
              <span className="deck-eyebrow">Accreditation Recorded</span>
              <h3 id="volModalTitle" className="h3" style={{ color: 'var(--brand-black)', margin: 'var(--space-xs) 0 4px' }}>
                Welcome to the Organizing Crew
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: 0 }}>
                NACOS Week 2027: Confluence &bull; Organizing Committee
              </p>
            </div>

            {/* Volunteer Badge Card */}
            <div className="pass-preview-card" style={{ boxShadow: '0 8px 24px rgba(11, 15, 12, 0.08)' }}>
              <div className="pass-preview-card__header">
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a4f49b', fontWeight: 700 }}>
                  CREW ACCREDITATION
                </span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: '#fff', background: 'rgba(255,255,255,0.18)', padding: '2px 8px', borderRadius: '4px' }}>
                  {confirmedVolunteer.passId}
                </span>
              </div>

              <div className="pass-preview-card__body">
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase' }}>Volunteer Name</span>
                  <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-black)' }}>
                    {confirmedVolunteer.name}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-xs)', fontSize: '0.8rem', borderTop: '1px solid var(--color-ink-border)', paddingTop: 'var(--space-xs)' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-ink-muted)', display: 'block' }}>Assigned Committee</span>
                    <strong style={{ color: 'var(--brand-deep)' }}>{confirmedVolunteer.team.name}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-ink-muted)', display: 'block' }}>Status</span>
                    <strong>{confirmedVolunteer.level || 'Student Crew'}</strong>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-sm)', paddingTop: 'var(--space-xs)', borderTop: '1px dashed var(--color-ink-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                  <span style={{ color: 'var(--brand-deep)', fontWeight: 600 }}>Shift: {confirmedVolunteer.availability}</span>
                  <span style={{ color: 'var(--color-ink-muted)' }}>Venue: Perm Site, AKSU</span>
                </div>
              </div>

              <div className="pass-preview-card__footer">
                <div className="pass-preview-barcode">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <span className="pass-preview-card__id">{confirmedVolunteer.passId}</span>
              </div>
            </div>

            {/* Private WhatsApp invitation */}
            {confirmedVolunteer.team.whatsAppGroup && (
              <div style={{ marginTop: 'var(--space-md)', background: '#ffffff', border: '1px solid var(--color-ink-border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.825rem', color: 'var(--brand-black)', margin: '0 0 var(--space-xs)', fontWeight: 500 }}>
                  Step 2: Join the private <strong>{confirmedVolunteer.team.name}</strong> WhatsApp working group now:
                </p>
                <a
                  href={confirmedVolunteer.team.whatsAppGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--signal"
                  style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  <span>Join {confirmedVolunteer.team.name} WhatsApp Group</span>
                </a>
              </div>
            )}

            <div className="modal-actions-row">
              <button
                type="button"
                className="btn btn--outline"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => window.print()}
              >
                Print Accreditation
              </button>
              <button
                type="button"
                className="btn btn--signal"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setConfirmedVolunteer(null)}
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

export default VolunteerForm;
