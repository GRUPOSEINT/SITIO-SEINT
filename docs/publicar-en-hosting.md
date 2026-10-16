# Cómo publicar el sitio en el hosting de SEINT

El sitio vive en el hosting de SEINT (panel Ferozo de DonWeb, el mismo de los 75 correos).
Panel: `seintsas.com:2082`. Cada versión del sitio es un archivo **.zip**: publicar es subirlo
a `public_html` y descomprimirlo.

**Nunca se toca:** la carpeta `mail`, la sección Email del panel, la zona DNS ni la versión de PHP.

---

## Paso 1. Copias de seguridad (antes de tocar nada)

1. **Copia completa del hosting:** *Mi Sitio Web → Copias de Seguridad* → generar una copia y
   descargarla al computador.
2. **Bases de datos viejas** (`eb000384_cursos` y `eb000384_csud`): *Bases de datos → MySQL*,
   botón de entrar (flecha) de cada una → se abre phpMyAdmin → pestaña **Exportar** →
   **Continuar**. Guarda los dos archivos `.sql` en el computador y en el Drive de SEINT.
   No se borran del hosting.

## Paso 2. Archivar los programas viejos que ya no se usan

En el *Administrador de archivos*, en la raíz (el mismo nivel de `public_html`, **no adentro**):

1. Crea la carpeta **`archivo-2026`**.
2. Mueve allí, desde `public_html`, estas carpetas:
   `cencosud`, `cursos`, `admin`, `demo`, `antigua`, `nuevaweb`, `Backups Sitio`.

Quedan guardadas en el servidor pero ya no se pueden abrir desde internet (más seguro).
Si alguien las necesita, se devuelven a `public_html`.

**No muevas:** `cgi-bin` (del servidor) ni `images` (logos que pueden estar en firmas de correo).

## Paso 3. Prueba en el subdominio

1. *Dominios → Subdominios* → crear **`nuevo`** (queda `nuevo.seintsas.com`). Anota su carpeta.
2. En el Administrador de archivos, entra a esa carpeta, sube el .zip y usa **Extraer**.
3. Revisa en `http://nuevo.seintsas.com`:
   - [ ] La portada abre y se ven las fotos.
   - [ ] `nuevo.seintsas.com/ips.html` lleva a Medicina ocupacional.
   - [ ] Una cotización de prueba muestra la página de gracias y **llega a contacto@seintsas.com**.
   - (Biofile da error aquí: es normal, solo tiene autorizado seintsas.com.)

## Paso 4. Lanzamiento

1. En la raíz, crea la carpeta **`sitio-anterior-muse`**.
2. Mueve allí, desde `public_html`, **el sitio viejo de Adobe Muse**:
   - todos los archivos `.html` (comunicados, contactanos, covid-19, cursos, examenes-tsa, index,
     ips, medico-ocupacional, nosotros, noticias, otros-servicios, paraclinicos,
     preguntas-frecuentes, programas-de-capacitacion)
   - las carpetas `css`, `scripts` y `assets`
   - `favicon.ico`, `muse_manifest.xml`, `sitemap.xml`
   - `.htaccess` y `.htaccess.BKP20201124075940`
3. En `public_html` deben quedar solo `cgi-bin` e `images`.
4. Sube el .zip a `public_html` y usa **Extraer**. Si pregunta si reemplaza, di que sí.
5. Borra el .zip de `public_html`.
6. Revisa que exista el archivo **`.htaccess`** nuevo (activa "mostrar archivos ocultos" si no se ve).

### Revisión (10 minutos)

- [ ] `seintsas.com` abre con el sitio nuevo y se ven las fotos.
- [ ] `seintsas.com/ips.html` lleva a Medicina ocupacional.
- [ ] `capacitacionenalturas.com` lleva a Trabajo en alturas y `seintsalud.com` a Medicina ocupacional.
- [ ] Una cotización de prueba llega a contacto@seintsas.com.
- [ ] "Ingreso empresas IPS" abre Biofile **y deja entrar** con un usuario real.
- [ ] "Consulte su certificado TSA/EC" e "Ingreso empresas TSA/EC" abren.
- [ ] El correo web abre en `mail.seintsas.com:2084`.

### Si algo sale mal

Borra lo que se descomprimió en `public_html` (excepto `cgi-bin` e `images`) y devuelve el
contenido de `sitio-anterior-muse`. El sitio viejo vuelve en el acto. El correo no se afecta.

---

## Después del lanzamiento

### Activar https
seintsas.com ya tiene certificado (Sectigo, vence el **25 de marzo de 2027**; hay que renovarlo
antes en DonWeb). En *Dominios → Dominios*, enciende **"Redirección https"** en la fila de
seintsas.com y comprueba que la página abre con candado.
**Hecho el 16-10-2026** (interruptor encendido y candado comprobado). Por eso las 5 líneas de
https del `.htaccess` siguen comentadas: no hacen falta y duplicarían la redirección.

### Subir a PHP 8 (una semana después)
Con los programas viejos archivados (Paso 2), el único PHP del sitio es `cotizar/enviar.php`, que
funciona de PHP 5.5 a 8.x. Antes del cambio: pantallazo de *Configuración de PHP*. Cambio: elegir
el PHP 8 más alto (sin marcar "versiones deprecadas") y guardar. Prueba: portada, cotización,
correo web. Para volver atrás: marcar "Habilitar versiones deprecadas", elegir PHP 5.5 y guardar.

## Las cotizaciones

- Cada cotización llega a **contacto@seintsas.com**. Con **Responder** le contestas al cliente.
- Además queda una copia en `public_html/cotizar/_privado/`, un archivo por mes:
  `cotizaciones-AAAA-MM.csv`, que se abre con Excel (descárgalo desde el Administrador de archivos).
  El hosting no deja escribir fuera de `public_html`, así que la carpeta está bloqueada para internet
  (comprobado el 15-10-2026: la dirección responde "Forbidden"). Es la prueba de que cada
  persona autorizó el tratamiento de sus datos. **No la borres ni la compartas.**
- Si un correo no llegó, la columna `correo_enviado` del CSV dice `no`.
