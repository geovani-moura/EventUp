import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/usuarioService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    const loggedUser = await loginUser(email, password);
    if (loggedUser) {
      setUser(loggedUser);
      localStorage.setItem("current_user", JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("current_user");
    localStorage.clear();
  };

  const isAuthenticated = () => {
    const storedUser = localStorage.getItem("current_user");
    return !!(user || storedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
