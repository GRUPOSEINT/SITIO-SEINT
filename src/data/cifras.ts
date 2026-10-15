// Cifras de la portada con crecimiento estimado (decisión de gerencia, octubre 2026).
// Parten de la cifra real a la fecha `actualizado` de contadores.json y suman `por_dia_habil`
// por cada día de lunes a sábado transcurrido desde entonces. Se usa el piso del promedio que
// reporta SEINT (25 diarios) para no inflar la cifra. Cuando haya un dato real nuevo, se cambian
// la cifra y la fecha en contadores.json y el cálculo arranca de ahí.
// La misma cuenta se repite en el navegador (index.astro) para que la cifra avance sin publicar.

/** Días de lunes a sábado después de `desde` (AAAA-MM-DD) y hasta `hasta`, inclusive. */
export function diasHabiles(desde: string, hasta: Date): number {
  const [a, m, d] = desde.split('-').map(Number);
  const inicio = Date.UTC(a, m - 1, d);
  const fin = Date.UTC(hasta.getFullYear(), hasta.getMonth(), hasta.getDate());
  let dias = 0;
  for (let t = inicio + 86400000; t <= fin; t += 86400000) {
    if (new Date(t).getUTCDay() !== 0) dias++;
  }
  return dias;
}

/** Fecha de hoy en Bogotá. */
export function hoyBogota(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
}

export const cifra = (n: number) => n.toLocaleString('es-CO') + '+';
