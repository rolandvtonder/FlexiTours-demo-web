/* One-off generator for the Flexi Tours static site.
   Run:  node _build/build.mjs
   Output: plain .html files at the repo root — no build step needed to host them.
   Keeping this file lets you re-generate every page after editing the shared
   nav/footer once, instead of hand-editing six files. Safe to delete. */

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
mkdirSync(ROOT, { recursive: true });

/* Full text of the 22 travel guides, migrated off the old site. */
const ARTICLES = JSON.parse(readFileSync(join(HERE, "articles.json"), "utf8"));
const guideHref = (slug) => `guides/${slug}.html`;

/* Real Google reviews. Add more by appending to this list. */
const REVIEWS = [
  { name: "Neha Malde", meta: "Local Guide · 11 reviews", stars: 5, when: "2 years ago",
    text: "We had an awesome time in Vic Falls and SA. Flexitours catered for all our needs and wish list. They made sure we fit all the places into our itinerary and gave us an awesome experience. Tamara was great in arranging the tour and our guide Max was simply amazing. We had a brilliant trip and still can't stop reminiscing the same. We highly recommend you to book the lovely experience through Flexitours." },
  { name: "Emmanuel Dan", meta: "2 reviews", stars: 5, when: "2 years ago",
    text: "This is one of the best tour agencies in Cape Town. A warm welcome, comfortable transportation, and an excellent tour covering several parts of the city! I highly recommend it." },
  { name: "Kristen Beck", meta: "5 reviews", stars: 5, when: "2 years ago",
    text: "Thank you Flexi Tours for the amazing experience. Nothing could beat the great wine and gorgeous views. The tour guide was very friendly and could answer all our questions. The car was comfortable and had WiFi on board. Will definitely book another tour soon." },
  { name: "Aubrey Mawela", meta: "1 review", stars: 5, when: "2 years ago",
    text: "A very friendly and welcoming establishment. They will treat you like they have known you for years. Trust them with your holiday package." },
  { name: "Sineke Moyo", meta: "2 reviews", stars: 4, when: "2 years ago",
    text: "We went for Quad Biking and wine tasting and what a wonderful experience it was. Flexi Tours organised everything so well and we had a time of our lives." },
  { name: "Franck matata Bokenge", meta: "Local Guide · 12 reviews", stars: 5, when: "a year ago",
    text: "Great service, punctual and very professional. I would highly recommend." },
];

const FACEBOOK = "https://www.facebook.com/flexitours/";
const INSTAGRAM = "https://www.instagram.com/flexi_tours_za/";

/* ---------------- shared bits ---------------- */
const WA = "https://wa.me/27780474236";
const waLink = (msg) => `${WA}?text=${encodeURIComponent(msg)}`;

/* Main call to action: opens WhatsApp with the planning questions ready to fill in. */
const PLAN = waLink("Hi Flexi Tours, I'd like help planning my Cape Town trip.\n\nDates:\nNumber of people:\nHotel/location:\nTours I'm interested in:");
/* Per-tour enquiry, pre-filled with the tour name. */
const checkLink = (tour) => waLink(`Hi Flexi Tours, I'd like to check availability for the ${tour}.\n\nDates:\nNumber of people:\nHotel/location:`);

const I = {
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  chev: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1Z"/></svg>`,
  ext: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`,
  hotel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 17h16M6 17V9l6-4 6 4v8"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m13 2-8 12h6l-2 8 8-12h-6Z"/></svg>`,
  wine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 3h8l-.7 6a3.3 3.3 0 0 1-6.6 0Z"/><path d="M12 12v8M9 21h6"/></svg>`,
  paw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 18h16M6 18v-5a6 6 0 0 1 12 0v5"/><path d="M9 8V6M15 8V6"/></svg>`,
  van: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M2 16V9a2 2 0 0 1 2-2h9l4 4h3a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/><path d="M9 17.5h6M2 16h2"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.5 9a16 16 0 0 1 19 0M6 12.7a11 11 0 0 1 12 0M9.5 16.4a6 6 0 0 1 5 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M12 3l7 3v6c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V6Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.1M18 14.4c1.7.7 2.8 2.3 3.1 4.6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5Z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>`,
};

const stars5 = `<span class="stars" aria-hidden="true">${I.star.repeat(5)}</span>`;

const NAV = [
  ["index.html", "Home"],
  ["tours.html", "Tours"],
  ["packages.html", "Packages"],
  ["transfers.html", "Transfers"],
  ["about.html", "About"],
  ["guides.html", "Travel Guides"],
  ["contact.html", "Contact"],
];

const topbar = () => `<div class="topbar">
  <div class="wrap">
    <a href="mailto:bookings@flexi-tours.co.za">${I.mail} bookings@flexi-tours.co.za</a>
    <span class="sep" aria-hidden="true">·</span>
    <a href="${WA}" target="_blank" rel="noopener">${I.wa} WhatsApp +27 78 047 4236</a>
    <span class="sep" aria-hidden="true">·</span>
    <a href="tel:+27732502549">${I.phone} +27 73 250 2549</a>
    <span class="sep" aria-hidden="true">·</span>
    <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Flexi Tours on Instagram, @flexi_tours_za">${I.ig} @flexi_tours_za</a>
  </div>
</div>`;

/* Sub-pages highlight their parent in the nav. */
const navKey = (file) => (file.startsWith("guides/") ? "guides.html" : file === "garden-route.html" ? "packages.html" : file);

const header = (rawPage) => ((page) => `<header class="nav">
  <div class="wrap">
    <div class="nav-inner">
      <a class="nav-logo" href="index.html" aria-label="Flexi Tours — home">
        <img src="assets/img/logo.png" alt="Flexi Tours" width="2867" height="330">
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${NAV.map(([h, t]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ""}>${t}</a>`).join("\n        ")}
      </nav>
      <a class="btn btn-primary btn-sm nav-cta" href="${PLAN}" target="_blank" rel="noopener">${I.wa} Plan my trip</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer">
  <div class="drawer-top">
    <img src="assets/img/logo.png" alt="Flexi Tours" width="2867" height="330">
    <button class="drawer-close" type="button" aria-label="Close menu"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
  </div>
  <nav aria-label="Mobile">
    ${NAV.map(([h, t], i) => `<a href="${h}"${h === page ? ' aria-current="page"' : ""}>${t} <i>0${i + 1}</i></a>`).join("\n    ")}
  </nav>
  <div class="drawer-foot">
    <a class="btn btn-primary btn-block" href="${PLAN}" target="_blank" rel="noopener">${I.wa} Plan my trip on WhatsApp</a>
    <a class="btn btn-ghost btn-block" href="tel:+27732502549">Call +27 73 250 2549</a>
  </div>
</div>`)(navKey(rawPage));

const footer = () => `<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/img/logo.png" alt="Flexi Tours" width="2867" height="330" loading="lazy">
        <p>Tours, activities, transfers, sightseeing and adventures in Cape Town, the Garden Route, Stellenbosch, Constantia, Paarl, Durbanville and Franschhoek.</p>
      </div>
      <div>
        <h3>Explore</h3>
        <ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li><a href="${WA}" target="_blank" rel="noopener">WhatsApp +27 78 047 4236</a></li>
          <li><a href="tel:+27732502549">Call +27 73 250 2549</a></li>
          <li><a href="mailto:bookings@flexi-tours.co.za">bookings@flexi-tours.co.za</a></li>
        </ul>
        <p class="small muted" style="margin-top:10px">Open 7 days · 07:00&ndash;23:30</p>
      </div>
      <div>
        <h3>Branches</h3>
        <address><b>Cape Town</b>Unit C6, The Exchange,<br>1 School Street, Milnerton</address>
        <address><b>Centurion</b>Unit C6, Edward Park,<br>124 Edward Avenue, Hennopspark</address>
      </div>
    </div>
    <div class="footer-bot">
      <p>&copy; <span id="yr">2026</span> Flexi Tours (Pty) Ltd. All rights reserved.</p>
      <div class="socials">
        <a href="${FACEBOOK}" target="_blank" rel="noopener" aria-label="Flexi Tours on Facebook">${I.fb}</a>
        <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Flexi Tours on Instagram">${I.ig}</a>
      </div>
    </div>
  </div>
</footer>

<a class="fab" href="${PLAN}" target="_blank" rel="noopener">${I.wa}<span>WhatsApp us</span></a>`;

const LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Flexi Tours (Pty) Ltd",
  url: "https://www.flexi-tours.co.za/",
  logo: "https://www.flexi-tours.co.za/images/logo.png",
  email: "bookings@flexi-tours.co.za",
  telephone: "+27780474236",
  priceRange: "R250 - R9500",
  availableLanguage: ["English", "French", "Spanish", "Portuguese"],
  areaServed: ["Cape Town", "Stellenbosch", "Franschhoek", "Paarl", "Constantia", "Durbanville", "Garden Route", "Western Cape"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "7" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00", closes: "23:30",
  },
  address: [
    { "@type": "PostalAddress", streetAddress: "Unit C6, The Exchange, 1 School Street, Milnerton", addressLocality: "Cape Town", addressRegion: "Western Cape", addressCountry: "ZA" },
    { "@type": "PostalAddress", streetAddress: "Unit C6, Edward Park, 124 Edward Avenue, Hennopspark", addressLocality: "Centurion", addressRegion: "Gauteng", addressCountry: "ZA" },
  ],
}, null, 2);

