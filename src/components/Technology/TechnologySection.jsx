import "./TechnologySection.css";

import {
  FaBroadcastTower,
  FaVideo,
  FaDatabase,
  FaNetworkWired,
  FaServer,
  FaExchangeAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";


const technologies = [
  {
    number: "01",
    icon: <FaBroadcastTower />,
    title: "Broadcast Technology",
    description:
      "Professional technology solutions designed for broadcast networks, television environments, media organizations, and content delivery workflows.",
    tags: ["Broadcast", "Media", "TV"],
  },

  {
    number: "02",
    icon: <FaVideo />,
    title: "Video & Media",
    description:
      "Advanced video and media technologies supporting professional content workflows, signal management, production, and distribution.",
    tags: ["Video", "Media", "Content"],
  },

  {
    number: "03",
    icon: <FaExchangeAlt />,
    title: "Signal Conversion",
    description:
      "Professional signal conversion technologies that help connect, adapt, and integrate different video and broadcast interfaces.",
    tags: ["HDMI", "SDI", "Signal"],
  },

  {
    number: "04",
    icon: <FaDatabase />,
    title: "Storage & NAS",
    description:
      "Professional storage and NAS technologies designed for reliable data management, backup, scalability, and demanding media environments.",
    tags: ["NAS", "Storage", "Backup"],
  },

  {
    number: "05",
    icon: <FaNetworkWired />,
    title: "Network Infrastructure",
    description:
      "Reliable networking technologies that support high-speed connectivity, communication, data transfer, and connected technology environments.",
    tags: ["Networking", "Connectivity", "Data"],
  },

  {
    number: "06",
    icon: <FaServer />,
    title: "Enterprise Infrastructure",
    description:
      "Scalable infrastructure technologies designed to support professional, enterprise, broadcast, and media-focused environments.",
    tags: ["Servers", "Infrastructure", "Enterprise"],
  },
];


function TechnologySection() {
  return (
    <section
      id="technology"
      className="technology-section"
    >

      {/* =========================================
          BACKGROUND DECORATION
      ========================================= */}

      <div className="technology-circle technology-circle-one"></div>

      <div className="technology-circle technology-circle-two"></div>

      <div className="technology-grid-pattern"></div>


      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="technology-container">


        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <motion.div
          className="technology-header"
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

          <div className="technology-badge">

            <span className="technology-badge-dot"></span>

            OUR TECHNOLOGY

          </div>


          <h2 className="technology-title">

            Technology That
            <span> Connects Possibilities</span>

          </h2>


          <p className="technology-description">
            We work across professional broadcast, media, signal,
            storage, networking, and infrastructure technologies
            to deliver reliable solutions for modern organizations.
          </p>

        </motion.div>


        {/* =========================================
            TECHNOLOGY CARDS
        ========================================= */}

        <div className="technology-grid">

          {technologies.map((technology, index) => (

            <motion.article
              key={technology.number}
              className="technology-card"

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
              }}

              viewport={{
                once: true,
                amount: 0.15,
              }}

              whileHover={{
                y: -7,
              }}
            >

              {/* TOP LINE */}

              <div className="technology-card-line"></div>


              {/* NUMBER */}

              <span className="technology-number">
                {technology.number}
              </span>


              {/* ICON */}

              <div className="technology-icon">
                {technology.icon}
              </div>


              {/* CONTENT */}

              <div className="technology-card-content">

                <h3>
                  {technology.title}
                </h3>

                <p>
                  {technology.description}
                </p>


                {/* TAGS */}

                <div className="technology-tags">

                  {technology.tags.map((tag) => (

                    <span key={tag}>
                      {tag}
                    </span>

                  ))}

                </div>

              </div>


              {/* ARROW */}

              <div className="technology-arrow">
                <FaArrowRight />
              </div>

            </motion.article>

          ))}

        </div>


        {/* =========================================
            TECHNOLOGY FOOTER
        ========================================= */}

        <motion.div
          className="technology-bottom"

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

          <div className="technology-bottom-content">

            <div className="technology-check-icon">
              <FaCheckCircle />
            </div>

            <div>

              <strong>
                Professional Technology. Reliable Solutions.
              </strong>

              <p>
                Designed around the technical requirements of
                modern broadcast, media, and enterprise environments.
              </p>

            </div>

          </div>


          <a
            href="#products"
            className="technology-products-link"
          >

            <span>
              Explore Our Products
            </span>

            <FaArrowRight />

          </a>

        </motion.div>

      </div>

    </section>
  );
}

export default TechnologySection;
