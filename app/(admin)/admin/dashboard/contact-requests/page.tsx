"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import ContactRequestsTable from "./components/ContactRequestsTable";
import { fetchContact } from "@/hooks/ApiHooks";

interface ContactAddress {
  street: string;
  city: string;
  zipCode: string;
}

interface ContactStatus {
  status: string;
  note: string;
}

export interface ContactRequest {
  _id: string;
  type: string;
  preferredDate: string;
  preferredTime: string;
  product: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: ContactAddress;
  additionalComments: string;
  status: ContactStatus[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const ContactRequests = () => {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const filteredRequests = contactRequests.filter((request) => {
    const fullName = `${request.firstName} ${request.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      request.email.toLowerCase().includes(query) ||
      request.product.toLowerCase().includes(query) ||
      request.type.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { products: productsData, pagination } = await fetchContact(
          currentPage,
          pageSize,
          false
        );
        setContactRequests(productsData);
        setTotalPages(pagination.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage, pageSize]);

  const handleDelete = (id: string) => {
    setContactRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
    toast({
      title: "Contact request deleted",
      description: "The contact request has been deleted successfully.",
    });
    setDeleteDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusBadge = (status: ContactStatus[] | undefined) => {
    if (!status || status.length === 0) {
      return <Badge variant="outline">New</Badge>;
    }

    const latestStatus = status[status.length - 1].status;

    switch (latestStatus.toLowerCase()) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in progress":
      case "contacted":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{latestStatus}</Badge>;
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-6"
    >
      <h1 className="text-3xl font-bold mb-2">Contact Request</h1>
      <p className="text-muted-foreground">Manage your contact here</p>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64 justify-end mt-8">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Component */}
      <ContactRequestsTable
        filteredRequests={filteredRequests}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
        onView={(request) => {
          setSelectedContact(request);
          setViewDialogOpen(true);
        }}
        onEdit={(request) => {
          // Implement edit functionality if needed.
        }}
        onDelete={(request) => {
          setSelectedContact(request);
          setDeleteDialogOpen(true);
        }}
      />
      <div className="flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactRequests;
