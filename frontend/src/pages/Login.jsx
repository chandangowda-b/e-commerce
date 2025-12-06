import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = signIn({ email, password });
    if (!res.ok) {
      setError(res.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <div className="text-red-400 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded bg-transparent border border-white/20"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded bg-transparent border border-white/20"
            />
          </div>

          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
