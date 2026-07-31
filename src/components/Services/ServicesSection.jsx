import {
  FaBroadcastTower,
  FaCloud,
  FaVideo,
  FaNetworkWired,
  FaTools,
  FaServer,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaBroadcastTower />,
    title: "Broadcast Solutions",
    description:
      "Advanced broadcast technology solutions for television networks, media companies, and content providers."
  },
  {
    icon: <FaServer />,
    title: "System Integration",
    description:
      "Seamless integration of enterprise hardware, software, and network infrastructure for efficient operations."
  },
  {
    icon: <FaCloud />,
    title: "Cloud Infrastructure",
    description:
      "Scalable cloud deployment, migration, virtualization, and infrastructure management services."
  },
  {
    icon: <FaVideo />,
    title: "Media Workflow",
    description:
      "Optimized media asset management, production workflows, and content delivery solutions."
  },
  {
    icon: <FaNetworkWired />,
    title: "Enterprise Networking",
    description:
      "Secure, high-performance networking solutions designed for enterprise and broadcast environments."
  },
  {
    icon: <FaTools />,
    title: "Technology Consulting",
    description:
      "Professional consulting, facility planning, and workflow optimization to accelerate digital transformation."
  }
];
function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#c82b2b] font-semibold uppercase tracking-widest">
            Our Services
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
  Our Expertise
</h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
  We deliver end-to-end technology solutions for broadcasters,
  media organizations, and enterprises through innovative
  infrastructure, storage, networking, and system integration services.
</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-[#c82b2b] rounded-full flex items-center justify-center text-white text-3xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>

              <button className="mt-6 text-[#c82b2b] font-semibold hover:underline">
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;