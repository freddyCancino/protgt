/* ============================================================
   PROtgt Seguros S.A. de C.V. — script.js
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
  if (ham) ham.classList.toggle('active');
}

/* Cerrar menú móvil al hacer clic fuera */
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobile-menu');
  const ham  = document.getElementById('hamburger');
  if (!menu || !menu.classList.contains('open')) return;
  if (!menu.contains(e.target) && !ham.contains(e.target)) {
    menu.classList.remove('open');
    if (ham) ham.classList.remove('active');
  }
});

/* ── MARCAR ENLACE ACTIVO EN NAVEGACIÓN ── */
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

function _closeBubblePermanent() {
  closeWaBubble();
  sessionStorage.setItem('waClosed', '1');
}

/* Mostrar burbuja después de 4 segundos (solo una vez por sesión) */
document.addEventListener('DOMContentLoaded', () => {
  const bubble = document.getElementById('wa-bubble');
  if (!bubble) return;
  if (sessionStorage.getItem('waClosed')) {
    bubble.classList.add('hidden');
    return;
  }
  bubble.classList.add('hidden');
  setTimeout(() => {
    bubble.classList.remove('hidden');
  }, 4000);
});

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

/* ── FORMULARIO COTIZACIÓN ── */
function submitQuote(e) {
  if (e) e.preventDefault();
  const btn = e ? e.submitter : null;
  if (btn) btn.textContent = 'Enviando...';
  setTimeout(() => {
    alert(
      '¡Gracias por contactar a PROtgt Seguros!\n\n' +
      'Tu solicitud fue recibida con éxito.\n' +
      'Un asesor se pondrá en contacto contigo\n' +
      'en menos de 2 horas hábiles.\n\n' +
      '📞 Tel: 961 453 54 66\n' +
      '💬 WhatsApp: 961 453 54 66'
    );
    if (e && e.target) e.target.reset();
    if (btn) btn.textContent = 'Enviar solicitud de cotización →';
  }, 600);
}

/* ── FORMULARIO CONTACTO ── */
function submitContact(e) {
  if (e) e.preventDefault();
  const btn = e ? e.submitter : null;
  if (btn) btn.textContent = 'Enviando...';
  setTimeout(() => {
    alert(
      '¡Mensaje enviado a PROtgt Seguros!\n\n' +
      'Gracias por contactarnos.\n' +
      'Te responderemos a la brevedad posible.\n\n' +
      '📞 Tel: 961 453 54 66\n' +
      '💬 WhatsApp: 961 453 54 66'
    );
    if (e && e.target) e.target.reset();
    if (btn) btn.textContent = 'Enviar mensaje →';
  }, 600);
}