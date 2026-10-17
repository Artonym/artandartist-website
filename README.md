# Art & Artist — new website

Vite + React + TypeScript, animated with **Motion** (`motion/react`) and **Lenis** smooth scroll.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/ — deploy anywhere (Vercel, Netlify, Cloudflare Pages)
```

## Before you replace artandartist.co.in

1. **Waitlist form** — set `VITE_WAITLIST_ENDPOINT` (e.g. a Formspree / Google Apps Script URL that accepts a JSON `{ email }` POST) in a `.env` file. Without it the form only *pretends* to submit.
2. **Privacy Policy and Terms & Conditions** — both live in `src/legal.ts` (source: your 12 October 2026 PDF), at `/privacypolicy` and `/terms`. The Grievance Officer's name, registered address and support email are set once in `GRIEVANCE` at the top of that file and used in both documents. Your host must serve `index.html` for unknown paths — `vercel.json` and `public/_redirects` (Netlify/Cloudflare) are included.
3. **Photos** — the site uses real photographs from Unsplash (free licence), loaded from Unsplash's CDN. They're defined in one place, `src/photos.ts`. To use your own artists' work, change an entry's `id` to a path such as `/artists/anika.jpg` (put the file in `public/artists/`). For production you may prefer to self-host them.
4. **Sample content** — the "Digital Atelier" cards (`FEED` in `src/Sections.tsx`) are illustrative; edit or remove them.
5. Add social links / contact details to the footer if wanted.

## Where things live

| File | What |
|---|---|
| `src/Hero.tsx` | Telescope-style scroll-scrubbed hero: floating tiles, mouse parallax, zoom-through |
| `src/Sections.tsx` | Nav, marquee, manifesto, horizontal story, tribe, process, atelier, join, footer |
| `src/ui.tsx` | Lenis, cursor, preloader, SplitText, Magnetic |
| `src/styles.css` | Design tokens (`:root`) and all styling |