const articleLdJson = (a) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: a.title,
  description: a.excerpt,
  image: `https://www.flexi-tours.co.za/assets/img/guides/${a.img}`,
  datePublished: a.isoDate,
  dateModified: a.isoDate,
  author: { "@type": "Organization", name: "Flexi Tours (Pty) Ltd" },
  publisher: {
    "@type": "Organization",
    name: "Flexi Tours (Pty) Ltd",
    logo: { "@type": "ImageObject", url: "https://www.flexi-tours.co.za/assets/img/logo.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.flexi-tours.co.za/guides/${a.slug}.html` },
}, null, 2);

const shell = ({ file, title, desc, og, body, articleLd }) => `<!DOCTYPE html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#08161C">
<link rel="canonical" href="https://www.flexi-tours.co.za/${file === "index.html" ? "" : file}">
<link rel="icon" href="assets/img/logo.png">

<meta property="og:type" content="${articleLd ? "article" : "website"}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="assets/img/guides/${og}">
<meta property="og:locale" content="en_ZA">${articleLd ? `
<meta property="article:published_time" content="${articleLd.isoDate}">` : ""}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:ital,wght@0,300;0,600;0,700;0,800;1,300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">

<script type="application/ld+json">
${LD}
</script>${articleLd ? `
<script type="application/ld+json">
${articleLdJson(articleLd)}
</script>` : ""}
</head>
<body>

<a class="skip" href="#main">Skip to main content</a>

${topbar()}

${header(file)}

<main id="main">
${body}
</main>

${footer()}

<script src="assets/js/main.js" defer></script>
<script>document.getElementById("yr").textContent=new Date().getFullYear();</script>
</body>
</html>
`;

/* ---------------- reusable blocks ---------------- */
const phead = ({ img, alt, label, h1, lead, crumb, parent }) => `<section class="phead">
  <div class="phead-media"><img src="assets/img/guides/${img}" alt="${alt}" width="1536" height="1024" fetchpriority="high"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>${I.chev}${parent ? `<a href="${parent[0]}">${parent[1]}</a>${I.chev}` : ""}<span>${crumb}</span></nav>
    <p class="label" style="margin-top:var(--s-3)">${label}</p>
    <h1 class="d-lg">${h1}</h1>
    <p class="lead">${lead}</p>
  </div>
</section>`;

const ctaBand = (heading = "Coming to Cape Town?", o = {}) => `<section class="section-sm">
  <div class="wrap">
    <div class="cta" data-reveal>
      <p class="label" style="justify-content:center">Plan your trip</p>
      <h2 class="d-lg">${heading}</h2>
      <p class="lead">${o.lead || "Tell us your dates. We'll handle the rest."}</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="${o.href || PLAN}" target="_blank" rel="noopener">${I.wa} ${o.button || "Plan my trip"}</a>
        <a class="btn btn-ghost" href="mailto:bookings@flexi-tours.co.za?subject=Tour%20enquiry">Email bookings</a>
      </div>
      <p class="small muted" style="margin-top:var(--s-3)">Open seven days a week, 07:00&ndash;23:30</p>
    </div>
  </div>
</section>`;

const contactCards = (heading) => `<section class="section-sm">
  <div class="wrap">
    ${heading ? `<div class="sec-head" data-reveal><div><p class="label">Reach us</p><h2 class="d-md">${heading}</h2></div></div>` : ""}
    <ul class="grid-contact">
      <li><a class="ccard" href="${WA}" target="_blank" rel="noopener" data-reveal>
        <span class="ccard-ico">${I.wa}</span><h3>WhatsApp</h3><p><strong>+27 78 047 4236</strong><br>Fastest way to reach us</p></a></li>
      <li><a class="ccard" href="mailto:bookings@flexi-tours.co.za" data-reveal data-delay="70">
        <span class="ccard-ico b">${I.mail}</span><h3>Email</h3><p><strong>bookings@<wbr>flexi-tours.co.za</strong><br>For quotes and itineraries</p></a></li>
      <li><a class="ccard" href="tel:+27732502549" data-reveal data-delay="140">
        <span class="ccard-ico">${I.phone}</span><h3>Phone</h3><p><strong>+27 73 250 2549</strong><br>Mon&ndash;Sun, 07:00&ndash;23:30</p></a></li>
      <li><div class="ccard" data-reveal data-delay="210">
        <span class="ccard-ico b">${I.pin}</span><h3>Branches</h3><p><strong>Cape Town</strong> &middot; Milnerton<br><strong>Centurion</strong> &middot; Hennopspark</p></div></li>
    </ul>
  </div>
</section>`;

const priceNote = `<p class="small muted" style="margin-top:14px">Prices above are a guide for cost estimation only. The actual price is determined by the dates, number of people, duration and optional items selected. <a class="tlink" style="min-height:0;display:inline" href="${waLink("Hi Flexi Tours, please send me a formal quote.")}" target="_blank" rel="noopener">Request a formal quote</a>.</p>`;

