"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import useFocusTrap from "@/hooks/useFocusTrap";
import {
  PRIMARY_LINKS,
  CTA_LINK,
  SERVICE_PILLARS,
  SERVICE_DETAILS,
  DIGITAL_MARKETING_LINKS,
  SERVICES_EXPLORE_LINKS,
  CASE_STUDY_FEATURED,
  CASE_STUDY_LINKS,
  RESOURCE_LEARN_LINKS,
  RESOURCE_USE_LINKS,
} from "@/data/navigation";

const MENUS = [
  { key: "services", label: "Services" },
  { key: "case", label: "Case Studies" },
  { key: "resources", label: "Resources" },
];

const TOP_LEVEL_BACK_TARGET = {
  services: "main",
  case: "main",
  resources: "main",
};

function servicePanelKey(pillarKey) {
  return `service-${pillarKey}`;
}

function backTargetFor(panel) {
  if (panel.startsWith("service-")) return "services";
  return TOP_LEVEL_BACK_TARGET[panel] || "main";
}

const CLOSE_DELAY = 200;
const PANEL_TRANSITION_MS = 280;

// Internal anchors ("/#section") use next/link; everything else is an
// external WordPress URL or a placeholder "#".
function ExploreLink({ href, children, onClick }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}

const MOBILE_SERVICES_EXPLORE_LINKS = SERVICES_EXPLORE_LINKS.filter(
  (l) => l.label !== "View All Services" && l.label !== "See Results"
);

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mobile drill-down panel state.
  const [activePanel, setActivePanel] = useState("main");
  const [leavingPanel, setLeavingPanel] = useState(null);
  const [navDirection, setNavDirection] = useState(null); // "forward" | "back" | null
  const [enteringPrimed, setEnteringPrimed] = useState(true);

  const rootRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  function clearCloseTimer() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  // The mega panel is position:fixed and visually detached from the nav
  // button that opens it, so a single mouseleave can't tell "moving from
  // button down into panel" apart from "actually leaving both". A short
  // delay lets the pointer transit between the two before we close.
  function scheduleClose() {
    clearCloseTimer();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, CLOSE_DELAY);
  }

  function openOnHover(key) {
    clearCloseTimer();
    setMobileOpen(false);
    setOpenMenu(key);
  }

  function toggleMenu(key) {
    clearCloseTimer();
    setMobileOpen(false);
    setOpenMenu((cur) => (cur === key ? null : key));
  }

  function resetPanels() {
    setActivePanel("main");
    setLeavingPanel(null);
    setNavDirection(null);
    setEnteringPrimed(true);
  }

  function toggleMobile() {
    setOpenMenu(null);
    const opening = !mobileOpen;
    setMobileOpen(opening);
    if (!opening) resetPanels();
  }

  function openPanel(key) {
    setLeavingPanel(activePanel);
    setNavDirection("forward");
    setEnteringPrimed(true);
    setActivePanel(key);
  }

  function goBackPanel() {
    const target = backTargetFor(activePanel);
    setLeavingPanel(activePanel);
    setNavDirection("back");
    setEnteringPrimed(false);
    setActivePanel(target);
  }

  function closeAll() {
    clearCloseTimer();
    setOpenMenu(null);
    setMobileOpen(false);
    resetPanels();
  }

  // Force the incoming panel on a back-navigation to start pinned at its
  // "-40%, off left" resting spot with no transition, then flip to .active
  // on the next frame so the browser animates it in from the left. Without
  // this the panel may have already settled at its default off-right spot
  // and would re-enter from the wrong side.
  useEffect(() => {
    if (navDirection !== "back" || enteringPrimed) return;
    const raf = requestAnimationFrame(() => setEnteringPrimed(true));
    return () => cancelAnimationFrame(raf);
  }, [navDirection, enteringPrimed]);

  // Clear the leaving panel once its exit transition has finished.
  useEffect(() => {
    if (!leavingPanel) return;
    const t = setTimeout(() => {
      setLeavingPanel(null);
      setNavDirection(null);
    }, PANEL_TRANSITION_MS);
    return () => clearTimeout(t);
  }, [leavingPanel]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  useFocusTrap(drawerRef, mobileOpen, { returnFocusRef: hamburgerRef });

  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    function onKeyDown(e) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
      clearCloseTimer();
    };
  }, []);

  function panelClassName(key) {
    if (key === activePanel) {
      if (navDirection === "back" && !enteringPrimed) {
        return "site-mobile-panel pending-left";
      }
      return "site-mobile-panel active";
    }
    if (key === leavingPanel) {
      return navDirection === "forward" ? "site-mobile-panel exit-left" : "site-mobile-panel";
    }
    return "site-mobile-panel";
  }

  return (
    <div ref={rootRef}>
      <header className="site-header">
        <div className="wrap site-header-inner">
          <Link className="site-logo" href="/" onClick={closeAll}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abnjunction.com/wp-content/uploads/2026/07/abn-logo.webp"
              alt="ABN Junction"
              className="site-logo-img"
            />
          </Link>

          <nav className="site-nav" aria-label="Primary">
            <a className="site-nav-link" href={PRIMARY_LINKS.aboutUs.href} onClick={closeAll}>
              {PRIMARY_LINKS.aboutUs.label}
            </a>
            {MENUS.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`site-nav-btn ${openMenu === m.key ? "open" : ""}`}
                onClick={() => toggleMenu(m.key)}
                onMouseEnter={() => openOnHover(m.key)}
                onMouseLeave={scheduleClose}
                aria-expanded={openMenu === m.key}
                aria-controls={`site-mega-${m.key}`}
              >
                {m.label} ▾
              </button>
            ))}
            <a className="site-nav-link" href={PRIMARY_LINKS.contact.href} onClick={closeAll}>
              {PRIMARY_LINKS.contact.label}
            </a>
          </nav>

          <div className="site-header-actions">
            <a className="site-cta outline" href="https://abnjunction.com/case-studies/" onClick={closeAll}>
              See Results
            </a>
            <a className="site-cta" href={CTA_LINK.href}>
              {CTA_LINK.label}
            </a>
            <ThemeToggle />
            <button
              ref={hamburgerRef}
              type="button"
              className="site-mobile-btn"
              aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileOpen}
              aria-controls="site-mobile-drawer"
              onClick={toggleMobile}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* SERVICES MEGA MENU */}
      <section
        id="site-mega-services"
        className={`site-mega ${openMenu === "services" ? "open" : ""}`}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="site-mega-grid">
          <div className="site-mega-col">
            <div className="site-eyebrow">Five core service pillars</div>
            <h2>Everything your growth story needs—under one junction.</h2>
            <p className="site-muted">
              Digital marketing, design, development, video and security, working as one connected system.
            </p>
            <div className="site-core-list">
              {SERVICE_PILLARS.map((p) => (
                <a key={p.key} className="site-core-item" href={p.href} onClick={closeAll}>
                  <span>
                    <strong>{p.label}</strong>
                    <small>{p.blurb}</small>
                  </span>
                  <b>{p.num}</b>
                </a>
              ))}
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Digital Marketing</div>
            <div className="site-mega-links">
              {DIGITAL_MARKETING_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Explore</div>
            <div className="site-mega-links">
              {SERVICES_EXPLORE_LINKS.map((l) => (
                <ExploreLink key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </ExploreLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES MEGA MENU */}
      <section
        id="site-mega-case"
        className={`site-mega ${openMenu === "case" ? "open" : ""}`}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="site-mega-grid">
          <div className="site-mega-col">
            <div className="site-eyebrow">Proof before promises</div>
            <h2>Real challenges. Connected solutions. Measurable outcomes.</h2>
            <p className="site-muted">Every case study opens into a complete story, not just a number.</p>
          </div>
          <div className="site-mega-col">
            <div className="site-case-chip">
              <strong>{CASE_STUDY_FEATURED.multiplier}</strong>
              <h3>{CASE_STUDY_FEATURED.title}</h3>
              <p>{CASE_STUDY_FEATURED.blurb}</p>
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-links">
              {CASE_STUDY_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCES MEGA MENU */}
      <section
        id="site-mega-resources"
        className={`site-mega ${openMenu === "resources" ? "open" : ""}`}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="site-mega-grid">
          <div className="site-mega-col">
            <div className="site-eyebrow">Resources</div>
            <h2>Knowledge your audience can actually use.</h2>
            <p className="site-muted">Blogs, guides, tools and updates worth coming back for.</p>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Learn</div>
            <div className="site-mega-links">
              {RESOURCE_LEARN_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Use</div>
            <div className="site-mega-links">
              {RESOURCE_USE_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE NAV */}
      <div
        className={`site-mobile-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={closeAll}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        id="site-mobile-drawer"
        className={`site-mobile-nav ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="site-mobile-nav-body">
          <section id="site-mobile-panel-main" className={panelClassName("main")}>
            <a className="site-mobile-row" href={PRIMARY_LINKS.aboutUs.href} onClick={closeAll}>
              {PRIMARY_LINKS.aboutUs.label}
            </a>
            <button
              type="button"
              className="site-mobile-row"
              aria-expanded={activePanel === "services"}
              aria-controls="site-mobile-panel-services"
              onClick={() => openPanel("services")}
            >
              Services <span className="chev">▾</span>
            </button>
            <button
              type="button"
              className="site-mobile-row"
              aria-expanded={activePanel === "case"}
              aria-controls="site-mobile-panel-case"
              onClick={() => openPanel("case")}
            >
              Case Studies <span className="chev">▾</span>
            </button>
            <button
              type="button"
              className="site-mobile-row"
              aria-expanded={activePanel === "resources"}
              aria-controls="site-mobile-panel-resources"
              onClick={() => openPanel("resources")}
            >
              Resources <span className="chev">▾</span>
            </button>
            <a className="site-mobile-row" href={PRIMARY_LINKS.contact.href} onClick={closeAll}>
              {PRIMARY_LINKS.contact.label}
            </a>
          </section>

          <section id="site-mobile-panel-services" className={panelClassName("services")}>
            <div className="site-mobile-screen-head">
              <button type="button" className="site-mobile-back" onClick={goBackPanel} aria-label="Back to main menu">
                ← Main menu
              </button>
              <h2>Services</h2>
              <p>Five connected service pillars. Everything your growth story needs under one junction.</p>
            </div>
            <div className="site-mobile-cards">
              {SERVICE_PILLARS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className="site-mobile-card"
                  aria-expanded={activePanel === servicePanelKey(p.key)}
                  aria-controls={`site-mobile-panel-${servicePanelKey(p.key)}`}
                  onClick={() => openPanel(servicePanelKey(p.key))}
                >
                  <span className="num">{p.num}</span>
                  <span>
                    <strong>{p.label}</strong>
                    <small>{p.blurb}</small>
                  </span>
                  <span className="arrow">→</span>
                </button>
              ))}
            </div>
            <div className="site-mobile-group-label">Explore</div>
            <div className="site-mobile-simple-list">
              {MOBILE_SERVICES_EXPLORE_LINKS.map((l) => (
                <ExploreLink key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </ExploreLink>
              ))}
            </div>
          </section>

          {SERVICE_PILLARS.map((p) => {
            const detail = SERVICE_DETAILS[p.key];
            const panelKey = servicePanelKey(p.key);
            return (
              <section key={panelKey} id={`site-mobile-panel-${panelKey}`} className={panelClassName(panelKey)}>
                <div className="site-mobile-screen-head">
                  <button type="button" className="site-mobile-back" onClick={goBackPanel} aria-label="Back to all services">
                    ← All Services
                  </button>
                  <div className="site-eyebrow">{detail.eyebrow}</div>
                  <h2>{p.label}</h2>
                  <p>{detail.description}</p>
                </div>
                <div className="site-mobile-simple-list">
                  {detail.links.map((l) => (
                    <a key={l.label} href={l.href} onClick={closeAll}>
                      {l.label}
                    </a>
                  ))}
                </div>
                <a
                  className="site-cta"
                  style={{ width: "100%", marginTop: 16 }}
                  href={p.href}
                  onClick={closeAll}
                >
                  Explore {p.label} →
                </a>
              </section>
            );
          })}

          <section id="site-mobile-panel-case" className={panelClassName("case")}>
            <div className="site-mobile-screen-head">
              <button type="button" className="site-mobile-back" onClick={goBackPanel} aria-label="Back to main menu">
                ← Main menu
              </button>
              <h2>Case Studies</h2>
              <p>Proof before promises.</p>
            </div>
            <div className="site-mobile-featured">
              <div className="site-eyebrow">Featured case study</div>
              <b>{CASE_STUDY_FEATURED.multiplier}</b>
              <h3>{CASE_STUDY_FEATURED.title}</h3>
              <p>{CASE_STUDY_FEATURED.blurb}</p>
              <a className="site-cta" style={{ width: "100%" }} href={CASE_STUDY_FEATURED.href} onClick={closeAll}>
                View Case Study →
              </a>
            </div>
            <div className="site-mobile-group-label">Browse by capability</div>
            <div className="site-mobile-simple-list">
              {CASE_STUDY_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
          </section>

          <section id="site-mobile-panel-resources" className={panelClassName("resources")}>
            <div className="site-mobile-screen-head">
              <button type="button" className="site-mobile-back" onClick={goBackPanel} aria-label="Back to main menu">
                ← Main menu
              </button>
              <h2>Resources</h2>
              <p>Knowledge and tools worth returning for.</p>
            </div>
            <div className="site-mobile-group-label">Learn</div>
            <div className="site-mobile-simple-list">
              {RESOURCE_LEARN_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="site-mobile-group-label">Use</div>
            <div className="site-mobile-simple-list">
              {RESOURCE_USE_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={closeAll}>
                  {l.label}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="site-mobile-drawer-cta">
          <a className="site-cta" href={CTA_LINK.href} onClick={closeAll}>
            {CTA_LINK.label}
          </a>
        </div>
      </div>
    </div>
  );
}
