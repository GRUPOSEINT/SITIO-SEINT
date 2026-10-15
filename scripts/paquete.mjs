// Arma el paquete para subir al hosting: comprime dist/ (incluido .htaccess) en
// paquetes/sitio-seint-AAAA-MM-DD-HHMM.zip. Se usa con `npm run paquete`.
// Sin dependencias: escribe el .zip a mano con zlib (Node 22+).
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { deflateRawSync, crc32 } from 'node:zlib';

const raiz = 'dist';
const archivos = [];
(function recorrer(dir) {
  for (const nombre of readdirSync(dir).sort()) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) recorrer(ruta);
    else archivos.push(ruta);
  }
})(raiz);
if (!archivos.some((a) => a.endsWith('.htaccess'))) throw new Error('Falta dist/.htaccess: el paquete no sirve sin él.');

const ahora = new Date();
const dosTiempo = (ahora.getHours() << 11) | (ahora.getMinutes() << 5) | (ahora.getSeconds() >> 1);
const dosFecha = ((ahora.getFullYear() - 1980) << 9) | ((ahora.getMonth() + 1) << 5) | ahora.getDate();

const partes = [];
const central = [];
let desplazamiento = 0;
for (const ruta of archivos) {
  const nombre = Buffer.from(relative(raiz, ruta).split(sep).join('/'), 'utf8');
  const datos = readFileSync(ruta);
  const comprimido = deflateRawSync(datos, { level: 9 });
  const crc = crc32(datos);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6); // nombres en UTF-8
  local.writeUInt16LE(8, 8); // deflate
  local.writeUInt16LE(dosTiempo, 10);
  local.writeUInt16LE(dosFecha, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(comprimido.length, 18);
  local.writeUInt32LE(datos.length, 22);
  local.writeUInt16LE(nombre.length, 26);
  partes.push(local, nombre, comprimido);

  const cab = Buffer.alloc(46);
  cab.writeUInt32LE(0x02014b50, 0);
  cab.writeUInt16LE(0x031e, 4); // creado en Unix
  cab.writeUInt16LE(20, 6);
  cab.writeUInt16LE(0x0800, 8);
  cab.writeUInt16LE(8, 10);
  cab.writeUInt16LE(dosTiempo, 12);
  cab.writeUInt16LE(dosFecha, 14);
  cab.writeUInt32LE(crc, 16);
  cab.writeUInt32LE(comprimido.length, 20);
  cab.writeUInt32LE(datos.length, 24);
  cab.writeUInt16LE(nombre.length, 28);
  cab.writeUInt32LE((0o100644 << 16) >>> 0, 38); // permisos rw-r--r--
  cab.writeUInt32LE(desplazamiento, 42);
  central.push(cab, nombre);
  desplazamiento += local.length + nombre.length + comprimido.length;
}
const tamCentral = central.reduce((n, b) => n + b.length, 0);
const fin = Buffer.alloc(22);
fin.writeUInt32LE(0x06054b50, 0);
fin.writeUInt16LE(archivos.length, 8);
fin.writeUInt16LE(archivos.length, 10);
fin.writeUInt32LE(tamCentral, 12);
fin.writeUInt32LE(desplazamiento, 16);

const p = (n) => String(n).padStart(2, '0');
const salida = `paquetes/sitio-seint-${ahora.getFullYear()}-${p(ahora.getMonth() + 1)}-${p(ahora.getDate())}-${p(ahora.getHours())}${p(ahora.getMinutes())}.zip`;
mkdirSync('paquetes', { recursive: true });
writeFileSync(salida, Buffer.concat([...partes, ...central, fin]));
console.log(`Paquete listo: ${salida} (${archivos.length} archivos, ${(desplazamiento / 1024).toFixed(0)} KB)`);
