# Eclipse 2A — ¿Dónde lo verás mejor?

PWA para planificar el **eclipse total de Sol del 2 de agosto de 2027** en el sur
de España y el norte de Marruecos.

A diferencia del eclipse de 2026, aquí la pregunta no es si el relieve te tapa
—el Sol estará a unos 40° y casi nada lo estorba— sino **a dónde ir**. La franja
roza España por el sur y la duración se desploma hacia el borde:

| Destino | Totalidad |
|---|---|
| Tetuán (Marruecos) | 4 min 55 s |
| Tánger | 4 min 54 s |
| Ceuta | 4 min 51 s |
| **Tarifa** | **4 min 41 s** |
| Cádiz | 2 min 53 s |
| Málaga | 1 min 47 s |
| Granada | — (parcial 99,2%) |

Elegir bien o mal son casi tres minutos de diferencia. Por eso esta app es un
**planificador de viaje**.

---

## Arrancar

Sin compilación: HTML y módulos ES nativos.

```bash
python3 -m http.server 8138
# abrir http://localhost:8138
```

Para desplegar, sube la carpeta a cualquier hosting estático. **Requisito:
HTTPS**, obligatorio para cámara, sensores y service worker.

No hace falta ninguna API key. Elevación de AWS Terrain Tiles, cartografía del
IGN, meteorología de Open-Meteo, satélite de ESRI. MapTiler es opcional.

---

## Qué hace

**Destinos** — La pantalla principal. Compara todos los destinos por duración de
la totalidad, distancia, tiempo de viaje y previsión de nubes, ordenables por
«más totalidad», «mejor relación con el viaje» o «más cerca». Avisa cuando hay
que cruzar el Estrecho en barco y da las horas en el huso de cada país: en
Marruecos el máximo es una hora antes que en la Península, y confundirlo
arruinaría el viaje.

**Mapa** — Franja de totalidad y línea central sobre relieve sombreado, con
nubosidad prevista superponible.

**Nubes** — Previsión de Open-Meteo desglosada por altura de nube.

**AR** — Superpone sobre la cámara dónde estará el Sol eclipsado, con modo
congelado: captura un fotograma y anima encima el eclipse con control de tiempo.

**Órbitas** — Simulación 3D del sistema Tierra-Luna-Sol con las posiciones
reales calculadas por las mismas efemérides que el resto de la app.

**Obstáculos** — Se llega desde la ficha del punto. Con el Sol a 40° el relieve
casi nunca estorba (haría falta algo que se eleve 780 m por kilómetro), pero
sigue siendo útil en sitios encajonados o con edificios delante.

---

## Precisión

Motor astronómico en el dispositivo, sin depender de la red. Validaciones que
pasan en cada cambio:

- Ejemplos publicados de Meeus (capítulos 25 y 47), exactos.
- **Máximo global**: el motor lo sitúa a las 10:07 UT sobre 25,4°N 33,2°E.
  NASA GSFC publica 10:07:50 UT junto a Luxor.
- Clasificación total/parcial correcta en los puntos de referencia, incluidos
  los casos ajustados de Granada (99,2%) y Sevilla (98,3%).

```bash
node test/verify.mjs          # motor y geometría
node test/check_imports.mjs   # grafo de módulos, rutas e ids
python3 test/validate_astro.py
```

---

## Relación con el proyecto de 2026

Este proyecto nace del de agosto de 2026 y comparte el motor astronómico, que es
genérico: calculó el de 2027 sin tocar una línea. Lo que cambia es el producto,
porque **los dos eclipses hacen preguntas opuestas**:

| | 12-ago-2026 | 2-ago-2027 |
|---|---|---|
| Sol en España | 1,5–12° (ocaso) | 37–46° (mañana) |
| Decide el relieve | Sí, es todo | No |
| Pregunta central | ¿Me tapa esa sierra? | ¿A dónde voy? |

Todo lo específico del evento vive en **`js/evento.js`**: fecha, ΔT, encuadres,
husos horarios y los rasgos que la interfaz consulta para decidir qué contar.
Apuntar el proyecto a otro eclipse es tocar ese archivo y la lista de destinos.

---

## Estructura

```
index.html
css/app.css
js/
  evento.js       DEFINICIÓN DEL EVENTO — fecha, husos, encuadres, rasgos
  destinos.js     Comparador de destinos (pantalla principal)
  places.js       Destinos, verificados con el propio motor
  astro.js        Efemérides de Sol y Luna (Meeus)
  eclipse.js      Circunstancias locales
  shadow.js       Geometría de la umbra sobre el elipsoide
  terrain.js      Terreno y perfil de horizonte
  terrain-shadow.js  Sombras del relieve
  clouds.js       Meteorología
  config.js       Claves y endpoints (único punto que los conoce)
  app.js          Orquestador
  map.js  horizon-view.js  clouds-view.js  cloud-map.js  ar.js  orbit3d.js
sw.js
```

---

## Pendiente

Decisiones tomadas pero no implementadas todavía:

- **Reservas** — integración con Booking. La franja española es una tira estrecha
  y el alojamiento se agotará; es la conversión más evidente.
- **Ferris** — Tarifa–Tánger, Algeciras–Ceuta. Cruzar el Estrecho da casi el
  triple de totalidad que quedarse en Málaga, y hoy la app lo calcula pero no
  permite reservarlo.
- **Gafas y filtros solares** — con una condición: enlazar **solo** vendedores
  con certificación ISO 12312-2 verificable. Hay mucha falsificación y mirar el
  Sol con material sin certificar quema la retina. Aquí la decisión correcta y
  la comercialmente buena coinciden: es un argumento de confianza.
- **Climatología histórica** — a un año vista no hay previsión posible, y en
  agosto en Andalucía el riesgo no son los frentes sino la calima sahariana y la
  niebla costera de la mañana.
