export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-300 pt-16 pb-10 border-t border-white/10">
      
      {/* Carbon fiber texture overlay */}
      <div className="absolute inset-0 bg-[url('/carbon_texture.png')] opacity-10 pointer-events-none"></div>

      {/* Glassy wrapper */}
      <div className="relative mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 backdrop-blur-xl bg-white/5 rounded-2xl p-10 border border-white/10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-widest">
            CAR<span className="text-red-500">CARE</span>
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Premium car parts, accessories, and performance upgrades with a focus on modern design and unmatched quality.
          </p>

          <div className="mt-5 flex gap-4">
            <a className="hover:text-red-500 transition" href="#">Facebook</a>
            <a className="hover:text-red-500 transition" href="#">Instagram</a>
            <a className="hover:text-red-500 transition" href="#">YouTube</a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-red-400 cursor-pointer transition">Interior Accessories</li>
            <li className="hover:text-red-400 cursor-pointer transition">Exterior Accessories</li>
            <li className="hover:text-red-400 cursor-pointer transition">Car Electronics</li>
            <li className="hover:text-red-400 cursor-pointer transition">Performance Parts</li>
            <li className="hover:text-red-400 cursor-pointer transition">Car Lighting</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-red-400 cursor-pointer transition">Help Center</li>
            <li className="hover:text-red-400 cursor-pointer transition">Warranty Policies</li>
            <li className="hover:text-red-400 cursor-pointer transition">Shipping & Returns</li>
            <li className="hover:text-red-400 cursor-pointer transition">Order Tracking</li>
            <li className="hover:text-red-400 cursor-pointer transition">Contact Us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">Subscribe to receive updates and deals.</p>

          <div className="flex bg-white/10 rounded-lg overflow-hidden backdrop-blur-md border border-white/10">
            <input
              type="email"
              placeholder="email@example.com"
              className="bg-transparent text-gray-200 px-4 py-3 outline-none flex-1 placeholder-gray-500"
            />
            <button className="bg-red-600 px-5 text-white font-semibold hover:bg-red-700 transition">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="relative text-center mt-5 text-gray-500 text-sm">
        © {new Date().getFullYear()} CarCare. All Rights Reserved.
      </div>
    </footer>
  );
}
