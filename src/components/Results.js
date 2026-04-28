export default function Results({ data }) {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {data.metrics?.map((item, i) => (
          <div key={i} className="flex gap-4 bg-white p-4">

            <img src={item.icon} className="w-12 h-12" />

            <div>
              <h3 className="text-xl font-bold">{item.value}</h3>
              <p>{item.label}</p>
            </div>

          </div>
        ))}

      </div>
    </section>
  )
}