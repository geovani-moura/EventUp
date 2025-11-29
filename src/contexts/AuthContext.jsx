import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/usuarioService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // carregar user e token do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const loggedUser = await loginUser(email, password);

      if (loggedUser) {
        setUser(loggedUser);
        // token simulado (backend fornecerá em produção)
        const simulatedToken = `token_${Date.now()}`;
        setToken(simulatedToken);

        localStorage.setItem("current_user", JSON.stringify(loggedUser));
        localStorage.setItem("auth_token", simulatedToken);
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("current_user");
    localStorage.removeItem("auth_token");
  };

  const isAuthenticated = () => {
    return !!(user && token);
  };

  const getToken = () => {
    return token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        getToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
