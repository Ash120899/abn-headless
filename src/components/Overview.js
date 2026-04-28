export default function Overview({ data }) {
  return (
    <section className="bg-[white] text-black">
      <div className="section-inner py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading text-black mb-8">
          {data.title}
        </h2>

          <p className="text-lg leading-8  text-black">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  )
}