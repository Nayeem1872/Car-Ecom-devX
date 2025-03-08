"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

const featuredCars = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    category: "Luxury Sedan",
    price: 110000,
    image: "https://images.unsplash.com/photo-1622037022028-07f7f2d9b59e?q=80&w=2070&auto=format&fit=crop",
    features: ["Leather Interior", "Panoramic Roof", "Advanced Safety"],
  },
  {
    id: 2,
    name: "BMW X7",
    category: "Premium SUV",
    price: 85000,
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
    features: ["7 Seats", "All-Wheel Drive", "Premium Sound System"],
  },
  {
    id: 3,
    name: "Audi e-tron GT",
    category: "Electric",
    price: 99000,
    image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2070&auto=format&fit=crop",
    features: ["Electric", "Fast Charging", "Quattro AWD"],
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports Car",
    price: 120000,
    image: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=2071&auto=format&fit=crop",
    features: ["Twin-Turbo", "Rear-Wheel Drive", "Sport Chrono Package"],
  },
  {
    id: 5,
    name: "Ferrari Roma",
    category: "Sports Car",
    price: 220000,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop",
    features: ["V8 Engine", "Carbon Fiber", "Italian Design"],
  },
  {
    id: 6,
    name: "Lamborghini Huracán",
    category: "Supercar",
    price: 260000,
    image: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop",
    features: ["V10 Engine", "Carbon Chassis", "Track Mode"],
  },
]

export default function FeaturedCars() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const handleAddToCart = (car: (typeof featuredCars)[0]) => {
    addToCart({
      id: car.id,
      name: car.name,
      price: car.price,
      image: car.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${car.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const nextSlide = () => {
    if (currentIndex < featuredCars.length - 4) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(featuredCars.length - 4)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide]) //Fixed dependency

  const visibleCars =
    window?.innerWidth >= 1024
      ? featuredCars.slice(currentIndex, currentIndex + 4)
      : window?.innerWidth >= 768
        ? featuredCars.slice(currentIndex, currentIndex + 2)
        : featuredCars.slice(currentIndex, currentIndex + 1)

  return (
    <section className="py-20 bg-white" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Cars</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles that combine luxury, performance, and style.
          </p>
        </motion.div>

        <div className="relative">
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
              style={{ transform: `translateX(-${currentIndex * (100 / featuredCars.length)}%)` }}
            >
              {featuredCars.map((car, index) => (
                <div key={car.id} className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="car-card h-full overflow-hidden border-none shadow-lg">
                      <CardHeader className="p-0">
                        <div className="relative h-56 car-image-container">
                          <img
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10"
                            onClick={() => toggleFavorite(car.id)}
                          >
                            <Heart
                              className={`h-5 w-5 transition-colors duration-300 ${
                                favorites.includes(car.id) ? "fill-primary text-primary" : ""
                              }`}
                            />
                          </Button>
                          <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary/90 z-10">
                            {car.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-5">
                        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-3">${car.price.toLocaleString()}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {car.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-5 pt-0 flex gap-2">
                        <Button
                          variant="default"
                          className="w-full bg-primary hover:bg-primary/90 group"
                          onClick={() => handleAddToCart(car)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
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
  )
}

