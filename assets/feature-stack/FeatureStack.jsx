import { useEffect, useRef } from 'react';

/* Stacked feature cards. Every card sticks at the same spot below the top of the screen (CSS, .fc-stack.stack-on);
   the pile edges come from moving covered cards up, at most 3 edges' worth. Cards share one height, and if a
   card is too tall for the screen its contents are scaled down to fit (measured with the address bar showing,
   so it never resizes mid-scroll on phones). The gap between cards is set so the next card waits below the
   bottom of the screen: the card in the spotlight is the only one in view for a moment, then further scrolling
   brings up the next.
   With motion on (the visitor has not asked for reduced motion):
   - the arriving card is the spotlight at full size; as the next card covers it, it shrinks to the stack size
     (90%) and fades towards the page colour (.fc-wash). A spacer after the last card (.fc-settle) gives a short
     stretch of scroll in which it shrinks to 90% too, so the finished stack is uniform;
   - scrolling up only: the card being uncovered briefly lifts to cover the pile edges above it, then eases
     back once scrolling pauses.
   Everything eases toward its target each frame (wheel steps glide) and only touches transform/opacity.
   With reduced motion the pile edges still show, but nothing shrinks, fades or lifts.
   Each child is a card (.fc-slide) whose last element is its <span className="fc-wash" />.
   Must not sit inside anything with overflow: hidden/auto, or sticky positioning stops working. */
