"use client";

import { useRef } from "react";

export default function BannerBlog({ title, paragraph, image, link, cta }) {
  if (!title && !paragraph && !image) return null;

  const frameRef = useRef(null);

  function handleMouseMove(e) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <section className="max-w-[1760px] mx-auto px-[20px] py-[40px] lg:px-10 lg:py-0 lg:pb-[120px]">
      <div className="relative rounded-[40px] border border-theme bg-surface overflow-hidden">

        {/* AMBIENT GLOW */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full blur-[140px] bg-orange-500/20" />
          <div className="absolute bottom-[-140px] right-[-100px] w-[460px] h-[460px] rounded-full blur-[150px] bg-purple-500/20" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_560px] gap-14 lg:gap-8 items-center p-8 md:p-12 lg:p-16">

          {/* TEXT */}
          <div className="max-w-[560px]">

            <p className="text-[11px] tracking-[4px] uppercase text-accent font-semibold mb-6">Free Resource</p>

            {title && (
              <h3 className="text-[34px] md:text-[52px] leading-[1.05] tracking-[-2px] font-[600] text-foreground">
                {title}
              </h3>
            )}

            {paragraph && (
              <p className="mt-6 text-muted text-[16px] md:text-[18px] leading-[1.8]">
                {paragraph}
              </p>
            )}

            {link && cta && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full text-[16px] font-medium hover:scale-[1.03] transition"
              >
                {cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            )}

          </div>

          {/* FLOATING PREVIEW WINDOW */}
          {image && (
            <div className="relative">

              {/* FLOATING BADGE */}
              <div className="hidden lg:flex absolute -top-5 -right-5 z-20 items-center gap-2 bg-accent text-white text-[12px] font-medium px-4 py-2.5 rounded-full shadow-lg shadow-orange-500/30 rotate-3">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v13" />
                  <path d="M6 11l6 6 6-6" />
                  <path d="M5 21h14" />
                </svg>
                Instant Access
              </div>

              <div
                ref={frameRef}
                onMouseMove={handleMouseMove}
                className="group relative rounded-[24px] border border-white/10 bg-[#0b0b0f] shadow-2xl overflow-hidden transition-transform duration-700 ease-out lg:[transform:perspective(1400px)_rotateY(-8deg)_rotateX(3deg)] lg:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]"
                style={{ "--spot-x": "50%", "--spot-y": "0%" }}
              >

                {/* CURSOR SPOTLIGHT */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(280px circle at var(--spot-x) var(--spot-y), rgba(249,115,22,0.28), transparent 70%)",
                  }}
                />

                {/* CHROME BAR */}
                <div className="relative flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />

                  <div className="ml-3 flex-1 flex items-center gap-1.5 bg-white/[0.07] rounded-full px-3 py-1.5 text-[11px] text-white/50 truncate">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    docs.google.com
                  </div>
                </div>

                {/* SCREEN */}
                <div className="relative p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={title || "Free resource preview"}
                    className="w-full h-auto object-contain rounded-[12px]"
                  />
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
