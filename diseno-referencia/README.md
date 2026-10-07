# Handoff: Sitio web Grupo Empresarial SEINT (seintsas.com)

## Overview
Sitio corporativo de Grupo Empresarial SEINT, Bogotá. Tiene dos unidades de negocio:
- **Centro de formación**: trabajo seguro en alturas (TSA) y espacios confinados (EC). Usa el tema azul.
- **IPS**: medicina ocupacional y laboratorio clínico. Usa el tema verde.

El sitio sirve para captar cotizaciones de empresas y personas, dar acceso a los portales externos (certificados, empresas, pagos), publicar políticas legales y alojar un blog.

## About the Design Files
Los archivos de `diseno/` son **referencias de diseño hechas en HTML**: prototipos que muestran cómo se ve y cómo se comporta el sitio. **No son código para copiar a producción.** La tarea es recrear este diseño en un proyecto real.

No existe un proyecto previo. Stack recomendado:
- **Astro**, para un sitio estático rápido y con buen SEO, o Next.js si se prefiere React.
- **Decap CMS** para el blog.
- **Netlify** para el hosting, los formularios y la autenticación del panel del CMS.
- El repositorio va en GitHub.

Para ver el diseño, abre `diseno/Sitio Grupo Seint.dc.html` en un navegador, desde un servidor local (por ejemplo `npx serve diseno`). `diseno/pruebas-responsive.html` muestra el celular (390 px) y la tablet (768 px) lado a lado.

## Fidelity
**Alta fidelidad (hi-fi).** Los colores, la tipografía, el espaciado, el texto y las interacciones son finales. Hay que recrearlos tal cual. Todo el texto en español es definitivo, salvo donde dice "Texto de ejemplo".

## Breakpoints (los "3 prototipos")
Es un solo sitio responsivo con tres comportamientos:

| Formato | Ancho | Cabecera |
|---|---|---|
| Celular | < 760 px | Botón hamburguesa (44×44) que abre el menú completo con todos los accesos |
| Tablet | 760–1099 px | Barra superior navy con botón **"Accesos ▾"** (menú desplegable de 260 px); nav horizontal |
| Computador | ≥ 1100 px | Barra superior navy con los 4 accesos visibles en línea; nav horizontal |

Reglas de responsividad:
- Contenedor máximo de 1200 px (`--container-max`). Márgenes laterales `clamp(20px,5vw,32px)`.
- Las rejillas usan `repeat(auto-fit,minmax(min(300px,100%),1fr))`.
- Tamaño táctil mínimo de 44 px.
- En la portada, los 3 botones ("Cotizar", "WhatsApp", "Resultados de laboratorio en 3 horas") van en una sola fila de 44 px en todos los formatos.
- La etiqueta "Centro de formación · IPS · Laboratorio clínico propio" va centrada en celular y alineada a la izquierda en tablet y computador.
- **Medicina ocupacional:** la tarjeta de condiciones de laboratorio tiene un layout distinto en tablet (ocupa el ancho completo bajo la foto) y en computador (texto y tarjeta a la izquierda, foto a la derecha). Revisa el prototipo en ambos anchos.

## Screens / Views
Todas están en `Sitio Grupo Seint.dc.html` y se navegan con el estado `page`. En producción, cada una debe ser una URL real:

