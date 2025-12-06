import { FaHeadset } from "react-icons/fa";
import { useSupportContext } from "../context/SupportContext";

export default function SupportButton() {
  const { setIsChatOpen } = useSupportContext();

  return (
    <button
      onClick={() => setIsChatOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-xl flex items-center justify-center z-30 transition transform hover:scale-110 animate-bounce"
      title="Open support chat"
    >
      <FaHeadset size={24} />
    </button>
  );
}
