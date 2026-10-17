# ABN Junction Revamp — Project Reference

Living reference for the WordPress → Next.js migration of **abnjunction.com**.
Covers what exists, how it was built, why particular decisions were made, and
what is still outstanding.

Last updated: 2026-09-02

---

## 1. What this project is

abnjunction.com runs on WordPress. Rather than a big-bang replatform, pages are
being rebuilt in Next.js **one at a time** and swapped in via URL-level routing
at the CDN. WordPress stays the content source and keeps serving every page
that has not been migrated yet.

The practical effect: at any moment the live site is part WordPress, part
Next.js, and a visitor cannot tell which is which.

### Why page-by-page

- No content freeze, no big-bang cutover risk.
- Each page can be validated in production before the next one starts.
- WordPress remains the CMS, so the marketing team's workflow does not change.
- Rollback for any page is a routing change, not a deploy.

### Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.4, App Router, Turbopack |
| Runtime | `export const runtime = "edge"` on every dynamic route |
| Hosting | Cloudflare Pages |
| Routing | Cloudflare Worker, path-based (source in `cloudflare/router-worker.js`, deployed via dashboard) |
| CMS | WordPress REST API (`/wp-json/wp/v2/`) |
| Structured content | ACF, exposed via `show_in_rest` |
| Styling | Scoped CSS-in-JS style blocks per feature, plus Tailwind |

---

## 2. How the migration actually works

```
                    ┌─────────────────────┐
   visitor  ───────▶│ Cloudflare Worker   │
                    │ (path routing)      │
                    └──────────┬──────────┘
                    matched?   │
              ┌────────────────┴────────────────┐
              ▼ yes                             ▼ no
     ┌──────────────────┐             ┌──────────────────┐
     │ Cloudflare Pages │             │   WordPress      │
     │ (this Next.js    │             │   (origin)       │
     │  app)            │             └──────────────────┘
     └────────┬─────────┘
              │ fetches content at request time
              ▼
     ┌──────────────────┐
     │ WP REST API      │
     │ /wp-json/wp/v2/  │
     └──────────────────┘
```

The Worker holds a list of migrated paths. Anything on the list goes to the
Next.js app; everything else falls through to WordPress untouched.

> **The Worker (`falling-flower-b107`, route `abnjunction.com/*`) is deployed
> from the Cloudflare dashboard.** Its source is version-controlled at
> [cloudflare/router-worker.js](../cloudflare/router-worker.js). Edit it there,
> then paste it into Workers & Pages → falling-flower-b107 → Edit code →
> Deploy. A new page is not live until its route is added. This is the single
> most common reason a finished page appears to "not work".

**The Worker also caches `/wp-json` GETs (added 2026-10-17).** Hostinger
throttles each client IP at about 30 requests per 30 s, before PHP runs
(429, empty body, `platform: hostinger`). Every server-side WP call from
the app arrives from the same Cloudflare IP, so a few page views in a row
used to 500 every WP-backed page. The Worker now serves anonymous REST
GETs from `caches.default`: fresh for 5 min, then the last good copy if
WordPress returns 429/5xx. Responses carry `X-Edge-Cache: HIT|MISS|STALE`.
Side effect: WP edits take up to 5 min to show. Security Analytics can't
show any of this, because Worker subrequests are excluded. Use Workers →
falling-flower-b107 → Observability instead.

### Two ways the app reads WordPress

1. **Server-side direct fetch** — the normal path. Server components call the
   WP REST API directly at request time. Used by every page below.
2. **`/api/wp-proxy`** — a same-origin proxy at
   [src/app/api/wp-proxy/route.js](../src/app/api/wp-proxy/route.js), for
   client components that need WP data after hydration (filtering, pagination)
   without hitting CORS.

---

## 3. What has been migrated

| Route | Source | Status |
|---|---|---|
| `/blogs` | [src/app/blogs/page.js](../src/app/blogs/page.js) | Live |
| `/blog/[slug]` | [src/app/blog/[slug]/page.js](../src/app/blog/%5Bslug%5D/page.js) | Live |
| `/case-studies` | [src/app/case-studies/page.js](../src/app/case-studies/page.js) | Live |
| `/case-studies/[slug]` | [src/app/case-studies/[slug]/page.js](../src/app/case-studies/%5Bslug%5D/page.js) | Live |
| `/services/[slug]` | [src/app/services/[slug]/page.js](../src/app/services/%5Bslug%5D/page.js) | **Built, not yet routed** |

