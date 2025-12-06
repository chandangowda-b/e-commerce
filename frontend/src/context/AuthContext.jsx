import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // simple in-memory/localStorage user list

  useEffect(() => {
    const stored = localStorage.getItem("carcare_auth_user");
    const storedUsers = localStorage.getItem("carcare_users");
    if (stored) setUser(JSON.parse(stored));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem("carcare_auth_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("carcare_users", JSON.stringify(users));
  }, [users]);

  const signUp = ({ name, email, password }) => {
    // Simple check for existing user
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { ok: false, message: "User already exists" };
    }
    const newUser = { id: Date.now(), name, email, password };
    setUsers((s) => [...s, newUser]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { ok: true };
  };

  const signIn = ({ email, password }) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, message: "Invalid credentials" };
    setUser({ id: found.id, name: found.name, email: found.email });
    return { ok: true };
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
