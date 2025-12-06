import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { FaFilter, FaChevronDown, FaTimes } from "react-icons/fa";

// Top Models (compact)
const models = ["All", "Truck", "SUV"];

// Side Brand List (with logo images)
const brands = [
  { key: "Toyota", label: "Toyota", img: "https://via.placeholder.com/120?text=Toyota" },
  { key: "Honda", label: "Honda", img: "https://via.placeholder.com/120?text=Honda" },
  { key: "BMW", label: "BMW", img: "https://via.placeholder.com/120?text=BMW" },
  { key: "Audi", label: "Audi", img: "https://via.placeholder.com/120?text=Audi" },
  { key: "Nissan", label: "Nissan", img: "https://via.placeholder.com/120?text=Nissan" },
  { key: "Kia", label: "Kia", img: "https://via.placeholder.com/120?text=Kia" },
];

// Dummy Car Data
const cars = [
  {
    name: "Toyota Supra",
    year: "2018 - 2024",
    brand: "Toyota",
    model: "SUV",
    img: "https://via.placeholder.com/300x150",
  },
  {
    name: "Honda Civic",
    year: "2016 - 2020",
    brand: "Honda",
    model: "All",
    img: "https://via.placeholder.com/300x150",
  },
  {
    name: "BMW M3",
    year: "2019 - 2023",
    brand: "BMW",
    model: "Truck",
    img: "https://via.placeholder.com/300x150",
  },
];

export default function CarUI() {
  // Framer Motion components (aliased to PascalCase to satisfy linters)
  const MotionHeader = m.header;
  const MotionButton = m.button;
  const MotionArticle = m.article;
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCars = cars.filter((car) => {
    return (
      (selectedModel === "All" || car.model === selectedModel) &&
      (!selectedBrand || car.brand === selectedBrand)
    );
  });

  return (
    <div className="w-full bg-black text-white font-sans">
      {/* Centered compact container */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <MotionHeader
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-6 pb-4"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wide">
            Browse Car Models
          </h1>
          <p className="text-center text-gray-300 mt-2">Choose a model or brand to narrow results.</p>
        </MotionHeader>

        {/* Top Model Filter - compact pills */}
        <div className="flex justify-center gap-6 py-4 border-b border-red-600">
          {models.map((m) => (
            <MotionButton
              key={m}
              onClick={() => setSelectedModel(m)}
              whileTap={{ scale: 0.98 }}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none 
                ${selectedModel === m ? "bg-red-600 text-white shadow-lg" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
            >
              {m}
            </MotionButton>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6 py-6">
          {/* LEFT - Filters (compact brand list) */}
          <aside className={`w-full md:w-60 transition-all ${mobileFiltersOpen ? "max-h-screen" : "max-h-0 md:max-h-screen"} overflow-hidden md:overflow-visible`}>
            <div className="bg-black/30 backdrop-blur-lg border border-red-600 rounded-xl p-4 sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-red-500">Brands</h2>
                <div className="flex items-center gap-2">
                  <button className="hidden md:inline text-sm text-gray-400">Reset</button>
                  <button className="md:hidden" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {brands.map((b) => (
                  <MotionButton
                    key={b.key}
                    onClick={() => setSelectedBrand(b.key === selectedBrand ? null : b.key)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg text-left transition-all duration-200 w-full text-sm 
                      ${selectedBrand === b.key ? "bg-red-600 text-white shadow-lg" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                  >
                    {b.label}
                  </MotionButton>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER - Grid */}
          <main className="flex-1">
            {filteredCars.length === 0 ? (
              <div className="py-24 text-center text-gray-400">
                No cars match your filters. Try selecting a different model or brand.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCars.map((car) => (
                  <MotionArticle
                    key={car.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.28 }}
                    className="bg-white/6 backdrop-blur-md rounded-xl p-3 border border-white/6 hover:border-red-500 shadow-md"
                  >
                    <div className="relative overflow-hidden rounded-md">
                      <img src={car.img} alt={car.name} className="w-full h-32 object-cover rounded-md" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-80 rounded-md" />
                    </div>

                    <div className="mt-2">
                      <h3 className="text-md font-semibold">{car.name}</h3>
                      <p className="text-gray-300 text-sm">{car.year}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-red-400 text-sm">{car.brand} • {car.model}</span>
                        <button className="px-2 py-1 bg-red-600 rounded-full text-xs shadow hover:bg-red-500 transition">View</button>
                      </div>
                    </div>
                  </MotionArticle>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
