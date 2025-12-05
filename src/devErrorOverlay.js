// Lightweight dev-only global error overlay to surface uncaught errors
function ensureOverlay() {
  let el = document.getElementById('dev-error-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'dev-error-overlay';
    el.style.position = 'fixed';
    el.style.left = '12px';
    el.style.right = '12px';
    el.style.bottom = '12px';
    el.style.maxHeight = '40vh';
    el.style.overflow = 'auto';
    el.style.zIndex = '99999';
    el.style.background = 'rgba(0,0,0,0.85)';
    el.style.color = 'white';
    el.style.padding = '12px';
    el.style.borderRadius = '8px';
    el.style.fontFamily = 'monospace';
    el.style.fontSize = '12px';
    el.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(el);
  }
  return el;
}

window.addEventListener('error', (ev) => {
  try {
    const el = ensureOverlay();
    el.textContent = `Uncaught error: ${ev.message}\n${ev.filename}:${ev.lineno}:${ev.colno}\n${ev.error?.stack || ''}`;
  } catch (e) {
    // ignore
  }
});

window.addEventListener('unhandledrejection', (ev) => {
  try {
    const el = ensureOverlay();
    el.textContent = `Unhandled promise rejection:\n${ev.reason && (ev.reason.stack || ev.reason)} `;
  } catch (e) {
    // ignore
  }
});

export {};
