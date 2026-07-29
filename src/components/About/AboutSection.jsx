import { motion } from "framer-motion";
import aboutImage from "../../assets/images/about.jpg";

function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutImage}
            alt="About Qizar Solutions"
            className="rounded-2xl shadow-xl w-full"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#c82b2b] font-semibold uppercase tracking-widest">
            ABOUT US
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight text-gray-900">
            Your Trusted Technology Partner
          </h2>

          <p className="mt-8 text-gray-600 leading-8 text-lg">
            Qizar Solutions delivers innovative broadcast, networking,
            enterprise IT, and media technology solutions for businesses
            across India. We are committed to providing high-quality
            products, expert consultation, and reliable technical support.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-[#c82b2b]">
                15+
              </h3>

              <p className="mt-2 text-gray-600">
                Years of Experience
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-[#c82b2b]">
                500+
              </h3>

              <p className="mt-2 text-gray-600">
                Successful Projects
              </p>
            </div>

          </div>

          <button className="mt-10 bg-[#c82b2b] text-white px-8 py-4 rounded-lg hover:bg-[#a61f1f] transition duration-300 shadow-lg">
            Learn More
          </button>

        </motion.div>

      </div>
    </section>
  );
}

export default AboutSection;