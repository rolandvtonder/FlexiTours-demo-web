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
const guideHref = (slug) => `guide-${slug}.html`;

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
const INSTAGRAM = "https://www.instagram.com/flexi.tours/";

/* ---------------- shared bits ---------------- */
const WA = "https://wa.me/27780474236";
const waLink = (msg) => `${WA}?text=${encodeURIComponent(msg)}`;

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
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>`,
};

const stars5 = `<span class="stars" aria-hidden="true">${I.star.repeat(5)}</span>`;

const NAV = [
  ["index.html", "Home"],
  ["tours.html", "Tours"],
  ["transfers.html", "Transfers"],
  ["about.html", "About"],
  ["guides.html", "Travel Guides"],
  ["contact.html", "Contact"],
];

const topbar = () => `<div class="topbar">
  <div class="wrap">
    <a href="mailto:bookings@flexi-tours.co.za">${I.mail} bookings@flexi-tours.co.za</a>
    <span class="sep" aria-hidden="true">·</span>
    <a href="${WA}" target="_blank" rel="noopener">${I.wa} WhatsApp 078 047 4236</a>
    <span class="sep" aria-hidden="true">·</span>
    <a href="tel:+27212041918">${I.phone} 021 204 1918</a>
  </div>
</div>`;

/* An article page highlights "Travel Guides" in the nav. */
const navKey = (file) => (file.startsWith("guide-") ? "guides.html" : file);

const header = (rawPage) => ((page) => `<header class="nav">
  <div class="wrap">
    <div class="nav-inner">
      <a class="nav-logo" href="index.html" aria-label="Flexi Tours — home">
        <img src="assets/img/logo.png" alt="Flexi Tours" width="2867" height="330">
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${NAV.map(([h, t]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ""}>${t}</a>`).join("\n        ")}
      </nav>
      <a class="btn btn-primary btn-sm nav-cta" href="${waLink("Hi Flexi Tours, I'd like to request a quote.")}" target="_blank" rel="noopener">${I.wa} Get a quote</a>
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
    <a class="btn btn-primary btn-block" href="${waLink("Hi Flexi Tours, I'd like to request a quote.")}" target="_blank" rel="noopener">Chat on WhatsApp</a>
    <a class="btn btn-ghost btn-block" href="tel:+27212041918">Call 021 204 1918</a>
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
          <li><a href="${WA}" target="_blank" rel="noopener">WhatsApp 078 047 4236</a></li>
          <li><a href="tel:+27212041918">021 204 1918</a></li>
          <li><a href="mailto:bookings@flexi-tours.co.za">bookings@flexi-tours.co.za</a></li>
        </ul>
        <p class="small muted" style="margin-top:10px">Open 7 days · 07:00&ndash;23:30</p>
      </div>
      <div>
        <h3>Branches</h3>
        <address><b>Cape Town</b>Unit 21, Hangar 17,<br>17th Road, Maitland</address>
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

<a class="fab" href="${waLink("Hi Flexi Tours, I'd like to request a quote.")}" target="_blank" rel="noopener">${I.wa}<span>WhatsApp us</span></a>`;

const LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Flexi Tours (Pty) Ltd",
  url: "https://www.flexi-tours.co.za/",
  logo: "https://www.flexi-tours.co.za/images/logo.png",
  email: "bookings@flexi-tours.co.za",
  telephone: "+27212041918",
  priceRange: "R250 - R2500",
  areaServed: ["Cape Town", "Stellenbosch", "Franschhoek", "Paarl", "Constantia", "Durbanville", "Garden Route", "Western Cape"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "7" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00", closes: "23:30",
  },
  address: [
    { "@type": "PostalAddress", streetAddress: "Unit 21, Hangar 17, 17th Road, Maitland", addressLocality: "Cape Town", addressRegion: "Western Cape", addressCountry: "ZA" },
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
  mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.flexi-tours.co.za/guide-${a.slug}.html` },
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
const phead = ({ img, alt, label, h1, lead, crumb }) => `<section class="phead">
  <div class="phead-media"><img src="assets/img/guides/${img}" alt="${alt}" width="1536" height="1024" fetchpriority="high"></div>
  <div class="wrap phead-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>${I.chev}<span>${crumb}</span></nav>
    <p class="label" style="margin-top:var(--s-3)">${label}</p>
    <h1 class="d-lg">${h1}</h1>
    <p class="lead">${lead}</p>
  </div>
</section>`;

const ctaBand = (heading = "Tell us your dates.<br>We will handle the rest.") => `<section class="section-sm">
  <div class="wrap">
    <div class="cta" data-reveal>
      <p class="label" style="justify-content:center">Get started</p>
      <h2 class="d-lg">${heading}</h2>
      <p class="lead">Open seven days a week, 07:00 to 23:30. Most quotes come back the same day.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="${waLink("Hi Flexi Tours, I'd like to request a quote.")}" target="_blank" rel="noopener">${I.wa} WhatsApp us</a>
        <a class="btn btn-ghost" href="mailto:bookings@flexi-tours.co.za?subject=Tour%20enquiry">Email bookings</a>
      </div>
    </div>
  </div>
</section>`;

const contactCards = (heading) => `<section class="section-sm">
  <div class="wrap">
    ${heading ? `<div class="sec-head" data-reveal><div><p class="label">Reach us</p><h2 class="d-md">${heading}</h2></div></div>` : ""}
    <ul class="grid-contact">
      <li><a class="ccard" href="${WA}" target="_blank" rel="noopener" data-reveal>
        <span class="ccard-ico">${I.wa}</span><h3>WhatsApp</h3><p><strong>078 047 4236</strong><br>Fastest way to reach us</p></a></li>
      <li><a class="ccard" href="mailto:bookings@flexi-tours.co.za" data-reveal data-delay="70">
        <span class="ccard-ico b">${I.mail}</span><h3>Email</h3><p><strong>bookings@<wbr>flexi-tours.co.za</strong><br>For quotes and itineraries</p></a></li>
      <li><a class="ccard" href="tel:+27212041918" data-reveal data-delay="140">
        <span class="ccard-ico">${I.phone}</span><h3>Phone</h3><p><strong>021 204 1918</strong><br>Mon&ndash;Sun, 07:00&ndash;23:30</p></a></li>
      <li><div class="ccard" data-reveal data-delay="210">
        <span class="ccard-ico b">${I.pin}</span><h3>Branches</h3><p><strong>Cape Town</strong> &middot; Maitland<br><strong>Centurion</strong> &middot; Hennopspark</p></div></li>
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
    chips: [[I.clock, "Full day"], [I.hotel, "Hotel pickup"]],
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
    chips: [[I.clock, "Full day"], [I.pin, "3 towns"]],
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
    chips: [[I.clock, "Full day"], [I.check, "Most popular"]],
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
    chips: [[I.clock, "1 hr quad biking"], [I.bolt, "Sand boarding"]],
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
    chips: [[I.clock, "2–3 hr game drive"], [I.check, "Buffet lunch"]],
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
    chips: [[I.clock, "45 min from CBD"], [I.check, "Extra activities"]],
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
    <p>${t.blurb.length > 190 ? t.blurb.slice(0, 187).trim() + "…" : t.blurb}</p>
    <ul class="card-meta">${t.chips.map(([ic, tx]) => `<li class="chip">${ic}${tx}</li>`).join("")}</ul>
  </div>
  <div class="card-foot">
    <a class="btn btn-primary btn-sm" href="tours.html#${t.id}">Itinerary</a>
    <a class="btn btn-ghost btn-sm" href="${waLink(`Hi Flexi Tours, I'd like a quote for the ${t.name}.`)}" target="_blank" rel="noopener">Enquire</a>
  </div>
</li>`;

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
  desc: "Full itineraries and guide prices for our Cape Peninsula, Winelands, Best of Cape Town, West Coast Adventure and Big 5 / Big 4 safari tours from Cape Town.",
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
      <p class="lead">Each one runs privately for your group, or shared with others if you would rather keep the cost down.</p></div>
    </div>
    <ul class="grid-tours">${TOURS.map(tourCard).join("\n")}</ul>
  </div>
</section>

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
          <a class="btn btn-primary" href="${waLink(`Hi Flexi Tours, I'd like a quote for the ${t.name}.`)}" target="_blank" rel="noopener">${I.wa} Enquire on WhatsApp</a>
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
      <li class="stat"><b>24<span class="u">/7</span></b><span>Flight-time pickups arranged</span></li>
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
      <div><p class="label">Why use us</p><h2 class="d-md">Six reasons people rebook</h2></div>
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
  desc: "Flexi Tours (Pty) Ltd runs tours, activities, transfers and adventures across Cape Town and the Western Cape, with branches in Maitland and Centurion. Rated 4.9 on Google.",
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
      <li><div class="ccard" data-reveal><span class="ccard-ico">${I.pin}</span><h3>Cape Town</h3><p>Unit 21, Hangar 17,<br>17th Road, Maitland,<br>Cape Town</p></div></li>
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
  desc: "Practical local advice on Cape Town tours, safaris, the Winelands, Table Mountain, Chapman's Peak, airport transfers and the Garden Route — written by the people who drive them.",
  og: "chapmans-peak.webp",
  body: `${phead({
    img: "garden-route.webp",
    alt: "Scenic Garden Route coastline in South Africa",
    label: "Travel guides",
    h1: "Plan your trip properly",
    lead: "Practical local advice on timing, routes, weather and what things actually cost — written by the people who drive them every week.",
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
  desc: "Get in touch with Flexi Tours for Cape Town tours, safaris, winelands tastings and airport transfers. WhatsApp 078 047 4236, call 021 204 1918 or email bookings@flexi-tours.co.za.",
  og: "cape-point.webp",
  body: `${phead({
    img: "boulders-penguins.webp",
    alt: "African penguins at Boulders Beach near Simon's Town",
    label: "Contact",
    h1: "Get in touch with us",
    lead: "Tell us your dates, your group size and where you are staying. We will come back with a route and a firm price — usually the same day.",
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
          <a class="btn btn-primary" href="${waLink("Hi Flexi Tours, I'd like to request a quote.\n\nDates:\nNumber of people:\nHotel / pick-up address:\nTour or transfer:")}" target="_blank" rel="noopener">${I.wa} Start on WhatsApp</a>
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
      <li><div class="ccard" data-reveal><span class="ccard-ico">${I.pin}</span><h3>Cape Town branch</h3><p>Unit 21, Hangar 17,<br>17th Road, Maitland,<br>Cape Town, Western Cape</p></div></li>
      <li><div class="ccard" data-reveal data-delay="70"><span class="ccard-ico b">${I.pin}</span><h3>Centurion branch</h3><p>Unit C6, Edward Park,<br>124 Edward Avenue,<br>Hennopspark, Centurion</p></div></li>
      <li><div class="ccard" data-reveal data-delay="140"><span class="ccard-ico">${I.clock}</span><h3>Opening hours</h3><p><strong>Monday&ndash;Sunday</strong><br>07:00&ndash;23:30<br>Seven days a week</p></div></li>
      <li><a class="ccard" href="https://www.google.com/search?q=Flexi+Tours+Cape+Town+reviews" target="_blank" rel="noopener" data-reveal data-delay="210"><span class="ccard-ico b">${I.star}</span><h3>Reviews</h3><p><strong>4.9 out of 5</strong><br>From 7 Google reviews ${I.ext}</p></a></li>
    </ul>
  </div>
</section>

${ctaBand("We are open seven days a week.")}`,
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
  desc: "Private and shared day tours, safaris, winelands tastings and airport transfers across Cape Town, the Winelands and the Garden Route. Rated 4.9 on Google. Book on WhatsApp.",
  og: "chapmans-peak.webp",
  body: `<section class="hero">
  <div class="hero-media">
    <img src="assets/img/guides/chapmans-peak.webp" alt="Chapman's Peak Drive winding along the Atlantic coastline near Cape Town" width="1536" height="1024" fetchpriority="high">
  </div>
  <div class="wrap hero-inner">
    <h1 class="d-xl">Cape&nbsp;Town<br><span class="thin">on your terms</span></h1>
    <p class="lead">Private and shared tours, safaris, winelands tastings and airport transfers — built around your dates, your group and your pace.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="tours.html">Explore our tours ${I.arrow}</a>
      <a class="btn btn-ghost" href="${waLink("Hi Flexi Tours, I'd like to request a quote.")}" target="_blank" rel="noopener">Request a quote</a>
    </div>
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
      <li class="stat"><b>22<span class="u">+</span></b><span>Tours, transfers &amp; activities</span></li>
      <li class="stat"><b>7</b><span>Days a week, 07:00&ndash;23:30</span></li>
      <li class="stat"><b>2</b><span>Branches: Cape Town &amp; Centurion</span></li>
    </ul>
  </div>
</section>

<section class="section" id="about">
  <div class="wrap">
    <div class="frow">
      <div class="frow-media" data-reveal><img src="assets/img/guides/private-tours.webp" alt="Guests on a private Cape Town tour with a Flexi Tours guide" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label">Why use us</p>
        <h2 class="d-md">Not just a drive. A day you will actually remember.</h2>
        <p class="lead">Welcome to the breathtaking city of Cape Town, where natural wonders and wildlife encounters await at every turn. We handle the routes, the timing and the vehicle — so you spend the day looking out of the window, not at a map.</p>
        <ul class="checks">
          <li>${I.check}Several years of experience in the events, tours and adventures industry.</li>
          <li>${I.check}Flexible tour options, from fully private tours to shared group tours.</li>
          <li>${I.check}Reliable, safe and comfortable vehicles on every tour, for your peace of mind.</li>
          <li>${I.check}We service all types of clients, including local and international visitors.</li>
          <li>${I.check}Wi-Fi on board, snacks, water and guides with deep local knowledge.</li>
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
        <h2 class="d-md">Cape Town tours &amp; experiences</h2>
        <p class="lead">Table Mountain, Cape Point, the Winelands, Big Five reserves and the Atlantis dunes — run privately for your group or shared with others.</p>
      </div>
      <a class="btn btn-ghost" href="tours.html">All tours &amp; itineraries</a>
    </div>
    <ul class="grid-tours">${TOURS.map(tourCard).join("\n")}</ul>
  </div>
</section>

<section class="section" id="transfers">
  <div class="wrap">
    <div class="frow rev">
      <div class="frow-media" data-reveal><img src="assets/img/guides/airport-transfers.webp" alt="Private airport transfer vehicle waiting at Cape Town International Airport" width="1536" height="1024" loading="lazy"></div>
      <div class="frow-body" data-reveal data-delay="90">
        <p class="label label-blue">Transfers &amp; shuttles</p>
        <h2 class="d-md">Land, get in, go.</h2>
        <p class="lead">Private transfers and shuttle services in and around Cape Town — airport transfers, point-to-point transfers and customised runs, with comfortable vehicles and professional drivers.</p>
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
      <p class="lead">No accounts, no forms to wrestle with. Tell us what you want and we will put together a formal quote.</p></div>
    </div>
    <ol class="steps">
      <li class="step" data-reveal><b>STEP 01</b><h3>Tell us your dates</h3><p>Message us on WhatsApp or email with your dates, group size and where you are staying.</p></li>
      <li class="step" data-reveal data-delay="80"><b>STEP 02</b><h3>We build the day</h3><p>We suggest a route and pace that fits — private or shared, with the optional extras you want.</p></li>
      <li class="step" data-reveal data-delay="160"><b>STEP 03</b><h3>Get a formal quote</h3><p>A firm price for your group, including vehicle, driver and everything agreed. No surprises.</p></li>
      <li class="step" data-reveal data-delay="240"><b>STEP 04</b><h3>We collect you</h3><p>We pick you up at your hotel or accommodation and bring you back at the end of the day.</p></li>
    </ol>
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
      <p class="lead">Practical local advice on timing, routes, weather and what things actually cost — written by the people who drive them every week.</p></div>
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
        <h2>Planning this trip?</h2>
        <p>Tell us your dates and we will put a day together for you.</p>
      </div>
      <a class="btn btn-primary" href="${waLink(`Hi Flexi Tours, I read your guide "${a.title}" and would like a quote.`)}" target="_blank" rel="noopener">${I.wa} Get a quote</a>
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
for (const p of pages) {
  writeFileSync(join(ROOT, p.file), shell(p), "utf8");
}
console.log("Pages written to the repo root:");
console.log("  core   : " + pages.filter((p) => !p.articleLd).map((p) => p.file).join(", "));
console.log("  guides : " + pages.filter((p) => p.articleLd).length + " article pages");
console.log("\nDone — " + pages.length + " pages.");
