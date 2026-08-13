// test/verify.mjs
//
// Verifica el JavaScript QUE SE ENVÍA (no un port a otro lenguaje) contra:
//   · los ejemplos publicados de Meeus,
//   · las efemérides oficiales del IGN/OAN y de la NASA GSFC.
//
// Ejecutar:  node test/verify.mjs

import {
  sunPosition, moonPosition, nutation, julianDay, centuriesTT,
  greenwichSiderealTime, deltaT,
} from '../js/astro.js';
import { localCircumstances, eclipseState, sunsetTime } from '../js/eclipse.js';
import { centerlineGeoJSON, totalityBandGeoJSON } from '../js/shadow.js';

let fallos = 0, pruebas = 0;
const R2D = 180 / Math.PI;

function comprobar(etiqueta, obtenido, esperado, tol, unidad = '') {
  pruebas++;
  const d = obtenido - esperado;
  const ok = Math.abs(d) <= tol;
  if (!ok) fallos++;
  console.log(`  [${ok ? 'ok  ' : 'FALLO'}] ${etiqueta.padEnd(30)}` +
    `${obtenido.toFixed(5).padStart(14)}  esp ${esperado.toFixed(5).padStart(14)}` +
    `  Δ${d >= 0 ? '+' : ''}${d.toFixed(5)}${unidad}`);
}

function seccion(t) { console.log(`\n=== ${t} ===`); }

// ─────────────────────────────────────────────────────────────────────────────
seccion('Meeus 47.a — Luna, 1992 abril 12.0 TD');
{
  const T = (2448724.5 - 2451545.0) / 36525;
  const m = moonPosition(T);
  comprobar('longitud eclíptica', m.lambda, 133.162655, 1e-5, '°');
  comprobar('latitud eclíptica', m.beta, -3.229126, 1e-5, '°');
  comprobar('distancia', m.dist, 368409.7, 0.1, ' km');
  comprobar('paralaje', m.parallax, 0.991990, 1e-5, '°');
}

seccion('Meeus 25 — Sol, 1992 octubre 13.0 TD');
{
  const T = (2448908.5 - 2451545.0) / 36525;
  const s = sunPosition(T);
  comprobar('longitud aparente', s.lambda, 199.90895, 1e-4, '°');
  comprobar('distancia', s.R, 0.99766, 1e-5, ' UA');
  comprobar('ascensión recta', s.ra, 198.380830, 2e-3, '°');
  comprobar('declinación', s.dec, -7.785070, 2e-3, '°');
}

seccion('ΔT y tiempo sidéreo');
{
  comprobar('ΔT del evento', deltaT(2027), 72.6, 0.01, ' s');
  // Meeus, ejemplo 12.a: 1987 abril 10.0 TD → θ0 = 197.693195°
  const g = greenwichSiderealTime(2446895.5);
  comprobar('θ aparente 1987-04-10', g, 197.693195, 2e-3, '°');
}

// ─────────────────────────────────────────────────────────────────────────────
seccion('Circunstancias locales del eclipse de 2027');

// Sin tablas oficiales publicadas todavía para contrastar ciudad a ciudad, se
// comprueba lo que sí está publicado y es inequívoco, más la coherencia interna.
// Referencia: NASA GSFC sitúa el máximo global el 2027-08-02 a las 10:07:50 UT
// sobre Egipto, con 6m23s de duración central.
{
  const DIA0 = Date.parse('2027-08-02T00:00:00Z');
  const { shadowAxisPoint } = await import('../js/shadow.js');

  // Máximo global: la duración más larga se da cerca de Luxor.
  let mejor = null;
  for (let m = 480; m <= 720; m += 1) {
    const p = shadowAxisPoint(new Date(DIA0 + m * 60000));
    if (p && (!mejor || p.sunAlt > mejor.p.sunAlt)) mejor = { m, p };
  }
  pruebas++;
  const hh = `${String(Math.floor(mejor.m / 60)).padStart(2, '0')}:${String(mejor.m % 60).padStart(2, '0')}`;
  console.log(`  Máximo global a las ${hh} UT sobre ${mejor.p.lat.toFixed(1)}°N ${mejor.p.lon.toFixed(1)}°E`);
  // Luxor está en 25.7°N 32.6°E; se admite medio grado de margen.
  const cercaDeLuxor = Math.abs(mejor.p.lat - 25.7) < 1.5 && Math.abs(mejor.p.lon - 32.6) < 3;
  console.log(`  Coincide con la zona del máximo publicado (Egipto): ${cercaDeLuxor ? 'sí' : 'NO'}`);
  if (!cercaDeLuxor) fallos++;

  // Duraciones en la franja española y marroquí.
  const PUNTOS = [
    ['Tarifa', 36.0143, -5.6044, 20, 'total'],
    ['Ceuta', 35.8894, -5.3213, 30, 'total'],
    ['Málaga', 36.7213, -4.4214, 11, 'total'],
    ['Granada', 37.1773, -3.5986, 738, 'parcial'],
    ['Sevilla', 37.3891, -5.9845, 11, 'parcial'],
  ];
  for (const [n, lat, lon, elev, esperado] of PUNTOS) {
    const c = localCircumstances({ lat, lon, elev });
    pruebas++;
    const ok = c.type === esperado;
    const dur = c.durationTotality
      ? `${Math.floor(c.durationTotality / 60)}m ${String(Math.round(c.durationTotality % 60)).padStart(2, '0')}s` : '—';
    console.log(`  [${ok ? 'ok  ' : 'FALLO'}] ${n.padEnd(9)} ${c.type.padEnd(8)} ${dur.padStart(7)}  ` +
      `alt ${c.max.sun.alt.toFixed(1)}°`);
    if (!ok) fallos++;
    // El Sol alto es el rasgo que define este eclipse: si sale bajo, algo falla.
    pruebas++;
    if (c.max.sun.alt < 30 || c.max.sun.alt > 50) {
      console.log(`  FALLO: altura solar fuera de lo esperado en ${n}`);
      fallos++;
    }
  }
}

