"use client";
import { motion } from "framer-motion";
import AuthForm from "./components/AuthForm";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("/api/ecom/user");

  //       if (
  //         response.status === 200 ||
  //         (response.data && response.data.success)
  //       ) {
  //         router.push("/admin/dashboard");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching User:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6 pt-20">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to access your dashboard and manage your projects
            </p>
          </motion.div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
