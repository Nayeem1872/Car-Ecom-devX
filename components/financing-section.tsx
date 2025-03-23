"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Car,
  Plane,
  CheckCircle,
  DollarSign,
  ArrowRight,
  Shield,
  BadgePercent,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function FinancingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative"
      ref={ref}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Flexible <span className="text-primary">Financing</span> Options
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe everyone deserves to drive their dream car. Our financing
            solutions are designed to help you get behind the wheel regardless
            of your credit situation.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* First Time Buyer Program */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 text-center h-full transition-all duration-300"
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(225, 29, 72, 0.2)",
            }}
          >
            <motion.div
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              variants={iconVariants}
              whileHover={{ rotate: 5 }}
            >
              <Car className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4">FIRST TIME BUYER PROGRAM</h3>
            <p className="text-muted-foreground mb-6">
              No credit history? No problem! Our financing options are tailored
              to help first-time buyers get their first car and start building
              their credit with confidence.
            </p>
            <div className="flex justify-center">
              <Link href="/financing">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Newcomers Support */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 text-center h-full transition-all duration-300"
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(225, 29, 72, 0.2)",
            }}
          >
            <motion.div
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              variants={iconVariants}
              whileHover={{ rotate: 5 }}
            >
              <Plane className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4">NEWCOMERS SUPPORT</h3>
            <p className="text-muted-foreground mb-6">
              Starting fresh in a new country can be challenging, especially
              without a credit history. Our flexible financing solutions are
              tailored to help immigrants and newcomers get the vehicle they
              need and start their journey with confidence.
            </p>
            <div className="flex justify-center">
              <Link href="/financing">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Specialized Financing */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 text-center h-full transition-all duration-300"
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(225, 29, 72, 0.2)",
            }}
          >
            <motion.div
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              variants={iconVariants}
              whileHover={{ rotate: 5 }}
            >
              <CheckCircle className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4">SPECIALIZED FINANCING</h3>
            <p className="text-muted-foreground mb-6">
              No matter your credit situation, we offer financing solutions to
              meet your unique needs. From rebuilding credit to flexible terms,
              our options are designed to help you secure the vehicle you need
              with ease and confidence.
            </p>
            <div className="flex justify-center">
              <Link href="/financing">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Secure Process</h4>
              <p className="text-sm text-muted-foreground">
                Your information is always protected
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <BadgePercent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Competitive Rates</h4>
              <p className="text-sm text-muted-foreground">
                We work with multiple lenders to find you the best rate
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Quick Approval</h4>
              <p className="text-sm text-muted-foreground">
                Get pre-approved in as little as 24 hours
              </p>
            </div>
          </div>
        </motion.div>

        {/* Referral Program */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-10 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-10 left-10 opacity-10"
            animate={{
              y: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <DollarSign className="h-40 w-40 text-primary" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-10 opacity-10"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <DollarSign className="h-40 w-40 text-primary" />
          </motion.div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <DollarSign className="h-12 w-12 text-primary" />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              WE PAY YOU FOR YOUR WORD OF MOUTH
            </h3>
            <p className="text-xl md:text-2xl font-bold mb-6">
              RECEIVE $500 FOR EVERY SUCCESSFUL REFERRAL
            </p>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Love your car? Tell your friends and family about us! When they
              purchase a vehicle from LuxuryCars and mention your name, you'll
              receive $500 as our way of saying thank you.
            </p>
            <Link href="/financing">
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                Learn About Our Referral Program
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
