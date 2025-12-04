import {create} from "zustand";
import { categories, carBrands, products as dummyProducts } from "../context/dummyData";

const useStore = create((set, get) => ({
  // Data
  allProducts: dummyProducts,
  filteredProducts: dummyProducts,
  categories,
  carBrands,

  // Filters
  selectedCategory: "All",
  selectedBrand: "All",

  // Cart & Wishlist
  cart: [],
  wishlist: [],

  // Initialize / set products (backend-ready)
  setAllProducts: (products) => {
    set({ allProducts: products, filteredProducts: products });
    // run filters after updating products
    get().applyFilters();
  },

  // Filter actions
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSelectedBrand: (brand) => {
    set({ selectedBrand: brand });
    get().applyFilters();
  },

  applyFilters: () => {
    const { allProducts, selectedCategory, selectedBrand } = get();
    let temp = [...allProducts];

    if (selectedCategory !== "All") {
      temp = temp.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrand !== "All") {
      temp = temp.filter((p) => p.brand === selectedBrand);
    }

    set({ filteredProducts: temp });
  },

  // Cart actions
  addToCart: (product, qty = 1) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, qty }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== productId) })),

  updateCartQty: (productId, qty) =>
    set((state) => ({
      cart: state.cart.map((p) =>
        p.id === productId ? { ...p, qty: qty > 0 ? qty : 1 } : p
      ),
    })),

  clearCart: () => set({ cart: [] }),

  // Wishlist
  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find((p) => p.id === product.id);
      if (exists) {
        return { wishlist: state.wishlist.filter((p) => p.id !== product.id) };
      }
      return { wishlist: [...state.wishlist, product] };
    }),
}));

export default useStore;
