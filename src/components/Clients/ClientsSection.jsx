import "./ClientsSection.css";
import { motion } from "framer-motion";

const clients = [
  "MICROSOFT",
  "CISCO",
  "DELL",
  "HP",
  "LENOVO",
  "AWS",
  "VMWARE",
  "FORTINET",
];

function ClientsSection() {
  return (
    <section className="clients-section">

      <div className="clients-heading">

        <span>OUR PARTNERS</span>

        <h2>Trusted Technologies & Partners</h2>

        <p>
          We collaborate with leading technology platforms and industry
          solutions to deliver reliable, scalable, and innovative services.
        </p>

      </div>

      <div className="clients-grid">

        {clients.map((client, index) => (

          <motion.div
            key={index}
            className="client-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            {client}
          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default ClientsSection;