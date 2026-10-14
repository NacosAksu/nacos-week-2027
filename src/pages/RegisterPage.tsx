import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { PassLookupForm } from '../components/PassLookupForm';
import { VolunteerForm } from '../components/VolunteerForm';
import { FAQ } from '../components/FAQ';

interface RegisterPageProps {
  defaultTab?: 'attendee' | 'signin' | 'volunteer';
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ defaultTab = 'attendee' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const tabParam = searchParams.get('tab');
  const getInitialTab = (): 'attendee' | 'signin' | 'volunteer' => {
    if (tabParam === 'volunteer' || location.hash === '#volunteer') return 'volunteer';
    if (tabParam === 'signin' || tabParam === 'login' || tabParam === 'auth' || location.pathname.includes('/auth') || location.pathname.includes('/login')) return 'signin';
    if (tabParam === 'attendee' || tabParam === 'delegate' || tabParam === 'register') return 'attendee';
    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState<'attendee' | 'signin' | 'volunteer'>(getInitialTab);

  useEffect(() => {
    if (tabParam === 'volunteer' || location.hash === '#volunteer') {
      setActiveTab('volunteer');
    } else if (tabParam === 'signin' || tabParam === 'login' || tabParam === 'auth' || location.pathname.includes('/auth') || location.pathname.includes('/login')) {
      setActiveTab('signin');
    } else if (tabParam === 'attendee' || tabParam === 'delegate') {
      setActiveTab('attendee');
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [tabParam, location.hash, location.pathname, defaultTab]);

  const handleTabChange = (tab: 'attendee' | 'signin' | 'volunteer') => {
    setActiveTab(tab);
    if (tab === 'volunteer') {
      setSearchParams({ tab: 'volunteer' });
    } else if (tab === 'signin') {
      setSearchParams({ tab: 'signin' });
    } else {
      setSearchParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="register-portal-page">
      {/* Portal Hero Banner */}
      <div className="wrap">
        <div className="register-portal-header">
          <span className="deck-eyebrow">08 / Accreditation &amp; Access Portal</span>
          <h1 className="register-portal-title">
            Confluence 2027 Registration
          </h1>
          <p className="register-portal-subtitle">
            Reserve your delegate pass, look up existing credentials, or join the festival organizing crew. All events are hosted at Akwa Ibom State University.
          </p>
        </div>
      </div>

      {/* Segmented Registration Portal Switcher */}
      <div className="registration-tabs-container wrap">
        <div className="registration-tabs-nav" role="tablist" aria-label="Registration Portal Mode">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'attendee'}
            className={`registration-tab-btn ${activeTab === 'attendee' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('attendee')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
              <path d="M13 5v2"></path>
              <path d="M13 17v2"></path>
              <path d="M13 11v2"></path>
            </svg>
            <span>Reserve Pass</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'signin'}
            className={`registration-tab-btn ${activeTab === 'signin' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('signin')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Sign In / Find Pass</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'volunteer'}
            className={`registration-tab-btn ${activeTab === 'volunteer' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('volunteer')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Volunteer Crew</span>
            <span className="registration-tab-badge">1 Team</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'attendee' && (
        <RegisterForm
          onSwitchToVolunteer={() => handleTabChange('volunteer')}
          onSwitchToSignIn={() => handleTabChange('signin')}
        />
      )}

      {activeTab === 'signin' && (
        <PassLookupForm
          onSwitchToRegister={() => handleTabChange('attendee')}
          onSwitchToVolunteer={() => handleTabChange('volunteer')}
        />
      )}

      {activeTab === 'volunteer' && (
        <VolunteerForm onSwitchToAttendee={() => handleTabChange('attendee')} />
      )}

      {/* Common FAQ */}
      <FAQ />
    </div>
  );
};

export default RegisterPage;
