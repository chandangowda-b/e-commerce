import { useState } from "react";
import { FaTimes, FaPhone, FaPaperPlane } from "react-icons/fa";
import { useSupportContext } from "../context/SupportContext";

export default function SupportModal() {
  const { isChatOpen, setIsChatOpen, messages, sendMessage, resetChat } =
    useSupportContext();
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-black border-2 border-red-500 rounded-2xl shadow-2xl flex flex-col z-40">
      {/* Header */}
      <div className="bg-linear-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaPhone size={18} />
          <div>
            <h3 className="font-bold">CarCare Support</h3>
            <p className="text-xs text-red-100">We're here to help!</p>
          </div>
        </div>
        <button
          onClick={() => setIsChatOpen(false)}
          className="p-1 hover:bg-red-500 rounded transition"
        >
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-red-600 text-white rounded-br-none"
                  : "bg-white/10 text-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 px-4 py-3 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-1"
        >
          <FaPaperPlane size={14} />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-700 px-4 py-2 bg-gray-900 text-xs text-center">
        <button
          onClick={resetChat}
          className="text-red-400 hover:text-red-300 underline"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
}
