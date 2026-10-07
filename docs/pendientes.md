# Pendientes antes de publicar

Estado al terminar la implementación. Nada de esto se puede resolver desde el código.

## Contenido y validaciones
- [ ] **Abogado:** política de datos (datos de salud, Res. 2346/2007 y 1995/1999), cookies y SARLAFT.
- [ ] **Área médica:** contenido de Espacios confinados y condiciones de laboratorio (lista de exámenes de 3 horas).
- [x] **Correo único:** info@seintsas.com en todo el sitio, incluidas las políticas (confirmado por SEINT).
- [ ] **Fotos reales:** portada (`src/pages/index.astro`), laboratorio (`src/pages/medicina-ocupacional.astro`) y blog. Mientras falten se ve un recuadro con la descripción de la foto.
- [ ] **Listado de cursos:** el spec pide cerrarlo con SEINT antes de publicar la portada.
- [ ] **LinkedIn:** confirmar que `linkedin.com/company/grupo-empresarial-seint` es el usuario oficial.

## Integraciones
- [ ] **Biofile:** confirmar código vigente del plugin, usuarios activos y si el portal solo acepta el dominio seintsas.com (`LINKS.biofile` en `src/data/sitio.ts`).
- [ ] **Redirecciones 301:** cargadas en `public/_redirects` (11 páginas del sitemap y 3 PDF de cursos, más una regla general para otros PDF de `/assets/`). Al publicar, probar cada dirección vieja y confirmar los destinos de `cursos.html` y `programas-de-capacitacion.html`.
- [ ] **Google Business Profile:** URL del perfil y horario de atención. Agregarlos al bloque de datos estructurados en `src/layouts/Base.astro` (`sameAs` y `openingHours`). Nombre, dirección y teléfono deben coincidir letra por letra.
- [ ] **GA4 y Meta Pixel:** cargar `PUBLIC_GA4_ID` y `PUBLIC_META_PIXEL_ID` como variables de entorno en Netlify. Sin ellas no se carga ninguna herramienta.
- [ ] **Netlify Forms:** activar notificaciones por correo al buzón comercial (Forms → Form notifications). Las solicitudes quedan guardadas en Netlify aunque el correo falle.
- [ ] **Evidencia de la autorización de datos (Ley 1581):** cada envío guarda la fecha y hora (`autorizacion_fecha`) y el texto aceptado (`autorizacion_texto`). Verificar en el panel de Netlify si la IP del envío queda registrada; si no, agregar una función de Netlify que la guarde.
- [ ] **Netlify Identity:** el panel del blog usa Identity + Git Gateway. Antes de activarlo, confirmar en la documentación de Netlify que el servicio sigue disponible; la alternativa es el backend `github` de Decap (ver README).

## Pruebas
- [ ] Probar en teléfonos reales: formulario, banner de cookies, menú y flujos completos.
- [ ] PageSpeed móvil por encima de 80 (meta del spec).
- [ ] Hacer un pago real por Bre-B con el QR y la llave publicados.
