"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Loader,
  BookOpen,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("/api/ecom/product/get?all=true");
        // Filter only those with featured === true
        const featured = response.data.data.filter(
          (car: any) => car.featured === true
        );
        setFeaturedCars(featured);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Track screen width on the client
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const total = featuredCars.length > 0 ? featuredCars.length : 1;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredCars]);

  const handleAddToCart = (car: any) => {
    console.log("Add to Cart", car);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const nextSlide = () => {
    if (featuredCars.length === 0) return;
    const visibleCount = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 2 : 1;
    if (currentIndex < featuredCars.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (featuredCars.length === 0) return;
    const visibleCount = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 2 : 1;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(featuredCars.length - visibleCount);
    }
  };

  const visibleCars =
    screenWidth >= 1024
      ? featuredCars.slice(currentIndex, currentIndex + 4)
      : screenWidth >= 768
      ? featuredCars.slice(currentIndex, currentIndex + 2)
      : featuredCars.slice(currentIndex, currentIndex + 1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Cars</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles that combine
            luxury, performance, and style.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Arrows */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / featuredCars.length)
                }%)`,
              }}
            >
              {featuredCars.map((car, index) => (
                <div
                  key={car._id}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-3"
                >
                  <Link href={`/cars/${car._id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="cursor-pointer"
                    >
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative h-56">
                          <img
                            src={car.images?.[0] || "/placeholder.svg"}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
                            onClick={() => toggleFavorite(car.id)}
                          >
                            <Heart
                              className={`h-5 w-5 transition-colors duration-300 ${
                                favorites.includes(car.id)
                                  ? "fill-primary text-primary"
                                  : ""
                              }`}
                            />
                          </Button>
                          <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary/90 z-10">
                            {car.category && typeof car.category === "object"
                              ? car.category.name
                              : ""}
                          </Badge>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-semibold mb-2">
                            {car.name}
                          </h3>
                          <p className="text-2xl font-bold text-primary mb-3">
                            ${car.price.toLocaleString()}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {car.features?.map((feature: any, index: any) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="font-normal"
                              >
                                {feature.fieldLabel}: {feature.fieldValue}{" "}
                                {/* Render the label and value */}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-5 pt-0 flex gap-2">
                          <Button
                            variant="default"
                            className="w-full bg-primary hover:bg-primary/90 group"
                            onClick={() => handleAddToCart(car)}
                          >
                            <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Get Finance
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-1">
            {featuredCars.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-6" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Cars
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
