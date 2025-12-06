import { FaUsers, FaShoppingCart, FaTools } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { motion } from "framer-motion";

export default function StatsBar() {
  const stats = [
    {
      icon: <FaShoppingCart size={32} />,
      label: "Products Sold",
      value: "52,340+",
    },
    {
      icon: <FaUsers size={32} />,
      label: "Happy Customers",
      value: "18,900+",
    },
    {
      icon: <MdLocalShipping size={32} />,
      label: "Orders Delivered",
      value: "47,500+",
    },
    {
      icon: <FaTools size={32} />,
      label: "Parts in Inventory",
      value: "3,200+",
    },
  ];

  return (
    <section className="w-full bg-black py-10 relative overflow-hidden border-b border-white/10">
      {/* Carbon fiber background */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-10 pointer-events-none"></div>

      {/* Heading */}
      <div className="relative text-center mb-10">
        <h2 className="text-4xl font-bold text-white tracking-wide">
          Performance. Reliability. Trust.
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Delivering high-quality car parts to thousands of enthusiasts and professionals.
        </p>
      </div>

      {/* Glass stats container */}
      <div
        className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8
                   backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl py-10"
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="text-red-500 mb-3">{item.icon}</div>

            <h3 className="text-3xl font-bold text-white drop-shadow-lg">
              {item.value}
            </h3>

            <p className="text-gray-400 text-sm mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
