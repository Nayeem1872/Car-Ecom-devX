"use client";

import { CardContent } from "@/components/ui/card";

import { CardHeader } from "@/components/ui/card";

import { Card } from "@/components/ui/card";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
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

  // useEffect(() => {
  //   // Simulate fetching car data
  //   // const carId = Number(id);

  //   const carId = 5;
  //   const foundCar = carsData.find((c) => c.id === carId);

  //   if (foundCar) {
  //     setCar(foundCar);

  //     // Get related cars
  //     if (foundCar.relatedCars && foundCar.relatedCars.length > 0) {
  //       const related = carsData.filter((c) =>
  //         foundCar.relatedCars.includes(c.id)
  //       );
  //       setRelatedCars(related);
  //     }
  //   } else {
  //     // Handle car not found
  //     router.push("/cars");
  //   }

  //   setLoading(false);
  // }, [id, router]);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const response = await axios.get("/api/ecom/product/get?all=true");
        const productsData = response.data.data;
        setProducts(productsData);
        console.log("productsData", productsData);

        const carId = id; // use the id from useParams()
        const foundCar = productsData.find((c: any) => c._id === carId);
        console.log("foundCar", foundCar);

        if (foundCar) {
          // Destructure to remove category and brand from the found object
          const { category, brand, ...rest } = foundCar;

          // Define your default fallback data
          const defaults = {
            specs: {
              engine: "3.0L Inline-6 Turbo",
              power: "429 hp",
              torque: "384 lb-ft",
              acceleration: "4.9 seconds (0-60 mph)",
              topSpeed: "155 mph (limited)",
              transmission: "9-speed automatic",
              drivetrain: "Rear-wheel drive",
              fuelEconomy: "22 mpg city / 29 mpg highway",
              weight: "4,740 lbs",
              dimensions: '208.2" L x 76.9" W x 59.2" H',
            },
            features: [
              "Leather Interior",
              "Panoramic Roof",
              "Advanced Safety",
              "Heated Seats",
              "Ambient Lighting",
            ],
            year: 2023,
            mileage: 0,
            condition: "New",
            exteriorColor: "Obsidian Black",
            interiorColor: "Black Nappa Leather",
            vin: "WDDUG8DB1LA456789",
            stockNumber: "MB12345",
            relatedCars: [2, 3, 6],
          };

          // Merge defaults with the rest of the foundCar data.
          // For nested objects like specs, merge them separately.
          const mergedCar = {
            id: foundCar._id,
            ...defaults,
            ...rest,
            specs: {
              ...defaults.specs,
              ...(rest.specs || {}), // merge specs: if foundCar.specs is missing, defaults are used
            },
            features:
              rest.features && rest.features.length > 0
                ? rest.features
                : defaults.features,
          };

          setCar(mergedCar);

          // Get related cars based on product _id values if available
          if (mergedCar.relatedCars && mergedCar.relatedCars.length > 0) {
            const related = productsData.filter((c: any) =>
              mergedCar.relatedCars.includes(c._id)
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
    <main className="min-h-screen pb-20" ref={containerRef}>
      {/* Hero Section with Main Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: `url(${car.images[currentImageIndex]})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10"></div>
        </motion.div>

        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col justify-end h-full pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="mb-4 bg-white/20 backdrop-blur-sm"
                onClick={() => router.back()}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge className="mb-2 bg-primary hover:bg-primary/90">
                {car.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {car.name}
              </h1>
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <Calendar className="h-4 w-4" />
                <span>{car.year}</span>
                <span className="mx-2">•</span>
                <Gauge className="h-4 w-4" />
                <span>{car.mileage.toLocaleString()} miles</span>
                <span className="mx-2">•</span>
                <span>{car.condition}</span>
              </div>
              <p className="text-3xl font-bold text-white">
                ${car.price.toLocaleString()}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
                      <p className="text-muted-foreground">{car.stockNumber}</p>
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
                          <h4 className="font-semibold mb-1">Electric Range</h4>
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
                    <p className="text-sm text-muted-foreground">Call us at</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email us at</p>
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
        <section className="container mx-auto px-4 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCars.map((relatedCar, index) => (
                <motion.div
                  key={relatedCar._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/cars/${relatedCar.id}`}>
                    <Card className="car-card h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="p-0">
                        <div className="relative h-48 car-image-container">
                          <img
                            src={relatedCar.images[0] || "/placeholder.svg"}
                            alt={relatedCar.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary/90 z-10">
                            {relatedCar.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-5">
                        <h3 className="text-xl font-semibold mb-2">
                          {relatedCar.name}
                        </h3>
                        <p className="text-xl font-bold text-primary mb-3">
                          ${relatedCar.price.toLocaleString()}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{relatedCar.year}</span>
                          <span className="mx-2">•</span>
                          <Gauge className="h-4 w-4 mr-1" />
                          <span>
                            {relatedCar.mileage.toLocaleString()} miles
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </main>
  );
}
