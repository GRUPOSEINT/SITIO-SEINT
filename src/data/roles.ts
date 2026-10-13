export type Rol = {
  id: string;
  nombre: string;
  meta: string;
  requisitos: string[];
  temario: string[];
  paraQuien: string;
  servicio: string;
};

// Alturas — Res. 4272 de 2021
export const ROLES_ALTURAS: Rol[] = [
  {
    id: 'rol-jefe-de-area', nombre: 'Nivel administrativo — Jefe de área', meta: '8 horas · Presencial o virtual',
    requisitos: ['Afiliación vigente a ARL.', 'Documento de identidad.'],
    temario: ['Marco normativo vigente y responsabilidades del empleador.', 'Programa de protección contra caídas.', 'Permiso de trabajo y análisis de trabajo seguro.', 'Roles del sistema y sus obligaciones.'],
    paraQuien: 'Para quien toma decisiones y gestiona los recursos administrativos que garantizan la seguridad en las tareas de alturas, supervisa que los trabajos de su área se planeen, autoricen y ejecuten conforme al programa de prevención contra caídas, y se coordina con el administrador del SG-SST en las medidas de control.',
    servicio: 'Alturas — Jefe de área (nivel administrativo)',
  },
  {
    id: 'rol-trabajador-autorizado', nombre: 'Trabajador autorizado', meta: '40 horas · Presencial (teoría y práctica)',
    requisitos: ['Certificado médico de aptitud para trabajo en alturas vigente.', 'Documento de identidad y afiliación vigente a seguridad social.'],
    temario: ['Normatividad y conceptos de trabajo en alturas.', 'Elementos de protección personal y sistemas de detención de caídas.', 'Puntos de anclaje, conectores y líneas de vida.', 'Sistemas de acceso: escaleras, andamios, plataformas.', 'Planes de emergencia, autorrescate y rescate asistido.', 'Práctica en torre de entrenamiento.'],
    paraQuien: 'Para quien ejecuta tareas a más de dos metros de altura. Es el nivel base para trabajar.',
    servicio: 'Alturas — Trabajador autorizado',
  },
  {
    id: 'rol-coordinador', nombre: 'Coordinador de trabajo seguro en alturas', meta: '80 horas · Presencial',
    requisitos: ['Certificado vigente de trabajo en alturas (trabajador autorizado o reentrenamiento).', 'Afiliación vigente a ARL.', 'Certificado médico de aptitud vigente.'],
    temario: ['Diseño y administración del programa de protección contra caídas.', 'Identificación de peligros y evaluación del riesgo en la tarea.', 'Inspección y selección de equipos y sistemas de anclaje.', 'Permisos de trabajo, listas de chequeo y documentación.', 'Plan de rescate y atención de emergencias.'],
    paraQuien: 'Para quien autoriza los permisos, inspecciona equipos y responde por el programa en obra.',
    servicio: 'Alturas — Coordinador de trabajo seguro en alturas',
  },
  {
    id: 'rol-reentrenamiento', nombre: 'Reentrenamiento', meta: '20 horas · Presencial',
    requisitos: ['Certificado previo de trabajador autorizado.', 'Certificado médico de aptitud vigente.', 'Afiliación vigente a ARL.'],
    temario: ['Actualización de la normatividad vigente.', 'Cambios en equipos y sistemas de protección.', 'Lecciones aprendidas de accidentalidad del sector.', 'Reentrenamiento práctico y evaluación.'],
    paraQuien: 'Obligatorio cada 18 meses para mantener vigente la certificación del trabajador.',
    servicio: 'Alturas — Reentrenamiento',
  },
];

// Espacios confinados — Res. 0491 de 2020
export const ROLES_CONFINADOS: Rol[] = [
  {
    id: 'rol-ec-entrante', nombre: 'Trabajador entrante', meta: '20 horas · Presencial',
    requisitos: ['Examen médico ocupacional vigente con énfasis en alturas y espacios confinados.', 'Copia del certificado de trabajo en alturas vigente.'],
    temario: ['Clasificación de espacios confinados y peligros asociados.', 'Atmósferas peligrosas: deficiencia de oxígeno, inflamabilidad, toxicidad.', 'Medición y monitoreo de gases.', 'Equipos de protección respiratoria y de acceso.', 'Permiso de entrada y comunicación con el vigía.', 'Práctica de entrada y salida.'],
    paraQuien: 'Para quien ingresa al espacio confinado a ejecutar la tarea.',
    servicio: 'Espacios confinados — Trabajador entrante',
  },
  {
    id: 'rol-ec-vigia', nombre: 'Vigía de espacios confinados', meta: '20 horas · Presencial',
    requisitos: ['Examen médico ocupacional vigente con énfasis en alturas y espacios confinados.', 'Certificado vigente de trabajo en alturas (trabajador autorizado o reentrenamiento).', 'Certificado vigente de trabajador entrante en espacios confinados.', 'Afiliación vigente a ARL.'],
    temario: ['Funciones y límites del vigía: nunca entra al espacio.', 'Control de acceso y registro de entrantes.', 'Monitoreo continuo de condiciones atmosféricas.', 'Activación del plan de rescate y llamada de emergencia.'],
    paraQuien: 'Para quien permanece afuera vigilando la entrada durante toda la operación.',
    servicio: 'Espacios confinados — Vigía',
  },
  {
    id: 'rol-ec-supervisor', nombre: 'Supervisor de entrada', meta: '40 horas · Presencial',
    requisitos: ['Examen médico ocupacional vigente con énfasis en alturas y espacios confinados.', 'Certificado vigente de trabajo en alturas (trabajador autorizado o reentrenamiento).', 'Certificados vigentes de trabajador entrante y de vigía en espacios confinados.', 'Afiliación vigente a ARL.'],
    temario: ['Autorización y cierre del permiso de entrada.', 'Verificación de aislamiento, bloqueo y etiquetado.', 'Evaluación de condiciones atmosféricas y ventilación.', 'Coordinación del equipo de entrada y del rescate.'],
    paraQuien: 'Para quien firma el permiso y responde por la operación completa.',
    servicio: 'Espacios confinados — Supervisor de entrada',
  },
  {
    id: 'rol-ec-rescate', nombre: 'Rescate en espacios confinados', meta: '40 horas · Presencial',
    requisitos: ['Examen médico ocupacional vigente con énfasis en alturas y espacios confinados.', 'Certificado vigente de trabajo en alturas (trabajador autorizado o reentrenamiento).', 'Certificado vigente de trabajador entrante en espacios confinados.', 'Afiliación vigente a ARL.'],
    temario: ['Planes de rescate sin entrada y con entrada.', 'Sistemas de izaje, trípodes y camillas de extracción.', 'Protección respiratoria de flujo continuo y autocontenida.', 'Primer respondiente y traslado de la víctima.', 'Simulacros.'],
    paraQuien: 'Para la brigada que debe poder sacar a una persona del espacio sin convertirse en segunda víctima.',
    servicio: 'Espacios confinados — Rescate',
  },
];
