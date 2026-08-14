import "./Footer.css";

import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedinIn,
  FaGlobe,
} from "react-icons/fa";

import { motion } from "framer-motion";


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* =========================================
          FOOTER BACKGROUND DECORATION
      ========================================= */}

      <div className="footer-circle footer-circle-one"></div>
      <div className="footer-circle footer-circle-two"></div>


      <div className="footer-container">


        {/* =========================================
            MAIN FOOTER
        ========================================= */}

        <div className="footer-main">


          {/* =========================================
              COMPANY INFO
          ========================================= */}

          <motion.div
            className="footer-company"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >

            <a
              href="/"
              className="footer-logo"
            >
              Qizar
              <span>Solutions</span>
            </a>


            <p className="footer-description">
              Delivering reliable broadcast, media, storage,
              networking, and professional technology solutions
              for modern organizations.
            </p>


            <div className="footer-status">

              <span className="footer-status-dot"></span>

              <span>
                Technology That Connects
              </span>

            </div>

          </motion.div>


          {/* =========================================
              QUICK LINKS
          ========================================= */}

          <motion.div
            className="footer-column"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            viewport={{
              once: true,
            }}
          >

            <h3>
              Quick Links
            </h3>


            <div className="footer-nav">

              <a href="#home">
                Home
              </a>

              <a href="#about">
                About Us
              </a>

              <a href="#technology">
                Technology
              </a>

              <a href="#services">
                Services
              </a>

              <a href="#products">
                Products
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

          </motion.div>


          {/* =========================================
              SOLUTIONS
          ========================================= */}

          <motion.div
            className="footer-column"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            viewport={{
              once: true,
            }}
          >

            <h3>
              Solutions
            </h3>


            <div className="footer-nav">

              <a href="#technology">
                Broadcast Technology
              </a>

              <a href="#technology">
                Video & Media
              </a>

              <a href="#technology">
                Storage & NAS
              </a>

              <a href="#technology">
                Network Infrastructure
              </a>

              <a href="#services">
                System Integration
              </a>

            </div>

          </motion.div>


          {/* =========================================
              CONTACT
          ========================================= */}

          <motion.div
            className="footer-column footer-contact"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            viewport={{
              once: true,
            }}
          >

            <h3>
              Get In Touch
            </h3>


            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <FaMapMarkerAlt />
              </span>

              <span>
                Professional Technology
                <br />
                Solutions
              </span>

            </div>


            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <FaEnvelope />
              </span>

              <a href="#contact">
                Contact Our Team
              </a>

            </div>


            <div className="footer-contact-item">

              <span className="footer-contact-icon">
                <FaPhoneAlt />
              </span>

              <a href="#contact">
                Contact Us
              </a>

            </div>

          </motion.div>

        </div>


        {/* =========================================
            CTA STRIP
        ========================================= */}

        <motion.div
          className="footer-cta"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
        >

          <div>

            <span>
              HAVE A TECHNOLOGY REQUIREMENT?
            </span>

            <h3>
              Let's build the right solution together.
            </h3>

          </div>


          <a
            href="#contact"
            className="footer-cta-button"
          >

            Talk To Our Team

            <FaArrowRight />

          </a>

        </motion.div>


        {/* =========================================
            FOOTER BOTTOM
        ========================================= */}

        <div className="footer-bottom">


          <p>
            © {currentYear} Qizar Solutions.
            All Rights Reserved.
          </p>


          <div className="footer-bottom-links">

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms & Conditions
            </a>

          </div>


          <div className="footer-socials">

            <a
              href="#"
              aria-label="Qizar Solutions website"
            >
              <FaGlobe />
            </a>

            <a
              href="#"
              aria-label="Qizar Solutions LinkedIn"
            >
              <FaLinkedinIn />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
