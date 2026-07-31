import "./AboutSection.css";
import aboutImage from "../../assets/images/about.jpg";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src={aboutImage} alt="About Qizar Solutions" />
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <span className="section-tag">
  ABOUT US
</span>

<h2>
  Welcome to Qizar Solutions Pvt. Ltd.
</h2>

<p>
  Qizar Solutions Pvt. Ltd. empowers broadcasters, television service providers,
  and enterprises with innovative technology solutions. As the media and
  broadcasting industry evolves with new business models, emerging technologies,
  and digital-first audiences, we help organizations adapt through reliable,
  scalable, and future-ready solutions.
</p>

<p>
  Our experienced team specializes in workflow optimization, facility planning,
  system integration, and outsourcing solutions. By combining industry expertise
  with cutting-edge technology, we enable businesses to improve efficiency,
  accelerate digital transformation, and deliver exceptional customer experiences.
</p>

         <div className="about-features">

  <div>
    <FaCheckCircle />
    <span>Broadcast & Media Solutions</span>
  </div>

  <div>
    <FaCheckCircle />
    <span>Workflow & Facility Planning</span>
  </div>

  <div>
    <FaCheckCircle />
    <span>System Integration Services</span>
  </div>

  <div>
    <FaCheckCircle />
    <span>Technology Consulting</span>
  </div>

</div>

          <div className="about-buttons">

  <a href="#services" className="primary-btn">
    Our Services
  </a>

  <a href="#contact" className="secondary-btn">
    Get in Touch <FaArrowRight />
  </a>

</div>
        </motion.div>

      </div>

    </section>
  );
}

export default AboutSection;