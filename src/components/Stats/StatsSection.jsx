import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaUsers,
  FaProjectDiagram,
  FaAward,
  FaHeadset,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaAward />,
    end: 15,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: <FaProjectDiagram />,
    end: 500,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    icon: <FaUsers />,
    end: 120,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    icon: <FaHeadset />,
    end: 24,
    suffix: "/7",
    label: "Technical Support",
  },
];

function StatCard({ icon, end, suffix, label }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
    >
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#c82b2b] text-white flex items-center justify-center text-3xl">
        {icon}
      </div>

      <h2 className="text-5xl font-bold text-[#c82b2b]">
        {inView && <CountUp end={end} duration={2} />}
        {suffix}
      </h2>

      <p className="mt-4 text-gray-600 font-medium">
        {label}
      </p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-[#c82b2b] font-semibold uppercase tracking-widest">
            Our Achievements
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
            Trusted Across Industries
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            Our commitment to innovation, quality and customer satisfaction
            has helped us build long-term relationships across India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              end={item.end}
              suffix={item.suffix}
              label={item.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;