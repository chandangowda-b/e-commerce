// import { useAppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// export default function ProductListing() {
//   const {
//     filteredProducts,
//     categories,
//     carBrands,
//     selectedCategory,
//     setSelectedCategory,
//     selectedBrand,
//     setSelectedBrand,
//     addToCart,
//   } = useAppContext();

//   const navigate = useNavigate();

//   return (
//     <section className="min-h-screen bg-black text-white py-16 px-6">
//       {/* Page Heading */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-extrabold tracking-wide">Car Parts Catalog</h1>
//         <p className="text-gray-400 mt-2">
//           Browse premium parts for performance, style & durability
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-14 flex flex-wrap gap-6 justify-center shadow-xl">
        
//         {/* Category Filter */}
//         <div>
//           <label className="block mb-2 font-semibold tracking-wide">Category</label>
//           <select
//             className="bg-black border border-white/20 px-4 py-2 rounded-lg cursor-pointer"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="All">All</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         {/* Brand Filter */}
//         <div>
//           <label className="block mb-2 font-semibold tracking-wide">Car Brand</label>
//           <select
//             className="bg-black border border-white/20 px-4 py-2 rounded-lg cursor-pointer"
//             value={selectedBrand}
//             onChange={(e) => setSelectedBrand(e.target.value)}
//           >
//             <option value="All">All</option>
//             {carBrands.map((brand, i) => (
//               <option key={i} value={brand}>{brand}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
//         {filteredProducts.length === 0 && (
//           <p className="text-center col-span-full text-gray-400">
//             No products match the selected filters.
//           </p>
//         )}

//         {filteredProducts.map((p) => (
//           <div
//             key={p.id}
//             className="group bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-lg 
//                        p-5 hover:shadow-red-600/40 transition duration-300"
//           >
//             {/* Product Image */}
//             <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
//               <img
//                 src={p.images[0]}
//                 alt={p.title}
//                 className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-110"
//               />
//             </div>

//             {/* Info */}
//             <h3 className="mt-4 text-lg font-bold tracking-wide">{p.title}</h3>
//             <p className="text-red-400 font-bold mt-1">${p.price}</p>

//             {/* Buttons */}
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => navigate(`/product/${p.id}`)}
//                 className="flex-1 py-2 bg-white/20 border border-white/30 rounded-lg 
//                            hover:bg-white/30 transition"
//               >
//                 View Details
//               </button>

//               <button
//                 onClick={() => addToCart(p, 1)}
//                 className="flex-1 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

export default function ProductListing() {
  const filteredProducts = useStore((s) => s.filteredProducts);
  const categories = useStore((s) => s.categories);
  const carBrands = useStore((s) => s.carBrands);
  const selectedCategory = useStore((s) => s.selectedCategory);
  const setSelectedCategory = useStore((s) => s.setSelectedCategory);
  const selectedBrand = useStore((s) => s.selectedBrand);
  const setSelectedBrand = useStore((s) => s.setSelectedBrand);
  const addToCart = useStore((s) => s.addToCart);

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black text-white py-16 px-6">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide">Car Parts Catalog</h1>
        <p className="text-gray-400 mt-2">
          Browse premium parts for performance, style & durability
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-10 max-w-7xl mx-auto">
        
        {/* LEFT SIDEBAR FILTERS */}
        <div className="w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-xl h-fit sticky top-20">

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 tracking-wide">Category</h3>
            <select
              className="w-full bg-black border border-white/20 px-4 py-2 rounded-lg cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Car Brand Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 tracking-wide">Car Brand</h3>
            <select
              className="w-full bg-black border border-white/20 px-4 py-2 rounded-lg cursor-pointer"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="All">All</option>
              {carBrands.map((brand, i) => (
                <option key={i} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

        </div>

        {/* RIGHT PRODUCT GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10">

            {filteredProducts.length === 0 && (
              <p className="text-center col-span-full text-gray-400">
                No products match the selected filters.
              </p>
            )}

            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-lg 
                         p-5 hover:shadow-red-600/40 transition duration-300"
              >
                {/* Image */}
                <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-wide">{p.title}</h3>
                <p className="text-red-400 font-bold mt-1">${p.price}</p>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="flex-1 py-2 bg-white/20 border border-white/30 rounded-lg 
                               hover:bg-white/30 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => addToCart(p, 1)}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

