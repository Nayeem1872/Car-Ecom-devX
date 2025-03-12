"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Car,
  User,
  Home,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";

// Mock car data - in a real app, this would come from an API or database
const carsData = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    category: "Luxury Sedan",
    price: 110000,
    image:
      "https://images.unsplash.com/photo-1622037022028-07f7f2d9b59e?q=80&w=2070&auto=format&fit=crop",
    features: ["Leather Interior", "Panoramic Roof", "Advanced Safety"],
  },
  {
    id: 2,
    name: "BMW X7",
    category: "Premium SUV",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
    features: ["7 Seats", "All-Wheel Drive", "Premium Sound System"],
  },
  {
    id: 3,
    name: "Audi e-tron GT",
    category: "Electric",
    price: 99000,
    image:
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2070&auto=format&fit=crop",
    features: ["Electric", "Fast Charging", "Quattro AWD"],
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports Car",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=2071&auto=format&fit=crop",
    features: ["Twin-Turbo", "Rear-Wheel Drive", "Sport Chrono Package"],
  },
];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState("test-drive");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Simulate fetching car data
    const carId = Number(params.id);
    const foundCar = carsData.find((c) => c.id === carId);

    if (foundCar) {
      setCar(foundCar);
    } else {
      // Handle car not found
      router.push("/cars");
    }

    setLoading(false);
  }, [params.id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend

    // Show success message
    toast({
      title: "Booking submitted successfully",
      description:
        bookingType === "test-drive"
          ? "We'll contact you shortly to confirm your test drive appointment."
          : "We'll contact you shortly with more information about this vehicle.",
      duration: 5000,
    });

    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                {bookingType === "test-drive"
                  ? "Your test drive request has been submitted successfully. Our team will contact you shortly to confirm the details."
                  : "Your request has been submitted successfully. Our team will contact you shortly with more information about this vehicle."}
              </p>
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Vehicle Selected:</h3>
                <p>
                  {car.name} - {car.category}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/cars")}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Browse More Cars
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                >
                  Return to Home
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${car.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Book Your <span className="text-primary">Experience</span>
            </h1>
            <p className="text-muted-foreground">
              Complete the form below to schedule a test drive or request more
              information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white/50"
                style={{
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <Label className="text-lg font-medium mb-4 block">
                      What would you like to do?
                    </Label>
                    <RadioGroup
                      defaultValue="test-drive"
                      className="flex flex-col space-y-2"
                      value={bookingType}
                      onValueChange={setBookingType}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="test-drive" id="test-drive" />
                        <Label
                          htmlFor="test-drive"
                          className="flex items-center"
                        >
                          <Car className="mr-2 h-4 w-4 text-primary" />
                          Schedule a Test Drive
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="more-info" id="more-info" />
                        <Label
                          htmlFor="more-info"
                          className="flex items-center"
                        >
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          Request More Information
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="purchase" id="purchase" />
                        <Label htmlFor="purchase" className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Start Purchase Process
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {bookingType === "test-drive" && (
                    <div className="mb-6">
                      <Label className="text-lg font-medium mb-4 block">
                        Preferred Date & Time
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Preferred Date*</Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Preferred Time*</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">
                                Morning (9AM - 12PM)
                              </SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon (12PM - 4PM)
                              </SelectItem>
                              <SelectItem value="evening">
                                Evening (4PM - 7PM)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <User className="h-5 w-5 text-primary mr-2" />
                      <Label className="text-lg font-medium">
                        Personal Information
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email*</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number*</Label>
                        <Input
                          id="phone"
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <Home className="h-5 w-5 text-primary mr-2" />
                      <Label className="text-lg font-medium">
                        Current Address
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address*</Label>
                        <Input
                          id="address"
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City*</Label>
                        <Input id="city" placeholder="Toronto" required />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Zip / Postal Code*</Label>
                        <Input id="postalCode" placeholder="A1B 2C3" required />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <textarea
                      id="comments"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      placeholder="Any specific questions or requirements..."
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox id="consent" required />
                    <Label htmlFor="consent" className="text-sm">
                      I consent to LuxuryCars contacting me regarding this
                      inquiry.*
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {bookingType === "test-drive"
                      ? "Schedule Test Drive"
                      : bookingType === "more-info"
                      ? "Request Information"
                      : "Start Purchase Process"}
                  </Button>
                </form>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div
                className="bg-white/60 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border border-white/50"
                style={{
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold">{car.name}</h3>
                    <p className="text-white/80 text-sm">{car.category}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Selected Vehicle</h3>
                    <span className="text-primary font-bold">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground">
                      {car.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {bookingType === "test-drive" && (
                    <div className="bg-primary/10 p-3 rounded-md">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span>Test drives typically last 30-45 minutes</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
