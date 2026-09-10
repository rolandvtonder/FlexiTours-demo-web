# Flexi Tours — website

A static site (plain HTML, CSS and JavaScript). No build step, no dependencies,
no server-side code. Upload the contents of `site/` to any web host and it works.

**28 pages** — 6 main pages plus 22 travel guide articles.

---

## Before you go live

Everything is wired up: the six real Google reviews are in, the Facebook and
Instagram links point at your actual profiles, and all 22 travel guides now live
on this site rather than the old one.

The contact details in use are the ones you confirmed:

- Phone **021 204 1918** · WhatsApp **078 047 4236** · **bookings@flexi-tours.co.za**
- Cape Town: Unit 21, Hangar 17, 17th Road, Maitland
- Centurion: Unit C6, Edward Park, 124 Edward Avenue, Hennopspark
- Entity: **Flexi Tours (Pty) Ltd**

Your old site had conflicting versions of the phone number, the Cape Town address
and the company name. These are the ones you picked — worth a final check that
they match your Google listing.

One loose end: Google shows **7 reviews** but only **6** were in the screenshots,
so the site shows six. If you find the seventh, add it (see below).

---

## Files

```
site/                        ← this is what you upload
  index.html                 Home
  tours.html                 6 tours with full itineraries + guide prices
  transfers.html             Transfer rates, inclusions, why-use-us
  about.html                 Story, what you get, branches, hours
  guides.html                Index of all 22 travel guides
  contact.html               Contact details, branches, hours
  guide-<slug>.html          22 article pages, one per travel guide
  assets/
    css/styles.css           All styling. Design tokens at the top.
    js/main.js               Nav, mobile menu, scroll animations
    img/logo.png             Your logo
    img/guides/*.webp        22 photos at 1536x1024
    img/tours/*              Original tour photos from the old site (600px)

_build/build.mjs             Optional generator — see below
_build/articles.json         Full text of the 22 travel guides
README.md                    This file
```

### Editing

For small changes (wording, prices, a phone number) just edit the HTML directly.

The catch: the navigation and footer are repeated in all 28 pages, so changing a
menu item by hand means editing 28 files. `_build/build.mjs` exists to avoid that
— edit the shared part once there, then run:

```bash
node _build/build.mjs
```

That regenerates every page. It needs Node.js but **only when you run it** — the
site itself never needs it.

### Adding a review

Open `_build/build.mjs`, find the `REVIEWS` list near the top, and add an entry:

```js
{ name: "Their Name", meta: "3 reviews", stars: 5, when: "2 months ago",
  text: "What they actually wrote." },
```

Then re-run the build. Only paste text guests actually wrote — never invent one.

### Adding a travel guide

Add an entry to `_build/articles.json` (`slug`, `title`, `excerpt`, `date`,
`isoDate`, `img`, `content` as HTML), drop the image into
`site/assets/img/guides/`, and re-run the build. A new page, a card on
`guides.html`, and the related-article links are all generated for you.

### Preview locally

```bash
npx serve site
```

---

## Design

Built to echo the Vita Travel reference layout, using your own brand colours
taken directly from `logo.png`:

| Token | Value | Use |
|---|---|---|
| `--brand` | `#FF7F00` | Primary accent, buttons, prices |
| `--blue` | `#0072E4` | Secondary accent |
| `--blue-lt` | `#4DA3F5` | Blue text on dark (readable contrast) |
| `--ink-900` | `#08161C` | Page background |
| `--ink-800` | `#0B1F27` | Cards |
| `--ink-700` | `#102C36` | Raised surfaces |

Type is **Inter Tight** for headings and **Inter** for body, loaded from Google
Fonts. Spacing runs on an 8px scale (`--s-1` … `--s-8`). All of these are CSS
variables at the top of `styles.css` — change one value there and it updates
everywhere.

Enquiries go to WhatsApp with a pre-filled message, or to email. There is no
booking form and no backend, so nothing can break and there is nothing to maintain.

---

## Checks already done

Across all 28 pages:

- No broken internal links or missing images (1,080 references verified)
- No links pointing back to the old site
- Every image has alt text and width/height set (no layout shift)
- Text contrast passes WCAG AA — zero failures
- Tap targets are at least 44px, except links inside sentences (which are exempt)
- One `<h1>` per page, no skipped heading levels
- Keyboard accessible: skip link, focus rings, mobile menu traps focus and closes on Escape
- Respects "reduce motion" system settings
- No horizontal scrolling at 375px
- All external links use `rel="noopener"`
- Structured data: schema.org `TravelAgency` sitewide (4.9 rating, opening hours,
  both branches) plus `BlogPosting` on every travel guide

## Worth knowing

- The travel guides were migrated in full from the blog service the old site used.
  The 52 links inside those articles that pointed at old pages (`product-toursx.html`
  and friends) now point at the matching sections of the new `tours.html` and
  `transfers.html`.
- The old site's tour photos are only 600px wide, so the larger images throughout
  use your 1536px guide photos instead. If you have original high-resolution photos
  of your own tours and vehicles, they would be a straight swap and the single
  biggest further improvement to the site.
- When you switch the domain over, the old `?post=...` article URLs will stop
  working. If any of them are ranking in Google, set up redirects to the matching
  `guide-<slug>.html` page — the slugs are unchanged, so it is a mechanical mapping.
