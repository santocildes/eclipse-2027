// js/evento.js
//
// DEFINICIÓN DEL EVENTO. Único sitio donde vive "de qué eclipse habla esta app".
// Todo lo demás lo lee de aquí: fechas, encuadres, husos horarios y los rasgos
// que cambian el mensaje.
//
// ─────────────────────────────────────────────────────────────────────────────
// EL ECLIPSE DEL 2 DE AGOSTO DE 2027 NO SE PARECE AL DE 2026
//
// En 2026 el Sol estaba entre 1,5° y 12° sobre el horizonte, al ocaso: el
// relieve decidía si veías el eclipse o no, y esa era la pregunta central.
//
// Aquí el Sol estará entre 37° y 46°, a media mañana. Para que algo lo tape
// tendría que elevarse 780 m por cada kilómetro de distancia — un acantilado
// pegado a ti. El relieve deja de ser el problema.
//
// A cambio aparecen preguntas que en 2026 no existían:
//   · La franja roza España por el sur y la duración cae en picado hacia el
//     borde: Tarifa 4m41s, Málaga 1m47s, Granada ni siquiera es total (99,2%).
//   · Cruzando el Estrecho se gana muchísimo: Ceuta 4m51s, Melilla 4m40s.
//   · Es agosto en Andalucía a las 10:47: el riesgo meteorológico no son los
//     frentes sino la calima sahariana y la niebla costera de la mañana.
//
// Por eso esta app es un PLANIFICADOR DE VIAJE y no un medidor de horizontes.
// ─────────────────────────────────────────────────────────────────────────────

export const EVENTO = {
  id: 'es-2027-08-02',
  fecha: '2027-08-02',
  titulo: 'Eclipse total de Sol',
  fechaLarga: '2 de agosto de 2027',

  // Ventana en la que la umbra toca la Tierra (UTC). Comprobado con el motor:
  // de 08:26 a 11:48, tres horas y veinte minutos desde el Atlántico hasta el
  // Índico. Se usa para animaciones y para acotar búsquedas.
  sombraDesde: '2027-08-02T08:20:00Z',
  sombraHasta: '2027-08-02T11:55:00Z',

  // Momento de referencia para pedir meteorología (hora en punto más cercana
  // al paso por el sur peninsular).
  horaMeteoUTC: '2027-08-02T09:00',

  // Encuadre inicial: el Estrecho, que es donde se juega la decisión.
  vista: { center: [-5.4, 36.2], zoom: 6.6 },

  // Recuadro que abarca la franja de interés para este producto: sur de la
  // Península, Estrecho y norte de Marruecos.
  ambito: { west: -9.5, south: 33.5, east: 1.5, north: 39.5 },

  // ΔT = TT − UT1 en segundos. Valor con el que NASA e IGN publican las tablas
  // de este eclipse; usarlo hace que nuestros tiempos coincidan con los que el
  // usuario encontrará si los contrasta.
  deltaT: 72.6,

  // Rasgos que la interfaz consulta para decidir qué contar.
  rasgos: {
    // Con el Sol tan alto, el relieve pasa a segundo plano: la comprobación de
    // horizonte sigue disponible pero deja de ser la función principal.
    solAlto: true,
    alturaSolTipica: 40,
    // El eclipse cruza fronteras y los husos difieren: España va en UTC+2 en
    // agosto y Marruecos en UTC+1.
    multipais: true,
  },
};

// ── Husos horarios ───────────────────────────────────────────────────────────
//
// Un planificador que compara Tarifa con Tánger tiene que dar cada hora en su
// huso, o la comparación engaña por una hora entera. Se resuelve por recuadros
// geográficos: no hace falta precisión de frontera porque los países implicados
// están bien separados en longitud y latitud a esta escala.

