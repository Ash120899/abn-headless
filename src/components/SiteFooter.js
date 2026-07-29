export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-main">
        <div className="site-footer-brand">
          <div className="site-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/abn-logo.webp" alt="ABN Junction" className="site-logo-img" />
          </div>
          <p>
            Digital marketing, design, development, video and security—connected into one accountable
            growth system.
          </p>
        </div>

        <div className="site-footer-col">
          <h4>Services</h4>
          <a href="https://abnjunction.com/services/digital-marketing/">Digital Marketing</a>
          <a href="https://abnjunction.com/services/web-and-graphic-design/">Graphics &amp; Web Design</a>
          <a href="https://abnjunction.com/services/web-development/">Web Development</a>
          <a href="https://abnjunction.com/services/video-production/">Video Production</a>
          <a href="https://abnjunction.com/services/web-data-security/">Data &amp; Web Security</a>
        </div>

        <div className="site-footer-col">
          <h4>Company</h4>
          <a href="https://abnjunction.com/about-us/">About Us</a>
          <a href="https://abnjunction.com/case-studies/">Case Studies</a>
          <a href="#">Our People</a>
          <a href="#">Careers</a>
          <a href="https://abnjunction.com/internship-in-chennai/">Internships</a>
        </div>

        <div className="site-footer-col">
          <h4>Resources</h4>
          <a href="https://abnjunction.com/blogs/">Blog</a>
          <a href="#">Tools &amp; Applications</a>
          <a href="#">Guides</a>
          <a href="#">FAQs</a>
          <a href="#">Sitemap</a>
        </div>

        <div className="site-footer-col">
          <h4>Contact</h4>
          <a href="mailto:hello@abnjunction.com">hello@abnjunction.com</a>
          <a href="tel:+918807556154">+91 88075 56154</a>
          <span>India · Serving clients globally</span>
          <a href="https://abnjunction.com/contact-us/">Book a Strategy Call →</a>
        </div>
      </div>

      <div className="wrap site-footer-bottom">
        <span>© {new Date().getFullYear()} ABN Junction. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
