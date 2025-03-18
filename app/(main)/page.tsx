"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronRight,
  Car,
  Shield,
  Clock,
  Award,
  DollarSign,
} from "lucide-react";
import FeaturedCars from "@/components/featured-cars";
import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import BrandsSection from "@/components/brands-section";
import CounterSection from "@/components/counter-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FinancingSection from "@/components/financing-section";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">DevXCars</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            We offer an unparalleled car buying experience with premium service
            and exceptional vehicles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Car className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
            <p className="text-muted-foreground">
              Choose from hundreds of luxury cars from top manufacturers around
              the world.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Shield className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-muted-foreground">
              Every vehicle undergoes a rigorous 150-point inspection before
              sale.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Clock className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Get your dream car delivered to your doorstep within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <DollarSign className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Specialized Financing
            </h3>
            <p className="text-muted-foreground">
              No matter your credit situation, we offer financing solutions to
              meet your unique needs. From rebuilding credit to flexible terms,
              our options are designed to help you secure the vehicle you need
              with ease and confidence.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/about">
            <Button size="lg" className="group bg-primary hover:bg-primary/90">
              Learn More About Us
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      <FeaturedCars />

      <CounterSection />

      <BrandsSection />

      <FinancingSection />

      <Testimonials />

      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who found their dream cars
            with us. Start your journey today!
          </p>
          <Link href="/cars">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 animate-pulse-slow"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
      {/* <Footer /> */}
    </main>
  );
}
