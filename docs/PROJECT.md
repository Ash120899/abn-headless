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
| Routing | Cloudflare Worker, path-based (**not in this repo**) |
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

> **The Worker lives in the Cloudflare dashboard, not in this repo.** A new
> page is not live until its route is added there. This is the single most
> common reason a finished page appears to "not work".

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
    service-content.js           service copy + palettes (code defaults)
    wp-service.js                ACF fetch + merge for service pages
    wp-proxy-client.js
  data/
    navigation.js                nav/menu hierarchy (single source of truth)
acf/
  service-page-fields.json       importable ACF field group (71 fields)
  seed.mjs                       pushes local copy into WP
  content/<slug>.mjs             per-service copy, one file each
```

---

## 4. The service pages (most recent work)

Five service pages share **one layout** and differ only in accent colour,
copy, and character artwork:

| Slug | WP page | Accent | Case-study term |
|---|---|---|---|
| `digital-marketing` | 4399 | `#f56f5d` | 14 |
| `web-and-graphic-design` | 4681 | `#f4c928` | 15 |
| `web-development` | 4692 | `#4c8dff` | 16 |
| `video-production` | 4698 | `#a66bff` | none yet |
| `web-data-security` | 4700 | `#2fbf9f` | none yet |

All five are children of WP page **1023**, which is what the ACF field group's
location rule keys off (`page_parent == 1023`).

### Accent colour rule

Each service starts from one brand colour. Three values are derived:

| Token | Rule | Digital Marketing | Web & Graphic Design |
|---|---|---|---|
| `--coral` (`primary`) | brand colour unchanged | `#f56f5d` | `#f4c928` |
| `--coral2` (`primaryLight`) | ~10–12% toward white | `#ff856f` | `#ffdc55` |
| `--red` (`accent`) | darker/desaturated, for contrast on cream | `#db3f32` | `#c79a0d` |

Set inline as CSS custom properties on the page root, so one layout recolours
completely without touching the stylesheet.

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
acf/content/<slug>.mjs ─────────────────┐  local copy, lives in git
        │  node acf/seed.mjs <slug>     │
        ▼                               │ imported directly
WordPress ACF fields                    │
        │  getServicePage(slug)         ▼
        │                        service-content.js
        │                        (per-service defaults,
        │                         built via the same merge)
        ▼                               │
mergeServiceContent()  ◀────────────────┘
        │  ACF folded over defaults, per field
        ▼
rendered page
```

The content files are used **twice**, deliberately: seeded into WordPress,
and imported directly by `service-content.js` to build the code defaults.
Both paths run through the same `mergeServiceContent()` in
[src/lib/acf-merge.js](../src/lib/acf-merge.js), so there is only one copy of
the content and one merge implementation.

That matters because it means a service page renders **its own copy even
before WordPress is seeded** — and if WP is ever slow or down.

**Every field is optional at every layer.** A blank ACF field falls back to
`service-content.js`; a WP outage falls back to the same. A half-filled page
in WordPress still renders a complete page on the site. This is what made it
safe to import the field group before any content existed.

---

## 5. Key implementation decisions

### Content shaped as data, not JSX

`service-content.js` holds one plain object per service. Components take that
object as props and render it. This is why adding ACF later required **zero
component rewrites** — only a new merge layer.

### Numbers split into prefix / value / suffix

Counters animate the digits only. `₹7.5M+` is stored as
`{prefix: "₹", value: "7.5", suffix: "M+"}` so the symbols stay fixed while
the number counts up, and each part is independently editable in ACF.

**Subtlety worth knowing:** an *empty* prefix is meaningful. Standard fallback
logic treated `""` as "unset" and inherited the previous service's `×` or `₹`,
so Web & Graphic Design rendered `5×` instead of `5`. `wp-service.js` has a
separate `affix()` helper: for prefix/suffix, a row that supplies the key at
all wins, even when blank.

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

Each service names a `case_study_category` term, so the Digital Marketing page
shows digital-marketing work. Services with no term yet fall back to the most
recent studies from any category rather than rendering an empty band.

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
(`color-mix` works well for intermediate stops). Neutrals and the three
handoff-character labels are deliberately fixed and should stay literal.

**A shared "defaults" object can silently mean "Digital Marketing's copy".**
`service-content.js` originally spread `DIGITAL_MARKETING` for every service
and swapped only the palette, so all five pages showed SEO cards until the
content files were wired in as per-service defaults. If a page shows the wrong
service's copy, check whether WordPress is seeded **and** what the code
default actually resolves to.

**ACF returns inconsistent shapes.** An untouched repeater can be `false`, an
empty one `""` or `[]`; a taxonomy field can be a scalar or an array; an image
can be a URL string, an object, or a bare attachment ID. `wp-service.js`
normalises all of these.

**Empty ACF is an array, not an object.** Before the field group is imported,
`post.acf` is `[]` — truthy, `typeof "object"`, and every lookup is
`undefined`. The merge handles it correctly by falling through on every field.

---

## 7. Working with the ACF setup

### One-time setup

1. WP Admin → **ACF → Tools → Import Field Groups** →
   [acf/service-page-fields.json](../acf/service-page-fields.json)
2. WP Admin → **Users → Profile → Application Passwords** → generate one

The field group cannot be created over the REST API — importing JSON or
registering via PHP are the only options. 71 fields across 14 tabs, all
optional, `show_in_rest: 1`.

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

ACF image fields store a **media-library attachment ID**. The artwork lives in
`public/services/` in this repo, not in WP. Uploading and picking images is a
manual step. Until then the pages fall back to the local files, so nothing is
blocked — all five services currently share the Digital Marketing artwork.

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
- [ ] Add a `/services/*` rule to the Cloudflare Worker (dashboard)
- [ ] Seed the three newest services (`node acf/seed.mjs all`)
- [ ] Commit and push the service-page work

**Content and polish**
- [ ] Upload per-service artwork to WP and select it in ACF (all five
      currently share Digital Marketing's images)
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
