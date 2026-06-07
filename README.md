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
| `VITE_GOOGLE_MAPS_API_KEY` | Static map image + JS API (enable **Maps Static API** and **Maps JavaScript API** in Google Cloud). |
| `VITE_GOOGLE_MAP_ID` | Map ID for vector maps / `AdvancedMarker` (demo value `DEMO_MAP_ID` works for quick tests). |
| `VITE_FORM_BACKEND` | `netlify` or `formspree` (leave empty to show configuration hints instead of posting). |
| `VITE_FORMSPREE_FORM_ID` | Formspree form id when using `formspree`. |

## Forms

- **Netlify:** set `VITE_FORM_BACKEND=netlify`, deploy to Netlify, and register a form named `contact` (this app already sends `form-name=contact` and honeypot fields).
- **Formspree:** set `VITE_FORM_BACKEND=formspree` and `VITE_FORMSPREE_FORM_ID` to the id from your Formspree dashboard URL (`https://formspree.io/f/<id>`).

## Maps

- The **Contact** page shows a static preview (`<img>` from the Static Maps API) linking to Google Maps.
- **Live map** loads a separate JS chunk only after **Show live map** is clicked **and** the map block has entered the viewport (intersection + `React.lazy` / `Suspense`).

## Cursor rules

Repository-level guidance for this stack lives in [`.cursor/rules/static-web-architecture.mdc`](../.cursor/rules/static-web-architecture.mdc) (workspace root).