/* ---------------- data ---------------- */
const TOURS = [
  {
    id: "cape-peninsula", tag: "Cape Peninsula", icon: I.pin,
    img: "cape-point.webp", alt: "Cape Point lighthouse above the cliffs of the Cape Peninsula",
    name: "Cape Peninsula Sight Seeing Tour", price: "From R1,800", per: "/pp",
    blurb: "Your visit to Cape Town and South Africa is not complete until you go on this tour. Let us make you experience the real beauty of Cape Town and enjoy a glass of wine even as we take you to some of the award winning wine farms.",
    stops: "Table Mountain · Twelve Apostles · Chapman's Peak · Cape Point · Boulders penguins",
    chips: [[I.clock, "Full day"], [I.hotel, "Hotel pickup"], [I.users, "Private or shared"]],
    itin: [
      "Pick up from your hotel or accommodation.",
      "Drive around key historic landmarks in the Cape Town CBD.",
      "Table Mountain cable car station — stop for viewing and pictures.",
      "Drive along the Cape Peninsula with stops and passes at the Twelve Apostles, Camps Bay, Hout Bay and the Chapman's Peak scenic route.",
      'Cape Point Vineyards stop for an <span class="opt">optional</span> quick wine tasting, drinks and refreshments.',
      'Cape of Good Hope and Cape Point with a light <span class="opt">optional</span> sit-down lunch or snack.',
      "Boulders Beach penguin colony for direct encounters with the penguins.",
      "Return to Cape Town CBD via Muizenberg beach to end the tour.",
    ],
  },
  {
    id: "winelands", tag: "Winelands", icon: I.wine,
    img: "winelands-tour.webp", alt: "Wine tasting on a Cape Winelands estate near Stellenbosch",
    name: "Cape Winelands Wine Tasting Tour", price: "From R1,500", per: "/pp",
    blurb: "Explore the Cape Winelands, a picturesque region nestled in the heart of South Africa, renowned for its breathtaking landscapes, world-class vineyards and rich cultural heritage. Embark on a captivating journey through three of the most enchanting towns in this wine lover's paradise: Paarl, Franschhoek and Stellenbosch.",
    stops: "Paarl · Spice Route · Franschhoek · Stellenbosch",
    chips: [[I.clock, "Full day"], [I.hotel, "Hotel pickup"], [I.users, "Private or shared"]],
    itin: [
      "Pick up from your hotel or accommodation.",
      "Wine tasting at one of the best vineyards in the Paarl Valley.",
      "Proceed to Spice Route in Paarl and try various experiences — craft beer, chocolates and spices.",
      'Explore a wine farm in Franschhoek for more tasting and an <span class="opt">optional</span> lunch.',
      "Proceed to Stellenbosch for more wine tasting.",
      "Return to Cape Town for drop-off at your hotel or accommodation.",
    ],
  },
  {
    id: "best-of-cape-town", tag: "City & coast",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 18 5.5-8 4 5 3-4L21 18Z"/><circle cx="7.5" cy="7" r="1.8"/></svg>`,
    img: "city-tour-table-mountain.webp", alt: "Table Mountain and the Cape Town city bowl seen from a scenic tour route",
    name: "Best of Cape Town Tour", price: "On request", per: "",
    blurb: "The Best of Cape Town Tour offers a comprehensive exploration of this vibrant South African city, known for its stunning natural beauty, rich history and diverse culture.",
    stops: "Camps Bay · Chapman's Peak · Cape Point · Boulders penguins · Simon's Town · Stellenbosch tasting",
    chips: [[I.clock, "Full day"], [I.hotel, "Hotel pickup"], [I.users, "Private or shared"]],
    itin: [
      "Pick up from your hotel or accommodation.",
      "Drive along Camps Bay and Llandudno to Hout Bay.",
      "Proceed to Cape Point Nature Reserve via the world-famous Chapman's Peak Drive.",
      "Continue to Boulders Beach to view the penguins.",
      "Head on to Simon's Town to tour the Historical Mile. Lunch is on your own account.",
      "End the day by driving to the Winelands of Stellenbosch and visiting a farm for some wine tasting.",
      "Return to the pick-up point.",
    ],
  },
  {
    id: "west-coast", tag: "Adventure", icon: I.bolt,
    img: "quad-biking.webp", alt: "Quad biking across the Atlantis sand dunes near Cape Town",
    name: "West Coast Adventure Tour", price: "From R2,500", per: "/pp",
    blurb: "Embark on a thrilling adventure that seamlessly combines the adrenaline-pumping experience of quad biking on the Atlantis Sand Dunes with the sophisticated pleasures of wine tasting at the renowned Durbanville wine farms.",
    stops: "Quad biking on the Atlantis dunes · Optional sandboarding · Optional Durbanville wine tasting",
    chips: [[I.clock, "1 hr quad biking"], [I.hotel, "Hotel pickup"], [I.users, "Private or shared"]],
    itin: [
      "Pick up from your hotel or accommodation.",
      "Feel the rush as you navigate the Atlantis sand dunes on a quad bike for 1 hour.",
      '<span class="opt">Optional extra:</span> experience the rush of gliding down steep dunes on a sandboard for 1 hour.',
      '<span class="opt">Optional extra:</span> head to the Durbanville Wine Valley, a picturesque wine region known for its boutique wineries.',
      "Return to Cape Town for drop-off at your hotel or accommodation.",
    ],
  },
  {
    id: "safari-big5", tag: "Big 5", icon: I.paw,
    img: "safari-day-trips.webp", alt: "Game drive vehicle beside elephants on a Big Five reserve near Cape Town",
    name: "Cape Safari Tour — Big 5 Option", price: "On request", per: "",
    blurb: "This safari tour is a two-hour drive from Cape Town and has all of the Big Five: rhino, elephant, lion, buffalo and leopard. Embark on exhilarating game drives through renowned private game reserves. Visitors can also see many other native African species, including giraffe, zebra, hippo, ostrich, eland, wildebeest and springbok.",
    stops: "Lion · Leopard · Elephant · Rhino · Buffalo · Welcome drink &amp; buffet lunch",
    chips: [[I.clock, "2–3 hr game drive"], [I.hotel, "Hotel pickup"]],
    itin: [
      "Pick up from your hotel or accommodation.",
      "Start: Cape Town CBD at 09h00 and travel for two hours.",
      "Enjoy a welcome drink and buffet lunch.",
      "Embark on a 2–3 hour shared game drive.",
      "Depart the game reserve at 16h00–16h30.",
      "Return to Cape Town for drop-off at your hotel or accommodation.",
    ],
  },
  {
    id: "safari-big4", tag: "Big 4", icon: I.paw,
    img: "kruger-tours.webp", alt: "Elephants at a waterhole on a private game reserve near Cape Town",
    name: "Cape Safari Tour — Big 4 Option", price: "On request", per: "",
    blurb: "This safari tour is a 45-minute drive from Cape Town and has four of the Big Five: lion, buffalo, rhino and leopard. Other animals you can see include cheetah, giraffe, zebra, kudu, eland, oryx, blue wildebeest, mountain reedbuck and red hartebeest. The reserve offers guided game drives, bush walks, birdwatching and mountain biking trails, with experienced guides providing insight into the flora, fauna and ecosystems of the area.",
    stops: "Lion · Buffalo · Rhino · Leopard · Cheetah · Bush walks &amp; birdwatching",
    chips: [[I.clock, "45 min from Cape Town"], [I.hotel, "Hotel pickup"]],
    itin: [
      "Pick up from your hotel or accommodation.",
      "Start: Cape Town CBD at 09h00 and travel for 60 minutes.",
      "Enjoy a welcome drink and lunch.",
      "Embark on a 2–3 hour shared game drive.",
      "Explore other activities available at the game reserve for one to two more hours.",
      "Depart the game reserve at 15h30–16h00.",
      "Return to Cape Town for drop-off at your hotel or accommodation.",
    ],
  },
];

const GUIDES = ARTICLES.map(a => [a.slug, a.title, a.isoDate, a.date, a.img, a.excerpt]);

const SERVICES = ["City Tours", "Group Tours", "Private Tours", "Adventure Tours", "Airport Transfers", "Cape Peninsula Tour", "Cape Town City Tour", "Chauffeur Service", "Customised Tours", "Day Tours", "Guided Tours", "Point to Point Transfers", "Private Airport Drop-Off", "Private Airport Pick-Up", "Private Transfers", "Quad Biking", "Safari Tours", "Sand Boarding", "Shuttle Service", "Sight Seeing Tours", "Tours &amp; Experiences", "Winelands Tours"];

const svcGrid = () => `<ul class="svc-grid" data-reveal>${SERVICES.map((s) => `<li class="svc">${I.check}${s}</li>`).join("")}</ul>`;

const tourCard = (t, i) => `<li class="card" data-reveal${i % 3 ? ` data-delay="${(i % 3) * 80}"` : ""}>
  <div class="card-media">
    <img src="assets/img/guides/${t.img}" alt="${t.alt}" width="1536" height="1024" loading="lazy">
    <span class="card-tag">${t.icon}${t.tag}</span>
    <span class="card-price">${t.price}${t.per ? ` <small>${t.per}</small>` : ""}</span>
  </div>
  <div class="card-body">
    <h3>${t.name.replace(" Option", "")}</h3>
    <p class="card-stops">${t.stops}</p>
    <ul class="card-meta">${t.chips.concat([[I.globe, "EN · FR · ES · PT"]]).map(([ic, tx]) => `<li class="chip">${ic}${tx}</li>`).join("")}</ul>
  </div>
  <div class="card-foot">
    <a class="btn btn-primary btn-sm" href="tours.html#${t.id}" aria-label="View tour: ${t.name.replace(" Option", "")}">View tour</a>
    <a class="btn btn-ghost btn-sm" href="${checkLink(t.name)}" target="_blank" rel="noopener" aria-label="WhatsApp to check availability for the ${t.name.replace(" Option", "")}">${I.wa} WhatsApp</a>
  </div>
</li>`;

/* Holiday packages supplied by the client (September 2026). Prices are the
   client's "from" prices per person. */
const GR_DAYS = [
  { n: 1, title: "Cape Town → Mossel Bay", text: "Depart Cape Town and travel along the scenic coast.",
    hl: ["Mossel Bay", "Coastal scenery", "Beaches"] },
  { n: 2, title: "Wilderness &amp; Knysna", text: "Discover the beautiful Garden Route coastline and the famous town of Knysna.",
    hl: ["Wilderness", "Knysna Lagoon", "Knysna Waterfront"] },
  { n: 3, title: "Tsitsikamma Adventure", text: "A day of forests, ocean views and adventure.",
    hl: ["Tsitsikamma National Park", "Storms River", "Suspension Bridge"], opt: "Zipline or other adventure activities" },
  { n: 4, title: "Plettenberg Bay &amp; Wildlife", text: "Enjoy beautiful beaches and get close to South Africa's wildlife.",
    hl: ["Plettenberg Bay", "Beaches", "Wildlife experience"] },
  { n: 5, title: "Oudtshoorn → Cape Town", text: "Experience the unique Klein Karoo before returning to Cape Town.",
    hl: ["Oudtshoorn", "Cango Caves", "Scenic Route"] },
];

