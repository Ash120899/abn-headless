export default function Testimonial({ data }) {
  return (
    <section className="bg-black text-white py-24">
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="flex flex-col items-center lg:items-center text-center lg:text-left">
            <div className="mb-6 h-40 w-40 overflow-hidden rounded-2xl border-2 border-white/20">
              <img src={data.image} alt={data.namename} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{data.namename}</h3>
              <p className="text-lg text-slate-400">{data.role}</p>
            </div>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-200">
              {data.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}