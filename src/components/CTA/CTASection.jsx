import "./CTASection.css";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to Transform Your Business?</h2>

        <p>
          Partner with Qizar Solutions to build innovative software,
          cloud, AI, and enterprise technology solutions that drive
          business growth.
        </p>

        <div className="cta-buttons">
          <a href="#contact" className="cta-primary">
            Contact Us
          </a>

          <a href="#services" className="cta-secondary">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTASection;