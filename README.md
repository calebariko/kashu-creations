# Kashu Creations — Landing Page

A dark, cinematic landing page for Kashu Creations (custom apparel printing & branding),
built with React + Vite + Tailwind CSS + Three.js (particle field) + GSAP (text animation) + vanilla-tilt.

## Requirements

- Node.js 18+
- npm or yarn

## Setup & Run

1. Extract the downloaded ZIP file (if you received one), or open this folder directly.
2. Open a terminal in this folder:
   ```bash
   cd kashu-creations
   ```
3. Install dependencies (only required once):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- **Internet connection required on first load** — Google Fonts / Fontshare and the Unsplash
  images are all loaded from external URLs, not bundled locally.
- **Hero background video**: the source URL in `Hero.jsx` (`VIDEO_SRC`) points to a third-party
  CloudFront link that may expire or be inaccessible outside its original account. There is a
  built-in fallback: if the video fails to load, a dark gradient background is shown instead so
  the hero never breaks. If you have your own background video, replace `VIDEO_SRC` in
  `src/components/Hero.jsx`.
- **Placeholder content** — the following sections use clearly-marked placeholder data you should
  replace with real information:
  - `src/components/Stats.jsx` — business stats (orders, turnaround time, etc.)
  - `src/components/Testimonials.jsx` — client quotes and names
  - `src/components/Pricing.jsx` — pricing tiers and prices
- **Colors** live as HSL CSS variables at the top of `src/index.css` (`:root`). The primary/accent
  is the sky-blue tone; background is near-black; text is off-white — matching Kashu Creations'
  black / white / sky-blue palette.
- Reduced-motion is respected — all animations are wrapped in
  `@media (prefers-reduced-motion: no-preference)`.
- On mobile (<768px): particle count drops to 300, tilt and scroll-parallax are disabled for
  performance.
