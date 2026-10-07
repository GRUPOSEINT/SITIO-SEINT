# Sitio web Grupo Empresarial SEINT (seintsas.com)

Implementación del diseño hecho en Claude Design.
Astro 5, sitio estático. Netlify para hosting, formularios y autenticación del panel. Decap CMS para el blog.

## Comandos
```bash
npm install
npm run dev      # http://localhost:4321  (muestra también los borradores del blog)
npm run build    # genera dist/
npm run preview
```

## Páginas
| URL | Archivo |
|---|---|
| `/` | `src/pages/index.astro` |
| `/trabajo-en-alturas`, `/espacios-confinados` | `src/components/PaginaFormacion.astro` + roles en `src/data/roles.ts` |
| `/medicina-ocupacional` | `src/pages/medicina-ocupacional.astro` |
| `/cotizar`, `/cotizar/gracias` | `src/pages/cotizar/` + `src/scripts/cotizar.ts` |
| `/pagos` | Bre-B: QR y llave |
| `/politica-de-datos`, `/politica-de-cookies` | texto en `src/legal/*.html` |
| `/blog`, `/blog/[slug]` | artículos en `src/content/blog/*.md` |
| `/acceso-a-empresas` | iframe de Biofile (pestaña nueva) |
| `/admin` | panel Decap CMS (`public/admin/config.yml`) |

## Dónde se cambia cada cosa
- Teléfonos, correo, dirección, enlaces externos y servicios del formulario: `src/data/sitio.ts`.
  Si cambias los servicios, cambia también las opciones de `servicio` en `public/admin/config.yml`.
- Contadores de la portada: `src/data/contadores.json` (también editable desde `/admin`). Cifra fija, sin crecimiento simulado.
- Tokens de diseño: `src/styles/tokens/` (copiados del sistema de diseño SEINT). Temas `.theme-formacion` (azul) y `.theme-salud` (verde).
- Formatos: celular < 760 px, tablet 760–1099 px, computador ≥ 1100 px (`src/styles/global.css`).

## Funcionamiento
- **Cotizar:** todos los botones enlazan a `/cotizar?servicio=…` (y `&tipo=persona` para independientes). El formulario valida en línea, se envía a Netlify Forms (`cotizacion`) con antispam por campo trampa, y si el envío falla lo dice y ofrece WhatsApp sin borrar lo escrito.
- **Cookies:** la elección se guarda en `localStorage` (`seint_cookies_v1`). GA4 y Meta Pixel solo se cargan con su categoría aceptada **y** su ID configurado (`PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`). Mapas o videos se insertan con `src/components/Embed.astro`, que no carga nada hasta que la persona acepta "contenido incrustado".
- **Roles:** `<details>` nativo; el texto está en el HTML aunque esté cerrado. `#rol-…` en la URL abre ese rol; al imprimir se abren todos.
- **Blog:** `borrador: true` nunca se publica. Los 3 artículos del prototipo están como borradores.
- **Panel:** Netlify Identity + Git Gateway. Para usar GitHub en su lugar, cambia `backend` en `public/admin/config.yml` a `name: github` con `repo: usuario/repositorio`.

## Despliegue en Netlify
1. En Netlify: Add new site → Import from GitHub → `GRUPOSEINT/SITIO-SEINT`. La configuración la toma de `netlify.toml`.
2. Identity → Enable; Registration → Invite only; Services → Git Gateway → Enable. Invitar al usuario de SEINT.
3. Forms → activar la detección de formularios y la notificación por correo.
4. Variables de entorno opcionales: `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`.
5. Conectar el dominio seintsas.com y forzar HTTPS.

Guía para SEINT: `docs/como-publicar.md`.
