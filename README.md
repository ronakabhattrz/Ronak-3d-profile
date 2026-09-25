# 3D Modern Portfolio

Personal portfolio site for **Ronak Bhatt** — full-stack developer (Ruby on Rails, JavaScript, React, Next.js). Built with **Next.js** (Pages Router), **Framer Motion**, **Tailwind CSS**, and light **react-tsparticles** on the home hero (desktop).

Live site: [ronakbhatt.in](https://www.ronakbhatt.in/)

---

## Features

- **Home** — Hero copy, optional tablet avatar, “My projects” CTA, desktop explosion background + particles (`xl+`).
- **About** — Bio, stats, credentials / timeline panel.
- **Services** — Service slider and client highlights.
- **Work** — [Upwork](https://www.upwork.com/) project catalog (from `data/upworkCatalog.js`) and **Major projects** carousel (`WorkSlider`).
- **Blog** — Posts pulled from **Medium RSS** at build/ISR time (`lib/mediumFeed.js`), with thumbnails and excerpts; full articles open on Medium.
- **Testimonials** — Swiper-based slider.
- **Contact** — Form via [Formspree](https://formspree.io/) (endpoint id in `lib/site.js`).
- **SEO & link previews** — Per-route titles, descriptions, and **canonical URLs** via **`lib/seo.js`** and **`components/Layout.jsx`** (uses `useRouter().pathname`). **Open Graph** and **Twitter/X** cards include `og:image` dimensions, alt text, `og:site_name`, `og:locale`, and `twitter:site` / `twitter:creator`. **JSON-LD** for `Person` and `WebSite` in `lib/site.js`. **`pages/_document.jsx`** sets `lang="en-CA"`, favicon, and Apple touch icon. Default share image: **`/public/preview.png`** (ideally 1200×630); dimensions are declared in `lib/seo.js`.
- **Analytics** — [Vercel Web Analytics](https://vercel.com/docs/analytics) is wired per **[Vercel Web Analytics — Get Started](#vercel-web-analytics--get-started)** below. Google Analytics 4 and Hotjar are still in `lib/site.js` / `_app.jsx`.

---

## Tech stack

| Area        | Choice                                      |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 15 (Pages Router)                   |
| UI          | React 18, Tailwind CSS                      |
| Motion      | Framer Motion                               |
| Content     | Medium RSS (`rss-parser`)                   |
| Carousels   | Swiper                                      |
| Particles   | react-tsparticles                           |
| Fonts       | Sora (via `next/font` in `Layout.jsx`)      |

---

## Getting started

**Requirements:** Node.js 18+ (LTS recommended), npm or yarn.

```bash
git clone <your-repo-url>
cd 3d-modern-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Development server                   |
| `npm run dev:fresh`| Clears `.next` then runs dev         |
| `npm run build`    | Production build                     |
| `npm run start`    | Serve production build               |
| `npm run lint`     | ESLint (Next.js config)              |
| `npm run clean`    | Remove `.next` cache                 |

---

## Configuration

### `lib/site.js`

- `SITE_URL` (canonical base for absolute links and OG image URLs)  
- Default home **title / description / keywords** (also used as fallbacks)  
- `mediumUrl`, `mediumFeedUrl` (blog RSS)  
- `formspreeId` (contact form)  
- `resumeUrl`, `ogImage` (default share image URL; file under `/public`)  
- `gaId`, Hotjar `hjid` / `hjsv`  
- **`personJsonLd`** and **`websiteJsonLd`** for structured data  

### `lib/seo.js`

- **`pageSeo`** — per-pathname entries (`/`, `/about`, `/work`, `/blog`, etc.) for **title**, **description**, **keywords**, and **OG image alt** text.  
- **`getSeoForPath(pathname)`** — used by `Layout` so each route gets the correct **`<title>`**, **canonical**, and social tags.  
- Adjust **`OG_IMAGE_WIDTH`** / **`OG_IMAGE_HEIGHT`** if you replace **`preview.png`** with another size.  
- **`ogSocial`** — `siteName`, `locale`, Twitter `@` handles for cards.

### Other

- **Blog:** `/blog` uses `getStaticProps` with **`revalidate: 3600`** (ISR, 1 hour).  
- **Images:** Remote images (e.g. Cloudinary) are allow-listed in **`next.config.js`** under `images.remotePatterns`.  
- After changing SEO or the OG image, re-validate with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) once deployed.

### Vercel Web Analytics — Get Started

To start counting visitors and page views ([full docs](https://vercel.com/docs/analytics/quickstart)):

1. **Install the package** (already listed in `package.json`):

   ```bash
   npm i @vercel/analytics
   ```

2. **Add the React component**  
   Vercel’s Next.js snippet uses:

   ```tsx
   import { Analytics } from "@vercel/analytics/next";
   ```

   That import targets the **App Router** (`app/layout.tsx` and `next/navigation`). **This repo uses the Pages Router**, so the equivalent is already in place:

   - **`components/VercelAnalytics.jsx`** — uses `Analytics` from **`@vercel/analytics/react`** plus **`next/router`** so each navigation sends a page view.
   - **`pages/_app.jsx`** — renders **`<VercelAnalytics />`** next to **`Layout`**.

   If you migrate to the App Router later, you can switch to **`@vercel/analytics/next`** in `app/layout.tsx` and remove **`VercelAnalytics`**.

3. **Deploy and visit the site**  
   In the Vercel dashboard, enable **Web Analytics** for the project, deploy, then open the live URL and move between pages. If you don’t see data after ~30 seconds, disable content blockers and try again.

---

## Project structure

```text
3d-modern-portfolio/
├── components/          # UI (Layout, VercelAnalytics, Nav, Header, sliders, catalog, …)
├── data/                # Static data (e.g. Upwork catalog)
├── lib/
│   ├── site.js          # SITE_URL, siteMeta, JSON-LD, analytics IDs
│   ├── seo.js           # Per-route SEO + OG/Twitter helpers
│   └── mediumFeed.js    # Medium RSS → posts + thumbnails
├── pages/
│   ├── _app.jsx
│   ├── _document.jsx    # <html lang>, favicon, apple-touch-icon
│   ├── index.jsx        # Home
│   ├── about/
│   ├── blog/            # Medium-fed listing
│   ├── contact/
│   ├── services/
│   ├── testimonials/
│   └── work/
├── public/              # Static assets (preview.png, favicon, resume, images)
├── styles/
│   └── globals.css      # Tailwind layers + global utilities
├── variants.js          # Framer Motion variant helpers
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Deploy

Compatible with **Vercel**, **Netlify**, or any Node host that supports Next.js.

1. Set environment variables only if you move secrets out of `lib/site.js` (optional refactor).  
2. Run `npm run build` and `npm run start`, or connect the repo to your host’s Next.js preset.

See [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for details.

---

## Acknowledgements

- UI and motion patterns are based on an open **modern-portfolio** Next.js template; this repo extends it with **blog (Medium)**, **Upwork catalog**, **centralized SEO / social previews** (`lib/seo.js`), **JSON-LD**, and layout and responsive behavior tuned for production.
- [Next.js](https://nextjs.org/), [Framer Motion](https://www.framer.com/motion/), [Tailwind CSS](https://tailwindcss.com/), [Swiper](https://swiperjs.com/), [tsParticles](https://particles.js.org/).

---

## License

MIT — see [`LICENSE`](./LICENSE).