const GR_INCLUDED = ["Private comfortable transport", "Professional local guide", "Hotel pickup and drop-off",
  "4 nights accommodation", "Garden Route sightseeing", "Flexible itinerary", "Bottled water"];

const PACKAGES = [
  {
    name: "Cape Town 3-Day Experience", len: "3 days", price: "From R4,500", per: "/pp",
    img: "sightseeing.webp", alt: "Visitors on an open-top tour looking out over Table Mountain and Lion's Head",
    rows: [
      ["Day 1", "Cape Peninsula, penguins &amp; Cape Point", "tours.html#cape-peninsula"],
      ["Day 2", "Table Mountain &amp; Cape Town"],
      ["Day 3", "Winelands", "tours.html#winelands"],
    ],
    note: "WhatsApp us to customise your trip.",
  },
  {
    name: "Cape Town Adventure", len: "Adventure", tagIcon: I.bolt, price: "From R4,200", per: "/pp",
    img: "sandboarding.webp", alt: "Sandboarding down the white Atlantis dunes with Table Mountain in the distance",
    rows: [
      ["", "Cape Peninsula", "tours.html#cape-peninsula"],
      ["", "Atlantis quad biking", "tours.html#west-coast"],
      ["", "Sandboarding", "tours.html#west-coast"],
      ["", "Winelands"],
    ],
    note: "WhatsApp us to customise your trip.",
  },
  {
    name: "5-Day Garden Route Adventure", len: "5 days", price: "From R9,500", per: "/pp",
    img: "garden-route.webp", alt: "Travellers looking out over the Garden Route coastline",
    rows: GR_DAYS.map((d) => [`Day ${d.n}`, d.title, `garden-route.html#day-${d.n}`]),
    note: "Includes 4 nights accommodation, a private guide and transport.",
    page: "garden-route.html",
  },
];

const plain = (s) => s.replace(/&amp;/g, "&");
const pkgMsg = (p) => waLink(`Hi Flexi Tours, I'm interested in the ${plain(p.name)} package.\n\nDates:\nNumber of travellers:\nHotel/location:`);

const packageCard = (p, i) => {
  const cta = p.page ? "WhatsApp" : "Customise this trip";
  return `<li class="pkg" data-reveal${i % 3 ? ` data-delay="${(i % 3) * 80}"` : ""}>
  <div class="pkg-media">
    <img src="assets/img/guides/${p.img}" alt="${p.alt}" width="1536" height="1024" loading="lazy">
    <span class="card-tag">${p.tagIcon || I.calendar}${p.len}</span>
    <span class="card-price">${p.price} <small>${p.per}</small></span>
  </div>
  <div class="pkg-body">
    <h3>${p.page ? `<a href="${p.page}">${p.name}</a>` : p.name}</h3>
    <ol class="pkg-days">${p.rows.map(([d, t, href]) => `<li${d ? "" : ' class="nolabel"'}>${d ? `<b>${d}</b>` : ""}${href ? `<a href="${href}">${t}</a>` : `<span>${t}</span>`}</li>`).join("")}</ol>
    <p class="pkg-note">${p.note}</p>
  </div>
  <div class="pkg-foot">
    ${p.page ? `<a class="btn btn-ghost btn-sm" href="${p.page}" aria-label="Full itinerary: ${plain(p.name)}">Full itinerary</a>` : ""}
    <a class="btn btn-primary btn-sm" href="${pkgMsg(p)}" target="_blank" rel="noopener" aria-label="${cta}: ${plain(p.name)}">${I.wa} ${cta}</a>
  </div>
</li>`;
};

const packagesSection = ({
  link = true,
  label = "Holiday packages",
  title = "Book the whole trip",
  lead = "Multi-day trips with hotel pickup, guided in English, French, Spanish or Portuguese. Every package can be customised to suit you.",
} = {}) => `<section class="section" id="packages">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">${label}</p><h2 class="d-md">${title}</h2>
      <p class="lead">${lead}</p></div>
      ${link ? `<a class="btn btn-ghost" href="packages.html">All packages</a>` : ""}
    </div>
    <ul class="grid-pkgs">${PACKAGES.map(packageCard).join("\n")}</ul>
  </div>
</section>`;

/* Signature day out: West Coast Adventure. Sandboarding and wine tasting are
   optional extras on that tour, so they are labelled as such. */
const adventureFeature = () => `<section class="section-sm" id="adventure">
  <div class="wrap">
    <div class="feature" data-reveal>
      <div class="feature-media"><img src="assets/img/guides/quad-biking.webp" alt="Quad bikes crossing the white Atlantis sand dunes with Table Mountain behind" width="1536" height="1024" loading="lazy"></div>
      <div class="feature-body">
        <p class="label">Adventure + wine</p>
        <h2 class="d-lg">Quad bike the Atlantis dunes</h2>
        <p class="lead">Race across the spectacular white sand dunes, try sandboarding and finish your day with Cape Winelands scenery.</p>
        <ul class="feature-facts">
          <li class="chip">${I.clock}1 hr quad biking</li>
          <li class="chip">${I.bolt}Sandboarding (optional)</li>
          <li class="chip">${I.wine}Wine tasting (optional)</li>
          <li class="chip">${I.hotel}Hotel pickup</li>
        </ul>
        <p class="feature-price">From <b>R2,500</b> per person</p>
        <div class="cta-actions" style="justify-content:flex-start">
          <a class="btn btn-primary" href="${checkLink("West Coast Adventure Tour")}" target="_blank" rel="noopener">${I.wa} Book the adventure</a>
          <a class="btn btn-ghost" href="tours.html#west-coast">See the full day</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

const guideCard = (g, i) => `<li><a class="guide" href="${guideHref(g[0])}" data-reveal${i % 3 ? ` data-delay="${(i % 3) * 80}"` : ""}>
  <div class="guide-media"><img src="assets/img/guides/${g[4]}" alt="" width="1536" height="1024" loading="lazy"></div>
  <time datetime="${g[2]}">${g[3]}</time>
  <h3>${g[1]}</h3>
  <p>${g[5]}</p>
</a></li>`;

/* ================= PAGES ================= */
const pages = [];

/* ---------- TOURS ---------- */
pages.push({
  file: "tours.html",
  title: "Tours &amp; Experiences | Flexi Tours Cape Town",
  desc: "Full itineraries, guide prices and multi-day packages for our Cape Peninsula, Winelands, Best of Cape Town, West Coast Adventure and Big 5 / Big 4 safari tours. Guided in English, French, Spanish and Portuguese.",
  og: "cape-point.webp",
  body: `${phead({
    img: "sightseeing.webp",
    alt: "Scenic Cape Town coastline on a Flexi Tours sightseeing route",
    label: "Our tours",
    h1: "Cape Town tours &amp; experiences",
    lead: "Welcome to the breathtaking city of Cape Town, where natural wonders and wildlife encounters await at every turn. Historic neighbourhoods like Bo-Kaap, Table Mountain, scenic drives like Chapman's Peak, beautiful beaches, penguin encounters and vast wine farms.",
    crumb: "Tours",
  })}

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Choose your day</p><h2 class="d-md">Six ways to see the Cape</h2>
      <p class="lead">Each one runs privately for your group, or shared with others if you would rather keep the cost down. Guided in English, French, Spanish or Portuguese.</p></div>
    </div>
    <ul class="grid-tours">${TOURS.map(tourCard).join("\n")}</ul>
  </div>
</section>

