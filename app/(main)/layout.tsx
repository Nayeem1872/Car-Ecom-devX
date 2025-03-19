"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import { metadata } from "@/context/metadata";

const inter = Inter({ subsets: ["latin"] });

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<{ vendors: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/ecom/vendor/get");
        setUserInfo(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching User:", error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  const Loader = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CartProvider>
      <Navbar vendor={userInfo ? userInfo.vendors[0] : null} />
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
      <Toaster />
      <Footer vendor={userInfo ? userInfo.vendors[0] : null} />
    </CartProvider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </head>
      <body className={inter.className}>
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
