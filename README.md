# Art & Artist — new website

Vite + React + TypeScript, animated with **Motion** (`motion/react`) and **Lenis** smooth scroll.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/ — deploy anywhere (Vercel, Netlify, Cloudflare Pages)
```

## Before you replace artandartist.co.in

1. **Waitlist form** — set `VITE_WAITLIST_ENDPOINT` (e.g. a Formspree / Google Apps Script URL that accepts a JSON `{ email }` POST) in a `.env` file. Without it the form only *pretends* to submit.
2. **Privacy Policy** — done: the full policy from the current site lives at `/privacypolicy` (same URL as today, with `#section-N` anchors). Edit it in `src/privacyData.ts`. Your host must serve `index.html` for unknown paths — `vercel.json` and `public/_redirects` (Netlify/Cloudflare) are included.
3. **Artwork** — tiles/cards are procedural SVG placeholders (`src/art.tsx`). Replace `<Art … />` with `<img src="/your-work.jpg" />` to use real images.
4. **Sample content** — the "Digital Atelier" cards (`FEED` in `src/Sections.tsx`) are illustrative; edit or remove them.
5. Add social links / contact details to the footer if wanted.

## Where things live

| File | What |
|---|---|
| `src/Hero.tsx` | Telescope-style scroll-scrubbed hero: floating tiles, mouse parallax, zoom-through |
| `src/Sections.tsx` | Nav, marquee, manifesto, horizontal story, tribe, process, atelier, join, footer |
| `src/ui.tsx` | Lenis, cursor, preloader, SplitText, Magnetic |
| `src/styles.css` | Design tokens (`:root`) and all styling |
