/* EsaiCepat — route-motion.js
   Lapisan gerak A–E: parallax 5 layer + zoom-out akhir, marquee vertikal velocity,
   scramble/decode, tilt 3D pointer/gyro, reveal + rail draw-on.
   Hormat: prefers-reduced-motion, MODE RINGAN otomatis, toggle manual. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const weakHW = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  let lite = reduced || saveData || weakHW;
  if (lite) root.classList.add('ec-lite');

  const toggle = document.getElementById('motion-toggle');
  if (toggle) {
    const paint = () => {
      toggle.setAttribute('aria-pressed', String(!lite));
      toggle.querySelector('span').textContent = lite ? 'Gerak: mati' : 'Gerak: nyala';
    };
    toggle.addEventListener('click', () => {
      lite = !lite;
      root.classList.toggle('ec-lite', lite);
      paint();
    });
    paint();
    toggle.hidden = false;
  }

  const fine = () => !lite;
  const $all = (sel) => [...document.querySelectorAll(sel)];

  /* ---------- C. scramble/decode ---------- */
  const GLYPHS = '█▓▒░<>\\/|=+*#01';
  function scramble(el) {
    const final = el.dataset.scrambleText || el.textContent;
    el.dataset.scrambleText = final;
    if (!fine()) {
      el.textContent = final;
      return;
    }
    const len = final.length;
    let frame = 0;
    const total = Math.max(18, len * 2);
    const tick = () => {
      frame++;
      const p = frame / total;
      let out = '';
      for (let i = 0; i < len; i++) {
        const c = final[i];
        if (c === ' ' || c === '\n') {
          out += c;
          continue;
        }
        out += i / len < p ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame < total) requestAnimationFrame(tick);
      else el.textContent = final;
    };
    tick();
  }

  /* ---------- E. reveal + rail ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        revealIO.unobserve(el);
        if (el.hasAttribute('data-scramble')) scramble(el);
        if (!fine()) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          return;
        }
        el.animate(
          [
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }
        );
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  $all('.ec-reveal').forEach((el) => revealIO.observe(el));

  /* rail progress + draw-on */
  const railProg = document.getElementById('rail-progress');
  const routeRail = document.getElementById('route-rail');
  const stations = $all('[data-station]');
  function paintRail() {
    if (!railProg) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
    railProg.style.height = `${p * 100}%`;
  }

  /* route rail active */
  if (routeRail && stations.length) {
    const linkIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const id = en.target.id;
          routeRail.querySelectorAll('a').forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    stations.forEach((s) => linkIO.observe(s));
  }

  /* ---------- A. parallax 5 layer + zoom-out akhir ---------- */
  const hero = document.getElementById('hero');
  const layers = $all('[data-plx]');
  const petaInner = document.getElementById('peta-inner');

  /* ---------- B. marquee vertikal + velocity skew ---------- */
  const tracks = $all('.vmarquee-track');
  let lastY = scrollY;
  let vel = 0;
  let mOffset = 0;

  /* ---------- D. tilt ---------- */
  const tilts = $all('.tilt');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine() && canHover) {
    tilts.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) translateZ(0)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }
  if (fine() && !canHover && typeof DeviceOrientationEvent !== 'undefined') {
    window.addEventListener(
      'deviceorientation',
      (e) => {
        if (e.beta == null || e.gamma == null) return;
        const rx = Math.max(-8, Math.min(8, (e.beta - 45) * 0.25));
        const ry = Math.max(-10, Math.min(10, e.gamma * 0.3));
        tilts.forEach((card) => {
          const r = card.getBoundingClientRect();
          if (r.top < innerHeight && r.bottom > 0) {
            card.style.transform = `perspective(800px) rotateX(${(-rx).toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
          }
        });
      },
      { passive: true }
    );
  }

  /* ---------- loop utama ---------- */
  let ticking = false;
  function frame() {
    ticking = false;
    const y = scrollY;
    vel = vel * 0.9 + (y - lastY) * 0.1;
    lastY = y;

    if (fine() && hero) {
      const hr = hero.getBoundingClientRect();
      if (hr.bottom > 0 && hr.top < innerHeight) {
        const prog = Math.min(Math.max(-hr.top / Math.max(hr.height, 1), 0), 1);
        layers.forEach((l) => {
          const depth = parseFloat(l.dataset.plx || '0.1');
          if (root.classList.contains('ec-lite') && depth > 0.25) return;
          l.style.transform = `translate3d(0, ${(prog * depth * 320).toFixed(1)}px, 0)`;
        });
      }
    }
    if (petaInner) {
      const r = petaInner.getBoundingClientRect();
      const p = Math.min(Math.max(1 - r.top / innerHeight, 0), 1);
      if (fine()) {
        const s = (1.18 - p * 0.18).toFixed(3);
        petaInner.style.transform = `scale(${s})`;
      } else {
        petaInner.style.transform = 'none';
      }
    }
    if (tracks.length && fine()) {
      mOffset += 0.6 + Math.min(Math.abs(vel) * 0.12, 6);
      const dir = vel >= 0 ? 1 : -1;
      tracks.forEach((t, i) => {
        const half = t.scrollHeight / 2 || 640;
        const off = (i % 2 ? -(mOffset % half) : mOffset % half) * dir;
        const skew = Math.max(-14, Math.min(14, vel * 0.35));
        t.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0) skewY(${skew.toFixed(1)}deg)`;
      });
    }
    paintRail();
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();

  /* ---------- auto MODE RINGAN: FPS jatuh ---------- */
  if (!lite) {
    let frames = 0;
    const t0 = performance.now();
    const probe = () => {
      frames++;
      if (performance.now() - t0 >= 2000) {
        const fps = (frames / (performance.now() - t0)) * 1000;
        if (fps < 40) {
          lite = true;
          root.classList.add('ec-lite');
          if (toggle) {
            toggle.setAttribute('aria-pressed', 'false');
            toggle.querySelector('span').textContent = 'Gerak: mati';
          }
        }
        return;
      }
      requestAnimationFrame(probe);
    };
    requestAnimationFrame(probe);
  }

  /* pause saat tab tersembunyi */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) vel = 0;
  });
})();
