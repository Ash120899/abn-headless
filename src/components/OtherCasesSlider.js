"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";


const WP_API_URL = "https://abnjunction.com/wp-json/wp/v2";

// Simple illustrative character SVG


export default function OtherCasesSlider({ currentSlug }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCases() {
      try {
        const res = await fetch(`${WP_API_URL}/case_study?per_page=8&_embed`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch cases");
        const data = await res.json();

        const filtered = data.filter((p) => p.slug !== currentSlug).slice(0, 6);

        const mapped = filtered.map((p) => ({
          slug: p.slug,
          title: p.title?.rendered || "",
          excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
          featured: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        }));

        if (mounted) {
          setItems(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCases();

    return () => (mounted = false);
  }, [currentSlug]);

  function scrollBy(amount) {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (loading) return <div className="py-10 text-center text-muted">Loading other case studies...</div>;
  if (!items.length) return null;

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-semibold text-foreground">Other Case Studies</h3>
        <div className="flex gap-3">
          <button aria-label="Scroll left" onClick={() => scrollBy(-420)} className="rounded-full w-10 h-10 bg-surface-2 text-foreground flex items-center justify-center hover:bg-surface transition">‹</button>
          <button aria-label="Scroll right" onClick={() => scrollBy(420)} className="rounded-full w-10 h-10 bg-surface-2 text-foreground flex items-center justify-center hover:bg-surface transition">›</button>
        </div>
      </div>

      {/* Character + Slider Container */}
      <div className="flex items-stretch gap-8">
      

        {/* Cards Slider */}
        <div ref={scrollerRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide flex-1">
        {items.map((it) => (
          <Link key={it.slug} href={`/case-studies/${it.slug}`} className="snap-start min-w-[260px] max-w-[320px] flex-shrink-0">
            <article className="rounded-[20px] overflow-hidden border border-theme bg-surface p-4 h-full flex flex-col justify-between hover:shadow-lg transition">
              <div className="h-[160px] w-full mb-4 rounded-md overflow-hidden bg-surface-2 flex items-center justify-center">
                {it.featured ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.featured} alt={it.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-muted">No image</div>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{it.title.replace(/<[^>]+>/g, "")}</h4>
                <p className="text-sm text-muted line-clamp-3">{it.excerpt}</p>
              </div>

            </article>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
