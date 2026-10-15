import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export interface BoothTier {
  id: string;
  name: string;
  badge: string;
  isPopular?: boolean;
  price: string;
  priceNote: string;
  idealFor: string;
  spaceSize: string;
  slots?: number;
  features: string[];
}

// Booth sizes and prices from the pitch deck (page 11). Anyone can book a booth on its own;
// sponsors also get one with their package (see sponsorBoothNote). Add slots once the floor plan is fixed.
export const boothTiers: BoothTier[] = [
  {
    id: 'booth-3x3',
    name: 'Large Booth',
    badge: 'Trade Fair',
    isPopular: true,
    price: '₦250,000',
    priceNote: 'Booth only, without a sponsorship package',
    idealFor: 'Brands that want room to sell, demonstrate products and sign up students.',
    spaceSize: '3m × 3m',
    features: [
      'A 3m × 3m booth at the Trade Fair on Conference Day',
      'Sell products, advertise and sign up students at your booth'
    ]
  },
  {
    id: 'booth-3x2',
    name: 'Standard Booth',
    badge: 'Trade Fair',
    price: '₦150,000',
    priceNote: 'Booth only, without a sponsorship package',
    idealFor: 'Smaller teams and local businesses that want a presence on the day.',
    spaceSize: '3m × 2m',
    features: [
      'A 3m × 2m booth at the Trade Fair on Conference Day',
      'Sell products, advertise and sign up students at your booth'
    ]
  }
];

// What each sponsorship package already includes at the Trade Fair (pitch deck page 11)
export const sponsorBoothNote =
  'Sponsors get a Trade Fair space with their package: Title Partner 3m × 3m, Gold 3m × 2m, Silver 2m × 2m, Bronze a shared booth, and Friends of Confluence a shared table.';

interface BoothBookingForm {
  brandName: string;
  contactPerson: string;
  email: string;
  phone: string;
  selectedTier: string;
  description: string;
  specialNeeds: string;
}

