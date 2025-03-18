"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

interface Vendor {
  _id: string;
  vendorName: string;
  vendorDetails: string;
  logo: string;
  vendorAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    _id: string;
  }[];
  vendorType: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  phoneNo: string[];
  serviceEmail: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfo, setUserInfo] = useState<{ vendors: Vendor[] } | null>(null);
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
        <CartProvider>
          <Navbar vendor={userInfo ? userInfo.vendors[0] : null} />
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { metadata } from "@/context/metadata";
