export default function Gallery({ data }) {
  return (
    <section className="bg-white text-black py-24">
      <div className="section-inner">
        <div className="text-center">
          <h2 className="section-heading text-black mb-16 text-center">Screenshots</h2>
          <div className="flex flex-col gap-8 items-center screenshot-parent">
            {data.images?.map((img, i) => (
              <div key={i} className="max-w-3xl w-full rounded-[28px] overflow-hidden border border-gray-200">
                <img src={img.url} alt={`Screenshot ${i + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}