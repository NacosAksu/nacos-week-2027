import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://nw27.nacosaksu.com.ng';

interface Meta {
  title: string;
  description: string;
  canonical: string; // aliases (/booths, /login...) point at one main address
  noindex?: boolean;
}

const home: Meta = {
  title: 'NACOS Week 2027: Confluence | NACOS AKSU',
  description:
    'NACOS Week 2027: Confluence at Akwa Ibom State University, February 2027. Five tracks (energy, finance, oil and gas, medicine and technology) and five events: Hackathon, Tech Conference, Football, Fashion & Pageantry and the Dinner & Award Night.',
  canonical: '/'
};

const booth: Meta = {
  title: 'Exhibition Booths | NACOS Week 2027',
  description:
    'Book a Trade Fair booth at NACOS Week 2027 on Conference Day at Akwa Ibom State University. 3m × 3m and 3m × 2m booths, open to any business.',
  canonical: '/booth'
};

const passLookup: Meta = {
  title: 'Find Your Pass | NACOS Week 2027',
  description: 'Already registered for NACOS Week 2027? Find your registration ID and print or save your pass.',
  canonical: '/auth',
  noindex: true
};

const pages: Record<string, Meta> = {
  '/': home,
  '/tracks': {
    title: 'Five Tracks | NACOS Week 2027',
    description:
      'The five NACOS Week 2027 tracks: Energy, Finance, Oil & Gas, Medicine and Technology. Problem statements, skills and who each track suits.',
    canonical: '/tracks'
  },
  '/programme': {
    title: 'Programme | NACOS Week 2027',
    description:
      'The five events of NACOS Week 2027: the Hackathon, Tech Conference Day, the Football Tournament, Fashion & Pageantry and the Dinner & Award Night.',
    canonical: '/programme'
  },
  '/hackathon': {
    title: 'The Confluence Hackathon | NACOS Week 2027',
    description:
      'Student teams build software against briefs set by sector partners. A 4-week bootcamp with mentors, ending in a demo in front of judges on Conference Day.',
    canonical: '/hackathon'
  },
  '/partner': {
    title: 'Partner With Us | NACOS Week 2027',
    description:
      'Sponsorship tiers for NACOS Week 2027 at Akwa Ibom State University: Title, Gold, Silver, Bronze and Friends of Confluence. Download the partnership brochure.',
    canonical: '/partner'
  },
  '/booth': booth,
  '/booths': booth,
  '/exhibit': booth,
  '/register': {
    title: 'Register | NACOS Week 2027',
    description: 'Register for NACOS Week 2027. Admission is free for all AKSU students.',
    canonical: '/register'
  },
  '/volunteer': {
    title: 'Volunteer | NACOS Week 2027',
    description: 'Join a NACOS Week 2027 volunteer committee: media, protocol, welfare and logistics, registration, sponsorship or technical.',
    canonical: '/volunteer'
  },
  '/auth': passLookup,
  '/login': passLookup,
  '/signin': passLookup,
  '/about': {
    title: 'About | NACOS Week 2027',
    description:
      'NACOS Week is the annual week of NACOS AKSU, held for over a decade. In 2027 it is hosted by the Faculty of Computing & Information Technology, Akwa Ibom State University.',
    canonical: '/about'
  },
  '/faq': {
    title: 'Venue & FAQ | NACOS Week 2027',
    description:
      'Getting to the Conference Centre, Perm Site, Ikot Akpaden, Mkpat Enin, and answers to common questions about NACOS Week 2027.',
    canonical: '/faq'
  }
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/* Sets the title, description, canonical link and share tags for the current route.
   Search engines that run JavaScript (Google, Bing) read these; link previews on
   WhatsApp and X read the defaults in index.html. */
export const PageMeta: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const known = pages[path];
    const meta = known || home;
    const url = SITE + meta.canonical;

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    // Unknown addresses show the home page; keep them out of search results
    setMeta('name', 'robots', !known || meta.noindex ? 'noindex, follow' : 'index, follow');

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname]);

  return null;
};
