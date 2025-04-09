"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ClipboardCheck,
  FileCheck,
  UserCheck,
  ThumbsUp,
  Car,
  FileSignature,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Search,
  ShieldCheck,
  Handshake,
} from "lucide-react";

export default function RoadMapPage() {
  const steps = [
    {
      id: 1,
      title: "Step 1: Submit Application",
      description:
        "Our application takes less than 2 minutes to complete and we only ask for the information we need to get an approval in place, which includes contact information, employment or other income details, as well as address information. The form is SSL secure which ensures your information is safe.",
      icon: <ClipboardCheck className="h-8 w-8" />,
      customerAction: "Complete and submit the online application form",
      ourAction: "Receive your application and prepare for review",
      timeframe: "1-5 minutes",
      link: "/financing",
      linkText: "Start Application",
    },
    {
      id: 2,
      title: "Step 2: Application Review",
      description:
        "Within hours of sending in your application one of our highly trained Finance Directors will contact you to go over your application, gather any other information they may need to speed up the process and make it easier, and book a time for you to come in and check out our inventory. We then secure your approval through one of the lenders we deal with. Don’t worry about your credit either. We have dozens lenders for all credit situations.",
      icon: <FileCheck className="h-8 w-8" />,
      customerAction: "Complete and submit the online application form",
      ourAction: "Receive your application and prepare for review",
      timeframe: "2-4 Hours",
    },
    {
      id: 3,
      title: "Step 3: Vehicle Selection & Finalization",
      description:
        "When you come in we will work with you to find the perfect vehicle that fits your budget and is perfect for you and your family. Paperwork is signed and you get to drive away in the ride you wanted at a payment you can afford. It’s really that easy.",
      icon: <UserCheck className="h-8 w-8" />,
      customerAction: "Complete and submit the online application form",
      ourAction: "Receive your application and prepare for review",
      timeframe: "1-2 days",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen py-16 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Journey to{" "}
            <span className="text-primary">Vehicle Ownership</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We've simplified the process of getting your dream car. Follow these
            steps to a smooth and hassle-free experience.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start mb-12 relative">
                {/* Timeline connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-10 top-20 w-1 bg-gradient-to-b from-primary/50 to-primary/10 h-full -z-10"></div>
                )}

                {/* Step number and icon */}
                <div className="mr-8 relative">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-primary/20 relative z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                      className="text-primary"
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-full animate-ping-slow opacity-30"></div>
                </div>

                {/* Step content */}
                <motion.div
                  className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderColor: "rgba(225, 29, 72, 0.2)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">{step.id}</span>
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <UserCheck className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium text-sm">Your Action</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.customerAction}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium text-sm">Our Action</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.ourAction}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Timeframe: {step.timeframe}</span>
                    </div>
                    {step.link && (
                      <Link href={step.link}>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 group"
                        >
                          {step.linkText}
                          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Final step - Completion */}
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg border border-green-200">
              <Handshake className="h-8 w-8 text-green-600" />
            </div>
          </motion.div>
          <motion.div
            className="text-center mt-6 mb-16"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-2">Enjoy Your New Vehicle!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Congratulations on your new car! Our relationship doesn't end here
              - we're always here to support you.
            </p>
          </motion.div>
        </motion.div>

        {/* Benefits section */}
        <div className="max-w-4xl mx-auto mt-20">
          <motion.h2
            className="text-3xl font-bold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Why Choose Our{" "}
            <span className="text-primary">Application Process</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick & Efficient</h3>
              <p className="text-muted-foreground">
                Our streamlined process means you can complete your application
                quickly and be driving your new car in no time.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Transparent Process
              </h3>
              <p className="text-muted-foreground">
                We believe in complete transparency throughout the buying
                process, with no hidden fees or surprises.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Secure & Confidential
              </h3>
              <p className="text-muted-foreground">
                Your personal information is always protected with our secure
                application process and strict privacy policies.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="max-w-4xl mx-auto mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your <span className="text-primary">Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Begin your application today and take the first step towards driving
            your dream car.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/financing">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 group"
              >
                Start Application
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
