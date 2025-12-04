import { motion } from "framer-motion";
import useStore from "../store/useStore";

export default function MarqueeBar() {
  const carBrands = useStore((s) => s.carBrands) || [
    "Toyota", "Honda", "Maruti", "Hyundai", "Tata", "Mahindra", 
    "Kia", "Renault", "Volkswagen", "Skoda", "BMW", "Audi"
  ];

  return (
    <section className="bg-black text-white py-6 overflow-hidden border-y border-white/10">
      <div className="relative w-full">
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ["0", "-100%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* First set of brands */}
          {carBrands.map((brand, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 whitespace-nowrap text-center"
            >
              <p className="text-lg font-bold tracking-wide text-gray-300 hover:text-red-500 transition duration-300">
                {brand}
              </p>
            </div>
          ))}
          {/* Duplicate set of brands for seamless loop */}
          {carBrands.map((brand, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0 whitespace-nowrap text-center"
            >
              <p className="text-lg font-bold tracking-wide text-gray-300 hover:text-red-500 transition duration-300">
                {brand}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
