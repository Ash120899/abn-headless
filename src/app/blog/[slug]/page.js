"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import * as cheerio from "cheerio";

export const runtime = "edge";

const WP_API_URL =
  "https://abnjunction.com/wp-json/wp/v2";

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

    return data[0];

  } catch (err) {

    console.error(err);

    return null;
  }
}

export default function BlogPage(props) {

  const params = React.use(props.params);

  const slug = params.slug;

  const [post, setPost] = useState(null);

  const [progress, setProgress] =
    useState(0);

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
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  const featuredImage =
    post?._embedded?.[
      "wp:featuredmedia"
    ]?.[0]?.source_url;

  return (

    <main
      className="
        bg-[#050505]
        text-[#F5F5F5]
        min-h-screen
        font-[Outfit]
      "
    >

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[#141414] z-[9999]">

        <div
          className="
            h-full
            bg-[#F97316]
            transition-all
            duration-150
          "
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          border-b
          border-white/5
        "
      >

        {/* BACKGROUND */}
        <div
          className="
            absolute
            inset-0
            opacity-40
          "
        >

          <div
            className="
              absolute
              top-[-200px]
              left-[-100px]
              w-[600px]
              h-[600px]
              rounded-full
              blur-[140px]
              bg-orange-500/20
            "
          />

          <div
            className="
              absolute
              bottom-[-200px]
              right-[-100px]
              w-[700px]
              h-[700px]
              rounded-full
              blur-[160px]
              bg-purple-500/20
            "
          />

        </div>

        <div
          className="
            relative
            max-w-[1280px]
            mx-auto
            px-6
            lg:px-10
            pt-16
            pb-24
          "
        >

          {/* BREADCRUMB */}
          <div
            className="
              text-[14px]
              text-[#8A8A8A]
              mb-12
            "
          >

            <span className="text-[#F97316]">
              Home
            </span>

            {" / "}

            <span className="text-[#F97316]">
              Blog
            </span>

            {" / "}

            <span
              dangerouslySetInnerHTML={{
                __html:
                  post.title.rendered,
              }}
            />

          </div>

          {/* TITLE */}
          <h1
            className="
              max-w-[980px]

              text-[54px]
              md:text-[72px]

              leading-[1.03]
              tracking-[-3px]

              font-[600]

              text-[#F5F5F5]
            "
            dangerouslySetInnerHTML={{
              __html:
                post.title.rendered,
            }}
          />

          {/* META */}
          <div
            className="
              flex
              items-center
              justify-between
              flex-wrap
              gap-8

              mt-14
            "
          >

            {/* AUTHOR */}
            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  overflow-hidden
                  border
                  border-white/10
                "
              >

                <img
                  src="https://i.pravatar.cc/100"
                  alt="author"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>

              <div>

                <p
                  className="
                    text-[18px]
                    font-medium
                    text-[#F5F5F5]
                  "
                >
                  ABN Junction
                </p>

                <p
                  className="
                    text-[15px]
                    text-[#8A8A8A]
                    mt-1
                  "
                >
                  {new Date(
                    post.date
                  ).toDateString()}
                </p>

              </div>

            </div>

            {/* SOCIALS */}
            <div
              className="
                flex
                items-center
                gap-8

                text-[#B3B3B3]
              "
            >

              <a
                href="#"
                className="
                  hover:text-[#F97316]
                  transition
                "
              >
                X
              </a>

              <a
                href="#"
                className="
                  hover:text-[#F97316]
                  transition
                "
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="
                  hover:text-[#F97316]
                  transition
                "
              >
                Facebook
              </a>

            </div>

          </div>

          {/* FEATURED IMAGE */}
          {featuredImage && (

            <div
              className="
                mt-20

                rounded-[40px]
                overflow-hidden

                border
                border-white/10

                shadow-[0_20px_100px_rgba(0,0,0,0.45)]
              "
            >

              <img
                src={featuredImage}
                alt={
                  post.title.rendered
                }
                className="
                  w-full
                  object-cover
                "
              />

            </div>

          )}

        </div>

      </section>

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

              <div
                className="
                  rounded-[32px]

                  border
                  border-white/10

                  backdrop-blur-[20px]

                  bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]

                  p-8
                "
              >

                <p
                  className="
                    text-[11px]
                    tracking-[4px]
                    uppercase

                    text-[#F97316]

                    font-semibold

                    mb-10
                  "
                >
                  Table Of Contents
                </p>

                <div className="space-y-7">

                  {toc.map((item) => (

                    <div key={item.id}>

                      <a
                        href={`#${item.id}`}
                        className="
                          block

                          text-[16px]
                          leading-[1.8]

                          text-[#B3B3B3]

                          hover:text-white

                          transition
                        "
                      >
                        {item.text}
                      </a>

                      <div
                        className="
                          w-10
                          h-[1px]

                          bg-white/10

                          mt-6
                        "
                      />

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </aside>

          {/* ARTICLE */}
          <article className="min-w-0">

            <div
              className="

                max-w-[920px]

                text-[#B3B3B3]

                [&>*:first-child]:mt-0

                [&_h2]:text-[#F5F5F5]
                [&_h2]:text-[52px]
                [&_h2]:leading-[1.08]
                [&_h2]:tracking-[-2px]
                [&_h2]:font-[600]
                [&_h2]:mt-32
                [&_h2]:mb-10

                [&_h3]:text-[#F5F5F5]
                [&_h3]:text-[32px]
                [&_h3]:leading-[1.2]
                [&_h3]:font-medium
                [&_h3]:mt-20
                [&_h3]:mb-8

                [&_p]:text-[21px]
                [&_p]:leading-[1.95]
                [&_p]:font-[300]
                [&_p]:text-[#B3B3B3]
                [&_p]:mb-8

                [&_ul]:my-10
                [&_ul]:pl-6

                [&_li]:text-[20px]
                [&_li]:leading-[1.9]
                [&_li]:text-[#B3B3B3]
                [&_li]:mb-4

                [&_strong]:text-[#F5F5F5]
                [&_strong]:font-medium

                [&_a]:text-[#F97316]
                [&_a]:no-underline

                [&_blockquote]:border-l-4
                [&_blockquote]:border-[#F97316]
                [&_blockquote]:pl-8
                [&_blockquote]:italic
                [&_blockquote]:text-[#F5F5F5]
                [&_blockquote]:my-14

                [&_img]:rounded-[32px]
                [&_img]:my-16

                [&_img]:border
                [&_img]:border-white/10

                [&_img]:shadow-[0_20px_100px_rgba(0,0,0,0.45)]

                [&_figure]:my-16

                [&_table]:w-full
                [&_table]:border-collapse
                [&_table]:my-12

                [&_td]:border
                [&_td]:border-white/10
                [&_td]:p-5

                [&_th]:border
                [&_th]:border-white/10
                [&_th]:p-5
                [&_th]:bg-white/5

              "
              dangerouslySetInnerHTML={{
                __html:
                  contentWithIds,
              }}
            />

          </article>

          {/* RIGHT CTA */}
          <aside className="hidden xl:block">

            <div className="sticky top-32">

              <div
                className="
                  rounded-[36px]

                  border
                  border-white/10

                  backdrop-blur-[20px]

                  bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(93,52,255,0.12))]

                  p-10

                  overflow-hidden
                "
              >

                <p
                  className="
                    text-[11px]
                    tracking-[4px]
                    uppercase

                    text-[#F97316]

                    font-semibold

                    mb-8
                  "
                >
                  Campaign Growth
                </p>

                <h3
                  className="
                    text-[48px]
                    leading-[1.05]
                    tracking-[-2px]

                    font-[600]

                    text-[#F5F5F5]
                  "
                >
                  Launch your Campaign!
                </h3>

                <p
                  className="
                    mt-8

                    text-[#D1D1D1]

                    text-[18px]
                    leading-[1.9]
                  "
                >
                  Create full funnel
                  campaigns that drive
                  measurable business
                  growth and acquisition.
                </p>

                <button
                  className="
                    mt-10

                    bg-[#F97316]

                    text-white

                    px-8
                    py-4

                    rounded-full

                    text-[16px]
                    font-medium

                    hover:scale-[1.03]

                    transition
                  "
                >
                  Start Now
                </button>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}