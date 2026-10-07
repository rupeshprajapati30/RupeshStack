# Developer Portfolio — Next.js

A premium, dark, terminal-inspired developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

All content lives in JSON files, and all colours come from `.env.local`. To customise the site, you only edit data and environment files, never components.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # already done if .env.local exists
npm run dev                  # http://localhost:3000
```

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Production build (static output) |
| `npm run start`     | Serve the production build       |
| `npm run typecheck` | Strict TypeScript check          |

---

## Customising content (JSON)

All content is in `src/data/`:

| File              | Controls                                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile.json`    | Name, title, intro, location, email, profile image, resume, social links, availability badge, hero tech badges, **terminal lines**, About content, Contact copy, SEO keywords |
| `skills.json`     | Tech stack. Skills are grouped automatically by `category`, in the order categories first appear                                                         |
| `projects.json`   | Featured project cards                                                                                                                                      |
| `experience.json` | Experience timeline. Set `"current": true` to show the *Current* badge                                                                                      |
| `site.json`       | Navigation, section headings and descriptions, button labels, UI labels and footer text                                                                     |

The shapes are defined in `src/types/portfolio.ts`. If a JSON file doesn't match its type, `npm run build` fails, so mistakes show up early.

### Terminal card

```json
"terminal": [
  { "command": "whoami", "output": ["Full Stack Developer"] },
  { "command": "status", "output": ["Available"], "status": "success" }
]
```

`"status": "success"` renders the line in the success colour with a pulsing dot.

### Icons

Skills (`icon`) and About highlights (`icon`) use string keys that map to Lucide icons in `src/lib/icons.ts`. These keys are available:

`csharp, dotnet, aspnet, api, websocket, sqlserver, database, stripe, webhook, aws, docker, git, workflow, code, layers, shield, globe, rocket, zap, boxes`

An unknown key falls back to a generic code icon. To add a new key, add one line to `iconMap`.

### Links

- A link that is empty or set to `"#"` is treated as **not set** and is hidden. This applies to `githubUrl`, `liveUrl`, `socialLinks.*` and `resumeUrl`. This avoids dead links.
- Links that start with `http(s)://` open in a new tab, with a screen-reader hint.

### Images

- Put your files in `public/images/` and reference them as `/images/...` in the JSON.
- Placeholder SVGs are included (`profile.svg`, `projects/*.svg`). Replace them with your own **PNG/JPG/WebP**, which `next/image` optimises to AVIF/WebP. SVGs are served unoptimised.
- Recommended sizes: profile **640×640** (square); project screenshots **1280×800** (16:10).

### Resume

Place your file at `public/resume.pdf`, or change `resumeUrl`. Set `resumeUrl` to `""` to hide the Resume button.

---

## Theming (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com

NEXT_PUBLIC_THEME_BACKGROUND=#050B14
NEXT_PUBLIC_THEME_SURFACE=#0B1424
NEXT_PUBLIC_THEME_PRIMARY=#00E5FF
NEXT_PUBLIC_THEME_SECONDARY=#7C3AED
NEXT_PUBLIC_THEME_ACCENT=#22D3EE
NEXT_PUBLIC_THEME_TEXT=#F8FAFC
NEXT_PUBLIC_THEME_MUTED=#94A3B8
NEXT_PUBLIC_THEME_BORDER=#16304D
NEXT_PUBLIC_THEME_SUCCESS=#22C55E
```

**How it works**

1. `src/config/siteConfig.ts` reads the variables into `themeConfig`. Each value is validated: hex, `rgb()`, `hsl()`, `oklch()` and `oklab()` are accepted. An invalid or missing value falls back to the default.
2. `src/app/layout.tsx` injects them as CSS variables on `:root` (`--color-primary`, and so on).
3. `globals.css` registers the tokens with Tailwind, giving you `bg-primary`, `text-muted`, `border-border/60` and similar utilities. Tailwind's default palette is removed on purpose, so components can only use theme colours.
4. Glows and tints are derived with `color-mix()`, so changing one variable updates the whole UI. The favicon and Open Graph image also use these colours.

> `NEXT_PUBLIC_` values are **inlined at build time**. After changing `.env.local`, restart `npm run dev`, or run `npm run build` again for production. Never put secrets in `NEXT_PUBLIC_` variables.

**Contrast tip:** primary buttons use `background` as their text colour on a `primary`→`accent` gradient. Keep those two colours bright, or pick a darker background, so the button text keeps at least a 4.5:1 contrast ratio.

---

## Project structure

```text
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, theme CSS variables, skip link
│   ├── page.tsx              # composes sections from data
│   ├── globals.css           # Tailwind tokens + glass/glow/reveal utilities
│   ├── icon.tsx / apple-icon.tsx / opengraph-image.tsx   # generated from profile + theme
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── Navbar.tsx            # client: sticky, active-section tracking, a11y mobile menu
│   ├── Terminal.tsx          # client: typing effect (static for reduced motion)
│   ├── RevealObserver.tsx    # client: one IntersectionObserver for all scroll reveals
│   ├── Hero / About / Skills / Projects / Experience / Contact / Footer.tsx  # server components
│   └── ui/                   # Section, SectionHeading, ButtonLink, TechBadge, SocialLinks, BrandIcons
├── config/siteConfig.ts      # env → theme + site URL
├── data/*.json               # all content
├── lib/                      # data access, icon map, helpers
└── types/portfolio.ts        # strict data models
```

Only three small client components ship JavaScript to the browser. Every section is a Server Component and is prerendered statically.

---

## Accessibility and performance

- Semantic landmarks, one `h1`, ordered `h2`→`h3`→`h4` headings, a skip link and visible `:focus-visible` rings.
- The mobile menu sets `aria-expanded`/`aria-controls`, closes on Escape (focus returns to the toggle) and moves focus to its first link when opened.
- The terminal exposes its full transcript to screen readers; the typing animation is decorative.
- `prefers-reduced-motion` turns off the animations, the typing effect and smooth scrolling.
- Scroll-reveal only hides content after JavaScript is confirmed to be running, so the page stays fully readable without JS.
- `next/image` with `sizes`; the hero image is preloaded and project images are lazy-loaded; `next/font` is self-hosted.

---

## Deployment

Deploy to Vercel or any Node host (`npm run build && npm run start`). Set `NEXT_PUBLIC_SITE_URL` to your production domain so canonical URLs, Open Graph tags and `sitemap.xml` point to it.
