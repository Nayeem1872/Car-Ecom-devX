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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email: loginData.email,
        password: loginData.password,
      });
      console.log("Login success:", response.data);

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/signup", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });
      console.log("Signup success:", response.data);

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden glass-card shadow-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="text-sm font-medium">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-sm font-medium">
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login"
              ? "Enter your credentials to access your account"
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <TabsContent value="login" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  className="glass-effect transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="hello@example.com"
                  required
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="glass-effect transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  className="glass-effect transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="glass-effect transition-all duration-200 focus:ring-2 focus:ring-offset-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full red-gradient text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </CardContent>

        <CardFooter className="flex justify-center py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </motion.div>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