Supporting code is grouped per feature:

```
src/
  app/
    api/wp-proxy/route.js        same-origin WP proxy for client fetches
    blogs/ blog/ case-studies/ services/
  components/
    blog-listing/                blog listing UI
    case-studies-listing/        case-study listing UI
    service-page/                service page UI (17 components)
  lib/
    blog-shared.js  wp-blog.js  wp-blog-client.js
    case-study-shared.js  wp-case-studies.js
    service-acf.js               ACF payload -> service-page content object
    wp-service.js                WP page + media fetch for service pages
    wp-proxy-client.js
  data/
    navigation.js                nav/menu hierarchy (single source of truth)
acf/
  service-page-fields.json       importable ACF field group (72 fields)
  seed.mjs                       pushes local copy into WP
  content/<slug>.mjs             per-service copy, one file each
```

---

## 4. The service pages (most recent work)

Five service pages share **one layout** and differ only in accent colour,
copy, and character artwork — **all three of which come from WordPress
only** (see the content pipeline below):

| Slug | WP page | Case-study term |
|---|---|---|
| `digital-marketing` | 4399 | 14 |
| `web-and-graphic-design` | 4681 | 15 |
| `web-development` | 4692 | 16 |
| `video-production` | 4698 | none yet |
| `web-data-security` | 4700 | none yet |

All five are children of WP page **1023**, which is what the ACF field group's
location rule keys off (`page_parent == 1023`). The route serves any child of
1023 whose ACF is filled in, and 404s everything else — there is no slug list
in code.

### Accent colour rule

Each service has three ACF colour pickers. When picking them, start from one
brand colour and derive the other two:

| Token | ACF field | Rule |
|---|---|---|
| `--coral` (`primary`) | `color_primary` | brand colour unchanged |
| `--coral2` (`primaryLight`) | `color_primary_light` | ~10–12% toward white |
| `--red` (`accent`) | `color_accent` | darker/desaturated, for contrast on cream |

Set inline as CSS custom properties on the page root, so one layout recolours
completely without touching the stylesheet. **The stylesheet declares no
fallback for these three** — a blank picker leaves its accent unset. Only the
shared neutrals (`--ink`, `--cream`, `--paper`, `--cyan`, `--muted`) are
defined in `ServicePageStyles.js`.

**Recolouring the global header.** `SiteHeader` is a *sibling* of the page in
[src/app/layout.js](../src/app/layout.js), so variables set on `.svc-page`
never reach it. The header CTA reads `--site-cta-bg` / `--site-cta-fg`
(defined in `globals.css`, defaulting to the site cyan), and
`ServicePageStyles` emits a `body:has(.svc-page){...}` rule per service to
override them — `body` being the nearest common ancestor. Deliberately a
*separate* variable from `--site-cyan`, which has 14 other usages that must
not change. Dark ink stays the label colour on every accent: it scores
5.7–12.3 contrast across the five palettes, all passing WCAG AA.

### Section order

`HeroZone → ServiceMarquee → JourneyStory → SystemMap → CinemaJourney →
ProofCounters → CaseCards → MethodTrack → CharacterBreak → InsightCards →
ServiceFaq → FinalCta`

The marquee was deliberately moved **up** from its position in the design
concept (which had it after the story scroller). In the concept it left an
empty black strip at the top of `.journey`; moving it fills that seam.

### Content pipeline

```
acf/content/<slug>.mjs        seed source only, lives in git
        │  node acf/seed.mjs <slug>
        ▼
WordPress ACF fields + media library + AIOSEO
        │  getServicePage(slug)        src/lib/wp-service.js
        ▼
buildServiceContent(acf, media)  src/lib/service-acf.js
        ▼
rendered page
```

