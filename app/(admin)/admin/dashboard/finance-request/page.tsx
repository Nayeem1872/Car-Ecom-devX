"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, Search, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FinanceRequestTable from "./components/FinanceRequestTable";
import FinanceRequestDialog from "./components/FinanceRequestDialog";

// Sample data for finance requests
const financeRequests = [
  {
    id: "FR-001",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
    sin: "123-456-789",
    gender: "male",
    maritalStatus: "married",
    treatyCard: true,
    birthday: "1985-06-15",
    email: "john.doe@example.com",
    heardAboutUs: "friend-referral",
    address: {
      country: "Canada",
      streetAddress: "123 Maple St",
      city: "Toronto",
      postalCode: "M5V 2L7",
      housingStatus: "own",
      durationAtResidence: "3-5-years",
      rentOrMortgage: 1500,
    },
    employment: {
      employer: "Tech Industries",
      position: "Senior Developer",
      grossIncome: 85000,
      timeEmployed: "3-5-years",
      additionalIncome: [
        {
          source: "Freelancing",
          amount: 12000,
        },
      ],
    },
    product: {
      productId: "CAR-SUV-001",
      type: "auto",
      specificRequirements: "Family-friendly SUV",
      tradeInVehicle: {
        year: 2018,
        make: "Toyota",
        model: "RAV4",
        trim: "XLE",
        amountOwed: 8000,
      },
    },
    status: "approved",
    submittedAt: "2023-10-15T14:30:00Z",
  },
  {
    id: "FR-002",
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "987-654-3210",
    sin: "987-654-321",
    gender: "female",
    maritalStatus: "single",
    treatyCard: false,
    birthday: "1990-03-22",
    email: "jane.smith@example.com",
    heardAboutUs: "social-media",
    address: {
      country: "Canada",
      streetAddress: "456 Oak Ave",
      city: "Vancouver",
      postalCode: "V6B 5T1",
      housingStatus: "rent",
      durationAtResidence: "1-2-years",
      rentOrMortgage: 2200,
    },
    employment: {
      employer: "Marketing Agency",
      position: "Marketing Manager",
      grossIncome: 75000,
      timeEmployed: "1-2-years",
      additionalIncome: [],
    },
    product: {
      productId: "CAR-SEDAN-002",
      type: "auto",
      specificRequirements: "Compact sedan with good fuel economy",
      tradeInVehicle: null,
    },
    status: "pending",
    submittedAt: "2023-11-05T09:15:00Z",
  },
  {
    id: "FR-003",
    firstName: "Michael",
    lastName: "Johnson",
    phoneNumber: "555-123-4567",
    sin: "555-123-456",
    gender: "male",
    maritalStatus: "divorced",
    treatyCard: false,
    birthday: "1978-12-03",
    email: "michael.j@example.com",
    heardAboutUs: "advertisement",
    address: {
      country: "Canada",
      streetAddress: "789 Pine Blvd",
      city: "Calgary",
      postalCode: "T2P 1J9",
      housingStatus: "own",
      durationAtResidence: "more-than-5-years",
      rentOrMortgage: 1800,
    },
    employment: {
      employer: "Construction Co.",
      position: "Project Manager",
      grossIncome: 92000,
      timeEmployed: "more-than-5-years",
      additionalIncome: [
        {
          source: "Rental Property",
          amount: 24000,
        },
        {
          source: "Investments",
          amount: 8000,
        },
      ],
    },
    product: {
      productId: "TRUCK-001",
      type: "auto",
      specificRequirements: "Heavy duty truck for work",
      tradeInVehicle: {
        year: 2015,
        make: "Ford",
        model: "F-150",
        trim: "XLT",
        amountOwed: 5000,
      },
    },
    status: "rejected",
    submittedAt: "2023-09-28T16:45:00Z",
  },
];

const FinanceRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  interface Address {
    country: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    housingStatus: string;
    durationAtResidence: string;
    rentOrMortgage: number;
  }

  interface Employment {
    employer: string;
    position: string;
    grossIncome: number;
    timeEmployed: string;
    additionalIncome: { source: string; amount: number }[];
  }

  interface Product {
    productId: string;
    type: string;
    specificRequirements: string;
    tradeInVehicle: {
      year: number;
      make: string;
      model: string;
      trim: string;
      amountOwed: number;
    } | null;
  }

  interface FinanceRequest {
    id: string;
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
    address: Address;
    employment: Employment;
    product: Product;
    status: string;
    submittedAt: string;
  }

  const [selectedRequest, setSelectedRequest] = useState<FinanceRequest | null>(
    null
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredRequests = financeRequests.filter(
    (request) =>
      request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewRequestDetails = (request: FinanceRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  interface DeleteRequestProps {
    id: string;
  }

  const deleteRequest = ({ id }: DeleteRequestProps) => {
    toast.success(`Request ${id} has been deleted`);
    // In a real application, you would delete from the backend here
  };

  interface StatusBadgeProps {
    status: string;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Finance Requests
          </h1>
          <p className="text-muted-foreground">
            View and manage finance requests submitted by customers.
          </p>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Finance Request Management</CardTitle>
                  <CardDescription>
                    Review and process customer finance applications
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      className="pl-8 w-[180px] sm:w-[220px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    Add New
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FinanceRequestTable
                requests={filteredRequests}
                onViewRequest={viewRequestDetails}
                onDeleteRequest={deleteRequest}
              />
            </CardContent>
          </Card>
        </div>
        <FinanceRequestDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          selectedRequest={selectedRequest}
        />
      </motion.div>
    </>
  );
};

export default FinanceRequest;
