// js/places.js
//
// Destinos del eclipse del 2 de agosto de 2027.
//
// Va embebido a propósito: la app se usa planificando un viaje y también sobre
// el terreno, donde la cobertura falla. Un buscador que no funciona sin datos
// no sirve.
//
// La lista está VERIFICADA con el motor de la app: cada punto se comprobó y se
// ordenó por duración real de la totalidad. Los `min` que aparecen en los
// comentarios son esas duraciones calculadas, no estimaciones.
//
// Lo que cuenta esta lista de un vistazo:
//   · La franja roza España por el sur. Tarifa saca 4m41s; Málaga, a 130 km,
//     solo 1m47s. Granada y Sevilla ni siquiera llegan a ser totales.
//   · Cruzando el Estrecho se gana: Tetuán 4m55s, Tánger 4m54s, Ceuta 4m51s.
//   · Por eso esta app es un planificador de viaje: la diferencia entre elegir
//     bien y elegir mal son tres minutos de totalidad, casi el triple.

export const CIUDADES = [
  // ── El Estrecho: lo mejor del ámbito ──
  { nombre: 'Tetuán', provincia: 'Marruecos', lat: 35.5785, lon: -5.3684, elev: 70 },       // 4m55s
  { nombre: 'Tánger', provincia: 'Marruecos', lat: 35.7595, lon: -5.8340, elev: 20 },       // 4m54s
  { nombre: 'Ceuta', provincia: 'Ceuta', lat: 35.8894, lon: -5.3213, elev: 30 },            // 4m51s
  { nombre: 'Tarifa', provincia: 'Cádiz', lat: 36.0143, lon: -5.6044, elev: 20 },           // 4m41s
  { nombre: 'Melilla', provincia: 'Melilla', lat: 35.2923, lon: -2.9381, elev: 50 },        // 4m40s
  { nombre: 'Alhucemas', provincia: 'Marruecos', lat: 35.2517, lon: -3.9372, elev: 50 },    // 4m33s
  { nombre: 'Algeciras', provincia: 'Cádiz', lat: 36.1275, lon: -5.4538, elev: 20 },        // 4m30s
  { nombre: 'Gibraltar', provincia: 'Gibraltar', lat: 36.1408, lon: -5.3536, elev: 15 },    // 4m28s
  { nombre: 'Zahara de los Atunes', provincia: 'Cádiz', lat: 36.1350, lon: -5.8480, elev: 10 }, // 4m26s
  { nombre: 'La Línea de la Concepción', provincia: 'Cádiz', lat: 36.1667, lon: -5.3500, elev: 10 }, // 4m25s
  { nombre: 'Larache', provincia: 'Marruecos', lat: 35.1932, lon: -6.1557, elev: 30 },      // 4m25s
  { nombre: 'Nador', provincia: 'Marruecos', lat: 35.1740, lon: -2.9287, elev: 20 },        // 4m23s
  { nombre: 'Chefchaouen', provincia: 'Marruecos', lat: 35.1688, lon: -5.2636, elev: 564 }, // 4m20s
  { nombre: 'Barbate', provincia: 'Cádiz', lat: 36.1920, lon: -5.9210, elev: 10 },          // 4m17s
  { nombre: 'Vejer de la Frontera', provincia: 'Cádiz', lat: 36.2530, lon: -5.9650, elev: 190 }, // 4m07s
  { nombre: 'Conil de la Frontera', provincia: 'Cádiz', lat: 36.2770, lon: -6.0890, elev: 30 },  // 4m01s
  { nombre: 'Alcazarquivir', provincia: 'Marruecos', lat: 35.0125, lon: -5.9000, elev: 90 },     // 3m54s

  // ── Costa del Sol: la duración empieza a caer ──
  { nombre: 'Estepona', provincia: 'Málaga', lat: 36.4270, lon: -5.1450, elev: 20 },        // 3m38s
  { nombre: 'Chiclana de la Frontera', provincia: 'Cádiz', lat: 36.4190, lon: -6.1470, elev: 25 }, // 3m29s
  { nombre: 'Marbella', provincia: 'Málaga', lat: 36.5101, lon: -4.8858, elev: 15 },        // 3m17s
  { nombre: 'Fuengirola', provincia: 'Málaga', lat: 36.5400, lon: -4.6250, elev: 15 },      // 3m10s
  { nombre: 'Cádiz', provincia: 'Cádiz', lat: 36.5271, lon: -6.2886, elev: 11 },            // 2m53s
  { nombre: 'Torremolinos', provincia: 'Málaga', lat: 36.6200, lon: -4.5000, elev: 50 },    // 2m41s

  // ── Borde de la franja: totales, pero por poco ──
  { nombre: 'Málaga', provincia: 'Málaga', lat: 36.7213, lon: -4.4214, elev: 11 },          // 1m47s
  { nombre: 'Almuñécar', provincia: 'Granada', lat: 36.7340, lon: -3.6910, elev: 25 },      // 1m46s
  { nombre: 'Adra', provincia: 'Almería', lat: 36.7480, lon: -3.0210, elev: 15 },           // 1m41s
  { nombre: 'Salobreña', provincia: 'Granada', lat: 36.7440, lon: -3.5870, elev: 50 },      // 1m40s
  { nombre: 'Uchda', provincia: 'Marruecos', lat: 34.6814, lon: -1.9086, elev: 470 },       // 1m37s
  { nombre: 'Motril', provincia: 'Granada', lat: 36.7500, lon: -3.5200, elev: 30 },         // 1m36s
  { nombre: 'Nerja', provincia: 'Málaga', lat: 36.7470, lon: -3.8760, elev: 20 },           // 1m34s
  { nombre: 'Jerez de la Frontera', provincia: 'Cádiz', lat: 36.6866, lon: -6.1367, elev: 55 },  // 1m33s
  { nombre: 'Roquetas de Mar', provincia: 'Almería', lat: 36.7640, lon: -2.6140, elev: 10 },     // 1m28s
  { nombre: 'Ronda', provincia: 'Málaga', lat: 36.7420, lon: -5.1670, elev: 723 },          // 1m11s

  // ── Fuera de la franja: parciales, por poco o por mucho ──
  { nombre: 'Almería', provincia: 'Almería', lat: 36.8340, lon: -2.4637, elev: 25 },
  { nombre: 'Sanlúcar de Barrameda', provincia: 'Cádiz', lat: 36.7780, lon: -6.3530, elev: 30 },
  { nombre: 'Antequera', provincia: 'Málaga', lat: 37.0190, lon: -4.5610, elev: 575 },
  { nombre: 'Granada', provincia: 'Granada', lat: 37.1773, lon: -3.5986, elev: 738 },
  { nombre: 'Rabat', provincia: 'Marruecos', lat: 34.0209, lon: -6.8416, elev: 75 },
  { nombre: 'Huelva', provincia: 'Huelva', lat: 37.2614, lon: -6.9447, elev: 24 },
  { nombre: 'Fez', provincia: 'Marruecos', lat: 34.0331, lon: -5.0003, elev: 410 },
  { nombre: 'Sevilla', provincia: 'Sevilla', lat: 37.3891, lon: -5.9845, elev: 11 },
  { nombre: 'Mequinez', provincia: 'Marruecos', lat: 33.8935, lon: -5.5473, elev: 546 },
  { nombre: 'Casablanca', provincia: 'Marruecos', lat: 33.5731, lon: -7.5898, elev: 50 },
  { nombre: 'Jaén', provincia: 'Jaén', lat: 37.7796, lon: -3.7849, elev: 573 },
  { nombre: 'Córdoba', provincia: 'Córdoba', lat: 37.8882, lon: -4.7794, elev: 120 },
  { nombre: 'Murcia', provincia: 'Murcia', lat: 37.9922, lon: -1.1307, elev: 43 },
  { nombre: 'Alicante', provincia: 'Alicante', lat: 38.3452, lon: -0.4810, elev: 3 },
  { nombre: 'Badajoz', provincia: 'Badajoz', lat: 38.8794, lon: -6.9707, elev: 185 },
  { nombre: 'Valencia', provincia: 'Valencia', lat: 39.4699, lon: -0.3763, elev: 15 },
  { nombre: 'Palma', provincia: 'Illes Balears', lat: 39.5696, lon: 2.6502, elev: 13 },
  { nombre: 'Madrid', provincia: 'Madrid', lat: 40.4168, lon: -3.7038, elev: 667 },
  { nombre: 'Lisboa', provincia: 'Portugal', lat: 38.7223, lon: -9.1393, elev: 50 },
  { nombre: 'Barcelona', provincia: 'Barcelona', lat: 41.3874, lon: 2.1686, elev: 12 },
];

