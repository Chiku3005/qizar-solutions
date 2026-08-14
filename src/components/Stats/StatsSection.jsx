import "./StatsSection.css";

import {
  FaBroadcastTower,
  FaServer,
  FaNetworkWired,
  FaUsers,
} from "react-icons/fa";

import { motion } from "framer-motion";

const stats = [
  {
    icon: <FaBroadcastTower />,
    number: "10+",
    label: "Years of Experience",
    description: "Industry expertise",
  },
  {
    icon: <FaServer />,
    number: "50+",
    label: "Technology Solutions",
    description: "Products & solutions",
  },
  {
    icon: <FaNetworkWired />,
    number: "25+",
    label: "Projects Delivered",
    description: "Successful deployments",
  },
  {
    icon: <FaUsers />,
    number: "100+",
    label: "Clients & Partners",
    description: "Across industries",
  },
];

function StatsSection() {
  return (
    <section className="stats-section">

      {/* Background decoration */}
      <div className="stats-bg-circle stats-circle-one"></div>
      <div className="stats-bg-circle stats-circle-two"></div>

      <div className="stats-container">

        {/* Section heading */}
        <motion.div
          className="stats-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span>OUR EXPERTISE</span>

          <h2>
            Technology That
            <span> Delivers Results</span>
          </h2>

          <p>
            Combining industry expertise, reliable technology and
            professional support to deliver solutions that make a
            difference.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="stats-grid">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
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
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-content">

                <h3>
                  {stat.number}
                </h3>

                <h4>
                  {stat.label}
                </h4>

                <p>
                  {stat.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default StatsSection;