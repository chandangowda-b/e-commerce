import React, { useState, useEffect } from "react";
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

  // --- 1. User Logic: Check if logged in ---
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserIconClick = () => {
    if (user) {
      navigate("/profile"); // Logged in? Go to Dashboard
    } else {
      navigate("/login");   // Not logged in? Go to Login
    }
  };

  const categories = [
    { icon: <TbCar size={18} />, label: "Shop By Car", link: "/shop-by-car" },
    { icon: <GiCarSeat size={18} />, label: "Interior", link: "/interior" }, // Link added here
    { icon: <GiCarDoor size={18} />, label: "Exterior", link: "/exterior" },
    { icon: <MdLightbulb size={18} />, label: "Lighting", link: "/lighting" },
    { icon: <GiCarBattery size={18} />, label: "Utility", link: "/utility" },
    { icon: <GiCarWheel size={18} />, label: "Electronics", link: "/electronics" },
    { icon: <MdCarRepair size={18} />, label: "Car Parts", link: "/parts" },
    { icon: <GiCarKey size={18} />, label: "Care & Styling", link: "/styling" }
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/20 text-white">
      
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-5 py-4">
        
        {/* Brand */}
        <div className="text-2xl font-extrabold tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          Car<span className="text-red-500 drop-shadow-lg">Care</span>
        </div>

        {/* Search Box (Desktop Only) */}
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

        {/* --- 2. Icons Section (Updated for Mobile) --- */}
        {/* Changed 'hidden md:flex' to 'flex' so it shows on mobile too */}
        <div className="flex items-center gap-4 md:gap-5 text-white font-medium ml-auto md:ml-0 mr-4 md:mr-0">
          
          {/* User Icon */}
          <div 
            onClick={handleUserIconClick}
            className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition"
          >
            <FaUser size={20} />
            {/* Show Name only on Desktop */}
            {user && <span className="hidden md:inline text-sm font-bold">Hi, {user.name.split(" ")[0]}</span>}
          </div>
          
          {/* Headset (Hidden on very small screens to save space, visible on tablet+) */}
          <FaHeadset className="hidden sm:block hover:text-red-500 transition cursor-pointer" size={20} />
          
          {/* Cart Icon */}
          <div 
            className="relative cursor-pointer hover:text-red-500 transition"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart size={20} />
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
        className={`transition-all duration-500 ease-in-out bg-black/90 backdrop-blur-xl md:bg-black/40 md:flex md:justify-center md:gap-5 md:py-3 
        ${menuOpen ? "max-h-[500px] opacity-100 py-4 shadow-xl border-b border-white/10" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col md:flex-row flex-wrap gap-3 justify-center px-4">
          
          {/* Mobile Search (Only shows when menu is open on mobile) */}
          <div className="md:hidden w-full mb-3">
             <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchQuery(query);
                  navigate('/products');
                  setMenuOpen(false);
                }}
                className="flex w-full"
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search parts..."
                  className="flex-1 bg-white/10 border border-white/20 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-red-500"
                />
                <button type="submit" className="bg-red-600 px-4 py-2 rounded-r-md text-white">
                  <FaSearch />
                </button>
              </form>
          </div>

          {/* Categories Loop */}
          {categories.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (item.link) navigate(item.link); // Navigate to link
                setMenuOpen(false); // Close menu on mobile click
              }}
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
