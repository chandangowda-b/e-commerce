import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = ({ cartItems, updateQuantity, removeItem }) => {
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 120 : 0; // You can change logic
  const total = subtotal + shipping;

  return (
    <div className="w-full min-h-screen bg-[#0B0C10] pt-28 pb-20 px-4 md:px-10 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Shopping Cart
      </h1>

      {/* CART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT SECTION — ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-lg opacity-80">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-center gap-5 shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                {/* DETAILS */}
                <div className="flex-1 w-full">
                  <h2 className="text-xl font-semibold mb-1">
                    {item.name}
                  </h2>
                  <p className="opacity-80 mb-3">
                    {item.category}
                  </p>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg"
                    >
                      -
                    </button>

                    <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PRICE AND REMOVE */}
                <div className="flex flex-col items-end gap-4">
                  <p className="text-xl font-semibold">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/40 transition rounded-lg border border-red-500/30"
                  >
                    <FaTrashAlt className="text-red-400 text-lg" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SECTION — SUMMARY */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl h-fit">
          <h2 className="text-2xl font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between opacity-90">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between opacity-90">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="border-t border-white/10 my-4"></div>

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button className="mt-6 w-full py-3 rounded-xl bg-[#5f6FFF] hover:bg-[#4955ff] transition text-white font-semibold text-lg shadow-md">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
