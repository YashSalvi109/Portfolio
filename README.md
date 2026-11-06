# Yash Salvi | Portfolio

Personal portfolio site for **Yash Salvi**, Market Research & Consumer Insights (London, UK).

Built with **Vite + React + TypeScript**, **Tailwind CSS v4** and **Framer Motion**. Deployed on **Vercel**, with a serverless contact form (Resend), Vercel Analytics and Speed Insights.

---

## Quick start (local development)

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload. **TODO placeholders are shown highlighted in amber.** |
| `npm run build` | Type-checks and builds to `dist/`. |
| `npm run preview` | Serves the production build locally (placeholders hidden, as on the live site). |
| `npm run images` | Regenerates the WebP photo, favicons and social share image from `public/profile.jpeg`. |

> The contact form calls a Vercel serverless function (`/api/contact`). Under `npm run dev` that endpoint does not exist, so the form shows an error with a **mailto fallback**. To test the real form locally, use the Vercel CLI instead: `npm i -g vercel`, then `vercel dev` with a `.env.local` (see below).

---

## Editing content: `src/data/profile.ts`

**All personal content lives in one file:** [`src/data/profile.ts`](src/data/profile.ts). You never need to touch the components.

| Export | Controls |
| --- | --- |
| `site` | Site URL, page title, SEO description, keywords, share image. **`site.url` is the single place to change the domain**: canonical URL, Open Graph tags, `sitemap.xml` and `robots.txt` all read from it. |
| `profile` | Name, headline, location, email, LinkedIn/GitHub links, photo paths, typing-effect `roles`, Hero `tagline`, CV download path. |
| `about` | About paragraphs, animated stats, sectors and brands. |
| `experience` | Timeline entries. `source: 'cv'` entries are full, expandable cards; `source: 'linkedin'` entries are compact rows. Sorted newest first by `start` (`YYYY-MM`). |
| `projects` | Project cards. `category` drives the filter buttons. **An empty array hides the Projects section and its nav link.** |
| `skillGroups` | Skill categories and tags. |
| `education`, `certifications` | Education cards and certification badges. A `link` makes the certificate clickable. |
| `contact` | Contact heading, blurb and form endpoint. |

### Placeholders

- A value that starts with `TODO:` is a placeholder, e.g. `link: 'TODO: add project link'`.
- Inside a sentence, write `[TODO: …]`.
- In `npm run dev` placeholders appear as amber badges so they're easy to find. **In production they are hidden automatically**, so the live site never shows "TODO". Replace a placeholder with real text (or remove the field) to publish it.

> **Privacy:** never add a phone number or home address to `profile.ts`.

### Changing the photo

Replace `public/profile.jpeg` (keep the filename), then run `npm run images` and commit the generated files. If the face sits in a different spot, adjust the `FACE` crop box at the top of [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs).

---

## Updating the CV

The **Download CV** button serves `public/resume.pdf`. For now it's a **placeholder** PDF ("updated CV coming soon").

When Yash sends the final CV (**without his phone number**):

1. Save it as `public/resume.pdf`, replacing the placeholder.
2. Optionally change the downloaded filename in `profile.resume.fileName`.
3. Commit and push. Vercel redeploys automatically.

The original source files `Yash Salvi_CV.pdf` and `Profile.pdf` (LinkedIn export) stay in the project root for reference. They are **git-ignored** and never published.

---

## Deploying to Vercel

1. Push this repo to GitHub (e.g. `YashSalvi109/portfolio`).
2. In [Vercel](https://vercel.com/new), **Import** the repository. Vercel detects Vite automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
   - The `api/` folder is deployed as serverless functions.
   No `vercel.json` is needed: it's a single page, so there are no client-side routes to rewrite.
3. Add the environment variables (next section) and **Deploy**.
4. Every push to `main` redeploys production, and pull requests get preview URLs.
5. Update `site.url` in `profile.ts` if the final URL differs from `https://yash-salvi.vercel.app`.

### Environment variables (contact form)

The form posts to [`api/contact.ts`](api/contact.ts), which sends the message by email through [Resend](https://resend.com). It has a hidden honeypot field for spam, validates input server-side, and sets the sender as `reply-to` so you can reply straight from your inbox.

In **Vercel → Project → Settings → Environment Variables**, add:

| Name | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_EMAIL` | yes | Inbox that receives messages, e.g. `yashssalvi@outlook.com` |
| `CONTACT_FROM` | optional | Sender, e.g. `Yash Salvi <contact@yourdomain.com>`. Must be on a domain verified in Resend. |

Then **redeploy** (Deployments → ⋯ → Redeploy) so the function picks them up.

> **Resend sender note:** without `CONTACT_FROM`, emails go out from Resend's test address `onboarding@resend.dev`, which **can only deliver to the email you signed up to Resend with**. Either sign up to Resend with the same address as `CONTACT_EMAIL`, or verify a domain in Resend (Domains → Add) and set `CONTACT_FROM` to an address on it.

For local testing with `vercel dev`, copy [`.env.example`](.env.example) to `.env.local` and fill it in. `.env*` files are git-ignored.

### Analytics

`@vercel/analytics` and `@vercel/speed-insights` are already wired in (`src/App.tsx`). Turn them on in the Vercel dashboard under the project's **Analytics** and **Speed Insights** tabs. No code changes needed.

### Adding a custom domain

1. Buy a domain (e.g. `yashsalvi.com`) from any registrar.
2. In Vercel: **Project → Settings → Domains → Add**, then enter the domain.
3. Add the DNS records Vercel shows at your registrar (usually an `A` record for the apex domain and a `CNAME` for `www`). HTTPS is issued automatically.
4. Update **`site.url`** in `src/data/profile.ts` to the new domain and push, so canonical tags, Open Graph and the sitemap use it.
5. Optionally verify that domain in Resend and set `CONTACT_FROM` to e.g. `contact@yashsalvi.com`.

---

## Project structure

```
api/contact.ts               Serverless contact-form function (Resend)
public/                      Static files: photo, favicons, og-image.jpg, resume.pdf
scripts/optimize-images.mjs  Generates WebP, favicons and the OG image
seo.ts                       Build plugin: meta tags, JSON-LD, robots.txt, sitemap.xml
src/data/profile.ts          ← ALL personal content
src/components/              Navbar, command palette, background, sections…
src/index.css                Theme tokens (navy / sky-blue, dark + light)
```

**Features:** dark mode by default with a light/dark toggle (remembered per visitor), sticky navbar with active-section highlight, scroll progress bar, ⌘K / Ctrl+K command palette, typing effect, scroll-animated expandable timeline, tilt/glow project cards with filters and a modal, tabbed skills, animated stats, honeypot-protected contact form with mailto fallback. Accessibility: semantic landmarks, skip link, keyboard navigation (tabs, dialogs with focus handling, Esc to close), and full support for `prefers-reduced-motion`.

---
