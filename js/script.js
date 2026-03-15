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

/* ── FORMULARIO COTIZACIÓN (Formspree) ── */
async function handleQuoteSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = document.getElementById('btn-cotizar');
  const originalText = btn ? btn.textContent : '';

  if (btn) { btn.textContent = 'Enviando...'; btn.disabled = true; }

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      /* ✅ Envío exitoso */
      form.innerHTML = `
        <div style="text-align:center;padding:40px 20px">
          <div style="font-size:56px;margin-bottom:16px">✅</div>
          <h3 style="font-size:22px;font-weight:800;color:#0B1F3A;margin-bottom:10px">
            ¡Solicitud enviada con éxito!
          </h3>
          <p style="font-size:15px;color:#6B7A8D;line-height:1.6;margin-bottom:20px">
            Gracias por contactar a <strong>PROtgt Seguros</strong>.<br>
            Un asesor se comunicará contigo en menos de 2 horas hábiles.
          </p>
          <p style="font-size:14px;color:#6B7A8D">
            ¿Necesitas respuesta inmediata?<br>
            <a href="https://wa.me/529614535466?text=Hola%2C%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n."
               target="_blank"
               style="color:#E85D04;font-weight:700;text-decoration:none">
              💬 Escríbenos por WhatsApp ahora
            </a>
          </p>
        </div>`;
    } else {
      /* ❌ Error del servidor */
      throw new Error('Error al enviar');
    }
  } catch (err) {
    /* ❌ Error de red o Formspree no configurado */
    if (btn) { btn.textContent = originalText; btn.disabled = false; }
    alert(
      '⚠️ No se pudo enviar el formulario.\n\n' +
      'Por favor contáctanos directamente:\n\n' +
      '📞 Tel: (961) 453-54-66\n' +
      '💬 WhatsApp: 961 453 54 66\n' +
      '✉️ info@protgtseguros.com.mx\n\n' +
      'Nota: Si eres el administrador, configura\n' +
      'tu ID de Formspree en cotizacion.html'
    );
  }
}

/* ── FORMULARIO CONTACTO (Formspree) ── */
async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const originalText = btn ? btn.textContent : '';

  if (btn) { btn.textContent = 'Enviando...'; btn.disabled = true; }

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.innerHTML = `
        <div style="text-align:center;padding:40px 20px">
          <div style="font-size:56px;margin-bottom:16px">✅</div>
          <h3 style="font-size:20px;font-weight:800;color:#0B1F3A;margin-bottom:10px">
            ¡Mensaje enviado!
          </h3>
          <p style="font-size:14px;color:#6B7A8D;line-height:1.6">
            Gracias por escribirnos.<br>
            El equipo de <strong>PROtgt Seguros</strong> te responderá a la brevedad.
          </p>
        </div>`;
    } else {
      throw new Error('Error al enviar');
    }
  } catch (err) {
    if (btn) { btn.textContent = originalText; btn.disabled = false; }
    alert(
      '⚠️ No se pudo enviar el mensaje.\n\n' +
      'Por favor contáctanos directamente:\n\n' +
      '📞 Tel: (961) 453-54-66\n' +
      '💬 WhatsApp: 961 453 54 66'
    );
  }
}

/* Mostrar mensaje de éxito si viene de redirección de Formspree */
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.search.includes('enviado=1')) {
    const formCard = document.querySelector('.form-card');
    if (formCard) {
      formCard.innerHTML = `
        <div style="text-align:center;padding:40px 20px">
          <div style="font-size:56px;margin-bottom:16px">✅</div>
          <h3 style="font-size:22px;font-weight:800;color:#0B1F3A;margin-bottom:10px">
            ¡Solicitud enviada con éxito!
          </h3>
          <p style="font-size:15px;color:#6B7A8D;line-height:1.6">
            Un asesor de <strong>PROtgt Seguros</strong> te contactará pronto.
          </p>
        </div>`;
    }
  }
});