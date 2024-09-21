//src/components/layout/Layout.tsx
import { useContext, ReactNode } from "react";
import Footer from "../shared/Footer";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../shared/NavBar";
import { AuthContextType } from "../types/AuthContextTypes";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>; // Handle undefined context gracefully
  }

  const { isAuthenticated } = authContext;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
