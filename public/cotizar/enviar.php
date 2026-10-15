<?php
// Recibe el formulario de /cotizar y lo envía por correo a SEINT.
// Reemplaza a Netlify Forms. Corre en el hosting de SEINT.
// Compatible con PHP 5.5 (la versión actual del hosting) hasta PHP 8.x: por eso no usa
// tipos escalares, `??`, funciones flecha ni random_int.
//
// - Valida lo mismo que el navegador (nunca confía solo en él).
// - Campo trampa `empresa_web`: si viene lleno es un robot; se responde "ok" y no se envía nada.
// - Límite de 5 envíos por IP cada 10 minutos.
// - Guarda una copia de cada solicitud (prueba de la autorización de datos, Ley 1581)
//   fuera de la carpeta pública cuando el hosting lo permite.

define('DESTINO', 'contacto@seintsas.com');
define('REMITENTE', 'contacto@seintsas.com');
define('MAX_ENVIOS', 5);
define('VENTANA_SEG', 600);

if (function_exists('mb_internal_encoding')) mb_internal_encoding('UTF-8');

$aceptar = isset($_SERVER['HTTP_ACCEPT']) ? $_SERVER['HTTP_ACCEPT'] : '';
$quiereJson = stripos($aceptar, 'application/json') !== false;

function responder($codigo, $datos, $json) {
    http_response_code($codigo);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    } elseif ($codigo === 200) {
        header('Location: /cotizar/gracias', true, 303);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo "No pudimos enviar tu solicitud. Escríbenos por WhatsApp al 316 335 2739.";
    }
    exit;
}

function largo($v) {
    return function_exists('mb_strlen') ? mb_strlen($v, 'UTF-8') : strlen(utf8_decode($v));
}

function recortar($v, $max) {
    if (function_exists('mb_substr')) return mb_substr($v, 0, $max, 'UTF-8');
    return preg_replace('/^(.{0,' . (int)$max . '}).*$/us', '$1', $v);
}

// Texto de una línea: sin saltos ni caracteres de control (evita inyectar cabeceras de correo).
function linea($nombre, $max = 200) {
    $v = isset($_POST[$nombre]) && is_string($_POST[$nombre]) ? $_POST[$nombre] : '';
    $v = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $v);
    if ($v === null) $v = '';
    return recortar(trim($v), $max);
}

$metodo = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
if ($metodo !== 'POST') {
    header('Allow: POST');
    responder(405, array('ok' => false), $quiereJson);
}

if (linea('empresa_web') !== '') {
    responder(200, array('ok' => true), $quiereJson);
}

$tipo = linea('tipo') === 'persona' ? 'persona' : 'empresa';
$d = array(
    'nombre'    => linea('nombre', 120),
    'empresa'   => linea('empresa', 160),
    'correo'    => linea('correo', 160),
    'telefono'  => linea('telefono', 40),
    'personas'  => linea('personas', 10),
    'ciudad'    => linea('ciudad', 80),
    'servicio'  => linea('servicio', 160),
    'radicado'  => linea('radicado', 20),
    'aut_fecha' => linea('autorizacion_fecha', 40),
    'aut_texto' => linea('autorizacion_texto', 600),
);

$errores = array();
if ($d['nombre'] === '') $errores[] = 'nombre';
if (!filter_var($d['correo'], FILTER_VALIDATE_EMAIL)) $errores[] = 'correo';
if (strlen(preg_replace('/\D/', '', $d['telefono'])) < 7) $errores[] = 'telefono';
if (linea('autoriza') !== 'si') $errores[] = 'autoriza';
if ($tipo === 'empresa') {
    if ($d['empresa'] === '') $errores[] = 'empresa';
    if ((int)$d['personas'] < 1) $errores[] = 'personas';
}
if ($errores) responder(422, array('ok' => false, 'errores' => $errores), $quiereJson);

if (!preg_match('/^SE-[A-Z0-9]{3,12}$/', $d['radicado'])) {
    $d['radicado'] = 'SE-' . strtoupper(substr(base_convert((string)time(), 10, 36), -4)) . mt_rand(10, 99);
}
if ($d['servicio'] === '') $d['servicio'] = 'Consulta general';

