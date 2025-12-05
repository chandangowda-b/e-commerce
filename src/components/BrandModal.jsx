import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function BrandModal({ brand, products = [], onClose }) {
  const navigate = useNavigate();
  const addToCart = useStore((s) => s.addToCart);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 max-w-4xl w-full mx-4 bg-black/90 border border-white/10 rounded-2xl p-6 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{brand} — Available Parts</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white bg-white/5 px-3 py-1 rounded"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length === 0 && (
            <div className="col-span-full text-gray-400">No parts found for this brand.</div>
          )}

          {products.map((p) => (
            <div key={p.id} className="bg-white/5 border border-white/6 rounded-lg p-3 flex flex-col">
              <div className="h-28 flex items-center justify-center bg-black/20 rounded">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.title} className="h-full object-contain" />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <h3 className="mt-3 font-semibold text-sm line-clamp-2">{p.title}</h3>
              <div className="mt-1 text-sm text-red-400 font-bold">${p.price}</div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="flex-1 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="py-1 px-3 bg-red-500 hover:bg-red-600 rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
