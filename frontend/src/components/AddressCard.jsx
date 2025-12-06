import { useState } from "react";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

export default function AddressCard({ address, isNew }) {
  const user = useStore((state) => state.user);
  const addUserAddress = useStore((state) => state.addUserAddress);
  const updateUserAddress = useStore((state) => state.updateUserAddress);
  const removeUserAddress = useStore((state) => state.removeUserAddress);

  const [isEditing, setIsEditing] = useState(isNew || false);
  const [formData, setFormData] = useState(
    address || {
      label: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      isDefault: false,
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.label.trim()) newErrors.label = "Label is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    else if (!/^\d{6}$/.test(formData.zipCode))
      newErrors.zipCode = "Invalid zip code";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      if (isNew) {
        addUserAddress(formData);
      } else {
        updateUserAddress(address.id, formData);
      }
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (address && window.confirm("Are you sure you want to delete this address?")) {
      removeUserAddress(address.id);
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4"
      >
        <h4 className="font-bold text-lg">
          {isNew ? "Add New Address" : "Edit Address"}
        </h4>

        {/* Label */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Address Label *
          </label>
          <select
            name="label"
            value={formData.label}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
              errors.label ? "border-red-500" : "border-white/20"
            }`}
          >
            <option value="">Select Label</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          {errors.label && (
            <p className="text-red-400 text-xs mt-1">{errors.label}</p>
          )}
        </div>

        {/* Street */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Street Address *
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="123 Main Street"
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
              errors.street ? "border-red-500" : "border-white/20"
            }`}
          />
          {errors.street && (
            <p className="text-red-400 text-xs mt-1">{errors.street}</p>
          )}
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Bangalore"
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                errors.city ? "border-red-500" : "border-white/20"
              }`}
            />
            {errors.city && (
              <p className="text-red-400 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Karnataka"
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                errors.state ? "border-red-500" : "border-white/20"
              }`}
            />
            {errors.state && (
              <p className="text-red-400 text-xs mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="560001"
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                errors.zipCode ? "border-red-500" : "border-white/20"
              }`}
            />
            {errors.zipCode && (
              <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Country *
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="India"
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
              errors.country ? "border-red-500" : "border-white/20"
            }`}
          />
          {errors.country && (
            <p className="text-red-400 text-xs mt-1">{errors.country}</p>
          )}
        </div>

        {/* Default Address */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-red-500"
          />
          <span className="text-sm text-gray-300">Set as default address</span>
        </label>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              if (isNew) setFormData({});
            }}
            className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm flex items-center justify-center gap-2 transition"
          >
            <FaCheck size={14} />
            Save
          </button>
        </div>
      </motion.div>
    );
  }

  if (isNew) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsEditing(true)}
        className="w-full bg-white/5 backdrop-blur-lg border-2 border-dashed border-white/20 hover:border-red-500 rounded-2xl p-8 transition text-center"
      >
        <p className="text-lg font-semibold text-white mb-1">+ Add New Address</p>
        <p className="text-xs text-gray-400">Add a new delivery address</p>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white/5 backdrop-blur-lg border rounded-2xl p-6 relative transition ${
        address.isDefault
          ? "border-red-500/50 bg-red-500/5"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Default Badge */}
      {address.isDefault && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold rounded-full">
          DEFAULT
        </div>
      )}

      {/* Content */}
      <h4 className="font-bold text-lg mb-3">{address.label}</h4>

      <div className="space-y-1 text-sm text-gray-300 mb-4">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p>{address.country}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm flex items-center justify-center gap-2 transition"
        >
          <FaEdit size={14} />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm flex items-center justify-center gap-2 transition"
        >
          <FaTrash size={14} />
          Delete
        </button>
      </div>
    </motion.div>
  );
}
