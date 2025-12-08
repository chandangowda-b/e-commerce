import React, { useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stage, OrbitControls, Stars, Float, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaPalette, FaSave, FaChair, FaTachometerAlt } from "react-icons/fa";
import { GiCarWheel, GiCarDoor, GiWindow, GiSteeringWheel } from "react-icons/gi";
import * as THREE from "three";

// --- 1. CAMERA CONTROLLER (Fixed for better interior view) ---
function CameraController({ mode }) {
  const { camera, controls } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    if (mode === "interior") {
      // New Coordinates for Sports Car Interior
      // x=0.3 (driver side), y=0.8 (lower sit), z=0.5 (back slightly)
      vec.set(0.3, 0.85, 0.4); 
      
      // Smoothly move camera
      camera.position.lerp(vec, 0.04);
      
      // Look slightly down at the dashboard
      if (controls) {
          controls.target.lerp(new THREE.Vector3(0, 0.7, -0.5), 0.04);
          controls.minDistance = 0.1; // Allow getting very close
      }
    } else {
      // Exterior View
      vec.set(4, 2, 5);
      camera.position.lerp(vec, 0.05);
      if (controls) {
          controls.target.lerp(new THREE.Vector3(0, 0.5, 0), 0.05);
          controls.minDistance = 2; // Prevent going inside in exterior mode
      }
    }
    if (controls) controls.update();
  });
  return null;
}

// --- 2. REAL CAR COMPONENT (With Debug Clicker) ---
function RealCar({ config }) {
  const { scene } = useGLTF("/car.glb");

  // Helper to log clicked part names
  const handleCarClick = (e) => {
    // Stop click from passing through to background
    e.stopPropagation(); 
    console.log("👉 YOU CLICKED:");
    console.log("Part Name:", e.object.name);
    console.log("Material Name:", e.object.material.name);
    alert(`Clicked Part: ${e.object.name}\nMaterial: ${e.object.material.name}`);
  };

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        const matName = child.material.name ? child.material.name.toLowerCase() : "";

        // --- EXTERIOR ---
        // Added 'mclaren', 'paint', 'shell' to catch more variations
        if (name.includes("body") || name.includes("paint") || matName.includes("paint") || matName.includes("body")) {
          child.material.color.set(config.bodyColor);
        }
        if (name.includes("window") || name.includes("glass") || matName.includes("glass")) {
          child.material.color.set(config.windowColor);
          child.material.transparent = true;
          child.material.opacity = 0.7;
        }
        if ((name.includes("wheel") || name.includes("rim")) && !name.includes("brake")) {
           child.material.color.set(configColorToHex(config.wheelColor));
        }

        // --- INTERIOR (Expanded Keyword Search) ---
        // We check both the Object Name AND the Material Name
        if (name.includes("seat") || matName.includes("seat") || name.includes("leather") || matName.includes("leather")) {
           child.material.color.set(config.seatColor);
        }
        
        if (name.includes("dash") || matName.includes("dash") || name.includes("console") || matName.includes("interior_main")) {
           child.material.color.set(config.dashColor);
        }
      }
    });
  }, [scene, config]);

  return (
    <primitive 
        object={scene} 
        scale={1.5} 
        position={[0, -0.5, 0]} 
        onPointerDown={handleCarClick} // CLICK CAR TO SEE NAMES
    />
  );
}

function configColorToHex(name) {
    const map = { silver: "#cccccc", gold: "#ffd700", black: "#111111", gunmetal: "#444444" };
    return map[name] || name;
}

