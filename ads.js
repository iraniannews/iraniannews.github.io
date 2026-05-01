/**
 * RUSSIAN SKETCHY ADS — ads.js
 * ============================================================
 * HOW TO USE ON ANY PAGE:
 *   1. Drop this file next to your HTML file (or in a shared folder)
 *   2. Add this ONE line before </body>:
 *        <script src="./ads.js"></script>
 *      (adjust path if ads.js is in a subfolder, e.g. "../ads.js")
 *   3. That's it. Ads inject automatically.
 *
 * OPTIONAL — manual placement:
 *   Add an empty div where you want a specific ad:
 *     <div class="ad-slot" data-type="sidebar"></div>   ← floating sidebar ad
 *     <div class="ad-slot" data-type="leaderboard"></div> ← full-width banner
 *     <div class="ad-slot" data-type="native"></div>    ← inline "sponsored" card
 *     <div class="ad-slot" data-type="strip"></div>     ← thin alert-style strip
 *     <div class="ad-slot" data-type="popup"></div>     ← fake popup box
 *   If no .ad-slot divs exist, ads are injected automatically between
 *   paragraphs and headings in the page body.
 * ============================================================
 */

(function () {

  /* ── STYLES ─────────────────────────────────────────────── */
  const CSS = `
  .ru-ad-wrap { font-family: Arial, sans-serif; font-size: 13px; line-height: 1.4; }
  .ru-ad-label { font-size: 8px; color: #aaa; text-align: right; display: block; margin-bottom: 1px; }
  .ru-ad-fine  { font-size: 8px; color: #aaa; margin-top: 3px; display: block; }
  .ru-stars    { color: #ffd700; font-size: 11px; letter-spacing: -1px; }

  /* ── BANNER (top blinky) ── */
  .ru-banner { background:#1a1a2e; border:2px solid #e63946; padding:6px 12px;
    display:flex; align-items:center; justify-content:space-between; cursor:pointer; margin:8px 0; }
  .ru-banner .blink { color:#ffd700; font-weight:bold; font-size:13px; animation:ru-blink .8s step-end infinite; }
  @keyframes ru-blink { 50%{opacity:0} }
  .ru-banner .sub   { color:#aaa; font-size:10px; }
  .ru-banner .cta   { background:#e63946; color:#fff; border:none; padding:5px 12px;
    font-size:11px; cursor:pointer; font-weight:bold; white-space:nowrap; flex-shrink:0; margin-left:12px; }

  /* ── LEADERBOARD ── */
  .ru-leader { background:linear-gradient(90deg,#1a1a4e,#2d2d7e); border:1px solid #555;
    display:flex; align-items:center; padding:8px 12px; gap:12px; margin:8px 0; cursor:pointer; position:relative; }
  .ru-leader img { width:80px; height:60px; object-fit:cover; border:2px solid #ffd700; flex-shrink:0; }
  .ru-leader .lt  { color:#ffd700; font-weight:bold; font-size:14px; text-transform:uppercase; }
  .ru-leader .ls  { color:#ccc; font-size:11px; }
  .ru-leader .lc  { background:#ffd700; color:#000; font-weight:bold; font-size:12px;
    padding:6px 14px; border:none; cursor:pointer; white-space:nowrap; margin-left:auto; flex-shrink:0; }
  .ru-leader .ad-corner { position:absolute; bottom:3px; right:5px; background:rgba(0,0,0,.4);
    color:#ccc; font-size:8px; padding:1px 3px; }

  /* ── SIDEBAR (floats) ── */
  .ru-sidebar { width:155px; border:1px solid #999; background:#f5f5f0; font-size:11px;
    overflow:hidden; cursor:pointer; position:relative; }
  .ru-sidebar.float-right { float:right; margin:0 0 12px 14px; }
  .ru-sidebar.float-left  { float:left;  margin:0 14px 12px 0; }
  .ru-sidebar img { width:100%; height:100px; object-fit:cover; display:block; }
  .ru-sidebar .si { padding:6px; }
  .ru-sidebar .st { font-weight:bold; font-size:12px; color:#c00; margin-bottom:3px; }
  .ru-sidebar .sb { font-size:10px; color:#333; margin-bottom:4px; }
  .ru-sidebar .sc { background:#e63946; color:#fff; font-size:10px; padding:3px 8px;
    border:none; cursor:pointer; display:inline-block; font-weight:bold; }
  .ru-sidebar .badge-top  { position:absolute; top:4px; left:4px; background:#ffd700;
    color:#000; font-size:8px; padding:1px 4px; font-weight:bold; }
  .ru-sidebar .badge-bot  { position:absolute; bottom:4px; right:4px; background:#ccc;
    color:#555; font-size:8px; padding:1px 3px; }

  /* ── NATIVE (inline sponsored) ── */
  .ru-native { border:1px solid #ddd; background:#fafafa; padding:8px; margin:10px 0;
    display:flex; gap:10px; align-items:flex-start; cursor:pointer; position:relative; }
  .ru-native img { width:70px; height:70px; object-fit:cover; flex-shrink:0; }
  .ru-native .ntag { font-size:8px; background:#e0e0e0; color:#666; padding:1px 4px;
    margin-bottom:4px; display:inline-block; }
  .ru-native .nt   { font-size:12px; font-weight:bold; color:#1a1a6e; margin-bottom:3px; }
  .ru-native .ns   { font-size:10px; color:#555; }
  .ru-native .nsrc { font-size:9px; color:#999; margin-top:4px; }
  .ru-native .ad-corner { position:absolute; bottom:3px; right:5px; background:#e0e0e0;
    color:#666; font-size:8px; padding:1px 3px; }

  /* ── STRIP ── */
  .ru-strip { background:#fff3cd; border-top:2px solid #ffc107; border-bottom:2px solid #ffc107;
    padding:5px 12px; display:flex; align-items:center; justify-content:space-between;
    margin:6px 0; cursor:pointer; }
  .ru-strip .stxt { font-size:12px; color:#856404; font-weight:bold; }
  .ru-strip .scta { background:#856404; color:#fff; border:none; padding:3px 8px;
    font-size:10px; cursor:pointer; font-weight:bold; flex-shrink:0; margin-left:10px; }

  /* ── POPUP-STYLE ── */
  .ru-popup { border:2px solid #c00; background:#fff8f0; padding:8px 10px; margin:10px 0;
    position:relative; cursor:pointer; font-size:11px; }
  .ru-popup .px    { position:absolute; top:2px; right:7px; font-size:15px; color:#999; cursor:pointer; line-height:1; }
  .ru-popup .ptitle { font-size:13px; font-weight:bold; color:#c00; margin-bottom:4px; padding-right:18px; }
  .ru-popup img    { width:100%; height:70px; object-fit:cover; margin-bottom:6px; display:block; }
  .ru-popup .pbody { color:#333; font-size:10px; }
  .ru-popup .pcta  { display:inline-block; margin-top:6px; background:#c00; color:#fff;
    padding:3px 10px; font-size:10px; font-weight:bold; border:none; cursor:pointer; }
  `;

  /* ── AD DEFINITIONS ─────────────────────────────────────── */
  const ADS = {

    banner: [
      { blink:'⚡ ПОЗДРАВЛЯЕМ! ВЫ ПОБЕДИТЕЛЬ #4,521 ⚡', sub:'Нажмите сейчас, чтобы получить приз • Offer expires: СЕЙЧАС', cta:'ЗАБРАТЬ ПРИЗ →' },
      { blink:'★ FOREX ТОРГОВЛЯ — ЗАРАБАТЫВАЙ СИДЯ ДОМА ★', sub:'My cousin make 80,000$ per month. He show me method. Now I show you.', cta:'УЗНАТЬ СЕКРЕТ', bg:'#0d0d0d', border:'#ffd700', ctaBg:'#ffd700', ctaColor:'#000' },
      { blink:'🏆 ВЫ ВЫБРАНЫ СПЕЦИАЛЬНЫМ КЛИЕНТОМ МЕСЯЦА 🏆', sub:'Ваш IP-адрес выиграл специальный подарок. Только 1 приз остался!', cta:'ПОЛУЧИТЬ →' },
    ],

    leaderboard: [
      { img:'https://placehold.co/80x60/ffd700/1a1a2e?text=КАЗИНО', title:'🎰 ВУЛКАН ПРЕСТИЖ КАЗИНО 🎰', sub:'Win BIG money! Player Alexei from Voronezh win 3,400,000₽ yesterday night!', fine:'Лицензия №... • 18+ • Игра может вызвать зависимость', cta:'ИГРАТЬ!', bg:'linear-gradient(90deg,#1a1a4e,#2d2d7e)' },
      { img:'https://placehold.co/80x60/ff6b6b/ffffff?text=VPN🔒', title:'🔐 МЕГА-ВПН БЕЗЛИМИТ ПРО™', sub:'Be anonymous! Government see nothing! Server in very stable country (we cannot say which).', fine:'Мы не записываем ваши данные*  *кроме всех данных', cta:'СКРЫТЬСЯ', bg:'linear-gradient(90deg,#2c0000,#6b0000)', ctaBg:'#ff4444', ctaColor:'#fff' },
      { img:'https://placehold.co/80x60/003580/ffd700?text=АКЦИИ📈', title:'⚡ ТОРГИ ОТКРЫТЫ — РЫНОК ЖДЁТ ВАС ⚡', sub:'Invest today, retire tomorrow. 99% success rate (the 1% is just bad luck, not our fault).', fine:'*Не является инвестиционным советом. Может являться.', cta:'ТОРГОВАТЬ!', bg:'linear-gradient(90deg,#003580,#0057b8)' },
    ],

    sidebar: [
      { img:'https://placehold.co/160x100/8b0000/ffffff?text=ЗАЙМ+ОНЛАЙН', title:'МегаКредит™', body:'От 0%* годовых! Деньги за 5 минут. Без справок. Без совести.', cta:'ВЗЯТЬ ДЕНЬГИ', fine:'*от 0% до 847%', badge:'ТОП', badge2:'18+' },
      { img:'https://placehold.co/160x100/2c3e50/1abc9c?text=КРИПТО+💹', title:'КриптоСеть™', body:'Invest 100$ get 10000$ in 30 day. Elon Musk secret method revealed! Government hate this.', cta:'ИНВЕСТИРОВАТЬ', fine:'гарантия дохода не является гарантией', badge:'NEW', titleColor:'#1abc9c', ctaBg:'#1abc9c', badgeBg:'#1abc9c' },
      { img:'https://placehold.co/160x100/4a0e8f/ffdd00?text=МАГИЯ🔮', title:'Ясновидящая Мадам Зара', body:'Love problem? Money problem? Enemy curse? I fix ALL for 500₽. 30 years experience. Certificate.', cta:'ПОЗВОНИТЬ', fine:'Результат не гарантирован астрологически', badge:'24/7', titleColor:'#4a0e8f', ctaBg:'#4a0e8f', badgeBg:'#4a0e8f' },
      { img:'https://placehold.co/160x100/006400/ffffff?text=ДОМ+МЕЧТЫ🏠', title:'Уют-Строй™', body:'Beautiful house. Forest nearby. Neighbors only sometimes. Documents mostly ready.', cta:'ПОДРОБНЕЕ', fine:'240 км от МКАД • 6 соток', badge:'ХИТ', titleColor:'#006400', ctaBg:'#006400', badgeBg:'#006400' },
      { img:'https://placehold.co/160x100/b8860b/fff?text=ЧАСЫ⌚', title:'РолексОмегаПатек™', body:'"Реплика" швейцарского качества. Made in Chelyabinsk with love. Looks very same!', cta:'КУПИТЬ', fine:'Доставка 3-45 дней • Таможня иногда', badge:'ЛЮКС', titleColor:'#b8860b', ctaBg:'#b8860b', badgeBg:'#b8860b' },
    ],

    native: [
      { img:'https://placehold.co/70x70/2d5a27/ffffff?text=🌿ГРИБ', tag:'СПОНСОРСТВО', title:'Doctor Refuse This! Mushroom From Siberia Make Brain 400% More Thinking', sub:'ГрибоФарм™ — Формула сибирского ума. Results absolutely guarantee.', src:'gribofarm-official-store.ru • Спонсируемый контент' },
      { img:'https://placehold.co/70x70/4a0e8f/ffffff?text=💊ПРО', tag:'РЕКЛАМА • ЗДОРОВЬЕ', title:'Витамин-Макс Ультра Про™ — Формула долголетия академика Зверева', sub:'Back pain? Gone. Tired? Gone. Wife not happy? Also maybe gone.', src:'vitaminmax-pro.ru • На правах рекламы' },
      { img:'https://placehold.co/70x70/003580/ffd700?text=АВИА✈', tag:'РЕКЛАМА • ТУРИЗМ', title:'АэроСчастье™ — Билеты дешевле чем вы думаете*', sub:'Fly to warm place from 499₽! (price before tax, bag fee, seat fee, breathing fee). Destination: surprise!', src:'aeroschasty-avia.ru • *цена без всего' },
      { img:'https://placehold.co/70x70/8b0000/fff?text=🔑КУРС', tag:'РЕКЛАМА • ОБРАЗОВАНИЕ', title:'Онлайн-курс: "Стань Миллионером За 30 Дней или Верни Деньги"*', sub:'*Деньги не возвращаются. But course is very good and teach many thinking.', src:'millioner30days.ru • 14,000 довольных студентов (по нашим данным)' },
    ],

    strip: [
      { text:'📦 АЛИБАБА-ЭКСПРЕСС: Бесплатная доставка при заказе от 1₽! Только сегодня! Только сейчас! Только для вас лично!', cta:'КУПИТЬ ВСЁ' },
      { text:'🌿 ЭКОФЕРМА НАТУРПРОДУКТ: Козий кефир от козы Маши. Очень здоровая коза. 100% натуральный.', cta:'ЗАКАЗАТЬ', bg:'#e8f5e9', border:'#4caf50', textColor:'#2e7d32', ctaBg:'#2e7d32' },
      { text:'🔥 РАСПРОДАЖА -90%!! Только 3 товара осталось!! (Склад никогда не заканчивается, но срочно!!)', cta:'УСПЕТЬ!', bg:'#fff0f0', border:'#e63946', textColor:'#c00', ctaBg:'#c00' },
    ],

    popup: [
      { border:'#c00', bg:'#fff8f0', title:'⚠ YOUR COMPUTER HAS 14 VIRUS (DETECTED) ⚠', img:'https://placehold.co/400x70/ff0000/ffffff?text=VIRUS+НАЙДЕН+---+УДАЛИТЬ+СЕЙЧАС', body:'АнтиВирусПлюс Pro™ обнаружил 14 угроз. Ваши фотографии и банковские данные под угрозой! <em>Act fast! Virus eating your files with hungry.</em>', cta:'🛡 ЗАЩИТИТЬ СЕЙЧАС', fine:'Подписка 4999₽/мес после пробного периода' },
      { border:'#1a1a8e', bg:'#f0f0ff', title:'ЗНАКОМСТВА В ВАШЕМ ГОРОДЕ 💕', img:'https://placehold.co/400x70/1a1a8e/ffd700?text=ОДИНОКИЕ+СЕРДЦА+ЖДУТ+ВАС', body:'<em>Beautiful lonely womens in your area want meeting RIGHT NOW.</em> 17,432 новых анкет сегодня!', cta:'СМОТРЕТЬ АНКЕТЫ →', ctaBg:'#1a1a8e', fine:'ЛюбовьРу™ • Не несём ответственности за встречи', titleColor:'#1a1a8e' },
      { border:'#e67e00', bg:'#fff8ee', title:'🍕 ДОСТАВКА ЕДЫ — БЫСТРО, ВКУСНО!', img:'https://placehold.co/400x70/e67e00/ffffff?text=ПиццаРу+—+Горячо+и+с+любовью', body:'Pizza, burger, sushi, борщ — всё в одном приложении. <em>Driver come very fast (probably).</em> Промокод: ПИЦЦА2026', cta:'ЗАКАЗАТЬ ЕДУ', ctaBg:'#e67e00', fine:'Среднее время доставки: 28-180 минут', titleColor:'#e67e00' },
    ],
  };

  /* ── BUILDERS ───────────────────────────────────────────── */
  function stars() { return '<span class="ru-stars">★★★★★</span>'; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function buildBanner(d) {
    return `<div class="ru-ad-wrap">
      <span class="ru-ad-label">Реклама</span>
      <div class="ru-banner" style="background:${d.bg||'#1a1a2e'};border-color:${d.border||'#e63946'}">
        <div><div class="blink">${d.blink}</div><div class="sub">${d.sub}</div></div>
        <button class="cta" style="background:${d.ctaBg||'#e63946'};color:${d.ctaColor||'#fff'}">${d.cta}</button>
      </div></div>`;
  }

  function buildLeaderboard(d) {
    return `<div class="ru-ad-wrap">
      <span class="ru-ad-label">Реклама</span>
      <div class="ru-leader" style="background:${d.bg}">
        <img src="${d.img}" alt="ad"/>
        <div class="lead-body"><div class="lt">${d.title}</div><div class="ls">${d.sub}</div>
          <div class="ls" style="color:#f99;font-size:9px">${d.fine}</div></div>
        <button class="lc" style="background:${d.ctaBg||'#ffd700'};color:${d.ctaColor||'#000'}">${d.cta}</button>
        <span class="ad-corner">AD</span>
      </div></div>`;
  }

  function buildSidebar(d, floatDir) {
    return `<div class="ru-ad-wrap">
      <div class="ru-sidebar ${floatDir}">
        <img src="${d.img}" alt="ad"/>
        <div class="si">
          <div class="st" style="color:${d.titleColor||'#c00'}">${d.title}</div>
          <div class="sb">${d.body}</div>
          ${stars()}
          <button class="sc" style="background:${d.ctaBg||'#e63946'}">${d.cta}</button>
          <div class="ru-ad-fine">${d.fine}</div>
        </div>
        <span class="badge-top" style="background:${d.badgeBg||'#ffd700'};color:${d.badgeBg?'#fff':'#000'}">${d.badge}</span>
        <span class="badge-bot">${d.badge2||'AD'}</span>
      </div></div>`;
  }

  function buildNative(d) {
    return `<div class="ru-ad-wrap">
      <div class="ru-native">
        <img src="${d.img}" alt="ad"/>
        <div class="nat-body">
          <span class="ntag">СПОНСОРСТВО</span>
          <div class="nt">${d.title}</div>
          <div class="ns">${d.sub}</div>
          ${stars()}
          <div class="nsrc">${d.src}</div>
        </div>
        <span class="ad-corner">AD</span>
      </div></div>`;
  }

  function buildStrip(d) {
    return `<div class="ru-ad-wrap">
      <div class="ru-strip" style="background:${d.bg||'#fff3cd'};border-color:${d.border||'#ffc107'}">
        <span class="stxt" style="color:${d.textColor||'#856404'}">${d.text}</span>
        <button class="scta" style="background:${d.ctaBg||'#856404'}">${d.cta}</button>
      </div></div>`;
  }

  function buildPopup(d) {
    return `<div class="ru-ad-wrap">
      <div class="ru-popup" style="border-color:${d.border};background:${d.bg}">
        <span class="px">✕</span>
        <div class="ptitle" style="color:${d.titleColor||'#c00'}">${d.title}</div>
        <img src="${d.img}" alt="ad"/>
        <div class="pbody">${d.body}</div>
        <button class="pcta" style="background:${d.ctaBg||'#c00'}">${d.cta}</button>
        <span class="ru-ad-fine">${d.fine}</span>
      </div></div>`;
  }

  /* ── AD SEQUENCE (cycles so repeats are rare) ────────────── */
  const sequence = [
    () => buildBanner(pick(ADS.banner)),
    () => buildNative(pick(ADS.native)),
    () => buildSidebar(pick(ADS.sidebar), 'float-right'),
    () => buildStrip(pick(ADS.strip)),
    () => buildPopup(pick(ADS.popup)),
    () => buildLeaderboard(pick(ADS.leaderboard)),
    () => buildNative(pick(ADS.native)),
    () => buildSidebar(pick(ADS.sidebar), 'float-left'),
    () => buildStrip(pick(ADS.strip)),
    () => buildBanner(pick(ADS.banner)),
    () => buildPopup(pick(ADS.popup)),
    () => buildLeaderboard(pick(ADS.leaderboard)),
  ];
  let seqIdx = 0;
  function nextAd() {
    const html = sequence[seqIdx % sequence.length]();
    seqIdx++;
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    return wrap.firstElementChild;
  }

  /* ── INJECT ─────────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('ru-ads-css')) return;
    const s = document.createElement('style');
    s.id = 'ru-ads-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function fillSlots() {
    const slots = document.querySelectorAll('.ad-slot');
    if (slots.length === 0) return false;
    const typeMap = {
      banner:      (d) => buildBanner(pick(ADS.banner)),
      leaderboard: (d) => buildLeaderboard(pick(ADS.leaderboard)),
      sidebar:     (d) => buildSidebar(pick(ADS.sidebar), 'float-right'),
      native:      (d) => buildNative(pick(ADS.native)),
      strip:       (d) => buildStrip(pick(ADS.strip)),
      popup:       (d) => buildPopup(pick(ADS.popup)),
    };
    slots.forEach(slot => {
      const type = slot.dataset.type || 'native';
      const fn = typeMap[type] || typeMap.native;
      slot.innerHTML = fn();
    });
    return true;
  }

  function autoInject() {
    // Find likely content containers: paragraphs, headings, article cards
    const targets = Array.from(document.querySelectorAll(
      'main p, main h2, main h3, .article-card, .card-body, section p'
    )).filter(el => el.closest('.ru-ad-wrap') === null);

    if (targets.length === 0) {
      // Fallback: inject after header
      const header = document.querySelector('header, .masthead, .top-bar');
      if (header) header.insertAdjacentElement('afterend', nextAd());
      return;
    }

    // Inject after every ~3rd eligible element, staggered
    targets.forEach((el, i) => {
      if (i > 0 && i % 3 === 0) {
        el.insertAdjacentElement('afterend', nextAd());
      }
    });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  function init() {
    injectStyles();
    const usedSlots = fillSlots();
    if (!usedSlots) autoInject();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();