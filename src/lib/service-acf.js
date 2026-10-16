// Turns a service page's ACF payload into the shape the service-page
// components render.
//
// WordPress is the only source. There are no code defaults, built-in
// artwork or fallback palette behind any field: a field left blank in WP
// comes through empty, and the component for it simply doesn't draw that
// element. Repeater rows with nothing in them are dropped for the same
// reason.
//
// Field names here mirror acf/service-page-fields.json exactly.

// --- small helpers -------------------------------------------------------

// ACF text fields come back as a string, or false / null / "" when untouched.
function text(value) {
  if (typeof value === "number") return String(value);
  return typeof value === "string" ? value.trim() : "";
}

// Prefixes and suffixes are kept untrimmed: an empty one is a real value
// ("5", not "5×"), and a deliberate space is too.
function affix(value) {
  return typeof value === "string" ? value : "";
}

// ACF repeaters come back as arrays of objects; an untouched one can be
// false or "". Normalise to a real array before mapping.
function rows(value) {
  return Array.isArray(value) ? value : [];
}

// Comma-separated text field -> trimmed array ("engine, system").
function list(value) {
  if (typeof value !== "string") return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

// ACF image fields come back in one of three shapes depending on the field's
// Return Format: a URL string, an object with .url, or a bare attachment ID.
// All three are accepted so the page renders whatever the field group is set
// to — an ID is looked up in `media` (see collectAttachmentIds /
// resolveAttachments in wp-service.js). Anything else is null: no image.
function imageUrl(value, media) {
  if (typeof value === "string" && value.trim() !== "") return value;
  if (value && typeof value === "object" && typeof value.url === "string") return value.url;
  const id = Number(value);
  if (Number.isFinite(id) && id > 0) return media?.[id] ?? null;
  return null;
}

function link(label, url) {
  return { label: text(label), href: text(url) };
}

// Maps a repeater and drops rows where `keep` finds nothing to show.
function mapRows(value, mapRow, keep) {
  return rows(value).map(mapRow).filter(keep);
}

// ACF colour pickers return "#rrggbb" or "". Undefined, not "", when blank,
// so React leaves the inline custom property off altogether.
function color(value) {
  return text(value) || undefined;
}

/**
 * Walks an ACF payload and returns every attachment ID used by an image
 * field, so they can all be resolved in a single media request rather than
 * one per image.
 */
export function collectAttachmentIds(acf) {
  if (!acf || typeof acf !== "object") return [];
  const ids = new Set();
  const add = (v) => {
    const n = Number(v);
    // Guard against strings that merely start with digits, and against the
    // objects/URLs that need no lookup.
    if (typeof v !== "object" && Number.isFinite(n) && n > 0 && String(v).trim() === String(n)) ids.add(n);
  };

  add(acf.hero_character);
  add(acf.cb_image);
  for (const row of rows(acf.journey_scenes)) add(row?.image);
  for (const row of rows(acf.cinema_handoff)) add(row?.image);

  return [...ids];
}

/**
 * Builds the service-page content object from one page's ACF payload.
 * `media` maps attachment IDs to URLs. Kept separate from the fetch so it
 * can be reasoned about (and tested) without the network.
 */
export function buildServiceContent(acf, media) {
  const caseCategory = Number(Array.isArray(acf.cases_category) ? acf.cases_category[0] : acf.cases_category);

  return {
    theme: {
      primary: color(acf.color_primary),
      primaryLight: color(acf.color_primary_light),
      accent: color(acf.color_accent),
    },
    metaDescription: text(acf.meta_description),

    hero: {
      eyebrow: text(acf.hero_eyebrow),
      headingBefore: text(acf.hero_heading_before),
      headingHighlight: text(acf.hero_heading_highlight),
      headingAfter: text(acf.hero_heading_after),
      headingKinetic: text(acf.hero_heading_kinetic),
      description: text(acf.hero_description),
      ctaPrimary: link(acf.hero_cta_primary_label, acf.hero_cta_primary_url),
      ctaSecondary: link(acf.hero_cta_secondary_label, acf.hero_cta_secondary_url),
      character: imageUrl(acf.hero_character, media),
      stats: mapRows(
        acf.hero_stats,
        (r) => ({ prefix: affix(r?.prefix), value: text(r?.value), suffix: affix(r?.suffix), label: text(r?.label) }),
        (r) => r.value || r.label
      ),
      tools: mapRows(
        acf.hero_tools,
        (r) => ({ glyph: text(r?.glyph), label: text(r?.label) }),
        (r) => r.glyph || r.label
      ),
    },

    journey: {
      eyebrow: text(acf.journey_eyebrow),
      headingBefore: text(acf.journey_heading_before),
      headingSwitch: list(acf.journey_heading_switch),
      description: text(acf.journey_description),
      scenes: mapRows(
        acf.journey_scenes,
        (r) => ({
          num: text(r?.num),
          title: text(r?.title),
          description: text(r?.description),
          chips: list(r?.chips),
          link: link(r?.link_label, r?.link_url),
          image: imageUrl(r?.image, media),
        }),
        (r) => r.title || r.description || r.image
      ),
    },

    marquee: {
      rowOne: text(acf.marquee_row_one),
      rowTwo: text(acf.marquee_row_two),
    },

    system: {
      eyebrow: text(acf.system_eyebrow),
      headingBefore: text(acf.system_heading_before),
      headingKinetic: text(acf.system_heading_kinetic),
      description: text(acf.system_description),
      nodes: mapRows(
        acf.system_nodes,
        (r) => ({ num: text(r?.num), title: text(r?.title), description: text(r?.description) }),
        (r) => r.title || r.description
      ),
    },

    cinema: {
      eyebrow: text(acf.cinema_eyebrow),
      words: list(acf.cinema_words),
      description: text(acf.cinema_description),
      scrollHint: text(acf.cinema_scroll_hint),
      depthCards: mapRows(
        acf.cinema_depth_cards,
        (r) => ({ label: text(r?.label), title: text(r?.title), note: text(r?.note) }),
        (r) => r.label || r.title || r.note
      ),
      handoff: mapRows(
        acf.cinema_handoff,
        (r) => ({ image: imageUrl(r?.image, media), roleFx: text(r?.role_fx), caption: text(r?.caption) }),
        (r) => r.image || r.caption
      ),
    },

    proof: {
      eyebrow: text(acf.proof_eyebrow),
      headingBefore: text(acf.proof_heading_before),
      headingKinetic: text(acf.proof_heading_kinetic),
      items: mapRows(
        acf.proof_items,
        (r) => ({ prefix: affix(r?.prefix), value: text(r?.value), suffix: affix(r?.suffix), label: text(r?.label) }),
        (r) => r.value || r.label
      ),
    },

    cases: {
      // ACF taxonomy fields return the term ID (or an array when multiple is
      // on). null when unset, which the page reads as "any category".
      categoryId: Number.isFinite(caseCategory) && caseCategory > 0 ? caseCategory : null,
      eyebrow: text(acf.cases_eyebrow),
      headingBefore: text(acf.cases_heading_before),
      headingSwitch: list(acf.cases_heading_switch),
      description: text(acf.cases_description),
    },

    method: {
      eyebrow: text(acf.method_eyebrow),
      headingBefore: text(acf.method_heading_before),
      headingSwitch: list(acf.method_heading_switch),
      steps: mapRows(
        acf.method_steps,
        (r) => ({ num: text(r?.num), title: text(r?.title), description: text(r?.description) }),
        (r) => r.title || r.description
      ),
    },

    characterBreak: {
      eyebrow: text(acf.cb_eyebrow),
      headingBefore: text(acf.cb_heading_before),
      headingSwitch: list(acf.cb_heading_switch),
      description: text(acf.cb_description),
      image: imageUrl(acf.cb_image, media),
      cta: link(acf.cb_cta_label, acf.cb_cta_url),
      badges: rows(acf.cb_badges).map((r) => text(r?.text)).filter(Boolean),
    },

    insights: {
      eyebrow: text(acf.insights_eyebrow),
      headingBefore: text(acf.insights_heading_before),
      headingSwitch: list(acf.insights_heading_switch),
      description: text(acf.insights_description),
    },

    faq: {
      eyebrow: text(acf.faq_eyebrow),
      heading: text(acf.faq_heading),
      intro: text(acf.faq_intro),
      items: mapRows(
        acf.faq_items,
        (r) => ({ q: text(r?.question), a: text(r?.answer) }),
        (r) => r.q && r.a
      ),
    },

    finalCta: {
      eyebrow: text(acf.final_eyebrow),
      headingBefore: text(acf.final_heading_before),
      headingKinetic: text(acf.final_heading_kinetic),
      description: text(acf.final_description),
      ctaPrimary: link(acf.final_cta_primary_label, acf.final_cta_primary_url),
      ctaSecondary: link(acf.final_cta_secondary_label, acf.final_cta_secondary_url),
    },
  };
}