// Los recuadros solo tienen que acertar la ZONA HORARIA, no el país: el nombre
// del país sale del propio destino. Eso simplifica mucho, porque Marruecos,
// Argelia y Túnez comparten UTC+1 y sus fronteras no hace falta separarlas.
//
// Las fronteras que SÍ importan son las de cambio de huso:
//   · Túnez / Libia  → lon 11,5   (UTC+1 → UTC+2)
//   · Libia / Egipto → lon 25     (UTC+2 → UTC+3)
//
// Se usan nombres IANA y no desfases fijos porque EGIPTO REINSTAURÓ EL HORARIO
// DE VERANO en 2023: el 2 de agosto de 2027 está en UTC+3, no en UTC+2.
// Codificar «Egipto = +2» habría desplazado una hora todos sus destinos.
// Comprobado: el máximo son las 10:00 en Marruecos, 11:00 en España y 12:00 en
// Egipto y Arabia. Tres husos en un mismo eclipse.
// Los recuadros solo tienen que acertar la ZONA HORARIA, no el país: el nombre
// del país sale del propio destino.
//
// EL ORDEN IMPORTA y no es evidente. Argelia es estrecha por el norte y muy
// ancha por el Sáhara: un único recuadro que la cubra entera llega hasta
// longitud −8, y se traga el sur de España. Con Argelia antes que España,
// Tarifa salía en UTC+1 — una hora de error en la ubicación por defecto de la
// app. Por eso Iberia va PRIMERO y los países africanos se parten en un
// recuadro norte estrecho y otro sur ancho.
//
// El Estrecho es el punto delicado: Tarifa está a 36,01°N y el extremo norte de
// Marruecos a 35,93°N. Ocho centésimas de grado. Ceuta y Melilla, que son
// españolas pero están en África, se resuelven con recuadros propios delante.
//
// Se usan nombres IANA y no desfases fijos porque EGIPTO REINSTAURÓ EL HORARIO
// DE VERANO en 2023: el 2 de agosto de 2027 está en UTC+3, no en UTC+2.
// Comprobado: el máximo son las 10:47 en Tarifa, 09:47 en Tánger y 13:05 en
// Luxor. Tres husos en un mismo eclipse.
const HUSOS = [
  // ── Enclaves, primero: caen dentro de recuadros mayores ──
  { zona: 'Europe/Madrid', pais: 'Ceuta', caja: [-5.42, 35.86, -5.25, 35.94] },
  { zona: 'Europe/Madrid', pais: 'Melilla', caja: [-3.00, 35.24, -2.88, 35.35] },
  { zona: 'Europe/Gibraltar', pais: 'Gibraltar', caja: [-5.37, 36.10, -5.33, 36.16] },

  // ── Iberia, antes que África: el sur peninsular queda dentro del recuadro
  //    sahariano de Argelia si se comprueba después ──
  { zona: 'Atlantic/Canary', pais: 'Canarias', caja: [-18.2, 27.5, -13.3, 29.5] },
  { zona: 'Europe/Lisbon', pais: 'Portugal', caja: [-9.6, 36.9, -6.19, 42.2] },
  { zona: 'Europe/Madrid', pais: 'España', caja: [-9.4, 35.95, 4.4, 43.9] },

  // ── UTC+3 ──
  { zona: 'Asia/Riyadh', pais: 'Arabia Saudí', caja: [34.4, 16.0, 55.7, 32.2] },
  { zona: 'Asia/Aden', pais: 'Yemen', caja: [42.5, 12.1, 54.6, 19.0] },
  { zona: 'Africa/Djibouti', pais: 'Yibuti', caja: [41.7, 10.9, 43.5, 12.8] },
  { zona: 'Africa/Mogadishu', pais: 'Somalia', caja: [40.9, -1.7, 51.5, 12.0] },
  { zona: 'Africa/Asmara', pais: 'Eritrea', caja: [36.4, 12.3, 43.2, 18.1] },
  { zona: 'Africa/Khartoum', pais: 'Sudán', caja: [21.8, 8.6, 38.6, 22.3] },
  { zona: 'Africa/Cairo', pais: 'Egipto', caja: [24.6, 21.9, 37.0, 31.7] },

  // ── UTC+2 ──
  { zona: 'Africa/Tripoli', pais: 'Libia', caja: [9.3, 19.4, 25.2, 33.3] },

  // ── UTC+1. Túnez antes que Argelia (su recuadro la solapa), y cada país
  //    partido en norte estrecho y sur ancho para respetar su forma real ──
  { zona: 'Africa/Tunis', pais: 'Túnez', caja: [7.5, 30.1, 11.6, 37.7] },
  { zona: 'Africa/Algiers', pais: 'Argelia', caja: [-2.3, 32.0, 9.0, 37.2] },
  { zona: 'Africa/Algiers', pais: 'Argelia', caja: [-8.7, 18.9, 12.0, 32.0] },
  { zona: 'Africa/Casablanca', pais: 'Marruecos', caja: [-13.3, 32.0, -0.9, 36.0] },
  { zona: 'Africa/Casablanca', pais: 'Marruecos', caja: [-17.2, 20.7, -8.6, 32.0] },
];

