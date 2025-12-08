import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight, FaCarSide } from "react-icons/fa";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* 1. Dynamic Background */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-30 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-600/20 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-10 max-w-lg w-full mx-4 p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center"
      >
        
        {/* 2. Success Icon Animation */}
        <div className="relative w-28 h-28 mx-auto mb-8">
            <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-full h-full bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.6)]"
            >
                <FaCheckCircle className="text-black text-5xl" />
            </motion.div>
            {/* Ping effect ring */}
            <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping opacity-20"></div>
        </div>

        {/* 3. Text Content */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-extrabold text-white tracking-wide mb-3"
        >
          Welcome to the Club
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg mb-10 leading-relaxed"
        >
          Your account has been successfully created. <br/> Get ready to transform your ride.
        </motion.p>

        {/* 4. Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate("/login")}
          className="group relative w-full py-4 bg-white text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg hover:shadow-white/20 transition-all active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <span className="relative flex items-center justify-center gap-3">
            Go to Login <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      
      </motion.div>
    </div>
  );
}