// Carpeta privada: fuera de la carpeta pública si se puede; si no, una protegida dentro.
function carpetaPrivada() {
    $publica = isset($_SERVER['DOCUMENT_ROOT']) && $_SERVER['DOCUMENT_ROOT'] !== '' ? $_SERVER['DOCUMENT_ROOT'] : dirname(__DIR__);
    $publica = rtrim($publica, '/');
    $opciones = array(dirname($publica) . '/seint-privado', __DIR__ . '/_privado');
    foreach ($opciones as $dir) {
        if (!is_dir($dir)) @mkdir($dir, 0700, true);
        if (is_dir($dir) && is_writable($dir)) {
            if (substr($dir, -9) === '/_privado' && !is_file($dir . '/.htaccess')) {
                @file_put_contents($dir . '/.htaccess', "Order deny,allow\nDeny from all\n");
            }
            return $dir;
        }
    }
    return null;
}
$privada = carpetaPrivada();

$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
if ($privada) {
    $archivoLimite = $privada . '/limite-' . hash('sha256', $ip) . '.json';
    $ahora = time();
    $marcas = is_file($archivoLimite) ? json_decode((string)file_get_contents($archivoLimite), true) : array();
    if (!is_array($marcas)) $marcas = array();
    $vigentes = array();
    foreach ($marcas as $t) {
        if (is_int($t) && $t > $ahora - VENTANA_SEG) $vigentes[] = $t;
    }
    if (count($vigentes) >= MAX_ENVIOS) responder(429, array('ok' => false), $quiereJson);
    $vigentes[] = $ahora;
    @file_put_contents($archivoLimite, json_encode($vigentes), LOCK_EX);
}

$fecha = new DateTime('now', new DateTimeZone('America/Bogota'));
$recibido = $fecha->format('Y-m-d H:i:s');
$esEmpresa = $tipo === 'empresa';

$filas = array(
    'Nombre y apellido' => $d['nombre'],
    'Tipo'              => $esEmpresa ? 'Empresa' : 'Persona independiente',
    'Empresa'           => $esEmpresa ? $d['empresa'] : '—',
    'Correo'            => $d['correo'],
    'Teléfono'          => $d['telefono'],
    'Personas'          => $esEmpresa ? $d['personas'] : '—',
    'Ciudad'            => $d['ciudad'] !== '' ? $d['ciudad'] : '—',
    'Servicio'          => $d['servicio'],
    'Radicado'          => $d['radicado'],
    'Recibido'          => $recibido . ' (hora Colombia)',
);
$cuerpo = "Nueva solicitud de cotización desde seintsas.com\n\n";
foreach ($filas as $k => $v) $cuerpo .= $k . ':' . str_repeat(' ', max(1, 20 - largo($k) - 1)) . $v . "\n";
$cuerpo .= "\nAutorización de tratamiento de datos: SÍ\n";
$cuerpo .= 'Fecha de la autorización: ' . ($d['aut_fecha'] !== '' ? $d['aut_fecha'] : $recibido) . "\n";
$cuerpo .= 'Texto aceptado: ' . $d['aut_texto'] . "\n";
$cuerpo .= "\nPara responder, usa \"Responder\": el correo va directo a " . $d['correo'] . ".\n";

$asunto = 'Cotización web ' . $d['radicado'] . ' · ' . $d['nombre'] . ' · ' . $d['servicio'];
$cabeceras = implode("\r\n", array(
    'From: =?UTF-8?B?' . base64_encode('Sitio web SEINT') . '?= <' . REMITENTE . '>',
    'Reply-To: ' . $d['correo'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: seintsas.com',
));

$enviado = @mail(DESTINO, '=?UTF-8?B?' . base64_encode($asunto) . '?=', $cuerpo, $cabeceras, '-f' . REMITENTE);

if ($privada) {
    $csv = $privada . '/cotizaciones-' . substr($recibido, 0, 7) . '.csv';
    $nuevo = !is_file($csv);
    $viejaMascara = umask(0077);
    $fh = @fopen($csv, 'a');
    umask($viejaMascara);
    if ($fh) {
        flock($fh, LOCK_EX);
        if ($nuevo) fputcsv($fh, array('recibido', 'radicado', 'tipo', 'nombre', 'empresa', 'correo', 'telefono', 'personas', 'ciudad', 'servicio', 'autorizacion_fecha', 'autorizacion_texto', 'ip', 'correo_enviado'));
        fputcsv($fh, array($recibido, $d['radicado'], $tipo, $d['nombre'], $d['empresa'], $d['correo'], $d['telefono'], $d['personas'], $d['ciudad'], $d['servicio'], $d['aut_fecha'], $d['aut_texto'], $ip, $enviado ? 'si' : 'no'));
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

if (!$enviado) responder(500, array('ok' => false), $quiereJson);
responder(200, array('ok' => true, 'radicado' => $d['radicado']), $quiereJson);
