// src/context/AppProvider.jsx

import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { categories, carBrands, products as dummyProducts } from "./dummyData";

export default function AppProvider({ children }) {

  // ============================
  // PRODUCTS
  // ============================
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ============================
  // FILTERS
  // ============================
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  // ============================
  // CART
  // ============================
  const [cart, setCart] = useState([]);

  // Pre-populate cart with a couple of products on first load (for demo)
  useEffect(() => {
    if (cart.length === 0 && dummyProducts && dummyProducts.length >= 2) {
      setCart([
        { ...dummyProducts[0], qty: 1 },
        { ...dummyProducts[1], qty: 1 },
      ]);
    }
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================
  // WISHLIST
  // ============================
  const [wishlist, setWishlist] = useState([]);

  // ============================
  // FETCH PRODUCTS (backend-ready)
  // ============================
  useEffect(() => {
    // If backend exists:
    // fetch("http://localhost:8080/api/products")
    //   .then(res => res.json())
    //   .then(data => {
    //      setAllProducts(data);
    //      setFilteredProducts(data);
    //   });

    // Using dummy data for now
    setAllProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  // ============================
  // FILTER FUNCTION
  // ============================
  const applyFilters = () => {
    let temp = [...allProducts];

    if (selectedCategory !== "All") {
      temp = temp.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrand !== "All") {
      temp = temp.filter((p) => p.brand === selectedBrand);
    }

    setFilteredProducts(temp);
  };

  useEffect(() => applyFilters(), [selectedCategory, selectedBrand, allProducts]);

  // ============================
  // CART ACTIONS
  // ============================
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateCartQty = (productId, qty) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, qty: qty > 0 ? qty : 1 } : p
      )
    );
  };

  const clearCart = () => setCart([]);

  // ============================
  // WISHLIST
  // ============================
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const value = {
    // Data
    allProducts,
    filteredProducts,
    categories,
    carBrands,

    // Filters
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,

    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,

    // Wishlist
    wishlist,
    toggleWishlist
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
