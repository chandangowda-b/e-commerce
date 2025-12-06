import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const fallbackProducts = [
  { id: 1, img: null, title: "Premium Alloy Wheel", price: "$199" },
  { id: 2, img: null, title: "Sport Seat Cover", price: "$149" },
  { id: 3, img: null, title: "LED Headlight", price: "$249" },
  { id: 4, img: null, title: "Long-Life Battery", price: "$179" },
];

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const storeProducts = useStore((s) => s.filteredProducts || []);

  const products = (storeProducts && storeProducts.length > 0)
    ? storeProducts.slice(0, 8)
    : fallbackProducts;

  return (
    <section className="bg-black text-white py-20 relative">
      <div className="max-w- mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-xl">
            🔥 Featured Picks
          </h2>
          <p className="text-gray-400 mt-2">
            Hand-picked upgrades for performance, safety and style
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory py-6 scrollbar-hide">
            {products.map((p, i) => (
              <motion.article
                key={p.id ?? i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="flex-shrink-0 w-56 sm:w-64 md:w-72 bg-white/6 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-lg/30 hover:border-red-500 transition-transform snap-start"
              >
                <div className="w-full h-32 sm:h-40 md:h-44 flex items-center justify-center bg-black/10 rounded-lg overflow-hidden">
                  {p.images?.[0] || p.img ? (
                    <img src={p.images?.[0] || p.img} alt={p.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-wide line-clamp-2">{p.title}</h3>
                <p className="text-red-400 font-bold mt-1">${p.price ?? p.price}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-sm rounded-lg border border-white/10 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      const addToCart = useStore.getState().addToCart;
                      if (addToCart) addToCart(p, 1);
                    }}
                    className="w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition"
                    aria-label="Add to cart"
                  >
                    +
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Soft gradient sides for depth */}
          <div className="absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-black/20 sm:from-black pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-black/20 sm:from-black pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

