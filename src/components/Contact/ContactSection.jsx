import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./ContactSection.css";

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-wrapper">

        {/* Section Heading */}
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="contact-tag">GET IN TOUCH</span>

          <h2>
            Let's Build Something{" "}
            <span>Exceptional</span>
          </h2>

          <p>
            Have a technology requirement or looking for the right broadcast
            and media solution? Our team is ready to understand your
            requirements and help you find the right solution.
          </p>
        </motion.div>

        {/* Main Contact Area */}
        <div className="contact-grid">

          {/* LEFT CARD */}
          <motion.div
            className="contact-info-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="contact-info-content">

              <span className="company-label">QIZAR SOLUTIONS</span>

              <h3>
                Technology solutions
                <br />
                that move businesses forward.
              </h3>

              <p className="contact-description">
                Connect with our team to discuss broadcast, media, storage,
                networking, system integration and enterprise technology
                requirements.
              </p>

              <div className="contact-details">

                <div className="contact-detail">
                  <div className="detail-icon">
                    <FaEnvelope />
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>info@qizarsolutions.com</strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="detail-icon">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>+91 XXXXX XXXXX</strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="detail-icon">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>India</strong>
                  </div>
                </div>

              </div>

              <div className="contact-benefits">
                <div>
                  <FaCheckCircle />
                  <span>Professional technology consultation</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>End-to-end solution support</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Enterprise-focused solutions</span>
                </div>
              </div>

            </div>

            <div className="contact-card-decoration"></div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <span>LET'S CONNECT</span>

              <h3>Send us a message</h3>

              <p>
                Tell us a little about your requirement and our team will get
                back to you.
              </p>
            </div>

            <form>

              <div className="form-row">

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Company name"
                />
              </div>

              <div className="form-group">
                <label>Your Requirement</label>
                <textarea
                  placeholder="Tell us about your requirement..."
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="send-button">
                Send Enquiry
                <span>
                  <FaArrowRight />
                </span>
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;