${packagesSection()}

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Guide prices</p><h2 class="d-md">What a day costs</h2></div>
    </div>
    <div class="table-wrap" data-reveal>
      <table class="ptable">
        <thead><tr><th scope="col">Tour</th><th scope="col">Price per person</th></tr></thead>
        <tbody>
          <tr><th scope="row">Airport Transfers</th><td>From R800</td></tr>
          <tr><th scope="row">Cape Peninsula Tour</th><td>From R1,800</td></tr>
          <tr><th scope="row">Cape Winelands</th><td>From R1,500</td></tr>
          <tr><th scope="row">West Coast Adventure</th><td>From R2,500</td></tr>
        </tbody>
      </table>
    </div>
    ${priceNote}
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Itineraries</p><h2 class="d-md">Every stop, in order</h2>
      <p class="lead">Each tour runs privately for your group or shared with others. Timings flex around your dates and pace.</p></div>
    </div>
    ${TOURS.map((t) => `<article class="tour-block" id="${t.id}">
      <div class="frow-media" data-reveal><img src="assets/img/guides/${t.img}" alt="${t.alt}" width="1536" height="1024" loading="lazy"></div>
      <div data-reveal data-delay="80">
        <p class="label">${t.tag}</p>
        <div class="tour-title">
          <h2>${t.name}</h2>
          ${t.price === "On request" ? `<span class="price-tag">Price on request</span>` : `<span class="price-tag">${t.price} <small>per person</small></span>`}
        </div>
        <p class="lead">${t.blurb}</p>
        <ol class="itin">${t.itin.map((s) => `<li>${s}</li>`).join("")}</ol>
        <div class="cta-actions" style="justify-content:flex-start;margin-top:var(--s-4)">
          <a class="btn btn-primary" href="${checkLink(t.name)}" target="_blank" rel="noopener">${I.wa} Check availability</a>
          <a class="btn btn-ghost" href="mailto:bookings@flexi-tours.co.za?subject=${encodeURIComponent(t.name + " enquiry")}">Email us</a>
        </div>
      </div>
    </article>`).join("\n")}
  </div>
</section>

${ctaBand("Ready when you are.")}`,
});

/* ---------- TRANSFERS ---------- */
pages.push({
  file: "transfers.html",
  title: "Airport Transfers &amp; Shuttle Service | Flexi Tours Cape Town",
  desc: "Private airport transfers, point-to-point transfers and chauffeur service in and around Cape Town. Air-conditioned vehicles, professional drivers, Wi-Fi and water on board.",
  og: "airport-transfers.webp",
  body: `${phead({
    img: "airport-transfers.webp",
    alt: "Private transfer vehicle waiting outside Cape Town International Airport",
    label: "Transfers &amp; shuttles",
    h1: "Private transfer and shuttle service",
    lead: "We provide private transfers and shuttle services in and around Cape Town. We offer airport transfers, point-to-point transfers and customised tours, using comfortable vehicles and professional drivers.",
    crumb: "Transfers",
  })}

<section class="section-sm">
  <div class="wrap">
    <ul class="stats" data-reveal>
      <li class="stat"><b>R250</b><span>Per person, from &mdash; 6 passengers</span></li>
      <li class="stat"><b>7</b><span>Days a week, 07:00&ndash;23:30</span></li>
      <li class="stat"><b>5</b><span>Transfer services offered</span></li>
      <li class="stat"><b>4.9<span class="u">★</span></b><span>Google rating from 7 reviews</span></li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="frow">
      <div class="frow-media" data-reveal><img src="assets/img/guides/stellenbosch-transfer.webp" alt="Comfortable private transfer vehicle on a Western Cape road" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label label-blue">What is included</p>
        <h2 class="d-md">Everything on board, nothing extra to ask for.</h2>
        <p class="lead">Our transfer and shuttle service includes the following as standard:</p>
        <ul class="checks">
          <li>${I.check}Bottle of water</li>
          <li>${I.check}Free Wi-Fi on board</li>
          <li>${I.check}Air-conditioned vehicle</li>
          <li>${I.check}Professional driver</li>
          <li>${I.check}Help with loading and offloading luggage</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Pricing</p><h2 class="d-md">Rates by group size</h2>
      <p class="lead">The more of you travelling, the less each person pays.</p></div>
    </div>
    <div class="table-wrap" data-reveal>
      <table class="ptable">
        <thead><tr><th scope="col">Transfer</th><th scope="col">Price per person</th></tr></thead>
        <tbody>
          <tr><th scope="row">1 person</th><td>From R1,200</td></tr>
          <tr><th scope="row">2 persons</th><td>From R650 pp</td></tr>
          <tr><th scope="row">3 persons</th><td>From R500 pp</td></tr>
          <tr><th scope="row">4 persons</th><td>From R400 pp</td></tr>
          <tr><th scope="row">5 persons</th><td>From R350 pp</td></tr>
          <tr><th scope="row">6 persons</th><td>From R250 pp</td></tr>
        </tbody>
      </table>
    </div>
    <p class="small muted" style="margin-top:14px">Prices above are a guide for cost estimation only. The actual price is determined by the dates, number of people, number of bags and trips selected. <a class="tlink" style="min-height:0;display:inline" href="${waLink("Hi Flexi Tours, please send me a formal transfer quote.")}" target="_blank" rel="noopener">Request a formal quote</a>.</p>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Services</p><h2 class="d-md">Ways we can move you</h2></div></div>
    <ul class="svc-grid" data-reveal>
      <li class="svc">${I.van}Private Airport Pick-Up</li>
      <li class="svc">${I.van}Private Airport Drop-Off</li>
      <li class="svc">${I.van}Private Transfers</li>
      <li class="svc">${I.van}Point to Point Transfers</li>
      <li class="svc">${I.van}Chauffeur Service</li>
      <li class="svc">${I.van}Shuttle Service</li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Why use us</p><h2 class="d-md">Why travel with us</h2></div>
    </div>
    <ol class="steps">
      <li class="step" data-reveal><b>01</b><h3>Reliability</h3><p>Punctual pickups and drop-offs according to the scheduled timetable. If we are delayed for any reason, we communicate with you and resolve it as efficiently as possible.</p></li>
      <li class="step" data-reveal data-delay="70"><b>02</b><h3>Comfortable vehicles</h3><p>Well-maintained vehicles that are clean, comfortable and equipped with air conditioning, Wi-Fi, comfortable seating and sufficient luggage space.</p></li>
      <li class="step" data-reveal data-delay="140"><b>03</b><h3>Professional drivers</h3><p>Experienced, licensed and professional drivers with good knowledge of the routes they operate — courteous and helpful throughout.</p></li>
      <li class="step" data-reveal data-delay="210"><b>04</b><h3>Customer service</h3><p>Responsive communication, helpful staff and a commitment to addressing any passenger concerns or issues promptly.</p></li>
      <li class="step" data-reveal><b>05</b><h3>Flexibility</h3><p>Flexibility in scheduling, route adjustments and accommodating special requests, depending on what you need.</p></li>
      <li class="step" data-reveal data-delay="70"><b>06</b><h3>Additional services</h3><p>Extra amenities to enhance your experience, including Wi-Fi on board, bottled water and guided tours.</p></li>
    </ol>
  </div>
</section>

${ctaBand("Need a lift from the airport?")}`,
});

/* ---------- ABOUT ---------- */
pages.push({
  file: "about.html",
  title: "About Flexi Tours | Cape Town Tour &amp; Transfer Operator",
  desc: "Flexi Tours (Pty) Ltd runs tours, activities, transfers and adventures across Cape Town and the Western Cape, with branches in Cape Town and Centurion. Rated 4.9 on Google.",
  og: "private-tours.webp",
  body: `${phead({
    img: "waterfront-tour.webp",
    alt: "Cape Town waterfront with Table Mountain in the background",
    label: "About us",
    h1: "The people behind the wheel",
    lead: "Flexi Tours (Pty) Ltd runs tours, activities, transfers, sightseeing and adventures across Cape Town, the Garden Route, Stellenbosch, Constantia, Paarl, Durbanville and Franschhoek.",
    crumb: "About",
  })}

