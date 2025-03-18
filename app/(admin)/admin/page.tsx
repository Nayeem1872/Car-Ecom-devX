"use client";
import { motion } from "framer-motion";
import AuthForm from "./components/AuthForm";

const Login = () => {
  //   const { isAuthenticated } = useAuth();
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       router.push("/dashboard");
  //     }
  //   }, [isAuthenticated, router]);

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
