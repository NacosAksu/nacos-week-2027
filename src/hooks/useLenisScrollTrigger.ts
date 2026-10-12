import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function useLenisScrollTrigger() {
  useEffect(() => {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis: Lenis | null = null;
    let ctx: gsap.Context | null = null;

    if (!calm) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        infinite: false,
      });

      // @ts-expect-error global access for debugging
      window.lenis = lenis;

      // Handle anchor links
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const targetEl = (href === '#top' || href === '#') ? document.body : document.querySelector(href);
        if (targetEl && lenis) {
          e.preventDefault();
          const navEl = document.querySelector('[data-nav]') as HTMLElement | null;
          const offset = href === '#top' ? 0 : (navEl ? -navEl.offsetHeight : -68);
          lenis.scrollTo(targetEl as HTMLElement, { offset, duration: 1.2 });
          if (window.history.pushState) window.history.pushState(null, '', href);
        }
      };

      document.addEventListener('click', handleAnchorClick);

      // GSAP ScrollTrigger Integration
      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.classList.add('has-gsap');

      lenis.on('scroll', ScrollTrigger.update);
      const updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Use gsap.context to ensure React StrictMode cleanup never leaves elements at 0 opacity
      ctx = gsap.context(() => {
        // 1. Hero entrance with explicit fromTo so opacity is never stuck at 0
        const heroTitle = document.querySelector('#hero-title');
        const heroMeta = document.querySelector('.hero__meta');
        const heroBtns = document.querySelectorAll('.hero__actions .btn');
        const heroCountdown = document.querySelector('.hero .countdown');

        if (heroTitle) {
          gsap.fromTo(
            heroTitle,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power3.out' }
          );
        }
        if (heroMeta) {
          gsap.fromTo(
            heroMeta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' }
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
          gsap.fromTo(heroBg, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
          gsap.to(heroBg, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // 2. Numbers count-up animation
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
                  duration: 1.8,
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
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: numbersSec,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
                onEnter: runCountUp,
                onEnterBack: runCountUp,
              },
            }
          );
        }

        // 3. Section headers and intro grids
        document
          .querySelectorAll(
            '.section__head, .about__grid, .hack__intro, .register__intro, .form, .venue__grid, .closer__inner'
          )
          .forEach((el) => {
            gsap.fromTo(
              el,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  end: 'bottom top',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          });

        // 4. Sector Track cards
        const tracksList = document.querySelector('.tracks__list');
        if (tracksList) {
          gsap.fromTo(
            tracksList.querySelectorAll('.track'),
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tracksList,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        // 5. Programme Pillars
        const pillars = document.querySelector('.pillars');
        if (pillars) {
          gsap.fromTo(
            pillars.querySelectorAll('.pillar'),
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pillars,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        // 6. Hackathon timeline steps
        const steps = document.querySelector('.steps');
        if (steps) {
          gsap.fromTo(
            steps.querySelectorAll('li'),
            { x: -25, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: steps,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        // 7. Speakers & Mentors
        const speakers = document.querySelector('.people--speakers');
        if (speakers) {
          gsap.fromTo(
            speakers.querySelectorAll('.person'),
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: speakers,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        // 8. Outcomes & Sponsorship Tiers
        const outcomes = document.querySelector('.outcomes');
        if (outcomes) {
          gsap.fromTo(
            outcomes.querySelectorAll('li'),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: outcomes,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
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
                duration: 1.2,
                delay: 0.2,
                ease: 'power2.out',
              });
            });
          };
          const resetBars = () => {
            tierBars.forEach((bar) => {
              (bar as HTMLElement).style.width = '0%';
            });
          };

          gsap.fromTo(
            tierItems,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tiers,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
                onEnter: animateBars,
                onEnterBack: animateBars,
                onLeave: resetBars,
                onLeaveBack: resetBars,
              },
            }
          );
        }

        // 9. Sponsor slots
        const sponsorWall = document.querySelector('.sponsor-wall__grid');
        if (sponsorWall) {
          gsap.fromTo(
            sponsorWall.querySelectorAll('.sponsor-slot'),
            { scale: 0.92, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sponsorWall,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }

        // 10. FAQ accordion items
        const faqList = document.querySelector('.faq__list');
        if (faqList) {
          gsap.fromTo(
            faqList.querySelectorAll('details'),
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: faqList,
                start: 'top 88%',
                end: 'bottom top',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      });

      // Resync when heights adjust
      const resync = () => {
        window.dispatchEvent(new Event('scroll'));
        ScrollTrigger.refresh();
      };
      window.addEventListener('load', () => setTimeout(resync, 60));
      window.addEventListener('pageshow', () => setTimeout(resync, 60));
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(resync);

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
            ScrollTrigger.refresh();
          }, 200);
        });
        resizeObserver.observe(document.body);
      }

      return () => {
        document.removeEventListener('click', handleAnchorClick);
        window.removeEventListener('load', resync);
        window.removeEventListener('pageshow', resync);
        resizeObserver?.disconnect();
        gsap.ticker.remove(updateTicker);
        ctx?.revert();
        lenis?.destroy();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }
  }, []);
}
