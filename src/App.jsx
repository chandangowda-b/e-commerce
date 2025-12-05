import { Routes,Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProductListing from "./pages/ProductListingPage";
import Live3DPage from "./pages/Live3DPage";
// src/App.jsx

import "./App.css";

const data = [
  {
    type: "Hatchback",
    models: ["Swift", "Baleno", "Tiago", "i20"],
  },
  {
    type: "Sedan",
    models: ["Dzire", "Verna", "Virtus", "City"],
  },
  {
    type: "SUV",
    models: ["XUV700", "Creta", "Nexon", "Punch"],
  },
  {
    type: "MUV",
    models: ["Ertiga", "Carens", "Innova", "Triber"],
  },
];

function CarModelsPreview() {
  return (
    <div className="page">
      <h1 className="title">Car Models</h1>

      {/* Main 3D bar */}
      <div className="main-bar">
        {data.map((item) => (
          <div key={item.type} className="main-bar-block">
            <span>{item.type}</span>
          </div>
        ))}
      </div>

      {/* Sub 3D bars */}
      <div className="sub-bars">
        {data.map((item) => (
          <div key={item.type} className="sub-column">
            <div className="sub-bar">
              {item.models.map((m) => (
                <div key={m} className="sub-bar-block">
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



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
    <ErrorBoundary>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path="/cart" element={<CartPage cartItems={cart}/>} />
    <Route path="/products" element={<ProductListing />} />
        <Route path="/live3d" element={<Live3DPage/>} />
        <Route path="/live3d/:id" element={<Live3DPage/>} />


        

        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
