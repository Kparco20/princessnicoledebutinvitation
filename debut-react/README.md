# Debut Invitation — React + Tailwind

This is a Vite + React port of the original `debut.html`.

Quick setup:

1. Copy the original image into the new project's public folder:
   - Copy `debut/assets/image.png` → `debut-react/public/assets/image.png`

2. Install dependencies:
   - npm install

3. Run dev server:
   - npm run dev

Notes:
- Tailwind is already configured in `tailwind.config.cjs` and `postcss.config.cjs`.
- The invitation components live in `src/components/Invitation.jsx` and the app root is `src/App.jsx`.
- Event participant data is now in `src/data/events.js` — edit this file to add/remove participants or events without changing components.
- The original SDK bindings are left as a small placeholder in `Invitation.jsx`'s `useEffect`.

If you want, I can:
- finish moving every single CSS rule from the original into `src/index.css` (done partially),
- wire up the original `elementSdk` integration fully,
- add more visual parity (sparkles, full typographic tweaks), or
- run `npm install` and `npm run dev` for you in the terminal if you want me to proceed.