| page | URL sugerida | Contenido |
|---|---|---|
| home | `/` | Portada: hero navy, contadores, servicios por unidad, credenciales, CTA |
| alturas | `/trabajo-en-alturas` | Tema azul. Cursos, roles, "¿Trabajas de forma independiente?", "Fechas disponibles", enlace cruzado a Espacios confinados |
| confinados | `/espacios-confinados` | Tema azul, misma estructura que Alturas, enlace cruzado a Alturas |
| ips | `/medicina-ocupacional` | Tema verde. Exámenes, profesiograma, laboratorio (frotis de garganta KOH, drogas en orina, embarazo), tiempos de resultado |
| cotizar | `/cotizar` | Formulario de cotización (empresa / persona) |
| gracias | `/cotizar/gracias` | Confirmación "Tu solicitud llegó", respuesta en menos de 4 horas hábiles |
| breb | `/pagos` | Pagos Bre-B: QR (`assets/qr-breb.png`) y llave |
| datos | `/politica-de-datos` | Política de tratamiento de datos personales (incluye datos de salud y SARLAFT) |
| cookies | `/politica-de-cookies` | Política de cookies |
| blog | `/blog` y `/blog/[slug]` | Listado con filtros y vista de artículo |
| — | `/acceso-a-empresas` | `acceso-a-empresas.html`: logo y el iframe de Biofile |

### Cabecera (todas las páginas)
1. **Barra de accesos** (fondo navy `#0D145C`, texto blanco, 13–14 px):
   - "Consulte su certificado TSA/EC": https://seint.erpcrm.com.co/public/certificado/index.php (pestaña nueva)
   - "Ingreso empresas TSA/EC": https://seint.erpcrm.com.co/index.php (pestaña nueva)
   - "Ingreso empresas IPS": `/acceso-a-empresas` (pestaña nueva)
   - "PAGOS BRE-B - LLAVE": `/pagos`, en mayúsculas, color teal-300, peso 700
2. **Header sticky:** blanco al 92 % con `backdrop-filter: blur(10px)`, borde inferior de 1 px `gray-200`. A la izquierda el Lockup (40 px de alto, 34 px en celular). Nav: Trabajo en alturas · Espacios confinados · Medicina ocupacional · **Blog**. Botón "Cotiza en 4 h".

### Pie de página
Fondo navy con 4 columnas:
- **Marca:** logo blanco y credenciales: "Ministerio del Trabajo · Aprobación Ministerio (búscanos como SEINT)", enlazado a https://app2.mintrabajo.gov.co/CentrosEntrenamiento/oferentes.aspx; ICONTEC NTC 6072; Licencia SSO No. 10728.
- **Servicios:** incluye Blog.
- **Contacto:** Comercial 316 335 2739 · Fijo (601) 702 1157 · info@seintsas.com · Cra. 69 No 24-65 sur, Bogotá.
- **Trámites y redes.**

### Blog
- Encabezado: overline "BLOG SEINT", H1 y bajada.
- Filtros en píldora: Todos · Formación · Salud ocupacional. El activo va en navy con texto blanco.
- Tarjetas: foto 16:9, categoría · fecha, título (20 px / 700), resumen y "Leer artículo →". Cada tarjeta lleva el tema de su categoría: azul para Formación, verde para Salud ocupacional.
- Artículo: ancho máximo de 720 px, "← Volver al blog", categoría · fecha, H1, foto 16:9, cuerpo a 17 px / 1.7 y caja final "¿Necesitas este servicio para tu empresa?" con el botón "Cotiza en 4 h", que precarga el servicio del artículo.
- Los 3 artículos del prototipo son de ejemplo. No los publiques.

