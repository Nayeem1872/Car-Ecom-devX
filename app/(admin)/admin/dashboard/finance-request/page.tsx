"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import FinanceRequestTable from "./components/FinanceRequestTable";
import FinanceRequestDialog from "./components/FinanceRequestDialog";
import axios from "axios";

interface DeleteRequestProps {
  id: string;
}
const FinanceRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [finance, setFinance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/ecom/finance/get");
        setFinance(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredRequests = finance.filter(
    (request) =>
      request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const deleteRequest = ({ id }: DeleteRequestProps) => {
    toast.success(`Request ${id} has been deleted`);
  };

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
