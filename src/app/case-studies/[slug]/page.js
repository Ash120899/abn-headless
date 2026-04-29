export const runtime = 'edge';

import Hero from '@/components/Hero'
import Overview from '@/components/Overview'
import ServicesTabs from '@/components/ServicesTabs'
import CaseDetails from '@/components/CaseDetails'
import Results from '@/components/Results'

import Gallery from '@/components/Gallery'
import Testimonial from '@/components/Testimonial'
import Clients from '@/components/Clients'
import CTA from '@/components/CTA'


const WP_API_URL = 'https://abnjunction.com/wp-json/wp/v2'

async function getCaseStudy(slug) {
  try {
    const res = await fetch(
      `${WP_API_URL}/case_study?slug=${slug}`,
      { cache: 'no-store', signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) throw new Error(`Failed to fetch case study: ${res.status}`)
    const data = await res.json()
    return data[0]
  } catch (err) {
    console.error('Error fetching case study:', err)
    throw err
  }
}
export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const res = await fetch(
      `${WP_API_URL}/case_study?slug=${slug}&_embed`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) throw new Error(`Failed to fetch metadata: ${res.status}`)
    const data = await res.json()
    const post = data[0]

    if (!post) {
      return {
        title: "Case Study - ABN Junction",
        description: "Explore our case studies",
      }
    }

  // 🔥 CLEAN WP DATA
  const wpTitle = post.title?.rendered?.replace(/<[^>]+>/g, "")
  const wpExcerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, "")

  // 🔥 AIOSEO DATA (may be empty)
  const seoTitle = post.aioseo?.title
  const seoDescription = post.aioseo?.description

  // ✅ FINAL FALLBACK LOGIC
  const finalTitle = seoTitle || `${wpTitle} - ABN Junction`
  const finalDescription =
    seoDescription || wpExcerpt || "ABN Junction Case Study"

  const url = `https://abnjunction.com/case-studies/${slug}`

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
async function enrichSections(sections) {
  const newSections = []

  for (const section of sections) {
    try {
      // 🔥 SCREENSHOTS
      if (section.acf_fc_layout === "screenshots") {
        const images = []

        for (const img of section.images || []) {
          try {
            const res = await fetch(
              `${WP_API_URL}/media/${img.screenshot}`,
              { signal: AbortSignal.timeout(5000) }
            )
            if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`)
            const media = await res.json()

            images.push({
              url: media.source_url
            })
          } catch (err) {
            console.error('Error fetching screenshot:', err)
          }
        }

        newSections.push({ ...section, images })
        continue
      }

      // 🔥 TESTIMONIAL IMAGE
      if (section.acf_fc_layout === "testimonial") {
        let imageUrl = null

        if (section.images) {
          try {
            const res = await fetch(
              `${WP_API_URL}/media/${section.images}`,
              { signal: AbortSignal.timeout(5000) }
            )
            if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`)
            const media = await res.json()
            imageUrl = media.source_url
          } catch (err) {
            console.error('Error fetching testimonial image:', err)
          }
        }

        newSections.push({
          ...section,
          image: imageUrl
        })

        continue
      }

      // 🔥 CLIENT LOGOS
      if (section.acf_fc_layout === "clients_section") {
        const logos = []

        for (const logo of section.logos || []) {
          try {
            const res = await fetch(
              `${WP_API_URL}/media/${logo.image}`,
              { signal: AbortSignal.timeout(5000) }
            )
            if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`)
            const media = await res.json()

            logos.push({
              url: media.source_url
            })
          } catch (err) {
            console.error('Error fetching client logo:', err)
          }
        }

        newSections.push({ ...section, logos })
        continue
      }

      newSections.push(section)
    } catch (err) {
      console.error('Error processing section:', err)
      newSections.push(section)
    }
  }

  return newSections
}
export default async function Page({ params }) {
  const { slug } = await params
  const data = await getCaseStudy(slug)

  const rawSections = data?.acf?.content_sections || []



const sections = await enrichSections(rawSections)

  return (
    <div>

      {sections.map(( section, index) => {
        switch (section.acf_fc_layout) {

          case 'hero_section':
            return <Hero key={index} data={section} />

          case 'overview_section':
            return <Overview key={index} data={section} />

          case 'services_tabs_section':
            return <ServicesTabs key={index} data={section} />

       case 'case_details_section':
  return <CaseDetails key={index} data={section} />

          case 'results_metrics':
            return <Results key={index} data={section} />

          


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

      <CTA />

    </div>
  )

}
