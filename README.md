# NCORE website (static)

Three pages: NCORE (parent), Core Dynamics (web development), Nore Labs (planned electronics). Plain HTML/CSS/JS, with no build step, backend or paid hosting.

```
index.html              NCORE home
core-dynamics/          Services, demo projects, quote form
nore-labs/              Vision and concept categories
assets/logos/           PUT YOUR LOGO FILES HERE (see README inside)
assets/js/data.js       Edit contact email, services, demo projects
assets/css/styles.css   Design tokens (colours, fonts) at the top
CNAME                   n-core.in
```

## 1. Add your logos
Follow `assets/logos/README.md`. File names: `ncore`, `nore-labs`, `core-dynamics`.

## 2. Edit facts in `assets/js/data.js`
- `contactEmail`: your enquiry address. **Empty by default**, so the form honestly says it cannot deliver messages.
- `formEndpoint`: optional Formspree / Web3Forms URL for true delivery.
- `demoProjects`: add real demos (`type: "demo"`) or paid work (`type: "client"`). Empty shows "Coming soon" slots.
- `services`: mark each `offered` only if you can deliver it, otherwise `planned`.

## 3. Deploy to GitHub Pages
1. Create a GitHub repo and push this folder to `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch*, Branch: `main` / root.
3. Custom domain: `n-core.in` (the `CNAME` file already contains it). Tick *Enforce HTTPS* once available.

## 4. Connect Cloudflare
1. Add `n-core.in` to Cloudflare and point your registrar's nameservers to the ones Cloudflare gives you.
2. In DNS add four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus a `CNAME` for `www` → `<your-github-username>.github.io`. (Check GitHub's current Pages docs to confirm these IPs.)
3. Start with proxy status **DNS only** until GitHub issues the HTTPS certificate, then you may enable the proxy with SSL mode **Full**.

## Growing later
- **Products:** add a `products` array to `data.js` and a render block in `main.js` (same pattern as projects).
- **Payments / backend:** swap the form for a serverless endpoint (Cloudflare Workers / Pages Functions) without changing the pages.
- **New division pages:** copy `nore-labs/index.html` into a new folder and add a nav link.

## Honesty rules built into the site
No invented registrations, addresses, team, clients, testimonials, prices, specs or availability. Nore Labs products are labelled Concept. Demo projects are labelled Demo.
