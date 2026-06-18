# hot-web

Hotel-themed demo (**The Scarlet Grand**): **flat white** / **flat black** (`#000`) canvas, **red** primary and **emerald** accents. The site is a **single scrolling landing page** with sections `home`, `menu`, `about`, `specials`, `reviews`, and `contact`; the header uses **in-page anchor navigation** with scroll-spy active states. Legacy paths **`/menu`** and **`/contact`** redirect to `/#menu` and `/#contact`. Theme: `hotel-theme` in `localStorage`. Static-first maps, Netlify/Formspree-ready form in `#contact`.

## Theme

- Use the **sun / moon** control in the header to switch themes. Choice is saved for the next visit.
- A small inline script in [`index.html`](index.html) applies the saved class before paint to reduce flash.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Environment

Copy [`.env.example`](.env.example) to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `VITE_GOOGLE_MAPS_API_KEY` | Optional — only if you add custom Maps JS features later. Contact map uses a Google embed iframe and works without it. |
| `VITE_GOOGLE_MAP_ID` | Map ID for vector maps / `AdvancedMarker` (demo value `DEMO_MAP_ID` works for quick tests). |
| `VITE_FORM_BACKEND` | `netlify` or `formspree` (leave empty to show configuration hints instead of posting). |
| `VITE_FORMSPREE_FORM_ID` | Formspree form id when using `formspree`. |

## Forms

- **Netlify:** set `VITE_FORM_BACKEND=netlify`, deploy to Netlify, and register a form named `contact` (this app already sends `form-name=contact` and honeypot fields).
- **Formspree:** set `VITE_FORM_BACKEND=formspree` and `VITE_FORMSPREE_FORM_ID` to the id from your Formspree dashboard URL (`https://formspree.io/f/<id>`).

## Maps

- The **Contact** section embeds Google Maps in an iframe (no API key required for hosting).
- **Get directions** opens the venue in Google Maps in a new tab.

## Netlify deploy

[`netlify.toml`](netlify.toml) sets `npm run build`, publish `dist`, and SPA redirects.

1. Connect the repo on [Netlify](https://app.netlify.com) (or push to the linked Git branch).
2. **Site configuration → Environment variables** — set `VITE_FORM_BACKEND=netlify` for contact submissions (optional).
3. Remove `VITE_GOOGLE_MAPS_API_KEY` if present — the contact map does not need it.
4. Deploy. Check **Forms** in the Netlify dashboard for submissions named `contact`.

Live example: [hotwebb.netlify.app](https://hotwebb.netlify.app/)

## Cursor rules

Repository-level guidance for this stack lives in [`.cursor/rules/static-web-architecture.mdc`](../.cursor/rules/static-web-architecture.mdc) (workspace root).