## Interactions & Behavior
- **Botones de cotizar** (`data-cotizar="Servicio"`): llevan a `/cotizar` con el servicio ya elegido.
- **Formulario de cotización:** campos nombre, empresa (solo en modo empresa), correo, teléfono, número de personas, ciudad, servicio y la casilla de autorización de datos (obligatoria, enlaza a la política). Valida los obligatorios y el formato de correo y teléfono, y muestra los errores en línea. Al enviar, va a la página de gracias. También hay un botón de WhatsApp con un mensaje precargado ("Hola, quiero cotizar: {servicio}").
- **Contadores dinámicos** (trabajadores certificados 100.000+ y pacientes atendidos 60.500+): en el prototipo crecen entre 25 y 30 por día desde el 29 de septiembre de 2026, con una semilla fija (función `contador`). **En producción hay que conectarlos a datos reales** (un endpoint o un archivo JSON que actualice SEINT). Si no hay datos, se deja la cifra fija.
- **Banner de cookies:** se muestra hasta que la persona elige. Opciones: Aceptar todas, Rechazar o Configurar. Configurar abre interruptores para analíticas, marketing y contenido incrustado. La elección se guarda en `localStorage` con la clave `seint_cookies_v1`. **En producción debe bloquear de verdad:** GA4 y Meta Pixel solo se cargan con el consentimiento de su categoría, y los embeds (Google Maps, YouTube) solo con "contenido incrustado". Si no hay consentimiento, se muestra un recuadro con un botón para cargarlos.
- **Menú "Accesos" (tablet):** se abre y se cierra con el botón y se cierra al tocar fuera o al navegar.
- **Menú celular:** pantalla completa bajo el header con scroll interno y se cierra al navegar.
- **Transiciones:** 120 ms para color, 180 ms por defecto, `cubic-bezier(.2,.7,.3,1)`. Al pulsar un botón, se reduce a escala .98. No hay animaciones de entrada.

## Integraciones externas
| Qué | Cómo |
|---|---|
| Biofile (Ingreso empresas IPS) | `/acceso-a-empresas` con `<iframe width="100%" height="1200px" src="https://app.biofile.com.co/api/integracionweb/chaSGLbgfP7cBLDbxA9pRgcalblzX8pF" frameborder="0">`. ⚠️ El ingreso falló en pruebas, incluso directamente en Biofile. SEINT debe confirmar con Biofile el código vigente, los usuarios activos y si el portal está restringido al dominio seintsas.com. |
| ERP CRM (TSA/EC) | Enlaces externos a las URL de arriba |
| Ministerio del Trabajo | Enlace externo a la URL de arriba |
| Formularios | Netlify Forms, o un endpoint que envíe el correo a info@seintsas.com. Guardar la autorización de datos (fecha, hora e IP) como evidencia de la Ley 1581 de 2012 |
| WhatsApp | `https://wa.me/573163352739?text=...` |
| Google Business Profile | Datos estructurados schema.org (`MedicalClinic` y `EducationalOrganization`) con nombre, dirección, teléfono, horario y `sameAs` con la URL del perfil. Nombre, dirección y teléfono deben coincidir exactamente con el perfil |

## Blog con CMS (instrucción principal)
SEINT debe poder publicar sin tocar código.
1. Instalar **Decap CMS** en `/admin`, con autenticación por Netlify Identity o GitHub.
2. Crear la colección `blog`, con un archivo Markdown por artículo en `src/content/blog/`. Campos:
   - `titulo` (string)
   - `slug` (string, se genera a partir del título)
   - `categoria` (select: Formación | Salud ocupacional)
   - `fecha` (date)
   - `foto` (image, 16:9)
   - `resumen` (text, máximo 160 caracteres)
   - `cuerpo` (markdown)
   - `servicio` (select con los servicios del formulario de cotización)
   - `borrador` (boolean)
3. La categoría define el tema: Formación usa `.theme-formacion` (azul) y Salud ocupacional usa `.theme-salud` (verde).
4. Generar `/blog` (listado con filtros, más reciente primero) y `/blog/[slug]` con el diseño del prototipo.
5. Cada artículo lleva SEO completo: `<title>`, meta description tomada del resumen, Open Graph con la foto y schema `Article`.
6. Activar el flujo editorial de Decap (borrador → revisión → publicado).
7. Dejar en `docs/como-publicar.md` una guía corta para SEINT: cómo entrar a /admin, cómo crear un artículo y cómo publicarlo.

