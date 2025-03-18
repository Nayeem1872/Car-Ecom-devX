"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/ecom/login", {
        email: loginData.email,
        password: loginData.password,
      });
      toast({
        title: "Login Successful",
        description: "You are being redirected to the dashboard...",
        open: true, 
      });
      router.push("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials, please try again.",
        variant: "destructive",
        open: true, 
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden glass-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="glass-effect transition-all duration-200 focus:ring-2 focus:ring-offset-1"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="px-0 text-xs text-primary"
                type="button"
              >
                Forgot Password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="glass-effect transition-all duration-200 focus:ring-2 focus:ring-offset-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full red-gradient text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
