declare const gsap: any;
declare const ScrollTrigger: any;

export function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.gs-reveal, .gs-reveal-left, .gs-reveal-right, .gs-reveal-scale').forEach(el => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return;
  }

  // Reveal up
  gsap.utils.toArray('.gs-reveal').forEach((el: HTMLElement) => {
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay') || '0');
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, delay,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Reveal from left
  gsap.utils.toArray('.gs-reveal-left').forEach((el: HTMLElement) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Reveal from right
  gsap.utils.toArray('.gs-reveal-right').forEach((el: HTMLElement) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Scale reveal
  gsap.utils.toArray('.gs-reveal-scale').forEach((el: HTMLElement) => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Nav background on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self: any) => {
        nav.style.background = self.scroll() > 80
          ? 'rgba(14, 19, 31, 0.98)'
          : 'rgba(14, 19, 31, 0.95)';
      },
    });
  }
}
