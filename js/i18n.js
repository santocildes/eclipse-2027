// js/i18n.js — internacionalización.
//
// POR QUÉ ESTA APP TIENE QUE SER MULTILINGÜE
//
// La franja de totalidad del 2 de agosto de 2027 cruza nueve países. Comprobado
// con el motor de la app:
//
//   Luxor (Egipto) ......... 6m 26s   ← máximo mundial
//   Bengasi (Libia) ........ 6m 13s
//   Yeda (Arabia Saudí) .... 5m 58s
//   Sfax (Túnez) ........... 5m 42s
//   Orán (Argelia) ......... 5m 12s
//   LA MECA ................ 4m 59s
//   Tetuán (Marruecos) ..... 4m 55s
//   Tarifa (España) ........ 4m 41s
//   Saná (Yemen) ........... 3m 01s
//
// España está en el extremo CORTO del recorrido. El árabe es lengua oficial en
// ocho de los nueve países con totalidad, así que no es un idioma más: es el
// principal. Y el árabe se escribe de derecha a izquierda, lo que obliga a que
// la maquetación se refleje, no solo a cambiar los textos.
//
// El francés cubre el Magreb (Marruecos, Argelia, Túnez), donde es lengua de uso
// habitual en turismo y tecnología. El inglés cubre Gibraltar y al público
// internacional de cazadores de eclipses, que viaja mucho a estos eventos.

