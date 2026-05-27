"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InfinitySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track =
        document.querySelector(
          ".active-track"
        );

      const core =
        document.querySelector(
          ".inner-core"
        );

      const length =
        track.getTotalLength();

      // INITIAL
      gsap.set([track, core], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // HIDE LABELS
      gsap.set(
        [
          ".node-1",
          ".node-2",
          ".node-3",
          ".node-4",
          ".node-5",
          ".node-6",
          ".node-7",
          ".node-8",
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      // HIDE LINES
      gsap.set(
        [
          ".line-1",
          ".line-2",
          ".line-3",
          ".line-4",
          ".line-5",
          ".line-6",
          ".line-7",
          ".line-8",
        ],
        {
          opacity: 0,
          scaleX: 0,
          scaleY: 0,
        }
      );

      // TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: "+=4000",

          scrub: 1,

          pin: true,

          anticipatePin: 1,
        },
      });

      const stops = [
        0.12,
        0.22,
        0.38,
        0.5,
        0.62,
        0.76,
        0.88,
        1,
      ];

      stops.forEach((stop, i) => {
        tl.to(
          [track, core],
          {
            strokeDashoffset:
              length - length * stop,

            duration: 0.12,

            ease: "none",
          },
          i * 0.12
        );

        tl.to(
          `.node-${i + 1}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.08,
          },
          i * 0.12
        );

        tl.to(
          `.line-${i + 1}`,
          {
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 0.08,
          },
          i * 0.12
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (  
    <section
      ref={sectionRef}
     className="
  relative
  hidden lg:block   
  lg:h-screen
  h-[100svh]
  overflow-hidden
  bg-[#05010f]
  px-2
  sm:px-4
"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-black" />

      {/* MAIN PURPLE */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          w-[1500px]
          h-[1500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-700/40
          blur-[240px]
        "
      />

      {/* PINK */}
      <div
        className="
          absolute
          left-[42%]
          top-[50%]
          w-[700px]
          h-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-pink-500/30
          blur-[150px]
        "
      />

      {/* CYAN */}
      <div
        className="
          absolute
          left-[58%]
          top-[50%]
          w-[700px]
          h-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/20
          blur-[150px]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          w-full
          h-full
          flex
          items-center
          justify-center
        "
      >
        <div
         className="
  relative

    
lg:w-[100%]
w-full
lg:h-[844px]
md:h-[720px]
sm:h-[620px]
h-[620px]
 lg:scale-100
md:scale-[0.9]
sm:scale-[0.82]
scale-100

  origin-center
"
        >
          {/* GRID */}
          <div
            className="
              absolute
              inset-0
              opacity-20
              bg-[radial-gradient(#ffffff22_1px,transparent_1px)]
              [background-size:18px_18px]
            "
          />

          {/* EXACT INFINITY IMAGE */}
          <img
            src="https://abnjunction.com/wp-content/uploads/2026/05/OZ1j92h1UAgrK0IhOPz0JUfkxo.avif "
            alt=""
            className="
             absolute
  left-1/2
  sm:left-[49%]
  left-[55%]
  top-1/2

  lg:w-[100%]
  md:w-[120%]
  sm:w-[180%]
  w-[260%]

  -translate-x-1/2
  -translate-y-1/2
  object-cover
  pointer-events-none
  select-none
            "
          />

          {/* SVG OVERLAY */}
          <svg
            viewBox="0 0 1300 760"
            className="
              absolute
              inset-0
              w-full
              h-full
            "
          >
            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#ff9cf8"
                />

                <stop
                  offset="50%"
                  stopColor="#b026ff"
                />

                <stop
                  offset="100%"
                  stopColor="#7dd3fc"
                />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur
                  stdDeviation="16"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ACTIVE GLOW */}
            <path
              className="active-track"
              d="
                M 330 380
                C 330 160 560 160 650 380
                C 740 600 970 600 970 380
                C 970 160 740 160 650 380
                C 560 600 330 600 330 380
              "
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="36"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* CORE */}
            <path
              className="inner-core"
              d="
                M 330 380
                C 330 160 560 160 650 380
                C 740 600 970 600 970 380
                C 970 160 740 160 650 380
                C 560 600 330 600 330 380
              "
              fill="none"
              stroke="#ffd6ff"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>

          {/* NODE 1 */}
          <div className="node-1 absolute lg:left-[40px]
md:left-[20px]
sm:left-[10px]
left-[-10px]

lg:top-[230px]
md:top-[210px]
sm:top-[150px]
top-[120px]">
            <div className="line-1 absolute left-[250px] top-[22px] w-[180px] h-[1px] bg-gradient-to-r from-purple-400 to-transparent origin-left" />

            <div className="absolute left-[430px] top-[14px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
     font-medium tracking-[-0.02em] whitespace-nowrap">
              Guardrails & Plugins
            </div>
          </div>

          {/* NODE 2 */}
          <div className="node-2 absolute lg:left-[450px]
md:left-[350px]
sm:left-[250px]
left-[140px]

lg:top-[70px]
md:top-[60px]
sm:top-[30px]
top-[40px]">
            <div className="line-2 absolute left-[92px] top-[58px] w-[1px] h-[150px] bg-gradient-to-b from-purple-400 to-transparent origin-top" />

            <div className="absolute left-[84px] top-[208px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] whitespace-nowrap">
              Observability
            </div>
          </div>

          {/* NODE 3 */}
          <div className="node-3 absolute lg:left-[0px]
md:left-[0px]
sm:left-[-10px]
left-[0px]

lg:top-[430px]
md:top-[350px]
sm:top-[260px]
top-[260px]">
            <div className="line-3 absolute left-[210px] top-[20px] w-[210px] h-[1px] bg-gradient-to-r from-purple-400 to-transparent origin-left" />

            <div className="absolute left-[420px] top-[12px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] whitespace-nowrap">
              Model Routing
            </div>
          </div>

          {/* NODE 4 */}
          <div className="node-4 absolute lg:left-[90px]
md:left-[45px]
sm:left-[20px]
left-[30px]

lg:top-[600px]
md:top-[500px]
sm:top-[400px]
top-[30 0px]">
            <div className="line-4 absolute left-[250px] top-[20px] w-[180px] h-[1px] bg-gradient-to-r from-purple-400 to-transparent origin-left" />

            <div className="absolute left-[430px] top-[12px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] whitespace-nowrap">
              Model Deployment
            </div>
          </div>

          {/* NODE 5 */}
          <div className="node-5 absolute lg:left-[820px]
md:left-[620px]
sm:left-[420px]
left-[220px]

lg:top-[70px]
md:top-[60px]
sm:top-[30px]
top-[10px]">
            <div className="line-5 absolute left-[102px] top-[58px] w-[1px] h-[150px] bg-gradient-to-b from-purple-400 to-transparent origin-top" />

            <div className="absolute left-[94px] top-[208px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] whitespace-nowrap">
              Logs & Traces
            </div>
          </div>

          {/* NODE 6 */}
          <div className="node-6 absolute lg:right-[0px] md:right-[0px] sm:right-[-10px] right-[-20px] lg:top-[230px] md:top-[210px] sm:top-[150px] top-[110px]">
            <div className="line-6 absolute right-[240px] top-[20px] w-[180px] h-[1px] bg-gradient-to-l from-purple-400 to-transparent origin-right" />

            <div className="absolute right-[420px] top-[12px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] whitespace-nowrap">
              Prompt Engineering
            </div>
          </div>

          {/* NODE 7 */}
          <div className="node-7 absolute lg:right-[0px] md:right-[0px] sm:right-[-10px] right-[-20px] lg:top-[400px] md:top-[350px] sm:top-[260px] top-[205px]">
            <div className="line-7 absolute right-[240px] top-[20px] w-[180px] h-[1px] bg-gradient-to-l from-purple-400 to-transparent origin-right" />

            <div className="absolute right-[420px] top-[12px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] leading-[1.15]">
              Reinforcement
              <br />
              Fine Tuning
            </div>
          </div>

          {/* NODE 8 */}
          <div className="node-8 absolute lg:right-[130px] md:right-[130px] sm:right-[120px] right-[110px] lg:top-[600px] md:top-[500px] sm:top-[400px] top-[300px  ]">
            <div className="line-8 absolute right-[170px] top-[20px] w-[180px] h-[1px] bg-gradient-to-l from-purple-400 to-transparent origin-right" />

            <div className="absolute right-[350px] top-[12px] w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_30px_#facc15]" />

            <div className="text-white lg:text-[22px]
md:text-[18px]
sm:text-[15px]
text-[12px] font-medium tracking-[-0.02em] whitespace-nowrap">
              Evaluation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}