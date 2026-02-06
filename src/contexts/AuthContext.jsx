import React, { createContext, useContext, useState } from "react";
import { authAPI } from "@/api/api.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });

    // Store tokens
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);

    // Optionally set current user
    const currentUser = await authAPI.getCurrentUser();
    setUser(currentUser.data.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
