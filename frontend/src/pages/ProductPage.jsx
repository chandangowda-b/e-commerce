// import { useEffect, useState } from "react";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";
// import { motion } from "framer-motion";
// import {products} from "../context/dummyData.js"

// import img1 from "../assets/products/steering_wheel.png";
// import img2 from "../assets/products/steering_wheel.png";
// import img3 from "../assets/products/steering_wheel.png";
// import img4 from "../assets/products/steering_wheel.png";
// import { useParams } from "react-router-dom";


// const productImages = [img1, img2, img3, img4];

// export default function ProductPage() {
//     const {id} = useParams()
//     console.log(id);
    
//   const [selectedImg, setSelectedImg] = useState(productImages[0]);
//   const [qty, setQty] = useState(1);
//   const [product,setProduct]=useState(null)

//   useEffect(()=>{
//     const fetchProduct = async () => {  
//         setProduct(products.find((product)=>(product.id == id)))
        
//     }
//     fetchProduct()
//     console.log(products);
    
//   },[])
//   console.log(product);
  
// if(!product ) return(
//     <h1>Loading..</h1>
// )
//   return (
//     <div className="bg-black text-white min-h-screen pt-10 pb-20 relative">

//       {/* background carbon fiber */}
//       <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-10"></div>

//       <div className="relative max-w-7xl mx-auto px-6">

//         {/* TOP section: images + details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">

//           {/* Left: Product Images */}
//           <div>
//             <motion.img
//               key={selectedImg}
//               src={selectedImg}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-10 object-contain shadow-xl"
//             />

//             {/* Thumbnails */}
//             <div className="flex gap-4 mt-6 overflow-x-auto">
//               {productImages.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   onClick={() => setSelectedImg(img)}
//                   className={`w-20 h-20 rounded-lg cursor-pointer object-contain p-2
//                     ${
//                       img === selectedImg
//                         ? "bg-red-500/40 border border-red-500 scale-105"
//                         : "bg-white/10 border border-white/10"
//                     }
//                     transition`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Right: Product Info */}
//           <div>
//             <h1 className="text-4xl font-bold">{product.title}</h1>

//             <div className="flex items-center gap-2 mt-3">
//               <FaStar className="text-yellow-400" />
//               <FaStar className="text-yellow-400" />
//               <FaStar className="text-yellow-400" />
//               <FaStar className="text-yellow-400" />
//               <FaRegStar className="text-gray-500" />
//               <span className="text-gray-400 text-sm">(234 reviews)</span>
//             </div>

//             <p className="text-3xl font-bold text-red-400 mt-5">${product.price}</p>

//             <p className="text-gray-400 mt-4 leading-relaxed">
//               Upgrade your driving experience with this premium steering wheel
//               built with durable carbon fiber and ergonomic grip design.
//             </p>

//             {/* Quantity selector */}
//             <div className="mt-8">
//               <p className="text-gray-300 mb-2 font-semibold">Quantity</p>
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => qty > 1 && setQty(qty - 1)}
//                   className="w-10 h-10 bg-white/10 border border-white/10 rounded-lg"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl">{qty}</span>
//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   className="w-10 h-10 bg-white/10 border border-white/10 rounded-lg"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <motion.button
//               whileTap={{ scale: 0.92 }}
//               className="mt-8 w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold 
//                          rounded-xl flex justify-center items-center gap-3 shadow-lg"
//             >
//               <FaShoppingCart />
//               Add to Cart
//             </motion.button>

//             {/* Specifications */}
//             <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
//               <h3 className="text-xl font-semibold mb-4">Specifications</h3>
//               <ul className="text-gray-400 space-y-2">
//                 <li>Material: Carbon Fiber</li>
//                 <li>Grip: Ergonomic rubberized grip</li>
//                 <li>Compatibility: Universal</li>
//                 <li>Warranty: 1 Year</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mb-20">
//           <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

//           <div className="space-y-6">
//             <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
//               <p className="font-semibold text-white">John Doe</p>
//               <p className="text-yellow-400">★★★★☆</p>
//               <p className="text-gray-400 mt-2">
//                 Excellent quality! The grip and feel are just perfect.
//               </p>
//             </div>

