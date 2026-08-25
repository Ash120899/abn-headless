"use client";

// "Not sure what to explore next?" character card — rendered inside
// InsightsSection's character-cta row, next to the "Go to Blog" jump tile.
// Ported from the concept's character card (design-concepts/case-studies-listing.html
// ~lines 642-652, CSS .character-* ~lines 426-460, JS initCharacter ~lines 1461-1498).
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CharacterCard() {
  const figureRef = useRef(null);
  const emojiRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const figure = figureRef.current;
    const emoji = emojiRef.current;
    const bubble = bubbleRef.current;
    if (!figure || !emoji || !bubble) return;

    const triggers = [];
    let idleTween = null;
    let entranceTl = null;

    // Entrance: pop in once the card scrolls into view, bubble follows, then fades.
    gsap.set(emoji, { scale: 0.6, opacity: 0, rotation: -10 });
    gsap.set(bubble, { scale: 0.6, opacity: 0 });
    entranceTl = gsap.timeline({
      scrollTrigger: { trigger: figure, start: "top 85%", once: true },
    });
    entranceTl
      .to(emoji, { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: "back.out(1.8)" })
      .to(bubble, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" }, "-=.2")
      .to(bubble, { opacity: 0, scale: 0.9, duration: 0.35, delay: 2 });
    if (entranceTl.scrollTrigger) triggers.push(entranceTl.scrollTrigger);

    // Idle: gentle continuous bob so it feels "alive" even without interaction.
    idleTween = gsap.to(emoji, { y: -8, rotation: 3, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });

    // Reacts with a little bounce whenever scroll direction flips near this section.
    let lastDirection = 1;
    const directionTrigger = ScrollTrigger.create({
      trigger: figure,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        if (self.direction === lastDirection) return;
        lastDirection = self.direction;
        gsap.to(figure, {
          y: self.direction > 0 ? 8 : -8,
          rotation: self.direction > 0 ? 3 : -3,
          duration: 0.25,
          overwrite: true,
          onComplete: () => gsap.to(figure, { y: 0, rotation: 0, duration: 0.5, ease: "elastic.out(1,.45)" }),
        });
      },
    });
    triggers.push(directionTrigger);

    function onEnter() {
      gsap.fromTo(emoji, { rotation: -6 }, { rotation: 6, duration: 0.12, yoyo: true, repeat: 5, ease: "power1.inOut" });
    }
    figure.addEventListener("mouseenter", onEnter);

    return () => {
      figure.removeEventListener("mouseenter", onEnter);
      triggers.forEach((t) => t.kill());
      if (idleTween) idleTween.kill();
      if (entranceTl) entranceTl.kill();
    };
  }, []);

  return (
    <div className="rounded-2xl bg-surface-weak border border-theme grid grid-cols-[90px_1fr] md:grid-cols-[150px_1fr] items-center gap-4.5 p-[18px] md:p-6 min-h-[190px] overflow-hidden relative">
      <div ref={figureRef} className="relative grid place-items-center min-h-[140px] cursor-pointer">
        {/*
          PLACEHOLDER: the emoji below stands in for a real character
          illustration that doesn't exist yet as an asset. The concept's
          original graphic is a large inline base64 image with no source
          file to port; this keeps the same card/bubble/animation behavior
          so it's a drop-in swap once a real illustration is provided.
        */}
        <span ref={emojiRef} className="text-[52px] md:text-[80px] leading-none block">
          🙋‍♂️
        </span>
        <div
          ref={bubbleRef}
          className="absolute -top-1 -right-1.5 max-w-[150px] bg-white text-[#111] px-3 py-2.5 rounded-2xl text-xs font-bold leading-tight opacity-0"
        >
          Psst — check the blog!
        </div>
      </div>
      <div>
        <h3 className="font-extrabold text-[clamp(1.25rem,2.2vw,1.7rem)] tracking-tight text-foreground">
          Not sure what to explore next?
        </h3>
        <p className="mt-2.5 text-muted leading-relaxed text-[13.5px]">
          Jump into the ABN knowledge hub for practical articles, tools and ideas behind better digital performance.
        </p>
      </div>
    </div>
  );
}