// --- 3. MAIN PAGE COMPONENT ---
export default function Sub3D() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("exterior"); 
  const [activeTab, setActiveTab] = useState("paint"); 

  const [carConfig, setCarConfig] = useState({
    bodyColor: "#ef4444", 
    wheelColor: "silver",
    windowColor: "#111111",
    seatColor: "#111111", 
    dashColor: "#000000",
    price: 25000 
  });

  const paintOptions = ["#ef4444", "#2563eb", "#000000", "#ffffff", "#fbbf24", "#10b981", "#8b5cf6"];
  const seatOptions = [
    { name: "Black", color: "#111111", price: 0 },
    { name: "Red Leather", color: "#8b0000", price: 800 },
    { name: "Cream/Beige", color: "#f5f5dc", price: 600 },
    { name: "White", color: "#eeeeee", price: 1200 },
  ];
  const dashOptions = [
      { name: "Standard Black", color: "#000000" },
      { name: "Carbon Grey", color: "#333333" },
      { name: "Racing Red", color: "#550000" },
  ];

  const updateConfig = (key, value) => {
    setCarConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-black overflow-hidden relative">
      
      {/* --- LEFT SIDE --- */}
      <div className="flex-1 relative h-[60vh] md:h-full border-r border-white/10">
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <h1 className="mt-4 text-4xl font-extrabold text-white tracking-wide uppercase drop-shadow-xl">
                Model <span className="text-red-600">Editor</span>
            </h1>
            <p className="text-gray-400 text-sm tracking-widest">{viewMode === 'exterior' ? 'EXTERIOR VIEW' : 'INTERIOR CABIN'}</p>
        </div>

        {/* 3D CANVAS */}
        <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 5], fov: 45, near: 0.1 }}>
          <color attach="background" args={["#050505"]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
                <Float speed={viewMode === 'exterior' ? 2 : 0} rotationIntensity={viewMode === 'exterior' ? 0.2 : 0} floatIntensity={viewMode === 'exterior' ? 0.5 : 0}>
                    <RealCar config={carConfig} />
                </Float>
            </Stage>
            <CameraController mode={viewMode} />
          </Suspense>
          
          <OrbitControls 
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.8} 
            minDistance={0.5} // Prevents camera getting stuck inside model
          />
        </Canvas>

        {/* VIEW TOGGLES */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
             <button 
                onClick={() => { setViewMode("exterior"); setActiveTab("paint"); }}
                className={`px-6 py-2 font-bold rounded-full transition ${viewMode === 'exterior' ? 'bg-red-600 text-white' : 'bg-black/60 text-gray-400 border border-white/10'}`}
             >
                Exterior
             </button>
             <button 
                onClick={() => { setViewMode("interior"); setActiveTab("seats"); }}
                className={`px-6 py-2 font-bold rounded-full transition ${viewMode === 'interior' ? 'bg-red-600 text-white' : 'bg-black/60 text-gray-400 border border-white/10'}`}
             >
                Interior
             </button>
        </div>
      </div>

      {/* --- RIGHT SIDE: CONFIGURATOR --- */}
      <div className="w-full md:w-[35%] bg-[#0b3b61] text-white flex flex-col shadow-2xl relative z-20">
        <div className="p-8 pb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaPalette className="text-blue-300" /> Customization
                    </h2>
                    <p className="text-blue-200 text-sm mt-1">{viewMode === 'exterior' ? 'Modify paint and wheels.' : 'Customize cabin materials.'}</p>
                </div>
                <button onClick={() => navigate(-1)} className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded">Exit</button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex px-8 gap-4 border-b border-white/10 pb-1 overflow-x-auto">
            {viewMode === 'exterior' ? (
                <>
                    <TabButton icon={<GiCarDoor/>} label="Paint" active={activeTab === 'paint'} onClick={() => setActiveTab('paint')} />
                    <TabButton icon={<GiCarWheel/>} label="Wheels" active={activeTab === 'wheels'} onClick={() => setActiveTab('wheels')} />
                    <TabButton icon={<GiWindow/>} label="Tint" active={activeTab === 'windows'} onClick={() => setActiveTab('windows')} />
                </>
            ) : (
                <>
                    <TabButton icon={<FaChair/>} label="Seats" active={activeTab === 'seats'} onClick={() => setActiveTab('seats')} />
                    <TabButton icon={<FaTachometerAlt/>} label="Dash" active={activeTab === 'dash'} onClick={() => setActiveTab('dash')} />
                    <TabButton icon={<GiSteeringWheel/>} label="Trim" active={activeTab === 'trim'} onClick={() => setActiveTab('trim')} />
                </>
            )}
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {activeTab === 'paint' && (
                <div className="grid grid-cols-4 gap-4">
                    {paintOptions.map((color) => (
                        <button key={color} onClick={() => updateConfig('bodyColor', color)} className="w-12 h-12 rounded-full border-4" style={{ backgroundColor: color }} />
                    ))}
                </div>
            )}
            
            {activeTab === 'seats' && seatOptions.map((opt) => (
                <div key={opt.name} onClick={() => updateConfig('seatColor', opt.color)} className="p-4 rounded-xl border cursor-pointer flex justify-between items-center hover:bg-white/10">
                    <span className="font-bold">{opt.name}</span>
                    <div className="w-6 h-6 rounded-full border border-white/30" style={{ backgroundColor: opt.color }}></div>
                </div>
            ))}

            {activeTab === 'dash' && dashOptions.map((opt) => (
                <div key={opt.name} onClick={() => updateConfig('dashColor', opt.color)} className="p-4 rounded-xl border cursor-pointer flex justify-between items-center hover:bg-white/10">
                    <span className="font-bold">{opt.name}</span>
                    <div className="w-6 h-6 rounded-full border border-white/30" style={{ backgroundColor: opt.color }}></div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-t-lg transition-all ${active ? 'text-white border-b-2 border-white' : 'text-blue-300 opacity-60'}`}>
            <span className="text-xl">{icon}</span>
            <span className="text-xs font-bold uppercase">{label}</span>
        </button>
    )
}