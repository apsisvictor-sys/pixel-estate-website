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
    // EstateAssistant returns { brokers: [...], properties: [...] }
    estates = Array.isArray(data) ? data : (data.properties || data.estates || data.items || []);
  } catch (e) {
    container.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:3rem;">Не може да се зареди. Моля, опитайте отново.</div>';
    return;
  }

  if (limit) estates = estates.slice(0, limit);

  // Update count if element exists
  const countEl = document.querySelector('.listings-count');
  if (countEl) countEl.textContent = `${estates.length} имота`;

  if (showFilters) renderFilters(estates, container, containerId);

  renderCards(estates, container);
  initModal();
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

    const imageUrl = estate.photos?.[0]?.url || null;
    const title = estate.titleBG || estate.titleEN || estate.estate_type_name || 'Имот';
    const imageHTML = imageUrl
      ? `<img class="property-card-image" src="${imageUrl}" alt="${escHtml(title)}" loading="lazy">`
      : `<div class="property-card-image-placeholder">Pixel Estate</div>`;

    const price = estate.priceaseur
      ? `${Number(estate.priceaseur).toLocaleString('bg-BG')} EUR`
      : 'При запитване';

    const area = estate.space_m2 || '';
    const rooms = estate.roomsCount || '';
    const floor = (estate.floor && estate.floor > 0) ? `ет. ${estate.floor}` : '';
    const location = estate.subregion_name || estate.region_name || 'София';

    card.innerHTML = `
      ${imageHTML}
      <div class="property-card-body">
        <div class="property-card-type">${escHtml(estate.listing_type_name || estate.estate_type_name || 'Оферта')}</div>
        <div class="property-card-title">${escHtml(title)}</div>
        <div class="property-card-location">📍 ${escHtml(location)}</div>
        <div class="property-card-price">${escHtml(price)} <span>${estate.pricePerM ? `/ ${estate.pricePerM} EUR/м²` : ''}</span></div>
        <div class="property-card-stats">
          ${area ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(String(area))} м²</span><span class="property-card-stat-label">Площ</span></div>` : ''}
          ${rooms ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(String(rooms))}</span><span class="property-card-stat-label">Стаи</span></div>` : ''}
          ${floor ? `<div class="property-card-stat"><span class="property-card-stat-value">${escHtml(floor)}</span><span class="property-card-stat-label">Етаж</span></div>` : ''}
        </div>
      </div>
    `;

    card.addEventListener('click', () => openModal(estate));
    grid.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(grid);

  // Trigger fade-in via IntersectionObserver
  observeFadeIn(container.querySelectorAll('.fade-in'));
}

function renderFilters(estates, container, containerId) {
  const types = [...new Set(estates.map(e => e.listing_type_name).filter(Boolean))];
  const wrapper = document.createElement('div');
  wrapper.className = 'listings-filters';
  wrapper.innerHTML = `
    <select class="filter-select" id="filter-type">
      <option value="">Всички видове</option>
      ${types.map(t => `<option value="${escHtml(t)}">${escHtml(t)}</option>`).join('')}
    </select>
    <select class="filter-select" id="filter-price">
      <option value="">Всички цени</option>
      <option value="0-100000">до 100 000 EUR</option>
      <option value="100000-200000">100 000 – 200 000 EUR</option>
      <option value="200000-500000">200 000 – 500 000 EUR</option>
      <option value="500000-99999999">над 500 000 EUR</option>
    </select>
    <span class="listings-count"></span>
  `;
  container.before(wrapper);

  wrapper.addEventListener('change', () => {
    const typeVal = document.getElementById('filter-type').value;
    const priceVal = document.getElementById('filter-price').value;
    let filtered = estates;
    if (typeVal) filtered = filtered.filter(e => e.listing_type_name === typeVal);
    if (priceVal) {
      const [min, max] = priceVal.split('-').map(Number);
      filtered = filtered.filter(e => {
        const p = Number(e.priceaseur);
        return p >= min && p <= max;
      });
    }
    const countEl = wrapper.querySelector('.listings-count');
    if (countEl) countEl.textContent = `${filtered.length} имота`;
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

  const photos = estate.photos?.slice(0,3).map(p =>
    `<img src="${p.url}" style="width:100%;border-radius:12px;aspect-ratio:16/9;object-fit:cover;" alt="">`
  ).join('') || '';

  const details = [
    estate.space_m2 ? `${estate.space_m2} м² площ` : '',
    estate.roomsCount ? `${estate.roomsCount} стаи` : '',
    estate.floor > 0 ? `ет. ${estate.floor}` : '',
    estate.furnishing_name || '',
    estate.build_type_name || '',
  ].filter(Boolean).join(' · ');

  overlay.querySelector('.modal-content').innerHTML = `
    ${photos ? `<div style="display:grid;gap:0.5rem;margin-bottom:1.5rem;">${photos}</div>` : ''}
    <div class="property-card-type">${escHtml(estate.listing_type_name || '')}</div>
    <h2 style="font-size:var(--text-2xl);font-weight:700;margin:0.5rem 0 1rem;">${escHtml(title)}</h2>
    <div style="font-size:var(--text-3xl);font-weight:800;margin-bottom:0.5rem;">${escHtml(price)}</div>
    ${details ? `<div style="color:var(--text-secondary);font-size:var(--text-sm);margin-bottom:1.5rem;">${escHtml(details)}</div>` : ''}
    ${description ? `<p style="color:var(--text-secondary);line-height:1.7;margin-bottom:2rem;">${escHtml(description)}</p>` : ''}
    <hr style="border:none;border-top:1px solid var(--border);margin-bottom:2rem;">
    <h3 style="font-size:var(--text-xl);font-weight:700;margin-bottom:1rem;">Изпратете запитване</h3>
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
        <textarea class="form-textarea" name="message" placeholder="Интересувам се от ${escHtml(estate.title || 'имота')}..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%;">Изпрати запитване</button>
      <div class="form-success"></div>
    </form>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attach form handler
  overlay.querySelector('.inquiry-form').addEventListener('submit', handleFormSubmit);
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

  const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // Replace with Formspree form ID
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
