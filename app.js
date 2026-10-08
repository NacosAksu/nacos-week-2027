/**
 * NACOS Week 2027 (NACOS Week ’27) — Editorial Festival JavaScript
 * Theme: Confluence
 * Organizer: NACOS AKSU
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileNav(forceClose = false) {
    if (!mobileNavDrawer || !hamburgerBtn) return;
    const shouldOpen = forceClose ? false : !mobileNavDrawer.classList.contains('open');
    mobileNavDrawer.classList.toggle('open', shouldOpen);
    hamburgerBtn.setAttribute('aria-expanded', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileNav());
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
      toggleMobileNav(true);
    }
  });

  // --------------------------------------------------------------------------
  // 2. Countdown Timer (February 1, 2027, 10:00 AM WAT, UTC+1)
  // --------------------------------------------------------------------------
  const eventTargetDate = new Date('2027-02-01T10:00:00+01:00').getTime();

  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minutesEl = document.getElementById('countdownMinutes');
  const secondsEl = document.getElementById('countdownSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventTargetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --------------------------------------------------------------------------
  // 3. Schedule Tabs (Underlined Day Tabs)
  // --------------------------------------------------------------------------
  const scheduleTabs = document.querySelectorAll('.schedule-tab-link');
  const schedulePanes = document.querySelectorAll('.schedule-pane');

  scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.getAttribute('data-day');

      scheduleTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      schedulePanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetPane = document.getElementById(`schedule-pane-${day}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. FAQ Accordion (+ / − Indicator State)
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-row-item');
  faqItems.forEach(item => {
    const indicator = item.querySelector('.faq-indicator');
    item.addEventListener('toggle', () => {
      if (indicator) {
        indicator.textContent = item.open ? '−' : '+';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Registration Form & Flat Confirmation Dialog
  // --------------------------------------------------------------------------
  const regForm = document.getElementById('registrationForm');
  const regModal = document.getElementById('registrationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const attendeeNameEl = document.getElementById('ticketAttendeeName');
  const attendeeRoleEl = document.getElementById('ticketAttendeeRole');
  const attendeeCodeEl = document.getElementById('ticketAttendeeCode');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('regFullName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const status = document.getElementById('regStatus').value;
      const interest = document.getElementById('regInterest').value;

      if (!fullName || !email || !phone || !status || !interest) {
        showToast('Please fill out all required fields.');
        return;
      }

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const code = `NW27-REG-${randomNum}`;

      if (attendeeNameEl) attendeeNameEl.textContent = fullName;
      if (attendeeRoleEl) attendeeRoleEl.textContent = `${status} (${interest})`;
      if (attendeeCodeEl) attendeeCodeEl.textContent = code;

      if (regModal) {
        regModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      regForm.reset();
    });
  }

  function closeRegModal() {
    if (regModal) {
      regModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeRegModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeRegModal);
  if (regModal) {
    regModal.addEventListener('click', (e) => {
      if (e.target === regModal) closeRegModal();
    });
  }

  // --------------------------------------------------------------------------
  // 6. Partnership / Sponsor Inquiry Modal
  // --------------------------------------------------------------------------
  const sponsorModal = document.getElementById('sponsorModal');
  const partnerCtaLink = document.getElementById('partnerCtaLink');
  const sponsorModalClose = document.getElementById('sponsorModalClose');
  const sponsorForm = document.getElementById('sponsorForm');

  if (partnerCtaLink) {
    partnerCtaLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (sponsorModal) {
        sponsorModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeSponsorModal() {
    if (sponsorModal) {
      sponsorModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (sponsorModalClose) sponsorModalClose.addEventListener('click', closeSponsorModal);
  if (sponsorModal) {
    sponsorModal.addEventListener('click', (e) => {
      if (e.target === sponsorModal) closeSponsorModal();
    });
  }

  if (sponsorForm) {
    sponsorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Sponsorship inquiry received. The secretariat will be in touch.');
      closeSponsorModal();
      sponsorForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 7. Venue Copy Address
  // --------------------------------------------------------------------------
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = 'Conference Hall, Akwa Ibom State University, Main Campus, Ikot Akpaden, Mkpat Enin LGA, Akwa Ibom State';
      navigator.clipboard.writeText(address).then(() => {
        showToast('Address copied to clipboard.');
      }).catch(() => {
        showToast('Venue: Conference Hall, AKSU Main Campus');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. Flat Toast Alert
  // --------------------------------------------------------------------------
  const flatToast = document.getElementById('flatToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(msg) {
    if (!flatToast || !toastMessage) return;
    toastMessage.textContent = msg;
    flatToast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      flatToast.classList.remove('show');
    }, 3800);
  }

  window.showToast = showToast;
});
