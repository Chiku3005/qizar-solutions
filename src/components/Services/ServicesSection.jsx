import "./ServicesSection.css";

import {
  FaBroadcastTower,
  FaVideo,
  FaDatabase,
  FaNetworkWired,
  FaServer,
  FaTools,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { motion } from "framer-motion";


const services = [
  {
    icon: <FaBroadcastTower />,
    number: "01",
    title: "Broadcast Solutions",
    description:
      "Professional broadcast technology solutions designed for broadcasters, television networks, media organizations, and content providers.",
  },

  {
    icon: <FaVideo />,
    number: "02",
    title: "Video & Media Solutions",
    description:
      "Reliable video and media technologies supporting professional content workflows, signal management, production, and distribution.",
  },

  {
    icon: <FaDatabase />,
    number: "03",
    title: "Storage & Data Solutions",
    description:
      "High-performance storage and data infrastructure solutions designed for secure, scalable, and dependable business environments.",
  },

  {
    icon: <FaNetworkWired />,
    number: "04",
    title: "Networking Solutions",
    description:
      "Reliable networking infrastructure that enables efficient connectivity, communication, data transfer, and system performance.",
  },

  {
    icon: <FaServer />,
    number: "05",
    title: "Enterprise Infrastructure",
    description:
      "Professional infrastructure solutions built to support demanding enterprise, media, broadcast, and organizational environments.",
  },

  {
    icon: <FaTools />,
    number: "06",
    title: "Integration & Technical Support",
    description:
      "End-to-end technology integration, deployment assistance, workflow planning, and professional technical support for your organization.",
  },
];


function ServicesSection() {
  return (
    <section className="services-section" id="services">

      {/* ==========================================
          BACKGROUND DECORATION
      ========================================== */}

      <div className="services-bg-circle services-circle-one"></div>

      <div className="services-bg-circle services-circle-two"></div>

      <div className="services-grid-pattern"></div>


      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="services-container">


        {/* ==========================================
            SECTION HEADER
        ========================================== */}

        <motion.div
          className="services-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          <div className="services-badge">
            <span className="services-badge-dot"></span>

            OUR SERVICES
          </div>


          <h2 className="services-title">
            Technology Solutions
            <span> Built Around Your Needs</span>
          </h2>


          <p className="services-description">
            From broadcast and media technology to professional storage,
            networking, infrastructure, and system integration, we provide
            dependable solutions designed for modern organizations.
          </p>

        </motion.div>


        {/* ==========================================
            SERVICES GRID
        ========================================== */}

        <div className="services-grid">

          {services.map((service, index) => (

            <motion.article
              key={service.number}
              className="service-card"
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              whileHover={{
                y: -7,
              }}
            >

              {/* TOP ACCENT */}

              <div className="service-card-line"></div>


              {/* NUMBER */}

              <span className="service-number">
                {service.number}
              </span>


              {/* ICON */}

              <div className="service-icon">
                {service.icon}
              </div>


              {/* TITLE */}

              <h3 className="service-title">
                {service.title}
              </h3>


              {/* DESCRIPTION */}

              <p className="service-description">
                {service.description}
              </p>


              {/* LEARN MORE */}

              <a
                href="#contact"
                className="service-link"
              >
                <span>Discuss Your Requirements</span>

                <FaArrowRight />
              </a>

            </motion.article>

          ))}

        </div>


        {/* ==========================================
            SERVICE HIGHLIGHTS
        ========================================== */}

        <motion.div
          className="services-highlights"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
        >

          <div className="highlight-item">

            <FaCheckCircle />

            <span>
              Professional Technology
            </span>

          </div>


          <div className="highlight-item">

            <FaCheckCircle />

            <span>
              Reliable Infrastructure
            </span>

          </div>


          <div className="highlight-item">

            <FaCheckCircle />

            <span>
              Scalable Solutions
            </span>

          </div>


          <div className="highlight-item">

            <FaCheckCircle />

            <span>
              Technical Expertise
            </span>

          </div>

        </motion.div>


        {/* ==========================================
            BOTTOM CTA
        ========================================== */}

        <motion.div
          className="services-cta"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          {/* CTA DECORATION */}

          <div className="cta-glow"></div>

          <div className="cta-pattern"></div>


          {/* CTA CONTENT */}

          <div className="services-cta-content">

            <span className="cta-label">
              HAVE A REQUIREMENT?
            </span>

            <h3>
              Let's Build the Right
              <span> Technology Solution.</span>
            </h3>

            <p>
              Tell us about your requirements and our team can
              help identify the right technology, infrastructure,
              and solution for your organization.
            </p>

          </div>


          {/* CTA BUTTON */}

          <a
            href="#contact"
            className="services-cta-button"
          >
            <span>
              Talk To Our Team
            </span>

            <FaArrowRight />
          </a>

        </motion.div>

      </div>

    </section>
  );
}

export default ServicesSection;
