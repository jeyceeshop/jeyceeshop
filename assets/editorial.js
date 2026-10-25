// Keep all content visible when motion is reduced or observers are unavailable.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!preference.matches && 'IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.intro, .drop-heading, .drop-visual, .drop-copy, .section-head, .category, .editorial-copy, .story article, .newsletter');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(section => { section.classList.add('reveal'); observer.observe(section); });
    document.documentElement.classList.add('motion-enabled');
    preference.addEventListener('change', () => {
      if (preference.matches) {
        observer.disconnect();
        document.documentElement.classList.remove('motion-enabled');
      }
    });
  }
})();
