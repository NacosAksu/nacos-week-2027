import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function useLenisScrollTrigger() {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const pageCtxRef = useRef<gsap.Context | null>(null);

  // 1. Initialize Lenis + GSAP ticker on mount
  useEffect(() => {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) return;

    // Register plugin
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('has-gsap');

    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Expose for debugging or external calls
    // @ts-expect-error global lenis
    window.lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor link click handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetEl = (href === '#top' || href === '#') ? document.body : document.querySelector(href);
      if (targetEl && lenis) {
        e.preventDefault();
        const navEl = (document.querySelector('.site-header') || document.querySelector('[data-nav]')) as HTMLElement | null;
        const offset = href === '#top' ? 0 : (navEl ? -navEl.offsetHeight : -70);
        lenis.scrollTo(targetEl as HTMLElement, { offset, duration: 1.15 });
        if (window.history.pushState) window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Resync triggers on document resize or font load
    const resync = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', () => setTimeout(resync, 80));
    window.addEventListener('pageshow', () => setTimeout(resync, 80));
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resync);
    }

    let resizeObserver: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      let lastH = 0;
      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      resizeObserver = new ResizeObserver(() => {
        const h = document.documentElement.scrollHeight;
        if (Math.abs(h - lastH) < 4) return;
        lastH = h;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 150);
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', resync);
      window.removeEventListener('pageshow', resync);
      resizeObserver?.disconnect();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 2. Setup GSAP Entrance & ScrollTrigger animations on every route navigation
  useEffect(() => {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) return;

    // Scroll to top immediately on new page
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Clean up previous page's GSAP triggers and tweens
    if (pageCtxRef.current) {
      pageCtxRef.current.revert();
      pageCtxRef.current = null;
    }

    // Small delay to allow React to paint DOM elements
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // --- A. Hero entrance animations ---
        const heroTitle = document.querySelector('#hero-title');
        const heroMeta = document.querySelector('.hero__meta');
        const heroBtns = document.querySelectorAll('.hero__actions .btn, .hero__btn-primary, .hero__btn-secondary');
        const heroCountdown = document.querySelector('.hero .countdown');

        if (heroTitle) {
          gsap.fromTo(
            heroTitle,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, delay: 0.1, ease: 'power3.out' }
          );
        }
        if (heroMeta) {
          gsap.fromTo(
            heroMeta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, delay: 0.25, ease: 'power3.out' }
          );
        }
        if (heroBtns.length) {
          gsap.fromTo(
            heroBtns,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.35, ease: 'power3.out' }
          );
        }
        if (heroCountdown) {
          gsap.fromTo(
            heroCountdown,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, delay: 0.45, ease: 'power3.out' }
          );
        }

        const heroBg = document.querySelector('.hero__bg');
        if (heroBg) {
          gsap.fromTo(heroBg, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: 'power2.out' });
          gsap.to(heroBg, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // --- B. Live Numbers Count-Up ---
        const numbersSec = document.querySelector('.numbers');
        const numberItems = document.querySelectorAll('.numbers__grid li');
        if (numbersSec && numberItems.length) {
          let countTweens: gsap.core.Tween[] = [];
          const runCountUp = () => {
            countTweens.forEach((tw) => tw.kill());
            countTweens = [];
            numberItems.forEach((li) => {
              const nSpan = li.querySelector('.numbers__n') as HTMLElement | null;
              if (!nSpan) return;
              const raw = nSpan.getAttribute('data-raw') || nSpan.textContent?.trim() || '';
              nSpan.setAttribute('data-raw', raw);
              const hasPlus = raw.indexOf('+') !== -1;
              const targetVal = parseInt(raw.replace(/[^\d]/g, ''), 10);
              if (!isNaN(targetVal) && targetVal > 0) {
                const obj = { val: 0 };
                const tw = gsap.to(obj, {
                  val: targetVal,
                  duration: 1.6,
                  ease: 'power2.out',
                  onUpdate: () => {
                    const str = Math.floor(obj.val).toLocaleString('en-US');
                    if (hasPlus) {
                      nSpan.innerHTML = str + '<span class="numbers__plus">+</span>';
                    } else {
                      nSpan.textContent = str;
                    }
                  },
                });
                countTweens.push(tw);
              }
            });
          };

          gsap.fromTo(
            numberItems,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: numbersSec,
                start: 'top 85%',
                once: true,
                onEnter: runCountUp,
              },
            }
          );
        }

        // --- C. Section headers & intros ---
        document
          .querySelectorAll(
            '.section__head, .about__grid, .hack__intro, .register__intro, .form, .venue__grid, .closer__inner'
          )
          .forEach((el) => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  once: true,
                },
              }
            );
          });

        // --- D. Sector Track cards ---
        const tracksList = document.querySelector('.tracks__list');
        if (tracksList) {
          gsap.fromTo(
            tracksList.querySelectorAll('.track'),
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tracksList,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // --- E. Programme Pillars ---
        const pillars = document.querySelector('.pillars');
        if (pillars) {
          gsap.fromTo(
            pillars.querySelectorAll('.pillar'),
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pillars,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // --- F. Hackathon timeline steps ---
        const steps = document.querySelector('.steps');
        if (steps) {
          gsap.fromTo(
            steps.querySelectorAll('li'),
            { x: -25, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: steps,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // --- G. Speakers & Mentors cards ---
        const speakers = document.querySelector('.people--speakers');
        if (speakers) {
          gsap.fromTo(
            speakers.querySelectorAll('.person'),
            { scale: 0.94, opacity: 0, y: 25 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: 'back.out(1.15)',
              scrollTrigger: {
                trigger: speakers,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // --- H. Outcomes & Sponsorship Tiers ---
        const outcomes = document.querySelector('.outcomes');
        if (outcomes) {
          gsap.fromTo(
            outcomes.querySelectorAll('li'),
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: outcomes,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        const tiers = document.querySelector('.tiers');
        if (tiers) {
          const tierItems = tiers.querySelectorAll('.tier');
          const tierBars = tiers.querySelectorAll('.tier__bar span');
          const animateBars = () => {
            tierBars.forEach((bar) => {
              const barEl = bar as HTMLElement;
              const targetW = barEl.style.getPropertyValue('--w') || '0%';
              barEl.style.width = '0%';
              gsap.to(barEl, {
                width: targetW,
                duration: 1.1,
                delay: 0.15,
                ease: 'power2.out',
              });
            });
          };

          gsap.fromTo(
            tierItems,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tiers,
                start: 'top 85%',
                once: true,
                onEnter: animateBars,
              },
            }
          );
        }

        // --- I. Sponsor slots & wall ---
        const sponsorWall = document.querySelector('.sponsor-wall__grid');
        if (sponsorWall) {
          gsap.fromTo(
            sponsorWall.querySelectorAll('.sponsor-slot'),
            { scale: 0.94, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sponsorWall,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // --- J. FAQ Accordion Items ---
        const faqList = document.querySelector('.faq__list');
        if (faqList) {
          gsap.fromTo(
            faqList.querySelectorAll('details'),
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: faqList,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }

        // --- K. Booth Section cards ---
        const boothGrid = document.querySelector('.booth-grid');
        if (boothGrid) {
          gsap.fromTo(
            boothGrid.querySelectorAll('.booth-card'),
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: boothGrid,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });

      pageCtxRef.current = ctx;

      // Resync ScrollTrigger coordinates
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 60);

    return () => {
      clearTimeout(timer);
      if (pageCtxRef.current) {
        pageCtxRef.current.revert();
        pageCtxRef.current = null;
      }
    };
  }, [pathname]);
}