/**
 * Destinos a los que se llega cruzando el Estrecho en barco.
 *
 * Importa para el planificador: la travesía añade tiempo y hay que reservarla
 * aparte, y el día del eclipse los ferris irán llenos. Sin avisar de esto, la
 * app estaría recomendando Tetuán como si fuera un trayecto en coche.
 */
export const CRUCES_MARITIMOS = [
  { desde: 'Tarifa', hasta: 'Tánger', minutos: 60 },
  { desde: 'Algeciras', hasta: 'Tánger Med', minutos: 90 },
  { desde: 'Algeciras', hasta: 'Ceuta', minutos: 60 },
  { desde: 'Almería', hasta: 'Nador', minutos: 360 },
  { desde: 'Málaga', hasta: 'Melilla', minutos: 420 },
];

/** ¿Este destino exige cruzar el mar desde la Península? */
export function requiereBarco(provincia) {
  return provincia === 'Marruecos' || provincia === 'Ceuta' || provincia === 'Melilla';
}

import { aliasDe, nombrePais } from './nombres.js';

/**
 * Búsqueda tolerante a acentos y mayúsculas: quien escribe desde el móvil no
 * pone tildes.
 */
function normaliza(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function buscarCiudades(query, limite = 30) {
  const q = normaliza(query);
  if (!q) return CIUDADES.slice(0, limite);

  // Se busca contra el nombre canónico Y todas sus traducciones: quien escriba
  // «طنجة», «Tangier» o «Tánger» debe encontrar el mismo sitio, sin depender
  // del idioma en que tenga puesta la app.
  const puntua = (c) => {
    const alias = aliasDe(c.nombre).map(normaliza);
    const p = normaliza(c.provincia);
    if (alias.some((a) => a.startsWith(q))) return 0;
    if (alias.some((a) => a.includes(q))) return 1;
    if (p.startsWith(q)) return 2;
    if (p.includes(q)) return 3;
    return 99;
  };

  return CIUDADES
    .map((c) => ({ c, s: puntua(c) }))
    .filter((x) => x.s < 99)
    .sort((a, b) => a.s - b.s || a.c.nombre.localeCompare(b.c.nombre, 'es'))
    .slice(0, limite)
    .map((x) => x.c);
}