**WordPress is the only source** of copy, artwork, colours and SEO. There are
no code defaults, no built-in artwork and no fallback palette (removed
2026-10-17; the old `service-content.js`, `acf-merge.js` and
`public/services/` art are gone). The `acf/content/*.mjs` files are **not**
imported by the app — they only feed the seeder.

- A blank ACF field renders nothing: no image, no button, no row. Empty
  repeater rows are dropped.
- The case-study and insight bands show live WP posts only, and are hidden if
  WP returns none.
- SEO: AIOSEO title / description / canonical first, then the WP page title
  and the ACF `meta_description`. OG image is AIOSEO's, else the hero art.
- A WP outage **throws** (error page) instead of rendering defaults or caching
  a 404.

---

## 5. Key implementation decisions

### Content shaped as data, not JSX

`buildServiceContent()` produces one plain object per page. Components take
that object as props and render it, which is why moving the content into ACF
required **zero component rewrites** — only a mapping layer.

### Numbers split into prefix / value / suffix

Counters animate the digits only. `₹7.5M+` is stored as
`{prefix: "₹", value: "7.5", suffix: "M+"}` so the symbols stay fixed while
the number counts up, and each part is independently editable in ACF.

**Subtlety worth knowing:** an *empty* prefix is meaningful (`5`, not `5×`).
`service-acf.js` reads prefix/suffix with a separate `affix()` helper that
keeps them untrimmed and never treats `""` as missing.

### Switch-word headings

Headings are stored as `headingBefore` + `headingSwitch` (a comma-separated
list), so the last word can cycle. `SwitchWord` tolerates a missing or
single-word list and renders statically rather than throwing.

### Dynamic story-scroll height

The story scroller is pinned for one viewport plus scroll travel per scene:

```css
height: calc(100vh + (var(--scene-count, 6) * 70vh));   /* 87vh on mobile */
```

`--scene-count` comes from `journey.scenes.length`. At 6 scenes this
reproduces the concept's original 520vh exactly; a 4-scene service gets 380vh
instead of a viewport and a half of dead scrolling.

### Case studies filter per service

Each service page picks a `case_study_category` term in its ACF "Show case
studies from" field, so the Digital Marketing page shows digital-marketing
work. Pages with no term picked show the most recent studies from any
category.

---

## 6. Hard-won gotchas

Things that cost real debugging time. Worth reading before touching this code.

**`overflow-x: hidden` breaks every `position: sticky` descendant.**
It computes to `overflow: hidden auto`, which makes the element a scroll
container. Use `overflow-x: clip`. This silently broke the entire pinned-scroll
system and presented as elements appearing pre-scrolled.

**Backticks inside CSS comments terminate the JS template literal.**
The stylesheet lives in a template literal. A backtick in a comment produces
`Expected '</', got 'ident'` from a completely unrelated line. Cost time twice.

**Never add `prefers-reduced-motion` guards.**
The dev machine has OS reduced-motion enabled, so guarded animations silently
do nothing and look like broken code. `globals.css` already has a site-wide
`*{animation-duration:0.01ms !important}` rule; the service page carries a
deliberate exemption block to override it. This bit three separate times.

**`currentColor` inside a gradient resolves to `transparent`** when the same
rule sets `color: transparent` — used for text-clip effects. A heading rendered
invisibly for this reason; sections need an explicit colour override.

**GSAP ScrollTrigger caches stale offsets on mobile.**
Reveals fired as though the page were already scrolled. `ignoreMobileResize`
and manual refreshes both failed. Replaced with a plain `IntersectionObserver`,
which is what the design concept used in the first place.

**WordPress double-escapes category labels** (`&amp;amp;`). Needs cleaning
before display. Fixed on the service page; **still present on the case-studies
listing insights block.**

**Theme colours must come from tokens, never literals.** The story-stage
gradient was ported from the concept with its three coral hex values intact,
so it stayed coral on all five services while everything around it recoloured.
Anything accent-tinted has to derive from `--coral` / `--coral2` / `--red`
(`color-mix` works well for intermediate stops and tints, e.g.
`color-mix(in srgb,var(--coral) 14%,transparent)` instead of a coral `rgba`).
Neutrals and the three handoff-character labels are deliberately fixed and
should stay literal.

