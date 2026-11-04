/**
 * Changes only the "Explore" link URLs in a service page's journey_scenes.
 *
 * seed.mjs can't do this safely: its service-page content files have no scene
 * images, and WordPress may hold hand edits the seed file doesn't. A repeater
 * is written as a whole, so this reads the live rows, changes the listed URLs
 * and sends every other value back untouched. A scene is matched by its title,
 * and the run stops before writing if one isn't found.
 *
 * Usage:
 *   node acf/patch-scene-links.mjs --dry-run
 *   node --env-file=.env.wp acf/patch-scene-links.mjs
 */

const SITE = "https://abnjunction.com";
const DRY_RUN = process.argv.includes("--dry-run");

// Page ID -> { scene title in WP: the URL it should link to }.
const CHANGES = {
  4399: {
    "Performance Marketing": `${SITE}/services/digital-marketing/performance-marketing/`,
    "Analytics & Conversion Tracking": `${SITE}/services/digital-marketing/analytics-conversion-tracking/`,
    "Programmatic & Audience Activation": `${SITE}/services/digital-marketing/programmatic-advertising/`,
  },
  4681: {
    "Branding & Visual Identity": `${SITE}/services/web-and-graphic-design/branding-visual-identity/`,
    "Campaign & Content Design": `${SITE}/services/web-and-graphic-design/campaign-content-design/`,
  },
  4692: {
    "Performance & Infrastructure": `${SITE}/services/web-development/performance-infrastructure/`,
    "Maintenance & Iteration": `${SITE}/services/web-development/maintenance-iteration/`,
  },
  4698: {
    "Production & Direction": `${SITE}/services/video-production/production-direction/`,
    "Campaign & Platform Delivery": `${SITE}/services/video-production/campaign-platform-delivery/`,
  },
};

const decode = (s) => String(s ?? "").replace(/&amp;|&#0?38;/g, "&").trim();

let auth = null;
if (!DRY_RUN) {
  const { WP_USER: user, WP_APP_PASSWORD: pass } = process.env;
  if (user && pass) auth = Buffer.from(`${user}:${pass}`).toString("base64");
  else console.error("Missing WP_USER or WP_APP_PASSWORD. Run with --env-file=.env.wp, or use --dry-run.");
}

let failed = !DRY_RUN && !auth;

for (const [pageId, wanted] of failed ? [] : Object.entries(CHANGES)) {
  // The query string skips the router Worker's REST cache, so this reads the
  // current rows rather than a copy up to five minutes old.
  const res = await fetch(`${SITE}/wp-json/wp/v2/pages/${pageId}?_fields=id,acf.journey_scenes&_=${Date.now()}`, {
    headers: auth ? { Authorization: `Basic ${auth}` } : {},
  });
  if (!res.ok) {
    console.error(`Page ${pageId}: read failed (${res.status}). Nothing written.`);
    failed = true;
    continue;
  }
  const rows = (await res.json()).acf?.journey_scenes;
  if (!Array.isArray(rows) || !rows.length) {
    console.error(`Page ${pageId}: no journey_scenes returned. Nothing written.`);
    failed = true;
    continue;
  }

  const missing = Object.keys(wanted).filter((title) => !rows.some((r) => decode(r.title) === title));
  if (missing.length) {
    console.error(`Page ${pageId}: scene not found: ${missing.join(", ")}. Nothing written.`);
    failed = true;
    continue;
  }

  const updated = rows.map((r) => ({ ...r, link_url: wanted[decode(r.title)] ?? r.link_url }));
  const changed = updated.filter((r, i) => r.link_url !== rows[i].link_url);

  for (const r of updated) {
    console.log(`  ${rows.find((x) => x.title === r.title).link_url === r.link_url ? "same  " : "CHANGE"} ${decode(r.title)} -> ${r.link_url} (image ${r.image})`);
  }

  if (!changed.length) {
    console.log(`Page ${pageId}: already correct.`);
    continue;
  }
  if (DRY_RUN) {
    console.log(`Page ${pageId}: dry run, ${changed.length} link(s) would change.`);
    continue;
  }

  const write = await fetch(`${SITE}/wp-json/wp/v2/pages/${pageId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({ acf: { journey_scenes: updated } }),
  });
  if (!write.ok) {
    console.error(`Page ${pageId}: write failed (${write.status}): ${(await write.text()).slice(0, 400)}`);
    failed = true;
    continue;
  }

  // Compare what landed against what was sent, images included.
  const saved = (await write.json()).acf?.journey_scenes ?? [];
  const same = saved.length === updated.length && updated.every((r, i) => Object.keys(r).every((k) => decode(saved[i]?.[k]) === decode(r[k])));
  console.log(`Page ${pageId}: ${same ? `ok, ${changed.length} link(s) changed, every other value unchanged` : "WRITTEN BUT DIFFERS, check this page in WP Admin"}`);
  if (!same) failed = true;
}

// exitCode, not process.exit(): on Windows, exiting while fetch's handles are
// closing crashes Node with a libuv assertion.
process.exitCode = failed ? 1 : 0;
