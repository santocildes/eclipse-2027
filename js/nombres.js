// js/nombres.js — topónimos localizados.
//
// Traducir la interfaz y dejar los lugares en español sería quedarse a medias:
// un lector árabe vería «Tetuán, Marruecos» con el resto de la pantalla en su
// idioma, y en su propio país. Aquí van los nombres de ciudades y países en
// cada lengua, con la forma que usa cada una.
//
// La clave es el nombre en español, que es el canónico en la lista de destinos.
// Lo que no esté traducido cae al canónico, así que añadir idiomas o lugares no
// rompe nada: solo mejora lo que ya funciona.

const CIUDAD = {
  // ── Marruecos ──
  'Tánger':        { ar: 'طنجة',        en: 'Tangier',   fr: 'Tanger' },
  'Tetuán':        { ar: 'تطوان',       en: 'Tetouan',   fr: 'Tétouan' },
  'Chefchaouen':   { ar: 'شفشاون',      en: 'Chefchaouen', fr: 'Chefchaouen' },
  'Alhucemas':     { ar: 'الحسيمة',     en: 'Al Hoceima', fr: 'Al Hoceïma' },
  'Nador':         { ar: 'الناظور',     en: 'Nador',     fr: 'Nador' },
  'Uchda':         { ar: 'وجدة',        en: 'Oujda',     fr: 'Oujda' },
  'Fez':           { ar: 'فاس',         en: 'Fez',       fr: 'Fès' },
  'Mequinez':      { ar: 'مكناس',       en: 'Meknes',    fr: 'Meknès' },
  'Rabat':         { ar: 'الرباط',      en: 'Rabat',     fr: 'Rabat' },
  'Casablanca':    { ar: 'الدار البيضاء', en: 'Casablanca', fr: 'Casablanca' },
  'Larache':       { ar: 'العرائش',     en: 'Larache',   fr: 'Larache' },
  'Alcazarquivir': { ar: 'القصر الكبير', en: 'Ksar el-Kebir', fr: 'Ksar el-Kébir' },


  // ── Egipto ──
  'Luxor':         { ar: 'الأقصر',      en: 'Luxor',     fr: 'Louxor' },
  'Sohag':         { ar: 'سوهاج',       en: 'Sohag',     fr: 'Sohag' },
  'Qena':          { ar: 'قنا',         en: 'Qena',      fr: 'Qena' },
  'Asiut':         { ar: 'أسيوط',       en: 'Asyut',     fr: 'Assiout' },
  'Asuán':         { ar: 'أسوان',       en: 'Aswan',     fr: 'Assouan' },
  'Marsa Alam':    { ar: 'مرسى علم',    en: 'Marsa Alam', fr: 'Marsa Alam' },
  'Minia':         { ar: 'المنيا',      en: 'Minya',     fr: 'Minya' },
  'Beni Suef':     { ar: 'بني سويف',    en: 'Beni Suef', fr: 'Beni Souef' },
  'Hurgada':       { ar: 'الغردقة',     en: 'Hurghada',  fr: 'Hurghada' },
  'El Cairo':      { ar: 'القاهرة',     en: 'Cairo',     fr: 'Le Caire' },
  // ── Libia ──
  'Bengasi':       { ar: 'بنغازي',      en: 'Benghazi',  fr: 'Benghazi' },
  'Trípoli':       { ar: 'طرابلس',      en: 'Tripoli',   fr: 'Tripoli' },
  'Misrata':       { ar: 'مصراتة',      en: 'Misrata',   fr: 'Misrata' },
  'Sirte':         { ar: 'سرت',         en: 'Sirte',     fr: 'Syrte' },
  'Tobruk':        { ar: 'طبرق',        en: 'Tobruk',    fr: 'Tobrouk' },
  'Ajdabiya':      { ar: 'أجدابيا',     en: 'Ajdabiya',  fr: 'Ajdabiya' },
  'Al Bayda':      { ar: 'البيضاء',     en: 'Al Bayda',  fr: 'Al Bayda' },
  // ── Arabia Saudí ──
  'La Meca':       { ar: 'مكة المكرمة', en: 'Mecca',     fr: 'La Mecque' },
  'Medina':        { ar: 'المدينة المنورة', en: 'Medina', fr: 'Médine' },
  'Yeda':          { ar: 'جدة',         en: 'Jeddah',    fr: 'Djeddah' },
  'Taif':          { ar: 'الطائف',      en: 'Taif',      fr: 'Taëf' },
  'Abha':          { ar: 'أبها',        en: 'Abha',      fr: 'Abha' },
  'Al Baha':       { ar: 'الباحة',      en: 'Al Bahah',  fr: 'Al Baha' },
  'Jazán':         { ar: 'جازان',       en: 'Jazan',     fr: 'Jizan' },
  'Yanbu':         { ar: 'ينبع',        en: 'Yanbu',     fr: 'Yanbu' },
  // ── Túnez ──
  'Sfax':          { ar: 'صفاقس',       en: 'Sfax',      fr: 'Sfax' },
  'Gabés':         { ar: 'قابس',        en: 'Gabès',     fr: 'Gabès' },
  'Yerba':         { ar: 'جربة',        en: 'Djerba',    fr: 'Djerba' },
  'Cairuán':       { ar: 'القيروان',    en: 'Kairouan',  fr: 'Kairouan' },
  'Tozeur':        { ar: 'توزر',        en: 'Tozeur',    fr: 'Tozeur' },
  'Susa':          { ar: 'سوسة',        en: 'Sousse',    fr: 'Sousse' },
  'Medenine':      { ar: 'مدنين',       en: 'Medenine',  fr: 'Médenine' },
  'Túnez':         { ar: 'تونس',        en: 'Tunis',     fr: 'Tunis' },
  // ── Argelia ──
  'Orán':          { ar: 'وهران',       en: 'Oran',      fr: 'Oran' },
  'Argel':         { ar: 'الجزائر',     en: 'Algiers',   fr: 'Alger' },
  'Constantina':   { ar: 'قسنطينة',     en: 'Constantine', fr: 'Constantine' },
  'Annaba':        { ar: 'عنابة',       en: 'Annaba',    fr: 'Annaba' },
  'Setif':         { ar: 'سطيف',        en: 'Sétif',     fr: 'Sétif' },
  'Batna':         { ar: 'باتنة',       en: 'Batna',     fr: 'Batna' },
  'Biskra':        { ar: 'بسكرة',       en: 'Biskra',    fr: 'Biskra' },
  'Tremecén':      { ar: 'تلمسان',      en: 'Tlemcen',   fr: 'Tlemcen' },
  'Mostaganem':    { ar: 'مستغانم',     en: 'Mostaganem', fr: 'Mostaganem' },
  // ── Yemen y Cuerno de África ──
  'Saná':          { ar: 'صنعاء',       en: "Sana'a",    fr: 'Sanaa' },
  'Adén':          { ar: 'عدن',         en: 'Aden',      fr: 'Aden' },
  'Hodeida':       { ar: 'الحديدة',     en: 'Hodeidah',  fr: 'Hodeïda' },
  'Mukalla':       { ar: 'المكلا',      en: 'Mukalla',   fr: 'Moukalla' },
  'Bosaso':        { ar: 'بوصاصو',      en: 'Bosaso',    fr: 'Bosaso' },
  'Berbera':       { ar: 'بربرة',       en: 'Berbera',   fr: 'Berbera' },
  'Hargeisa':      { ar: 'هرجيسا',      en: 'Hargeisa',  fr: 'Hargeisa' },

  // ── España y Gibraltar ──
  'Tarifa':        { ar: 'طريفة',       en: 'Tarifa',    fr: 'Tarifa' },
  'Algeciras':     { ar: 'الجزيرة الخضراء', en: 'Algeciras', fr: 'Algésiras' },
  'La Línea de la Concepción': { ar: 'لا لينيا', en: 'La Línea', fr: 'La Línea' },
  'Gibraltar':     { ar: 'جبل طارق',    en: 'Gibraltar', fr: 'Gibraltar' },
  'Ceuta':         { ar: 'سبتة',        en: 'Ceuta',     fr: 'Ceuta' },
  'Melilla':       { ar: 'مليلية',      en: 'Melilla',   fr: 'Melilla' },
  'Cádiz':         { ar: 'قادس',        en: 'Cádiz',     fr: 'Cadix' },
  'Málaga':        { ar: 'مالقة',       en: 'Málaga',    fr: 'Malaga' },
  'Marbella':      { ar: 'مربلة',       en: 'Marbella',  fr: 'Marbella' },
  'Estepona':      { ar: 'إستيبونا',    en: 'Estepona',  fr: 'Estepona' },
  'Fuengirola':    { ar: 'فوينخيرولا',  en: 'Fuengirola', fr: 'Fuengirola' },
  'Torremolinos':  { ar: 'توريمولينوس', en: 'Torremolinos', fr: 'Torremolinos' },
  'Barbate':       { ar: 'بربات',       en: 'Barbate',   fr: 'Barbate' },
  'Zahara de los Atunes': { ar: 'زهارة', en: 'Zahara',   fr: 'Zahara' },
  'Vejer de la Frontera': { ar: 'بيخير', en: 'Vejer',    fr: 'Vejer' },
  'Conil de la Frontera': { ar: 'كونيل', en: 'Conil',    fr: 'Conil' },
  'Chiclana de la Frontera': { ar: 'تشيكلانا', en: 'Chiclana', fr: 'Chiclana' },
  'Jerez de la Frontera': { ar: 'شريش',  en: 'Jerez',    fr: 'Jerez' },
  'Sanlúcar de Barrameda': { ar: 'سنلوكار', en: 'Sanlúcar', fr: 'Sanlúcar' },
  'Ronda':         { ar: 'رندة',        en: 'Ronda',     fr: 'Ronda' },
  'Sevilla':       { ar: 'إشبيلية',     en: 'Seville',   fr: 'Séville' },
  'Córdoba':       { ar: 'قرطبة',       en: 'Córdoba',   fr: 'Cordoue' },
  'Granada':       { ar: 'غرناطة',      en: 'Granada',   fr: 'Grenade' },
  'Almería':       { ar: 'المرية',      en: 'Almería',   fr: 'Almería' },
  'Motril':        { ar: 'موتريل',      en: 'Motril',    fr: 'Motril' },
  'Almuñécar':     { ar: 'المنكب',      en: 'Almuñécar', fr: 'Almuñécar' },
  'Salobreña':     { ar: 'شلوبانية',    en: 'Salobreña', fr: 'Salobreña' },
  'Adra':          { ar: 'أدرة',        en: 'Adra',      fr: 'Adra' },
  'Roquetas de Mar': { ar: 'روكيتاس',   en: 'Roquetas',  fr: 'Roquetas' },
  'Nerja':         { ar: 'نيرخا',       en: 'Nerja',     fr: 'Nerja' },
  'Antequera':     { ar: 'أنتقيرة',     en: 'Antequera', fr: 'Antequera' },
  'Huelva':        { ar: 'ولبة',        en: 'Huelva',    fr: 'Huelva' },
  'Jaén':          { ar: 'جيان',        en: 'Jaén',      fr: 'Jaén' },
  'Madrid':        { ar: 'مدريد',       en: 'Madrid',    fr: 'Madrid' },
  'Barcelona':     { ar: 'برشلونة',     en: 'Barcelona', fr: 'Barcelone' },
  'Valencia':      { ar: 'بلنسية',      en: 'Valencia',  fr: 'Valence' },
  'Murcia':        { ar: 'مرسية',       en: 'Murcia',    fr: 'Murcie' },
  'Alicante':      { ar: 'أليكانتي',    en: 'Alicante',  fr: 'Alicante' },
  'Badajoz':       { ar: 'بطليوس',      en: 'Badajoz',   fr: 'Badajoz' },
  'Palma':         { ar: 'بالما',       en: 'Palma',     fr: 'Palma' },
  'Lisboa':        { ar: 'لشبونة',      en: 'Lisbon',    fr: 'Lisbonne' },
};

