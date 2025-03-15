"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Car,
  Fuel,
  Gauge,
  Calendar,
  ArrowRight,
  Share2,
  Info,
  Shield,
  Phone,
  Mail,
} from "lucide-react";
import BookTestDriveButton from "@/components/book-test-drive-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RelatedCarsSection from "./RelatedCarsSection";
import CarHeroSection from "./CarHeroSection";
import axios from "axios";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedCars, setRelatedCars] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const response = await axios.get("/api/ecom/product/get?all=true");
        const productsData = response.data.data;
        setProducts(productsData);
        console.log("productsData", productsData);

        const foundCar = productsData.find((c: any) => c._id === id);
        console.log("foundCar", foundCar);

        if (foundCar) {
          setCar(foundCar);

          // Get related cars based on product _id values
          if (foundCar.relatedCars && foundCar.relatedCars.length > 0) {
            const related = productsData.filter((c: any) =>
              foundCar.relatedCars.includes(c._id)
            );
            setRelatedCars(related);
          }
        } else {
          // Optionally, redirect if no car was found
          // router.push("/cars");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [id, router]);

  const handleAddToCart = () => {
    if (!car) return;

    addToCart({
      id: car.id,
      name: car.name,
      price: car.price,
      image: car.images[0],
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${car.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handlePrevImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${car?.name} has been ${
        isFavorite ? "removed from" : "added to"
      } your favorites.`,
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/cars")}
            className="bg-primary hover:bg-primary/90"
          >
            Browse All Cars
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20" ref={containerRef}>
        {/* Hero Section with Main Image */}
        <CarHeroSection
          car={car}
          currentImageIndex={currentImageIndex}
          onBack={() => router.back()}
        />

        {/* Main Content */}
        <section className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery and Details */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image Gallery */}
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={car.images[currentImageIndex]}
                        alt={car.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Thumbnails */}
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {car.images.map((image: string, index: number) => (
                    <motion.div
                      key={index}
                      className={`relative cursor-pointer rounded-md overflow-hidden flex-shrink-0 w-20 h-20 border-2 ${
                        currentImageIndex === index
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${car.name} - View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tabs for Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specifications">
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      About this {car.name}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {car.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-primary mr-2" />
                          <h4 className="font-medium">Year</h4>
                        </div>
                        <p>{car.year}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Gauge className="h-5 w-5 text-primary mr-2" />
                          <h4 className="font-medium">Mileage</h4>
                        </div>
                        <p>{car.mileage.toLocaleString()} miles</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Car className="h-5 w-5 text-primary mr-2" />
                          <h4 className="font-medium">Condition</h4>
                        </div>
                        <p>{car.condition}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Fuel className="h-5 w-5 text-primary mr-2" />
                          <h4 className="font-medium">Fuel Type</h4>
                        </div>
                        <p>
                          {car.specs.engine.includes("Electric")
                            ? "Electric"
                            : "Gasoline"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Info className="h-4 w-4 text-primary mr-2" />
                          Exterior Color
                        </h4>
                        <p className="text-muted-foreground">
                          {car.exteriorColor}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Info className="h-4 w-4 text-primary mr-2" />
                          Interior Color
                        </h4>
                        <p className="text-muted-foreground">
                          {car.interiorColor}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Info className="h-4 w-4 text-primary mr-2" />
                          VIN
                        </h4>
                        <p className="text-muted-foreground">{car.vin}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Info className="h-4 w-4 text-primary mr-2" />
                          Stock Number
                        </h4>
                        <p className="text-muted-foreground">
                          {car.stockNumber}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="specifications"
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Engine</h4>
                          <p className="text-muted-foreground">
                            {car.specs.engine}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Power</h4>
                          <p className="text-muted-foreground">
                            {car.specs.power}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Torque</h4>
                          <p className="text-muted-foreground">
                            {car.specs.torque}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Acceleration (0-60 mph)
                          </h4>
                          <p className="text-muted-foreground">
                            {car.specs.acceleration}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Top Speed</h4>
                          <p className="text-muted-foreground">
                            {car.specs.topSpeed}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Transmission</h4>
                          <p className="text-muted-foreground">
                            {car.specs.transmission}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Drivetrain</h4>
                          <p className="text-muted-foreground">
                            {car.specs.drivetrain}
                          </p>
                        </div>
                        {car.specs.fuelEconomy && (
                          <div>
                            <h4 className="font-semibold mb-1">Fuel Economy</h4>
                            <p className="text-muted-foreground">
                              {car.specs.fuelEconomy}
                            </p>
                          </div>
                        )}
                        {car.specs.range && (
                          <div>
                            <h4 className="font-semibold mb-1">
                              Electric Range
                            </h4>
                            <p className="text-muted-foreground">
                              {car.specs.range}
                            </p>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold mb-1">Weight</h4>
                          <p className="text-muted-foreground">
                            {car.specs.weight}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Dimensions</h4>
                          <p className="text-muted-foreground">
                            {car.specs.dimensions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="features"
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      Features & Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {car.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Right Column - Actions and Contact */}
            <div>
              <motion.div
                className="bg-white rounded-xl shadow-xl p-6 mb-6 sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-2">
                  ${car.price.toLocaleString()}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Plus taxes & licensing
                </p>

                <div className="space-y-4 mb-6">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 group"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Add to Cart
                  </Button>

                  <BookTestDriveButton carId={car.id} className="w-full" />

                  <Button className="w-full bg-green-600 hover:bg-green-700 group">
                    <CreditCard className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Finance Options
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full group"
                    onClick={toggleFavorite}
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 transition-colors duration-300 ${
                        isFavorite ? "fill-primary text-primary" : ""
                      }`}
                    />
                    {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-semibold">Need help?</h4>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Call us at
                      </p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email us at
                      </p>
                      <p className="font-medium">sales@luxurycars.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">LuxuryCars Guarantee</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All our vehicles undergo a rigorous 150-point inspection and
                    come with a 30-day money-back guarantee.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Cars Section */}
        {relatedCars.length > 0 && (
          <RelatedCarsSection relatedCars={relatedCars} />
        )}
      </main>
      <Footer />
    </>
  );
}
