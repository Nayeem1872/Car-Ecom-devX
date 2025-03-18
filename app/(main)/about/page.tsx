"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Car,
  DollarSign,
  Award,
  Users,
  ThumbsUp,
  ChevronRight,
  Clock,
  Shield,
  CreditCard,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import useFetchData from "@/hooks/useFetchData";

export default function AboutPage() {
  const { data: userInfo, isLoading } = useFetchData<{ vendors: any[] }>(
    "/api/ecom/vendor/get"
  );
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <main className="min-h-screen relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 opacity-5"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Car className="h-64 w-64 text-primary" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-10 opacity-5"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <DollarSign className="h-64 w-64 text-primary" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-1/4 opacity-5"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <CreditCard className="h-48 w-48 text-primary" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Driving <span className="text-primary">Dreams</span> Forward
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At LuxuryCars, we believe everyone deserves the opportunity to
              drive a quality vehicle. Our mission is to provide affordable cars
              to newcomers and make car ownership accessible through flexible
              financing options.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/cars">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 mr-4"
                >
                  Browse Our Cars
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,69.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Founded with a clear purpose, LuxuryCars is dedicated to
                breaking down barriers to car ownership. We understand that for
                newcomers to the country or those just starting their financial
                journey, purchasing a vehicle can seem overwhelming.
              </p>
              <p className="text-muted-foreground mb-6">
                That's why we've created a welcoming environment where everyone
                is treated with respect and given the opportunity to find a
                quality vehicle at an affordable price, regardless of their
                credit history or financial background.
              </p>
              <div className="flex items-center space-x-2 text-primary font-medium">
                <ThumbsUp className="h-5 w-5" />
                <span>Trusted by thousands of satisfied customers</span>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop"
                  alt="Car Dealership"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Award Winning</h3>
                    <p className="text-sm text-muted-foreground">
                      Best Dealership 2023
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We <span className="text-primary">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive approach ensures that you not only find the
              perfect car but also get the support you need throughout your
              ownership journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Affordable Vehicles</h3>
              <p className="text-muted-foreground mb-6">
                We carefully select quality pre-owned vehicles and price them
                affordably to ensure they're accessible to newcomers and
                first-time buyers. Our inventory includes a wide range of makes
                and models to suit different needs and budgets.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Extensive selection of quality pre-owned vehicles</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>All vehicles undergo thorough inspection</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Extended warranty options available</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/cars">
                  <Button className="bg-primary hover:bg-primary/90">
                    View Our Inventory
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible Financing</h3>
              <p className="text-muted-foreground mb-6">
                We understand that traditional financing can be challenging for
                newcomers. That's why we've developed flexible financing
                solutions that consider your unique situation, not just your
                credit score or history.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Financing options for all credit situations</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Special programs for newcomers to the country</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Low down payment options available</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Personalized payment plans to fit your budget</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90">
                    Apply for Financing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">LuxuryCars</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a car dealership. We're your partners in
              making car ownership a reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
              <p className="text-muted-foreground">
                We take the time to understand your unique needs and
                circumstances to provide tailored solutions that work for you.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency & Trust</h3>
              <p className="text-muted-foreground">
                We believe in complete transparency throughout the buying
                process, with no hidden fees or surprises.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Efficient Process</h3>
              <p className="text-muted-foreground">
                Our streamlined process means you can complete your purchase
                quickly and be driving your new car in no time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Customer <span className="text-primary">Stories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Hear from some of our satisfied
              customers who found their perfect car with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Customer"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">New to Canada</p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "As a newcomer to Canada, I was worried about getting approved
                for a car loan. LuxuryCars made the process so easy and found me
                a beautiful car that fit my budget. Their team was incredibly
                supportive throughout the entire process."
              </p>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Customer"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">
                    First-time buyer
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "I was nervous about buying my first car, especially with
                limited credit history. The team at LuxuryCars was patient,
                explained everything clearly, and helped me find a reliable car
                with payments I could afford. I couldn't be happier!"
              </p>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Customer"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold">Emily Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">
                    Needed financing
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "After being turned down by traditional lenders, I thought I'd
                never be able to get a decent car. LuxuryCars worked with my
                situation and found me both a great car and financing that
                worked with my budget. Their customer service is exceptional!"
              </p>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold mb-2">5000+</h3>
              <p className="text-white/80">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-white/80">Cars Sold</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-white/80">Customer Satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-4xl font-bold mb-2">10+</h3>
              <p className="text-white/80">Years of Experience</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your{" "}
              <span className="text-primary">Perfect Car?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Visit our showroom today or browse our inventory online. Our team
              is ready to help you find the perfect vehicle and financing
              solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/cars">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                >
                  Browse Our Cars
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
