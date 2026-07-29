export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-main">
        <div className="site-footer-brand">
          <div className="site-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abnjunction.com/wp-content/uploads/2026/07/abn-logo.webp"
              alt="ABN Junction"
              className="site-logo-img"
            />
          </div>
          <p>
            Digital marketing, design, development, video and security—connected into one accountable
            growth system.
          </p>

          <div className="site-footer-badges">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abnjunction.com/wp-content/uploads/2024/08/Google-premier-partner-2024-e1722624057411.png.webp"
              alt="Google for Education Partner 2024"
              className="site-footer-badge-img"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abnjunction.com/wp-content/uploads/2024/08/Microsoft-Elite-partner-2024.png.webp"
              alt="Microsoft Advertising Elite Partner"
              className="site-footer-badge-img"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abnjunction.com/wp-content/uploads/2024/08/Rectangle-168-4.png.webp"
              alt="Google Partner"
              className="site-footer-badge-img"
            />
          </div>
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

          <div className="site-footer-social">
            <a
              className="site-social-icon site-social-linkedin"
              href="https://www.linkedin.com/company/abnjunction/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABN Junction on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
              </svg>
            </a>
            <a
              className="site-social-icon site-social-facebook"
              href="https://www.facebook.com/abnjunction/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABN Junction on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46H16.5V4.3C16.2 4.26 15.19 4.17 14 4.17c-2.4 0-4.05 1.47-4.05 4.16v2.34H7.5v3H10V21h3.5Z" />
              </svg>
            </a>
            <a
              className="site-social-icon site-social-instagram"
              href="https://www.instagram.com/abnjunction/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABN Junction on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              className="site-social-icon site-social-youtube"
              href="https://www.youtube.com/channel/UCx9G1OkvR9yrstscO4wcrGw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ABN Junction on YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.8 8.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16 5 12 5 12 5h0s-4 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9.9 2 11.6v1.1c0 1.7.2 3.4.2 3.4s.2 1.5.8 2.1c.8.8 1.9.8 2.3.9C6.9 19.4 12 19.4 12 19.4s4 0 6.9-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.4v-1.1c0-1.7-.2-3.4-.2-3.4ZM9.9 14.6V8.9l5.4 2.9-5.4 2.8Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="wrap site-footer-bottom">
        <span>© {new Date().getFullYear()} ABN Junction. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
