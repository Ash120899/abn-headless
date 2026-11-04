"use client";

// The interactive lab: visitors answer a few steps (pill choices and an
// optional slider) and a live "control room" preview rewrites itself from
// their answers. "Get my plan" opens LeadModal, which sends the answers as
// an enquiry. Ported from the concept's updateCampaign() script.
//
// The concept hard-codes one performance-marketing lab. Here every step,
// option and preview line comes from the page's ACF, so each sub-service
// gets its own lab and its own brief:
//  - KPI tiles: a slider step shows its value (and a per-day figure when
//    "per day label" is set); a choice step with a KPI label shows the
//    picked option's short value. Slider tiles come first, as in the concept.
//  - Plan title / funnel outcome: the first picked option that sets one,
//    else the section defaults.
//  - Plan text: the picked options' sentences joined with "; ", then each
//    slider's sentence with {value} filled in. The default plan text only
//    shows when no option contributes a sentence.
import { useId, useMemo, useRef, useState } from "react";
import Lines from "./Lines";
import LeadModal from "./LeadModal";

function formatValue(step, value) {
  return `${step.prefix}${Math.round(value).toLocaleString("en-IN")}`;
}

export default function CampaignLab({ lab, pageTitle, serviceTitle }) {
  const gradientId = useId();
  const requestRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [picks, setPicks] = useState(() =>
    lab.steps.map((s) => (s.type === "range" ? s.defaultValue : 0))
  );

  const preview = useMemo(() => {
    const chosen = lab.steps.map((s, i) => (s.type === "choices" ? s.options[picks[i]] : null));
    const options = chosen.filter(Boolean);

    const kpis = [];
    lab.steps.forEach((s, i) => {
      if (s.type !== "range") return;
      if (s.kpiLabel) kpis.push({ label: s.kpiLabel, value: formatValue(s, picks[i]) });
      if (s.perDayLabel) kpis.push({ label: s.perDayLabel, value: formatValue(s, picks[i] / 30) });
    });
    lab.steps.forEach((s, i) => {
      if (s.type === "choices" && s.kpiLabel && chosen[i]) {
        kpis.push({ label: s.kpiLabel, value: chosen[i].kpi || chosen[i].label });
      }
    });

    const sentences = options.map((o) => o.planText).filter(Boolean);
    const rangeSentences = lab.steps
      .map((s, i) => (s.type === "range" && s.planText ? s.planText.replaceAll("{value}", formatValue(s, picks[i])) : ""))
      .filter(Boolean);
    const planText = sentences.length
      ? [`${sentences.join("; ")}.`, ...rangeSentences].join(" ")
      : [lab.planText, ...rangeSentences].filter(Boolean).join(" ");

    const funnel = [...lab.funnel];
    const outcome = options.find((o) => o.outcome)?.outcome;
    if (outcome && funnel.length) funnel[funnel.length - 1] = outcome;

    // The enquiry brief: each step's question with the visitor's answer.
    const brief = lab.steps.map((s, i) => ({
      question: s.question || s.label,
      answer: s.type === "range" ? formatValue(s, picks[i]) : chosen[i]?.label || "",
    }));

    return {
      kpis,
      planTitle: options.find((o) => o.planTitle)?.planTitle || lab.planTitle,
      planText,
      funnel,
      brief,
    };
  }, [lab, picks]);

  if (!lab.steps.length) return null;

  function pick(stepIndex, value) {
    setPicks((prev) => prev.map((v, i) => (i === stepIndex ? value : v)));
  }

  return (
    <>
      <section className="lab" id="campaign-lab">
        <div className="wrap">
          <div className="sectionhead reveal">
            {lab.eyebrow ? <div className="eyebrow">{lab.eyebrow}</div> : null}
            {lab.heading.length || lab.headingHighlight ? (
              <h2>
                <Lines lines={lab.heading} />
                {lab.headingHighlight ? (
                  <>
                    {lab.heading.length ? <br /> : null}
                    <span className="hl">{lab.headingHighlight}</span>
                  </>
                ) : null}
              </h2>
            ) : null}
            {lab.description ? <p>{lab.description}</p> : null}
          </div>

          <div className="lab-layout">
            <div className="lab-controls reveal">
              {lab.steps.map((s, i) => (
                <fieldset className="lab-step" key={`${i}-${s.question}`}>
                  {s.label ? <div className="stepno">{s.label}</div> : null}
                  <legend>{s.question}</legend>
                  {s.type === "range" ? (
                    <>
                      <div className="lab-range">
                        <strong>{formatValue(s, picks[i])}</strong>
                        {s.caption ? <span>{s.caption}</span> : null}
                      </div>
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={picks[i]}
                        aria-label={s.question}
                        aria-valuetext={formatValue(s, picks[i])}
                        onChange={(e) => pick(i, Number(e.target.value))}
                      />
                      {s.minLabel || s.maxLabel ? (
                        <div className="lab-range">
                          <span>{s.minLabel}</span>
                          <span>{s.maxLabel}</span>
                        </div>
                      ) : null}
                      {s.note ? <p className="lab-note">{s.note}</p> : null}
                    </>
                  ) : (
                    <div className="choices">
                      {s.options.map((o, j) => (
                        <button
                          type="button"
                          key={`${j}-${o.label}`}
                          className={`choice${picks[i] === j ? " selected" : ""}`}
                          aria-pressed={picks[i] === j}
                          onClick={() => pick(i, j)}
                        >
                          {o.icon ? (
                            <span className="choice-icon" aria-hidden="true">
                              {o.icon}
                            </span>
                          ) : null}
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </fieldset>
              ))}
            </div>

            <aside className="lab-preview reveal" aria-label={lab.previewTitle || undefined}>
              {lab.previewTitle || lab.previewBadge ? (
                <div className="lab-preview-top">
                  <strong>{lab.previewTitle}</strong>
                  {lab.previewBadge ? <span className="lab-live">{lab.previewBadge}</span> : null}
                </div>
              ) : null}
              <div className="lab-screen">
                {preview.kpis.length ? (
                  <div className="lab-kpis">
                    {preview.kpis.map((k) => (
                      <div className="lab-kpi" key={k.label}>
                        <small>{k.label}</small>
                        <strong>{k.value}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="lab-chart">
                  {lab.chartLabel ? <div className="lab-chart-label">{lab.chartLabel}</div> : null}
                  {/* Illustrative line, the same for every input: the lab
                      deliberately never forecasts results from the answers. */}
                  <svg viewBox="0 0 440 155" aria-hidden="true">
                    <defs>
                      <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#7ce9d2" stopOpacity=".28" />
                        <stop offset="1" stopColor="#7ce9d2" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M5 35H435M5 75H435M5 115H435" stroke="#3b5159" strokeDasharray="4 6" />
                    <path
                      d="M5 135 C60 132 73 109 120 113 S187 90 228 82 S294 74 332 46 S395 40 435 17 L435 150 L5 150 Z"
                      fill={`url(#${gradientId})`}
                    />
                    <path
                      d="M5 135 C60 132 73 109 120 113 S187 90 228 82 S294 74 332 46 S395 40 435 17"
                      fill="none"
                      stroke="#7ce9d2"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="435" cy="17" r="6" fill="#7ce9d2" />
                  </svg>
                  {preview.funnel.length ? (
                    <div className="lab-funnel" style={{ "--funnel-count": preview.funnel.length }}>
                      {preview.funnel.map((f, i) => (
                        <span key={i}>{f}</span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {preview.planTitle || preview.planText ? (
                  <div className="lab-summary" aria-live="polite">
                    {preview.planTitle ? <h3>{preview.planTitle}</h3> : null}
                    {preview.planText ? <p>{preview.planText}</p> : null}
                  </div>
                ) : null}

                <div className="lab-action">
                  {lab.ctaLabel ? (
                    <button type="button" ref={requestRef} onClick={() => setOpen(true)}>
                      {lab.ctaLabel}
                    </button>
                  ) : null}
                  {lab.replayLabel ? <a href="#journey">{lab.replayLabel}</a> : null}
                </div>
                {lab.disclaimer ? <p className="lab-disclaimer">{lab.disclaimer}</p> : null}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {open ? (
        <LeadModal
          lead={lab.lead}
          brief={preview.brief}
          planTitle={preview.planTitle}
          pageTitle={pageTitle}
          serviceTitle={serviceTitle}
          returnFocusRef={requestRef}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
