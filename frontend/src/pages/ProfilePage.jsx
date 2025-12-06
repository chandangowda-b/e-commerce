import { useState } from "react";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import EditProfileForm from "../components/EditProfileForm";
import AddressCard from "../components/AddressCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUser,
  FaMapMarkerAlt,
  FaHistory,
  FaCog,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaVenus,
  FaMars,
} from "react-icons/fa";

export default function ProfilePage() {
  const user = useStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "orders", label: "Orders", icon: FaHistory },
    { id: "preferences", label: "Preferences", icon: FaCog },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold tracking-wide mb-2">
            My Account
          </h1>
          <p className="text-gray-400">Manage your profile and preferences</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b border-white/10"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 whitespace-nowrap text-sm font-medium transition-all ${
                activeTab === id
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
              >
                <div className="flex flex-col items-center">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.firstName}
                      className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-red-500"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4 text-5xl font-bold">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </div>
                  )}

                  <h2 className="text-2xl font-bold mt-4">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>

                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <FaEdit size={16} />
                    Edit Profile
                  </button>
                </div>
              </motion.div>

              {/* Profile Details */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold mb-6">Personal Information</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-400 text-sm">First Name</label>
                      <p className="text-white font-semibold mt-1">
                        {user.firstName}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Last Name</label>
                      <p className="text-white font-semibold mt-1">
                        {user.lastName}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm flex items-center gap-2">
                      <FaEnvelope size={14} /> Email
                    </label>
                    <p className="text-white font-semibold mt-1">{user.email}</p>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm flex items-center gap-2">
                      <FaPhone size={14} /> Phone
                    </label>
                    <p className="text-white font-semibold mt-1">{user.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-400 text-sm flex items-center gap-2">
                        <FaCalendar size={14} /> Date of Birth
                      </label>
                      <p className="text-white font-semibold mt-1">
                        {new Date(user.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm flex items-center gap-2">
                        {user.gender === "Male" ? (
                          <FaMars size={14} />
                        ) : (
                          <FaVenus size={14} />
                        )}{" "}
                        Gender
                      </label>
                      <p className="text-white font-semibold mt-1">
                        {user.gender}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition"
                  >
                    Update Information
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Saved Addresses</h3>
                <AddressCard isNew />
              </div>

              {user.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.addresses.map((address) => (
                    <AddressCard key={address.id} address={address} />
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center"
                >
                  <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No addresses saved yet</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6">Order History</h3>

              {user.orderHistory && user.orderHistory.length > 0 ? (
                <div className="space-y-4">
                  {user.orderHistory.map((order) => (
                    <motion.div
                      key={order.id}
                      variants={itemVariants}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-red-500 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-lg">{order.id}</h4>
                          <p className="text-gray-400 text-sm">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-white font-bold">₹{order.total}</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                              order.status === "Delivered"
                                ? "bg-green-500/20 text-green-400"
                                : order.status === "Processing"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <button className="mt-4 w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                        View Details
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center"
                >
                  <FaHistory className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No orders yet</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-2xl"
            >
              <h3 className="text-xl font-bold mb-8">Notification Preferences</h3>

              <div className="space-y-6">
                {[
                  {
                    key: "newsletter",
                    label: "Subscribe to Newsletter",
                    description:
                      "Get the latest deals, products and announcements",
                  },
                  {
                    key: "emailNotifications",
                    label: "Email Notifications",
                    description:
                      "Receive updates about your orders and promotions",
                  },
                  {
                    key: "smsNotifications",
                    label: "SMS Notifications",
                    description: "Get order updates via SMS",
                  },
                ].map((pref) => (
                  <label
                    key={pref.key}
                    className="flex items-start gap-4 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={user.preferences[pref.key] || false}
                      onChange={(e) => {
                        const updatePrefs = useStore.getState()
                          .updateUserPreferences;
                        updatePrefs({ [pref.key]: e.target.checked });
                      }}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-red-500 mt-1"
                    />
                    <div>
                      <p className="font-semibold">{pref.label}</p>
                      <p className="text-sm text-gray-400">{pref.description}</p>
                    </div>
                  </label>
                ))}

                <button className="mt-8 w-full sm:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition">
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <EditProfileForm onClose={() => setIsEditingProfile(false)} />
      )}

      <Footer />
    </div>
  );
}
