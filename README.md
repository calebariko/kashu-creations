# Kashu Creations — Landing Page

A dark, cinematic landing page for **Kashu Creations**, a Nairobi-based creative
branding and customisation studio specialising in apparel branding, vinyl and
DTF printing, logo creation, and marketing merchandise.

Built as a single-page React site with a Three.js particle field, GSAP-driven
text effects, and scroll parallax — designed to feel premium while keeping
every enquiry one tap away on WhatsApp.

## Tech Stack

- **React 18** + **Vite** (plain JavaScript, no TypeScript)
- **Tailwind CSS** for styling
- **Three.js** — raw WebGL particle field in the hero
- **GSAP** — glitch, scramble, split-reveal, and typewriter text effects
- **vanilla-tilt** — 3D tilt-on-hover for cards

## Features

- Fully responsive layout, from mobile through desktop
- Off-canvas slide-in navigation drawer on mobile/tablet, with a "Work"
  link that opens a "coming soon" modal until a portfolio section exists
- Every call-to-action (Call Us, Start Your Order, Order, Custom Order)
  opens WhatsApp with a pre-filled, context-specific message
- Pricing section pulls real per-service photos automatically from
  `src/images` — see [Adding pricing photos](#adding-pricing-photos) below
- Privacy Policy, Terms & Conditions, and Returns Policy shown as in-page
  modals rather than separate pages
- Scroll parallax, particle field, and tilt effects all respect
  `prefers-reduced-motion` and scale down on mobile for performance
- Custom-styled scrollbar matching the site's colour palette

## Requirements

- Node.js 18+
- npm or yarn

## Setup & Run

```bash
cd kashu-creations
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       One component per section (Hero, Features, Pricing, ...)
├── hooks/            Shared hooks (useParallax, useTilt, useBodyScrollLock, ...)
├── lib/
│   └── whatsapp.js   Single source of truth for the WhatsApp number/links
├── images/           Drop-in photos for the Pricing section (see below)
└── index.css         Design tokens, keyframes, and global styles
```

## Configuration

**WhatsApp number** — set once in `src/lib/whatsapp.js`. Every CTA on the site
imports its link from here, so updating the number in this one file updates
every button across the site.

**Colours** — defined as HSL CSS variables at the top of `src/index.css`
(`:root`). Primary/accent is the sky-blue tone; background is near-black;
text is off-white, matching Kashu Creations' black / white / sky-blue
palette.

### Adding pricing photos

The Pricing section automatically picks up any image placed in `src/images`
whose filename (ignoring extension) matches one of the expected service
slugs — any of `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif` works, and any
photo size or aspect ratio is fine (each is auto-cropped to fit its card).
See `src/images/README.md` for the exact filenames expected. A card shows a
plain placeholder until its matching photo is added — nothing breaks in the
meantime.

## Notes

- An internet connection is required on first load — fonts (Fontshare,
  Google Fonts) are loaded from external URLs rather than bundled locally.
- The hero background video (`VIDEO_SRC` in `src/components/Hero.jsx`)
  points to a third-party hosted file. If it fails to load, a dark gradient
  background is shown automatically as a fallback.