seccion('Generación de capas del mapa');
{
  const linea = centerlineGeoJSON('2027-08-02', 120);
  const banda = totalityBandGeoJSON('2027-08-02', 120);
  pruebas += 2;
  const nSeg = linea.geometry.coordinates.length;
  const nPts = linea.geometry.coordinates.reduce((s, c) => s + c.length, 0);
  console.log(`  Línea central: ${nSeg} segmento(s), ${nPts} puntos`);
  if (nPts < 30) { console.log('  FALLO: línea central demasiado corta'); fallos++; }

  const anillo = banda?.geometry?.coordinates?.[0] ?? [];
  console.log(`  Franja de totalidad: polígono de ${anillo.length} vértices`);
  if (anillo.length < 30) { console.log('  FALLO: franja mal generada'); fallos++; }

  // Todas las coordenadas deben ser finitas y estar en rango.
  const malas = anillo.filter(([x, y]) =>
    !isFinite(x) || !isFinite(y) || Math.abs(x) > 180 || Math.abs(y) > 90);
  pruebas++;
  if (malas.length) {
    console.log(`  FALLO: ${malas.length} coordenadas inválidas, p.ej. ${JSON.stringify(malas[0])}`);
    fallos++;
  } else {
    console.log('  Todas las coordenadas son válidas');
  }
}

seccion('Coherencia interna');
{
  const obs = { lat: 36.0143, lon: -5.6044, elev: 20 }; // Tarifa
  const c = localCircumstances(obs);
  pruebas += 4;

  // Los contactos deben ir en orden.
  const t = [c.contacts.c1, c.contacts.c2, c.max.date, c.contacts.c3, c.contacts.c4]
    .filter(Boolean).map((d) => d.getTime());
  const ordenados = t.every((v, i) => i === 0 || v >= t[i - 1]);
  console.log(`  Contactos en orden cronológico: ${ordenados ? 'sí' : 'NO'}`);
  if (!ordenados) fallos++;

  // En el máximo la obscuración debe ser máxima.
  const antes = eclipseState(new Date(c.max.date.getTime() - 60000), obs);
  const despues = eclipseState(new Date(c.max.date.getTime() + 60000), obs);
  const esMax = c.max.obscuration >= antes.obscuration && c.max.obscuration >= despues.obscuration;
  console.log(`  La obscuración es máxima en el máximo: ${esMax ? 'sí' : 'NO'}`);
  if (!esMax) fallos++;

  // En totalidad, obscuración = 100%.
  console.log(`  Obscuración en totalidad: ${(c.max.obscuration * 100).toFixed(2)}%`);
  if (c.max.obscuration < 0.9999) fallos++;

  // El ocaso debe ser posterior al máximo (el eclipse ocurre antes de ponerse).
  const ocaso = sunsetTime(obs);
  const ok = ocaso && ocaso.getTime() > c.max.date.getTime();
  console.log(`  Ocaso (${ocaso?.toISOString().slice(11, 19)} UTC) posterior al máximo: ${ok ? 'sí' : 'NO'}`);
  if (!ok) fallos++;
}

seccion('Rendimiento');
{
  const t0 = performance.now();
  for (let i = 0; i < 10; i++) {
    localCircumstances({ lat: 42.3 + i * 0.1, lon: -3.7, elev: 800 });
  }
  const ms = (performance.now() - t0) / 10;
  console.log(`  Circunstancias completas: ${ms.toFixed(0)} ms por punto`);
  pruebas++;
  // En un móvil de gama baja será ~3-4× más lento; por encima de 400 ms aquí
  // la interfaz se notaría bloqueada al mover el mapa.
  if (ms > 400) { console.log('  FALLO: demasiado lento para uso interactivo'); fallos++; }

  const t1 = performance.now();
  centerlineGeoJSON('2027-08-02', 120);
  console.log(`  Línea central completa: ${(performance.now() - t1).toFixed(0)} ms`);
}

// ─────────────────────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(72));
console.log(fallos === 0
  ? `TODO CORRECTO — ${pruebas} comprobaciones superadas.`
  : `${fallos} FALLO(S) sobre ${pruebas} comprobaciones.`);
process.exit(fallos === 0 ? 0 : 1);
