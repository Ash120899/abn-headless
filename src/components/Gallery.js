'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Gallery({ data }) {
  const images = data.images || []

  if (!images.length) return null

  // The widest breakpoint below shows 2 slides at once, and Swiper's loop
  // mode needs meaningfully more real slides than that to duplicate for a
  // seamless loop — with too few it spams "Loop Warning" on every resize
  // and its internal loop-fix can misbehave visibly.
  const canLoop = images.length > 2

  return (
    <section className="bg-background text-foreground py-24">
      <div className="section-inner max-w-6xl mx-auto px-4 md:px-6 screenshot-section">

        {/* TITLE */}
        <h2 className="section-heading text-foreground mb-16 text-center">
          Screenshots
        </h2>

        {/* SLIDER */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: images.length > 1 }}
          loop={canLoop}
          className="!pb-14"
          breakpoints={{
  768: { slidesPerView: 1 },
  1024: { slidesPerView: 2 }
}}

        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-[28px] overflow-hidden border border-theme shadow-lg">

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