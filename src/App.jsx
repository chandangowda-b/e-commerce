import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProductListing from "./pages/ProductListingPage";

const cart = [
  

  {
  id: "p1",
  name: "Performance Air Filter",
  price: 2499,
  quantity: 1,
  image: "/images/filter.png",
  category: "Engine Parts"
}

]

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path="/cart" element={<CartPage cartItems={cart}/>} />
    <Route path="/products" element={<ProductListing />} />


        

      </Routes>
      
    </div>
  )
}

export default App
