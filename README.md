# Resto Menu App

Sirf frontend React (Vite) app — restaurant/cafe menu website. URL restaurant ke naam (slug) ke hisaab se change hota hai, aur menu data ek JSON folder se aata hai.

## Chalane ke liye (local)

```bash
npm install
npm run dev
```

Ye `http://localhost:5173` par khulega.

- Home page (`/`) — sab restaurants ki list dikhata hai.
- Menu page (`/menu/spice-garden`, `/menu/cafe-mocha`) — us restaurant ka menu dikhata hai.

## Naya restaurant kaise add karein

1. `src/data/restaurants/` folder me ek nayi `.json` file banao. File ka naam hi URL ban jaayega.
   - Example: `src/data/restaurants/thalii.json` → menu khulega `/menu/thalii` par.
2. Neeche diye schema ke hisaab se JSON bharo (sample files `spice-garden.json` aur `cafe-mocha.json` dekho).
3. Bas — app khud reload hoke naya restaurant Home page pe aur uska route auto-add kar dega. Koi code change nahi karna.

### JSON schema

```json
{
  "name": "Restaurant Name",
  "tagline": "Short tagline",
  "location": "Area, City",
  "accent": "#C1502E",
  "currency": "₹",
  "categories": [
    {
      "name": "Starters",
      "items": [
        {
          "name": "Item Name",
          "description": "Short description",
          "price": 249,
          "veg": true,
          "spicy": 1,
          "tag": "Bestseller"
        }
      ]
    }
  ]
}
```

Notes:
- `accent` — us restaurant ka theme color (price, badges, top border sab isi color me).
- `veg` — `true`/`false`, veg/non-veg wala green/maroon square icon dikhane ke liye.
- `spicy` — 0, 1 ya 2 (mirchi icon count).
- `tag` — optional, "Bestseller" / "Chef's Special" / "New" jaisa stamp badge dikhane ke liye. Hata bhi sakte ho.

## Production build

```bash
npm run build
```

Ye `dist/` folder banayega — is folder ko kisi bhi static hosting (Netlify, Vercel, GitHub Pages, S3, Nginx) par daal do, site chal jaayegi. Kyunki ye client-side routing use karta hai (`/menu/:slug`), hosting par ek "rewrite all routes to index.html" rule zaroor set karna (Netlify/Vercel me ye by default handle ho jaata hai; Nginx me `try_files $uri /index.html;` add karo).

## Tech

- React 18 + Vite
- react-router-dom (dynamic route `/menu/:slug`)
- Plain CSS, Google Fonts (Fraunces + Inter + JetBrains Mono) — koi UI library nahi
# resturent-veerexa
