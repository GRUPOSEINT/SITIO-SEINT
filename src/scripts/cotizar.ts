// Formulario de cotización: empresa / persona, servicio precargado desde ?servicio=,
// validación en línea, envío a Netlify Forms y paso a /cotizar/gracias.
const WA = 'https://wa.me/573163352739?text=';
type Tipo = 'empresa' | 'persona';

const MENSAJES: Record<string, string> = {
  nombre: 'Escribe tu nombre completo.',
  empresa: 'Necesitamos la razón social para la cotización.',
  correo: 'Revisa el correo: ahí enviamos la cotización.',
  telefono: 'Un teléfono mal escrito es una cotización que nunca se responde.',
  personas: 'Indica cuántas personas, aunque sea aproximado.',
  autoriza: 'Sin esta autorización no podemos guardar tus datos ni responderte.',
};

export function initCotizar() {
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  if (!form) return;
  const el = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement;
  const servicio = el('servicio') as HTMLSelectElement;
  let tipo: Tipo = 'empresa';

  const actualizarWa = () => {
    const msg = servicio.value ? 'Hola, quiero cotizar: ' + servicio.value : 'Hola, quiero pedir una cotización.';
    document.querySelectorAll<HTMLAnchorElement>('[data-wa]').forEach((a) => (a.href = WA + encodeURIComponent(msg)));
  };

  const setTipo = (t: Tipo) => {
    tipo = t;
    el('tipo').value = t;
    document.querySelectorAll<HTMLButtonElement>('[data-tipo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tipo === t)));
    document.querySelectorAll<HTMLElement>('[data-nota]').forEach((p) => (p.hidden = p.dataset.nota !== t));
    form.querySelectorAll<HTMLElement>('[data-solo]').forEach((f) => {
      const on = f.dataset.solo === t;
      f.hidden = !on;
      f.querySelectorAll('input').forEach((i) => (i.disabled = !on));
    });
    limpiarErrores();
  };

  // Precarga desde la URL (botones "Cotizar" del sitio).
  const q = new URLSearchParams(location.search);
  const s = q.get('servicio');
  if (s) {
    if (![...servicio.options].some((o) => o.value === s)) servicio.add(new Option(s, s));
    servicio.value = s;
  }
  setTipo(q.get('tipo') === 'persona' ? 'persona' : 'empresa');
  actualizarWa();
  servicio.addEventListener('change', actualizarWa);
  document.querySelectorAll<HTMLButtonElement>('[data-tipo]').forEach((b) => b.addEventListener('click', () => setTipo(b.dataset.tipo as Tipo)));

  function validar(campo?: string): Record<string, string> {
    const err: Record<string, string> = {};
    const v = (n: string) => (el(n)?.value || '').trim();
    const empresa = tipo === 'empresa';
    if (!v('nombre')) err.nombre = MENSAJES.nombre;
    if (empresa && !v('empresa')) err.empresa = MENSAJES.empresa;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('correo'))) err.correo = MENSAJES.correo;
    if (v('telefono').replace(/\D/g, '').length < 7) err.telefono = MENSAJES.telefono;
    if (empresa && !(parseInt(v('personas'), 10) > 0)) err.personas = MENSAJES.personas;
    if (!(el('autoriza') as HTMLInputElement).checked) err.autoriza = MENSAJES.autoriza;
    if (campo) return err[campo] ? { [campo]: err[campo] } : {};
    return err;
  }

  function pintar(nombre: string, msg?: string) {
    if (nombre === 'autoriza') {
      const p = document.getElementById('e-autoriza')!;
      p.textContent = msg || '';
      p.hidden = !msg;
      return;
    }
    const f = form!.querySelector<HTMLElement>(`[data-field="${nombre}"]`);
    const m = document.getElementById('e-' + nombre);
    const input = el(nombre);
    if (!f || !m) return;
    f.classList.toggle('err', !!msg);
    m.textContent = msg || '';
    input.setAttribute('aria-invalid', String(!!msg));
    if (msg) input.setAttribute('aria-describedby', m.id); else input.removeAttribute('aria-describedby');
  }
  function limpiarErrores() { ['nombre', 'empresa', 'correo', 'telefono', 'personas', 'autoriza'].forEach((n) => pintar(n)); }

  // Error en el momento: al salir de un campo con contenido, y se limpia al corregir.
  ['nombre', 'empresa', 'correo', 'telefono', 'personas'].forEach((n) => {
    const i = el(n);
    i.addEventListener('blur', () => { if (i.value.trim()) pintar(n, validar(n)[n]); });
    i.addEventListener('input', () => { if (i.closest('.err')) pintar(n, validar(n)[n]); });
  });
  el('autoriza').addEventListener('change', () => pintar('autoriza', validar('autoriza').autoriza));

  const errEnvio = document.querySelector<HTMLElement>('[data-envio-err]')!;
  const boton = form.querySelector<HTMLButtonElement>('[data-submit]')!;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEnvio.hidden = true;
    const err = validar();
    limpiarErrores();
    Object.entries(err).forEach(([k, m]) => pintar(k, m));
    const primero = Object.keys(err)[0];
    if (primero) { (el(primero) as HTMLElement).focus(); return; }

    const radicado = 'SE-' + Date.now().toString(36).slice(-4).toUpperCase() + Math.floor(10 + Math.random() * 90);
    el('radicado').value = radicado;
    el('autorizacion_fecha').value = new Date().toISOString();

    boton.disabled = true;
    boton.textContent = 'Enviando…';
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const v = (n: string) => (el(n)?.value || '').trim();
      const resumen = [v('servicio') || 'Consulta general', tipo === 'empresa' ? v('empresa') : 'Persona independiente', v('nombre'), v('correo'), v('telefono'), tipo === 'empresa' ? v('personas') + ' personas' : v('ciudad')].filter(Boolean).join(' · ');
      try { sessionStorage.setItem('seint_solicitud', JSON.stringify({ radicado, resumen, servicio: v('servicio') })); } catch { /* sin almacenamiento */ }
      location.href = '/cotizar/gracias';
    } catch {
      errEnvio.hidden = false;
      errEnvio.scrollIntoView({ block: 'center', behavior: 'smooth' });
      boton.disabled = false;
      boton.textContent = 'Enviar solicitud';
    }
  });
}
