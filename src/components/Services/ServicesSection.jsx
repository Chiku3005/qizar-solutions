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
      "Complete broadcast solutions for television, radio and media production.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Services",
    description:
      "Secure cloud deployment, storage and enterprise cloud infrastructure.",
  },
  {
    icon: <FaVideo />,
    title: "Audio & Video",
    description:
      "Professional AV systems, streaming and multimedia integration.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Networking",
    description:
      "Reliable networking infrastructure for businesses and enterprises.",
  },
  {
    icon: <FaTools />,
    title: "Technical Support",
    description:
      "Dedicated engineers providing installation and after-sales support.",
  },
  {
    icon: <FaServer />,
    title: "IT Infrastructure",
    description:
      "Servers, storage, virtualization and enterprise IT solutions.",
  },
];

function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-[#c82b2b] font-semibold uppercase tracking-widest">
            Our Services
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
            Solutions We Provide
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            We provide end-to-end technology solutions for broadcasting,
            enterprise networking, IT infrastructure and digital transformation.
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