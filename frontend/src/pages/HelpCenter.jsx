import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "How do I track my order?",
    answer:
      "You can track your order using the order tracking link sent to your email. Alternatively, log in to your account and navigate to 'My Orders' section.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most products. Items must be unused and in original packaging. Visit our Returns page for more details or contact support.",
  },
  {
    id: 3,
    question: "Do you offer free shipping?",
    answer:
      "Free shipping is available on orders above $100. Standard shipping takes 5-7 business days. Express shipping is also available for faster delivery.",
  },
  {
    id: 4,
    question: "How secure are my payments?",
    answer:
      "All payments are processed securely using industry-standard encryption. We accept credit cards, debit cards, and digital wallets with full fraud protection.",
  },
  {
    id: 5,
    question: "What warranty do products come with?",
    answer:
      "Most car parts come with a 1-year manufacturer's warranty. Check individual product pages for specific warranty details.",
  },
  {
    id: 6,
    question: "How can I contact customer support?",
    answer:
      "You can reach us via phone (1-800-CARCARE), email (support@carcare.com), or use the live chat feature available 24/7 on our website.",
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border border-white/10 rounded-lg mb-4">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition text-left"
    >
      <h3 className="font-semibold text-white">{item.question}</h3>
      <FaChevronDown
        className={`text-red-500 transition ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    {isOpen && (
      <div className="px-6 py-4 border-t border-white/10 bg-white/5 text-gray-300">
        {item.answer}
      </div>
    )}
  </div>
);

export default function HelpCenter() {
  const [openFAQs, setOpenFAQs] = useState({});

  const toggleFAQ = (id) => {
    setOpenFAQs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-black text-white min-h-screen pt-10 pb-10">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-red-600 to-red-700 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Help Center</h1>
          <p className="text-xl text-red-100">
            We're here to support you every step of the way
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-red-500 transition">
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold mb-2">Phone Support</h3>
            <p className="text-gray-400 text-sm mb-3">
              Call our helpline for instant assistance
            </p>
            <p className="text-red-400 font-semibold">1-800-CARCARE</p>
            <p className="text-xs text-gray-500 mt-2">(1-800-2272273)</p>
          </div>

          {/* Email */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-red-500 transition">
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm mb-3">
              Send us your queries anytime
            </p>
            <p className="text-red-400 font-semibold break-all">
              support@carcare.com
            </p>
            <p className="text-xs text-gray-500 mt-2">Response within 2 hours</p>
          </div>

          {/* Live Chat */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-red-500 transition">
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm mb-3">
              Chat with our support team instantly
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="text-green-400 font-semibold">Available 24/7</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-red-500 transition">
            <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt size={24} className="text-red-500" />
            </div>
            <h3 className="font-bold mb-2">Visit Us</h3>
            <p className="text-gray-400 text-sm mb-3">
              Find our physical location
            </p>
            <p className="text-red-400 font-semibold text-sm">
              123 Auto Street<br />
              Tech City, TC 12345
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                item={faq}
                isOpen={openFAQs[faq.id] || false}
                onToggle={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-linear-to-r from-red-600/20 to-red-700/20 border border-red-500/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Our Support Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-400 mb-3">Phone & Email</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Monday - Friday: 9:00 AM - 8:00 PM EST</li>
                <li>Saturday: 10:00 AM - 6:00 PM EST</li>
                <li>Sunday: 12:00 PM - 5:00 PM EST</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-400 mb-3">Live Chat</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Available 24/7 for urgent assistance</li>
                <li>Average response time: 2-5 minutes</li>
                <li>Support in English and Spanish</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
