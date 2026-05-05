'use client'

export default function Hero({ data }) {
  const {
    title,
    subtitle,
    backgroundImage,
    stats = [],
  } = data || {}

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        
        {/* Small label */}
        <p className="text-white/70 tracking-widest text-sm uppercase mb-4">
          Case Study
        </p>

        {/* Breadcrumb */}
        <p className="text-sm text-white/60 mb-6">
          <span className="text-orange-500">Case Studies</span> / {subtitle}
        </p>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight max-w-5xl uppercase">
          {title}
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 -mb-20">
          
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#EAEAEA] rounded-2xl p-6 flex-1 shadow-lg"
            >
              <h3 className="text-3xl font-bold text-orange-600 mb-2">
                {item.value}
              </h3>
              <p className="text-gray-700">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Spacer (for overlap) */}
      <div className="h-32 bg-white"></div>
    </section>
  )
}