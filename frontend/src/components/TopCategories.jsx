import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import { TbCar } from "react-icons/tb";
import { MdLightbulb, MdCarRepair } from "react-icons/md";
import { motion } from "framer-motion";

const categories = [
  { icon: <TbCar size={40} />, label: "Shop By Car" },
  { icon: <GiCarSeat size={40} />, label: "Interior" },
  { icon: <GiCarDoor size={40} />, label: "Exterior" },
  { icon: <MdLightbulb size={40} />, label: "Lighting" },
  { icon: <GiCarBattery size={40} />, label: "Utility" },
  { icon: <GiCarWheel size={40} />, label: "Electronics" },
  { icon: <MdCarRepair size={40} />, label: "Car Parts" },
  { icon: <GiCarKey size={40} />, label: "Care & Styling" },
];

export default function TopCategories() {
  return (
    <section className="bg-black text-white py-20 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold drop-shadow-md">
          🧩 Top Categories
        </h2>
        <p className="text-gray-300 mt-2">
          Explore by product type for upgraded style & performance
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-6">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.17,
              rotateX: 12,
              rotateY: -12,
              translateZ: 10,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-lg 
                       p-6 flex flex-col items-center justify-center cursor-pointer 
                       hover:shadow-[0_0_28px_#0000ff80] hover:border-blue-500
                       transition"
          >
            <div className="text-blue-500 group-hover:text-blue-400 drop-shadow-md">
              {item.icon}
            </div>
            <h3 className="mt-3 font-semibold text-lg tracking-wide">
              {item.label}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Soft glow background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="w-72 h-72 bg-blue-600 opacity-10 blur-[120px] absolute -top-20 -left-20"></div>
        <div className="w-72 h-72 bg-blue-600 opacity-10 blur-[120px] absolute bottom-0 right-0"></div>
      </div>
    </section>
  );
}
