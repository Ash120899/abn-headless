export default function Clients({ data }) {
  const clientLabels = [
    "Astra",
    "Health",
    "Medici",
    "Healing",
    "Workza"
  ];

  return (
    <section className="bg-black text-white py-24">
      <div className="section-inner">
        <div className="text-center mb-12">
          <h2 className="section-heading text-white text-5xl">CLIENTS</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 max-w-6xl mx-auto">
          {data.logos?.map((logo, i) => (
            <div key={i} className="text-center">
        
              <div className="flex items-center justify-center rounded-[28px] bg-white/5 p-5 h-32">
                <img src={logo.url} alt={clientLabels[i]} className="max-h-16 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}