import React, { useState, useRef } from "react";
import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import { TbCar } from "react-icons/tb";
import { MdLightbulb, MdCarRepair } from "react-icons/md";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import BrandModal from "./BrandModal";

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
  const carBrands = useStore((s) => s.carBrands || []);
  const allProducts = useStore((s) => s.allProducts || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBrand, setModalBrand] = useState(null);
  const [modalProducts, setModalProducts] = useState([]);

  // extra brands to ensure variety
  const extraBrands = ["Honda", "Hyundai", "Kia", "Nissan", "Chevrolet", "Volkswagen", "Subaru"];
  const brands = Array.from(new Set([...(carBrands || []), ...extraBrands]));

  const brandImgs = [
    new URL("../assets/cars/3338b8ba-d1c6-40d7-b7cb-726f50ccb0e0.jpg", import.meta.url).href,
    new URL("../assets/cars/3c75e88f-fe14-40c3-9e01-e8c336e6920b.jpg", import.meta.url).href,
    new URL("../assets/cars/5f5e69a4-a721-447a-ae38-5b9df1ef477a.jpg", import.meta.url).href,
    new URL("../assets/cars/8ba0c3c7-defb-4c20-b93b-59526cb0a093.jpg", import.meta.url).href,
    new URL("../assets/cars/911b526d-212d-44a0-90d5-1d84ad552d4f.jpg", import.meta.url).href,
    new URL("../assets/cars/d944e91a-fc7e-48e1-9596-1b2796ab33c3.jpg", import.meta.url).href,
    new URL("../assets/cars/ee0f484b-485c-45aa-9470-ad2cbc426b08.jpg", import.meta.url).href,
  ];

  const brandsRef = useRef(null);
  const scrollBrands = (direction = "next") => {
    const el = brandsRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    const left = direction === "next" ? amount : -amount;
    el.scrollBy({ left, behavior: "smooth" });
  };
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
                       hover:shadow-[0_0_28px_#ff000080] hover:border-red-500
                       transition"
          >
            <div className="text-red-500 group-hover:text-red-400 drop-shadow-md">
              {item.icon}
            </div>
            <h3 className="mt-3 font-semibold text-lg tracking-wide">
              {item.label}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Shop By Brand: moved here from main Featured section */}
      <div className="max-w-6xl mx-auto mt-12 px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-wide">🚗 Shop By Brand</h2>
          <p className="text-gray-400 mt-2">Browse brands and explore available parts for each model</p>
        </div>

        <div className="relative">
          <button
            aria-label="Previous brands"
            onClick={() => scrollBrands('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center ml-2"
          >
            ‹
          </button>

          <div ref={brandsRef} className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-hide whitespace-nowrap px-8">
            {brands.map((brand, idx) => {
              const img = brandImgs[idx % brandImgs.length];
              return (
                <motion.button
                  key={`${brand}-${idx}`}
                  whileHover={{ scale: 1.06, rotateY: 12 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => {
                    const matches = (allProducts || []).filter((p) => p.brand === brand);
                    setModalBrand(brand);
                    setModalProducts(matches);
                    setModalOpen(true);
                  }}
                  className={
                    "inline-flex flex-shrink-0 w-36 h-36 md:w-40 md:h-40 bg-white/4 border border-white/10 rounded-2xl items-center justify-center cursor-pointer " +
                    "shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-white overflow-hidden"
                  }
                >
                  {img ? (
                    <img src={img} alt={brand} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-2xl font-bold text-white drop-shadow-md transform-gpu" style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.6), inset 0 -6px 10px rgba(255,255,255,0.02)" }}>
                      {brand.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          <button
            aria-label="Next brands"
            onClick={() => scrollBrands('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center mr-2"
          >
            ›
          </button>
        </div>

        {modalOpen && (
          <BrandModal brand={modalBrand} products={modalProducts} onClose={() => setModalOpen(false)} />
        )}
      </div>

      {/* Soft glow background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="w-72 h-72 bg-red-600 opacity-10 blur-[120px] absolute -top-20 -left-20"></div>
        <div className="w-72 h-72 bg-blue-600 opacity-10 blur-[120px] absolute bottom-0 right-0"></div>
      </div>
    </section>
  );
}
