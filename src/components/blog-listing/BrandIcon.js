// Shared brand-mark icons — ports the concept's own hand-drawn
// pseudo-element icons (design-concepts/ABN_Blogs_V4_Magnetic_Interactive_Concept.html
// ~line 155-167 .chip-*, ~line 299-308 .tool-logo.*) as small inline shapes,
// instead of the generic single-letter colored circles used before. Used by
// both HeroScene.js's floating chips and ToolsRail.js's tool cards so the
// two sections stay visually consistent.
const WRAP = "w-5 h-5 flex-shrink-0 grid place-items-center relative";

export default function BrandIcon({ name }) {
  switch (name) {
    case "google":
    case "ads":
      return (
        <span className={WRAP}>
          <span style={{ position: "absolute", width: 8, height: 15, background: "#5bb8ff", borderRadius: "6px 6px 2px 2px", transform: "rotate(26deg)", left: 3, top: 1 }} />
          <span style={{ position: "absolute", width: 7, height: 7, background: "#f0b253", borderRadius: "50%", right: 0, bottom: 1 }} />
        </span>
      );
    case "meta":
      return (
        <span className={WRAP} style={{ color: "#5ba6ff", fontWeight: 900, fontSize: 15 }}>
          ∞
        </span>
      );
    case "seo":
    case "search":
      return (
        <span className={WRAP}>
          <span style={{ position: "absolute", width: 11, height: 11, border: "2px solid #6abcf7", borderRadius: "50%", left: 1, top: 1 }} />
          <span style={{ position: "absolute", width: 7, height: 2, background: "#6abcf7", right: -1, bottom: 1, transform: "rotate(42deg)", borderRadius: 2 }} />
        </span>
      );
    case "ga4":
      return (
        <span className={WRAP}>
          <span style={{ position: "absolute", width: 4, height: 13, background: "#f0ad54", borderRadius: 10, left: 2, bottom: 1, boxShadow: "6px -4px 0 0 #d79242, 12px -8px 0 0 #5bb8ff" }} />
        </span>
      );
    case "analytics":
      return (
        <span className={WRAP}>
          <span style={{ position: "absolute", width: 4, height: 14, background: "#f0ad54", borderRadius: 10, left: 2, bottom: 1, boxShadow: "6px -3px 0 0 #5bb8ff, 12px -8px 0 0 #8ec8b6" }} />
        </span>
      );
    case "wordpress":
    case "wp":
      return (
        <span className={WRAP} style={{ width: 20, height: 20, borderRadius: "50%", background: "#1e2f3d", color: "#fff", fontSize: 11, fontWeight: 900 }}>
          W
        </span>
      );
    case "shopify":
    case "shop":
      return (
        <span className={WRAP} style={{ width: 20, height: 20, borderRadius: 4, background: "#86c268", color: "#fff", fontSize: 11, fontWeight: 900 }}>
          S
        </span>
      );
    case "next":
      return (
        <span className={WRAP} style={{ width: 20, height: 20, borderRadius: "50%", background: "#111", color: "#fff", fontSize: 11, fontWeight: 900, border: "1px solid rgba(255,255,255,.14)" }}>
          N
        </span>
      );
    case "merchant":
      return (
        <span className={WRAP} style={{ width: 20, height: 20, borderRadius: 5, background: "#f5d3a6", color: "#7e5220", fontSize: 11, fontWeight: 900 }}>
          M
        </span>
      );
    case "figma":
      return (
        <span className={WRAP} style={{ width: 20, height: 20, borderRadius: 6, background: "#7d6bff", color: "#fff", fontSize: 11, fontWeight: 900 }}>
          F
        </span>
      );
    default:
      return null;
  }
}
