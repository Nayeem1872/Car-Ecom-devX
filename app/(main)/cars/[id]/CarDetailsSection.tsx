"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Gauge,
  Car,
  Fuel,
  Info,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Share2,
  CreditCard,
  Phone,
  Mail,
  Shield,
  Heart,
  BookIcon,
} from "lucide-react";

import { CarDetailsContentProps } from "../carTypes/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const CarDetailsContent: React.FC<CarDetailsContentProps> = ({
  car,
  currentImageIndex,
  setCurrentImageIndex,
  handlePrevImage,
  handleNextImage,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleRedirect = () => {
    router.push("/financing");
  };

  const handleBookNowRedirect = () => {
    router.push("/contact");
  };

  const handleShare = () => {
    // Get the current page URL
    const currentUrl = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          title: "URL copied to clipboard!",
          description: "",
          duration: 5000,
        });
      })
      .catch((error) => {
        // Handle error if copying fails
        console.error("Failed to copy URL: ", error);
      });
  };
  return (
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
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent
                value="overview"
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4">
                  About this {car.name}
                </h3>
                <p className="text-muted-foreground mb-6">{car.description}</p>

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
                    <p>Gasoline</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Info className="h-4 w-4 text-primary mr-2" />
                      Exterior Color
                    </h4>
                    <p className="text-muted-foreground">{car.exteriorColor}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Info className="h-4 w-4 text-primary mr-2" />
                      Interior Color
                    </h4>
                    <p className="text-muted-foreground">{car.interiorColor}</p>
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
                    {/* Loop through car.specs and display each feature */}
                    {car.specs &&
                      Object.entries(car.specs).map(([key, value], index) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Info className="h-4 w-4 text-primary mr-2" />
                            {value.fieldLabel}
                          </h4>
                          <p className="text-muted-foreground">
                            {value.fieldValue}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="features"
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4">Features & Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.features &&
                    car.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>
                          {feature.fieldLabel}: {feature.fieldValue}
                        </span>
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
            <p className="text-muted-foreground mb-6">Plus taxes & licensing</p>

            <div className="space-y-4 mb-6">
              {/* <BookTestDriveButton carId={car.id} className="w-full" /> */}

              <Button
                className="w-full bg-green-600 hover:bg-green-700 group"
                onClick={handleRedirect}
              >
                <CreditCard className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Finance Options
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 group mt-4"
                onClick={handleBookNowRedirect}
              >
                <BookIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleShare}
              >
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
  );
};

export default CarDetailsContent;
