import "./AboutSection.css";
import aboutImage from "../../assets/images/about.jpg";

import {
  FaCheckCircle,
  FaArrowRight,
  FaBroadcastTower,
  FaCogs,
  FaGlobe,
} from "react-icons/fa";

import { motion } from "framer-motion";

function AboutSection() {
  const features = [
    "Broadcast & Media Solutions",
    "Television & Video Technology",
    "Enterprise Technology Solutions",
    "Professional Technical Support",
  ];

  return (
    <section id="about" className="about-section">

      <div className="about-container">

        {/* =================================================
            IMAGE SIDE
        ================================================= */}

        <motion.div
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >

          <div className="about-image">
            <img
              src={aboutImage}
              alt="Qizar Solutions broadcast and media technology"
            />
          </div>

          {/* Floating Experience Card */}

          <motion.div
            className="about-floating-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="floating-icon">
              <FaBroadcastTower />
            </div>

            <div>
              <strong>Technology Driven</strong>
              <span>Broadcast & Media Solutions</span>
            </div>
          </motion.div>

        </motion.div>


        {/* =================================================
            CONTENT SIDE
        ================================================= */}

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* SMALL TITLE */}

          <span className="section-tag">
            ABOUT QIZAR SOLUTIONS
          </span>


          {/* MAIN HEADING */}

          <h2>
            Empowering the Future of
            <span> Broadcast & Media Technology</span>
          </h2>


          {/* DESCRIPTION */}

          <p className="about-main-text">
            Qizar Solutions Pvt. Ltd. delivers innovative technology
            solutions for broadcasters, television service providers
            and modern enterprises.
          </p>

          <p className="about-secondary-text">
            We help organizations adapt to evolving business models,
            emerging technologies and changing media environments by
            providing reliable products, technology solutions and
            professional support.
          </p>


          {/* FEATURES */}

          <div className="about-features">

            {features.map((feature, index) => (

              <motion.div
                key={feature}
                className="about-feature"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >

                <FaCheckCircle />

                <span>{feature}</span>

              </motion.div>

            ))}

          </div>


          {/* MINI INFO CARDS */}

          <div className="about-info-grid">

            <div className="about-info-card">

              <div className="info-icon">
                <FaCogs />
              </div>

              <div>
                <h4>Technology Focused</h4>
                <p>
                  Modern and scalable technology solutions.
                </p>
              </div>

            </div>


            <div className="about-info-card">

              <div className="info-icon">
                <FaGlobe />
              </div>

              <div>
                <h4>Industry Solutions</h4>
                <p>
                  Solutions designed for evolving businesses.
                </p>
              </div>

            </div>

          </div>


          {/* CTA */}

          <div className="about-buttons">

            <a
              href="#services"
              className="about-primary-btn"
            >
              Explore Our Services

              <FaArrowRight />
            </a>

            <a
              href="#contact"
              className="about-secondary-btn"
            >
              Talk To Our Team
            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default AboutSection;