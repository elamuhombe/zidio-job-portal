//src/components/context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { User, AuthContextType } from "./AuthContextTypes"; // Import the interfaces

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Change AuthProvider to default export
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // Export as default
