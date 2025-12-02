import React from "react";
import "./style.css";

import { FaSearch, FaUser, FaHeadset, FaShoppingCart } from "react-icons/fa";
import { TbCar } from "react-icons/tb";
import { GiCarSeat, GiCarDoor, GiCarWheel, GiCarBattery, GiCarKey } from "react-icons/gi";
import { MdLightbulb, MdCarRepair } from "react-icons/md";

function Header() {
  return (
    <div className="header-container">

      {/* Top Navbar */}
    <div className="top-nav">
        <div className="logo">Car<span>Care</span></div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for Seltos, Hycross, Creta, Nexon..."
          />
          <button>
            <FaSearch size={20} />
          </button>
        </div>

        <div className="nav-icons">
          <FaUser size={22} />
          <FaHeadset size={22} />
          <FaShoppingCart size={22} />
        </div>
      </div>

      {/* Category Menu */}
      <div className="category-nav">
        <div className="cat-item"><TbCar /> Shop By Car</div>
        <div className="cat-item"><GiCarSeat /> Interior Accessories</div>
        <div className="cat-item"><GiCarDoor /> Exterior Accessories</div>
        <div className="cat-item"><MdLightbulb /> Car Lighting</div>
        <div className="cat-item"><GiCarBattery /> Car Utility</div>
        <div className="cat-item"><GiCarWheel /> Car Electronics</div>
        <div className="cat-item"><MdCarRepair /> Car Parts</div>
        <div className="cat-item"><GiCarKey /> Car Care & Styling</div>
      </div>
    </div>
  );
}

export default Header;
