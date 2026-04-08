// assets/js/hero.js
// Scroll-controlled video animation + hero content reveal
// Mobile: static poster image (video seek is too janky on phones)
// Desktop: scroll-driven video scrubbing

export function initHero() {
  const heroWrapper = document.querySelector('.hero-wrapper');
  const heroContent = document.querySelector('.hero-content');
  const video = document.querySelector('.hero-video');

  // Reveal hero text on load
  setTimeout(() => {
    heroContent?.classList.add('visible');
  }, 300);

  if (!heroWrapper) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile: replace video with poster image, add subtle parallax
    if (video) {
      const poster = document.createElement('img');
      poster.className = 'hero-video';
      poster.src = '/assets/images/hero-poster-last.jpg';
      poster.alt = 'Pixel Estate';
      poster.style.cssText = 'transition:transform 0.1s linear;';
      video.replaceWith(poster);

      function onScrollMobile() {
        const rect = heroWrapper.getBoundingClientRect();
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (heroWrapper.offsetHeight - window.innerHeight)));

        // Zoom effect on poster
        poster.style.transform = `scale(${1 + progress * 0.3})`;

        // Fade hero content in the last 10% of scroll
        if (heroContent) {
          const contentOpacity = progress < 0.9 ? 1 : Math.max(0, 1 - (progress - 0.9) / 0.1);
          heroContent.style.opacity = contentOpacity;
          heroContent.style.transform = `translateY(${Math.max(0, (progress - 0.9)) * 150}px)`;
        }
      }

      window.addEventListener('scroll', onScrollMobile, { passive: true });
      onScrollMobile();
    }
    return;
  }

  // Desktop: scroll-driven video scrubbing
  if (!video) return;

  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.pause();

  // Poster is set in HTML (first frame)

  function onScroll() {
    const wrapperRect = heroWrapper.getBoundingClientRect();
    const wrapperHeight = heroWrapper.offsetHeight - window.innerHeight;

    const scrolled = -wrapperRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / wrapperHeight));

    if (video.duration) {
      video.currentTime = progress * video.duration;
    }

    // Fade out hero content after 80%
    if (heroContent) {
      const contentOpacity = progress < 0.8 ? 1 : Math.max(0, 1 - (progress - 0.8) / 0.2);
      heroContent.style.opacity = contentOpacity;
      heroContent.style.transform = `translateY(${Math.max(0, (progress - 0.8)) * 200}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
