"use client";

// All scroll-driven behaviour for the privacy page in one client component,
// mounted once and reading the server-rendered DOM by id — mirrors how
// ContactForm.js is the one stateful client piece on the contact page while
// its siblings (hero, marquee, channels) stay plain server components.
//
// Five responsibilities, each a straight port of the concept's single
// <script> block at the bottom of ABN_Privacy_V1_Concept.html:
//   1. Reading progress rail, measured across #policyBody only (not the
//      masthead or the closing CTA — those aren't "reading").
//   2. Scrollspy via rAF-throttled getBoundingClientRect reads rather than
//      IntersectionObserver thresholds: IO reports several long sections as
//      "intersecting" at once and flickers between them. A single "last
//      heading whose top has passed the reading line" is a one-line answer
//      that never disagrees with itself.
//   3. Gentle one-way reveals (skipped as no-ops if IntersectionObserver is
//      unavailable, or if the user prefers reduced motion — reduced motion
//      must never gate content visibility).
//   4. Clause permalink click-to-copy.
//   5. Mobile TOC auto-close on selection, and a floating back-to-top button.
import { useEffect } from "react";
import { SPY_IDS } from "@/lib/privacy-content";

export default function PrivacyScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- 1 & 2: progress rail + scrollspy, combined behind one rAF gate ----
    const bar = document.getElementById("progress");
    const body = document.getElementById("policyBody");
    const toTop = document.getElementById("totop");
    const tocDesktop = document.getElementById("tocDesktop");
    const curLabel = document.getElementById("tocCurrent");
    const links = Array.from(
      document.querySelectorAll("#tocDesktop a, #tocMobile a")
    );
    const targets = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    function progress() {
      if (!bar || !body) return;
      const r = body.getBoundingClientRect();
      const start = r.top + window.scrollY - window.innerHeight * 0.65;
      const end = r.top + window.scrollY + r.height - window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
      bar.style.width = (p * 100).toFixed(2) + "%";
      if (toTop) toTop.classList.toggle("show", window.scrollY > 700);
    }

    let active = "";
    function spy() {
      if (!targets.length) return;
      // The reading line must start below the fixed header, or a heading
      // hidden behind the bar still counts as "passed" and the index runs
      // one section ahead.
      const navh =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh")) ||
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-h")) ||
        76;
      const line = navh + window.innerHeight * 0.22;
      let found = targets[0];
      for (const t of targets) {
        if (t.getBoundingClientRect().top <= line) found = t;
        else break;
      }
      // At the true bottom of the page the last section may never cross the
      // line, so force it — otherwise the index goes dead exactly where a
      // reader is most likely to be looking for the contact route.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        found = targets[targets.length - 1];
      }
      const id = found ? found.id : "";
      if (id === active) return;
      active = id;

      let label = "";
      links.forEach((a) => {
        const on = a.getAttribute("href") === "#" + id;
        if (on) {
          a.setAttribute("aria-current", "true");
          if (!label) label = a.textContent.replace(/^—\s*/, "");
        } else {
          a.removeAttribute("aria-current");
        }
      });
      if (curLabel && label) curLabel.textContent = label;

      // Keep the active item inside the desktop rail's own scrollport when
      // the index is taller than the viewport.
      if (tocDesktop) {
        const onLink = tocDesktop.querySelector('a[aria-current="true"]');
        if (onLink && tocDesktop.scrollHeight > tocDesktop.clientHeight + 4) {
          const lr = onLink.getBoundingClientRect();
          const tr = tocDesktop.getBoundingClientRect();
          if (lr.top < tr.top + 8 || lr.bottom > tr.bottom - 8) {
            tocDesktop.scrollTop += lr.top - tr.top - tocDesktop.clientHeight / 2 + lr.height / 2;
          }
        }
      }
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        progress();
        spy();
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    progress();
    spy();

    // ---- 3: reveals ----
    // Reduced motion must never hide content — if IO is unavailable or the
    // user prefers reduced motion, everything is simply shown immediately.
    const rv = document.querySelectorAll(".rv");
    let io;
    if (reduce || !("IntersectionObserver" in window)) {
      rv.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      rv.forEach((el) => io.observe(el));
    }

    // ---- 4: clause permalinks ----
    // Copies the absolute deep link so a support agent can paste a clause
    // straight into a reply. The hash still updates natively via the plain
    // anchor href, so this degrades gracefully without clipboard permission.
    const anchorEls = Array.from(document.querySelectorAll("a.anchor"));
    const anchorHandlers = anchorEls.map((a) => {
      const handler = () => {
        const url = location.origin + location.pathname + a.getAttribute("href");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(url)
            .then(() => {
              a.classList.add("copied");
              const prev = a.textContent;
              a.textContent = "✓";
              setTimeout(() => {
                a.classList.remove("copied");
                a.textContent = prev;
              }, 1400);
            })
            .catch(() => {});
        }
      };
      a.addEventListener("click", handler);
      return { a, handler };
    });

    // ---- 5: mobile TOC auto-close + back-to-top ----
    const details = document.getElementById("tocDetails");
    const mobileLinks = details ? Array.from(document.querySelectorAll("#tocMobile a")) : [];
    const closeOnClick = () => {
      if (details) details.open = false;
    };
    mobileLinks.forEach((a) => a.addEventListener("click", closeOnClick));

    const backToTop = () => {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      document.querySelector(".skip")?.focus();
    };
    toTop?.addEventListener("click", backToTop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
      anchorHandlers.forEach(({ a, handler }) => a.removeEventListener("click", handler));
      mobileLinks.forEach((a) => a.removeEventListener("click", closeOnClick));
      toTop?.removeEventListener("click", backToTop);
    };
  }, []);

  return null;
}
