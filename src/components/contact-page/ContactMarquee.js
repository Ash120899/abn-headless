// Scrolling service strip between the hero and the form.
//
// The track is duplicated because the CSS animation translates by -50%: one
// full copy has to sit off-screen for the loop to be seamless.
export default function ContactMarquee({ items }) {
  return (
    <div className="strip">
      <div className="track">
        {[0, 1].map((copy) =>
          items.map((item) => (
            <span key={`${copy}-${item}`}>
              <b>✦</b> {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
