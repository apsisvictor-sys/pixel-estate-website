// assets/js/nav.js
export function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');
  const langBtns = document.querySelectorAll('[data-lang]');

  // Scroll shrink
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile nav
  hamburger?.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobileClose?.addEventListener('click', closeMobile);
  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobile();
  });
  function closeMobile() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Language toggle
  const savedLang = localStorage.getItem('pe-lang') || 'bg';
  setLang(savedLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
      localStorage.setItem('pe-lang', btn.dataset.lang);
    });
  });
}

export function setLang(lang) {
  document.documentElement.lang = lang === 'bg' ? 'bg' : 'en';

  // Toggle active state on buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Swap text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const translation = window.translations?.[lang]?.[key];
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Swap href on links
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.dataset.i18nHref;
    const href = window.translations?.[lang]?.[key];
    if (href) el.href = href;
  });
}
