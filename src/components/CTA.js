export default function CTA() {
  const packages = [
    {
      title: "BOOK A FREE CONSULTATION NOW!",
      price: "99.99",
      services: [
        "Web Development and Design",
        "Ecommerce & CMS Management",
        "Advanced SEO",
        "Paid Marketing",
        "SEO Content Writing"
      ]
    },
    {
      title: "BOOK A FREE CONSULTATION NOW!",
      price: "99.99",
      services: [
        "Web Development and Design",
        "Ecommerce & CMS Management",
        "Advanced SEO",
        "Paid Marketing",
        "SEO Content Writing"
      ]
    },
    {
      title: "BOOK A FREE CONSULTATION NOW!",
      price: "99.99",
      services: [
        "Web Development and Design",
        "Ecommerce & CMS Management",
        "Advanced SEO",
        "Paid Marketing",
        "SEO Content Writing"
      ]
    }
  ];

  return (
    <section className="cta-section">
      <div className="cta-wrapper">
        {/* Intro */}
        <div className="cta-intro">
          <h4 className="cta-subtext">IMPRESSED WITH OUR WORKS?</h4>
          <h3 className="cta-accent">LET THE STORY BEGIN</h3>
          <h2 className="cta-main-title">WELCOME TO YOUR NEW ERA OF GROWTH</h2>
          <p className="cta-intro-text">
            Imagine A World Where Your Brand Isn&apos;t Just Seen - It&apos;s Remembered,
            Shared, And Celebrated. That&apos;s Not A Dream; It&apos;s What We Deliver.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="cta-pricing-row">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`cta-pricing-card ${
                idx === 1 ? "active-card" : "faded-card"
              } ${idx === 2 ? "hide-mobile" : ""}
              ${idx === 0 ? "hide-mobile" : ""}
              `}
            >
              <h3 className="cta-card-title">
                BOOK A FREE
                <br />
                CONSULTATION
                <br />
                NOW!
              </h3>

              <div className="cta-card-price">
                <span>$ {pkg.price}</span>
              </div>

              <ul className="cta-card-features">
                {pkg.services.map((service) => (
  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Outro */}
        <div className="cta-outro">
          <h3 className="cta-accent">READY TO TRANSFORM YOUR DIGITAL PRESENCE?</h3>
          <h2 className="cta-main-title">CALL TO ACTION</h2>

          <p className="cta-outro-text">
            Click &apos;Start Journey&apos; Now And Let&apos;s Craft A Success Story
            That&apos;ll Make Your Competitors Green With Envy. Remember, In The
            Online World, The Early Bird Gets The Conversions!
          </p>

          <div className="cta-button-wrap">
            <a href="#" className="cta-button">
              START YOUR JOURNEY
              <span className="cta-arrow">➜</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
