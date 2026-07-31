import './ContactSection.css';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function ContactSection() {
  return (
    <section className="contact-section" id="contact">

      <div className="contact-header">
        <span>CONTACT US</span>
        <h2>Let's Build Something Great Together</h2>
        <p>
          Have a project in mind? Reach out to our team and we'll
          help you transform your ideas into digital solutions.
        </p>
      </div>

      <div className="contact-container">

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <div className="info-card">
            <div className="info-icon">
              <FaPhoneAlt />
            </div>
            <div>
              <h3>Phone</h3>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <div>
              <h3>Email</h3>
              <p>info@qizarsolutions.com</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Location</h3>
              <p>Noida, Uttar Pradesh, India</p>
            </div>
          </div>

        </motion.div>

    <motion.form
  className="contact-form"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>

  <div className="form-row">

    <input
      type="text"
      placeholder="Your Name"
      required
    />

    <input
      type="email"
      placeholder="Your Email"
      required
    />

  </div>

  <input
    type="text"
    placeholder="Company Name"
  />

  <textarea
    rows="6"
    placeholder="Your Message"
    required
  />

  <button type="submit">
    Send Message
  </button>

</motion.form>

      </div>

    </section>
  );
}

export default ContactSection;