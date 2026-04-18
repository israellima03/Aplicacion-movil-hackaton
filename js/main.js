// =============================================
// PLATA — main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Saludo dinámico ──
  const saludoEl = document.getElementById('saludo');
  if (saludoEl) {
    const h = new Date().getHours();
    saludoEl.textContent = h < 12 ? '☀️ Buenos días' : h < 19 ? '🌤 Buenas tardes' : '🌙 Buenas noches';
  }

  // ── Toggle saldo ──
  const balanceWrap = document.getElementById('balance-wrap');
  const balanceVal  = document.getElementById('balance-val');
  let visible = true;
  if (balanceWrap && balanceVal) {
    balanceWrap.addEventListener('click', () => {
      visible = !visible;
      balanceVal.textContent = visible ? '118.19' : '••••••';
      balanceVal.style.letterSpacing = visible ? '-2px' : '4px';
    });
  }

  // ── Barra salud animada ──
  const bar = document.getElementById('salud-bar');
  if (bar) {
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = '52%'; }, 600);
  }

  // ── Ripple en botones ──
  document.querySelectorAll('.action-btn, .qr-btn, .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      const d = Math.max(this.clientWidth, this.clientHeight);
      const r = this.getBoundingClientRect();
      Object.assign(circle.style, {
        position: 'absolute', width: d+'px', height: d+'px',
        left: (e.clientX - r.left - d/2)+'px',
        top:  (e.clientY - r.top  - d/2)+'px',
        background: 'rgba(255,255,255,.3)', borderRadius: '50%',
        transform: 'scale(0)', animation: 'ripple .5s linear', pointerEvents: 'none'
      });
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 500);
    });
  });

  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0}}';
    document.head.appendChild(s);
  }

  // ── Alerta: cerrar al tocar ──
  const alert = document.getElementById('alert-strip');
  if (alert) {
    alert.addEventListener('click', () => {
      alert.style.transition = 'opacity .3s, max-height .3s, margin .3s, padding .3s';
      alert.style.opacity = '0';
      alert.style.maxHeight = '0';
      alert.style.padding = '0';
      alert.style.margin = '0';
    });
  }

  // ── Chat FAB: ocultar al scroll ──
  const fab = document.querySelector('.chat-fab');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (!fab) return;
    const y = window.scrollY;
    fab.style.transform = (y > lastY && y > 80) ? 'translateY(120px)' : 'translateY(0)';
    fab.style.opacity   = (y > lastY && y > 80) ? '0' : '1';
    fab.style.transition = 'transform .3s, opacity .3s';
    lastY = y;
  });

});