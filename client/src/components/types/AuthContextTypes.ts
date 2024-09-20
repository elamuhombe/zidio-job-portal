// src/components/types/AuthContextTypes.ts

// Define the user type
export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  // Define the context type
  export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }
  