# Cómo publicar el sitio en el hosting de SEINT

El sitio vive en el hosting de SEINT (panel Ferozo de DonWeb, el mismo servidor del correo).
Cada versión del sitio es un archivo **.zip**. Publicar es subir ese .zip y descomprimirlo.

## Antes de la primera publicación (una sola vez)

1. **Copia de seguridad del sitio viejo.** En el administrador de archivos del panel, entra a la
   carpeta pública del dominio (suele llamarse `public_html`). Crea una carpeta nueva llamada
   `sitio-anterior` **fuera** de la carpeta pública y mueve allí todo el contenido viejo.
   No borres nada: es la vuelta atrás si algo falla.
2. **Prueba en un subdominio.** Crea en el panel el subdominio `nuevo.seintsas.com`, sube y
   descomprime el .zip en su carpeta y revisa todo ahí antes de tocar la página principal.
3. **No toques** los correos, las cuentas de correo ni nada de la zona DNS.

## Publicar una versión

1. Recibe el .zip (`sitio-seint-AAAA-MM-DD-HHMM.zip`).
2. En el administrador de archivos, entra a la carpeta pública del dominio.
3. Sube el .zip y usa la opción **Extraer / Descomprimir** sobre él. Si pregunta si reemplaza
   archivos, di que **sí**.
4. Borra el .zip de la carpeta pública (ya no hace falta allí).
5. Revisa que exista el archivo **`.htaccess`** (empieza con punto; si no lo ves, activa
   "mostrar archivos ocultos"). Sin él no funcionan las direcciones viejas.

## Revisión después de publicar (5 minutos)

- [ ] La portada abre y se ven las fotos.
- [ ] `seintsas.com/ips.html` lleva a Medicina ocupacional (dirección vieja).
- [ ] Una cotización de prueba en `/cotizar` llega a contacto@seintsas.com.
- [ ] "Ingreso empresas IPS" abre el portal de Biofile y deja entrar.
- [ ] "Consulte su certificado TSA/EC" abre la consulta de certificados.

## Las cotizaciones

- Cada cotización llega por correo a **contacto@seintsas.com**. Con **Responder** le contestas al
  cliente directamente.
- Además queda una copia en el servidor, en la carpeta `seint-privado` (fuera de la carpeta
  pública), un archivo por mes: `cotizaciones-AAAA-MM.csv`. Se abre con Excel. Es la prueba de
  que cada persona autorizó el tratamiento de sus datos. **No la borres ni la compartas.**
- Si un correo no llegó, la columna `correo_enviado` del CSV dice `no`.

## Activar https y quitar el www (una vez, cuando el candado funcione)

Cuando `https://seintsas.com` abra con candado, en el archivo `.htaccess` quita el `#` del
inicio de las 5 líneas del bloque "https y dominio sin www". Desde ese momento todo el tráfico
va a `https://seintsas.com`. Si después de activarlas el sitio no abre ("demasiadas
redirecciones"), vuelve a poner los `#`.

## Si algo sale mal

Mueve el contenido de `sitio-anterior` de vuelta a la carpeta pública. El sitio viejo vuelve
en el acto. El correo no se afecta en ningún caso.
