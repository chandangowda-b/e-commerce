import React, { useState } from "react";
import { FaSearch, FaUser, FaHeadset, FaShoppingCart, FaBars } from "react-icons/fa";
import { TbCar } from "react-icons/tb";
import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import { MdLightbulb, MdCarRepair } from "react-icons/md";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-2xl font-bold">
          Car<span className="text-red-500">Care</span>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex flex-1 mx-5">
          <input
            type="text"
            placeholder="Search for Seltos, Hycross, Creta, Nexon..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300">
            <FaSearch size={20} />
          </button>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          <FaUser size={22} className="hover:text-red-500 cursor-pointer" />
          <FaHeadset size={22} className="hover:text-red-500 cursor-pointer" />
          <FaShoppingCart size={22} className="hover:text-red-500 cursor-pointer" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={26} />
        </div>
      </div>

      {/* Category Menu */}
      <div
        className={`flex flex-wrap justify-center gap-3 px-4 py-3 bg-gray-100 transition-all duration-300 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        } md:max-h-full md:opacity-100 md:flex-row`}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <TbCar size={18} /> Shop By Car
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <GiCarSeat size={18} /> Interior Accessories
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <GiCarDoor size={18} /> Exterior Accessories
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <MdLightbulb size={18} /> Car Lighting
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <GiCarBattery size={18} /> Car Utility
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <GiCarWheel size={18} /> Car Electronics
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <MdCarRepair size={18} /> Car Parts
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-red-100">
          <GiCarKey size={18} /> Car Care & Styling
        </div>
      </div>
    </div>
  );
}

export default Header;
