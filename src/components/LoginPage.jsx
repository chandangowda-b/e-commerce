import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaPhone, FaVenusMars } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  // 1. State to hold all input data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: ""
  });

  const [error, setError] = useState("");

  // 2. Update state when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission (Connect to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Determine endpoint based on mode
    const endpoint = isLogin ? "/login" : "/register";
    const url = `http://localhost:5000${endpoint}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isLogin) {
        // --- LOGIN SUCCESS ---
        console.log("Logged in user:", data.user);
        
        // Save user info to LocalStorage so Navbar & Profile can read it
        localStorage.setItem("user", JSON.stringify(data.user)); 
        
        // Redirect to Home Page
        navigate("/"); 
      } else {
        // --- REGISTER SUCCESS (UPDATED) ---
        // Instead of an alert, we navigate to the success animation page
        navigate("/signup-success");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        key={isLogin ? "login" : "signup"} 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            {isLogin ? "Welcome Back" : "Join the Club"}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin
              ? "Access your garage and saved configurations"
              : "Create an account to start customizing"}
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* --- SIGN UP ONLY FIELDS --- */}
          {!isLogin && (
            <>
              {/* Name */}
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
                  required
                />
              </div>

              {/* Phone (New) */}
              <div className="relative group">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
                  required
                />
              </div>

              {/* Gender (New) */}
              <div className="relative group">
                <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 text-gray-300 rounded-lg px-12 py-3 outline-none focus:border-red-500 transition appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled hidden>Select Gender</option>
                  <option value="Male" className="bg-black text-white">Male</option>
                  <option value="Female" className="bg-black text-white">Female</option>
                  <option value="Other" className="bg-black text-white">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
              </div>
            </>
          )}

          {/* --- COMMON FIELDS (Email & Password) --- */}
          <div className="relative group">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
              required
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-red-600/40 transition transform active:scale-[0.98]"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="mt-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button className="w-full mt-4 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-lg transition">
            <FaGoogle className="text-red-500" />
            <span className="text-sm font-medium">Google</span>
          </button>
        </div>

        {/* Toggle Login/Signup */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // Clear errors when switching
            }}
            className="text-red-500 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}