<section class="section-sm">
  <div class="wrap">
    <ul class="stats" data-reveal>
      <li class="stat"><b>4.9<span class="u">★</span></b><span>Google rating from 7 reviews</span></li>
      <li class="stat"><b>22<span class="u">+</span></b><span>Tours, transfers &amp; activities</span></li>
      <li class="stat"><b>7</b><span>Days a week, 07:00&ndash;23:30</span></li>
      <li class="stat"><b>2</b><span>Branches: Cape Town &amp; Centurion</span></li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="frow">
      <div class="frow-media" data-reveal><img src="assets/img/guides/private-tours.webp" alt="Guests on a private Cape Town tour with a Flexi Tours guide" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label">Our story</p>
        <h2 class="d-md">Built on local knowledge, not a call centre.</h2>
        <p class="lead">We have several years of experience in the events, tours and adventures industry. That means we know which route works on a windy morning, which farm is worth the extra half hour, and how long the queue at the cableway really takes.</p>
        <p class="lead" style="margin-top:var(--s-3)">Our tours take in historic neighbourhoods like Bo-Kaap, monuments, the magnificent Table Mountain — one of the seven natural wonders of the world — scenic views like Chapman's Peak, beautiful beaches, penguin encounters and vast wine farms.</p>
      </div>
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Why use us</p><h2 class="d-md">What you get, every time</h2></div></div>
    <ol class="steps">
      <li class="step" data-reveal><b>01</b><h3>Experience</h3><p>Several years of experience in the events, tours and adventures industry.</p></li>
      <li class="step" data-reveal data-delay="70"><b>02</b><h3>Flexible options</h3><p>Flexible tour options available, from fully private tours to shared group tours.</p></li>
      <li class="step" data-reveal data-delay="140"><b>03</b><h3>Safe vehicles</h3><p>Reliable, safe and comfortable vehicles used for all tours, for your peace of mind.</p></li>
      <li class="step" data-reveal data-delay="210"><b>04</b><h3>Every kind of guest</h3><p>We service all types of clients, including local and international visitors.</p></li>
    </ol>
    <div class="frow" style="margin-top:var(--s-6)">
      <div class="frow-body" data-reveal>
        <p class="label label-blue">On board</p>
        <h2 class="d-md">Superior customer service</h2>
        <ul class="checks">
          <li>${I.wifi}Wi-Fi on board so you can share the day as it happens</li>
          <li>${I.check}Snacks and bottled water on every tour</li>
          <li>${I.shield}Tour guides with deep local knowledge</li>
          <li>${I.globe}Guides available in English, French, Spanish and Portuguese</li>
          <li>${I.van}Reliable, safe and comfortable vehicles</li>
        </ul>
      </div>
      <div class="frow-media" data-reveal data-delay="90"><img src="assets/img/guides/corporate-transport.webp" alt="Flexi Tours group transport vehicle in Cape Town" width="1536" height="1024" loading="lazy"></div>
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Everything we do</p><h2 class="d-md">Tours, transfers and activities</h2></div></div>
    ${svcGrid()}
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Find us</p><h2 class="d-md">Two branches, one team</h2></div></div>
    <ul class="grid-contact">
      <li><div class="ccard" data-reveal><span class="ccard-ico">${I.pin}</span><h3>Cape Town</h3><p>Unit C6, The Exchange,<br>1 School Street, Milnerton,<br>Cape Town</p></div></li>
      <li><div class="ccard" data-reveal data-delay="70"><span class="ccard-ico b">${I.pin}</span><h3>Centurion</h3><p>Unit C6, Edward Park,<br>124 Edward Avenue,<br>Hennopspark, Centurion</p></div></li>
      <li><div class="ccard" data-reveal data-delay="140"><span class="ccard-ico">${I.clock}</span><h3>Opening hours</h3><p><strong>Monday&ndash;Sunday</strong><br>07:00&ndash;23:30</p></div></li>
      <li><div class="ccard" data-reveal data-delay="210"><span class="ccard-ico b">${I.shield}</span><h3>Registered</h3><p><strong>Flexi Tours (Pty) Ltd</strong><br>Western Cape &amp; Gauteng</p></div></li>
    </ul>
  </div>
</section>

${ctaBand("Come and see the Cape with us.")}`,
});

/* ---------- GUIDES ---------- */
pages.push({
  file: "guides.html",
  title: "Cape Town Travel Guides | Flexi Tours",
  desc: "Practical local advice on Cape Town tours, safaris, the Winelands, Table Mountain, Chapman's Peak, airport transfers and the Garden Route.",
  og: "chapmans-peak.webp",
  body: `${phead({
    img: "garden-route.webp",
    alt: "Scenic Garden Route coastline in South Africa",
    label: "Travel guides",
    h1: "Plan your trip properly",
    lead: "Practical local advice on timing, routes, weather and costs, so you can plan your days in the Cape with confidence.",
    crumb: "Travel Guides",
  })}

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">All articles</p><h2 class="d-md">${GUIDES.length} guides to the Cape</h2></div>
    </div>
    <ul class="grid-guides">${GUIDES.map(guideCard).join("\n")}</ul>
  </div>
</section>

${ctaBand("Read enough? Let us drive.")}`,
});

/* ---------- CONTACT ---------- */
pages.push({
  file: "contact.html",
  title: "Contact Flexi Tours | Cape Town Tours &amp; Transfers",
  desc: "Get in touch with Flexi Tours for Cape Town tours, safaris, winelands tastings and airport transfers. WhatsApp +27 78 047 4236, call +27 73 250 2549 or email bookings@flexi-tours.co.za.",
  og: "cape-point.webp",
  body: `${phead({
    img: "boulders-penguins.webp",
    alt: "African penguins at Boulders Beach near Simon's Town",
    label: "Contact",
    h1: "Get in touch with us",
    lead: "Tell us your dates, your group size and where you're staying. We'll reply with a suggested route and a personalised price.",
    crumb: "Contact",
  })}

${contactCards("Four ways to reach us")}

<section class="section-sm">
  <div class="wrap">
    <div class="frow">
      <div class="frow-body" data-reveal>
        <p class="label">Booking</p>
        <h2 class="d-md">One message is all it takes</h2>
        <p class="lead">There is no booking form to wrestle with. Send us a message with the details below and we will do the rest.</p>
        <ul class="checks">
          <li>${I.check}Your travel dates and rough timings</li>
          <li>${I.check}How many people are travelling</li>
          <li>${I.check}Your hotel or pick-up address</li>
          <li>${I.check}Which tour or transfer you are interested in</li>
          <li>${I.check}Any optional extras — tastings, lunches, sandboarding</li>
        </ul>
        <div class="cta-actions" style="justify-content:flex-start;margin-top:var(--s-4)">
          <a class="btn btn-primary" href="${PLAN}" target="_blank" rel="noopener">${I.wa} Plan my trip on WhatsApp</a>
          <a class="btn btn-ghost" href="mailto:bookings@flexi-tours.co.za?subject=Booking%20enquiry&body=Dates%3A%0ANumber%20of%20people%3A%0AHotel%20%2F%20pick-up%20address%3A%0ATour%20or%20transfer%3A">Email us</a>
        </div>
      </div>
      <div class="frow-media" data-reveal data-delay="90"><img src="assets/img/guides/private-vs-shared.webp" alt="Flexi Tours guide with guests planning a Cape Town day trip" width="1536" height="1024" loading="lazy"></div>
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Branches &amp; hours</p><h2 class="d-md">Where to find us</h2></div></div>
    <ul class="grid-contact">
      <li><div class="ccard" data-reveal><span class="ccard-ico">${I.pin}</span><h3>Cape Town branch</h3><p>Unit C6, The Exchange,<br>1 School Street, Milnerton,<br>Cape Town, Western Cape</p></div></li>
      <li><div class="ccard" data-reveal data-delay="70"><span class="ccard-ico b">${I.pin}</span><h3>Centurion branch</h3><p>Unit C6, Edward Park,<br>124 Edward Avenue,<br>Hennopspark, Centurion</p></div></li>
      <li><div class="ccard" data-reveal data-delay="140"><span class="ccard-ico">${I.clock}</span><h3>Opening hours</h3><p><strong>Monday&ndash;Sunday</strong><br>07:00&ndash;23:30<br>Seven days a week</p></div></li>
      <li><a class="ccard" href="https://www.google.com/search?q=Flexi+Tours+Cape+Town+reviews" target="_blank" rel="noopener" data-reveal data-delay="210"><span class="ccard-ico b">${I.star}</span><h3>Reviews</h3><p><strong>4.9 out of 5</strong><br>From 7 Google reviews ${I.ext}</p></a></li>
    </ul>
  </div>
</section>

${ctaBand()}`,
});

/* ---------- PACKAGES ---------- */
pages.push({
  file: "packages.html",
  title: "Holiday Packages | Flexi Tours Cape Town",
  desc: "Multi-day holiday packages from Cape Town: the Cape Town 3-Day Experience, the Cape Town Adventure and the 5-Day Garden Route Adventure. Guided in English, French, Spanish and Portuguese.",
  og: "garden-route.webp",
  body: `${phead({
    img: "boulders-penguins.webp",
    alt: "African penguins on Boulders Beach with Table Mountain in the distance",
    label: "Holiday packages",
    h1: "Book the whole trip, not just a day",
    lead: "Multi-day packages built from our tours, from three days in Cape Town to five days on the Garden Route. Hotel pickup, local guides in English, French, Spanish or Portuguese, and every package can be customised.",
    crumb: "Packages",
  })}

