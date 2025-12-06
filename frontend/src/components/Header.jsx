// import React, { useState } from "react";
// import { FaSearch, FaUser, FaHeadset, FaShoppingCart, FaBars } from "react-icons/fa";
// import { TbCar } from "react-icons/tb";
// import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
// import { MdLightbulb, MdCarRepair } from "react-icons/md";

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="w-full bg-white shadow-md">
//       {/* Top Navbar */}
//       <div className="flex items-center justify-between px-5 py-4">
//         <div className="text-2xl font-bold">
//           Car<span className="text-red-500">Care</span>
//         </div>

//         {/* Search Box */}
//         <div className="hidden md:flex flex-1 mx-5">
//           <input
//             type="text"
//             placeholder="Search for Seltos, Hycross, Creta, Nexon..."
//             className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300">
//             <FaSearch size={20} />
//           </button>
//         </div>

//         {/* Right Icons */}
//         <div className="hidden md:flex items-center gap-4 text-gray-700">
//           <FaUser size={22} className="hover:text-red-500 cursor-pointer" />
//           <FaHeadset size={22} className="hover:text-red-500 cursor-pointer" />
//           <FaShoppingCart size={22} className="hover:text-red-500 cursor-pointer" />
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars size={26} />
//         </div>
//       </div>

//       {/* Category Menu */}
//       <div
//         className={`flex flex-wrap justify-center gap-3 px-4 py-3 bg-gray-100 transition-all duration-300 ${
//           menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
//         } md:max-h-full md:opacity-100 md:flex-row`}
//       >
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <TbCar size={18} /> Shop By Car
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <GiCarSeat size={18} /> Interior Accessories
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <GiCarDoor size={18} /> Exterior Accessories
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <MdLightbulb size={18} /> Car Lighting
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <GiCarBattery size={18} /> Car Utility
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <GiCarWheel size={18} /> Car Electronics
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <MdCarRepair size={18} /> Car Parts
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
//           <GiCarKey size={18} /> Car Care & Styling
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

import Navbar from "./Navbar";
import carVideo from "../assets/car.mp4";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="relative h-screen w-full overflow-hidden bg-black">
      <Navbar />

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={carVideo} type="video/mp4" />
      </video>

      {/* Overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-2xl animate-fadeUp">
          Upgrade Your Ride
        </h2>
        <p className="mt-4 text-lg md:text-2xl font-medium text-gray-200 animate-fadeUp delay-200">
          Premium Car Parts For Performance Enthusiasts
        </p>

        <button onClick={()=>navigate("/products")} className="mt-8 px-8 py-3 bg-red-500 hover:bg-red-600 transition duration-300 rounded-full text-white font-semibold shadow-xl animate-fadeUp delay-500">
          Explore Parts
        </button>
      </div>
    </header>
  );
}


