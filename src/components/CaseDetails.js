export default function CaseDetails({ data }) {
  return (
    <section className="bg-[#111111] text-white py-24">
      <div className="section-inner">
        <div className="grid gap-16 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="space-y-12 lg:sticky lg:top-24 lg:self-start">

          {/* Campaign Challenges */}
          <div className="space-y-6">
            <h2 className="section-heading text-white">{data.challenges_title}</h2>
            <ul className="space-y-4">
              {data.challenges?.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-200">
                  <span className="mt-1 text-[0.8rem] text-accent">➤</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="section-heading text-white">{data.result_metric_title}</h2>
            <div className="grid gap-4">
              {data.metrics?.map((item, i) => (
                <div key={i} className="flex gap-4 rounded-[32px] border border-white/10 bg-white/5 p-5">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-16 w-16 object-contain rounded-3xl p-3 bg-white/5"
                  />
                  <div>
                    <p className="text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>

        {/* RIGHT SIDE */}
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-4xl font-semibold">Challenge</h2>
            <p className="text-slate-300 leading-8 whitespace-pre-line">{data.challenge_text}</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-4xl font-semibold">Objectives</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-300">
              {data.objectives?.map((item, i) => (
                <li key={i}>{item.text}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-4xl font-semibold">{data.strategy_title}</h2>
            <div className="text-slate-300 leading-8" dangerouslySetInnerHTML={{ __html: data.strategy_text }} />
          </section>

          <section className="space-y-6">
            <h2 className="text-4xl font-semibold">{data.screens_title}</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-300">
              {data.screens?.map((item, i) => (
                <li key={i}>{item.text}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-4xl font-semibold">{data.results_title}</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-300">
              {data.results?.map((item, i) => (
                <li key={i}>{item.text}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
    </section>
  )
}