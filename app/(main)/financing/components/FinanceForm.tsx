// components/FinanceForm.tsx
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
import { DollarSign, User, Home, Briefcase, Car } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface FinanceFormProps {
  formStep: number;
  products: any[];
  nextFormStep: () => void;
  prevFormStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

interface AdditionalIncome {
  source: string;
  amount: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  sin: string;
  gender: string;
  maritalStatus: string;
  treatyCard: boolean;
  birthday: string;
  email: string;
  heardAboutUs: string;
  address: {
    country: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    housingStatus: string;
    durationAtResidence: string;
    rentOrMortgage: number;
  };
  employment: {
    employer: string;
    position: string;
    grossIncome: number;
    timeEmployed: string;
    additionalIncome: AdditionalIncome[];
  };
  product: {
    productId: string;
    type: string;
    specificRequirements: string;
    tradeInVehicle: {
      year: number;
      make: string;
      model: string;
      trim: string;
      amountOwed: number;
    };
  };
}

export default function FinanceForm({
  formStep,
  nextFormStep,
  prevFormStep,
  products,
}: FinanceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sin: "",
    gender: "male",
    maritalStatus: "",
    treatyCard: false,
    birthday: "",
    email: "",
    heardAboutUs: "",
    address: {
      country: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      housingStatus: "",
      durationAtResidence: "",
      rentOrMortgage: 0,
    },
    employment: {
      employer: "",
      position: "",
      grossIncome: 0,
      timeEmployed: "",
      additionalIncome: [{ source: "", amount: 0 }],
    },
    product: {
      productId: "",
      type: "",
      specificRequirements: "",
      tradeInVehicle: {
        year: 0,
        make: "",
        model: "",
        trim: "",
        amountOwed: 0,
      },
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    // Handle nested properties
    if (id.includes(".")) {
      const [section, field] = id.split(".");
      setFormData((prev) => {
        const prevSection = prev[section as keyof FormData];
        if (typeof prevSection === "object" && prevSection !== null) {
          return {
            ...prev,
            [section]: {
              ...prevSection,
              [field]: value,
            },
          };
        }
        return prev; // Fallback, should not hit this case
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSelectChange = (id: string, value: string) => {
    // Handle nested properties
    if (id.includes(".")) {
      const [section, field] = id.split(".");
      setFormData((prev) => {
        const prevSection = prev[section as keyof FormData];
        if (typeof prevSection === "object" && prevSection !== null) {
          return {
            ...prev,
            [section]: {
              ...prevSection,
              [field]: value,
            },
          };
        }
        return prev; // Fallback, should not hit this case
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (id === "consent") return; // Consent checkbox not stored in formData

    if (id === "treatyCard") {
      setFormData((prev) => ({
        ...prev,
        treatyCard: checked, // This is now correctly a boolean
      }));
    }
  };

  const handleNumberChange = (id: string, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);

    // Handle nested properties
    if (id.includes(".")) {
      const [section, field] = id.split(".");

      // Special handling for tradeInVehicle.amountOwed or rentOrMortgage
      if (section === "product" && field === "tradeInVehicle.amountOwed") {
        setFormData((prev) => ({
          ...prev,
          product: {
            ...prev.product,
            tradeInVehicle: {
              ...prev.product.tradeInVehicle,
              amountOwed: numValue,
            },
          },
        }));
      } else if (section === "address" && field === "rentOrMortgage") {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            rentOrMortgage: numValue,
          },
        }));
      } else if (section === "employment" && field === "grossIncome") {
        setFormData((prev) => ({
          ...prev,
          employment: {
            ...prev.employment,
            grossIncome: numValue,
          },
        }));
      }
    }
  };

  const handleTradeInVehicleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Convert the value to a number if the field is 'year'
    const newValue = id === "year" ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        tradeInVehicle: {
          ...prev.product.tradeInVehicle,
          [id]: newValue, // Set the value, now ensuring 'year' is a number
        },
      },
    }));
  };

  const handleAdditionalIncomeChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    // Simple parsing of additional income (this could be enhanced)
    const additionalIncome: AdditionalIncome[] = [];

    if (value.trim()) {
      // Add as a single source
      additionalIncome.push({
        source: value,
        amount: 10101010, // Default to 0 since parsing exact amounts from text is complex
      });
    }

    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        additionalIncome,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        treatyCard:
          typeof formData.treatyCard === "string"
            ? JSON.parse(formData.treatyCard)
            : formData.treatyCard,
        address: {
          ...formData.address,
          streetAddress:
            formData.address.streetAddress || formData.address.streetAddress,
        },
        product: {
          ...formData.product,
          productId: formData.product.productId || "unknown",
        },
      };

      const response = await axios.post(
        "/api/ecom/finance/craete",
        submissionData
      );

      toast({
        title: "Application submitted successfully",
        description: "We'll review your application and get back to you soon.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              <h2 className="text-2xl font-bold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="(555) 123-4567"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="sin">S.I.N</Label>
                <Input
                  id="sin"
                  placeholder="123-456-789"
                  value={formData.sin}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Gender*</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={handleRadioChange}
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
                <Select
                  required
                  value={formData.maritalStatus}
                  onValueChange={(value) =>
                    handleSelectChange("maritalStatus", value)
                  }
                >
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
                <Label htmlFor="treatyCard">Do you have a treaty card?*</Label>
                <Select
                  required
                  onValueChange={(value) =>
                    handleSelectChange("treatyCard", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="birthday">Birthday*</Label>
                <Input
                  id="birthday"
                  type="date"
                  required
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="heardAboutUs">How did you hear about us?</Label>
                <Select
                  value={formData.heardAboutUs}
                  onValueChange={(value) =>
                    handleSelectChange("heardAboutUs", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="friend">Friend/Family</SelectItem>
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
                <Label htmlFor="address.country">Country/Region*</Label>
                <Select
                  required
                  value={formData.address.country}
                  onValueChange={(value) =>
                    handleSelectChange("address.country", value)
                  }
                >
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
                <Label htmlFor="address.streetAddress">Address*</Label>
                <Input
                  id="address.streetAddress"
                  placeholder="123 Main St"
                  required
                  value={formData.address.streetAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="address.city">City*</Label>
                <Input
                  id="address.city"
                  placeholder="Toronto"
                  required
                  value={formData.address.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="address.postalCode">Zip / Postal Code*</Label>
                <Input
                  id="address.postalCode"
                  placeholder="A1B 2C3"
                  required
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="address.housingStatus">
                  Do you Rent? Own? Reserve?*
                </Label>
                <Select
                  required
                  value={formData.address.housingStatus}
                  onValueChange={(value) =>
                    handleSelectChange("address.housingStatus", value)
                  }
                >
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
                <Label htmlFor="address.durationAtResidence">
                  How long have you been living here?*
                </Label>
                <Select
                  required
                  value={formData.address.durationAtResidence}
                  onValueChange={(value) =>
                    handleSelectChange("address.durationAtResidence", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5plus">More than 5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address.rentOrMortgage">
                  If you Rent or have a Mortgage payment. How much per month?*
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="address.rentOrMortgage"
                    placeholder="1500"
                    className="pl-10"
                    value={formData.address.rentOrMortgage || ""}
                    onChange={(e) =>
                      handleNumberChange(
                        "address.rentOrMortgage",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevFormStep}>
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
              <h2 className="text-2xl font-bold">Employment Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="employment.employer">Current Employer*</Label>
                <Input
                  id="employment.employer"
                  placeholder="Company Name"
                  required
                  value={formData.employment.employer}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="employment.position">Position*</Label>
                <Input
                  id="employment.position"
                  placeholder="Job Title"
                  required
                  value={formData.employment.position}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="employment.grossIncome">
                  Gross income per month*
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="employment.grossIncome"
                    placeholder="5000"
                    className="pl-10"
                    required
                    value={formData.employment.grossIncome || ""}
                    onChange={(e) =>
                      handleNumberChange(
                        "employment.grossIncome",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="employment.timeEmployed">Time Employed*</Label>
                <Select
                  required
                  value={formData.employment.timeEmployed}
                  onValueChange={(value) =>
                    handleSelectChange("employment.timeEmployed", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5plus">More than 5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="additionalIncome">
                  Any additional sources of income? If yes, from what and how
                  much per month?
                </Label>
                <Textarea
                  id="additionalIncome"
                  placeholder="Describe any additional income sources..."
                  className="min-h-[100px]"
                  onChange={handleAdditionalIncomeChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevFormStep}>
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
                <Label htmlFor="product.type">
                  What kind of vehicle are you looking for?*
                </Label>
                <Select
                  required
                  value={formData.product.productId}
                  onValueChange={(value) =>
                    handleSelectChange("product.productId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product.specificRequirements">
                  Any specific vehicle or musts for you?
                </Label>
                <Textarea
                  id="product.specificRequirements"
                  placeholder="Describe your requirements..."
                  className="min-h-[100px]"
                  value={formData.product.specificRequirements}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="tradeIn">
                  Do you have a trade in vehicle? If yes, what is the
                  year/make/model and the trim*
                </Label>
                {/* <Input
                  id="tradeIn"
                  placeholder="2018 Honda Accord EX-L"
                  onChange={handleTradeInVehicleChange}
                /> */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div>
                    <Label htmlFor="product.tradeInVehicle.year">Year*</Label>
                    <Input
                      id="year"
                      value={formData.product.tradeInVehicle.year}
                      onChange={handleTradeInVehicleChange}
                      placeholder="2018"
                      type="number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product.tradeInVehicle.make">Make*</Label>
                    <Input
                      id="make"
                      value={formData.product.tradeInVehicle.make}
                      onChange={handleTradeInVehicleChange}
                      placeholder="Honda"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product.tradeInVehicle.model">Model*</Label>
                    <Input
                      id="model"
                      value={formData.product.tradeInVehicle.model}
                      onChange={handleTradeInVehicleChange}
                      placeholder="Accord"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product.tradeInVehicle.trim">Trim*</Label>
                    <Input
                      id="trim"
                      value={formData.product.tradeInVehicle.trim}
                      onChange={handleTradeInVehicleChange}
                      placeholder="EX-L"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="product.tradeInVehicle.amountOwed">
                  How much do you owe on the vehicle?
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="product.tradeInVehicle.amountOwed"
                    placeholder="10000"
                    className="pl-10"
                    value={formData.product.tradeInVehicle.amountOwed || ""}
                    onChange={(e) =>
                      handleNumberChange(
                        "product.tradeInVehicle.amountOwed",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="consent" required />
                <Label htmlFor="consent" className="text-sm">
                  I consent to LuxuryCars collecting and processing my personal
                  information for the purpose of this inquiry.*
                </Label>
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevFormStep}>
                Previous Step
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
