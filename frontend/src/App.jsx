import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useStore from "./store/useStore";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProductListing from "./pages/ProductListingPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import CarUI from "./pages/CarUI";
import HelpCenter from "./pages/HelpCenter";
import SupportButton from "./components/SupportButton";
import SupportModal from "./components/SupportModal";

const cart = [
  {
    id: "p1",
    name: "Performance Air Filter",
    price: 2499,
    quantity: 1,
    image: "/images/filter.png",
    category: "Engine Parts",
  },
];

function App() {
  const checkAuth = useStore((state) => state.checkAuth);

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Navbar />
      {/* Push page content below the fixed navbar (adjust pt value if navbar height changes) */}
      <div className="pt-20 bg-black">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage cartItems={cart} />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/car-page" element={<CarUI />} />
        <Route path="/helpcenter" element={<HelpCenter />} />

        </Routes>

        <SupportButton />
        <SupportModal/>
      </div>
    </div>
  );
}

export default App;
