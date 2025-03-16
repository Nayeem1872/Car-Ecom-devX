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

// Mock car data - in a real app, this would come from an API or database
const carsData = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    category: "Luxury Sedan",
    price: 110000,
    images: [
      "https://images.unsplash.com/photo-1622037022028-07f7f2d9b59e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Leather Interior",
      "Panoramic Roof",
      "Advanced Safety",
      "Heated Seats",
      "Ambient Lighting",
    ],
    description:
      "The Mercedes-Benz S-Class is the flagship luxury sedan that sets the standard for comfort, technology, and prestige. With its elegant design, powerful performance, and innovative features, the S-Class offers an unparalleled driving experience.",
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
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Obsidian Black",
    interiorColor: "Black Nappa Leather",
    vin: "WDDUG8DB1LA456789",
    stockNumber: "MB12345",
    relatedCars: [2, 3, 6],
  },
  {
    id: 2,
    name: "BMW X7",
    category: "Premium SUV",
    price: 85000,
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543854589-fdd934cf96fe?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "7 Seats",
      "All-Wheel Drive",
      "Premium Sound System",
      "Air Suspension",
      "Panoramic Sunroof",
    ],
    description:
      "The BMW X7 is the ultimate luxury SUV, combining spacious versatility with dynamic performance. This flagship model offers three rows of seating, cutting-edge technology, and the premium craftsmanship that defines the BMW brand.",
    specs: {
      engine: "3.0L TwinPower Turbo inline-6",
      power: "335 hp",
      torque: "330 lb-ft",
      acceleration: "5.8 seconds (0-60 mph)",
      topSpeed: "152 mph",
      transmission: "8-speed automatic",
      drivetrain: "All-wheel drive",
      fuelEconomy: "19 mpg city / 24 mpg highway",
      weight: "5,370 lbs",
      dimensions: '203.3" L x 78.7" W x 71.1" H',
    },
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Alpine White",
    interiorColor: "Cognac Vernasca Leather",
    vin: "5UXCW2C01L9B12345",
    stockNumber: "BMW54321",
    relatedCars: [1, 3, 7],
  },
  {
    id: 3,
    name: "Audi e-tron GT",
    category: "Electric",
    price: 99000,
    images: [
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    ],
    features: [
      "Electric",
      "Fast Charging",
      "Quattro AWD",
      "Virtual Cockpit",
      "Matrix LED Headlights",
    ],
    description:
      "The Audi e-tron GT is a fully electric grand tourer that combines stunning design with exhilarating performance. With its dual electric motors and quattro all-wheel drive, the e-tron GT delivers instant acceleration and precise handling.",
    specs: {
      engine: "Dual Electric Motors",
      power: "522 hp (637 hp in boost mode)",
      torque: "472 lb-ft",
      acceleration: "3.9 seconds (0-60 mph)",
      topSpeed: "152 mph",
      transmission: "2-speed automatic",
      drivetrain: "All-wheel drive",
      range: "238 miles",
      batteryCapacity: "93.4 kWh",
      chargingTime:
        "22.5 hours (240V) / 10.5 hours (Level 2) / 5 hours (DC Fast)",
      weight: "5,060 lbs",
      dimensions: '196.4" L x 77.3" W x 55.6" H',
    },
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Tactical Green",
    interiorColor: "Black Leather with Red Stitching",
    vin: "WAUEAAFEXLN123456",
    stockNumber: "AUDI98765",
    relatedCars: [1, 4, 5],
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports Car",
    price: 120000,
    images: [
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2067&auto=format&fit=crop",
    ],
    features: [
      "Twin-Turbo",
      "Rear-Wheel Drive",
      "Sport Chrono Package",
      "Adaptive Sport Seats",
      "Bose Sound System",
    ],
    description:
      "The Porsche 911 is an iconic sports car that has been setting the standard for performance and design for decades. With its distinctive silhouette, rear-mounted engine, and precise handling, the 911 delivers an exhilarating driving experience.",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      power: "379 hp",
      torque: "331 lb-ft",
      acceleration: "4.0 seconds (0-60 mph)",
      topSpeed: "182 mph",
      transmission: "8-speed PDK",
      drivetrain: "Rear-wheel drive",
      fuelEconomy: "18 mpg city / 24 mpg highway",
      weight: "3,354 lbs",
      dimensions: '177.9" L x 72.9" W x 51.1" H',
    },
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Guards Red",
    interiorColor: "Black Leather",
    vin: "WP0AB2A98KS123456",
    stockNumber: "POR54321",
    relatedCars: [3, 5, 6],
  },
  {
    id: 5,
    name: "Tesla Model S",
    category: "Electric",
    price: 89000,
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Autopilot",
      "Long Range",
      "Minimalist Interior",
      "17-inch Touchscreen",
      "Over-the-air Updates",
    ],
    description:
      "The Tesla Model S is a revolutionary electric sedan that combines luxury with cutting-edge technology. With its sleek design, impressive range, and advanced Autopilot capabilities, the Model S offers a glimpse into the future of automotive transportation.",
    specs: {
      engine: "Dual Electric Motors",
      power: "670 hp",
      torque: "723 lb-ft",
      acceleration: "3.1 seconds (0-60 mph)",
      topSpeed: "155 mph",
      transmission: "Single-speed fixed gear",
      drivetrain: "All-wheel drive",
      range: "405 miles",
      batteryCapacity: "100 kWh",
      chargingTime:
        "12 hours (240V) / 8 hours (Level 2) / 30 minutes (Supercharger)",
      weight: "4,561 lbs",
      dimensions: '196.0" L x 77.3" W x 56.9" H',
    },
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    vin: "5YJSA1E47LF123456",
    stockNumber: "TES12345",
    relatedCars: [3, 4, 6],
  },
  {
    id: 6,
    name: "Lexus LS",
    category: "Luxury Sedan",
    price: 78000,
    images: [
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542230387-bfc77d70e34f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542230387-bfc77d70e34f?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Hybrid Option",
      "Mark Levinson Audio",
      "Shiatsu Massage Seats",
      "Air Suspension",
      "Kiriko Glass",
    ],
    description:
      "The Lexus LS is the flagship luxury sedan that embodies Japanese craftsmanship and attention to detail. With its serene cabin, smooth ride, and innovative technology, the LS offers a unique and refined luxury experience.",
    specs: {
      engine: "3.5L V6 Twin-Turbo",
      power: "416 hp",
      torque: "442 lb-ft",
      acceleration: "4.6 seconds (0-60 mph)",
      topSpeed: "136 mph",
      transmission: "10-speed automatic",
      drivetrain: "Rear-wheel drive",
      fuelEconomy: "18 mpg city / 29 mpg highway",
      weight: "4,707 lbs",
      dimensions: '206.1" L x 74.8" W x 57.5" H',
    },
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Manganese Luster",
    interiorColor: "White Leather",
    vin: "JTHCM1D28M0123456",
    stockNumber: "LEX67890",
    relatedCars: [1, 2, 7],
  },
  {
    id: 7,
    name: "Range Rover",
    category: "Premium SUV",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2067&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2034&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Off-Road Capability",
      "Air Suspension",
      "Meridian Sound System",
      "Terrain Response",
      "Wade Sensing",
    ],
    description:
      "The Range Rover is the definitive luxury SUV, combining unmatched off-road capability with sophisticated design and premium comfort. With its commanding presence and refined interior, the Range Rover offers versatility without compromise.",
    specs: {
      engine: "3.0L Inline-6 Turbo with MHEV",
      power: "395 hp",
      torque: "406 lb-ft",
      acceleration: "5.9 seconds (0-60 mph)",
      topSpeed: "140 mph",
      transmission: "8-speed automatic",
      drivetrain: "All-wheel drive",
      fuelEconomy: "18 mpg city / 23 mpg highway",
      weight: "5,530 lbs",
      dimensions: '197.0" L x 80.6" W x 73.6" H',
    },
    year: 2022,
    mileage: 0,
    condition: "New",
    exteriorColor: "Santorini Black",
    interiorColor: "Ebony/Ivory Leather",
    vin: "SALGS2SU0MA123456",
    stockNumber: "RR98765",
    relatedCars: [2, 6, 8],
  },
  {
    id: 8,
    name: "Bentley Continental GT",
    category: "Luxury Coupe",
    price: 202000,
    images: [
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    ],
    features: [
      "Handcrafted Interior",
      "W12 Engine",
      "Dynamic Ride System",
      "Rotating Display",
      "Naim Audio",
    ],
    description:
      "The Bentley Continental GT is the ultimate grand touring luxury coupe, combining breathtaking performance with handcrafted British luxury. With its powerful engine, exquisite materials, and timeless design, the Continental GT offers an unparalleled driving experience.",
    specs: {
      engine: "6.0L Twin-Turbo W12",
      power: "626 hp",
      torque: "664 lb-ft",
      acceleration: "3.6 seconds (0-60 mph)",
      topSpeed: "207 mph",
      transmission: "8-speed dual-clutch",
      drivetrain: "All-wheel drive",
      fuelEconomy: "12 mpg city / 20 mpg highway",
      weight: "5,018 lbs",
      dimensions: '190.9" L x 77.4" W x 55.3" H',
    },
    year: 2023,
    mileage: 0,
    condition: "New",
    exteriorColor: "Glacier White",
    interiorColor: "Beluga Leather",
    vin: "SCBCR1ZA5KC123456",
    stockNumber: "BEN12345",
    relatedCars: [1, 4, 6],
  },
];

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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    // Simulate fetching car data
    // const carId = Number(id);
    const carId = 5;
    const foundCar = carsData.find((c) => c.id === carId);

    if (foundCar) {
      setCar(foundCar);

      // Get related cars
      if (foundCar.relatedCars && foundCar.relatedCars.length > 0) {
        const related = carsData.filter((c) =>
          foundCar.relatedCars.includes(c.id)
        );
        setRelatedCars(related);
      }
    } else {
      // Handle car not found
      router.push("/cars");
    }

    setLoading(false);
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
                  key={relatedCar.id}
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
