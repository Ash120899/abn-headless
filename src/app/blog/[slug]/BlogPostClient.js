"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import * as cheerio from "cheerio";
import OtherCasesSlider from "@/components/OtherCasesSlider";
import OtherBlogsSlider from "@/components/OtherBlogsSlider";
import DNAParallax from "@/components/DNAParallax";
import CTA from "@/components/CTA";
import useTheme from "@/hooks/useTheme";

const WP_API_URL =
  "https://abnjunction.com/wp-json/wp/v2";

// ACF may return the dark-mode featured image as an attachment ID, an image array, or a URL depending on field config
async function resolveImageValue(value) {
  if (!value) return null;

  if (typeof value === "object") {
    return value.url || null;
  }

  if (/^\d+$/.test(String(value))) {
    try {
      const res = await fetch(`${WP_API_URL}/media/${value}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`);
      const media = await res.json();
      return media.source_url;
    } catch (err) {
      console.error("Error resolving featured_image_dark:", err);
      return null;
    }
  }

  return value;
}

async function getBlogPost(slug) {

  try {

    const res = await fetch(
      `${WP_API_URL}/posts?slug=${slug}&_embed`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    const data = await res.json();
    const post = data[0];

    if (post) {
      post.acf = {
        ...post.acf,
        featured_image_dark: await resolveImageValue(post.acf?.featured_image_dark),
      };
    }

    return post;

  } catch (err) {

    console.error(err);

    return null;
  }
}

export default function BlogPostClient({ slug }) {

  const [post, setPost] = useState(null);

  const [progress, setProgress] =
    useState(0);

  const theme = useTheme();

  // FETCH POST
  useEffect(() => {

    async function fetchPost() {

      const data =
        await getBlogPost(slug);

      setPost(data);
    }

    fetchPost();

  }, [slug]);

  // SCROLL PROGRESS
  useEffect(() => {

    const handleScroll = () => {

      const totalHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const scrollProgress =
        (window.scrollY /
          totalHeight) *
        100;

      setProgress(scrollProgress);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  // TOC + CONTENT IDs
  const {
    contentWithIds,
    toc,
  } = useMemo(() => {

    if (!post?.content?.rendered) {

      return {
        contentWithIds: "",
        toc: [],
      };
    }

    const $ = cheerio.load(
      post.content.rendered
    );

    const tocItems = [];

    $("h2").each((i, el) => {

      const text = $(el).text();

      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      $(el).attr("id", id);

      tocItems.push({
        id,
        text,
      });
    });

    return {
      contentWithIds: $.html(),
      toc: tocItems,
    };

  }, [post]);

  if (!post) {

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  const lightFeaturedImage =
    post?._embedded?.[
      "wp:featuredmedia"
    ]?.[0]?.source_url;

  // Optional per-theme override, set via an ACF "featured_image_dark" field in WP admin
  const darkFeaturedImage = post?.acf?.featured_image_dark || null;

  const featuredImage =
    theme === "dark"
      ? darkFeaturedImage || lightFeaturedImage
      : lightFeaturedImage;

  return (

    <main className="bg-background text-foreground min-h-screen font-[Outfit]">

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-surface-2 z-[9999]">

        <div
          className={"h-full bg-accent transition-all duration-150"}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-theme"
        style={
          featuredImage
            ? {
                backgroundImage: `url(${featuredImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >

        {/* BACKGROUND: decorative glow when there's no featured image, dark overlay for legibility when there is */}
        {featuredImage ? (
          <div className="absolute inset-0 z-0" style={{ background: "var(--overlay)" }} />
        ) : (
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full blur-[140px] bg-orange-500/20" />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full blur-[160px] bg-purple-500/20" />
          </div>
        )}

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 pb-24">

          {/* BREADCRUMB */}
          <div className="text-[14px] text-muted mb-12">
            <span className="text-accent">Home</span>
            {" / "}
            <span className="text-accent">Blog</span>
            {" / "}
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>

          {/* TITLE */}
          <h1 className="max-w-[980px] text-[54px] md:text-[72px] leading-[1.03] tracking-[-3px] font-[600] text-foreground" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          {/* META */}
          <div className="flex items-center justify-between flex-wrap gap-8 mt-14">

            {/* AUTHOR */}
            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-full overflow-hidden border border-theme">
                <img src="https://i.pravatar.cc/100" alt="author" className="w-full h-full object-cover" />
              </div>

              <div>
                <p className="text-[18px] font-medium text-foreground">ABN Junction</p>
                <p className="text-[15px] text-muted mt-1">{new Date(post.date).toDateString()}</p>
              </div>

            </div>

            {/* SOCIALS */}
            <div className="flex items-center gap-8 text-muted">
              <a href="https://www.instagram.com/abnjunction/" className="flex items-center gap-2 hover-accent transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/abnjunction/" className="flex items-center gap-2 hover-accent transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
                </svg>
                LinkedIn
              </a>
              <a href="https://www.facebook.com/abnjunction/" className="flex items-center gap-2 hover-accent transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46H16.5V4.3C16.2 4.26 15.19 4.17 14 4.17c-2.4 0-4.05 1.47-4.05 4.16v2.34H7.5v3H10V21h3.5Z" />
                </svg>
                Facebook
              </a>
            </div>

          </div>

        </div>

      </section>

        {/* OTHER CONTENT: other cases + other blogs (moved to bottom of page) */}

      {/* CONTENT */}
      <section
        className="
          max-w-[1280px]
          mx-auto

          px-6
          lg:px-10

          py-[120px]
        "
      >

        <div
          className="
            grid

            grid-cols-1

            lg:grid-cols-[240px_minmax(0,920px)_300px]

            gap-20

            justify-center
          "
        >

          {/* TOC */}
          <aside className="hidden lg:block">

            <div className="sticky top-32">

              <div className="rounded-[32px] border border-theme backdrop-blur-[20px] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8">

                <p className="text-[11px] tracking-[4px] uppercase text-accent font-semibold mb-10">Table Of Contents</p>

                <div className="space-y-7">

                  {toc.map((item) => (

                    <div key={item.id}>

                      <a
                        href={`#${item.id}`}
                        className="block text-[16px] leading-[1.8] text-muted hover:text-foreground transition"
                      >
                        {item.text}
                      </a>

                      <div className="w-10 h-[1px] bg-surface-weak mt-6" />

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </aside>

          {/* ARTICLE */}
          <article className="min-w-0">

            <div className="max-w-[920px] content-area" dangerouslySetInnerHTML={{ __html: contentWithIds }} />

          </article>

          {/* RIGHT CTA */}
          <aside className="hidden xl:block">

            <div className="sticky top-32">

                <div className="rounded-[36px] border border-theme backdrop-blur-[20px] bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(93,52,255,0.12))] p-10 overflow-hidden">

                <p className="text-[11px] tracking-[4px] uppercase text-accent font-semibold mb-8">Campaign Growth</p>

                <h3 className="text-[48px] leading-[1.05] tracking-[-2px] font-[600] text-foreground">
                  Launch your Campaign!
                </h3>

                <p className="mt-8 text-muted text-[18px] leading-[1.9]">
                  Create full funnel
                  campaigns that drive
                  measurable business
                  growth and acquisition.
                </p>

                <button className="mt-10 bg-accent text-white px-8 py-4 rounded-full text-[16px] font-medium hover:scale-[1.03] transition">Start Now</button>

              </div>

            </div>

          </aside>

        </div>

      </section>
      {/* Place other cases and other blogs at the end of the page */}
       <DNAParallax currentSlug={slug} />
      <OtherCasesSlider currentSlug={slug} />
      <OtherBlogsSlider currentSlug={slug} />
      <CTA />

    </main>
  );
}
