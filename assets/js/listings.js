// assets/js/listings.js
// Fetches property data from /api/listings proxy and renders cards

export async function initListings({ containerId, limit = null, showFilters = false }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<div class="listings-loading" style="color:var(--text-muted);text-align:center;padding:3rem;">Зареждане...</div>';

  let estates = [];
  try {
    const res = await fetch('/api/listings');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    estates = Array.isArray(data) ? data : (data.properties || data.estates || data.items || []);
    estates.sort((a, b) => (b.last_change || 0) - (a.last_change || 0));
  } catch (e) {
    container.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:3rem;">Не може да се зареди. Моля, опитайте отново.</div>';
    return;
  }

  if (limit) estates = estates.slice(0, limit);

  // Update count if element exists
  const countEl = document.querySelector('.listings-count');
  if (countEl) countEl.textContent = `${estates.length} имота`;

  if (showFilters) renderToggleFilter(estates, container, containerId);

  renderCards(estates, container);
  initModal();
}

function proxyUrl(url) {
  if (!url) return null;
  return `/api/img?url=${encodeURIComponent(url)}`;
}

function renderCards(estates, container) {
  if (!estates.length) {
    container.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:3rem;">Няма намерени имоти.</div>';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'property-grid';

  estates.forEach(estate => {
    const card = document.createElement('div');
    card.className = 'property-card fade-in';
    card.dataset.estateId = estate.uid || estate.code || '';

    const rawImageUrl = estate.photos?.[0]?.url || null;
    const imageUrl = proxyUrl(rawImageUrl);
    const title = estate.titleBG || estate.titleEN || estate.estate_type_name || 'Имот';

    // Badges
    const badges = [];
    if (estate.exclusive == 1) badges.push('<span class="property-badge property-badge--exclusive">Ексклузивна</span>');
    if (estate.top === true || estate.top == 1) badges.push('<span class="property-badge property-badge--top">Топ</span>');
    if (estate.new_construction == 1 || estate.stage_of_construction > 0) badges.push('<span class="property-badge property-badge--new">Ново</span>');
    const badgesHTML = badges.length ? `<div class="property-card-badges">${badges.join('')}</div>` : '';

    const imageHTML = imageUrl
      ? `<div style="overflow:hidden;position:relative;">${badgesHTML}<img class="property-card-image" src="${imageUrl}" alt="${escHtml(title)}" loading="lazy"></div>`
      : `<div class="property-card-image-placeholder" style="position:relative;">${badgesHTML}Pixel Estate</div>`;

    const price = estate.priceaseur
      ? `${Number(estate.priceaseur).toLocaleString('bg-BG')} EUR`
      : 'При запитване';

    const area = estate.space_m2 || '';
    const rooms = estate.roomsCount || '';
    const bedrooms = estate.bedroomCount || '';
    const balconies = estate.balconyCount || '';
    const floorNum = estate.floor > 0 ? estate.floor : '';
    const floorMax = estate.floor_max > 0 ? estate.floor_max : '';
    const floorStr = floorNum ? (floorMax ? `ет. ${floorNum}/${floorMax}` : `ет. ${floorNum}`) : '';
    const location = estate.subregion_name || estate.region_name || 'София';

    // Tags
    const tags = [];
    if (estate.furnishing_name) tags.push(estate.furnishing_name);
    if (estate.build_type_name) tags.push(estate.build_type_name);
    const tagsHTML = tags.length ? `<div class="property-card-tags">${tags.map(t => `<span class="property-tag">${escHtml(t)}</span>`).join('')}</div>` : '';

    card.innerHTML = `
      ${imageHTML}
      <div class="property-card-body">
        <div class="property-card-type">${escHtml(estate.listing_type_name || estate.estate_type_name || 'Оферта')}</div>
        <div class="property-card-title">${escHtml(title)}</div>
        <div class="property-card-location">\u{1F4CD} ${escHtml(location)}</div>
        <div class="property-card-price">${escHtml(price)} <span>${estate.pricePerM > 10 ? `/ ${estate.pricePerM} EUR/\u043C\u00B2` : ''}</span></div>
        <div class="property-card-stats">
          ${area ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(String(area))} \u043C\u00B2</span><span class="property-card-stat-label">Площ</span></div>` : ''}
          ${rooms ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(String(rooms))}</span><span class="property-card-stat-label">Стаи</span></div>` : ''}
          ${bedrooms ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(String(bedrooms))}</span><span class="property-card-stat-label">Спални</span></div>` : ''}
          ${floorStr ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(floorStr)}</span><span class="property-card-stat-label">Етаж</span></div>` : ''}
          ${balconies ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(String(balconies))}</span><span class="property-card-stat-label">Тераси</span></div>` : ''}
        </div>
        ${tagsHTML}
      </div>
    `;

    card.addEventListener('click', () => openModal(estate));
    grid.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(grid);

  observeFadeIn(container.querySelectorAll('.fade-in'));
}

// ── Toggle filter (Sale / Rent) ──────────────────
function renderToggleFilter(estates, container, containerId) {
  const lang = document.documentElement.lang || 'bg';
  const saleLabel = lang === 'en' ? 'For Sale' : 'Продажба';
  const rentLabel = lang === 'en' ? 'For Rent' : 'Наем';
  const allLabel  = lang === 'en' ? 'All' : 'Всички';

  const wrapper = document.createElement('div');
  wrapper.className = 'listings-toggle';
  wrapper.innerHTML = `
    <button class="listings-toggle-btn active" data-filter="">${allLabel}</button>
    <button class="listings-toggle-btn" data-filter="Продава">${saleLabel}</button>
    <button class="listings-toggle-btn" data-filter="Отдава под наем">${rentLabel}</button>
  `;

  const countEl = document.createElement('span');
  countEl.className = 'listings-count';
  countEl.style.cssText = 'color:var(--text-muted);font-size:var(--text-sm);margin-left:var(--space-sm);align-self:center;';
  countEl.textContent = `${estates.length} имота`;

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-md);';
  row.appendChild(wrapper);
  row.appendChild(countEl);
  container.before(row);

  wrapper.addEventListener('click', (e) => {
    const btn = e.target.closest('.listings-toggle-btn');
    if (!btn) return;
    wrapper.querySelectorAll('.listings-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filterVal = btn.dataset.filter;
    const filtered = filterVal ? estates.filter(e => e.listing_type_name === filterVal) : estates;
    countEl.textContent = `${filtered.length} имота`;
    renderCards(filtered, container);
  });
}

// ── Modal ─────────────────────────────────────────
function initModal() {
  if (document.querySelector('.modal-overlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Затвори">✕</button>
      <div class="modal-content"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

function openModal(estate) {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;

  const title = estate.titleBG || estate.titleEN || estate.estate_type_name || 'Имот';
  const price = estate.priceaseur
    ? `${Number(estate.priceaseur).toLocaleString('bg-BG')} EUR`
    : 'При запитване';
  const description = estate.DescriptionShortBG || estate.DescriptionBG || '';
  const photos = estate.photos || [];

  // Gallery HTML
  let galleryHTML = '';
  if (photos.length > 0) {
    const mainSrc = proxyUrl(photos[0].url);
    galleryHTML = `
      <div class="gallery" data-gallery-index="0">
        <div class="gallery-main">
          <img src="${mainSrc}" alt="${escHtml(title)}">
          ${photos.length > 1 ? `
            <button class="gallery-arrow gallery-arrow-left" aria-label="Previous">‹</button>
            <button class="gallery-arrow gallery-arrow-right" aria-label="Next">›</button>
          ` : ''}
          <div class="gallery-counter">1 / ${photos.length}</div>
        </div>
        ${photos.length > 1 ? `
          <div class="gallery-thumbnails">
            ${photos.map((p, i) => `
              <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                <img src="${proxyUrl(p.url)}" alt="" loading="lazy">
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Detail cards
  const detailCards = [
    estate.space_m2 ? { value: `${estate.space_m2} м²`, label: 'Площ' } : null,
    estate.roomsCount ? { value: estate.roomsCount, label: 'Стаи' } : null,
    estate.floor > 0 ? { value: `ет. ${estate.floor}`, label: 'Етаж' } : null,
    estate.furnishing_name ? { value: estate.furnishing_name, label: 'Обзавеждане' } : null,
    estate.build_type_name ? { value: estate.build_type_name, label: 'Строителство' } : null,
  ].filter(Boolean);

  overlay.querySelector('.modal-content').innerHTML = `
    ${galleryHTML}
    <div class="property-card-type" style="margin-bottom:0.5rem;">${escHtml(estate.listing_type_name || '')}</div>
    <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;margin-bottom:0.75rem;letter-spacing:-0.01em;">${escHtml(title)}</h2>
    <div style="font-family:var(--font-display);font-size:var(--text-3xl);font-weight:700;color:var(--grad-end);margin-bottom:var(--space-md);">${escHtml(price)}</div>

    ${detailCards.length ? `
      <div class="detail-cards">
        ${detailCards.map(c => `
          <div class="detail-card">
            <div class="detail-card-value">${escHtml(String(c.value))}</div>
            <div class="detail-card-label">${escHtml(c.label)}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div style="color:var(--text-secondary);font-size:var(--text-sm);">📍 ${escHtml(estate.subregion_name || '')}${estate.region_name ? ', ' + escHtml(estate.region_name) : ''}</div>

    ${description ? `<p style="color:var(--text-secondary);line-height:1.8;margin:var(--space-md) 0;">${escHtml(description)}</p>` : ''}

    <div style="height:1px;background:var(--border);margin:var(--space-lg) 0;"></div>

    <h3 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;margin-bottom:var(--space-sm);">Изпратете запитване</h3>
    <form class="inquiry-form" data-estate="${escHtml(title)}">
      <div class="form-group">
        <label class="form-label">Вашето име</label>
        <input type="text" class="form-input" name="name" required placeholder="Иван Иванов">
      </div>
      <div class="form-group">
        <label class="form-label">Телефон</label>
        <input type="tel" class="form-input" name="phone" required placeholder="+359 88 ...">
      </div>
      <div class="form-group">
        <label class="form-label">Съобщение</label>
        <textarea class="form-textarea" name="message" placeholder="Интересувам се от ${escHtml(title)}..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%;">Изпрати запитване</button>
      <div class="form-success"></div>
    </form>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attach form handler
  overlay.querySelector('.inquiry-form').addEventListener('submit', handleFormSubmit);

  // Attach gallery handlers
  if (photos.length > 1) {
    const gallery = overlay.querySelector('.gallery');
    let currentIndex = 0;

    function showPhoto(index) {
      currentIndex = ((index % photos.length) + photos.length) % photos.length;
      gallery.querySelector('.gallery-main img').src = proxyUrl(photos[currentIndex].url);
      gallery.querySelector('.gallery-counter').textContent = `${currentIndex + 1} / ${photos.length}`;
      gallery.querySelectorAll('.gallery-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
      });
      // Scroll active thumb into view
      const activeThumb = gallery.querySelector('.gallery-thumb.active');
      activeThumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    gallery.querySelector('.gallery-arrow-left')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoto(currentIndex - 1);
    });
    gallery.querySelector('.gallery-arrow-right')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoto(currentIndex + 1);
    });
    gallery.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        showPhoto(parseInt(thumb.dataset.index));
      });
    });

    // Keyboard navigation
    const keyHandler = (e) => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    };
    document.addEventListener('keydown', keyHandler);
    // Clean up when modal closes
    const origClose = closeModal;
    closeModal = () => {
      document.removeEventListener('keydown', keyHandler);
      origClose();
    };
  }
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Form submit (Formspree) ────────────────────────
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('[type="submit"]');
  const successEl = form.querySelector('.form-success');
  btn.disabled = true;
  btn.textContent = 'Изпращане...';

  const FORMSPREE_ID = 'xpqorgyw';
  const body = {
    name:    form.name.value,
    phone:   form.phone.value,
    message: form.message.value,
    estate:  form.dataset.estate || '',
  };

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      form.reset();
      btn.style.display = 'none';
      successEl.style.display = 'block';
      successEl.textContent = 'Получихме вашето запитване! Ще се свържем с вас скоро.';
    } else {
      throw new Error();
    }
  } catch {
    btn.disabled = false;
    btn.textContent = 'Изпрати запитване';
    alert('Грешка при изпращане. Моля, обадете се директно.');
  }
}

// ── Helpers ───────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function observeFadeIn(elements) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}
