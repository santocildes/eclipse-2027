// js/destinos.js — comparador de destinos.
//
// La función central de esta app. En 2027 la franja roza España por el sur y la
// duración se desploma hacia el borde: Tarifa 4m41s, Málaga 1m47s a 130 km de
// distancia. Y cruzando el Estrecho se llega a 4m55s.
//
// Es decir: la diferencia entre elegir bien y elegir mal es casi el triple de
// totalidad. Ese es el problema que resuelve la app, y por eso la comparación
// entre destinos —no el horizonte— es la pantalla principal.
//
// Cada fila responde a tres cosas a la vez: cuánto ganas, cuánto te cuesta
// llegar, y qué probabilidad hay de que las nubes lo estropeen.

import { localCircumstances } from './eclipse.js';
import { CIUDADES, requiereBarco, CRUCES_MARITIMOS, regionDe } from './places.js';
import { EVENTO, husoDe, horaLocal } from './evento.js';
import { fetchPuntosForecast, visibilityScore } from './clouds.js';
import { state, toast, fmtDuration } from './app.js';
import { t, idiomaActual } from './i18n.js';
import { nombreCiudad, nombrePais } from './nombres.js';

const $ = (id) => document.getElementById(id);
const RAD = Math.PI / 180;

// Velocidad media realista por carretera, puerta a puerta e incluyendo paradas.
// Con 110 km/h de límite, los accesos y el tráfico dejan la media muy por
// debajo; usar el límite legal daría tiempos que nadie cumple.
const KMH_CARRETERA = 78;

let cache = null;
let cargandoNubes = false;

