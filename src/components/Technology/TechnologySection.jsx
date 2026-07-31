import "./TechnologySection.css";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
} from "react-icons/fa";

import {
  SiMongodb,
  SiMysql,
  SiJavascript,
} from "react-icons/si";

import { motion } from "framer-motion";

const technologies = [
  { icon: <FaReact />, name: "React JS" },
  { icon: <FaNodeJs />, name: "Node JS" },
  { icon: <FaPython />, name: "Python" },
  { icon: <FaAws />, name: "AWS" },
  { icon: <FaDocker />, name: "Docker" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiMysql />, name: "MySQL" },
  { icon: <SiJavascript />, name: "JavaScript" },
];

function TechnologySection() {
  return (
    <section className="technology-section">

      <div className="section-title">
        <span>TECHNOLOGIES</span>

        <h2>Technologies We Work With</h2>

        <p>
          We use modern technologies to build secure, scalable and
          high-performance digital solutions.
        </p>
      </div>

      <div className="technology-grid">

        {technologies.map((tech, index) => (

          <motion.div
            key={index}
            className="technology-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="tech-icon">
              {tech.icon}
            </div>

            <h3>{tech.name}</h3>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default TechnologySection;