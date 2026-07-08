export const runtime = 'edge';

import { cache } from 'react'
import Hero from '@/components/Hero'
import Overview from '@/components/Overview'
import ServicesTabs from '@/components/ServicesTabs'
import CaseDetails from '@/components/CaseDetails'
import Results from '@/components/Results'

import Gallery from '@/components/Gallery'
import Testimonial from '@/components/Testimonial'
import Clients from '@/components/Clients'
import CTA from '@/components/CTA'
import OtherCasesSlider from '@/components/OtherCasesSlider'
import OtherBlogsSlider from '@/components/OtherBlogsSlider'


const WP_API_URL = 'https://abnjunction.com/wp-json/wp/v2'

// cache() memoizes this per-request, so generateMetadata and Page share one fetch instead of two
const getCaseStudy = cache(async (slug) => {
  try {
    const res = await fetch(
      `${WP_API_URL}/case_study?slug=${slug}&_embed`,
      { cache: 'no-store', signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) throw new Error(`Failed to fetch case study: ${res.status}`)
    const data = await res.json()
    return data[0]
  } catch (err) {
    console.error('Error fetching case study:', err)
    throw err
  }
})
export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const post = await getCaseStudy(slug)

    if (!post) {
      return {
        title: "Case Study - ABN Junction",
        description: "Explore our case studies",
      }
    }

  // 🔥 CLEAN WP DATA
  const wpTitle = post.title?.rendered?.replace(/<[^>]+>/g, "")
  const wpExcerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, "")

  // 🔥 AIOSEO DATA (exposed by the plugin under `aioseo_head_json`, may be empty)
  const seoTitle = post.aioseo_head_json?.title
  const seoDescription = post.aioseo_head_json?.description

  // ✅ FINAL FALLBACK LOGIC
  const finalTitle = seoTitle || `${wpTitle} - ABN Junction`
  const finalDescription =
    seoDescription || wpExcerpt || "ABN Junction Case Study"

  const url = post.aioseo_head_json?.canonical_url || `https://abnjunction.com/case-studies/${slug}`

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null

  return {
    title: finalTitle,
    description: finalDescription,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: "ABN Junction",
      images: featuredImage ? [{ url: featuredImage }] : [],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: featuredImage ? [featuredImage] : [],
    },
  }
  } catch (err) {
    console.error('Error generating metadata:', err)
    return {
      title: "Case Study - ABN Junction",
      description: "Explore our case studies",
    }
  }
}
async function fetchMediaUrl(id) {
  const res = await fetch(`${WP_API_URL}/media/${id}`, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`)
  const media = await res.json()
  return media.source_url
}

// Resolves every section concurrently, and every image/logo within a section
// concurrently too, instead of awaiting them one at a time.
async function enrichSections(sections) {
  return Promise.all(
    sections.map(async (section) => {
      try {
        // 🔥 SCREENSHOTS
        if (section.acf_fc_layout === "screenshots") {
          const resolvedImages = await Promise.all(
            (section.images || []).map(async (img) => {
              try {
                return { url: await fetchMediaUrl(img.screenshot) }
              } catch (err) {
                console.error('Error fetching screenshot:', err)
                return null
              }
            })
          )

          return { ...section, images: resolvedImages.filter(Boolean) }
        }

        // 🔥 TESTIMONIAL IMAGE
        if (section.acf_fc_layout === "testimonial") {
          let imageUrl = null

          if (section.images) {
            try {
              imageUrl = await fetchMediaUrl(section.images)
            } catch (err) {
              console.error('Error fetching testimonial image:', err)
            }
          }

          return { ...section, image: imageUrl }
        }

        // 🔥 CLIENT LOGOS
        if (section.acf_fc_layout === "clients_section") {
          const resolvedLogos = await Promise.all(
            (section.logos || []).map(async (logo) => {
              try {
                return { url: await fetchMediaUrl(logo.image) }
              } catch (err) {
                console.error('Error fetching client logo:', err)
                return null
              }
            })
          )

          return { ...section, logos: resolvedLogos.filter(Boolean) }
        }

        // 🔥 HERO DARK-MODE IMAGE OVERRIDE (ACF may return an attachment ID, an image array, or a URL)
        if (section.acf_fc_layout === "hero_section" && section.hero_image_dark) {
          let heroImageDark = section.hero_image_dark

          if (heroImageDark && typeof heroImageDark === "object") {
            heroImageDark = heroImageDark.url || null
          } else if (/^\d+$/.test(String(heroImageDark))) {
            try {
              heroImageDark = await fetchMediaUrl(heroImageDark)
            } catch (err) {
              console.error('Error fetching hero dark image:', err)
              heroImageDark = null
            }
          }

          return { ...section, hero_image_dark: heroImageDark }
        }

        return section
      } catch (err) {
        console.error('Error processing section:', err)
        return section
      }
    })
  )
}
export default async function Page({ params }) {
  const { slug } = await params
  const data = await getCaseStudy(slug)

  const rawSections = data?.acf?.content_sections || []



const sections = await enrichSections(rawSections)


const caseDetails = sections.find(
  (s) => s.acf_fc_layout === 'case_details_section'
)

const metrics = caseDetails?.metrics || []
const heroSection = sections.find(
  (s) => s.acf_fc_layout === 'hero_section'
)

const heroDesc = heroSection?.client_description
  return (
    <div>

      {sections.map(( section, index) => {
        switch (section.acf_fc_layout) {

        case 'hero_section':
  return <Hero key={index} data={section} metrics={metrics} />

          case 'overview_section':
            return    <Overview
      key={index}
      data={section}
      heroDescription={heroDesc}
    />

          case 'services_tabs_section':
            return <ServicesTabs key={index} data={section} />

       case 'case_details_section':
  return <CaseDetails key={index} data={section} />

         

          


          case "screenshots":
    return <Gallery key={index} data={section} />

         case "testimonial":
    return <Testimonial key={index} data={section} />

          case 'clients_section':
                return <Clients key={index} data={section} />

          default:
            return null
        }
      })}

      <OtherCasesSlider currentSlug={slug} />
      <OtherBlogsSlider currentSlug={slug} />

      <CTA />

    </div>
  )

}
