"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Clock, MapPin, Phone, Mail } from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ContactForm from "./components/ContactForm";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
                <CardTitle>Request a Test Drive</CardTitle>
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
                      123 Dealership Avenue
                      <br />
                      Vancouver, BC V6B 4X8
                      <br />
                      Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      Sales: (604) 123-4567
                      <br />
                      Service: (604) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      info@dealership.com
                      <br />
                      service@dealership.com
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
