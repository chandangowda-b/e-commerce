import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaSignOutAlt, FaBoxOpen, FaCar, FaCamera } from "react-icons/fa";

export default function UserProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // 1. Initialize state with null (loading state)
  const [user, setUser] = useState(null);

  // 2. Load User Data on Component Mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  // 3. Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert image to Base64 (Text format)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        // Send to Backend
        const res = await fetch("http://localhost:5000/update-profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email: user.email, 
            profileImage: base64Image 
          }),
        });

        const data = await res.json();
        
        if (res.ok) {
          // Update Local State & Storage immediately
          const updatedUser = { ...user, profileImage: base64Image };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Prevent crash if user is null while loading
  if (!user) return <div className="text-white text-center pt-20">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10 px-6 relative overflow-hidden">
       {/* Background */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[150px] pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Personal Details */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg">
            
            {/* Avatar Section with Upload */}
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-black p-1 shadow-2xl mb-4 overflow-hidden relative">
                 {user.profileImage ? (
                   <img src={user.profileImage} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gray-800 text-4xl font-bold text-gray-500">
                     {user.name.charAt(0)}
                   </div>
                 )}
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                   <FaCamera className="text-white text-2xl" />
                 </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <h2 className="text-2xl font-bold tracking-wide">{user.name}</h2>
            <p className="text-gray-400 text-sm">
              Member since {user.joined ? new Date(user.joined).toLocaleDateString() : "2024"}
            </p>
            
            <button 
              onClick={handleLogout}
              className="mt-6 flex items-center gap-2 px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          {/* Details Box */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-lg">
             <h3 className="text-xl font-semibold border-b border-white/10 pb-4">Personal Info</h3>
             
             <div className="flex items-center gap-4 text-gray-300">
               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-500"><FaEnvelope /></div>
               <div>
                 <p className="text-xs text-gray-500">Email</p>
                 <p className="text-sm">{user.email}</p>
               </div>
             </div>

             <div className="flex items-center gap-4 text-gray-300">
               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-500"><FaPhone /></div>
               <div>
                 <p className="text-xs text-gray-500">Phone</p>
                 <p className="text-sm">{user.phone || "Not provided"}</p>
               </div>
             </div>

             <div className="flex items-center gap-4 text-gray-300">
               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-purple-500"><FaVenusMars /></div>
               <div>
                 <p className="text-xs text-gray-500">Gender</p>
                 <p className="text-sm">{user.gender || "Not specified"}</p>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Right Column: Stats (Static for now until you have real orders) */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-lg text-white"><FaBoxOpen size={24}/></div>
              <div>
                <h4 className="text-2xl font-bold">0</h4>
                <p className="text-gray-400 text-sm">Total Orders</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-lg text-white"><FaCar size={24}/></div>
              <div>
                <h4 className="text-2xl font-bold">0</h4>
                <p className="text-gray-400 text-sm">Cars Modified</p>
              </div>
            </div>
          </div>

          {/* Placeholder for future order history */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-lg text-center py-20">
             <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
             <p className="text-gray-400">Your recent purchases will appear here.</p>
             <button onClick={() => navigate("/products")} className="mt-4 px-6 py-2 bg-red-600 rounded-full text-white font-bold hover:bg-red-700 transition">
               Start Shopping
             </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}