const CATALOGO = {
  es: {
    _nombre: 'Español', _dir: 'ltr', _locale: 'es-ES',

    // Navegación
    'nav.mapa': 'Mapa', 'nav.destinos': 'Destinos', 'nav.nubes': 'Nubes',
    'nav.ar': 'AR', 'nav.orbitas': 'Órbitas',

    // Cabecera
    'cab.elige': 'Elige un lugar',
    'cab.detalles': 'detalles',
    'cab.total': 'Total',
    'cab.parcial': 'Parcial',
    'cab.bajoHorizonte': 'Bajo el horizonte',
    'cab.maximo': 'Máximo',
    'cuenta.empieza': 'Empieza en',
    'cuenta.totalidadEn': 'Totalidad en',
    'cuenta.termina': 'Termina en',
    'cuenta.ahora': 'TOTALIDAD — quítate las gafas',
    'cuenta.terminado': 'El eclipse ha terminado',

    // Destinos
    'dest.titulo': '¿Dónde lo verás mejor?',
    'dest.intro': 'El eclipse cruza nueve países y la duración cambia muchísimo: seis minutos y medio en Egipto, menos de dos en Málaga. Compara qué ganas por cada desplazamiento.',
    'dest.regCerca': 'Cerca de mí', 'dest.regTodas': 'Todo el recorrido',
    'dest.regIberia': 'Península y Estrecho', 'dest.regMagreb': 'Magreb',
    'dest.regLibia': 'Libia', 'dest.regEgipto': 'Egipto',
    'dest.regArabia': 'Península arábiga', 'dest.regCuerno': 'Yemen y Cuerno de África',
    'dest.sinResultados': 'No hay destinos en esta región con los filtros elegidos.',
    'dest.ordenar': 'Ordenar por',
    'dest.masTotalidad': 'Más totalidad',
    'dest.equilibrio': 'Mejor relación con el viaje',
    'dest.masCerca': 'Más cerca',
    'dest.tipoTodos': 'Todos',
    'dest.anadirNubes': 'Añadir previsión de nubes',
    'dest.consultando': 'Consultando…',
    'dest.deTotalidad': 'de totalidad',
    'dest.sinCorona': 'no verás la corona',
    'dest.igual': 'igual que aquí',
    'dest.parcialPct': 'parcial {pct}%',
    'dest.barco': 'barco',
    'dest.total': 'Eclipse total',
    'dest.parcial': 'Eclipse parcial',
    'dest.avisoTotal': 'Aquí el Sol queda totalmente cubierto durante {dur}. SOLO en ese intervalo puedes mirar sin filtro; antes y después, gafas obligatorias.',
    'dest.avisoParcial': 'Aquí el eclipse NO llega a ser total: se cubre el {pct}% del Sol pero siempre queda un filo visible. No te quites las gafas en ningún momento — ese filo basta para dañar la retina.',
    'dest.avion': 'avión',
    'dest.avisoAvion': 'A esta distancia el viaje es en avión. El tiempo estimado incluye ir al aeropuerto, facturar y salir al otro lado, pero no escalas ni conexiones.',
    'dest.notaAvion': 'Duraciones calculadas en tu dispositivo. El tiempo de viaje estima un vuelo directo con el trámite aeroportuario incluido; comprueba si hay ruta directa desde tu ciudad.',
    'dest.horaLocal': 'máximo {hora} hora local',
    'dest.comoLlegar': 'Cómo llegar',
    'dest.verMapa': 'Ver en el mapa',
    'dest.avisoHuso': 'Ojo con el huso: en {pais} el máximo es a las {hora} hora local. Comprueba la diferencia con tu punto de partida.',
    'dest.avisoBarco': 'Hay que cruzar en barco. La travesía y el embarque ya están en el tiempo estimado, pero el billete se reserva aparte y el día del eclipse irá lleno.',
    'dest.totalidad': 'Totalidad', 'dest.distancia': 'Distancia', 'dest.viaje': 'Viaje',
    'dest.nota': 'Duraciones calculadas en tu dispositivo. Los tiempos de viaje son estimaciones en coche puerta a puerta; el día del eclipse habrá tráfico excepcional en toda la franja.',

    // Mapa
    'mapa.pista': 'Toca el mapa para elegir un punto',
    'mapa.capas': 'Capas',
    'mapa.fondo': 'Fondo del mapa',
    'mapa.sobreMapa': 'Sobre el mapa',
    'mapa.relieve': 'Relieve', 'mapa.relieveDesc': 'Fondo claro y neutro',
    'mapa.ign': 'Mapa IGN', 'mapa.ignDesc': 'Cartografía oficial española',
    'mapa.satelite': 'Ortofoto PNOA', 'mapa.sateliteDesc': 'Satélite del IGN — solo España',
    'mapa.franja': 'Franja de totalidad', 'mapa.franjaDesc': 'Dónde el eclipse es total',
    'mapa.central': 'Línea central', 'mapa.centralDesc': 'Máxima duración',
    'mapa.sombras': 'Zonas en sombra', 'mapa.sombrasDesc': 'Dónde el relieve tapa el Sol',
    'mapa.nubes': 'Nubosidad prevista', 'mapa.nubesDesc': 'A la hora del eclipse',
    'mapa.dirSol': 'Dirección del Sol',
    'mapa.norte': 'Volver al norte',
    'mapa.miUbicacion': 'Mi ubicación',

    // Detalles
    'det.obscuracion': 'Obscuración', 'det.magnitud': 'Magnitud',
    'det.alturaSol': 'Altura del Sol', 'det.direccion': 'Dirección',
    'det.totalidad': 'Totalidad',
    'det.totalidadNota': 'Es el tiempo que podrás mirar al Sol sin filtro. Ni un segundo más.',
    'det.horario': 'Horario',
    'det.c1': 'Primer contacto', 'det.c1sub': 'La Luna muerde el Sol',
    'det.c2': 'Empieza la totalidad', 'det.c2sub': '¡Quítate las gafas!',
    'det.max': 'Máximo',
    'det.c3': 'Acaba la totalidad', 'det.c3sub': 'Gafas otra vez, ya',
    'det.c4': 'Último contacto', 'det.c4sub': 'Fin del eclipse',
    'det.ocaso': 'Ocaso',
    'det.tapaAlgo': '¿Te tapa algo desde aquí?',
    'det.noVisible': 'Desde este punto el eclipse no es visible: los discos del Sol y la Luna no llegan a solaparse.',

    // Nubes
    'nub.titulo': 'Previsión de nubes',
    'nub.cargando': 'Consultando la previsión…',
    'nub.bajas': 'Nubes bajas', 'nub.bajasDesc': 'Tapan por completo',
    'nub.medias': 'Nubes medias', 'nub.mediasDesc': 'Suelen tapar',
    'nub.altas': 'Nubes altas', 'nub.altasDesc': 'Cirros: dejan ver el Sol',
    'nub.buenas': 'Buenas perspectivas', 'nub.dudoso': 'Dudoso',
    'nub.malas': 'Malas perspectivas', 'nub.cubierto': 'Muy cubierto',
    'nub.sinDatos': 'Sin datos',
    'nub.lejos': 'Faltan {dias} días. Los modelos solo predicen con fiabilidad a 16 días vista.',

    // AR
    'ar.titulo': 'Apunta al cielo',
    'ar.activar': 'Activar cámara y sensores',
    'ar.verEclipse': 'Ver el eclipse aquí',
    'ar.volverCamara': 'Cámara',
    'ar.sinBrujula': 'Sin brújula',
    'ar.calibra': 'Mueve el móvil en forma de 8 para calibrar la brújula',
    'ar.ahiEstara': 'Justo ahí estará el Sol',
    'ar.ahiTotalidad': '¡Ahí estará la totalidad!',
    'ar.aGrados': 'A {n}° de donde apuntas',
    'ar.fueraEncuadre': 'El Sol queda fuera de este encuadre',
    'ar.brujula': 'brújula',

    // Órbitas
    'orb.tierra': 'Tierra', 'orb.sistema': 'Sistema', 'orb.sombra': 'Sombra',
    'orb.ahora': 'Ahora', 'orb.vista': 'Vista',
    'orb.queEscala': '¿Qué está a escala?',
    'orb.umbraSobre': 'Umbra sobre {lat}°N {lon}° · franja de {km} km',
    'orb.sinTocar': 'La umbra aún no toca la Tierra',

    // Comunes
    'com.cerrar': 'Cerrar', 'com.buscar': 'Busca una ciudad…',
    'com.idioma': 'Idioma',
    'com.min': 'min', 'com.s': 's', 'com.km': 'km', 'com.h': 'h',
  },

  en: {
    _nombre: 'English', _dir: 'ltr', _locale: 'en-GB',

    'nav.mapa': 'Map', 'nav.destinos': 'Where to go', 'nav.nubes': 'Clouds',
    'nav.ar': 'AR', 'nav.orbitas': 'Orbits',

    'cab.elige': 'Pick a place',
    'cab.detalles': 'details',
    'cab.total': 'Total',
    'cab.parcial': 'Partial',
    'cab.bajoHorizonte': 'Below horizon',
    'cab.maximo': 'Maximum',
    'cuenta.empieza': 'Starts in',
    'cuenta.totalidadEn': 'Totality in',
    'cuenta.termina': 'Ends in',
    'cuenta.ahora': 'TOTALITY — glasses off',
    'cuenta.terminado': 'The eclipse has ended',

    'dest.titulo': 'Where will you see it best?',
    'dest.intro': 'The eclipse crosses nine countries and the duration varies enormously: six and a half minutes in Egypt, under two in Málaga. Compare what each trip buys you.',
    'dest.regCerca': 'Near me', 'dest.regTodas': 'Whole path',
    'dest.regIberia': 'Iberia and the Strait', 'dest.regMagreb': 'Maghreb',
    'dest.regLibia': 'Libya', 'dest.regEgipto': 'Egypt',
    'dest.regArabia': 'Arabian Peninsula', 'dest.regCuerno': 'Yemen and Horn of Africa',
    'dest.sinResultados': 'No destinations in this region with the chosen filters.',
    'dest.ordenar': 'Sort by',
    'dest.masTotalidad': 'Longest totality',
    'dest.equilibrio': 'Best value for the trip',
    'dest.masCerca': 'Nearest',
    'dest.tipoTodos': 'All',
    'dest.anadirNubes': 'Add cloud forecast',
    'dest.consultando': 'Checking…',
    'dest.deTotalidad': 'of totality',
    'dest.sinCorona': 'you will not see the corona',
    'dest.igual': 'same as here',
    'dest.parcialPct': 'partial {pct}%',
    'dest.barco': 'ferry',
    'dest.total': 'Total eclipse',
    'dest.parcial': 'Partial eclipse',
    'dest.avisoTotal': 'Here the Sun is fully covered for {dur}. ONLY during that window can you look without a filter; before and after, glasses are mandatory.',
    'dest.avisoParcial': 'Here the eclipse never becomes total: {pct}% of the Sun is covered but a sliver always remains visible. Keep your glasses on at all times — that sliver is enough to damage your retina.',
    'dest.avion': 'flight',
    'dest.avisoAvion': 'At this distance the trip means flying. The estimate includes getting to the airport, check-in and clearing the other end, but not layovers or connections.',
    'dest.notaAvion': 'Durations computed on your device. Travel time assumes a direct flight including airport time; check whether a direct route exists from your city.',
    'dest.horaLocal': 'max {hora} local time',
    'dest.comoLlegar': 'Directions',
    'dest.verMapa': 'Show on map',
    'dest.avisoHuso': 'Mind the time zone: in {pais} maximum is at {hora} local time. Check the difference from where you start.',
    'dest.avisoBarco': 'This requires a ferry crossing. Sailing and boarding are already in the estimate, but the ticket is booked separately and will sell out on eclipse day.',
    'dest.totalidad': 'Totality', 'dest.distancia': 'Distance', 'dest.viaje': 'Travel',
    'dest.nota': 'Durations computed on your device. Travel times are door-to-door driving estimates; expect exceptional traffic along the path on the day.',

    'mapa.pista': 'Tap the map to pick a spot',
    'mapa.capas': 'Layers',
    'mapa.fondo': 'Base map',
    'mapa.sobreMapa': 'Overlays',
    'mapa.relieve': 'Terrain', 'mapa.relieveDesc': 'Light, neutral background',
    'mapa.ign': 'IGN map', 'mapa.ignDesc': 'Official Spanish cartography',
    'mapa.satelite': 'PNOA imagery', 'mapa.sateliteDesc': 'IGN satellite — Spain only',
    'mapa.franja': 'Path of totality', 'mapa.franjaDesc': 'Where the eclipse is total',
    'mapa.central': 'Centre line', 'mapa.centralDesc': 'Longest duration',
    'mapa.sombras': 'Terrain shadow', 'mapa.sombrasDesc': 'Where the land blocks the Sun',
    'mapa.nubes': 'Cloud forecast', 'mapa.nubesDesc': 'At eclipse time',
    'mapa.dirSol': 'Direction of the Sun',
    'mapa.norte': 'Reset north',
    'mapa.miUbicacion': 'My location',

    'det.obscuracion': 'Obscuration', 'det.magnitud': 'Magnitude',
    'det.alturaSol': 'Sun altitude', 'det.direccion': 'Direction',
    'det.totalidad': 'Totality',
    'det.totalidadNota': 'That is how long you can look without a filter. Not one second more.',
    'det.horario': 'Timings',
    'det.c1': 'First contact', 'det.c1sub': 'The Moon bites into the Sun',
    'det.c2': 'Totality begins', 'det.c2sub': 'Glasses off!',
    'det.max': 'Maximum',
    'det.c3': 'Totality ends', 'det.c3sub': 'Glasses back on, now',
    'det.c4': 'Last contact', 'det.c4sub': 'Eclipse over',
    'det.ocaso': 'Sunset',
    'det.tapaAlgo': 'Is anything in the way here?',
    'det.noVisible': 'The eclipse is not visible from this point: the discs never overlap.',

    'nub.titulo': 'Cloud forecast',
    'nub.cargando': 'Fetching the forecast…',
    'nub.bajas': 'Low cloud', 'nub.bajasDesc': 'Blocks completely',
    'nub.medias': 'Mid cloud', 'nub.mediasDesc': 'Usually blocks',
    'nub.altas': 'High cloud', 'nub.altasDesc': 'Cirrus: Sun still visible',
    'nub.buenas': 'Good prospects', 'nub.dudoso': 'Uncertain',
    'nub.malas': 'Poor prospects', 'nub.cubierto': 'Heavily overcast',
    'nub.sinDatos': 'No data',
    'nub.lejos': '{dias} days to go. Models only forecast reliably 16 days ahead.',

    'ar.titulo': 'Point at the sky',
    'ar.activar': 'Enable camera and sensors',
    'ar.verEclipse': 'See the eclipse here',
    'ar.volverCamara': 'Camera',
    'ar.sinBrujula': 'No compass',
    'ar.calibra': 'Move the phone in a figure of eight to calibrate the compass',
    'ar.ahiEstara': 'The Sun will be right there',
    'ar.ahiTotalidad': 'Totality will be there!',
    'ar.aGrados': '{n}° from where you are pointing',
    'ar.fueraEncuadre': 'The Sun falls outside this frame',
    'ar.brujula': 'compass',

    'orb.tierra': 'Earth', 'orb.sistema': 'System', 'orb.sombra': 'Shadow',
    'orb.ahora': 'Now', 'orb.vista': 'View',
    'orb.queEscala': "What's to scale?",
    'orb.umbraSobre': 'Umbra over {lat}°N {lon}° · {km} km wide',
    'orb.sinTocar': 'The umbra has not reached Earth yet',

    'com.cerrar': 'Close', 'com.buscar': 'Search for a city…',
    'com.idioma': 'Language',
    'com.min': 'min', 'com.s': 's', 'com.km': 'km', 'com.h': 'h',
  },

  fr: {
    _nombre: 'Français', _dir: 'ltr', _locale: 'fr-FR',

    'nav.mapa': 'Carte', 'nav.destinos': 'Où aller', 'nav.nubes': 'Nuages',
    'nav.ar': 'RA', 'nav.orbitas': 'Orbites',

    'cab.elige': 'Choisir un lieu',
    'cab.detalles': 'détails',
    'cab.total': 'Totale',
    'cab.parcial': 'Partielle',
    'cab.bajoHorizonte': 'Sous l’horizon',
    'cab.maximo': 'Maximum',
    'cuenta.empieza': 'Commence dans',
    'cuenta.totalidadEn': 'Totalité dans',
    'cuenta.termina': 'Se termine dans',
    'cuenta.ahora': 'TOTALITÉ — enlevez les lunettes',
    'cuenta.terminado': 'L’éclipse est terminée',

    'dest.titulo': 'Où la verrez-vous le mieux ?',
    'dest.intro': 'L’éclipse traverse neuf pays et la durée varie énormément : six minutes et demie en Égypte, moins de deux à Málaga. Comparez ce que chaque déplacement vous apporte.',
    'dest.regCerca': 'Près de moi', 'dest.regTodas': 'Tout le tracé',
    'dest.regIberia': 'Ibérie et Détroit', 'dest.regMagreb': 'Maghreb',
    'dest.regLibia': 'Libye', 'dest.regEgipto': 'Égypte',
    'dest.regArabia': 'Péninsule arabique', 'dest.regCuerno': 'Yémen et Corne de l’Afrique',
    'dest.sinResultados': 'Aucune destination dans cette région avec ces filtres.',
    'dest.ordenar': 'Trier par',
    'dest.masTotalidad': 'Totalité la plus longue',
    'dest.equilibrio': 'Meilleur rapport au trajet',
    'dest.masCerca': 'Le plus proche',
    'dest.tipoTodos': 'Tous',
    'dest.anadirNubes': 'Ajouter les prévisions',
    'dest.consultando': 'Consultation…',
    'dest.deTotalidad': 'de totalité',
    'dest.sinCorona': 'vous ne verrez pas la couronne',
    'dest.igual': 'comme ici',
    'dest.parcialPct': 'partielle {pct} %',
    'dest.barco': 'bateau',
    'dest.total': 'Éclipse totale',
    'dest.parcial': 'Éclipse partielle',
    'dest.avisoTotal': 'Ici le Soleil est totalement couvert pendant {dur}. UNIQUEMENT durant cet intervalle vous pouvez regarder sans filtre ; avant et après, lunettes obligatoires.',
    'dest.avisoParcial': 'Ici l’éclipse n’est jamais totale : {pct} % du Soleil est couvert mais un croissant reste toujours visible. Gardez les lunettes en permanence — ce croissant suffit à léser la rétine.',
    'dest.avion': 'avion',
    'dest.avisoAvion': 'À cette distance le trajet se fait en avion. L’estimation inclut l’aéroport et l’enregistrement, mais pas les escales ni les correspondances.',
    'dest.notaAvion': 'Durées calculées sur votre appareil. Le temps de trajet suppose un vol direct avec les formalités incluses ; vérifiez s’il existe une liaison directe depuis votre ville.',
    'dest.horaLocal': 'max {hora} heure locale',
    'dest.comoLlegar': 'Itinéraire',
    'dest.verMapa': 'Voir sur la carte',
    'dest.avisoHuso': 'Attention au fuseau : au {pais} le maximum est à {hora} heure locale. Vérifiez l’écart avec votre point de départ.',
    'dest.avisoBarco': 'Il faut traverser en bateau. La traversée et l’embarquement sont déjà comptés, mais le billet se réserve à part et sera complet le jour de l’éclipse.',
    'dest.totalidad': 'Totalité', 'dest.distancia': 'Distance', 'dest.viaje': 'Trajet',
    'dest.nota': 'Durées calculées sur votre appareil. Les temps de trajet sont des estimations en voiture ; attendez-vous à un trafic exceptionnel le jour même.',

    'mapa.pista': 'Touchez la carte pour choisir un point',
    'mapa.capas': 'Couches',
    'mapa.fondo': 'Fond de carte',
    'mapa.sobreMapa': 'Superpositions',
    'mapa.relieve': 'Relief', 'mapa.relieveDesc': 'Fond clair et neutre',
    'mapa.ign': 'Carte IGN', 'mapa.ignDesc': 'Cartographie officielle espagnole',
    'mapa.satelite': 'Ortho PNOA', 'mapa.sateliteDesc': 'Satellite IGN — Espagne',
    'mapa.franja': 'Bande de totalité', 'mapa.franjaDesc': 'Où l’éclipse est totale',
    'mapa.central': 'Ligne centrale', 'mapa.centralDesc': 'Durée maximale',
    'mapa.sombras': 'Ombre du relief', 'mapa.sombrasDesc': 'Où le relief cache le Soleil',
    'mapa.nubes': 'Nuages prévus', 'mapa.nubesDesc': 'À l’heure de l’éclipse',
    'mapa.dirSol': 'Direction du Soleil',
    'mapa.norte': 'Revenir au nord',
    'mapa.miUbicacion': 'Ma position',

    'det.obscuracion': 'Obscuration', 'det.magnitud': 'Magnitude',
    'det.alturaSol': 'Hauteur du Soleil', 'det.direccion': 'Direction',
    'det.totalidad': 'Totalité',
    'det.totalidadNota': 'C’est le temps pendant lequel vous pouvez regarder sans filtre. Pas une seconde de plus.',
    'det.horario': 'Horaires',
    'det.c1': 'Premier contact', 'det.c1sub': 'La Lune mord le Soleil',
    'det.c2': 'Début de la totalité', 'det.c2sub': 'Enlevez les lunettes !',
    'det.max': 'Maximum',
    'det.c3': 'Fin de la totalité', 'det.c3sub': 'Remettez les lunettes, tout de suite',
    'det.c4': 'Dernier contact', 'det.c4sub': 'Fin de l’éclipse',
    'det.ocaso': 'Coucher du Soleil',
    'det.tapaAlgo': 'Quelque chose gêne-t-il d’ici ?',
    'det.noVisible': 'L’éclipse n’est pas visible depuis ce point : les disques ne se recouvrent pas.',

    'nub.titulo': 'Prévision nuageuse',
    'nub.cargando': 'Consultation des prévisions…',
    'nub.bajas': 'Nuages bas', 'nub.bajasDesc': 'Cachent totalement',
    'nub.medias': 'Nuages moyens', 'nub.mediasDesc': 'Cachent souvent',
    'nub.altas': 'Nuages hauts', 'nub.altasDesc': 'Cirrus : le Soleil reste visible',
    'nub.buenas': 'Bonnes perspectives', 'nub.dudoso': 'Incertain',
    'nub.malas': 'Mauvaises perspectives', 'nub.cubierto': 'Très couvert',
    'nub.sinDatos': 'Pas de données',
    'nub.lejos': 'Encore {dias} jours. Les modèles ne prévoient de façon fiable qu’à 16 jours.',

    'ar.titulo': 'Visez le ciel',
    'ar.activar': 'Activer caméra et capteurs',
    'ar.verEclipse': 'Voir l’éclipse ici',
    'ar.volverCamara': 'Caméra',
    'ar.sinBrujula': 'Pas de boussole',
    'ar.calibra': 'Bougez le téléphone en huit pour calibrer la boussole',
    'ar.ahiEstara': 'Le Soleil sera juste là',
    'ar.ahiTotalidad': 'La totalité sera là !',
    'ar.aGrados': 'À {n}° de votre visée',
    'ar.fueraEncuadre': 'Le Soleil est hors du cadre',
    'ar.brujula': 'boussole',

    'orb.tierra': 'Terre', 'orb.sistema': 'Système', 'orb.sombra': 'Ombre',
    'orb.ahora': 'Maintenant', 'orb.vista': 'Vue',
    'orb.queEscala': 'Qu’est-ce qui est à l’échelle ?',
    'orb.umbraSobre': 'Ombre sur {lat}°N {lon}° · bande de {km} km',
    'orb.sinTocar': 'L’ombre n’atteint pas encore la Terre',

    'com.cerrar': 'Fermer', 'com.buscar': 'Chercher une ville…',
    'com.idioma': 'Langue',
    'com.min': 'min', 'com.s': 's', 'com.km': 'km', 'com.h': 'h',
  },

  ar: {
    _nombre: 'العربية', _dir: 'rtl', _locale: 'ar',

    'nav.mapa': 'الخريطة', 'nav.destinos': 'أين أذهب', 'nav.nubes': 'الغيوم',
    'nav.ar': 'الواقع المعزز', 'nav.orbitas': 'المدارات',

    'cab.elige': 'اختر مكانًا',
    'cab.detalles': 'تفاصيل',
    'cab.total': 'كلي',
    'cab.parcial': 'جزئي',
    'cab.bajoHorizonte': 'تحت الأفق',
    'cab.maximo': 'الذروة',
    'cuenta.empieza': 'يبدأ خلال',
    'cuenta.totalidadEn': 'الكسوف الكلي خلال',
    'cuenta.termina': 'ينتهي خلال',
    'cuenta.ahora': 'الكسوف الكلي — انزع النظارات',
    'cuenta.terminado': 'انتهى الكسوف',

    'dest.titulo': 'أين ستراه بأفضل شكل؟',
    'dest.intro': 'يعبر الكسوف تسع دول وتتفاوت المدة كثيرًا: ست دقائق ونصف في مصر، وأقل من دقيقتين في مالقة. قارن ما تكسبه من كل رحلة.',
    'dest.regCerca': 'قريب مني', 'dest.regTodas': 'المسار كامل',
    'dest.regIberia': 'إيبيريا والمضيق', 'dest.regMagreb': 'المغرب العربي',
    'dest.regLibia': 'ليبيا', 'dest.regEgipto': 'مصر',
    'dest.regArabia': 'شبه الجزيرة العربية', 'dest.regCuerno': 'اليمن والقرن الأفريقي',
    'dest.sinResultados': 'لا توجد وجهات في هذه المنطقة بهذه المرشحات.',
    'dest.ordenar': 'ترتيب حسب',
    'dest.masTotalidad': 'أطول مدة كلية',
    'dest.equilibrio': 'أفضل نسبة إلى الرحلة',
    'dest.masCerca': 'الأقرب',
    'dest.tipoTodos': 'الكل',
    'dest.anadirNubes': 'إضافة توقعات الغيوم',
    'dest.consultando': 'جارٍ الاستعلام…',
    'dest.deTotalidad': 'من الكسوف الكلي',
    'dest.sinCorona': 'لن ترى الإكليل',
    'dest.igual': 'مثل هنا',
    'dest.parcialPct': 'جزئي {pct}٪',
    'dest.barco': 'عبّارة',
    'dest.total': 'كسوف كلي',
    'dest.parcial': 'كسوف جزئي',
    'dest.avisoTotal': 'هنا تُغطى الشمس بالكامل لمدة {dur}. في تلك الفترة فقط يمكنك النظر دون مرشِّح؛ قبلها وبعدها النظارات إلزامية.',
    'dest.avisoParcial': 'هنا لا يصل الكسوف إلى الكلية: يُغطى {pct}٪ من الشمس لكن يبقى جزء ظاهر دائمًا. لا تنزع النظارات في أي لحظة — ذلك الجزء كافٍ لإتلاف الشبكية.',
    'dest.avion': 'طيران',
    'dest.avisoAvion': 'على هذه المسافة تكون الرحلة بالطائرة. الوقت المقدَّر يشمل الوصول إلى المطار وإجراءات السفر، لكن دون توقفات أو رحلات ربط.',
    'dest.notaAvion': 'المدد محسوبة على جهازك. زمن الرحلة يفترض رحلة مباشرة مع إجراءات المطار؛ تحقق من وجود خط مباشر من مدينتك.',
    'dest.horaLocal': 'الذروة {hora} بالتوقيت المحلي',
    'dest.comoLlegar': 'الاتجاهات',
    'dest.verMapa': 'عرض على الخريطة',
    'dest.avisoHuso': 'انتبه للتوقيت: في {pais} تكون الذروة الساعة {hora} بالتوقيت المحلي. تحقق من الفارق مع نقطة انطلاقك.',
    'dest.avisoBarco': 'يتطلب عبور البحر. مدة الرحلة والصعود محتسبة، لكن التذكرة تُحجز بشكل منفصل وستنفد يوم الكسوف.',
    'dest.totalidad': 'المدة الكلية', 'dest.distancia': 'المسافة', 'dest.viaje': 'الرحلة',
    'dest.nota': 'المدد محسوبة على جهازك. أوقات الرحلة تقديرية بالسيارة من الباب إلى الباب؛ توقّع ازدحامًا استثنائيًا يوم الكسوف.',

    'mapa.pista': 'المس الخريطة لاختيار نقطة',
    'mapa.capas': 'الطبقات',
    'mapa.fondo': 'خلفية الخريطة',
    'mapa.sobreMapa': 'فوق الخريطة',
    'mapa.relieve': 'التضاريس', 'mapa.relieveDesc': 'خلفية فاتحة ومحايدة',
    'mapa.ign': 'خريطة IGN', 'mapa.ignDesc': 'الخرائط الرسمية الإسبانية',
    'mapa.satelite': 'صور PNOA', 'mapa.sateliteDesc': 'أقمار IGN — إسبانيا فقط',
    'mapa.franja': 'نطاق الكسوف الكلي', 'mapa.franjaDesc': 'حيث يكون الكسوف كليًا',
    'mapa.central': 'الخط المركزي', 'mapa.centralDesc': 'أطول مدة',
    'mapa.sombras': 'ظل التضاريس', 'mapa.sombrasDesc': 'حيث تحجب الأرض الشمس',
    'mapa.nubes': 'الغيوم المتوقعة', 'mapa.nubesDesc': 'في وقت الكسوف',
    'mapa.dirSol': 'اتجاه الشمس',
    'mapa.norte': 'العودة إلى الشمال',
    'mapa.miUbicacion': 'موقعي',

    'det.obscuracion': 'نسبة الحجب', 'det.magnitud': 'القدر',
    'det.alturaSol': 'ارتفاع الشمس', 'det.direccion': 'الاتجاه',
    'det.totalidad': 'المدة الكلية',
    'det.totalidadNota': 'هذه هي المدة التي يمكنك فيها النظر دون مرشِّح. ولا ثانية أكثر.',
    'det.horario': 'المواقيت',
    'det.c1': 'التماس الأول', 'det.c1sub': 'القمر يبدأ بتغطية الشمس',
    'det.c2': 'بداية الكسوف الكلي', 'det.c2sub': 'انزع النظارات!',
    'det.max': 'الذروة',
    'det.c3': 'نهاية الكسوف الكلي', 'det.c3sub': 'أعد النظارات فورًا',
    'det.c4': 'التماس الأخير', 'det.c4sub': 'انتهاء الكسوف',
    'det.ocaso': 'الغروب',
    'det.tapaAlgo': 'هل يحجبك شيء من هنا؟',
    'det.noVisible': 'الكسوف غير مرئي من هذه النقطة: قرصا الشمس والقمر لا يتداخلان.',

    'nub.titulo': 'توقعات الغيوم',
    'nub.cargando': 'جارٍ جلب التوقعات…',
    'nub.bajas': 'غيوم منخفضة', 'nub.bajasDesc': 'تحجب تمامًا',
    'nub.medias': 'غيوم متوسطة', 'nub.mediasDesc': 'تحجب غالبًا',
    'nub.altas': 'غيوم مرتفعة', 'nub.altasDesc': 'سمحاق: تبقى الشمس مرئية',
    'nub.buenas': 'توقعات جيدة', 'nub.dudoso': 'غير مؤكد',
    'nub.malas': 'توقعات سيئة', 'nub.cubierto': 'غائم كثيف',
    'nub.sinDatos': 'لا توجد بيانات',
    'nub.lejos': 'بقي {dias} يومًا. النماذج تتنبأ بثقة خلال 16 يومًا فقط.',

    'ar.titulo': 'وجّه الهاتف نحو السماء',
    'ar.activar': 'تفعيل الكاميرا والمستشعرات',
    'ar.verEclipse': 'شاهد الكسوف من هنا',
    'ar.volverCamara': 'الكاميرا',
    'ar.sinBrujula': 'لا توجد بوصلة',
    'ar.calibra': 'حرّك الهاتف على شكل رقم ٨ لمعايرة البوصلة',
    'ar.ahiEstara': 'ستكون الشمس هناك تمامًا',
    'ar.ahiTotalidad': 'هناك سيقع الكسوف الكلي!',
    'ar.aGrados': 'على بُعد {n}° من اتجاهك',
    'ar.fueraEncuadre': 'الشمس خارج هذا الإطار',
    'ar.brujula': 'البوصلة',

    'orb.tierra': 'الأرض', 'orb.sistema': 'المنظومة', 'orb.sombra': 'الظل',
    'orb.ahora': 'الآن', 'orb.vista': 'المنظور',
    'orb.queEscala': 'ما المرسوم بمقياس حقيقي؟',
    'orb.umbraSobre': 'الظل فوق {lat}°ش {lon}° · نطاق {km} كم',
    'orb.sinTocar': 'الظل لم يصل الأرض بعد',

    'com.cerrar': 'إغلاق', 'com.buscar': 'ابحث عن مدينة…',
    'com.idioma': 'اللغة',
    'com.min': 'د', 'com.s': 'ث', 'com.km': 'كم', 'com.h': 'س',
  },
};

