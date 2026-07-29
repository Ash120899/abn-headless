"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Frames extracted from public/abn5.mp4 via:
//   ffmpeg -i abn5.mp4 -vf "fps=30,scale=1280:720:flags=lanczos" -f image2 -q:v 2 frame-%04d.jpg
const FRAME_COUNT = 240;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;

// Content beats. "full" = video is edge-to-edge, text overlays it over a scrim.
// "side" = video shrinks into a rounded card and docks left/right; text + stats
// fill the opposite half of the screen.
const BEATS = [
  {
    layout: "full",
    eyebrow: "Behind The Work",
    titleParts: [{ t: "Every Campaign Starts With A " }, { t: "Story", accent: true }],
    body: "Before a single ad goes live, we dig into who your customers are, what they search for, and what makes them click.",
  },
  {
    layout: "side",
    dockSide: "right",
    eyebrow: "Strategy First",
    titleParts: [{ t: "We Don't Guess. We " }, { t: "Test.", accent: true }],
    body: "Audience research, competitor audits, and creative testing come before a single rupee of ad spend.",
    stats: [
      { value: "1.74K+", label: "Leads Generated" },
      { value: "12.88%", label: "Peak CTR" },
    ],
  },
  {
    layout: "full",
    eyebrow: "The Numbers",
    titleParts: [{ t: "1.74K+", accent: true }, { t: " Leads. Real Results." }],
    body: "Real campaigns, real results — measured in calls booked, forms filled, and revenue earned.",
  },
  {
    layout: "side",
    dockSide: "left",
    eyebrow: "Execution",
    titleParts: [{ t: "Built To Be Seen, Made To " }, { t: "Convert.", accent: true }],
    body: "From landing pages to local SEO to paid social, every touchpoint is designed to turn attention into action.",
    stats: [
      { value: "882+", label: "Call Enquiries" },
      { value: "₹93.07", label: "Cost Per Lead" },
    ],
  },
  {
    layout: "full",
    eyebrow: "The Result",
    titleParts: [{ t: "This Is What " }, { t: "Growth", accent: true }, { t: " Looks Like" }],
    body: "Let's build your next campaign — frame by frame, result by result.",
    cta: { label: "Let's Talk", href: "#" },
  },
];

function Title({ parts }) {
  return parts.map((p, i) => (
    <span key={i} className={p.accent ? "text-accent" : undefined}>
      {p.t}
    </span>
  ));
}

