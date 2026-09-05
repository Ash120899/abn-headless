/**
 * Writes a service page's ACF fields from a local content file, so the copy
 * lives in git and can be re-pushed instead of being retyped into 71 boxes
 * in WP admin.
 *
 * Run it AFTER importing acf/service-page-fields.json in
 * WP Admin → ACF → Tools → Import Field Groups. The fields have to exist
 * before values can be written to them.
 *
 * Usage (PowerShell):
 *   $env:WP_USER="your-wp-login"
 *   $env:WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
 *   node acf/seed.mjs digital-marketing --dry-run
 *   node acf/seed.mjs digital-marketing
 *   node acf/seed.mjs all
 *
 * Usage (bash):
 *   WP_USER=... WP_APP_PASSWORD=... node acf/seed.mjs all
 *
 * The application password comes from WP Admin → Users → your profile →
 * Application Passwords. It is not your login password and can be revoked
 * afterwards. Nothing is hard-coded here.
 *
 * --dry-run prints the payload and writes nothing. Always worth doing first.
 *
 * Images are deliberately NOT set. ACF image fields store a media-library
 * attachment ID, and the artwork currently lives in the Next.js /public
 * folder rather than in WP. Upload the PNGs and pick them in the admin UI —
 * that is the one part worth doing by hand. Left unset, the page falls back
 * to the local files, so this is not blocking.
 */

import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE = "https://abnjunction.com";
const CONTENT_DIR = fileURLToPath(new URL("./content/", import.meta.url));

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const targets = args.filter((a) => !a.startsWith("--"));

async function availableSlugs() {
  const files = await readdir(CONTENT_DIR);
  return files.filter((f) => f.endsWith(".mjs")).map((f) => path.basename(f, ".mjs")).sort();
}

if (!targets.length) {
  const slugs = await availableSlugs();
  console.error("Usage: node acf/seed.mjs <slug|all> [--dry-run]\n");
  console.error("Available:\n  " + ["all", ...slugs].join("\n  "));
  process.exit(1);
}

const slugs = await availableSlugs();
const selected = targets.includes("all") ? slugs : targets;

const unknown = selected.filter((s) => !slugs.includes(s));
if (unknown.length) {
  console.error(`Unknown service(s): ${unknown.join(", ")}`);
  console.error(`Available: ${slugs.join(", ")}`);
  process.exit(1);
}

// Credentials are checked once, up front, so a missing password fails before
// any page is touched rather than halfway through "all".
let auth = null;
if (!DRY_RUN) {
  const user = process.env.WP_USER;
  const pass = process.env.WP_APP_PASSWORD;
  if (!user || !pass) {
    console.error(
      "Missing credentials. Set WP_USER and WP_APP_PASSWORD (an Application\n" +
        "Password from WP Admin → Users → your profile, not your login password).\n\n" +
        "Run with --dry-run to preview the payload without writing."
    );
    process.exit(1);
  }
  auth = Buffer.from(`${user}:${pass}`).toString("base64");
}

let failures = 0;

for (const slug of selected) {
  const mod = await import(new URL(`./content/${slug}.mjs`, import.meta.url));
  const { PAGE_ID, acf, PLACEHOLDER } = mod;

  if (!PAGE_ID || !acf) {
    console.error(`${slug}: content file must export PAGE_ID and acf.`);
    failures++;
    continue;
  }

  // A placeholder file still holds another service's copy. Writing it would
  // be worse than leaving the page empty, since the app already falls back
  // to sensible defaults for unfilled fields.
  if (PLACEHOLDER) {
    console.log(
      `${slug}: SKIPPED — acf/content/${slug}.mjs is still a placeholder.\n` +
        `  Rewrite the copy for this service, then delete its PLACEHOLDER line.`
    );
    continue;
  }

  const count = Object.keys(acf).length;

  if (DRY_RUN) {
    console.log(`\n=== ${slug} (page ${PAGE_ID}) — ${count} fields ===`);
    console.log(JSON.stringify(acf, null, 2));
    continue;
  }

  process.stdout.write(`${slug} (page ${PAGE_ID}): writing ${count} fields... `);

  let res, body;
  try {
    res = await fetch(`${SITE}/wp-json/wp/v2/pages/${PAGE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ acf }),
    });
    body = await res.text();
  } catch (err) {
    console.log("FAILED");
    console.error(`  network error: ${err.message}`);
    failures++;
    continue;
  }

  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    console.error("  " + body.slice(0, 800).replace(/\n/g, "\n  "));
    if (res.status === 401 || res.status === 403) {
      console.error("\n  401/403: check the application password, and that this user can edit pages.");
    } else if (res.status === 404) {
      console.error("\n  404: check PAGE_ID, and that the field group has been imported.");
    }
    failures++;
    continue;
  }

  // Report what actually landed rather than what was sent — if a field name
  // does not match the imported group, WP silently drops it, and the count
  // is the only thing that reveals it.
  const json = JSON.parse(body);
  const written = json.acf
    ? Object.keys(json.acf).filter((k) => {
        const v = json.acf[k];
        return v !== "" && v !== null && v !== false && !(Array.isArray(v) && v.length === 0);
      }).length
    : 0;

  console.log(`ok — ${written} fields now have values`);
  if (written < count - 12) {
    console.log(
      `  note: sent ${count}, only ${written} came back populated. Image fields are\n` +
        `  expected to stay empty; a bigger gap usually means a field-name mismatch.`
    );
  }
}

if (DRY_RUN) {
  console.log(`\nDry run — nothing written. ${selected.length} page(s) previewed.`);
} else {
  console.log(
    failures
      ? `\n${failures} of ${selected.length} page(s) failed.`
      : `\nDone. ${selected.length} page(s) written.`
  );
  console.log("Images still need picking by hand in the admin UI — see the note at the top of this file.");
}

process.exit(failures ? 1 : 0);