export const BoothSection: React.FC = () => {
  const [selectedTierForModal, setSelectedTierForModal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BoothBookingForm>({
    brandName: '',
    contactPerson: '',
    email: '',
    phone: '',
    selectedTier: 'booth-3x3',
    description: '',
    specialNeeds: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState('');

  // Vendors talk to the official inbox, never to the internal committee WhatsApp groups
  const sponsorEmail = siteConfig.links.sponsorEmail || siteConfig.links.generalEmail;
  const sponsorMailHref = `mailto:${sponsorEmail}?subject=${encodeURIComponent('Exhibition booth: NACOS Week 2027')}`;

  const handleOpenBooking = (tierId: string) => {
    setSelectedTierForModal(tierId);
    setFormData((prev) => ({ ...prev, selectedTier: tierId }));
    setSubmittedRef(null);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmittedRef(null);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.brandName.trim()) errs.brandName = 'Enter your brand or company name.';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Enter contact person name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    if (formData.phone.replace(/[^\d]/g, '').length < 10) {
      errs.phone = 'Enter an active WhatsApp phone number.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = siteConfig.forms.registrationEndpoint;
    if (!endpoint) {
      setSendError(`Booth requests are not open online yet. Email ${sponsorEmail} instead.`);
      return;
    }

    setIsSubmitting(true);
    setSendError('');
    const chosen = boothTiers.find((t) => t.id === formData.selectedTier) || boothTiers[0];

    // Saved to the "Booth Requests" tab of the registrations sheet (backend/registration.gs)
    try {
      const bodyParams = new URLSearchParams({
        type: 'booth',
        brand: formData.brandName,
        contact: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        booth: chosen.name,
        showcase: formData.description,
        needs: formData.specialNeeds
      });
      const response = await fetch(endpoint, { method: 'POST', body: bodyParams });
      const res = await response.json();
      if (res.result !== 'success') throw new Error(res.error || 'rejected');
      setSubmittedRef(chosen.name);
    } catch {
      setSendError(`That didn't go through. Please try again, or email ${sponsorEmail}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section booth-section" id="booths" aria-labelledby="booth-title" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-2xl)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(8, 144, 2, 0.12)',
              border: '1px solid rgba(8, 144, 2, 0.4)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 16px',
              color: '#089002',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-sm)'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🎪</span>
            Tech Exhibition &amp; Vendor Showcase · NACOS Week 2027
          </div>

          <h2 id="booth-title" className="h2" style={{ margin: '0 0 var(--space-xs)', color: 'var(--color-ink)' }}>
            Exhibition Booths &amp; Showcase Spaces
          </h2>

          <p className="lead" style={{ margin: '0 auto', color: 'var(--color-ink-muted)' }}>
            The Trade Fair runs on Conference Day outside the Conference Centre. Sell, advertise and connect
            with students from a campus of <strong>30,000+</strong> at Akwa Ibom State University.
          </p>
        </div>

        {/* Value Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-md)',
            background: 'linear-gradient(135deg, rgba(8, 144, 2, 0.05) 0%, rgba(0, 80, 18, 0.08) 100%)',
            border: '1px solid rgba(8, 144, 2, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-deep)' }}>
              30,000+
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
              Students on campus
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-deep)' }}>
              500+
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
              Recurring attendance
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-deep)' }}>
              500
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
              Main hall seats
            </div>
          </div>
        </div>

        {/* Official Pitch Deck Showcase Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f4f8f4 100%)',
            border: '1.5px solid rgba(8, 144, 2, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: 'var(--space-2xl)',
            boxShadow: '0 8px 30px rgba(8, 144, 2, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-lg)',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(8, 144, 2, 0.12)',
                color: 'var(--brand-deep)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                marginBottom: 'var(--space-xs)'
              }}
            >
              <span>📄</span> Official Documentation
            </div>
            <h3 className="h3" style={{ margin: '0 0 var(--space-xs)', color: 'var(--brand-black)', fontSize: 'clamp(1.25rem, 2vw, 1.65rem)' }}>
              NACOS AKSU Pitch Deck Presentation
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: '0 0 var(--space-md)', lineHeight: 1.55 }}>
              The event lineup, partnership tiers and benefits, in-kind partnerships and Trade Fair booth sizes, all in the official pitch deck.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-md)' }}>
              <span style={{ background: '#ffffff', border: '1px solid #d1d5db', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                ✓ 5 Partnership Tiers
              </span>
              <span style={{ background: '#ffffff', border: '1px solid #d1d5db', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                ✓ 5 Sector Tracks
              </span>
              <span style={{ background: '#ffffff', border: '1px solid #d1d5db', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                ✓ Category Exclusivity
              </span>
              <span style={{ background: '#ffffff', border: '1px solid #d1d5db', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                ✓ Booth Sizes &amp; Prices
              </span>
            </div>
          </div>

          <div
            style={{
              background: '#0B0F0C',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                <span style={{ fontSize: '0.7rem', color: '#a4f49b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  PDF PROSPECTUS
                </span>
                <span style={{ fontSize: '0.65rem', background: 'rgba(255, 255, 255, 0.15)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                  30 MB
                </span>
              </div>
              <strong style={{ display: 'block', fontSize: 'var(--text-base)', color: '#ffffff', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                NACOS AKSU Pitch Deck Presentation.pdf
              </strong>
              <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(255, 255, 255, 0.7)', display: 'block' }}>
                Prepared by the NACOS AKSU Chapter
              </span>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
              <a
                href="/assets/docs/nacos-aksu-pitch-deck-2027.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--signal"
                style={{ flex: 1, minWidth: '140px', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: 'var(--text-sm)' }}
              >
                <span>View Deck Online &rarr;</span>
              </a>
              <a
                href="/assets/docs/nacos-aksu-pitch-deck-2027.pdf"
                download="NACOS-AKSU-Pitch-Deck-2027.pdf"
                className="btn btn--outline"
                style={{ flex: 1, minWidth: '140px', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: 'var(--text-sm)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                <span>Download PDF 📥</span>
              </a>
            </div>
          </div>
        </div>

        {/* Booth Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {boothTiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                background: tier.isPopular ? '#ffffff' : '#fcfdfc',
                border: tier.isPopular ? '2px solid var(--brand-green)' : '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: tier.isPopular ? '0 16px 36px rgba(8, 144, 2, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {tier.isPopular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--brand-green)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '3px 14px',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 4px 10px rgba(8, 144, 2, 0.3)'
                  }}
                >
                  Largest Booth
                </div>
              )}

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--brand-deep)',
                      background: 'rgba(8, 144, 2, 0.08)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {tier.badge}
                  </span>
                  {tier.slots ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', fontWeight: 600 }}>
                      {tier.slots} slots available
                    </span>
                  ) : null}
                </div>

                <h3 className="h3" style={{ fontSize: '1.4rem', color: 'var(--color-ink)', margin: 'var(--space-xs) 0' }}>
                  {tier.name}
                </h3>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', minHeight: '44px', margin: '0 0 var(--space-md)' }}>
                  {tier.idealFor}
                </p>

                <div style={{ margin: 'var(--space-md) 0', padding: 'var(--space-sm) 0', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '2.1rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--brand-black)' }}>
                      {tier.price}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                    {tier.priceNote}
                  </span>
                </div>

                <div style={{ margin: 'var(--space-md) 0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--space-xs)' }}>
                    Space Allocation:
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-deep)', background: 'rgba(8, 144, 2, 0.06)', padding: '6px 10px', borderRadius: '4px' }}>
                    📐 {tier.spaceSize}
                  </div>
                </div>

                <div style={{ margin: 'var(--space-md) 0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-ink)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--space-xs)' }}>
                    What You Get:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-ink)',
                          marginBottom: '8px'
                        }}
                      >
                        <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-lg)' }}>
                <button
                  type="button"
                  onClick={() => handleOpenBooking(tier.id)}
                  className={`btn ${tier.isPopular ? 'btn--signal' : 'btn--outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Reserve This Space &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booths that come with a sponsorship package (pitch deck page 11) */}
        <p
          style={{
            margin: '0 0 var(--space-2xl)',
            padding: 'var(--space-md) var(--space-lg)',
            background: 'var(--brand-pale)',
            borderLeft: '3px solid var(--brand-green)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-ink)'
          }}
        >
          {sponsorBoothNote}
        </p>

        {/* Quick Contact & Custom Inquiries */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-md)',
            background: 'rgba(8, 144, 2, 0.04)',
            border: '1px solid rgba(8, 144, 2, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)'
          }}
        >
          <div>
            <h4 className="h4" style={{ margin: '0 0 4px', color: 'var(--color-ink)' }}>
              Need a Custom Booth Size or In-Kind Partnership?
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', margin: 0 }}>
              Speak directly with our Sponsorship &amp; Collaboration department to arrange specialized installations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <a
              href={sponsorMailHref}
              className="btn btn--signal"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Email the Sponsorship Team &rarr;</span>
            </a>
            {siteConfig.links.phone && (
              <a href={`tel:${siteConfig.links.phone.replace(/[^\d+]/g, '')}`} className="btn btn--outline">
                Call {siteConfig.links.phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Booth Booking / Inquiry Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="boothModalTitle"
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px' }}
          >
            <button
              className="modal-close-x"
              type="button"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            {!submittedRef ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--brand-deep)',
                      fontWeight: 700,
                      background: 'rgba(8, 144, 2, 0.1)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    Exhibition Space Reservation
                  </span>
                  <h3 id="boothModalTitle" className="h3" style={{ margin: 'var(--space-2xs) 0 4px', color: '#ffffff' }}>
                    Reserve Your Exhibition Booth
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-on-night-muted)', margin: 0 }}>
                    NACOS Week 2027: Confluence · Conference Centre, Perm Site
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-sm)' }}>
                    <div className="field">
                      <label htmlFor="bth-brand">Company / Brand / Project *</label>
                      <input
                        id="bth-brand"
                        type="text"
                        required
                        className="field__input"
                        placeholder="e.g. Acme Tech Solutions"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      />
                      {formErrors.brandName && <span className="field__err">{formErrors.brandName}</span>}
                    </div>

                    <div className="field">
                      <label htmlFor="bth-contact">Contact Person Name *</label>
                      <input
                        id="bth-contact"
                        type="text"
                        required
                        className="field__input"
                        placeholder="e.g. Victor Bassey"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      />
                      {formErrors.contactPerson && <span className="field__err">{formErrors.contactPerson}</span>}
                    </div>

                    <div className="field">
                      <label htmlFor="bth-email">Email Address *</label>
                      <input
                        id="bth-email"
                        type="email"
                        required
                        className="field__input"
                        placeholder="e.g. contact@acme.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {formErrors.email && <span className="field__err">{formErrors.email}</span>}
                    </div>

                    <div className="field">
                      <label htmlFor="bth-phone">WhatsApp Number *</label>
                      <input
                        id="bth-phone"
                        type="tel"
                        required
                        className="field__input"
                        placeholder="e.g. 0801 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {formErrors.phone && <span className="field__err">{formErrors.phone}</span>}
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 'var(--space-sm)' }}>
                    <label htmlFor="bth-tier">Select Booth Package *</label>
                    <select
                      id="bth-tier"
                      className="field__input"
                      value={formData.selectedTier}
                      onChange={(e) => setFormData({ ...formData, selectedTier: e.target.value })}
                    >
                      {boothTiers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} - {t.price} ({t.spaceSize})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field" style={{ marginTop: 'var(--space-sm)' }}>
                    <label htmlFor="bth-desc">What will you exhibit or retail? (Brief description)</label>
                    <textarea
                      id="bth-desc"
                      rows={2}
                      className="field__input field__textarea"
                      placeholder="e.g. Showcasing our EdTech mobile app, conducting live registrations, and selling student branded swag."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="field" style={{ marginTop: 'var(--space-sm)' }}>
                    <label htmlFor="bth-needs">Special Requirements (Optional)</label>
                    <input
                      id="bth-needs"
                      type="text"
                      className="field__input"
                      placeholder="e.g. TV display stand needed; high-power socket for 3D printer."
                      value={formData.specialNeeds}
                      onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
                    />
                  </div>

                  {sendError && (
                    <p role="alert" style={{ marginTop: 'var(--space-md)', fontSize: 'var(--text-sm)', color: '#fca5a5' }}>
                      {sendError}
                    </p>
                  )}

                  <div style={{ marginTop: 'var(--space-lg)' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--signal"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>{isSubmitting ? 'Sending request...' : 'Send Booth Request →'}</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-md) 0' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(8, 144, 2, 0.15)',
                    border: '1px solid var(--brand-green)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    color: '#a4f49b',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-sm)'
                  }}
                >
                  <span className="nacos-green-dot"></span>
                  BOOTH REQUEST RECEIVED
                </div>

                <h3 className="h3" style={{ color: '#ffffff', margin: '0 0 var(--space-xs)' }}>
                  Thank You, {formData.brandName}!
                </h3>

                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255, 255, 255, 0.78)', margin: '0 0 var(--space-md)' }}>
                  The sponsorship team has your request and will contact you at {formData.email} to confirm the space.
                </p>

                {/* Booth Summary Badge Card */}
                <div
                  style={{
                    background: 'linear-gradient(145deg, #072a0f 0%, #031507 100%)',
                    border: '1px solid rgba(120, 185, 120, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-md)',
                    textAlign: 'left',
                    marginBottom: 'var(--space-lg)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#a4f49b', textTransform: 'uppercase', fontWeight: 700 }}>
                    Selected Space
                  </div>
                  <div style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800 }}>
                    {boothTiers.find((t) => t.id === formData.selectedTier)?.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '4px' }}>
                    Contact: {formData.contactPerson} ({formData.phone})
                  </div>
                </div>

                <div style={{ background: 'rgba(8, 144, 2, 0.12)', border: '1px solid rgba(8, 144, 2, 0.35)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                  <p style={{ fontSize: '0.825rem', color: '#e6f2e3', margin: '0 0 var(--space-xs)', fontWeight: 500 }}>
                    Questions before then? Write to the sponsorship team:
                  </p>
                  <a
                    href={sponsorMailHref}
                    className="btn btn--signal"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Email {sponsorEmail} &rarr;</span>
                  </a>
                </div>

                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleCloseModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BoothSection;
