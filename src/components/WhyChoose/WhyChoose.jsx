import {
  FaShieldAlt,
  FaUsers,
  FaHeadset,
  FaTruck,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLightbulb />,
    title: "Latest Technology",
    description:
      "We provide modern broadcast, media and enterprise technology solutions.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Trusted Quality",
    description:
      "Premium products sourced from leading global technology brands.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Dedicated technical experts available whenever you need assistance.",
  },
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    description:
      "Efficient logistics ensuring safe and timely delivery across India.",
  },
  {
    icon: <FaUsers />,
    title: "Professional Team",
    description:
      "Experienced engineers and certified professionals delivering excellence.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Customer Satisfaction",
    description:
      "Building long-term relationships through reliable service and support.",
  },
];

function WhyChoose() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-[#c82b2b] font-semibold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
            Why Businesses Trust Qizar Solutions
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            We combine innovative technology, expert support and quality
            products to deliver reliable business solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="w-16 h-16 rounded-full bg-[#c82b2b] text-white flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;