// assets/js/hero.js
// Scroll-controlled video animation + hero content reveal

export function initHero() {
  const heroWrapper = document.querySelector('.hero-wrapper');
  const heroContent = document.querySelector('.hero-content');
  const video = document.querySelector('.hero-video');

  // Reveal hero text on load
  setTimeout(() => {
    heroContent?.classList.add('visible');
  }, 300);

  if (!video || !heroWrapper) return;

  // Preload video
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.pause();

  function onScroll() {
    const wrapperRect = heroWrapper.getBoundingClientRect();
    const wrapperHeight = heroWrapper.offsetHeight - window.innerHeight;

    // progress: 0 at top, 1 when wrapper bottom reaches viewport bottom
    const scrolled = -wrapperRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / wrapperHeight));

    if (video.duration) {
      video.currentTime = progress * video.duration;
    }

    // Fade out hero content as scroll progresses past 40%
    if (heroContent) {
      const contentOpacity = Math.max(0, 1 - (progress - 0.1) / 0.3);
      heroContent.style.opacity = contentOpacity;
      heroContent.style.transform = `translateY(${progress * 40}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init
}
