// W3 portfolio interactions
(() => {
  if (location.hash) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      document.querySelector(location.hash)?.scrollIntoView();
      requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
    }));
  }

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const returnLinks = document.querySelectorAll('[data-return-link]');
  if (returnLinks.length) {
    const entryPoint = new URLSearchParams(location.search).get('from');
    const returnDestination = entryPoint === 'section5' ? 'index.html#about' : 'index.html#top';
    returnLinks.forEach((link) => { link.href = returnDestination; });
  }

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header.classList.toggle('scrolled', scrollY > 30);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  const items = document.querySelectorAll('.reveal');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }), { threshold: .08, rootMargin: '0px 0px -30px' });
  items.forEach((item) => observer.observe(item));
})();
