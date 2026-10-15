# Sitio web Grupo Empresarial SEINT (seintsas.com)

Implementación del diseño hecho en Claude Design.
Astro 5, sitio estático. Se publica en el hosting de SEINT (panel Ferozo de DonWeb, Apache + PHP).

## Comandos
```bash
npm install
npm run dev      # http://localhost:4321  (muestra también los borradores del blog)
npm run build    # genera dist/
npm run preview
npm run paquete  # build + paquetes/sitio-seint-AAAA-MM-DD-HHMM.zip para subir al hosting
```

## Páginas
| URL | Archivo |
|---|---|
| `/` | `src/pages/index.astro` |
| `/trabajo-en-alturas`, `/espacios-confinados` | `src/components/PaginaFormacion.astro` + roles en `src/data/roles.ts` |
| `/medicina-ocupacional` | `src/pages/medicina-ocupacional.astro` |
| `/cotizar`, `/cotizar/gracias` | `src/pages/cotizar/` + `src/scripts/cotizar.ts`; recibe `public/cotizar/enviar.php` |
| `/pagos` | Bre-B: QR y llave |
| `/politica-de-datos`, `/politica-de-cookies` | texto en `src/legal/*.html` |
| `/blog`, `/blog/[slug]` | artículos en `src/content/blog/*.md` |
| `/acceso-a-empresas` | iframe de Biofile (pestaña nueva) |

## Dónde se cambia cada cosa
- Teléfonos, correo, dirección, enlaces externos y servicios del formulario: `src/data/sitio.ts`.
- Contadores de la portada: `src/data/contadores.json`. Cifra fija, sin crecimiento simulado.
- Tokens de diseño: `src/styles/tokens/` (copiados del sistema de diseño SEINT). Temas `.theme-formacion` (azul) y `.theme-salud` (verde).
- Formatos: celular < 760 px, tablet 760–1099 px, computador ≥ 1100 px (`src/styles/global.css`).

## Funcionamiento
- **Cotizar:** todos los botones enlazan a `/cotizar?servicio=…` (y `&tipo=persona` para independientes). El formulario valida en línea y se envía a `/cotizar/enviar.php`, que vuelve a validar, descarta robots (campo trampa `empresa_web`), limita a 5 envíos por IP cada 10 minutos, manda el correo a contacto@seintsas.com (Responder va al cliente) y guarda una copia en CSV en `../seint-privado/` (fuera de la carpeta pública; si no se puede, en `cotizar/_privado/` protegida). Si el envío falla lo dice y ofrece WhatsApp sin borrar lo escrito.
- **Cookies:** la elección se guarda en `localStorage` (`seint_cookies_v1`). GA4 y Meta Pixel solo se cargan con su categoría aceptada **y** su ID configurado (`PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`). Mapas o videos se insertan con `src/components/Embed.astro`, que no carga nada hasta que la persona acepta "contenido incrustado".
- **Roles:** `<details>` nativo; el texto está en el HTML aunque esté cerrado. `#rol-…` en la URL abre ese rol; al imprimir se abren todos.
- **Blog:** `borrador: true` nunca se publica. Los 3 artículos del prototipo están como borradores.
- **Redirecciones y servidor:** `public/.htaccess` (redirecciones 301 del sitio anterior, páginas con y sin barra final, 404 propia, caché y compresión). Las reglas de https y de www → sin www están comentadas: se activan cuando el certificado del hosting esté verificado.
- **Blog:** los artículos son archivos `.md` en `src/content/blog/`. Ya no hay panel `/admin` (dependía de Netlify).

## Publicar en el hosting
1. `npm run paquete` (con `PUBLIC_GA4_ID` y `PUBLIC_META_PIXEL_ID` en `.env` si se usan).
2. Subir el .zip de `paquetes/` al panel Ferozo y descomprimirlo en la carpeta pública del dominio, reemplazando los archivos.
3. Comprobar la portada, `/cotizar` (un envío de prueba) y una dirección vieja (`/ips.html`).

Paso a paso para SEINT: `docs/publicar-en-hosting.md`.