export const IDIOMAS = Object.entries(CATALOGO).map(([codigo, c]) => ({
  codigo, nombre: c._nombre, dir: c._dir,
}));

let actual = 'es';

/**
 * Idioma inicial.
 *
 * Orden: lo que el usuario eligió > lo que pide la URL > lo que dice el
 * navegador > el idioma de la zona horaria > español.
 *
 * EL INGLÉS SE TRATA APARTE, y no por capricho. `navigator.languages` refleja la
 * configuración del navegador, no la lengua materna: muchísima gente usa el
 * navegador en inglés siendo hispanohablante o arabófona. Coger sin más el
 * primero de la lista hacía que a un usuario español le saliera la app en
 * inglés. Como el inglés es el segundo idioma de casi todo el mundo, su
 * presencia en la lista es una señal DÉBIL; la de español, francés o árabe es
 * fuerte. Así que si aparece cualquiera de esos, gana sobre el inglés aunque
 * figure después.
 */
function detectar() {
  try {
    const guardado = localStorage.getItem('idioma');
    if (guardado && CATALOGO[guardado]) return guardado;
  } catch { /* modo privado */ }

  // ?lang=ar — permite compartir un enlace ya en un idioma concreto.
  const pedido = new URLSearchParams(location.search).get('lang');
  if (pedido && CATALOGO[pedido]) return pedido;

  const preferencias = (navigator.languages?.length
    ? navigator.languages
    : [navigator.language ?? ''])
    .map((x) => String(x).toLowerCase().split('-')[0])
    .filter((x) => CATALOGO[x]);

  const noIngles = preferencias.find((x) => x !== 'en');
  if (noIngles) return noIngles;

  // Solo inglés en la lista: se contrasta con la zona horaria antes de aceptarlo.
  // Alguien en Madrid o Casablanca con el navegador en inglés es casi seguro
  // que prefiere leerlo en su idioma.
  const porZona = idiomaSegunZonaHoraria();
  if (porZona) return porZona;

  if (preferencias.includes('en')) return 'en';
  return 'es';
}

