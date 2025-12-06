import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProductListing from "./pages/ProductListingPage";
import HelpCenter from "./pages/HelpCenter";
import { SupportProvider } from "./context/SupportContext";
import SupportModal from "./components/SupportModal";
import SupportButton from "./components/SupportButton";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <SupportProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


        </Routes>

        {/* Support Components */}
        <SupportButton />
        <SupportModal />
      </div>
    </SupportProvider>
  );
}

export default App;
