// Folds an ACF payload over a base content object, field by field.
//
// Lives in its own module because two callers need it and they must not
// import each other:
//   - wp-service.js   merges a live WordPress payload at request time
//   - service-content.js merges the local acf/content/*.mjs files so the
//     built-in defaults are per-service even before WordPress is seeded
//
// Every field is optional. A blank string, an empty repeater or a missing
// key all fall through to the base value, so a half-filled page in WP still
// renders completely  which is what makes it safe to import the field group
// before anyone has typed anything.
//
// Field names here mirror acf/service-page-fields.json exactly.
// --- small helpers -------------------------------------------------------
// `pick` is the whole fallback story: use the ACF value only when it's
// actually present. Note `0` and `false` are deliberately kept.
function pick(value, fallback) {
  if (value === undefined || value === null) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

// Affixes are the exception to `pick`: an empty prefix or suffix is a real,
// meaningful value ("5", not "5x"), and most services want one blank where
// another has a symbol. Falling back on "" would silently inherit the other
// service's multiplication sign, plus or rupee symbol. So here, a row that
// supplies the key at all wins; only a genuinely absent key falls back.
function affix(row, key, fallback) {
  return key in row && typeof row[key] === "string" ? row[key] : fallback;
}

// ACF repeaters come back as arrays of objects; an untouched one can be
// false or "". Normalise to a real array before mapping.
function rows(value) {
  return Array.isArray(value) ? value : [];
}

// Comma-separated text field -> trimmed array ("engine, system").
function list(value, fallback) {
  if (typeof value !== "string" || value.trim() === "") return fallback;
  const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length ? parts : fallback;
}

// An ACF image set to return_format "url" is already a string. Guard against
// installs configured to return an object or a bare attachment ID instead,
// so a mis-set field degrades to the default rather than rendering [object].
function imageUrl(value, fallback) {
  if (typeof value === "string" && value.trim() !== "") return value;
  if (value && typeof value === "object" && typeof value.url === "string") return value.url;
  return fallback;
}

function link(label, url, fallback) {
  return { label: pick(label, fallback.label), href: pick(url, fallback.href) };
}

// Maps a repeater, falling back wholesale to the default list when empty.
// Per-row fields still fall back individually against the matching default
// row where one exists, so adding a row with only a title filled in doesn't
// produce blanks for the rest.
function mapRows(value, fallback, mapRow) {
  const list = rows(value);
  if (!list.length) return fallback;
  return list.map((row, i) => mapRow(row, fallback[i] || {}));
}

/**
 * Folds a page's ACF payload over the code defaults for that slug.
 * Exported separately from the fetch so it can be reasoned about (and
 * tested) without the network.
 */
export function mergeServiceContent(base, acf) {
  if (!acf || typeof acf !== "object") return base;

  const theme = {
    ...base.theme,
    primary: pick(acf.color_primary, base.theme.primary),
    primaryLight: pick(acf.color_primary_light, base.theme.primaryLight),
    accent: pick(acf.color_accent, base.theme.accent),
  };

  return {
    ...base,
    theme,
    metaDescription: pick(acf.meta_description, base.metaDescription),

    hero: {
      ...base.hero,
      eyebrow: pick(acf.hero_eyebrow, base.hero.eyebrow),
      headingBefore: pick(acf.hero_heading_before, base.hero.headingBefore),
      headingHighlight: pick(acf.hero_heading_highlight, base.hero.headingHighlight),
      headingAfter: pick(acf.hero_heading_after, base.hero.headingAfter),
      headingKinetic: pick(acf.hero_heading_kinetic, base.hero.headingKinetic),
      description: pick(acf.hero_description, base.hero.description),
      ctaPrimary: link(acf.hero_cta_primary_label, acf.hero_cta_primary_url, base.hero.ctaPrimary),
      ctaSecondary: link(acf.hero_cta_secondary_label, acf.hero_cta_secondary_url, base.hero.ctaSecondary),
      character: imageUrl(acf.hero_character, base.hero.character),
      stats: mapRows(acf.hero_stats, base.hero.stats, (r, d) => ({
        prefix: affix(r, "prefix", d.prefix ?? ""),
        value: pick(r.value, d.value ?? ""),
        suffix: affix(r, "suffix", d.suffix ?? ""),
        label: pick(r.label, d.label ?? ""),
      })),
      tools: mapRows(acf.hero_tools, base.hero.tools, (r, d) => ({
        glyph: pick(r.glyph, d.glyph ?? ""),
        label: pick(r.label, d.label ?? ""),
      })),
    },

    journey: {
      ...base.journey,
      eyebrow: pick(acf.journey_eyebrow, base.journey.eyebrow),
      headingBefore: pick(acf.journey_heading_before, base.journey.headingBefore),
      headingSwitch: list(acf.journey_heading_switch, base.journey.headingSwitch),
      description: pick(acf.journey_description, base.journey.description),
      scenes: mapRows(acf.journey_scenes, base.journey.scenes, (r, d) => ({
        num: pick(r.num, d.num ?? ""),
        title: pick(r.title, d.title ?? ""),
        description: pick(r.description, d.description ?? ""),
        chips: list(r.chips, d.chips ?? []),
        link: link(r.link_label, r.link_url, d.link || { label: "", href: "#" }),
        image: imageUrl(r.image, d.image ?? null),
      })),
    },

    marquee: {
      rowOne: pick(acf.marquee_row_one, base.marquee.rowOne),
      rowTwo: pick(acf.marquee_row_two, base.marquee.rowTwo),
    },

    system: {
      ...base.system,
      eyebrow: pick(acf.system_eyebrow, base.system.eyebrow),
      headingBefore: pick(acf.system_heading_before, base.system.headingBefore),
      headingKinetic: pick(acf.system_heading_kinetic, base.system.headingKinetic),
      description: pick(acf.system_description, base.system.description),
      nodes: mapRows(acf.system_nodes, base.system.nodes, (r, d) => ({
        num: pick(r.num, d.num ?? ""),
        title: pick(r.title, d.title ?? ""),
        description: pick(r.description, d.description ?? ""),
      })),
    },

    cinema: {
      ...base.cinema,
      eyebrow: pick(acf.cinema_eyebrow, base.cinema.eyebrow),
      words: list(acf.cinema_words, base.cinema.words),
      description: pick(acf.cinema_description, base.cinema.description),
      scrollHint: pick(acf.cinema_scroll_hint, base.cinema.scrollHint),
      depthCards: mapRows(acf.cinema_depth_cards, base.cinema.depthCards, (r, d) => ({
        label: pick(r.label, d.label ?? ""),
        title: pick(r.title, d.title ?? ""),
        note: pick(r.note, d.note ?? ""),
      })),
      handoff: mapRows(acf.cinema_handoff, base.cinema.handoff, (r, d) => ({
        image: imageUrl(r.image, d.image ?? null),
        roleFx: pick(r.role_fx, d.roleFx ?? ""),
        caption: pick(r.caption, d.caption ?? ""),
      })),
    },

    proof: {
      ...base.proof,
      eyebrow: pick(acf.proof_eyebrow, base.proof.eyebrow),
      headingBefore: pick(acf.proof_heading_before, base.proof.headingBefore),
      headingKinetic: pick(acf.proof_heading_kinetic, base.proof.headingKinetic),
      items: mapRows(acf.proof_items, base.proof.items, (r, d) => ({
        prefix: affix(r, "prefix", d.prefix ?? ""),
        value: pick(r.value, d.value ?? ""),
        suffix: affix(r, "suffix", d.suffix ?? ""),
        label: pick(r.label, d.label ?? ""),
      })),
    },

    cases: {
      ...base.cases,
      // ACF taxonomy fields return the term ID (or an array when multiple is
      // on). Coerce to a single number so the fetch can use it directly.
      categoryId: (() => {
        const raw = Array.isArray(acf.cases_category) ? acf.cases_category[0] : acf.cases_category;
        const n = Number(raw);
        return Number.isFinite(n) && n > 0 ? n : base.cases.categoryId;
      })(),
      eyebrow: pick(acf.cases_eyebrow, base.cases.eyebrow),
      headingBefore: pick(acf.cases_heading_before, base.cases.headingBefore),
      headingSwitch: list(acf.cases_heading_switch, base.cases.headingSwitch),
      description: pick(acf.cases_description, base.cases.description),
    },

    method: {
      ...base.method,
      eyebrow: pick(acf.method_eyebrow, base.method.eyebrow),
      headingBefore: pick(acf.method_heading_before, base.method.headingBefore),
      headingSwitch: list(acf.method_heading_switch, base.method.headingSwitch),
      steps: mapRows(acf.method_steps, base.method.steps, (r, d) => ({
        num: pick(r.num, d.num ?? ""),
        title: pick(r.title, d.title ?? ""),
        description: pick(r.description, d.description ?? ""),
      })),
    },

    characterBreak: {
      ...base.characterBreak,
      eyebrow: pick(acf.cb_eyebrow, base.characterBreak.eyebrow),
      headingBefore: pick(acf.cb_heading_before, base.characterBreak.headingBefore),
      headingSwitch: list(acf.cb_heading_switch, base.characterBreak.headingSwitch),
      description: pick(acf.cb_description, base.characterBreak.description),
      image: imageUrl(acf.cb_image, base.characterBreak.image),
      cta: link(acf.cb_cta_label, acf.cb_cta_url, base.characterBreak.cta),
      badges: (() => {
        const list = rows(acf.cb_badges).map((r) => r.text).filter((t) => typeof t === "string" && t.trim());
        return list.length ? list : base.characterBreak.badges;
      })(),
    },

    insights: {
      ...base.insights,
      eyebrow: pick(acf.insights_eyebrow, base.insights.eyebrow),
      headingBefore: pick(acf.insights_heading_before, base.insights.headingBefore),
      headingSwitch: list(acf.insights_heading_switch, base.insights.headingSwitch),
    },

    faq: {
      ...base.faq,
      eyebrow: pick(acf.faq_eyebrow, base.faq.eyebrow),
      heading: pick(acf.faq_heading, base.faq.heading),
      intro: pick(acf.faq_intro, base.faq.intro),
      items: mapRows(acf.faq_items, base.faq.items, (r, d) => ({
        q: pick(r.question, d.q ?? ""),
        a: pick(r.answer, d.a ?? ""),
      })),
    },

    finalCta: {
      ...base.finalCta,
      eyebrow: pick(acf.final_eyebrow, base.finalCta.eyebrow),
      headingBefore: pick(acf.final_heading_before, base.finalCta.headingBefore),
      headingKinetic: pick(acf.final_heading_kinetic, base.finalCta.headingKinetic),
      description: pick(acf.final_description, base.finalCta.description),
      ctaPrimary: link(acf.final_cta_primary_label, acf.final_cta_primary_url, base.finalCta.ctaPrimary),
      ctaSecondary: link(acf.final_cta_secondary_label, acf.final_cta_secondary_url, base.finalCta.ctaSecondary),
    },
  };
}
