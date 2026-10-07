// Consentimiento de cookies. Guarda la elección en localStorage (`seint_cookies_v1`) y
// solo carga cada herramienta de terceros si su categoría fue aceptada:
//   an → Google Analytics 4 · mk → Píxel de Meta · ct → contenido incrustado (YouTube, Maps)
export type Prefs = { an: boolean; mk: boolean; ct: boolean };
const KEY = 'seint_cookies_v1';
const NONE: Prefs = { an: false, mk: false, ct: false };

export function readPrefs(): Prefs | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return { an: !!p.an, mk: !!p.mk, ct: !!p.ct };
  } catch {
    return null;
  }
}

function writePrefs(p: Prefs) {
  try { localStorage.setItem(KEY, JSON.stringify({ ...p, fecha: new Date().toISOString() })); } catch { /* sin almacenamiento: no se recuerda */ }
}

let loaded = { an: false, mk: false };

function loadGA4(id: string) {
  if (loaded.an || !id) return;
  loaded.an = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', id, { anonymize_ip: true });
}

function loadPixel(id: string) {
  if (loaded.mk || !id) return;
  loaded.mk = true;
  const w = window as any;
  if (w.fbq) return;
  const n: any = (w.fbq = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); });
  if (!w._fbq) w._fbq = n;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  w.fbq('init', id);
  w.fbq('track', 'PageView');
}

/** Recuadros `[data-embed]`: cargan el iframe solo con la categoría "contenido incrustado". */
function loadEmbeds() {
  document.querySelectorAll<HTMLElement>('[data-embed]').forEach((box) => {
    const src = box.dataset.embedSrc;
    if (!src || box.dataset.embedLoaded) return;
    box.dataset.embedLoaded = '1';
    const f = document.createElement('iframe');
    f.src = src;
    f.title = box.dataset.embedTitle || 'Contenido incrustado';
    f.loading = 'lazy';
    f.allowFullscreen = true;
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
    box.replaceChildren(f);
  });
}

function apply(p: Prefs, ids: { ga4: string; pixel: string }) {
  if (p.an) loadGA4(ids.ga4);
  if (p.mk) loadPixel(ids.pixel);
  if (p.ct) loadEmbeds();
}

export function initCookies() {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  if (!banner) return;
  const panel = banner.querySelector<HTMLElement>('[data-cookie-panel]')!;
  const ids = { ga4: banner.dataset.ga4 || '', pixel: banner.dataset.pixel || '' };
  const saved = readPrefs();
  let draft: Prefs = { ...(saved ?? NONE) };

  const paint = () => {
    banner.querySelectorAll<HTMLElement>('[data-cookies-toggle]').forEach((b) => {
      b.setAttribute('aria-pressed', String(draft[b.dataset.cookiesToggle as keyof Prefs]));
    });
  };
  const open = (withPanel: boolean) => {
    draft = { ...(readPrefs() ?? NONE) };
    paint();
    banner.hidden = false;
    panel.hidden = !withPanel;
  };
  const save = (p: Prefs) => {
    const prev = readPrefs();
    writePrefs(p);
    banner.hidden = true;
    panel.hidden = true;
    // Una herramienta ya cargada no se puede descargar: si se retira un permiso, se recarga la página.
    if (prev && ((prev.an && !p.an && loaded.an) || (prev.mk && !p.mk && loaded.mk))) { location.reload(); return; }
    apply(p, ids);
  };

  if (saved) apply(saved, ids);
  else banner.hidden = false;

  banner.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const tog = t.closest<HTMLElement>('[data-cookies-toggle]');
    if (tog) {
      const k = tog.dataset.cookiesToggle as keyof Prefs;
      draft = { ...draft, [k]: !draft[k] };
      paint();
      return;
    }
    const a = t.closest<HTMLElement>('[data-cookies]')?.dataset.cookies;
    if (a === 'aceptar') save({ an: true, mk: true, ct: true });
    else if (a === 'rechazar') save({ ...NONE });
    else if (a === 'guardar') save(draft);
    else if (a === 'configurar') { panel.hidden = false; paint(); }
  });

  document.querySelectorAll('[data-cookies-abrir]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); open(true); }));

  // Botón "Cargar" dentro de un recuadro de contenido incrustado: activa solo esa categoría.
  document.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('[data-embed-accept]');
    if (!b) return;
    save({ ...(readPrefs() ?? NONE), ct: true });
  });
}