${packagesSection({ link: false, label: "Our packages", title: "Choose your trip", lead: "Prices are per person and vary with your dates, group size and accommodation. WhatsApp us and we'll tailor any package to you." })}

${adventureFeature()}

${ctaBand("Want a different combination?", { lead: "Tell us which tours you'd like and your dates. We'll put your package together and quote the whole trip." })}`,
});

/* ---------- GARDEN ROUTE (5-day package) ---------- */
const GR = PACKAGES.find((p) => p.page === "garden-route.html");
pages.push({
  file: "garden-route.html",
  title: "5-Day Garden Route Adventure | Flexi Tours",
  desc: "A 5-day Garden Route tour from Cape Town: Mossel Bay, Wilderness, Knysna, Tsitsikamma, Plettenberg Bay and Oudtshoorn. Private guide, transport and 4 nights accommodation. From R9,500 per person.",
  og: "garden-route.webp",
  body: `${phead({
    img: "garden-route.webp",
    alt: "Travellers looking out over the Garden Route coastline",
    label: "5-day package",
    h1: "5-Day Garden Route Adventure",
    lead: "Cape Town → Garden Route → Cape Town. 5 days of incredible scenery, wildlife, beaches, forests and adventure.",
    crumb: "5-Day Garden Route Adventure",
    parent: ["packages.html", "Packages"],
  })}

<section class="section">
  <div class="wrap">
    <div class="frow">
      <div class="frow-media" data-reveal><img src="assets/img/guides/garden-route-private.webp" alt="A private tour vehicle on a coastal road on the Garden Route" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label">The trip</p>
        <h2 class="d-md">You enjoy the journey. We handle the rest.</h2>
        <p class="lead">Explore South Africa's beautiful Garden Route with a private guide and comfortable transport. We take care of the driving, accommodation and itinerary — you enjoy the journey.</p>
        <p class="feature-price">From <b>R9,500</b> per person</p>
        <p class="small muted">Price varies depending on accommodation, group size and activities.</p>
        <div class="cta-actions" style="justify-content:flex-start;margin-top:var(--s-4)">
          <a class="btn btn-primary" href="${pkgMsg(GR)}" target="_blank" rel="noopener">${I.wa} WhatsApp Flexi Tours</a>
          <a class="btn btn-ghost" href="#itinerary">See the 5 days</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-sm" id="itinerary">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Itinerary</p><h2 class="d-md">Day by day</h2></div></div>
    <ol class="days">${GR_DAYS.map((d) => `<li class="day" id="day-${d.n}" data-reveal>
      <div class="day-num">Day <b>${d.n}</b></div>
      <div>
        <h3>${d.title}</h3>
        <p>${d.text}</p>
        <ul class="card-meta">${d.hl.map((h) => `<li class="chip">${I.pin}${h}</li>`).join("")}</ul>
        ${d.opt ? `<p class="day-opt"><b>Optional:</b> ${d.opt}</p>` : ""}
      </div>
    </li>`).join("\n    ")}</ol>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">What's included</p><h2 class="d-md">Everything taken care of</h2>
      <p class="lead">Activities and meals can be added to suit your budget and interests.</p></div></div>
    <ul class="svc-grid" data-reveal>${GR_INCLUDED.map((x) => `<li class="svc">${I.check}${x}</li>`).join("")}</ul>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Travel guides</p><h2 class="d-md">Read before you go</h2></div></div>
    <ul class="grid-guides">${GUIDES.filter((g) => g[0].includes("garden-route")).map(guideCard).join("\n")}</ul>
  </div>
</section>

${ctaBand("Ready for the Garden Route?", { lead: "Tell us your dates and number of travellers. We'll build your 5-day Garden Route experience.", href: pkgMsg(GR), button: "WhatsApp Flexi Tours" })}`,
});

/* ---------- INDEX (regenerated so nav/footer stay in sync) ---------- */
const initials = (n) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

const reviewCard = (r, i) => `<li><figure class="review" data-reveal${i % 3 ? ` data-delay="${(i % 3) * 80}"` : ""}>
  <div>
    <span class="stars" aria-label="${r.stars} out of 5 stars">${I.star.repeat(r.stars)}</span>
    <blockquote style="margin-top:12px">${r.text}</blockquote>
  </div>
  <figcaption><span class="avatar${i % 2 ? " b" : ""}" aria-hidden="true">${initials(r.name)}</span><span><b>${r.name}</b><span>${r.meta} · ${r.when}</span></span></figcaption>
</figure></li>`;

pages.push({
  file: "index.html",
  title: "Flexi Tours | Cape Town Tours, Safaris, Winelands &amp; Airport Transfers",
  desc: "Explore Cape Town your way: private and shared tours, safaris, adventures, multi-day packages and airport transfers. Guides in English, French, Spanish and Portuguese. Hotel pickup. Rated 4.9 on Google.",
  og: "chapmans-peak.webp",
  body: `<section class="hero">
  <div class="hero-media">
    <img src="assets/img/guides/chapmans-peak.webp" alt="Chapman's Peak Drive winding along the Atlantic coastline near Cape Town" width="1536" height="1024" fetchpriority="high">
  </div>
  <div class="wrap hero-inner">
    <h1 class="d-xl hero-title"><span class="thin">Explore</span><br>Cape&nbsp;Town<br><span class="thin">your way</span></h1>
    <p class="lead">Private tours, shared experiences, safaris, adventures and airport transfers — with local guides and flexible itineraries.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="tours.html">Explore tours ${I.arrow}</a>
      <a class="btn btn-ghost" href="${PLAN}" target="_blank" rel="noopener">${I.wa} Plan my trip</a>
    </div>
    <p class="hero-langs">Guided in English &middot; French &middot; Spanish &middot; Portuguese</p>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <ul class="marquee-track">
    ${["Cape Peninsula Tour", "Winelands Tastings", "Big 5 Safari", "Airport Transfers", "Quad Biking", "Sand Boarding", "Chauffeur Service", "Garden Route", "Private Tours", "Group Tours", "Table Mountain", "Boulders Penguins"].concat(["Cape Peninsula Tour", "Winelands Tastings", "Big 5 Safari", "Airport Transfers", "Quad Biking", "Sand Boarding", "Chauffeur Service", "Garden Route", "Private Tours", "Group Tours", "Table Mountain", "Boulders Penguins"]).map((s) => `<li>${s}</li>`).join("")}
  </ul>
</div>

<section class="section-sm">
  <div class="wrap">
    <ul class="stats" data-reveal>
      <li class="stat"><b>4.9<span class="u">★</span></b><span>Google rating from 7 reviews</span></li>
      <li class="stat"><b>22<span class="u">+</span></b><span>Ways to explore the Cape</span></li>
      <li class="stat"><b>7</b><span>Days a week, 07:00&ndash;23:30</span></li>
      <li class="stat"><b>Local</b><span>Based in Cape Town</span></li>
    </ul>
  </div>
</section>

<section class="section" id="about">
  <div class="wrap">
    <div class="frow">
      <div class="frow-media" data-reveal><img src="assets/img/guides/private-tours.webp" alt="Guests on a private Cape Town tour with a Flexi Tours guide" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label">Your local trip planner</p>
        <h2 class="d-md">Why travellers choose Flexi Tours</h2>
        <p class="lead">Tell us when you're arriving, where you're staying and what you want to experience. We'll build the day for you.</p>
        <ul class="checks">
          <li>${I.hotel}<span><b>Hotel pickup.</b> We collect you directly from your Cape Town accommodation.</span></li>
          <li>${I.chat}<span><b>Easy WhatsApp booking.</b> No complicated booking forms.</span></li>
          <li>${I.van}<span><b>Comfortable vehicles.</b> Air-conditioned, with Wi-Fi, water and snacks on board. Book privately for your own driver and guide.</span></li>
          <li>${I.pin}<span><b>Local knowledge.</b> We know Cape Town beyond the tourist brochure.</span></li>
          <li>${I.globe}<span><b>Guides in your language.</b> Tours in English, French, Spanish and Portuguese.</span></li>
          <li>${I.calendar}<span><b>Flexible itineraries.</b> Change the pace and customise your day.</span></li>
          <li>${I.tag}<span><b>Clear guide prices.</b> See starting prices for our main tours and transfers before you enquire.</span></li>
        </ul>
        <p style="margin-top:var(--s-4)"><a class="tlink" href="about.html">More about Flexi Tours ${I.arrow}</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="tours">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div>
        <p class="label">Our tours</p>
        <h2 class="d-md">Cape Town's <span style="white-space:nowrap">must-do</span> experiences</h2>
        <p class="lead">Table Mountain, Cape Point, the Winelands, Big Five reserves and the Atlantis dunes — run privately for your group or shared with others.</p>
      </div>
      <a class="btn btn-ghost" href="tours.html">All tours &amp; itineraries</a>
    </div>
    <ul class="grid-tours">${TOURS.map(tourCard).join("\n")}</ul>
  </div>