/** Distancia entre dos puntos por la fórmula del semiverseno, en km. */
function distanciaKm(aLat, aLon, bLat, bLon) {
  const dLat = (bLat - aLat) * RAD;
  const dLon = (bLon - aLon) * RAD;
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(aLat * RAD) * Math.cos(bLat * RAD) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// Vuelo: velocidad de crucero, más el peaje fijo de ir al aeropuerto, facturar,
// esperar y salir al otro lado. Sin ese peaje, un vuelo de 500 km saldría más
// rápido que el coche, cosa que casi nunca es cierta.
const KMH_AVION = 780;
const MINUTOS_AEROPUERTO = 210;

/**
 * Estimación del viaje, eligiendo el medio que tiene sentido.
 *
 * La franja cruza nueve países y llega hasta Somalia: presentar «Luxor, 60 h en
 * coche» era información inútil. Se comparan coche (con travesía si hay que
 * cruzar el Estrecho) y avión, y se ofrece el más rápido — que a partir de unos
 * cientos de kilómetros es siempre el avión.
 */
function viaje(desde, hasta) {
  const linea = distanciaKm(desde.lat, desde.lon, hasta.lat, hasta.lon);
  const porCarretera = linea * 1.25;
  let minutosCoche = (porCarretera / KMH_CARRETERA) * 60;

  const barco = requiereBarco(hasta.provincia) && !requiereBarco(desde.provincia ?? 'x');
  if (barco) {
    // Travesía más el margen de embarque, que el día del eclipse será generoso.
    const cruce = CRUCES_MARITIMOS
      .filter((c) => c.hasta.includes(hasta.nombre) || hasta.provincia === 'Marruecos')
      .sort((a, b) => a.minutos - b.minutos)[0] ?? CRUCES_MARITIMOS[0];
    minutosCoche += cruce.minutos + 90;
  }

  const minutosAvion = (linea / KMH_AVION) * 60 + MINUTOS_AEROPUERTO;

  if (linea > 60 && minutosAvion < minutosCoche) {
    return { km: Math.round(linea), minutos: Math.round(minutosAvion), barco: false, avion: true };
  }
  return { km: Math.round(porCarretera), minutos: Math.round(minutosCoche), barco, avion: false };
}

function fmtViaje(min) {
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  return h > 0
    ? `${h} ${t('com.h')} ${String(m).padStart(2, '0')} ${t('com.min')}`
    : `${m} ${t('com.min')}`;
}

// ── Cálculo ──────────────────────────────────────────────────────────────────

/**
 * Evalúa todos los destinos desde la posición actual.
 * El cálculo de circunstancias son unos 5 ms por punto: con ~50 destinos es
 * un cuarto de segundo, así que se hace de una vez y se cachea.
 */
function calcular() {
  const origen = { lat: state.lat, lon: state.lon, provincia: null };
  const propio = state.circ;
  const duracionPropia = propio?.durationTotality ?? 0;

  return CIUDADES.map((c) => {
    const circ = localCircumstances({ lat: c.lat, lon: c.lon, elev: c.elev }, EVENTO.fecha);
    const v = viaje(origen, c);
    return {
      ...c,
      circ,
      total: circ.type === 'total',
      duracion: circ.durationTotality ?? 0,
      obsc: circ.max?.obscuration ?? 0,
      ganancia: (circ.durationTotality ?? 0) - duracionPropia,
      ...v,
      huso: husoDe(c.lat, c.lon),
      region: regionDe(c.provincia),
      nubes: null,
    };
  });
}

/** Ordena según el criterio elegido. */
function ordenar(lista, criterio) {
  const l = [...lista];
  if (criterio === 'cerca') return l.sort((a, b) => a.km - b.km);
  if (criterio === 'equilibrio') {
    // Minutos de totalidad por hora de viaje: penaliza los destinos lejanos
    // que apenas mejoran, que es la trampa clásica al planificar un eclipse.
    const val = (x) => (x.duracion / 60) / Math.max(0.5, x.minutos / 60);
    return l.sort((a, b) => val(b) - val(a));
  }
  return l.sort((a, b) => b.duracion - a.duracion || a.km - b.km);
}

// ── Interfaz ─────────────────────────────────────────────────────────────────

export function init() {
  $('destRegion').addEventListener('change', render);
  $('destOrden').addEventListener('change', render);
  $('destSoloTotal').addEventListener('change', render);
  $('btnDestNubes').addEventListener('click', cargarNubes);
  document.addEventListener('eclipse:location', () => { cache = null; render(); });
  document.addEventListener('i18n:cambio', render);
  render();
}

function render() {
  if (!cache) cache = calcular();
  const criterio = $('destOrden').value;
  const soloTotal = $('destSoloTotal').checked;
  const region = $('destRegion').value;

  let lista = soloTotal ? cache.filter((d) => d.total) : cache;

  // «Cerca de mí» no es una región geográfica sino un radio: con destinos en
  // nueve países, alguien que planifica desde Madrid no quiere ver Mogadiscio
  // en la misma lista, pero tampoco quiere elegir región a mano.
  if (region === 'cerca') lista = lista.filter((d) => d.km <= 1200);
  else if (region !== 'todas') lista = lista.filter((d) => d.region === region);

  lista = ordenar(lista, criterio).slice(0, 30);

  if (!lista.length) {
    $('destLista').innerHTML = `<div class="notice">${t('dest.sinResultados')}</div>`;
    $('destActual').innerHTML = '';
    return;
  }

  const propio = state.circ;
  const miDur = propio?.durationTotality ?? 0;
  const miTipo = propio?.type;

  // Encabezado: qué tienes ahora mismo donde estás.
  $('destActual').innerHTML = `
    <div class="dest-actual">
      <div class="da-lugar">${nombreCiudad(state.name, idiomaActual())}</div>
      <div class="da-dato">${
        miTipo === 'total'
          ? `<strong>${fmtDuration(miDur)}</strong> ${t('dest.deTotalidad')}`
          : `<strong>${t('cab.parcial')} ${((propio?.max?.obscuration ?? 0) * 100).toFixed(1)}%</strong> — ${t('dest.sinCorona')}`
      }</div>
    </div>`;

  $('destLista').innerHTML = lista.map((d, i) => {
    const gana = d.ganancia;
    const claseGanancia = !d.total ? 'peor' : gana > 30 ? 'mejor' : gana < -30 ? 'peor' : 'igual';
    const etiquetaGanancia = !d.total
      ? t('dest.parcialPct', { pct: (d.obsc * 100).toFixed(1) })
      : gana > 5 ? `+${fmtDuration(gana)}`
      : gana < -5 ? `−${fmtDuration(-gana)}`
      : t('dest.igual');

    const nubes = d.nubes === null ? ''
      : `<span class="dest-nubes ${d.nubes >= 70 ? 'ok' : d.nubes >= 45 ? 'medio' : 'mal'}">
           ${d.nubes}/100</span>`;

    return `
      <button class="dest-fila" data-i="${i}">
        <span class="df-rank">${i + 1}</span>
        <span class="df-main">
          <span class="df-nombre">${nombreCiudad(d.nombre, idiomaActual())}
            ${d.barco ? `<span class="df-barco">${t('dest.barco')}</span>` : ''}
            ${d.avion ? `<span class="df-avion">${t('dest.avion')}</span>` : ''}
          </span>
          <span class="df-sub">${nombrePais(d.provincia, idiomaActual())} · ${d.km} ${t('com.km')} · ${fmtViaje(d.minutos)}${
            d.huso.zona !== husoDe(state.lat, state.lon).zona
              ? ` · ${t('dest.horaLocal', { hora: horaLocal(d.circ.max?.date, d.lat, d.lon, { segundos: false }) })}` : ''
          }</span>
          ${nubes}
        </span>
        <span class="df-dur">
          <strong>${d.total ? fmtDuration(d.duracion) : '—'}</strong>
          <small class="g-${claseGanancia}">${etiquetaGanancia}</small>
        </span>
      </button>`;
  }).join('');

  $('destLista').querySelectorAll('.dest-fila').forEach((b) => {
    b.addEventListener('click', () => abrirFicha(lista[+b.dataset.i]));
  });
}

/**
 * Nubosidad de los destinos mostrados. Se pide bajo demanda y en un solo lote:
 * Open-Meteo admite varios puntos por petición, así que 24 destinos cuestan
 * una llamada.
 */
async function cargarNubes() {
  if (cargandoNubes || !cache) return;
  cargandoNubes = true;
  const btn = $('btnDestNubes');
  btn.disabled = true;
  btn.textContent = t('dest.consultando');

  try {
    const puntos = cache.filter((d) => d.total).slice(0, 40);
    const res = await fetchPuntosForecast(
      puntos.map((d) => d.lat), puntos.map((d) => d.lon), EVENTO.horaMeteoUTC,
    );
    if (!res.available) {
      toast('Aún no hay previsión: faltan más de 16 días. Mira la climatología.');
      return;
    }
    res.puntos.forEach((r, i) => {
      if (r) puntos[i].nubes = visibilityScore(r, puntos[i].circ.max?.sun?.alt ?? 40);
    });
    render();
  } catch (err) {
    console.error(err);
    toast('No se pudo consultar la nubosidad');
  } finally {
    cargandoNubes = false;
    btn.disabled = false;
    btn.textContent = t('dest.anadirNubes');
  }
}

function abrirFicha(d) {
  const dlg = $('destDialog');
  const hora = horaLocal(d.circ.max?.date, d.lat, d.lon);
  const husoNota = d.huso.zona !== husoDe(state.lat, state.lon).zona
    ? `<div class="notice warn">${t('dest.avisoHuso', {
        pais: nombrePais(d.huso.pais, idiomaActual()), hora,
      })}</div>` : '';

  const barcoNota = d.barco
    ? `<div class="notice warn">${t('dest.avisoBarco')}</div>`
    : d.avion ? `<div class="notice">${t('dest.avisoAvion')}</div>` : '';

  $('destFicha').innerHTML = `
    <h3>${nombreCiudad(d.nombre, idiomaActual())}</h3>
    <p class="lead">${nombrePais(d.provincia, idiomaActual())}</p>
    ${husoNota}${barcoNota}
    <div class="stats" style="margin-bottom:14px">
      <div class="stat"><div class="k">${t('dest.totalidad')}</div>
        <div class="v">${d.total ? fmtDuration(d.duracion) : '—'}</div></div>
      <div class="stat"><div class="k">${t('cab.maximo')}</div>
        <div class="v" style="font-size:1rem">${hora}</div></div>
      <div class="stat"><div class="k">${t('dest.distancia')}</div>
        <div class="v">${d.km}<span class="u"> ${t('com.km')}</span></div></div>
      <div class="stat"><div class="k">${t('dest.viaje')}</div>
        <div class="v" style="font-size:1rem">${fmtViaje(d.minutos)}</div></div>
    </div>
    <div class="dest-acciones">
      <a class="cta" target="_blank" rel="noopener"
         href="https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lon}">${t('dest.comoLlegar')}</a>
      <button class="cta ghost" id="destIr">${t('dest.verMapa')}</button>
    </div>
    <p class="fineprint">
      ${d.avion ? t('dest.notaAvion') : t('dest.nota')}
    </p>`;

  dlg.showModal();
  $('destIr').addEventListener('click', async () => {
    const app = await import('./app.js');
    app.setLocation(d.lat, d.lon, d.nombre, d.elev);
    dlg.close();
    app.showView('mapa');
  });
}
