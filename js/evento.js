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

const HUSOS = [
  // Ceuta y Melilla son españolas aunque estén en África: van antes que
  // Marruecos en la lista porque quedan dentro de su recuadro.
  { zona: 'Europe/Madrid', pais: 'España', caja: [-5.42, 35.86, -5.25, 35.94] }, // Ceuta
  { zona: 'Europe/Madrid', pais: 'España', caja: [-3.00, 35.24, -2.88, 35.35] }, // Melilla
  { zona: 'Africa/Casablanca', pais: 'Marruecos', caja: [-13.5, 27.5, -1.0, 36.0] },
  { zona: 'Africa/Algiers', pais: 'Argelia', caja: [-1.0, 18.9, 12.0, 37.1] },
  { zona: 'Africa/Tunis', pais: 'Túnez', caja: [7.5, 30.2, 11.6, 37.6] },
  { zona: 'Atlantic/Canary', pais: 'Canarias', caja: [-18.2, 27.5, -13.3, 29.5] },
  { zona: 'Europe/Lisbon', pais: 'Portugal', caja: [-9.6, 36.9, -6.2, 42.2] },
  { zona: 'Europe/Madrid', pais: 'España', caja: [-9.4, 35.9, 4.4, 43.9] },
];

/** Huso horario y país de un punto. Por defecto, España. */
export function husoDe(lat, lon) {
  for (const h of HUSOS) {
    const [w, s, e, n] = h.caja;
    if (lon >= w && lon <= e && lat >= s && lat <= n) return h;
  }
  return { zona: 'Europe/Madrid', pais: 'España' };
}

/** Formatea una hora en el huso del punto indicado. */
export function horaLocal(fecha, lat, lon, opts = {}) {
  if (!fecha) return '—';
  const { zona } = husoDe(lat, lon);
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
