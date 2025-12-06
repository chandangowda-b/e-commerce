import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your backend authentication logic here
    console.log("Form submitted");
    navigate("/"); // Redirect to home after login for now
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* Background Texture & Glow (Matches your Footer/StatBar) */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>

      <motion.div
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {!isLogin && (
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
                required
              />
            </div>
          )}

          <div className="relative group">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
              required
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-12 py-3 outline-none focus:border-red-500 transition placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-red-600/40 transition transform active:scale-95"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Social Login */}
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
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}