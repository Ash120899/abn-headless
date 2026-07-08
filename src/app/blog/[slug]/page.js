import BlogPostClient from "./BlogPostClient";

export const runtime = "edge";

const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${WP_API_URL}/posts?slug=${slug}&_embed`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) throw new Error(`Failed to fetch metadata: ${res.status}`);
    const data = await res.json();
    const post = data[0];

    if (!post) {
      return {
        title: "Blog - ABN Junction",
        description: "Explore our blog",
      };
    }

    const wpTitle = post.title?.rendered?.replace(/<[^>]+>/g, "");
    const wpExcerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, "");

    // AIOSEO data is exposed by the plugin under `aioseo_head_json` (may be empty)
    const seoTitle = post.aioseo_head_json?.title;
    const seoDescription = post.aioseo_head_json?.description;

    const finalTitle = seoTitle || `${wpTitle} - ABN Junction`;
    const finalDescription = seoDescription || wpExcerpt || "ABN Junction Blog";

    const url = post.aioseo_head_json?.canonical_url || `https://abnjunction.com/blog/${slug}`;
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

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
    };
  } catch (err) {
    console.error("Error generating blog metadata:", err);
    return {
      title: "Blog - ABN Junction",
      description: "Explore our blog",
    };
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
