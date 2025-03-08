"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