/**
 * Idioma probable según la zona horaria del dispositivo. Es una pista, no una
 * certeza, así que solo se usa cuando el navegador no da ninguna otra.
 */
function idiomaSegunZonaHoraria() {
  let zona = '';
  try { zona = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''; } catch { return null; }
  if (/Madrid|Ceuta|Canary/.test(zona)) return 'es';
  if (/Casablanca|Algiers|Tunis|Tripoli|Cairo|Riyadh|Aden|Mogadishu|El_Aaiun/.test(zona)) return 'ar';
  if (/Paris|Brussels|Luxembourg|Monaco/.test(zona)) return 'fr';
  return null;
}

export function idiomaActual() { return actual; }
export function esRTL() { return CATALOGO[actual]._dir === 'rtl'; }
export function localeActual() { return CATALOGO[actual]._locale; }

/**
 * Traduce una clave. Los parámetros se sustituyen como {nombre}.
 * Si falta la traducción cae al español, y si tampoco está devuelve la clave:
 * así una cadena sin traducir se ve en la interfaz en vez de quedar en blanco.
 */
export function t(clave, params) {
  const valor = CATALOGO[actual]?.[clave] ?? CATALOGO.es[clave] ?? clave;
  if (!params) return valor;
  return valor.replace(/\{(\w+)\}/g, (_, k) => (params[k] ?? `{${k}}`));
}

/** Cambia de idioma y vuelve a pintar toda la interfaz. */
export function setIdioma(codigo) {
  if (!CATALOGO[codigo]) return;
  actual = codigo;
  try { localStorage.setItem('idioma', codigo); } catch { /* modo privado */ }
  aplicar();
  document.dispatchEvent(new CustomEvent('i18n:cambio', { detail: { idioma: codigo } }));
}

/**
 * Aplica el idioma al documento: dirección del texto, atributo lang y todos los
 * nodos marcados con data-i18n.
 *
 * La dirección es lo que hace que el árabe funcione de verdad. Con dir="rtl" el
 * navegador refleja el flujo del texto, y el CSS usa propiedades lógicas
 * (inset-inline-start en vez de left) para que la maquetación acompañe.
 */
export function aplicar() {
  const c = CATALOGO[actual];
  document.documentElement.lang = actual;
  document.documentElement.dir = c._dir;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    // Formato: "atributo:clave, atributo:clave"
    for (const par of el.dataset.i18nAttr.split(',')) {
      const [attr, clave] = par.split(':').map((s) => s.trim());
      if (attr && clave) el.setAttribute(attr, t(clave));
    }
  });
}

export function init() {
  actual = detectar();
  aplicar();
}
