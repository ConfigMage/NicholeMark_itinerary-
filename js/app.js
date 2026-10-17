(function () {
  "use strict";

  const T = window.TRIP;
  const main = document.getElementById("main");
  const DAY_COUNT = T.days.length;

  /* ---------- Dates ---------- */

  const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function parse(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function iso(date) {
    const p = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
  }

  // ?today=2026-10-25 previews the site as if it were that date.
  function todayISO() {
    const forced = new URLSearchParams(location.search).get("today");
    if (forced && /^\d{4}-\d{2}-\d{2}$/.test(forced)) return forced;
    return iso(new Date());
  }

  function daysBetween(a, b) {
    return Math.round((parse(b) - parse(a)) / 86400000);
  }

  const fmt = {
    dowShort: (d) => DOW[parse(d).getDay()].slice(0, 3),
    dow: (d) => DOW[parse(d).getDay()],
    mon: (d) => MON[parse(d).getMonth()],
    monShort: (d) => MON[parse(d).getMonth()].slice(0, 3),
    day: (d) => parse(d).getDate(),
    long: (d) => `${DOW[parse(d).getDay()]}, ${MON[parse(d).getMonth()]} ${parse(d).getDate()}`,
  };

  function tripState() {
    const today = todayISO();
    if (today < T.start) return { phase: "before", days: daysBetween(today, T.start) };
    if (today > T.end) return { phase: "after" };
    return { phase: "during", index: T.days.findIndex((d) => d.date === today) };
  }

  /* ---------- Small helpers ---------- */

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const icon = (id, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

  const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  const mapLink = (q, label = "Map") =>
    q ? `<a class="maplink" href="${mapsUrl(q)}" target="_blank" rel="noopener">${icon("i-pin")}<span>${label}</span></a>` : "";

  const dayCities = (day) => [...new Set(day.segments.map((s) => s.city))];

  const cityClass = (day) => {
    const c = dayCities(day);
    return c.length > 1 ? "city-both" : `city-${c[0]}`;
  };

  /* ---------- Decorations ---------- */

  function flower(x, y, s, color) {
    const petals = [0, 72, 144, 216, 288]
      .map((a) => `<ellipse cx="0" cy="-6" rx="4.4" ry="6.4" transform="rotate(${a})" fill="${color}"/>`)
      .join("");
    return `<g transform="translate(${x} ${y}) scale(${s})">${petals}<circle r="2.3" fill="#b8325a" opacity=".55"/></g>`;
  }

  function blossoms(flip) {
    const pinks = ["#f6c1cf", "#f2a7bb", "#fbd5df", "#ee93ab"];
    const spots = [
      [24, 18, 1.15], [46, 30, 0.9], [14, 44, 0.8], [66, 16, 0.75], [34, 56, 0.7],
      [82, 34, 0.6], [58, 48, 0.65], [96, 12, 0.55], [8, 70, 0.6], [110, 26, 0.45],
    ];
    const flowers = spots.map(([x, y, s], i) => flower(x, y, s, pinks[i % pinks.length])).join("");
    return `<svg class="blossoms${flip ? " flip" : ""}" viewBox="0 0 130 90" aria-hidden="true">
      <path d="M-4 4C30 14 60 22 124 24M30 12C26 30 20 50 6 74M60 20C58 34 50 44 36 58" fill="none" stroke="#7a5442" stroke-width="2.4" stroke-linecap="round"/>
      ${flowers}
    </svg>`;
  }

  const skyline = `<svg class="skyline" viewBox="0 0 400 92" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <g fill="currentColor">
      <!-- Independence Hall -->
      <rect x="18" y="62" width="114" height="30"/>
      <rect x="61" y="40" width="28" height="22"/>
      <rect x="65" y="28" width="20" height="12"/>
      <path d="M67 28h16l-3-11h-10z"/>
      <rect x="74.2" y="3" width="1.6" height="15"/>
      <!-- Washington Monument -->
      <path d="M194 92h12l-2.6-70h-6.8z"/>
      <path d="M196.6 22h6.8L200 12z"/>
      <!-- Capitol -->
      <rect x="252" y="72" width="140" height="20"/>
      <rect x="268" y="64" width="108" height="8"/>
      <rect x="300" y="50" width="44" height="14"/>
      <path d="M298 50c0-20 11-32 24-32s24 12 24 32z"/>
      <rect x="318" y="10" width="8" height="10"/>
      <rect x="321.2" y="2" width="1.6" height="8"/>
      <path d="M302 72l20-10 20 10z"/>
    </g>
    <g style="fill: var(--paper)">
      <circle cx="75" cy="47" r="4.2"/>
      ${[26, 38, 50, 100, 112, 124].map((x) => `<rect x="${x}" y="68" width="5" height="8" rx="1"/><rect x="${x}" y="80" width="5" height="8" rx="1"/>`).join("")}
      ${[306, 314, 322, 330, 338].map((x) => `<rect x="${x}" y="53" width="2.4" height="9"/>`).join("")}
      ${[262, 274, 286, 358, 370, 382].map((x) => `<rect x="${x}" y="77" width="4" height="10" rx="1"/>`).join("")}
      ${[306, 314, 322, 330, 338].map((x) => `<rect x="${x - 1}" y="76" width="3" height="16"/>`).join("")}
    </g>
    <g fill="#f2a7bb" opacity=".9">
      ${[[150, 86, 9], [166, 82, 11], [182, 88, 7], [222, 86, 8], [238, 82, 10], [8, 86, 8], [142, 90, 6], [396, 86, 8]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}
    </g>
  </svg>`;

  const swash = `<svg class="swash" viewBox="0 0 300 24" aria-hidden="true">
    <path d="M8 18C70 6 120 4 140 8M160 8c20-4 70-2 132 10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    <use href="#i-heart-fill" x="138" y="0" width="24" height="24"/>
  </svg>`;

  /* ---------- Shared pieces ---------- */

  function cityBanner(key, as = "h2") {
    const c = T.cities[key];
    return `<header class="city-banner city-${key}">
      <${as} class="city-name">${esc(c.name)}</${as}>
      <div class="ribbon"><span>${esc(c.range)}</span></div>
      <p class="motto">${esc(c.motto)}</p>
    </header>`;
  }

  function ticket(key, opts = {}) {
    const t = T.travel[key];
    const kind = t.type === "train" ? "train" : "flight";
    const legs = t.legs
      .map(
        (leg, i) => `<div class="leg">
          ${t.legs.length > 1 ? `<div class="leg-label">Flight ${i + 1}</div>` : ""}
          <div class="route">
            <div class="stop"><b>${esc(leg.from.code)}</b><span>${esc(leg.from.city)}</span></div>
            <div class="route-line">${icon(kind === "train" ? "i-train" : "i-plane", "icon route-icon")}</div>
            <div class="stop stop-to"><b>${esc(leg.to.code)}</b><span>${esc(leg.to.city)}</span></div>
          </div>
          <div class="leg-meta">
            <span class="seats">${icon("i-seat")}Seats ${esc(leg.seats)}</span>
            ${opts.full ? `<span class="leg-links">${mapLink(leg.from.place, leg.from.code)}${mapLink(leg.to.place, leg.to.code)}</span>` : ""}
          </div>
        </div>`
      )
      .join("");
    return `<section class="ticket ticket-${kind}${opts.compact ? " compact" : ""}" aria-label="${esc(t.label)}">
      <div class="ticket-head">${icon(kind === "train" ? "i-train" : "i-plane")}<span>${esc(t.label)}</span></div>
      <div class="ticket-body">
        <div class="ticket-date"><span>${esc(fmt.long(t.date))}</span><span class="carrier">${esc(t.carrier)}</span></div>
        ${legs}
      </div>
    </section>`;
  }

  function itemHTML(it) {
    return `<li>
      <div class="item-main">
        ${it.time ? `<span class="pill">${esc(it.time)}</span>` : ""}
        <span class="item-text">${esc(it.text)}</span>
        ${it.note ? `<span class="item-note">${esc(it.note)}</span>` : ""}
      </div>
      ${mapLink(it.q)}
    </li>`;
  }

  function foodHTML(food) {
    if (!food || !food.length) return "";
    return `<div class="food">
      <div class="food-head">${icon("i-fork")}<span>Food highlight</span></div>
      <ul>
        ${food
          .map(
            (f) => `<li>
            <div class="item-main">
              ${f.time ? `<span class="pill pill-food">${esc(f.time)}</span>` : ""}
              <span class="item-text">${esc(f.name)}</span>
              ${f.note ? `<span class="item-note">${esc(f.note)}</span>` : ""}
            </div>
            ${mapLink(f.q)}
          </li>`
          )
          .join("")}
      </ul>
    </div>`;
  }

  function segmentHTML(seg, showLabel) {
    return `<div class="segment city-${seg.city}">
      ${showLabel && seg.label ? `<h3 class="segment-label">${esc(seg.label)}</h3>` : ""}
      <ul class="items">${seg.items.map(itemHTML).join("")}</ul>
      ${foodHTML(seg.food)}
    </div>`;
  }

  function todayBadge(day) {
    return day.date === todayISO() ? `<span class="today-badge">Today</span>` : "";
  }

  /* ---------- Views ---------- */

  function statusCard() {
    const s = tripState();
    if (s.phase === "before") {
      const label = s.days === 1 ? "day" : "days";
      return `<section class="status">
        <div class="status-count"><b>${s.days}</b><span>${label} to go</span></div>
        <div class="status-text">
          <p class="status-title">Until takeoff</p>
          <p>Portland to Philadelphia on ${esc(fmt.long(T.start))}</p>
          <a class="btn" href="#/day/1">Preview day one ${icon("i-arrow")}</a>
        </div>
      </section>`;
    }
    if (s.phase === "during") {
      const day = T.days[s.index];
      const city = T.cities[dayCities(day).slice(-1)[0]];
      return `<section class="status status-live">
        <div class="status-count"><b>${s.index + 1}</b><span>of ${DAY_COUNT}</span></div>
        <div class="status-text">
          <p class="status-title">Today in ${esc(city.short)}</p>
          <p>${esc(day.title)}</p>
          <a class="btn" href="#/day/${s.index + 1}">See today's plan ${icon("i-arrow")}</a>
        </div>
      </section>`;
    }
    return `<section class="status status-after">
      <div class="status-text">
        <p class="status-title script">Until our next adventure!</p>
        <p>Ten days, two cities, one wonderful start. Welcome home, newlyweds.</p>
      </div>
    </section>`;
  }

  function miniDay(day, i) {
    return `<a class="mini-day ${cityClass(day)}" href="#/day/${i + 1}">
      <span class="mini-date"><small>${fmt.dowShort(day.date)}</small><b>${fmt.day(day.date)}</b></span>
      <span class="mini-title">${esc(day.title)}${todayBadge(day)}</span>
      ${icon("i-chev-r", "icon mini-chev")}
    </a>`;
  }

  function renderHome() {
    const cityList = (key) =>
      T.days
        .map((d, i) => [d, i])
        .filter(([d]) => dayCities(d).includes(key))
        .map(([d, i]) => miniDay(d, i))
        .join("");

    const stay = (key) => {
      const s = T.cities[key].stay;
      return s
        ? `<a class="stay" href="${mapsUrl(s.q)}" target="_blank" rel="noopener">${icon("i-bed")}<span><b>${esc(s.name)}</b><small>${esc(s.area)}</small></span></a>`
        : "";
    };

    return `
      <header class="hero">
        ${blossoms(false)}${blossoms(true)}
        <p class="hero-names">${esc(T.couple)}'s</p>
        <h1 class="hero-title"><span>East Coast</span> <span class="red">Honeymoon</span></h1>
        ${swash}
        <p class="hero-dates">October 22 – 31, 2026</p>
        <p class="hero-tags">${T.tagline.map(esc).join(icon("i-heart-fill", "icon tag-heart"))}</p>
        ${skyline}
      </header>

      ${statusCard()}

      <section class="section">
        <h2 class="section-title">Getting there &amp; back</h2>
        <div class="travel-row">
          ${Object.keys(T.travel)
            .map((k) => {
              const t = T.travel[k];
              const legs = t.legs;
              const route = [legs[0].from.code, ...legs.map((l) => l.to.code)].join(" → ");
              return `<a class="travel-chip travel-${t.type}" href="#/travel">
                ${icon(t.type === "train" ? "i-train" : "i-plane")}
                <span><small>${esc(fmt.dowShort(t.date))}, ${esc(fmt.monShort(t.date))} ${fmt.day(t.date)}</small><b>${esc(route)}</b></span>
              </a>`;
            })
            .join("")}
        </div>
      </section>

      <section class="section city-block">
        ${cityBanner("phl")}
        <p class="city-meta">${T.cities.phl.nights} nights</p>
        <div class="mini-list">${cityList("phl")}</div>
      </section>

      <section class="section city-block">
        ${cityBanner("dc")}
        <p class="city-meta">${T.cities.dc.nights} nights</p>
        ${stay("dc")}
        <div class="mini-list">${cityList("dc")}</div>
      </section>

      <footer class="sendoff">
        <p class="script">Until Our Next Adventure!</p>
        <p class="sendoff-small">${icon("i-heart-fill", "icon tag-heart")} Made with love for ${esc(T.couple)}</p>
      </footer>
    `;
  }

  function renderDay(n) {
    const i = Math.min(Math.max(n, 1), DAY_COUNT) - 1;
    const day = T.days[i];
    const multi = day.segments.length > 1;
    const prev = T.days[i - 1];
    const next = T.days[i + 1];
    const today = todayISO();

    // On the train day, show the ticket between the morning and the arrival.
    const body = multi
      ? [segmentHTML(day.segments[0], true), day.travel ? ticket(day.travel, { compact: true }) : "", ...day.segments.slice(1).map((s) => segmentHTML(s, true))].join("")
      : (day.travel && i === 0 ? ticket(day.travel, { compact: true }) : "") +
        segmentHTML(day.segments[0], false) +
        (day.travel && i !== 0 ? ticket(day.travel, { compact: true }) : "");

    const cities = dayCities(day).map((c) => T.cities[c].name).join(" to ");

    return `
      <div class="daystrip-wrap">
        <nav class="daystrip" aria-label="Choose a day">
          ${T.days
            .map(
              (d, j) => `<a href="#/day/${j + 1}" class="chip ${cityClass(d)}${d.date === today ? " is-today" : ""}" ${j === i ? 'aria-current="page"' : ""}>
                <small>${fmt.dowShort(d.date)}</small><b>${fmt.day(d.date)}</b>
              </a>`
            )
            .join("")}
        </nav>
      </div>

      <article class="daycard ${cityClass(day)}" data-index="${i}">
        <header class="daycard-head">
          <div class="daycard-when">
            <p class="daycard-count">Day ${i + 1} of ${DAY_COUNT} · ${esc(cities)}</p>
            <h1 class="daycard-date"><span>${fmt.dow(day.date)}</span>${fmt.mon(day.date)} ${fmt.day(day.date)}</h1>
          </div>
          <div class="medallion">${icon("d-" + day.icon, "medallion-icon")}</div>
        </header>
        <div class="daycard-body">
          <h2 class="day-title">${esc(day.title)}${todayBadge(day)}</h2>
          ${body}
        </div>
      </article>

      <nav class="daynav" aria-label="Previous and next day">
        ${prev ? `<a class="daynav-btn" href="#/day/${i}">${icon("i-chev-l")}<span><small>${fmt.dowShort(prev.date)} ${fmt.day(prev.date)}</small>${esc(prev.title)}</span></a>` : `<span></span>`}
        ${next ? `<a class="daynav-btn next" href="#/day/${i + 2}"><span><small>${fmt.dowShort(next.date)} ${fmt.day(next.date)}</small>${esc(next.title)}</span>${icon("i-chev-r")}</a>` : `<a class="daynav-btn next" href="#/trip"><span><small>All days</small>See the full trip</span>${icon("i-chev-r")}</a>`}
      </nav>
      <p class="swipe-hint">Swipe left or right to change days</p>
    `;
  }

  function tripDayCard(day, i) {
    const multi = day.segments.length > 1;
    return `<article class="tripday ${cityClass(day)}" id="d${i + 1}">
      <a class="tripday-head" href="#/day/${i + 1}">
        <span class="tripday-date"><small>${fmt.dowShort(day.date)}</small><b>${fmt.monShort(day.date)} ${fmt.day(day.date)}</b></span>
        <span class="tripday-title">${esc(day.title)}${todayBadge(day)}</span>
        ${icon("d-" + day.icon, "tripday-icon")}
      </a>
      <div class="tripday-body">
        ${day.segments.map((s) => segmentHTML(s, multi)).join("")}
      </div>
    </article>`;
  }

  function renderTrip() {
    const phl = T.days.map((d, i) => [d, i]).filter(([d]) => dayCities(d)[0] === "phl");
    const dc = T.days.map((d, i) => [d, i]).filter(([d]) => dayCities(d)[0] === "dc");
    return `
      <header class="page-head">
        <p class="page-kicker">The whole trip</p>
        <h1 class="page-title">Ten days, two cities</h1>
      </header>

      ${ticket("out")}

      <section class="trip-city">
        ${cityBanner("phl")}
        ${phl.map(([d, i]) => tripDayCard(d, i)).join("")}
      </section>

      ${ticket("train")}

      <section class="trip-city">
        ${cityBanner("dc")}
        ${dc.map(([d, i]) => tripDayCard(d, i)).join("")}
      </section>

      ${ticket("home")}

      <footer class="sendoff">
        <p class="script">Until Our Next Adventure!</p>
      </footer>
    `;
  }

  function renderTravel() {
    const stays = Object.keys(T.cities)
      .filter((k) => T.cities[k].stay)
      .map((k) => {
        const s = T.cities[k].stay;
        return `<div class="stay-card">
          ${icon("i-bed", "icon stay-icon")}
          <div>
            <p class="stay-city">${esc(T.cities[k].name)} · ${T.cities[k].nights} nights</p>
            <p class="stay-name">${esc(s.name)}</p>
            <p class="stay-area">${esc(s.area)}</p>
          </div>
          ${mapLink(s.q)}
        </div>`;
      })
      .join("");

    return `
      <header class="page-head">
        <p class="page-kicker">Flights, train &amp; hotel</p>
        <h1 class="page-title">Travel</h1>
      </header>
      ${Object.keys(T.travel).map((k) => ticket(k, { full: true })).join("")}
      ${stays ? `<h2 class="section-title">Where you're staying</h2>${stays}` : ""}
      <p class="fineprint">Departure times, gates and confirmation numbers live in the American Airlines and Amtrak apps. Check them there on travel days.</p>
    `;
  }

  /* ---------- Router ---------- */

  let lastDay = null;

  function defaultDay() {
    const s = tripState();
    return s.phase === "during" && s.index >= 0 ? s.index + 1 : 1;
  }

  function route() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const parts = hash.split("/").filter(Boolean);
    let tab = "home";
    let html;
    let dayIndex = null;

    if (parts[0] === "day") {
      tab = "day";
      const n = parseInt(parts[1], 10);
      if (!n || n < 1 || n > DAY_COUNT) {
        location.replace(`#/day/${defaultDay()}`);
        return;
      }
      dayIndex = n;
      html = renderDay(n);
    } else if (parts[0] === "trip") {
      tab = "trip";
      html = renderTrip();
    } else if (parts[0] === "travel") {
      tab = "travel";
      html = renderTravel();
    } else {
      html = renderHome();
    }

    main.innerHTML = html;
    main.dataset.view = tab;
    document.querySelectorAll(".tabbar a").forEach((a) => {
      if (a.dataset.tab === tab) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    if (dayIndex) {
      const card = main.querySelector(".daycard");
      if (lastDay && lastDay !== dayIndex) card.classList.add(dayIndex > lastDay ? "from-right" : "from-left");
      centerActiveChip();
      lastDay = dayIndex;
      document.title = `Day ${dayIndex}: ${T.days[dayIndex - 1].title} · ${T.couple}`;
    } else {
      document.title = `${T.couple}'s East Coast Honeymoon`;
    }

    window.scrollTo(0, 0);
  }

  function centerActiveChip() {
    const strip = main.querySelector(".daystrip");
    const active = strip && strip.querySelector('[aria-current="page"]');
    if (!active) return;
    strip.scrollLeft = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
  }

  function goDay(delta) {
    const m = location.hash.match(/^#\/day\/(\d+)/);
    if (!m) return;
    const n = parseInt(m[1], 10) + delta;
    if (n >= 1 && n <= DAY_COUNT) location.hash = `#/day/${n}`;
  }

  /* ---------- Gestures & keys ---------- */

  let touch = null;
  main.addEventListener(
    "touchstart",
    (e) => {
      if (main.dataset.view !== "day" || e.touches.length !== 1) return;
      if (e.target.closest(".daystrip")) return;
      touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    { passive: true }
  );
  main.addEventListener(
    "touchend",
    (e) => {
      if (!touch) return;
      const dx = e.changedTouches[0].clientX - touch.x;
      const dy = e.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) goDay(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  document.addEventListener("keydown", (e) => {
    if (main.dataset.view !== "day" || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") goDay(1);
    if (e.key === "ArrowLeft") goDay(-1);
  });

  window.addEventListener("hashchange", route);
  route();

  /* ---------- Offline support ---------- */

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  }
})();
