
import "./Hero.css";

import heroImage from "../../assets/images/Hero - Copy.jpg";

import {
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaBroadcastTower,
  FaGraduationCap,
  FaServer,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero" id="home">

      {/* ==========================================
          BACKGROUND DECORATION
      ========================================== */}

      <div className="hero-bg-circle hero-circle-one"></div>
      <div className="hero-bg-circle hero-circle-two"></div>

      <div className="hero-grid-pattern"></div>


      {/* ==========================================
          LEFT CONTENT
      ========================================== */}

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >

        {/* BADGE */}

        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="badge-dot"></span>

          <span>Broadcast & Education Solutions</span>
        </motion.div>


        {/* MAIN HEADING */}

        <h1 className="hero-title">
          Empowering
          <span> Broadcast </span>

          <br />

          <span>& Media</span> Technology
        </h1>


        {/* DESCRIPTION */}

        <p className="hero-description">
          We deliver reliable broadcast, media and education
          technology solutions designed to help organizations
          connect, communicate and grow.
        </p>


        {/* SERVICES */}

        <div className="hero-list">

          <div className="hero-list-item">
            <FaCheckCircle />
            <span>Broadcast & Media Solutions</span>
          </div>

          <div className="hero-list-item">
            <FaCheckCircle />
            <span>Professional Technology Products</span>
          </div>

          <div className="hero-list-item">
            <FaCheckCircle />
            <span>Education & Enterprise Solutions</span>
          </div>

        </div>


        {/* BUTTONS */}

        <div className="hero-buttons">

          <motion.a
            href="#products"
            className="primary-btn"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Explore Products</span>
            <FaArrowRight />
          </motion.a>


          <motion.a
            href="#about"
            className="secondary-btn"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="play-icon">
              <FaPlay />
            </span>

            <span>Discover More</span>
          </motion.a>

        </div>


        {/* STATS */}

        <div className="hero-stats">

          <div className="hero-stat">

            <div className="stat-icon">
              <FaBroadcastTower />
            </div>

            <div className="stat-content">
              <h3>Broadcast</h3>
              <p>Technology</p>
            </div>

          </div>


          <div className="stat-divider"></div>


          <div className="hero-stat">

            <div className="stat-icon">
              <FaGraduationCap />
            </div>

            <div className="stat-content">
              <h3>Education</h3>
              <p>Solutions</p>
            </div>

          </div>


          <div className="stat-divider"></div>


          <div className="hero-stat">

            <div className="stat-icon">
              <FaServer />
            </div>

            <div className="stat-content">
              <h3>Enterprise</h3>
              <p>Technology</p>
            </div>

          </div>

        </div>

      </motion.div>


      {/* ==========================================
          RIGHT VISUAL
      ========================================== */}

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: "easeOut",
        }}
      >

        {/* DECORATIVE GLOW */}

        <div className="hero-image-glow"></div>


        {/* IMAGE */}

        <div className="hero-image-wrapper">

          <img
            src={heroImage}
            alt="Qizar Solutions technology solutions"
            className="hero-image"
          />

          <div className="hero-image-overlay"></div>

          <div className="hero-image-shine"></div>

        </div>


        {/* FLOATING CARD 1 */}

        <motion.div
          className="hero-floating-card hero-card-one"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          <div className="floating-icon">
            <FaBroadcastTower />
          </div>

          <div className="floating-content">

            <strong>Broadcast</strong>

            <span>Technology Solutions</span>

          </div>

        </motion.div>


        {/* FLOATING CARD 2 */}

        <motion.div
          className="hero-floating-card hero-card-two"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          <div className="floating-icon">
            <FaServer />
          </div>

          <div className="floating-content">

            <strong>Professional</strong>

            <span>Technology Products</span>

          </div>

        </motion.div>


        {/* TECHNOLOGY LABEL */}

        <motion.div
          className="hero-tech-label"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.5,
          }}
        >

          <span className="tech-pulse"></span>

          <span>Technology That Connects</span>

        </motion.div>


        {/* SMALL DECORATIVE ELEMENT */}

        <div className="hero-visual-dot hero-dot-one"></div>
        <div className="hero-visual-dot hero-dot-two"></div>

      </motion.div>

    </section>
  );
}

export default Hero;
