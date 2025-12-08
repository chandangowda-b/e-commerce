import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaCar, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore"; // Assuming you want to add to cart

// Mock Data for Interior Products
const interiorProducts = [
  { id: 101, title: "Premium Leather Seat Covers (Black)", price: 150, car: "Toyota", image: "https://images.unsplash.com/photo-1552934217-0cc5a14d59f7?auto=format&fit=crop&q=80&w=600" },
  { id: 102, title: "Sporty Red Stitch Covers", price: 85, car: "Honda", image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=600" },
  { id: 103, title: "Beige Comfort Cushions", price: 120, car: "Hyundai", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600" },
  { id: 104, title: "Universal Racing Seats", price: 299, car: "Universal", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600" },
  { id: 105, title: "Velvet Soft Touch Covers", price: 60, car: "Kia", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600" },
  { id: 106, title: "Waterproof Pet Seat Cover", price: 45, car: "Universal", image: "https://images.unsplash.com/photo-1583336663277-620dc1996580?auto=format&fit=crop&q=80&w=600" },
];

export default function Interior() {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart); // Connect to your store

  // Filter States
  const [selectedCar, setSelectedCar] = useState("All");
  const [priceRange, setPriceRange] = useState(500); // Default max price

  // Filter Logic
  const filteredProducts = interiorProducts.filter((p) => {
    const matchCar = selectedCar === "All" || p.car === "Universal" || p.car === selectedCar;
    const matchPrice = p.price <= priceRange;
    return matchCar && matchPrice;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10 px-4">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-10 pointer-events-none fixed"></div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-wide mb-8 border-b border-white/10 pb-4">
          Interior <span className="text-red-500">Upgrades</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR FILTER --- */}
          <aside className="w-full lg:w-1/4 h-fit bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-xl font-bold">
              <FaFilter className="text-red-500" /> Filters
            </div>

            {/* Car Selector */}
            <div className="mb-8">
              <label className="block text-gray-400 mb-2 font-medium">Select Your Car</label>
              <div className="relative">
                <FaCar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <select 
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 text-white pl-10 pr-4 py-3 rounded-lg appearance-none focus:border-red-500 outline-none cursor-pointer"
                >
                  <option value="All">All Makes</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Kia">Kia</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between text-gray-400 mb-2 font-medium">
                <label>Max Price</label>
                <span className="text-red-400 font-bold">${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </aside>

          {/* --- PRODUCT GRID --- */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500/20 hover:border-red-500/50 transition-all duration-300 group"
                  >
                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                        {product.car}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold line-clamp-2 min-h-[3.5rem]">{product.title}</h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-red-500">${product.price}</span>
                        <button 
                          onClick={() => addToCart ? addToCart(product, 1) : console.log("Added", product)}
                          className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <h3 className="text-xl">No products match your filters.</h3>
                  <p>Try adjusting the price or selecting a different car.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}