// Turns a sub-service page's ACF payload into the shape the sub-service
// components render. Sub-service pages are the children of a service page
// (/services/<service>/<sub-service>/).
//
// Same rules as service-acf.js: WordPress is the only source. A field left
// blank comes through empty and its component draws nothing; repeater rows
// with nothing in them are dropped. The one thing a sub-service inherits is
// from its PARENT service page in WP (never from code): accent colours and
// the case-study category, when its own are blank.
//
// Field names here mirror acf/subservice-page-fields.json exactly.

// --- small helpers -------------------------------------------------------

// ACF text fields come back as a string, or false / null / "" when untouched.
function text(value) {
  if (typeof value === "number") return String(value);
  return typeof value === "string" ? value.trim() : "";
}

// ACF repeaters come back as arrays of objects; an untouched one can be
// false or "". Normalise to a real array before mapping.
function rows(value) {
  return Array.isArray(value) ? value : [];
}

// Comma-separated text field -> trimmed array ("Search, Funnel").
function list(value) {
  if (typeof value !== "string") return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

// Textarea -> one entry per non-empty line. Headings use this for their
// line breaks ("CLICKS ARE COMING.\nIS BUSINESS GROWING?"), and the story
// panels for their checklist rows.
function lines(value) {
  if (typeof value !== "string") return [];
  return value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

// Numeric field -> finite number, or null when blank/invalid.
function num(value) {
  if (value === "" || value === null || value === undefined || value === false) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// ACF image fields come back as a URL string, an object with .url, or a
// bare attachment ID (looked up in `media`, which maps id -> {url, alt}).
// Anything else is null: no image.
function image(value, media) {
  if (typeof value === "string" && value.trim() !== "") return { url: value, alt: "" };
  if (value && typeof value === "object" && typeof value.url === "string") {
    return { url: value.url, alt: text(value.alt) };
  }
  const id = Number(value);
  if (Number.isFinite(id) && id > 0 && media?.[id]) return media[id];
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

// Taxonomy fields return the term ID, or an array when multiple is on.
function termId(value) {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Every attachment ID used by an image field, so they can all be resolved
 * in a single media request rather than one per image.
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

  add(acf.hero_image);
  add(acf.diff_image);

  return [...ids];
}

// One Campaign Lab step. "choices" steps are a row of pills, "range" steps
// a slider. Each pill can feed the live preview: a short KPI value, the
// plan title, a plan sentence and the funnel's final stage.
function labStep(r) {
  const type = text(r?.type) === "range" ? "range" : "choices";
  const base = {
    type,
    label: text(r?.label),
    question: text(r?.question),
    kpiLabel: text(r?.kpi_label),
  };

  if (type === "range") {
    const min = num(r?.range_min);
    const max = num(r?.range_max);
    const value = num(r?.range_default);
    return {
      ...base,
      min,
      max,
      step: num(r?.range_step) || 1,
      // A default outside the range (or none) starts the slider at its min.
      defaultValue: value !== null && min !== null && max !== null && value >= min && value <= max ? value : min,
      prefix: typeof r?.range_prefix === "string" ? r.range_prefix : "",
      caption: text(r?.range_caption),
      minLabel: text(r?.range_min_label),
      maxLabel: text(r?.range_max_label),
      note: text(r?.range_note),
      perDayLabel: text(r?.range_per_day_label),
      planText: text(r?.range_plan_text),
    };
  }

  return {
    ...base,
    options: mapRows(
      r?.options,
      (o) => ({
        label: text(o?.label),
        icon: text(o?.icon),
        kpi: text(o?.kpi),
        planTitle: text(o?.plan_title),
        planText: text(o?.plan_text),
        outcome: text(o?.outcome),
      }),
      (o) => o.label
    ),
  };
}

/**
 * Builds the sub-service content object from one page's ACF payload.
 * `media` maps attachment IDs to {url, alt}. `parent` carries the parent
 * service page's own ACF (colours and case-study category), used only
 * where this page leaves those blank.
 */
export function buildSubserviceContent(acf, media, parent = {}) {
  const parentAcf = parent.acf || {};

  const steps = mapRows(acf.lab_steps, labStep, (s) =>
    s.type === "range" ? s.min !== null && s.max !== null && s.max > s.min : s.options.length > 0
  );

  return {
    theme: {
      primary: color(acf.color_primary) || color(parentAcf.color_primary),
      primaryLight: color(acf.color_primary_light) || color(parentAcf.color_primary_light),
      accent: color(acf.color_accent) || color(parentAcf.color_accent),
    },
    metaDescription: text(acf.meta_description),
    crumbLabel: text(acf.crumb_label),

    hero: {
      eyebrow: text(acf.hero_eyebrow),
      headingBefore: text(acf.hero_heading_before),
      headingHighlight: text(acf.hero_heading_highlight),
      headingAfter: text(acf.hero_heading_after),
      description: text(acf.hero_description),
      ctaPrimary: link(acf.hero_cta_primary_label, acf.hero_cta_primary_url),
      ctaSecondary: link(acf.hero_cta_secondary_label, acf.hero_cta_secondary_url),
      image: image(acf.hero_image, media),
      tags: mapRows(
        acf.hero_tags,
        (r) => ({ icon: text(r?.icon), text: text(r?.text) }),
        (r) => r.text
      ).slice(0, 3),
      highlights: list(acf.hero_highlights),
    },

    marquee: {
      rowOne: list(acf.marquee_row_one),
      rowTwo: list(acf.marquee_row_two),
    },

    rail: {
      location: text(acf.rail_location),
      labels: {
        problems: text(acf.rail_problems),
        offers: text(acf.rail_offers),
        journey: text(acf.rail_journey),
        lab: text(acf.rail_lab),
        difference: text(acf.rail_difference),
        cases: text(acf.rail_cases),
        related: text(acf.rail_related),
        insights: text(acf.rail_insights),
        faq: text(acf.rail_faq),
      },
    },

    problems: {
      eyebrow: text(acf.problems_eyebrow),
      heading: lines(acf.problems_heading),
      description: text(acf.problems_description),
      items: mapRows(
        acf.problems_items,
        (r) => ({
          label: text(r?.label),
          symbol: text(r?.symbol),
          title: text(r?.title),
          description: text(r?.description),
        }),
        (r) => r.title || r.description
      ),
    },

    offers: {
      eyebrow: text(acf.offers_eyebrow),
      heading: lines(acf.offers_heading),
      description: text(acf.offers_description),
      moreLabel: text(acf.offers_more_label),
      lessLabel: text(acf.offers_less_label),
      items: mapRows(
        acf.offers_items,
        (r) => ({
          icon: text(r?.icon),
          title: text(r?.title),
          description: text(r?.description),
          detail: text(r?.detail),
        }),
        (r) => r.title || r.description
      ),
    },

    journey: {
      eyebrow: text(acf.journey_eyebrow),
      heading: lines(acf.journey_heading),
      description: text(acf.journey_description),
      scrollHint: text(acf.journey_scroll_hint),
      slides: mapRows(
        acf.journey_slides,
        (r) => ({
          step: text(r?.step),
          title: text(r?.title),
          description: text(r?.description),
          icon: text(r?.icon),
          panelTitle: text(r?.panel_title),
          panelItems: lines(r?.panel_items),
        }),
        (r) => r.title || r.description
      ),
    },

    lab: {
      eyebrow: text(acf.lab_eyebrow),
      heading: lines(acf.lab_heading),
      headingHighlight: text(acf.lab_heading_highlight),
      description: text(acf.lab_description),
      steps,
      previewTitle: text(acf.lab_preview_title),
      previewBadge: text(acf.lab_preview_badge),
      chartLabel: text(acf.lab_chart_label),
      funnel: list(acf.lab_funnel),
      planTitle: text(acf.lab_plan_title),
      planText: text(acf.lab_plan_text),
      ctaLabel: text(acf.lab_cta_label),
      replayLabel: text(acf.lab_replay_label),
      disclaimer: text(acf.lab_disclaimer),
      lead: {
        // Contact Form 7 form the enquiry posts to. Blank uses the site's
        // shared enquiry form (see LeadForm.js).
        formId: num(acf.lead_form_id),
        servicesLabel: text(acf.lead_services_label),
        eyebrow: text(acf.lead_eyebrow),
        heading: text(acf.lead_heading),
        description: text(acf.lead_description),
        consent: text(acf.lead_consent),
        submitLabel: text(acf.lead_submit_label),
        successMessage: text(acf.lead_success_message),
        errorMessage: text(acf.lead_error_message),
      },
    },

    difference: {
      eyebrow: text(acf.diff_eyebrow),
      heading: lines(acf.diff_heading),
      description: text(acf.diff_description),
      image: image(acf.diff_image, media),
      imageLabel: text(acf.diff_image_label),
      points: mapRows(
        acf.diff_points,
        (r) => ({ title: text(r?.title), description: text(r?.description) }),
        (r) => r.title || r.description
      ),
    },

    cases: {
      // null when neither this page nor its parent picks a term, which the
      // page reads as "any category".
      categoryId: termId(acf.cases_category) ?? termId(parentAcf.cases_category),
      eyebrow: text(acf.cases_eyebrow),
      heading: lines(acf.cases_heading),
      description: text(acf.cases_description),
      cardLabel: text(acf.cases_card_label),
      linkLabel: text(acf.cases_link_label),
    },

    related: {
      eyebrow: text(acf.related_eyebrow),
      heading: lines(acf.related_heading),
      description: text(acf.related_description),
      items: mapRows(
        acf.related_items,
        (r) => ({
          title: text(r?.title),
          description: text(r?.description),
          href: text(r?.url),
          linkLabel: text(r?.link_label),
        }),
        (r) => r.title && r.href
      ),
    },

    insights: {
      categoryId: termId(acf.insights_category),
      eyebrow: text(acf.insights_eyebrow),
      heading: lines(acf.insights_heading),
      headingSwitch: list(acf.insights_heading_switch),
      description: text(acf.insights_description),
      linkLabel: text(acf.insights_link_label),
    },

    faq: {
      eyebrow: text(acf.faq_eyebrow),
      heading: lines(acf.faq_heading),
      intro: text(acf.faq_intro),
      items: mapRows(
        acf.faq_items,
        (r) => ({ q: text(r?.question), a: text(r?.answer) }),
        (r) => r.q && r.a
      ),
    },

    finalCta: {
      eyebrow: text(acf.final_eyebrow),
      heading: lines(acf.final_heading),
      description: text(acf.final_description),
      cta: link(acf.final_cta_label, acf.final_cta_url),
    },
  };
}
