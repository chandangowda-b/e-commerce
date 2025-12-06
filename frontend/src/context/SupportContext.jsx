import { createContext, useContext, useState } from "react";

const SupportContext = createContext(null);

export const useSupportContext = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error("useSupportContext must be used within SupportProvider");
  }
  return context;
};

export const SupportProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Hello! 👋 How can we assist you today?",
      timestamp: new Date(),
    },
  ]);

  const sendMessage = (userMessage) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate support response
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "support",
          text: response,
          timestamp: new Date(),
        },
      ]);
    }, 800);
  };

  const generateResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("track") ||
      lowerMessage.includes("order") ||
      lowerMessage.includes("shipping")
    ) {
      return "To track your order, please visit the 'Order Tracking' section or contact us with your order ID. We'll be happy to help! 📦";
    }
    if (
      lowerMessage.includes("return") ||
      lowerMessage.includes("refund") ||
      lowerMessage.includes("exchange")
    ) {
      return "We have a 30-day return policy. Visit our Returns page or call us at 1-800-CARCARE for more details. 🔄";
    }
    if (
      lowerMessage.includes("payment") ||
      lowerMessage.includes("card") ||
      lowerMessage.includes("transaction")
    ) {
      return "We accept credit cards, debit cards, and digital wallets. All transactions are secure. 💳 Facing issues? Let us know!";
    }
    if (
      lowerMessage.includes("product") ||
      lowerMessage.includes("quality") ||
      lowerMessage.includes("defective")
    ) {
      return "If you have product concerns, please reach out with photos if possible. Our team will resolve it quickly! 🛠️";
    }
    if (lowerMessage.includes("warranty")) {
      return "Most products come with a 1-year warranty. Check your product details for specifics. 📋";
    }
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to help! You can ask about orders, returns, payments, products, or anything else. What do you need? 😊";
    }

    return "Thank you for your message! Our team will review it shortly. For urgent matters, please call 1-800-CARCARE (1-800-2272273). ✅";
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        sender: "support",
        text: "Hello! 👋 How can we assist you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <SupportContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        messages,
        sendMessage,
        resetChat,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};
