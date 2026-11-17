# Tokenly Health — Healthcare Software Landing Page

Marketing site for Tokenly Health: hospital billing, appointment booking, pharmacy inventory and custom business software.

Live URL: [https://health.tokenly.in](https://health.tokenly.in)

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- React Router

## Brand configuration

Company name, contact details, canonical URL and SEO metadata live in `src/config/brand.ts`.

When the final brand name is confirmed, update that file. The Vite plugin injects the same values into `index.html` at build time. Also update:

- `public/site.webmanifest`
- `public/logo.png` / `public/favicon.png` / `public/og.png` if the mark changes
- `public/sitemap.xml` and `public/robots.txt` if the public host changes

Regenerate the social preview with:

```bash
python3 scripts/generate-og.py
```

## Local development

```bash
# Use Node 18
nvm use

npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

The consultation form opens WhatsApp with a prefilled enquiry. There is no separate form backend.

## Production build

```bash
npm run build
npm run preview
```

Static output is written to `dist/`.

## Deployment

Any static host works:

1. Build with `npm run build`.
2. Publish the `dist/` folder.

**Vercel / Netlify / Cloudflare Pages**

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add SPA fallback so `/privacy` and `/terms` resolve to `index.html`

**Nginx example**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Canonical SEO URLs point to `https://health.tokenly.in`.

## Search engines

After a production deploy:

1. Confirm `https://health.tokenly.in/sitemap.xml` and `/robots.txt` are reachable.
2. Submit the sitemap in [Google Search Console](https://search.google.com/search-console).
3. Submit the sitemap in [Bing Webmaster Tools](https://www.bing.com/webmasters).

Do not add verification meta tags until the console provides the actual tokens.

### Future content pages

Thin duplicate pages were not created. Useful later pages, each with unique content:

- Hospital Billing Software
- IPD Billing Software
- OPD Billing Software
- Pharmacy Inventory Software
- Appointment Booking Software
- Custom Healthcare Software

## CI/CD (GitHub Pages)

Workflow: `.github/workflows/production-client.yml`

1. In the repo, set secret `DEPLOYMENT_EMAIL` to the authorized deployer email.
2. Enable **GitHub Pages** → Source: **GitHub Actions**.
3. Run **Actions → Production-Client → Run workflow**, enter the same email, and deploy.

The workflow verifies the email, builds the Vite app, uploads `dist/`, and deploys to GitHub Pages.
