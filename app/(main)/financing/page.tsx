"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DollarSign,
  Home,
  User,
  Briefcase,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import useFetchData from "@/hooks/useFetchData";
import axios from "axios";

interface Vendor {
  _id: string;
  vendorName: string;
  vendorDetails: string;
  logo: string;
  vendorAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    _id: string;
  }[];
  vendorType: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  phoneNo: string[];
  serviceEmail: string;
}
export default function FinancePage() {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const nextFormStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const prevFormStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form submitted",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
  };

  return (
    <>
      <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below to get in touch with our team. We'll
                help you find your dream car and assist with financing options.
              </p>
            </motion.div>

            {/* Form Progress */}
            <div className="mb-8">
              <div className="flex justify-between">
                {[
                  "Personal Information",
                  "Current Address",
                  "Employment",
                  "Desired Vehicle",
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        formStep >= index
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index === 0 && <User className="h-5 w-5" />}
                      {index === 1 && <Home className="h-5 w-5" />}
                      {index === 2 && <Briefcase className="h-5 w-5" />}
                      {index === 3 && <Car className="h-5 w-5" />}
                    </div>
                    <span
                      className={`text-xs md:text-sm ${
                        formStep >= index
                          ? "text-primary font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(formStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 md:p-8"
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {formStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <User className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">
                        Personal Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="(555) 123-4567"
                          type="tel"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sin">S.I.N</Label>
                        <Input id="sin" placeholder="123-456-789" />
                      </div>
                      <div>
                        <Label>Gender*</Label>
                        <RadioGroup
                          defaultValue="male"
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus">Marital Status*</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="treatyCard">
                          Do you have a treaty card?*
                        </Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="birthday">Birthday*</Label>
                        <Input id="birthday" type="date" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="hearAboutUs">
                          How did you hear about us?
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="search">
                              Search Engine
                            </SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="friend">
                              Friend/Family
                            </SelectItem>
                            <SelectItem value="ad">Advertisement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={nextFormStep}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Current Address */}
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <Home className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">Current Address</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="country">Country/Region*</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                      <div>
                        <Label htmlFor="housingStatus">
                          Do you Rent? Own? Reserve?*
                        </Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rent">Rent</SelectItem>
                            <SelectItem value="own">Own</SelectItem>
                            <SelectItem value="reserve">Reserve</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="livingDuration">
                          How long have you been living here?*
                        </Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less1">
                              Less than 1 year
                            </SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5plus">
                              More than 5 years
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="monthlyPayment">
                          If you Rent or have a Mortgage payment. How much per
                          month?*
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            id="monthlyPayment"
                            placeholder="1500"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevFormStep}
                      >
                        Previous Step
                      </Button>
                      <Button
                        type="button"
                        onClick={nextFormStep}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Employment Information */}
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <Briefcase className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">
                        Employment Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="employer">Current Employer*</Label>
                        <Input
                          id="employer"
                          placeholder="Company Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position*</Label>
                        <Input id="position" placeholder="Job Title" required />
                      </div>
                      <div>
                        <Label htmlFor="income">Gross income per month*</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            id="income"
                            placeholder="5000"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="timeEmployed">Time Employed*</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less1">
                              Less than 1 year
                            </SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5plus">
                              More than 5 years
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="additionalIncome">
                          Any additional sources of income? If yes, from what
                          and how much per month?
                        </Label>
                        <Textarea
                          id="additionalIncome"
                          placeholder="Describe any additional income sources..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevFormStep}
                      >
                        Previous Step
                      </Button>
                      <Button
                        type="button"
                        onClick={nextFormStep}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Next Step
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Desired Vehicle */}
                {formStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <Car className="h-6 w-6 text-primary mr-2" />
                      <h2 className="text-2xl font-bold">Desired Vehicle</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <div>
                        <Label htmlFor="vehicleType">
                          What kind of vehicle are you looking for?*
                        </Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="sports">Sports Car</SelectItem>
                            <SelectItem value="luxury">
                              Luxury Vehicle
                            </SelectItem>
                            <SelectItem value="electric">
                              Electric Vehicle
                            </SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="specificRequirements">
                          Any specific vehicle or musts for you?
                        </Label>
                        <Textarea
                          id="specificRequirements"
                          placeholder="Describe your requirements..."
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tradeIn">
                          Do you have a trade in vehicle? If yes, what is the
                          year/make/model and the trim*
                        </Label>
                        <Input
                          id="tradeIn"
                          placeholder="2018 Honda Accord EX-L"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicleOwed">
                          How much do you owe on the vehicle?
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            id="vehicleOwed"
                            placeholder="10000"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="consent" required />
                        <Label htmlFor="consent" className="text-sm">
                          I consent to LuxuryCars collecting and processing my
                          personal information for the purpose of this inquiry.*
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevFormStep}
                      >
                        Previous Step
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90"
                      >
                        Submit Application
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Animated Car and Finance Icons */}
            <div className="mt-12 relative">
              <motion.div
                className="absolute -top-20 -left-20 opacity-10 hidden md:block"
                animate={{
                  x: [0, 20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Car className="h-40 w-40 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-20 -right-20 opacity-10 hidden md:block"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <DollarSign className="h-40 w-40 text-primary" />
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">Monday-Friday: 9am-6pm</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">info@luxurycars.com</p>
                <p className="text-muted-foreground">sales@luxurycars.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground">123 Luxury Lane</p>
                <p className="text-muted-foreground">Beverly Hills, CA 90210</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
