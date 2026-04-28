export default function Hero({ data }) {
  return (
    <section className="bg-black text-white">
      <div className="section-inner min-h-[680px] flex items-center py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(320px,420px)] items-center">
          <div className="max-w-2xl">
            <h1 className="section-heading text-white tracking-[-0.04em]">
              {data.title}
            </h1>
            <p className="mt-8 text-lg leading-8 text-slate-300">
              {data.description}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={data.image}
              alt={data.title}
              className="w-full max-w-[420px] rounded-[28px] border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}