import "./WhyChooseUs.css";
import {
  FaAward,
  FaUsers,
  FaHeadset,
  FaRocket,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

import { motion } from "framer-motion";

const features = [
  {
    icon: <FaAward />,
    title: "Quality Assurance",
    description:
      "Delivering reliable and high-quality technology solutions with industry best practices.",
  },
  {
    icon: <FaUsers />,
    title: "Expert Team",
    description:
      "Experienced professionals dedicated to innovative software and IT solutions.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Quick technical assistance and customer support whenever you need it.",
  },
  {
    icon: <FaRocket />,
    title: "Fast Delivery",
    description:
      "Efficient project execution with timely delivery and complete transparency.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Solutions",
    description:
      "Building secure and scalable digital products for long-term business growth.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    description:
      "Leveraging modern technologies to create future-ready business solutions.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="section-heading">

        <span>WHY CHOOSE US</span>

        <h2>Why Businesses Trust Qizar Solutions</h2>

        <p>
          We combine innovation, technical expertise, and customer-focused
          solutions to help businesses grow in today's digital world.
        </p>

      </div>

      <div className="why-grid">

        {features.map((item, index) => (

          <motion.div
            key={index}
            className="why-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >

            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;