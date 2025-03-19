"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import {
  Car,
  DollarSign,
  Home,
  User,
  Briefcase,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import FinanceForm from "./components/FinanceForm";
import axios from "axios";

export default function FinancePage() {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const nextFormStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const prevFormStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form submitted",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/ecom/product/get?all=true");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const [userInfo, setUserInfo] = useState<{ vendors: any[] } | null>(null);

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
    <>
      <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Finance <span className="text-primary">Information</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below to get in touch with our team. We'll
                help you find your dream car and assist with financing options.
              </p>
            </motion.div>

            {/* Form Progress */}
            <div className="mb-8">
              <div className="flex justify-between">
                {[
                  "Personal Information",
                  "Current Address",
                  "Employment",
                  "Desired Vehicle",
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        formStep >= index
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index === 0 && <User className="h-5 w-5" />}
                      {index === 1 && <Home className="h-5 w-5" />}
                      {index === 2 && <Briefcase className="h-5 w-5" />}
                      {index === 3 && <Car className="h-5 w-5" />}
                    </div>
                    <span
                      className={`text-xs md:text-sm ${
                        formStep >= index
                          ? "text-primary font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(formStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </div>
            <FinanceForm
              formStep={formStep}
              products={products}
              nextFormStep={nextFormStep}
              prevFormStep={prevFormStep}
              handleSubmit={handleSubmit}
            />
            <div className="mt-12 relative">
              <motion.div
                className="absolute -top-20 -left-20 opacity-10 hidden md:block"
                animate={{
                  x: [0, 20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Car className="h-40 w-40 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-20 -right-20 opacity-10 hidden md:block"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <DollarSign className="h-40 w-40 text-primary" />
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>

                {userInfo && userInfo.vendors[0]?.phoneNo?.length > 0
                  ? userInfo.vendors[0].phoneNo.map(
                      (phone: any, index: any) => (
                        <span key={index}>
                          + {phone}
                          {index < userInfo.vendors[0].phoneNo.length - 1 &&
                            ", "}
                        </span>
                      )
                    )
                  : ""}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">
                  {userInfo?.vendors[0].serviceEmail
                    ? userInfo.vendors[0].serviceEmail
                    : ""}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>

                {userInfo?.vendors[0]?.vendorAddress?.[0] ? (
                  <>
                    {userInfo?.vendors[0].vendorAddress[0].street &&
                      `${userInfo?.vendors[0].vendorAddress[0].street}, `}
                    {userInfo?.vendors[0].vendorAddress[0].city &&
                      `${userInfo?.vendors[0].vendorAddress[0].city}, `}
                    {userInfo?.vendors[0].vendorAddress[0].state &&
                      `${userInfo?.vendors[0].vendorAddress[0].state}, `}
                    {userInfo?.vendors[0].vendorAddress[0].country &&
                      `${userInfo?.vendors[0].vendorAddress[0].country}, `}
                    {userInfo?.vendors[0].vendorAddress[0].postalCode}
                  </>
                ) : (
                  "Address not available"
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
