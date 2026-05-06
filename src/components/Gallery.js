'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Gallery({ data }) {
  const images = data.images || []

  if (!images.length) return null

  return (
    <section className="bg-white text-black py-24">
      <div className="section-inner max-w-6xl mx-auto px-4 md:px-6">

        {/* TITLE */}
        <h2 className="section-heading text-black mb-16 text-center">
          Screenshots
        </h2>

        {/* SLIDER */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoscroll={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          autoPlay={{ delay: 3000 }}
          className="!pb-14"
          breakpoints={{
  768: { slidesPerView: 1 },
  1024: { slidesPerView: 2 }
}}

        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-[28px] overflow-hidden border border-gray-200 shadow-lg">

                <img
                  src={img.url}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-auto object-cover transition duration-500 hover:scale-[1.02]"
                />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}