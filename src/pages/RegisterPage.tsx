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
          <div className="register-portal-badge">
            <span className="nacos-green-dot" />
            <span>NACOS WEEK 2027 &bull; OFFICIAL ACCREDITATION</span>
          </div>
          <h1 className="register-portal-title">
            Confluence 2027 Portal
          </h1>
          <p className="register-portal-subtitle">
            Reserve your delegate badge, authenticate existing credentials, or join the festival organizing crew.
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
            <span className="registration-tab-btn__icon">🎟️</span>
            <span>Reserve Pass</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'signin'}
            className={`registration-tab-btn ${activeTab === 'signin' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('signin')}
          >
            <span className="registration-tab-btn__icon">🔑</span>
            <span>Sign In / Find Pass</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'volunteer'}
            className={`registration-tab-btn ${activeTab === 'volunteer' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('volunteer')}
          >
            <span className="registration-tab-btn__icon">🤝</span>
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