/**
 * Zona horaria EXACTA por país o provincia.
 *
 * Los destinos ya saben en qué país están, así que no hay por qué deducirlo de
 * su posición. Los recuadros geográficos de arriba quedan solo como respaldo
 * para puntos arbitrarios —cuando el usuario toca el mapa— donde no hay dato de
 * país al que agarrarse.
 *
 * Se recurrió a esta tabla porque ningún rectángulo describe bien a Argelia ni
 * a Marruecos: Argelia es estrecha por el norte y enorme por el Sáhara, y las
 * fronteras del Magreb no siguen paralelos. Seis destinos salían mal.
 */
const ZONA_POR_PAIS = {
  // España y sus provincias, tal y como figuran en la lista de destinos.
  'Cádiz': 'Europe/Madrid', 'Málaga': 'Europe/Madrid', 'Granada': 'Europe/Madrid',
  'Almería': 'Europe/Madrid', 'Sevilla': 'Europe/Madrid', 'Córdoba': 'Europe/Madrid',
  'Huelva': 'Europe/Madrid', 'Jaén': 'Europe/Madrid', 'Madrid': 'Europe/Madrid',
  'Barcelona': 'Europe/Madrid', 'Valencia': 'Europe/Madrid', 'Murcia': 'Europe/Madrid',
  'Alicante': 'Europe/Madrid', 'Badajoz': 'Europe/Madrid', 'Illes Balears': 'Europe/Madrid',
  'España': 'Europe/Madrid', 'Ceuta': 'Europe/Madrid', 'Melilla': 'Europe/Madrid',
  'Gibraltar': 'Europe/Gibraltar', 'Portugal': 'Europe/Lisbon', 'Canarias': 'Atlantic/Canary',
  // Norte de África y Oriente Próximo.
  'Marruecos': 'Africa/Casablanca', 'Argelia': 'Africa/Algiers', 'Túnez': 'Africa/Tunis',
  'Libia': 'Africa/Tripoli', 'Egipto': 'Africa/Cairo',
  'Arabia Saudí': 'Asia/Riyadh', 'Yemen': 'Asia/Aden', 'Somalia': 'Africa/Mogadishu',
  'Sudán': 'Africa/Khartoum', 'Yibuti': 'Africa/Djibouti', 'Eritrea': 'Africa/Asmara',
};

/**
 * Huso horario y país de un punto.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {string} [pais] país o provincia del destino, si se conoce. Cuando se
 *   pasa, manda sobre la geometría: es un dato, no una inferencia.
 */
export function husoDe(lat, lon, pais) {
  if (pais && ZONA_POR_PAIS[pais]) return { zona: ZONA_POR_PAIS[pais], pais };
  for (const h of HUSOS) {
    const [w, s, e, n] = h.caja;
    if (lon >= w && lon <= e && lat >= s && lat <= n) return h;
  }
  return { zona: 'Europe/Madrid', pais: 'España' };
}

/** Formatea una hora en el huso del punto indicado. */
export function horaLocal(fecha, lat, lon, opts = {}) {
  if (!fecha) return '—';
  const { zona } = husoDe(lat, lon, opts.pais);
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit', minute: '2-digit',
    second: opts.segundos === false ? undefined : '2-digit',
    timeZone: zona,
  }).format(fecha);
}

/** Etiqueta corta del huso, para cuando se comparan destinos de varios países. */
export function etiquetaHuso(lat, lon) {
  const { zona } = husoDe(lat, lon);
  const partes = new Intl.DateTimeFormat('es-ES', {
    timeZone: zona, timeZoneName: 'shortOffset',
  }).formatToParts(new Date(`${EVENTO.fecha}T12:00:00Z`));
  return partes.find((p) => p.type === 'timeZoneName')?.value ?? '';
}
