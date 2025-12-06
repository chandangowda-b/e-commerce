import React, { useState } from "react";
import { FaSearch, FaUser, FaHeadset, FaShoppingCart, FaBars } from "react-icons/fa";
import { TbCar } from "react-icons/tb";
import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import { MdLightbulb, MdCarRepair } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const cartCount = useStore((s) => s.cart.length);
  const setSearchQuery = useStore((s) => s.setSearchQuery);

  const categories = [
    { icon: <TbCar size={18} />, label: "Shop By Car" },
    { icon: <GiCarSeat size={18} />, label: "Interior" },
    { icon: <GiCarDoor size={18} />, label: "Exterior" },
    { icon: <MdLightbulb size={18} />, label: "Lighting" },
    { icon: <GiCarBattery size={18} />, label: "Utility" },
    { icon: <GiCarWheel size={18} />, label: "Electronics" },
    { icon: <MdCarRepair size={18} />, label: "Car Parts" },
    { icon: <GiCarKey size={18} />, label: "Care & Styling" }
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/20 text-white">
      
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-5 py-4">
        
        {/* Brand */}
        <div className="text-2xl font-extrabold tracking-wide">
          Car<span className="text-red-500 drop-shadow-lg">Care</span>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex flex-1 mx-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(query);
              navigate('/products');
            }}
            className="flex flex-1"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for Seltos, Hycross, Creta, Nexon..."
              className="flex-1 bg-white/10 border border-white/20 placeholder-gray-300 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button type="submit" className="bg-white/20 px-4 py-2 rounded-r-md hover:bg-red-500 hover:text-white transition">
              <FaSearch size={18} />
            </button>
          </form>
        </div>

       {/* Icons */}
<div className="hidden md:flex items-center gap-5 text-white font-medium">
  {/* Added onClick to navigate to login */}
  <FaUser 
    onClick={() => navigate("/login")} 
    className="hover:text-red-500 transition cursor-pointer" 
  />
  
  <FaHeadset className="hover:text-red-500 transition cursor-pointer" />
  
  {/* Cart Logic (Keep existing) */}
  <div 
    className="relative cursor-pointer hover:text-red-500 transition"
    onClick={() => navigate("/cart")}
  >
    <FaShoppingCart />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </div>
</div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={26} />
        </div>
      </div>

      {/* Category Menu */}
      <div
        className={`transition-all duration-500 ease-in-out bg-black/40 backdrop-blur-xl md:flex md:justify-center md:gap-5 md:py-3 
        ${menuOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col md:flex-row flex-wrap gap-3 justify-center px-4">
          {categories.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm cursor-pointer 
              hover:bg-red-500 hover:border-red-500 hover:text-white transition"
            >
              {item.icon} {item.label}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Navbar;
