import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const win = window as any;
    if (win.lenis && typeof win.lenis.scrollTo === 'function') {
      win.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};
