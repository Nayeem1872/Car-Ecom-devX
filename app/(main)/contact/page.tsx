"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Clock, MapPin, Phone, Mail } from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ContactForm from "./components/ContactForm";
import axios from "axios";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<{ vendors: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/ecom/vendor/get");
        const productsResponse = await axios.get(
          "/api/ecom/product/get?all=true"
        );
        setProducts(productsResponse.data.data);
        setUserInfo(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching User:", error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          We're here to help! Fill out the form below to get in touch with our
          team.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Request Submitted</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <Alert className="mb-6">
                    <AlertTitle>Thank you for your request!</AlertTitle>
                    <AlertDescription>
                      Our team will get back to you shortly to confirm your test
                      drive appointment.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <ContactForm
                    setSubmitted={setSubmitted}
                    setIsSubmitting={setIsSubmitting}
                    products={products}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-sm text-muted-foreground">
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
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      {userInfo && userInfo.vendors[0]?.phoneNo?.length > 0
                        ? userInfo.vendors[0].phoneNo.map(
                            (phone: any, index: any) => (
                              <span key={index}>
                                + {phone}
                                {index <
                                  userInfo.vendors[0].phoneNo.length - 1 &&
                                  ", "}
                              </span>
                            )
                          )
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      {userInfo?.vendors[0].serviceEmail
                        ? userInfo.vendors[0].serviceEmail
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9AM - 6PM
                      <br />
                      Saturday: 10AM - 4PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