export default function VideoScrollSection() {
  const sectionRef = useRef(null);
  const videoBoxRef = useRef(null);
  const canvasRef = useRef(null);
  const beatRefs = useRef([]);
  const imagesRef = useRef([]);
  const lastDrawnImageRef = useRef(null);
  const loadingStartedRef = useRef(false);
  const lastReportedProgressRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload frames once the section nears the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function startLoading() {
      if (loadingStartedRef.current) return;
      loadingStartedRef.current = true;

      let loaded = 0;
      const images = new Array(FRAME_COUNT);

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = `/video-frames/abn5/frame-${String(i + 1).padStart(4, "0")}.jpg`;
        img.onload = () => {
          loaded += 1;
          const pct = loaded / FRAME_COUNT;
          if (pct - lastReportedProgressRef.current >= 0.05 || loaded === FRAME_COUNT) {
            lastReportedProgressRef.current = pct;
            setLoadProgress(pct);
          }
          if (i === 0) {
            lastDrawnImageRef.current = img;
            setReady(true);
          }
        };
        images[i] = img;
      }

      imagesRef.current = images;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startLoading();
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Canvas drawing + GSAP scroll-driven timeline
  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const videoBox = videoBoxRef.current;
    if (!canvas || !section || !videoBox) return;

    const ctx = canvas.getContext("2d");
    let lastFrameIndex = -1;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
    }

    function drawFrame(index) {
      if (!ctx) return;

      const images = imagesRef.current;
      let img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = lastDrawnImageRef.current;
      } else {
        lastDrawnImageRef.current = img;
      }
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = FRAME_WIDTH / FRAME_HEIGHT;
      const canvasRatio = cw / ch;

      let drawWidth, drawHeight, dx, dy;
      if (canvasRatio > imgRatio) {
        drawWidth = cw;
        drawHeight = cw / imgRatio;
        dx = 0;
        dy = (ch - drawHeight) / 2;
      } else {
        drawHeight = ch;
        drawWidth = ch * imgRatio;
        dx = (cw - drawWidth) / 2;
        dy = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    }

    resizeCanvas();
    drawFrame(0);

    const shiftX = window.innerWidth * 0.24;

    const ctxGsap = gsap.context(() => {
      gsap.set(videoBox, { scale: 1, x: 0, borderRadius: 0 });
      gsap.set(beatRefs.current, { opacity: 0, y: 24 });
      gsap.set(beatRefs.current[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              FRAME_COUNT - 1,
              Math.round(self.progress * (FRAME_COUNT - 1))
            );
            if (frameIndex !== lastFrameIndex) {
              lastFrameIndex = frameIndex;
              drawFrame(frameIndex);
            }
          },
        },
      });

      // Beat 0 (full) -> Beat 1 (side, right)
      tl.to(beatRefs.current[0], { opacity: 0, y: -24, duration: 0.4 }, 1)
        .to(videoBox, { scale: 0.46, x: shiftX, borderRadius: 28, duration: 0.6 }, 1)
        .to(beatRefs.current[1], { opacity: 1, y: 0, duration: 0.4 }, 1.4)

        // Beat 1 -> Beat 2 (full)
        .to(beatRefs.current[1], { opacity: 0, y: -24, duration: 0.4 }, 3)
        .to(videoBox, { scale: 1, x: 0, borderRadius: 0, duration: 0.6 }, 3)
        .to(beatRefs.current[2], { opacity: 1, y: 0, duration: 0.4 }, 3.4)

        // Beat 2 -> Beat 3 (side, left)
        .to(beatRefs.current[2], { opacity: 0, y: -24, duration: 0.4 }, 5)
        .to(videoBox, { scale: 0.46, x: -shiftX, borderRadius: 28, duration: 0.6 }, 5)
        .to(beatRefs.current[3], { opacity: 1, y: 0, duration: 0.4 }, 5.4)

        // Beat 3 -> Beat 4 (full)
        .to(beatRefs.current[3], { opacity: 0, y: -24, duration: 0.4 }, 7)
        .to(videoBox, { scale: 1, x: 0, borderRadius: 0, duration: 0.6 }, 7)
        .to(beatRefs.current[4], { opacity: 1, y: 0, duration: 0.4 }, 7.4);
    }, section);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ctxGsap.revert();
    };
  }, [ready]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video box: fixed full-bleed canvas, shrunk/docked via GSAP scale + x transforms */}
      <div ref={videoBoxRef} className="absolute inset-0 overflow-hidden bg-neutral-900">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-white/60 text-sm">
            Loading {Math.round(loadProgress * 100)}%
          </div>
        )}
      </div>

      {/* Scrim for the full-bleed beats */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Content beats */}
      {BEATS.map((beat, i) => (
        <div
          key={i}
          ref={(el) => (beatRefs.current[i] = el)}
          className={
            beat.layout === "full"
              ? "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
              : `absolute inset-y-0 z-20 flex items-center px-6 md:px-16 ${
                  beat.dockSide === "left"
                    ? "right-0 justify-end text-right"
                    : "left-0 justify-start text-left"
                }`
          }
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <div className={beat.layout === "full" ? "max-w-2xl" : "max-w-[80vw] md:max-w-md"}>
            <div
              className={`flex items-center gap-2 mb-4 ${
                beat.layout === "side" && beat.dockSide === "left" ? "justify-end" : ""
              }`}
            >
              <span className="w-6 h-[2px] bg-accent inline-block" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                {beat.eyebrow}
              </span>
            </div>

            <h3
              className={
                beat.layout === "full"
                  ? "text-3xl md:text-5xl font-semibold text-white leading-tight"
                  : "text-3xl md:text-4xl font-semibold text-white leading-tight"
              }
            >
              <Title parts={beat.titleParts} />
            </h3>

            <p className="mt-4 text-white/70 text-base md:text-lg">{beat.body}</p>

            {beat.stats && (
              <div
                className={`mt-8 flex gap-10 ${
                  beat.dockSide === "left" ? "justify-end" : "justify-start"
                }`}
              >
                {beat.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl md:text-4xl font-bold text-accent">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {beat.cta && (
              <a
                href={beat.cta.href}
                className="mt-8 inline-flex items-center gap-2 bg-accent text-black font-medium px-6 py-3 rounded-full hover:scale-[1.03] transition"
              >
                {beat.cta.label}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