const PAIS = {
  'Marruecos':     { ar: 'المغرب',      en: 'Morocco',   fr: 'Maroc' },
  'España':        { ar: 'إسبانيا',     en: 'Spain',     fr: 'Espagne' },
  'Gibraltar':     { ar: 'جبل طارق',    en: 'Gibraltar', fr: 'Gibraltar' },
  'Ceuta':         { ar: 'سبتة',        en: 'Ceuta',     fr: 'Ceuta' },
  'Melilla':       { ar: 'مليلية',      en: 'Melilla',   fr: 'Melilla' },
  'Argelia':       { ar: 'الجزائر',     en: 'Algeria',   fr: 'Algérie' },
  'Túnez':         { ar: 'تونس',        en: 'Tunisia',   fr: 'Tunisie' },
  'Libia':         { ar: 'ليبيا',       en: 'Libya',     fr: 'Libye' },
  'Egipto':        { ar: 'مصر',         en: 'Egypt',     fr: 'Égypte' },
  'Arabia Saudí':  { ar: 'السعودية',    en: 'Saudi Arabia', fr: 'Arabie saoudite' },
  'Yemen':         { ar: 'اليمن',       en: 'Yemen',     fr: 'Yémen' },
  'Somalia':       { ar: 'الصومال',     en: 'Somalia',   fr: 'Somalie' },
  'Portugal':      { ar: 'البرتغال',    en: 'Portugal',  fr: 'Portugal' },
  // Provincias españolas: se muestran tal cual salvo en árabe, donde muchas
  // tienen forma histórica propia por la presencia andalusí.
  'Cádiz':         { ar: 'قادس',        en: 'Cádiz',     fr: 'Cadix' },
  'Málaga':        { ar: 'مالقة',       en: 'Málaga',    fr: 'Malaga' },
  'Granada':       { ar: 'غرناطة',      en: 'Granada',   fr: 'Grenade' },
  'Almería':       { ar: 'المرية',      en: 'Almería',   fr: 'Almería' },
  'Sevilla':       { ar: 'إشبيلية',     en: 'Seville',   fr: 'Séville' },
  'Córdoba':       { ar: 'قرطبة',       en: 'Córdoba',   fr: 'Cordoue' },
  'Huelva':        { ar: 'ولبة',        en: 'Huelva',    fr: 'Huelva' },
  'Jaén':          { ar: 'جيان',        en: 'Jaén',      fr: 'Jaén' },
  'Madrid':        { ar: 'مدريد',       en: 'Madrid',    fr: 'Madrid' },
  'Barcelona':     { ar: 'برشلونة',     en: 'Barcelona', fr: 'Barcelone' },
  'Valencia':      { ar: 'بلنسية',      en: 'Valencia',  fr: 'Valence' },
  'Murcia':        { ar: 'مرسية',       en: 'Murcia',    fr: 'Murcie' },
  'Alicante':      { ar: 'أليكانتي',    en: 'Alicante',  fr: 'Alicante' },
  'Badajoz':       { ar: 'بطليوس',      en: 'Badajoz',   fr: 'Badajoz' },
  'Illes Balears': { ar: 'جزر البليار', en: 'Balearics', fr: 'Baléares' },
};

/** Nombre de ciudad en el idioma dado; el canónico si no hay traducción. */
export function nombreCiudad(canonico, idioma) {
  return CIUDAD[canonico]?.[idioma] ?? canonico;
}

/** Nombre de país o provincia en el idioma dado. */
export function nombrePais(canonico, idioma) {
  return PAIS[canonico]?.[idioma] ?? canonico;
}

/**
 * Texto contra el que buscar: incluye el canónico y TODAS sus traducciones.
 * Así quien escribe «طنجة», «Tangier» o «Tánger» encuentra el mismo sitio, sin
 * tener que saber en qué idioma está puesta la app.
 */
export function aliasDe(canonico) {
  const c = CIUDAD[canonico];
  return c ? [canonico, ...Object.values(c)] : [canonico];
}
