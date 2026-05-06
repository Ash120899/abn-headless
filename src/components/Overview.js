export default function Overview({ data, heroDescription }) {
  return (
    <section className="bg-white text-black">
      <div className="section-inner max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* LEFT → OVERVIEW */}
          <div>
            <h2 className="section-heading text-black mb-6">
              {data.title}
            </h2>

            <p className="text-lg leading-8 text-black/80">
              {data.description}
            </p>
          </div>

          {/* RIGHT → HERO DESCRIPTION (ENHANCED) */}
          <div className="relative">

            {/* LEFT BORDER ACCENT */}
            <div className="border-l-2 border-orange-400 pl-6">

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">

                {/* LABEL */}
                <p className="text-xs uppercase tracking-widest text-orange-500 mb-3">
                  About the Client
                </p>

                {/* TEXT */}
                <p className="text-lg leading-8 text-gray-700">
                  {heroDescription}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}