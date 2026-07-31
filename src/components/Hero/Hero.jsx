import "./Hero.css";
import heroImage from "../../assets/images/Hero - Copy.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero">

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        <span className="hero-tag">
          Empowering Digital Transformation
        </span>

        <h1>
          Innovative IT Solutions
          <span> for Modern Businesses</span>
        </h1>

        <p>
          <div className="hero-badge">
  🚀 Trusted Technology Partner
</div>
          <p>
  Qizar Solutions empowers businesses with innovative software,
  AI-driven applications, cloud infrastructure, enterprise IT,
  and digital transformation services tailored for long-term growth.
</p>
        </p>

        <div className="hero-list">

          <div>
            <FaCheckCircle />
            <span>Software Development</span>
          </div>

          <div>
            <FaCheckCircle />
            <span>Cloud Solutions</span>
          </div>

          <div>
            <FaCheckCircle />
            <span>AI & Automation</span>
          </div>

        </div>

       <div className="hero-buttons">

  <a href="#contact" className="primary-btn">
    Get Started
  </a>

  <a href="#services" className="secondary-btn">
    Explore Services
  </a>

</div>

        <div className="hero-stats">

          <div>
            <h2>100+</h2>
            <p>Projects Delivered</p>
          </div>

          <div>
            <h2>50+</h2>
            <p>Happy Clients</p>
          </div>

          <div>
            <h2>24/7</h2>
            <p>Technical Support</p>
          </div>

        </div>

      </motion.div>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={heroImage} alt="Hero" />
      </motion.div>

      <div data-aos="fade-up">
  ...
</div>

    </section>
  );
}

export default Hero;