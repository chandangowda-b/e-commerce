// import { motion } from "framer-motion";
// import steeringWheel from "../assets/products/steering_wheel.png";


// const products = [
//   { img: steeringWheel, title: "Premium Alloy Wheel", price: "$199" },
//   { img: steeringWheel, title: "Sport Seat Cover", price: "$149" },
//   { img: steeringWheel, title: "LED Headlight", price: "$249" },
//   { img: steeringWheel, title: "Long-Life Battery", price: "$179" },
//   { img: steeringWheel, title: "Premium Alloy Wheel", price: "$199" },
//   { img: steeringWheel, title: "Sport Seat Cover", price: "$149" },
//   { img: steeringWheel, title: "LED Headlight", price: "$249" },
//   { img: steeringWheel, title: "Long-Life Battery", price: "$179" },
// ];


// export default function FeaturedProducts() {
//   return (
//     <section className="bg-black text-white py-20 overflow-hidden relative">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-xl">
//           🔥 Featured Products
//         </h2>
//         <p className="text-gray-400 mt-2">
//           Boost performance & style with premium upgrades
//         </p>
//       </div>

//       <motion.div
//         drag="x"
//         dragConstraints={{ left: -800, right: 0 }}
//         // className="flex gap-8 px-6 cursor-grab active:cursor-grabbing"
//         className="flex gap-8 px-6 cursor-grab active:cursor-grabbing"

//       >
//         {products.map((item, index) => (
//           <motion.div
//             key={index}
//             whileHover={{
//               scale: 1.15,
//               rotateY: 12,
//               rotateX: -8,
//               zIndex: 20,
//             }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="min-w-[240px] bg-white/10 backdrop-blur-lg border border-white/20 
//             rounded-2xl p-5 shadow-lg hover:shadow-[0_0_25px_#ff0000bb] hover:border-red-600 
//             transition select-none"
//           >
//             <img
//               src={item.img}
//               alt={item.title}
//               className="w-full h-36 object-contain drop-shadow-xl"
//             />

//             <h3 className="mt-4 text-lg font-semibold tracking-wide">
//               {item.title}
//             </h3>
//             <p className="text-red-400 font-bold mt-1">{item.price}</p>

//             <button className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 
//               rounded-lg shadow-lg text-sm font-semibold tracking-wide transition">
//               View Details
//             </button>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Soft gradient sides for depth */}
//       <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black pointer-events-none"></div>
//       <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black pointer-events-none"></div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import steeringWheel from "../assets/products/steering_wheel.png";

const products = [
  { img: steeringWheel, title: "Premium Alloy Wheel", price: "$199" },
  { img: steeringWheel, title: "Sport Seat Cover", price: "$149" },
  { img: steeringWheel, title: "LED Headlight", price: "$249" },
  { img: steeringWheel, title: "Long-Life Battery", price: "$179" },
  { img: steeringWheel, title: "Premium Alloy Wheel", price: "$199" },
  { img: steeringWheel, title: "Sport Seat Cover", price: "$149" },
  { img: steeringWheel, title: "LED Headlight", price: "$249" },
  { img: steeringWheel, title: "Long-Life Battery", price: "$179" },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-black text-white py-20 relative">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-xl">
          Featured Products
        </h2>
        <p className="text-gray-400 mt-2">
          Boost performance & style with premium upgrades
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        className="flex gap-8 px-6 overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.15,
              rotateY: 12,
              rotateX: -8,
              zIndex: 20,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="min-w-60 bg-white/10 backdrop-blur-lg border 
              border-white/20 rounded-2xl p-5 shadow-lg 
              hover:shadow-[0_0_25px_#ff0000bb] hover:border-red-600 
              transition select-none snap-start"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-36 object-contain drop-shadow-xl"
            />

            <h3 className="mt-4 text-lg font-semibold tracking-wide">
              {item.title}
            </h3>
            <p className="text-red-400 font-bold mt-1">{item.price}</p>

            <button className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 
              rounded-lg shadow-lg text-sm font-semibold tracking-wide transition">
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Soft gradient sides */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black pointer-events-none"></div>
    </section>
  );
}

