'use client'

export default function Results({ data }) {
  const metrics = data?.metrics || []

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-5xl font-semibold mb-12">
          Campaign Results:
        </h2>

        {/* CARDS */}
        <div className="flex flex-col gap-6">

          {metrics.map((item, i) => (
    <div
  key={i}
  className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-5 shadow-xl hover:scale-[1.03] transition"
>
  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
    <img
      src={item.icon?.url || item.icon}
      alt={item.label}
      className="w-6 h-6 object-contain"
    />
  </div>

  <div>
    <p className="text-xl font-semibold text-white">
      {item.value}
    </p>
    <p className="text-sm text-white/70">
      {item.label}
    </p>
  </div>
</div>
          ))}

        </div>
      </div>
    </section>
  )
}