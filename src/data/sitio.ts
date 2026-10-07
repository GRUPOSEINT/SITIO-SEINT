// Datos fijos del sitio. Nombre, dirección y teléfono deben coincidir letra por letra
// con el perfil de Google Business (ver docs/pendientes.md).
export const SITIO = {
  nombre: 'Grupo Empresarial SEINT',
  razonSocial: 'Servicios Especializados Integrales SAS (SEINT SAS)',
  nit: '900318591-2',
  url: 'https://seintsas.com',
  correo: 'info@seintsas.com',
  telComercial: '316 335 2739',
  telComercialE164: '+573163352739',
  telFijo: '(601) 702 1157',
  telFijoE164: '+576017021157',
  direccion: 'Cra. 69 No 24-65 sur, Bogotá',
  whatsapp: '573163352739',
};

export const LINKS = {
  certificado: 'https://seint.erpcrm.com.co/public/certificado/index.php',
  empresasTsa: 'https://seint.erpcrm.com.co/index.php',
  empresasIps: '/acceso-a-empresas',
  biofile: 'https://app.biofile.com.co/api/integracionweb/chaSGLbgfP7cBLDbxA9pRgcalblzX8pF',
  mintrabajo: 'https://app2.mintrabajo.gov.co/CentrosEntrenamiento/oferentes.aspx',
  instagram: 'https://www.instagram.com/gruposeint.co',
  tiktok: 'https://www.tiktok.com/@gruposeint.co',
  youtube: 'https://www.youtube.com/@gruposeint',
  linkedin: 'https://www.linkedin.com/company/grupo-empresarial-seint',
};

// Opciones del campo "Servicio de interés". Si cambias esta lista, cambia también
// las opciones del campo `servicio` en public/admin/config.yml.
export const SERVICIOS = [
  'Consulta general',
  'Formación — Rescate vertical',
  'Formación — Certificación de punto de anclaje',
  'Formación — Riesgo eléctrico',
  'Formación — Primeros auxilios',
  'Formación — Manejo de montacargas',
  'Formación — Andamiaje',
  'Formación — Administración del riesgo',
  'Formación — Seguridad vial organizacional',
  'Formación — Seguridad y Salud en el Trabajo',
  'Formación — Trabajo en caliente',
  'Formación — Inspección de equipos y EPP',
  'Formación — Ergonomía',
  'Formación — Autocuidado',
  'Formación — IPER',
  'Formación — Punto de anclaje',
  'Formación — Montacargas',
  'Formación — Seguridad vial',
  'Formación — SST',
  'Alturas — Jefe de área (nivel administrativo)',
  'Alturas — Trabajador autorizado',
  'Alturas — Coordinador de trabajo seguro en alturas',
  'Alturas — Reentrenamiento',
  'Alturas — Entrenador en trabajo seguro en alturas',
  'Alturas — Consulta de fechas',
  'Espacios confinados — Trabajador entrante autorizado',
  'Espacios confinados — Vigía',
  'Espacios confinados — Consulta de fechas',
  'Espacios confinados — Supervisor de entrada',
  'Espacios confinados — Equipo de rescate',
  'Espacios confinados — Reentrenamiento',
  'Alturas + espacios confinados (operación combinada)',
  'Medicina ocupacional — Exámenes',
  'Revisión de profesiograma por cargo',
  'Revisión de matriz por cargo',
  'Consultoría SST In-House',
  'EPP y dotaciones',
  'Otra línea de formación',
];

/** Enlace a /cotizar con el servicio precargado (equivale a data-cotizar del prototipo). */
export function cotizarHref(servicio?: string, tipo: 'empresa' | 'persona' = 'empresa') {
  const q = new URLSearchParams();
  if (servicio) q.set('servicio', servicio);
  if (tipo === 'persona') q.set('tipo', 'persona');
  const s = q.toString();
  return '/cotizar' + (s ? '?' + s : '');
}

export function waHref(mensaje = 'Hola, quiero pedir una cotización.') {
  return `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
