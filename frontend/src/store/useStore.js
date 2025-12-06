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

  // Authentication
  isAuthenticated: false,
  isLoading: false,
  authError: null,
  authToken: localStorage.getItem("authToken") || null,

  // User Profile
  user: {
    id: "user_001",
    firstName: "Chandan",
    lastName: "Gowda",
    email: "chandan@example.com",
    phone: "+91 9876543210",
    profileImage: "abc",
    dateOfBirth: "1995-05-15",
    gender: "Male",
    createdAt: new Date().toISOString(),
    addresses: [
      {
        id: 1,
        label: "Home",
        street: "123 Main Street",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560001",
        country: "India",
        isDefault: true,
      },
    ],
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true,
    },
    orderHistory: [
      {
        id: "ORD001",
        date: "2024-11-20",
        total: 5999,
        status: "Delivered",
        items: 3,
      },
    ],
  },
  defaultUser: {
    id: "user_001",
    firstName: "Chandan",
    lastName: "Gowda",
    email: "chandan@example.com",
    phone: "+91 9876543210",
    profileImage: "abc",
    dateOfBirth: "1995-05-15",
    gender: "Male",
    createdAt: new Date().toISOString(),
    addresses: [
      {
        id: 1,
        label: "Home",
        street: "123 Main Street",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560001",
        country: "India",
        isDefault: true,
      },
    ],
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true,
    },
    orderHistory: [
      {
        id: "ORD001",
        date: "2024-11-20",
        total: 5999,
        status: "Delivered",
        items: 3,
      },
    ],
  },

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

  // User Profile Actions
  updateUserProfile: (updatedData) =>
    set((state) => ({
      user: { ...state.user, ...updatedData },
    })),

  updateUserAddress: (addressId, updatedAddress) =>
    set((state) => ({
      user: {
        ...state.user,
        addresses: state.user.addresses.map((addr) =>
          addr.id === addressId ? { ...addr, ...updatedAddress } : addr
        ),
      },
    })),

  addUserAddress: (newAddress) =>
    set((state) => ({
      user: {
        ...state.user,
        addresses: [...state.user.addresses, { ...newAddress, id: Date.now() }],
      },
    })),

  removeUserAddress: (addressId) =>
    set((state) => ({
      user: {
        ...state.user,
        addresses: state.user.addresses.filter((addr) => addr.id !== addressId),
      },
    })),

  updateUserPreferences: (preferences) =>
    set((state) => ({
      user: {
        ...state.user,
        preferences: { ...state.user.preferences, ...preferences },
      },
    })),

  // ===================== AUTHENTICATION ACTIONS =====================

  // Register new user
  register: async (userData) => {
    set({ isLoading: true, authError: null });
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();

      // Demo implementation
      const newUser = {
        id: `user_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || "",
        profileImage: null,
        dateOfBirth: userData.dateOfBirth || "",
        gender: userData.gender || "",
        createdAt: new Date().toISOString(),
        addresses: [],
        preferences: {
          newsletter: userData.newsletter || false,
          smsNotifications: false,
          emailNotifications: true,
        },
        orderHistory: [],
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if user already exists
      const state = get();
      const userExists = state.registeredUsers.some(
        (u) => u.email === userData.email
      );

      if (userExists) {
        throw new Error("Email already registered");
      }

      set((prevState) => ({
        registeredUsers: [...prevState.registeredUsers, newUser],
      }));

      return { success: true, message: "Registration successful" };
    } catch (error) {
      const errorMessage = error.message || "Registration failed";
      set({ authError: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  // Login user
  login: async (credentials) => {
    set({ isLoading: true, authError: null });
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      // const token = data.token;

      // Demo implementation
      const state = get();
      const user = state.registeredUsers.find(
        (u) => u.email === credentials.email
      );

      // Demo: use default user for demo@example.com
      if (credentials.email === "demo@example.com") {
        const demoToken = `token_${Date.now()}_demo`;
        localStorage.setItem("authToken", demoToken);
        localStorage.setItem(
          "user",
          JSON.stringify(state.defaultUser)
        );

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        set({
          isAuthenticated: true,
          user: state.defaultUser,
          authToken: demoToken,
        });

        return { success: true, message: "Login successful" };
      }

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Demo: Simple password validation (in production, use secure password comparison)
      if (credentials.password !== user.password) {
        throw new Error("Invalid email or password");
      }

      const token = `token_${Date.now()}_${user.id}`;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({
        isAuthenticated: true,
        user,
        authToken: token,
      });

      return { success: true, message: "Login successful" };
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      set({ authError: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({
      isAuthenticated: false,
      user: null,
      authToken: null,
      authError: null,
    });
  },

  // Check if user is logged in (for initialization)
  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          isAuthenticated: true,
          user,
          authToken: token,
        });
        return true;
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        return false;
      }
    }
    return false;
  },

  // Clear auth error
  clearAuthError: () => set({ authError: null }),

  // Update auth token (for token refresh)
  updateAuthToken: (newToken) => {
    localStorage.setItem("authToken", newToken);
    set({ authToken: newToken });
  },

  // Get authentication status
  getAuthStatus: () => {
    const state = get();
    return {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.authToken,
    };
  },
}));

export default useStore;
