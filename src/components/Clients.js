'use client'

export default function Clients({ data }) {

  const logos = data?.logos || []

  if (logos.length === 0) return null

  // duplicate items
  const duplicated = [...logos, ...logos]

  // The track scrolls exactly one full (unique) set width per animation
  // cycle, so a fixed duration makes the scroll speed scale with however
  // many logos the CMS happens to have — more logos, same 30s, much faster
  // apparent motion. Scale duration with the logo count instead so the
  // px/s speed (and thus how "fast" it looks) stays roughly constant —
  // tuned for a slow, readable pace rather than a flashy scroll.
  const marqueeDuration = Math.max(25, logos.length * 7)

  return (
    <section className="relative bg-surface text-foreground py-[40px] md:py-24 overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      <div className="relative z-10">

        {/* HEADING */}
        <div className="text-center mb-14 px-[20px] md:px-0">

          <p className="text-xs uppercase tracking-[0.35em] text-accent mb-4">
            TRUSTED BY
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Our Clients
          </h2>

        </div>

        {/* WRAPPER */}
        <div className="clients-marquee-wrapper relative overflow-hidden w-full">

          {/* LEFT FADE */}
          <div
            className="absolute left-0 top-0 z-20 h-full w-32 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }}
          ></div>

          {/* RIGHT FADE */}
          <div
            className="absolute right-0 top-0 z-20 h-full w-32 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }}
          ></div>

          {/* TRACK */}
          <div
            className="flex w-max animate-marquee"
            style={{ animationDuration: `${marqueeDuration}s` }}
          >

            {duplicated.map((logo, i) => (

              <div
                key={i}
                className="group flex-shrink-0 mx-3"
              >

                <div className="relative flex items-center justify-center w-[180px] h-[110px] rounded-3xl border border-theme bg-surface-weak backdrop-blur-xl overflow-hidden transition duration-500">

                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.08] to-purple-500/[0.08]"></div>
                  </div>

                  {/* LOGO (white backdrop so dark/mixed-color logos stay visible against the dark glass card) */}
                  <div className="relative z-10 flex items-center justify-center w-[140px] h-[84px] rounded-2xl bg-white p-3">
                    <img
                      src={logo.url}
                      alt={`client-${i}`}
                      className="max-h-12 w-auto object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  )
}