import "./ClientsSection.css";

import {
  FaBroadcastTower,
  FaDatabase,
  FaNetworkWired,
  FaServer,
  FaVideo,
  FaCloud,
} from "react-icons/fa";

import { motion } from "framer-motion";


const technologyAreas = [
  {
    icon: <FaBroadcastTower />,
    title: "Broadcast",
    description: "Professional broadcast environments",
  },

  {
    icon: <FaVideo />,
    title: "Media & Video",
    description: "Modern media technology workflows",
  },

  {
    icon: <FaDatabase />,
    title: "Storage",
    description: "Professional storage infrastructure",
  },

  {
    icon: <FaNetworkWired />,
    title: "Networking",
    description: "Reliable network connectivity",
  },

  {
    icon: <FaServer />,
    title: "Infrastructure",
    description: "Scalable technology infrastructure",
  },

  {
    icon: <FaCloud />,
    title: "Cloud Technology",
    description: "Flexible modern infrastructure",
  },
];


function ClientsSection() {
  return (
    <section
      id="clients"
      className="clients-section"
    >

      {/* =========================================
          BACKGROUND DECORATION
      ========================================= */}

      <div className="clients-circle clients-circle-one"></div>

      <div className="clients-circle clients-circle-two"></div>


      <div className="clients-container">


        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <motion.div
          className="clients-heading"

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

          <div className="clients-badge">

            <span className="clients-badge-dot"></span>

            OUR TECHNOLOGY ECOSYSTEM

          </div>


          <h2>
            Technology Built Around
            <span> Real-World Requirements</span>
          </h2>


          <p>
            We work across a broad technology ecosystem to deliver
            dependable solutions for broadcast, media, storage,
            networking, infrastructure, and enterprise environments.
          </p>

        </motion.div>


        {/* =========================================
            TECHNOLOGY AREAS
        ========================================= */}

        <div className="clients-grid">

          {technologyAreas.map((item, index) => (

            <motion.div
              key={item.title}

              className="client-card"

              initial={{
                opacity: 0,
                y: 30,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}

              viewport={{
                once: true,
                amount: 0.15,
              }}

              whileHover={{
                y: -6,
              }}
            >

              {/* ICON */}

              <div className="client-icon">
                {item.icon}
              </div>


              {/* CONTENT */}

              <div className="client-content">

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

              </div>


              {/* NUMBER */}

              <span className="client-number">
                0{index + 1}
              </span>

            </motion.div>

          ))}

        </div>


        {/* =========================================
            TRUST STRIP
        ========================================= */}

        <motion.div
          className="clients-trust"

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

          <div className="trust-mark">

            <span></span>

            Professional Technology

          </div>


          <div className="trust-divider"></div>


          <div className="trust-text">
            Solutions designed for performance,
            reliability, and long-term scalability.
          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default ClientsSection;
