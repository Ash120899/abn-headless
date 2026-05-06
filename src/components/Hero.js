'use client'

export default function Hero({ data, metrics = [] }) {
  return (
    <section className="hero-section relative text-white overflow-hidden">

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-10 pb-6">

        {/* TITLE + LOGO */}
        <div className="flex items-center gap-4 mb-6 animate-fadeUp [animation-delay:0.1s]">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {data.title}
          </h1>

          {data.image && (
            <div className="bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-lg">
              <img
                src={data.image}
                alt={data.title}
                className="h-10 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* LABEL */}
        <p className="text-xs tracking-[0.3em] text-white/100 mb-3 animate-fadeUp [animation-delay:0.2s] font-bold">
          CASE STUDY
        </p>

        {/* BREADCRUMB */}
        <p className="text-sm text-white/70 mb-8 animate-fadeUp [animation-delay:0.25s]">
          <a
            href="https://abnjunction.com/case-studies"
            className="text-orange-400 hover:underline font-semibold"
          >
            Case Studies
          </a>{' '}
          / {data.title}
        </p>

        {/* MAIN HEADING */}
        <h2 className="text-2xl md:text-4xl font-semibold max-w-3xl leading-tight text-white/90 animate-fadeUp [animation-delay:0.3s]">
          {data.title}’s Successful Partnership with ABN Junction
        </h2>

        {/* STATS */}
        {metrics.length > 0 && (
          <div className="relative mt-12 animate-fadeUp [animation-delay:0.4s]">

            {/* GLOW BACKGROUND */}
            <div className="absolute -inset-10 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 blur-3xl opacity-60"></div>

            {/* GRID */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

              {metrics.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-2xl"
                >
                  {/* ICON */}
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center transition group-hover:scale-110">
                    <img
                      src={item.icon?.url || item.icon}
                      alt={item.label}
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="text-lg md:text-xl font-semibold text-white group-hover:text-orange-300">
                      {item.value}
                    </p>
                    <p className="text-xs md:text-sm text-white/70">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </section>
  )
}