## Design Tokens
Viven en `diseno/_ds/.../tokens/*.css`. Cópialos al proyecto como variables CSS.
- **Colores de marca:** teal `#00C2B6` (teal-400), teal deep `#00A69C` (teal-500), navy `#0D145C` (navy-500), ink `#010B13`. Las rampas derivadas están en `colors.css`.
- **Temas** (`themes.css`): `.theme-formacion` (azul) y `.theme-salud` (verde). Los componentes leen alias como `--accent`, `--text-accent`, `--surface-brand` y `--surface-brand-soft`.
- **Tipografía:** solo **Exo** (Google Fonts, pesos 300–800). Cuerpo a 16–18 px / 1.6. Titulares en 700–800, interlineado 1.04–1.1, tracking −0.01em. Overlines a 12 px en mayúsculas, tracking .18em, peso 700, con subrayado teal de 2 px.
- **Radios:** cards 16 px, campos 10 px, botones y badges 999 px.
- **Sombras:** reposo `0 4px 14px rgba(13,20,92,.08)`; elevada `0 14px 40px rgba(13,20,92,.12)`.
- **Bordes:** 1 px `gray-200`. Reglas de 3 px en teal.
- **Contraste:** el texto de cuerpo sobre color siempre va en blanco al 100 %. No uses texto teal-400 sobre blanco.

## Assets
`diseno/assets/`:
- Lockups: degradado (fondo blanco), white, navy y teal.
- Isotipos y el arte del endoso de 17 años (`endoso-17.png`).
- QR de Bre-B (`qr-breb.png`).

Iconos: Lucide 0.462 con trazo de 2 px. Es un sustituto del set propio, que no existe.

**Faltan fotos reales.** Están marcadas como espacios para imagen en `home-a-hero`, `home-b-formacion`, `home-b-ips`, `ips-lab` y en las fotos del blog. Usar fotos frías y clínicas (obra, EPP, consultorio), siempre con el texto sobre un panel sólido.

## Pendientes antes de publicar
- [ ] Validación de un abogado: política de datos (sobre todo datos de salud, Res. 2346/2007 y 1995/1999), cookies y SARLAFT.
- [ ] Validación médica: contenido de Espacios confinados y condiciones de laboratorio.
- [ ] Quitar el aviso amarillo "Texto de ejemplo" de Medicina ocupacional.
- [ ] Confirmar con Biofile el código y los usuarios.
- [ ] Usuario oficial de LinkedIn (hoy está como enlace pendiente).
- [ ] Unificar el correo de contacto: las políticas dicen operacioneseint@gmail.com y el sitio info@seintsas.com.
- [ ] URL del Google Business Profile y horarios.
- [ ] Probar en teléfonos reales: formularios, banner de cookies y flujos completos.

## Files
- `diseno/Sitio Grupo Seint.dc.html`: el sitio completo. La plantilla está en `<x-dc>` y la lógica en la clase `Component`; ahí están los datos del blog, los contadores, las cookies y la validación.
- `diseno/acceso-a-empresas.html`: página del iframe de Biofile.
- `diseno/pruebas-responsive.html`: vista de celular y tablet.
- `diseno/_ds/`: sistema de diseño SEINT (tokens CSS y componentes).
- `diseno/assets/`: logos y QR.
- `diseno/support.js` e `image-slot.js`: solo sirven para ver el prototipo. No van a producción.

---

## Paso a paso para SEINT (sin conocimientos técnicos)
1. Descarga este paquete (.zip) y descomprímelo en una carpeta, por ejemplo `Documentos/seint-web`.
2. Abre Claude Code en esa carpeta.
3. Escribe: *"Lee README.md y construye el sitio siguiendo sus instrucciones. Empieza por la portada y muéstrame el avance."*
4. Revisa cada página con Claude Code y pide los ajustes que necesites.
5. Cuando todo esté bien, pide: *"Sube el proyecto a GitHub y publícalo en Netlify."* Claude Code te guiará para crear las cuentas.
6. Pide: *"Conecta el dominio seintsas.com."* Necesitarás acceso al proveedor donde compraste el dominio.
7. Pide: *"Activa el panel del blog en /admin y crea mi usuario."*
8. Desde ese momento publicas los artículos tú misma en `seintsas.com/admin`, sin Claude.
