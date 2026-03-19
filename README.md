# H3vn Creative — Landing Page

Static landing page for H3vn Creative studio.

## Structure

```
├── index.html        — main page
├── styles/main.css   — all styles (includes embedded Instrument Serif font)
├── scripts/main.js   — ink ripple canvas animation
└── vercel.json       — Vercel static site config
```

## Fonts

- **Instrument Serif** — embedded as base64 in `styles/main.css` (no CDN dependency)
- **DM Sans** — loaded from Google Fonts at runtime

## Deploy to Vercel

```bash
vercel
```

Or connect this repo in the [Vercel dashboard](https://vercel.com/new) — no build step required.
