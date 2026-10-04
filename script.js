(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.13, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('in-view'));

  // Scene hooks keep each visual layer replaceable without coupling it to content.
  const scenes = document.querySelectorAll('[data-scene]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const sceneObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('scene-active', entry.isIntersecting);
    }), { threshold: 0.08 });
    scenes.forEach(scene => sceneObserver.observe(scene));
  }

  // Gentle pointer parallax on the cinematic hero only.
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  if (hero && video && !reduceMotion && matchMedia('(pointer:fine)').matches) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        video.style.transform = `scale(1.035) translate(${x * -7}px, ${y * -5}px)`;
      });
    });
    hero.addEventListener('pointerleave', () => { video.style.transform = 'scale(1.015)'; });
  }

  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    // Browser autoplay policies can defer playback until metadata is ready.
    const play = () => { const result = heroVideo.play(); if (result?.catch) result.catch(() => {}); };
    heroVideo.addEventListener('canplay', play, { once: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && heroVideo.paused) play(); });
  }
})();
