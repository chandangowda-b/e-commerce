// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const navItems = ["Home", "Shop", "About", "Contact"];

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
//           Auto<span className="text-blue-500">Parts</span>
//         </h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-10 text-white font-medium">
//           {navItems.map((item) => (
//             <li
//               key={item}
//               className="hover:text-blue-500 transition duration-300 cursor-pointer"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>

//         {/* Mobile Menu Icon */}
//         <div
//           className="md:hidden text-white text-3xl cursor-pointer"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <FiX /> : <FiMenu />}
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {open && (
//         <ul className="md:hidden bg-black/70 backdrop-blur-md text-white flex flex-col space-y-6 py-6 text-center transition-all duration-300">
//           {navItems.map((item) => (
//             <li
//               key={item}
//               className="hover:text-blue-500 cursor-pointer"
//               onClick={() => setOpen(false)}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
//     </nav>
//   );
// }

import React, { useState } from "react";
import { FaSearch, FaUser, FaHeadset, FaShoppingCart, FaBars } from "react-icons/fa";
import { TbCar } from "react-icons/tb";
import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import { MdLightbulb, MdCarRepair } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const appCtx = useAppContext();
  const cart = appCtx?.cart ?? [];
  const setSelectedCategory = appCtx?.setSelectedCategory ?? (() => {});
  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // If AuthProvider is not present, fall back to null (will be handled in UI)
    auth = null;
  }
  const user = auth?.user ?? null;
  const signOut = auth?.signOut ?? (() => {});

  const categories = [
    { icon: <TbCar size={18} />, label: "Shop By Car" },
    { icon: <GiCarSeat size={18} />, label: "Interior Accessories" },
    { icon: <GiCarDoor size={18} />, label: "Exterior Accessories" },
    { icon: <MdLightbulb size={18} />, label: "Car Lighting" },
    { icon: <GiCarBattery size={18} />, label: "Car Utility" },
    { icon: <GiCarWheel size={18} />, label: "Car Electronics" },
    { icon: <MdCarRepair size={18} />, label: "Car Parts" },
    { icon: <GiCarKey size={18} />, label: "Car Care & Styling" }
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/20 text-white">
      
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-5 py-4">
        
        {/* Brand */}
        <div className="text-2xl font-extrabold tracking-wide">
          Car<span className="text-blue-500 drop-shadow-lg">Care</span>
        </div>

        {/* Quick Shop Link */}
        <div className="hidden md:block ml-4">
          <button onClick={() => navigate('/products')} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm font-medium">Shop</button>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex flex-1 mx-5">
          <input
            type="text"
            placeholder="Search for Seltos, Hycross, Creta, Nexon..."
            className="flex-1 bg-white/10 border border-white/20 placeholder-gray-300 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-white/20 px-4 py-2 rounded-r-md hover:bg-blue-500 hover:text-white transition">
            <FaSearch size={18} />
          </button>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5 text-white font-medium">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm">Hello, <span className="font-semibold">{user.name}</span></div>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 bg-white/5 rounded text-sm hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/login')} className="text-sm px-3 py-1 hover:text-blue-300">Sign in</button>
              <button onClick={() => navigate('/signup')} className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700">Sign up</button>
            </div>
          )}

          <button
            onClick={() => navigate('/help')}
            className="hover:text-blue-500 transition cursor-pointer flex items-center gap-1"
            title="Get Help"
          >
            <FaHeadset />
            <span className="hidden md:inline">Help</span>
          </button>

          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <FaShoppingCart className="hover:text-blue-500 transition" />
            <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>
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
          {categories.map((item, i) => {
            const mapLabelToCategory = {
              "Shop By Car": "All",
              "Interior Accessories": "Interior",
              "Exterior Accessories": "Exterior",
              "Car Lighting": "Lights",
              "Car Utility": "Utility",
              "Car Electronics": "Electronics",
              "Car Parts": "Parts",
              "Car Care & Styling": "Care & Styling",
            };

            const handleCatClick = () => {
              const mapped = mapLabelToCategory[item.label] ?? item.label ?? "All";
              // If mapped is 'All' we want to clear the category filter
              setSelectedCategory(mapped);
              navigate('/products');
              setMenuOpen(false);
            };

            return (
              <div
                key={i}
                onClick={handleCatClick}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm cursor-pointer 
              hover:bg-blue-500 hover:border-blue-500 hover:text-white transition"
              >
                {item.icon} {item.label}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Navbar;
