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
    requisitos: ['Ser jefe, coordinador o responsable de un proceso donde se ejecuten trabajos en alturas.', 'Documento de identidad.'],
    temario: ['Marco normativo vigente y responsabilidades del empleador.', 'Programa de protección contra caídas.', 'Permiso de trabajo y análisis de trabajo seguro.', 'Roles del sistema y sus obligaciones.'],
    paraQuien: 'Para quien toma decisiones y gestiona los recursos administrativos que garantizan la seguridad en las tareas de alturas, supervisa que los trabajos de su área se planeen, autoricen y ejecuten conforme al programa de prevención contra caídas, y se coordina con el administrador del SG-SST en las medidas de control.',
    servicio: 'Alturas — Jefe de área (nivel administrativo)',
  },
  {
    id: 'rol-trabajador-autorizado', nombre: 'Trabajador autorizado', meta: '40 horas · Presencial (teoría y práctica)',
    requisitos: ['Certificado médico de aptitud para trabajo en alturas vigente.', 'Saber leer y escribir.', 'Documento de identidad y afiliación vigente a seguridad social.'],
    temario: ['Normatividad y conceptos de trabajo en alturas.', 'Elementos de protección personal y sistemas de detención de caídas.', 'Puntos de anclaje, conectores y líneas de vida.', 'Sistemas de acceso: escaleras, andamios, plataformas.', 'Planes de emergencia, autorrescate y rescate asistido.', 'Práctica en torre de entrenamiento.'],
    paraQuien: 'Para quien ejecuta tareas a más de dos metros de altura. Es el nivel base para trabajar.',
    servicio: 'Alturas — Trabajador autorizado',
  },
  {
    id: 'rol-coordinador', nombre: 'Coordinador de trabajo seguro en alturas', meta: '80 horas · Presencial',
    requisitos: ['Certificación vigente como trabajador autorizado.', 'Experiencia certificada en trabajo en alturas.', 'Certificado médico de aptitud vigente.'],
    temario: ['Diseño y administración del programa de protección contra caídas.', 'Identificación de peligros y evaluación del riesgo en la tarea.', 'Inspección y selección de equipos y sistemas de anclaje.', 'Permisos de trabajo, listas de chequeo y documentación.', 'Plan de rescate y atención de emergencias.'],
    paraQuien: 'Para quien autoriza los permisos, inspecciona equipos y responde por el programa en obra.',
    servicio: 'Alturas — Coordinador de trabajo seguro en alturas',
  },
  {
    id: 'rol-reentrenamiento', nombre: 'Reentrenamiento', meta: '20 horas · Presencial',
    requisitos: ['Certificado previo de trabajador autorizado o coordinador.', 'Certificado médico de aptitud vigente.'],
    temario: ['Actualización de la normatividad vigente.', 'Cambios en equipos y sistemas de protección.', 'Lecciones aprendidas de accidentalidad del sector.', 'Reentrenamiento práctico y evaluación.'],
    paraQuien: 'Obligatorio cada 18 meses para mantener vigente la certificación del trabajador.',
    servicio: 'Alturas — Reentrenamiento',
  },
  {
    id: 'rol-entrenador', nombre: 'Entrenador en trabajo seguro en alturas', meta: '120 horas · Presencial',
    requisitos: ['Certificación vigente como coordinador de trabajo seguro en alturas.', 'Experiencia certificada en formación o supervisión.', 'Certificado médico de aptitud vigente.'],
    temario: ['Pedagogía y didáctica aplicadas a la formación técnica.', 'Diseño de prácticas y evaluación por competencias.', 'Técnicas verticales avanzadas y rescate.', 'Gestión documental del proceso formativo.'],
    paraQuien: 'Para quien va a formar y evaluar a otros trabajadores en alturas.',
    servicio: 'Alturas — Entrenador en trabajo seguro en alturas',
  },
];

// Espacios confinados — Res. 0491 de 2020
export const ROLES_CONFINADOS: Rol[] = [
  {
    id: 'rol-ec-entrante', nombre: 'Trabajador entrante autorizado', meta: '20 horas · Presencial',
    requisitos: ['Certificado médico de aptitud para espacios confinados.', 'Documento de identidad y afiliación vigente a seguridad social.'],
    temario: ['Clasificación de espacios confinados y peligros asociados.', 'Atmósferas peligrosas: deficiencia de oxígeno, inflamabilidad, toxicidad.', 'Medición y monitoreo de gases.', 'Equipos de protección respiratoria y de acceso.', 'Permiso de entrada y comunicación con el vigía.', 'Práctica de entrada y salida.'],
    paraQuien: 'Para quien ingresa al espacio confinado a ejecutar la tarea.',
    servicio: 'Espacios confinados — Trabajador entrante autorizado',
  },
  {
    id: 'rol-ec-vigia', nombre: 'Vigía de espacios confinados', meta: '20 horas · Presencial',
    requisitos: ['Certificado médico de aptitud vigente.', 'Capacidad de comunicación permanente con el entrante.'],
    temario: ['Funciones y límites del vigía: nunca entra al espacio.', 'Control de acceso y registro de entrantes.', 'Monitoreo continuo de condiciones atmosféricas.', 'Activación del plan de rescate y llamada de emergencia.'],
    paraQuien: 'Para quien permanece afuera vigilando la entrada durante toda la operación.',
    servicio: 'Espacios confinados — Vigía',
  },
  {
    id: 'rol-ec-supervisor', nombre: 'Supervisor de entrada', meta: '40 horas · Presencial',
    requisitos: ['Formación previa como trabajador entrante autorizado.', 'Experiencia en operaciones de entrada.'],
    temario: ['Autorización y cierre del permiso de entrada.', 'Verificación de aislamiento, bloqueo y etiquetado.', 'Evaluación de condiciones atmosféricas y ventilación.', 'Coordinación del equipo de entrada y del rescate.'],
    paraQuien: 'Para quien firma el permiso y responde por la operación completa.',
    servicio: 'Espacios confinados — Supervisor de entrada',
  },
  {
    id: 'rol-ec-rescate', nombre: 'Equipo de rescate en espacios confinados', meta: '40 horas · Presencial',
    requisitos: ['Certificación vigente como trabajador entrante autorizado.', 'Condición física certificada por el médico ocupacional.'],
    temario: ['Planes de rescate sin entrada y con entrada.', 'Sistemas de izaje, trípodes y camillas de extracción.', 'Protección respiratoria de flujo continuo y autocontenida.', 'Primer respondiente y traslado de la víctima.', 'Simulacros.'],
    paraQuien: 'Para la brigada que debe poder sacar a una persona del espacio sin convertirse en segunda víctima.',
    servicio: 'Espacios confinados — Equipo de rescate',
  },
  {
    id: 'rol-ec-reentrenamiento', nombre: 'Reentrenamiento', meta: '12 horas · Presencial',
    requisitos: ['Certificación previa en cualquiera de los roles del sistema de entrada.'],
    temario: ['Actualización normativa.', 'Revisión de procedimientos y permisos.', 'Práctica de medición de gases y rescate.'],
    paraQuien: 'Para mantener vigente la certificación del personal que ya entró al sistema.',
    servicio: 'Espacios confinados — Reentrenamiento',
  },
];
