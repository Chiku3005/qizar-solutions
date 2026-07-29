import "./ContactSection.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function ContactSection() {
  return (
    <section className="contact-section">

      <h2>Contact Us</h2>

      <p className="contact-subtitle">
        We'd love to hear from you. Get in touch with us today.
      </p>

      <div className="contact-container">

        <div className="contact-info">

          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>info@qizarsolutions.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Location</h4>
              <p>Noida, Uttar Pradesh, India</p>
            </div>
          </div>

        </div>

        <form className="contact-form">

          <input type="text" placeholder="Your Name" />

          <input type="email" placeholder="Your Email" />

          <textarea
            rows="5"
            placeholder="Your Message"
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default ContactSection;