</section>

${packagesSection()}

${adventureFeature()}

<section class="section" id="transfers">
  <div class="wrap">
    <div class="frow rev">
      <div class="frow-media" data-reveal><img src="assets/img/guides/airport-transfers.webp" alt="Private airport transfer vehicle waiting at Cape Town International Airport" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label label-blue">Transfers &amp; shuttles</p>
        <h2 class="d-md">Land, get in, go.</h2>
        <p class="lead">Airport to hotel, hotel to airport, and point-to-point transfers such as Cape Town to Stellenbosch or Franschhoek — with comfortable vehicles and professional drivers.</p>
        <ul class="checks">
          <li>${I.check}Bottle of water and free Wi-Fi on board</li>
          <li>${I.check}Air-conditioned vehicle, professional driver</li>
          <li>${I.check}Help loading and offloading your luggage</li>
        </ul>
        <div class="table-wrap" style="margin-top:var(--s-4)">
          <table class="ptable">
            <thead><tr><th scope="col">Group size</th><th scope="col">Price</th></tr></thead>
            <tbody>
              <tr><th scope="row">1 person</th><td>From R1,200</td></tr>
              <tr><th scope="row">2 persons</th><td>From R650 pp</td></tr>
              <tr><th scope="row">4 persons</th><td>From R400 pp</td></tr>
              <tr><th scope="row">6 persons</th><td>From R250 pp</td></tr>
            </tbody>
          </table>
        </div>
        <p class="small muted" style="margin-top:14px">Guide prices only. Final cost depends on dates, group size, bags and trips — <a class="tlink" style="min-height:0;display:inline" href="transfers.html">see the full rate table</a>.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">How it works</p><h2 class="d-md">Booking takes one message</h2>
      <p class="lead">No accounts, no forms to wrestle with. WhatsApp us and we'll build your itinerary.</p></div>
    </div>
    <ol class="steps">
      <li class="step" data-reveal><b>STEP 01</b><h3>Tell us about your trip</h3><p>Your dates, how many of you are travelling, where you're staying and what you'd like to see.</p></li>
      <li class="step" data-reveal data-delay="80"><b>STEP 02</b><h3>We build the day</h3><p>We suggest a route and pace that fits — private or shared, with the optional extras you want.</p></li>
      <li class="step" data-reveal data-delay="160"><b>STEP 03</b><h3>Get a personalised price</h3><p>A firm price for your group, including the vehicle, driver and everything agreed.</p></li>
      <li class="step" data-reveal data-delay="240"><b>STEP 04</b><h3>We collect you</h3><p>We pick you up at your hotel or accommodation and bring you back at the end of the day.</p></li>
    </ol>
    <div class="cta-actions" style="justify-content:flex-start;margin-top:var(--s-5)" data-reveal>
      <a class="btn btn-primary" href="${PLAN}" target="_blank" rel="noopener">${I.wa} Plan my trip</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Everything we do</p><h2 class="d-md">Tours, transfers and activities</h2></div></div>
    ${svcGrid()}
  </div>
</section>

<section class="section" id="reviews">
  <div class="wrap">
    <div class="sec-head" data-reveal><div><p class="label">Reviews</p><h2 class="d-md">What guests say</h2></div></div>
    <div class="rev-head" data-reveal>
      <div class="rev-score">
        <b>4.9</b>
        <div>${stars5}<p class="small muted" style="margin-top:4px">Rated 4.9 out of 5 · Based on 7 Google reviews</p></div>
      </div>
      <a class="btn btn-ghost btn-sm" href="https://www.google.com/search?q=Flexi+Tours+Cape+Town+reviews" target="_blank" rel="noopener">Read reviews on Google ${I.ext}</a>
    </div>

    <!-- Real Google reviews. To add another, append to the REVIEWS list
         in _build/build.mjs and re-run, or copy a <figure class="review">
         block below and edit the text, name and initials. -->
    <ul class="grid-rev">${REVIEWS.map(reviewCard).join("\n      ")}</ul>
  </div>
</section>

<section class="section" id="guides">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Travel guides</p><h2 class="d-md">Plan your trip properly</h2>
      <p class="lead">Practical local advice on timing, routes, weather and costs, so you can plan your days in the Cape with confidence.</p></div>
      <a class="btn btn-ghost" href="guides.html">All travel guides</a>
    </div>
    <ul class="grid-guides">${GUIDES.slice(0, 6).map(guideCard).join("\n")}</ul>
  </div>
</section>

${ctaBand()}

${contactCards()}`,
});

/* ---------- ARTICLE PAGES (one per travel guide) ---------- */
const readingTime = (html) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length / 200));

for (const a of ARTICLES) {
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  pages.push({
    file: guideHref(a.slug),
    title: `${a.title} | Flexi Tours`,
    desc: a.excerpt,
    og: a.img,
    articleLd: a,
    body: `<article class="post">
  <div class="wrap post-head">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a>${I.chev}<a href="guides.html">Travel Guides</a>${I.chev}<span>${a.title}</span>
    </nav>
    <h1>${a.title}</h1>
    <p class="post-meta">
      <time datetime="${a.isoDate}">${a.date}</time>
      <span class="dot" aria-hidden="true"></span>
      <span>${readingTime(a.content)} min read</span>
      <span class="dot" aria-hidden="true"></span>
      <span>Flexi Tours</span>
    </p>
    <figure class="post-hero">
      <img src="assets/img/guides/${a.img}" alt="${a.title}" width="1536" height="1024" fetchpriority="high">
    </figure>
  </div>

  <div class="wrap">
    <div class="prose">${a.content}</div>

    <div class="post-cta">
      <div>
        <h2>Planning your Cape Town trip?</h2>
        <p>Let Flexi Tours build your itinerary. Tell us your dates, group size and where you're staying.</p>
      </div>
      <a class="btn btn-primary" href="${waLink(`Hi Flexi Tours, I read your guide "${a.title}" and I'd like help planning my trip.\n\nDates:\nNumber of people:\nHotel/location:\nTours I'm interested in:`)}" target="_blank" rel="noopener">${I.wa} Plan my trip</a>
    </div>
  </div>
</article>

<section class="section">
  <div class="wrap">
    <div class="sec-head" data-reveal>
      <div><p class="label">Keep reading</p><h2 class="d-md">More travel guides</h2></div>
      <a class="btn btn-ghost" href="guides.html">All ${ARTICLES.length} guides</a>
    </div>
    <ul class="grid-guides">${related.map((r, i) => guideCard([r.slug, r.title, r.isoDate, r.date, r.img, r.excerpt], i)).join("\n")}</ul>
  </div>
</section>

${ctaBand("Ready to see it for yourself?")}`,
  });
}

/* ---------------- write ---------------- */
/* Pages in a subfolder (guides/) get "../" in front of every relative link,
   so the templates can keep writing paths as if every page sat at the root. */
const rebase = (html, base) => html
  .replace(/(\s(?:href|src)=")(?!https?:|mailto:|tel:|#|data:|\/)/g, `$1${base}`)
  .replace(/(<meta property="og:image" content=")(?!https?:)/, `$1${base}`);

for (const p of pages) {
  const depth = p.file.split("/").length - 1;
  if (depth) mkdirSync(join(ROOT, dirname(p.file)), { recursive: true });
  const html = shell(p);
  writeFileSync(join(ROOT, p.file), depth ? rebase(html, "../".repeat(depth)) : html, "utf8");
}
console.log("Pages written to the repo root:");
console.log("  core   : " + pages.filter((p) => !p.articleLd).map((p) => p.file).join(", "));
console.log("  guides : " + pages.filter((p) => p.articleLd).length + " article pages");
console.log("\nDone — " + pages.length + " pages.");
