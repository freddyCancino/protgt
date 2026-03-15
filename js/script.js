/* ============================================================
   SEGUROS MASC — script.js
   JavaScript compartido para todas las páginas
   ============================================================ */

/* ── HEADER SCROLL ── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const ham  = document.getElementById('hamburger');
  if (!menu) return;
  menu.classList.toggle('open');
  ham && ham.classList.toggle('active');
}

/* ── MARK ACTIVE NAV LINK ── */
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, #mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

/* ── FAQ ACCORDION ── */
function toggleFaq(el) {
  const item   = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── WHATSAPP WIDGET ── */
function closeWaBubble() {
  const bubble = document.getElementById('wa-bubble');
  if (bubble) bubble.classList.add('hidden');
}

/* Show bubble after 3s on first visit (session) */
document.addEventListener('DOMContentLoaded', () => {
  const bubble = document.getElementById('wa-bubble');
  if (!bubble) return;
  if (sessionStorage.getItem('waClosed')) {
    bubble.classList.add('hidden');
  } else {
    setTimeout(() => {
      bubble.classList.remove('hidden');
    }, 3000);
    bubble.classList.add('hidden'); // start hidden, show after delay
  }
});

function _closeBubblePermanent() {
  closeWaBubble();
  sessionStorage.setItem('waClosed', '1');
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);

/* ── FORM HANDLERS ── */
function submitQuote(e) {
  if (e) e.preventDefault();
  alert('¡Gracias por tu solicitud!\nUn asesor de Seguros MASC se pondrá en contacto contigo en menos de 2 horas hábiles.');
}

function submitContact(e) {
  if (e) e.preventDefault();
  alert('¡Mensaje enviado con éxito!\nTe responderemos a la brevedad posible.');
}