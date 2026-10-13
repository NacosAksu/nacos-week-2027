import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenisScrollTrigger } from './hooks/useLenisScrollTrigger';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { TracksPage } from './pages/TracksPage';
import { ProgrammePage } from './pages/ProgrammePage';
import { HackathonPage } from './pages/HackathonPage';
import { PartnerPage } from './pages/PartnerPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { VenueFaqPage } from './pages/VenueFaqPage';

const AppContent: React.FC = () => {
  useLenisScrollTrigger();

  return (
    <>
      <ScrollToTop />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/programme" element={<ProgrammePage />} />
          <Route path="/hackathon" element={<HackathonPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/register" element={<RegisterPage defaultTab="attendee" />} />
          <Route path="/auth" element={<RegisterPage defaultTab="signin" />} />
          <Route path="/login" element={<RegisterPage defaultTab="signin" />} />
          <Route path="/signin" element={<RegisterPage defaultTab="signin" />} />
          <Route path="/volunteer" element={<RegisterPage defaultTab="volunteer" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<VenueFaqPage />} />
          {/* Fallback to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
