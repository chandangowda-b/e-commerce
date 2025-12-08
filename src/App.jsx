import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProductListing from "./pages/ProductListingPage";
import Live3DPage from "./pages/Live3DPage";
import Sub3D from "./pages/Sub3D";

// Components
import LoginPage from "./components/LoginPage";
import Interior from "./components/Interior";
import UserProfile from "./components/UserProfile";      // <--- Added
import SignupSuccess from "./components/SignupSuccess"; // <--- Added

import "./App.css";

// Static cart data (Consider moving this to your useStore later)
const cart = [
  {
    id: "p1",
    name: "Performance Air Filter",
    price: 2499,
    quantity: 1,
    image: "/images/filter.png",
    category: "Engine Parts"
  }
];

function App() {
  return (
    <ErrorBoundary>
      <div>
        <Navbar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage cartItems={cart} />} />
          
          {/* 3D Features */}
          <Route path="/live3d" element={<Live3DPage />} />
          <Route path="/live3d/:id" element={<Live3DPage />} />
          <Route path="/sub3d" element={<Sub3D />} />
          <Route path="/sub3d/:id" element={<Sub3D />} />

          {/* Categories */}
          <Route path="/interior" element={<Interior />} />

          {/* Authentication & Profile Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />          {/* <--- New Route */}
          <Route path="/signup-success" element={<SignupSuccess />} /> {/* <--- New Route */}

        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;