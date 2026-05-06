'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonial({ data }) {
  const sectionRef = useRef(null)

  /*
  |--------------------------------------------------------------------------
  | NORMALIZE
  |--------------------------------------------------------------------------
  */

  const testimonials = data?.testimonials?.length
    ? data.testimonials
    : [
        {
          images: data.images || data.image,
          name: data.name,
          role: data.role,
          text: data.text,
        },
      ]

  /*
  |--------------------------------------------------------------------------
  | GSAP
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.from('.testimonial-heading', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })

    gsap.from('.testimonial-slider', {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full"></div>

      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADING */}
        <div className="testimonial-heading text-center mb-16">

          <p className="text-orange-400 uppercase tracking-[0.35em] text-xs mb-4">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            What Our Clients Say
          </h2>

        </div>

        {/* SWIPER */}
        <div className="testimonial-slider">

          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            
            loop={true}
            speed={1000}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={10}
            breakpoints={{
              1024: {
                slidesPerView: 1.25,
              },
            }}
            className="pb-16"
          >

            {testimonials.map((item, i) => {
              const imageUrl =
                item?.images?.url ||
                item?.images ||
                item?.image?.url ||
                item?.image ||
                null

              return (
   <SwiperSlide key={i}>

  <div className="group relative max-w-4xl mx-auto">

    {/* OUTER GLOW */}
    <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-orange-500/20 via-pink-500/10 to-purple-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>

    {/* GLASS CARD */}
    <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden px-6 md:px-8 py-6 md:py-7 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">

      {/* TOP GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] via-transparent to-purple-500/[0.05] pointer-events-none"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">

        {/* LEFT */}
        <div className="flex md:flex-col items-center md:items-center gap-4 min-w-[180px]">

          {/* IMAGE */}
          <div className="relative flex-shrink-0">

            {/* IMAGE GLOW */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-pink-500/30 blur-xl rounded-2xl opacity-80"></div>

            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-xl">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                  No Image
                </div>
              )}

            </div>

          </div>

          {/* NAME */}
          <div className="pt-1">

            <h3 className="text-base font-semibold text-white leading-tight">
              {item.name}
            </h3>

            <p className="text-sm text-white/50 mt-1">
              {item.role}
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex-1">

          {/* QUOTE */}
          <div className="text-orange-400 text-3xl leading-none mb-0 opacity-90">
            “
          </div>

          {/* TEXT */}
          <p className="text-[15px] md:text-[17px] leading-8 text-white/75 font-light">
            {item.text}
          </p>

        </div>

      </div>

    </div>

  </div>

</SwiperSlide>
              )
            })}

          </Swiper>

        </div>

      </div>
    </section>
  )
}