//             <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
//               <p className="font-semibold text-white">Rajesh Kumar</p>
//               <p className="text-yellow-400">★★★★★</p>
//               <p className="text-gray-400 mt-2">
//                 Superb steering wheel. Great value for money!
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div>
//           <h2 className="text-3xl font-bold mb-6">Related Products</h2>

//           <div className="flex gap-8 overflow-x-auto pb-4">
//             {[img1, img2, img3].map((img, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.1 }}
//                 className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-5"
//               >
//                 <img src={img} className="w-full h-40 object-contain" />
//                 <h3 className="mt-3 font-semibold">Car Accessory {i + 1}</h3>
//                 <p className="text-red-400">$149</p>
//                 <button className="mt-3 w-full bg-red-600 py-2 rounded-lg">
//                   View Details
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


import img1 from "../assets/products/steering_wheel.png";
import img2 from "../assets/products/steering_wheel.png";
import img3 from "../assets/products/steering_wheel.png";
import img4 from "../assets/products/steering_wheel.png";

const productImages = [img1, img2, img3, img4];

export default function ProductPage() {
  const { id } = useParams();

  
  const [selectedImg, setSelectedImg] = useState(productImages[0]);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const { allProducts, addToCart } = useAppContext();

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = allProducts.find((product) => product.id === Number(id));
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [id, allProducts]);

  if (!product) return <h1>Loading...</h1>;

  const handleAddToCart = () => {
    if (product) addToCart(product, qty);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-10 pb-20 relative">
      {/* Background carbon fiber */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top section: images + details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          {/* Left: Product Images */}
          <div>
            <motion.img
              key={selectedImg}
              src={selectedImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-10 object-contain shadow-xl"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 overflow-x-auto">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 rounded-lg cursor-pointer object-contain p-2
                    ${img === selectedImg ? "bg-blue-500/40 border border-blue-500 scale-105" : "bg-white/10 border border-white/10"}
                    transition`}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <h1 className="text-4xl font-bold">{product.title}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: Math.floor(product.rating || 0) }).map((_, i) => (
                  <FaStar key={i} />
                ))}
                {product.rating && product.rating % 1 >= 0.5 && <FaRegStar />}
              </div>
              <span className="text-gray-400 text-sm">{product.rating || "-"} • {product.brand || "Unknown"}</span>
            </div>

            <p className="text-3xl font-bold text-blue-400 mt-5">${product.price}</p>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Upgrade your driving experience with this premium steering wheel
              built with durable carbon fiber and ergonomic grip design.
            </p>

            {/* Quantity selector */}
            <div className="mt-8">
              <p className="text-gray-300 mb-2 font-semibold">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="w-10 h-10 bg-white/10 border border-white/10 rounded-lg"
                >
                  -
                </button>
                <span className="text-xl">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 bg-white/10 border border-white/10 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold 
                         rounded-xl flex justify-center items-center gap-3 shadow-lg"
            >
              <FaShoppingCart />
              Add to Cart
            </motion.button>

            {/* Specifications */}
            <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <ul className="text-gray-400 space-y-2">
                <li><strong>Brand:</strong> {product.brand || 'N/A'}</li>
                <li><strong>Category:</strong> {product.category || 'N/A'}</li>
                <li><strong>Price:</strong> ${product.price}</li>
                <li><strong>Warranty:</strong> 1 Year</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

          <div className="space-y-6">
            {(product.reviews && product.reviews.length > 0) ? (
              product.reviews.map((r, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <p className="font-semibold text-white">{r.user || `User ${idx + 1}`}</p>
                  <p className="text-yellow-400">{"★".repeat(Math.round(r.rating || product.rating || 0))}</p>
                  <p className="text-gray-400 mt-2">{r.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet for this product.</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Related Products</h2>

          <div className="flex gap-8 overflow-x-auto pb-4">
            {[img1, img2, img3].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <img src={img} className="w-full h-40 object-contain" />
                <h3 className="mt-3 font-semibold">Car Accessory {i + 1}</h3>
                <p className="text-blue-400">$149</p>
                <button className="mt-3 w-full bg-blue-600 py-2 rounded-lg">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