**ACF returns inconsistent shapes.** An untouched repeater can be `false`, an
empty one `""` or `[]`; a taxonomy field can be a scalar or an array; an image
can be a URL string, an object, or a bare attachment ID. `service-acf.js`
normalises all of these.

**Empty ACF is an array, not an object.** Before the field group is imported,
`post.acf` is `[]` — truthy, `typeof "object"`, and every lookup is
`undefined`. `getServicePage()` treats it as "no service page" and 404s.

---

## 7. Working with the ACF setup

### One-time setup

1. WP Admin → **ACF → Tools → Import Field Groups** →
   [acf/service-page-fields.json](../acf/service-page-fields.json)
2. WP Admin → **Users → Profile → Application Passwords** → generate one

The field group cannot be created over the REST API — importing JSON or
registering via PHP are the only options. 72 fields across 14 tabs, all
optional, `show_in_rest: 1`. Re-import the JSON after adding a field
(`insights_description` was added 2026-10-17).

### Pushing copy into WordPress

```powershell
$env:WP_USER="your-wp-login"
$env:WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"

node acf/seed.mjs all --dry-run     # preview, writes nothing
node acf/seed.mjs all               # write all five
node acf/seed.mjs web-development   # or just one
```

Credentials come from environment variables and are never hard-coded.
A content file can export `PLACEHOLDER = true` to make the seeder refuse to
write it — a guard against pushing one service's copy onto another's page.

### Editing copy

Two options, both valid:

- **In WordPress** — normal ACF editing, takes effect immediately.
- **In git** — edit `acf/content/<slug>.mjs`, re-run the seeder. Better for
  bulk edits and keeps copy under version control.

Because the seeder overwrites, the git files should be treated as the source
of truth for anything seeded from them.

### Images are deliberately not seeded

ACF image fields store a **media-library attachment ID**, so artwork is
uploaded and picked in WP Admin by hand. All five services have their own
artwork in WP. There is no local copy: an image field left blank shows no
image.

---

## 8. Sub-service naming

[src/data/navigation.js](../src/data/navigation.js) is the **single source of
truth** for service and sub-service naming — it drives both the desktop mega
menu and the mobile drawer. Scene titles on the service pages match it exactly.

The live WordPress sub-pages exist at nested URLs
(`/services/<service>/<sub-service>/`) and all resolve. Note the nav file's
own links still point at parent pages in several places; the content files use
the real nested URLs instead.

Watch out for two real typos **in WordPress**, not in this code:
- category slug `web-graphics-deisgn` (term 15)
- page slug `firewall-datasecuity`

---

## 9. Outstanding work

**Blocking for the service pages going live**
- [x] Add a `/services/*` rule to the Cloudflare Worker (dashboard)
- [x] Seed all five services (verified 2026-10-17: every field filled in WP)
- [ ] Commit and push the service-page work
- [ ] Re-import `acf/service-page-fields.json` and fill the new
      **Insights → Description** field on all five pages (the insights
      paragraph is hidden until then)

**Content and polish**
- [x] Per-service artwork uploaded to WP and selected in ACF
- [ ] Create `case_study_category` terms for video production and security,
      then set `cases_category` in their content files
- [ ] Fix the double-escaped category labels on the case-studies listing
      insights block (already fixed on the service page)

**Repo hygiene**
- [ ] 43 design-concept files are still tracked from earlier commits. New
      concepts are now gitignored, but removing the existing ones needs a
      deliberate `git rm --cached`.

---

## 10. Local development

```powershell
npm run dev      # http://localhost:3000
npm run build    # production build — run before pushing
```

The build must pass before pushing; Cloudflare Pages runs the same build.
`.npmrc` sets `legacy-peer-deps` because the Cloudflare build fails without it.

Useful checks:

```powershell
# is a WP page's ACF actually populated?
curl "https://abnjunction.com/wp-json/wp/v2/pages?slug=web-development&_fields=acf"

# preview what the seeder would write
node acf/seed.mjs all --dry-run
```

**Note on `edge` runtime:** it disables static generation, so service pages
are server-rendered on demand. `generateStaticParams` is incompatible with it
and was removed after causing a build failure.
