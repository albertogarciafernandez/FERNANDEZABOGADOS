/* ============================================================
   IMPERIO LEGAL SLP — main.js
   Animaciones, UI, partículas, chatbot, nav
   ============================================================ */

'use strict';

/* ── PARTICLES ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -(Math.random() * 0.6 + 0.2);
    this.alpha = Math.random() * 0.6 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
    const hue = 42 + (Math.random() - 0.5) * 15;
    this.color = `hsla(${hue}, 70%, 65%, `;
  };
  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    const t = this.life / this.maxLife;
    this.currentAlpha = this.alpha * Math.sin(t * Math.PI);
    if (this.life > this.maxLife) this.reset();
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.currentAlpha + ')';
    ctx.fill();
  };

  const count = Math.min(120, Math.floor(W * H / 12000));
  for (let i = 0; i < count; i++) {
    const p = new Particle();
    p.life = Math.floor(Math.random() * p.maxLife);
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── NAV SCROLL ── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ── ANIMATED COUNTERS ── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 1800;
      const decimals = String(target).includes('.') ? 1 : 0;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const val = target * ease;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
})();

/* ── FAQ ACCORDION ── */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── CHATBOT ── */
(function initChatbot() {
  const fab = document.getElementById('chatbot-fab');
  const win = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');
  if (!fab || !win) return;

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    if (isOpen && input) setTimeout(() => input.focus(), 300);
  }

  fab.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', toggle);

  function appendMsg(text, type) {
    const div = document.createElement('div');
    div.className = `msg msg-${type}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = appendMsg('•••', 'bot');
    div.id = 'typing-indicator';
    return div;
  }

  function send(text) {
    if (!text.trim()) return;
    appendMsg(text, 'user');
    if (input) input.value = '';

    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      const agent = window.routeQuery ? window.routeQuery(text) : null;
      const response = agent ? agent.respond(text) : { text: 'Servicio no disponible.' };
      const botDiv = appendMsg(response.text, 'bot');
      if (response.disclaimer) {
        const disc = document.createElement('div');
        disc.className = 'msg msg-bot';
        disc.style.fontSize = '0.72rem';
        disc.style.opacity = '0.6';
        disc.style.marginTop = '-6px';
        disc.textContent = response.disclaimer;
        messages.appendChild(disc);
      }
      messages.scrollTop = messages.scrollHeight;
    }, 800 + Math.random() * 600);
  }

  if (sendBtn) sendBtn.addEventListener('click', () => send(input?.value || ''));
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); }
    });
  }

  /* Quick replies */
  document.querySelectorAll('.quick-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => send(btn.textContent));
  });
})();

/* ── COOKIE BANNER ── */
(function initCookies() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('cookie-consent')) { banner.classList.add('hidden'); return; }

  banner.querySelectorAll('.cookie-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', btn.dataset.choice || 'accepted');
      banner.classList.add('hidden');
    });
  });
})();

/* ── MODAL ── */
(function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-modal');
      const overlay = document.getElementById(`modal-${id}`);
      if (overlay) overlay.classList.add('open');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
    const close = overlay.querySelector('.modal-close');
    if (close) close.addEventListener('click', () => overlay.classList.remove('open'));
  });
})();

/* ── CONTACT FORM ── */
(function initForms() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const original = btn.textContent;
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 1200));
    const success = document.getElementById('form-success');
    if (success) { success.style.display = 'block'; form.reset(); }
    btn.textContent = original;
    btn.disabled = false;
  });
})();

/* ── PRODUCT MODAL ── */
window.openProduct = function(slug) {
  const overlay = document.getElementById('modal-producto');
  if (!overlay) return;
  const data = window.PRODUCTS_DATA?.[slug];
  if (!data) return;
  overlay.querySelector('.modal-product-name').textContent = data.name;
  overlay.querySelector('.modal-product-desc').textContent = data.desc;
  overlay.querySelector('.modal-product-price').textContent = data.price;
  overlay.querySelector('.modal-product-includes').innerHTML = data.includes.map(i => `<li>${i}</li>`).join('');
  overlay.classList.add('open');
};

/* ── 3D TILT (hero image) ── */
(function initTilt() {
  const tiltEl = document.getElementById('hero-3d');
  if (!tiltEl || window.matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const rx = ((e.clientY - cy) / cy) * -8;
    const ry = ((e.clientX - cx) / cx) * 8;
    tiltEl.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    tiltEl.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
})();

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
