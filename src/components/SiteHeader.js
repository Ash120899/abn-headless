"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const MENUS = [
  { key: "services", label: "Services" },
  { key: "case", label: "Case Studies" },
  { key: "resources", label: "Resources" },
];

// Same links as the desktop mega menus, flattened for the mobile accordion.
const MOBILE_MENU_LINKS = {
  services: [
    { label: "Digital Marketing", href: "https://abnjunction.com/services/digital-marketing/" },
    { label: "Graphics & Web Design", href: "https://abnjunction.com/services/web-and-graphic-design/" },
    { label: "Web Development", href: "https://abnjunction.com/services/web-development/" },
    { label: "Video Production", href: "https://abnjunction.com/services/video-production/" },
    { label: "Data & Web Security", href: "https://abnjunction.com/services/web-data-security/" },
    { label: "Performance Marketing", href: "#" },
    { label: "Google Ads", href: "#" },
    { label: "Meta Ads", href: "#" },
    { label: "SEO", href: "https://abnjunction.com/services/digital-marketing/seo/" },
    { label: "Social Media", href: "https://abnjunction.com/services/digital-marketing/social-media-marketing/" },
  ],
  case: [
    { label: "Performance Marketing Cases", href: "#" },
    { label: "SEO Growth Cases", href: "#" },
    { label: "Web & Conversion Cases", href: "#" },
    { label: "Creative & Video Cases", href: "#" },
    { label: "View All Case Studies", href: "https://abnjunction.com/case-studies/" },
  ],
  resources: [
    { label: "Blog", href: "https://abnjunction.com/blogs/" },
    { label: "Guides", href: "#" },
    { label: "Marketing Glossary", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Tools & Applications", href: "#" },
    { label: "Calculators", href: "#" },
    { label: "Templates", href: "#" },
    { label: "ABN Updates", href: "#" },
  ],
};

const CLOSE_DELAY = 200;

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const rootRef = useRef(null);
  const closeTimeoutRef = useRef(null);

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

  function toggleMobile() {
    setOpenMenu(null);
    setMobileExpanded(null);
    setMobileOpen((v) => !v);
  }

  function toggleMobileSection(key) {
    setMobileExpanded((cur) => (cur === key ? null : key));
  }

  function closeAll() {
    clearCloseTimer();
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }

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
            <a className="site-nav-link" href="https://abnjunction.com/about-us/" onClick={closeAll}>
              About Us
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
              >
                {m.label} ▾
              </button>
            ))}
            <a className="site-nav-link" href="https://abnjunction.com/contact-us/" onClick={closeAll}>
              Contact
            </a>
          </nav>

          <div className="site-header-actions">
            <a className="site-cta outline" href="https://abnjunction.com/case-studies/" onClick={closeAll}>
              See Results
            </a>
            <a className="site-cta" href="https://abnjunction.com/contact-us/">
              Book a Strategy Call →
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="site-mobile-btn"
              aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* SERVICES MEGA MENU */}
      <section
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
              <a className="site-core-item" href="https://abnjunction.com/services/digital-marketing/" onClick={closeAll}>
                <span>
                  <strong>Digital Marketing</strong>
                  <small>Paid, organic, social, CRM and analytics</small>
                </span>
                <b>01</b>
              </a>
              <a className="site-core-item" href="https://abnjunction.com/services/web-and-graphic-design/" onClick={closeAll}>
                <span>
                  <strong>Graphics &amp; Web Design</strong>
                  <small>Branding, UX/UI, landing pages and creatives</small>
                </span>
                <b>02</b>
              </a>
              <a className="site-core-item" href="https://abnjunction.com/services/web-development/" onClick={closeAll}>
                <span>
                  <strong>Web Development</strong>
                  <small>Next.js, WordPress, Shopify and custom builds</small>
                </span>
                <b>03</b>
              </a>
              <a className="site-core-item" href="https://abnjunction.com/services/video-production/" onClick={closeAll}>
                <span>
                  <strong>Video Production</strong>
                  <small>Campaign films, social video and motion</small>
                </span>
                <b>04</b>
              </a>
              <a className="site-core-item" href="https://abnjunction.com/services/web-data-security/" onClick={closeAll}>
                <span>
                  <strong>Data &amp; Web Security</strong>
                  <small>Tracking, privacy, hardening and monitoring</small>
                </span>
                <b>05</b>
              </a>
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Digital Marketing</div>
            <div className="site-mega-links">
              <a href="#" onClick={closeAll}>Performance Marketing</a>
              <a href="#" onClick={closeAll}>Google Ads</a>
              <a href="#" onClick={closeAll}>Meta Ads</a>
              <a href="https://abnjunction.com/services/digital-marketing/seo/" onClick={closeAll}>SEO</a>
              <a href="https://abnjunction.com/services/digital-marketing/social-media-marketing/" onClick={closeAll}>Social Media</a>
              <a href="https://abnjunction.com/services/digital-marketing/email-whatsapp-marketing/" onClick={closeAll}>Email, WhatsApp &amp; CRM</a>
              <a href="#" onClick={closeAll}>Analytics &amp; Conversion Tracking</a>
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Explore</div>
            <div className="site-mega-links">
              <Link href="/#junction" onClick={closeAll}>How Services Connect</Link>
              <Link href="/#process" onClick={closeAll}>How We Work</Link>
              <a href="https://abnjunction.com/case-studies/" onClick={closeAll}>See Results</a>
              <a href="https://abnjunction.com/contact-us/" onClick={closeAll}>Discuss Your Project</a>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES MEGA MENU */}
      <section
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
              <strong>9×</strong>
              <h3>ROAS Growth System</h3>
              <p>Paid media, shopping and SEO working as one commercial system.</p>
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-links">
              <a href="#" onClick={closeAll}>Performance Marketing Cases</a>
              <a href="#" onClick={closeAll}>SEO Growth Cases</a>
              <a href="#" onClick={closeAll}>Web &amp; Conversion Cases</a>
              <a href="#" onClick={closeAll}>Creative &amp; Video Cases</a>
              <a href="https://abnjunction.com/case-studies/" onClick={closeAll}>View All Case Studies</a>
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCES MEGA MENU */}
      <section
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
              <a href="https://abnjunction.com/blogs/" onClick={closeAll}>Blog</a>
              <a href="#" onClick={closeAll}>Guides</a>
              <a href="#" onClick={closeAll}>Marketing Glossary</a>
              <a href="#" onClick={closeAll}>FAQs</a>
            </div>
          </div>
          <div className="site-mega-col">
            <div className="site-mega-title">Use</div>
            <div className="site-mega-links">
              <a href="#" onClick={closeAll}>Tools &amp; Applications</a>
              <a href="#" onClick={closeAll}>Calculators</a>
              <a href="#" onClick={closeAll}>Templates</a>
              <a href="#" onClick={closeAll}>ABN Updates</a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="site-mobile-nav">
          <a href="https://abnjunction.com/about-us/" onClick={closeAll}>About Us</a>

          {MENUS.map((m) => (
            <div key={m.key} className="site-mobile-accordion">
              <button
                type="button"
                className={`site-mobile-accordion-btn ${mobileExpanded === m.key ? "open" : ""}`}
                onClick={() => toggleMobileSection(m.key)}
                aria-expanded={mobileExpanded === m.key}
              >
                {m.label}
                <span className="site-mobile-accordion-caret">▾</span>
              </button>
              {mobileExpanded === m.key && (
                <div className="site-mobile-accordion-panel">
                  {MOBILE_MENU_LINKS[m.key].map((item) => (
                    <a key={item.label} href={item.href} onClick={closeAll}>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="https://abnjunction.com/contact-us/" onClick={closeAll}>Contact</a>
          <a className="site-cta" href="https://abnjunction.com/contact-us/" onClick={closeAll}>
            Book a Strategy Call →
          </a>
        </div>
      )}
    </div>
  );
}
