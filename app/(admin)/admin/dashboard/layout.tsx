"use client";
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/ecom/user");
        if (
          response.data &&
          response.data.success === false &&
          response.data.message === "Not authorized"
        ) {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    fetchUser();
  }, []);
  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center w-screen h-screen">
  //         <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <motion.main
        className="flex-1 ml-[80px] lg:ml-[240px] p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto max-w-7xl">{children}</div>
        <Toaster />
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