export default function FeatureStack({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const stack = ref.current;
    const spacer = stack.querySelector(':scope > .fc-settle');
    const cards = [...stack.children].filter((c) => c !== spacer);
    const washes = cards.map((c) => c.querySelector(':scope > .fc-wash'));
    const n = cards.length;
    if (!n) return;
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cur = [],
      tgt = [],
      cov = [],
      covTgt = [],
      applied = [];
    let peek = 0,
      stuckTop = 0,
      settle = 1,
      lastIn = 0,
      lastCur = 0,
      looping = false,
      near = false;
    let lastY = window.pageYOffset,
      scrollingUp = false,
      upTimer,
      fitKey = '',
      frameId = 0,
      dead = false;
    cards.forEach((c, i) => {
      cur[i] = tgt[i] = cov[i] = covTgt[i] = applied[i] = 0;
    });

    // Screen height with the browser's address bar showing (stable while scrolling on phones)...
    // ...and with it hidden (the tallest the screen gets), for spacing cards so the next stays out of view.
    function probeOf(unit) {
      const el = document.createElement('div');
      el.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100vh;height:100' + unit + ';visibility:hidden;pointer-events:none';
      document.body.appendChild(el);
      return el;
    }
    const probe = probeOf('svh'),
      probeTall = probeOf('lvh');
    stack.classList.add('stack-on');

    const contents = (c, i) => [...c.children].filter((el) => el !== washes[i]);
    const setZoom = (z) =>
      cards.forEach((c, i) =>
        contents(c, i).forEach((el) => {
          el.style.zoom = z === 1 ? '' : z;
        }),
      );
    const tallest = () => Math.max(...cards.map((c) => c.offsetHeight));

    function fit(force) {
      const vh = probe.offsetHeight || window.innerHeight,
        key = window.innerWidth + 'x' + vh;
      if (!force && key === fitKey) return;
      fitKey = key;
      const cs = getComputedStyle(stack),
        stick = parseFloat(cs.getPropertyValue('--stick'));
      peek = parseFloat(cs.getPropertyValue('--peek'));
      stuckTop = stick + 3 * peek;
      const room = vh - stuckTop - 12;
      let z = 1;
      cards.forEach((c) => {
        c.style.minHeight = '';
      });
      setZoom(1);
      let h = tallest();
      // Too tall for the screen: scale the card contents down until it fits (twice, as padding does not scale).
      for (let k = 0; k < 2 && h > room; k++) {
        z = Math.max(0.6, (z * room) / h);
        setZoom(z);
        h = tallest();
      }
      cards.forEach((c) => {
        c.style.minHeight = h + 'px';
      });
      const gap = Math.max(24, Math.ceil(Math.max(probeTall.offsetHeight, window.innerHeight) - stuckTop - h + 16));
      stack.style.rowGap = gap + 'px';
      settle = spacer.offsetHeight + gap;
      kick();
    }

    // Read once per frame. Positions are measured without our own transforms (applied[]).
    function targets() {
      const rawTop = [];
      let depth = 0,
        spot = -1;
      for (let i = 0; i < n; i++) rawTop[i] = cards[i].getBoundingClientRect().top - applied[i];
      for (let i = n - 1; i >= 0; i--) {
        const h = cards[i].offsetHeight;
        if (i < n - 1) depth += Math.max(0, Math.min(1, (rawTop[i] + h - rawTop[i + 1]) / h));
        tgt[i] = depth;
        // Spotlight: the front-most card that is stuck in place (on scroll-up, the one being uncovered).
        if (spot < 0 && Math.abs(rawTop[i] - stuckTop) < 2) spot = i;
      }
      for (let i = 0; i < n; i++) covTgt[i] = motion && scrollingUp && i === spot && i > 0 ? 1 : 0;
      // Last card: 0 when it has just arrived, 1 at 80% of the spacer, so it is fully in line before the stack leaves.
      const gap = spacer.getBoundingClientRect().bottom - (rawTop[n - 1] + cards[n - 1].offsetHeight);
      lastIn = Math.max(0, Math.min(1, (1 - gap / settle) / 0.8));
    }
    const ease = (v, t) => (!motion || Math.abs(t - v) < 0.002 ? t : v + (t - v) * 0.2);
    function kick() {
      if (!looping && !dead) {
        looping = true;
        frameId = window.requestAnimationFrame(frame);
      }
    }
    function frame() {
      targets();
      let moving = false;
      lastCur = ease(lastCur, lastIn);
      if (lastCur !== lastIn) moving = true;
      for (let i = 0; i < n; i++) {
        cur[i] = ease(cur[i], tgt[i]);
        cov[i] = ease(cov[i], covTgt[i]);
        if (cur[i] !== tgt[i] || cov[i] !== covTgt[i]) moving = true;
        const covered = i === n - 1 ? lastCur : Math.min(cur[i], 1);
        const shrink = motion ? covered * (1 - cov[i]) : 0; // the lifted spotlight stays full width
        const y =
          -Math.min(cur[i], 3) * peek - // pile edge: up to 3 edges above the front card
          cov[i] * Math.min(i, 3) * peek; // spotlight on scroll-up: cover the edges above
        applied[i] = y;
        cards[i].style.transform = 'translateY(' + y.toFixed(2) + 'px) scale(' + (1 - shrink * 0.1).toFixed(4) + ')';
        if (washes[i]) washes[i].style.opacity = (i === n - 1 ? 0 : shrink * 0.55).toFixed(3);
      }
      looping = moving;
      if (moving) frameId = window.requestAnimationFrame(frame);
    }

    const onScroll = () => {
      const y = window.pageYOffset,
        up = y < lastY;
      lastY = y;
      if (!near) return;
      clearTimeout(upTimer);
      scrollingUp = up;
      // Briefly: the spotlight eases back once scrolling up pauses.
      if (up)
        upTimer = setTimeout(() => {
          scrollingUp = false;
          kick();
        }, 450);
      kick();
    };
    const onResize = () => fit();
    const refit = () => {
      if (!dead) fit(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', refit);
    if (document.fonts?.ready) document.fonts.ready.then(refit); // card heights change when the fonts arrive
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (es) => {
          near = es[0].isIntersecting;
          if (near) kick();
        },
        { rootMargin: '200px 0px' },
      );
      io.observe(stack);
    } else {
      near = true;
    }
    fit(true);

    return () => {
      dead = true;
      window.cancelAnimationFrame(frameId);
      clearTimeout(upTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', refit);
      if (io) io.disconnect();
      probe.remove();
      probeTall.remove();
      stack.classList.remove('stack-on');
      setZoom(1);
      stack.style.rowGap = '';
      cards.forEach((c, i) => {
        c.style.minHeight = '';
        c.style.transform = '';
        if (washes[i]) washes[i].style.opacity = '';
      });
    };
  }, []);

  return (
    <div className="fc-stack" ref={ref}>
      {children}
      <div className="fc-settle" aria-hidden="true" />
    </div>
  );
}
