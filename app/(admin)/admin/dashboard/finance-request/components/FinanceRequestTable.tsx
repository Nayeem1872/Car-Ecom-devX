import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import FinanceRequestDialog from "./FinanceRequestDialog";
interface FinanceRequestTableProps {
  requests: any[];
  refetchData: () => void;
  onDeleteRequest: (id: any) => void;
}

const FinanceRequestTable = ({
  requests,
  refetchData,
  onDeleteRequest,
}: FinanceRequestTableProps) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const viewRequestDetails = (request: any) => {
    console.log("Viewing request:", request);

    setSelectedRequest(request);
    setDetailsOpen(true);
  };
  const getStatusTag = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Rejected
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
            Pending
          </span>
        );
      default:
        return (
          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
            New
          </span>
        );
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Gross Income</TableHead>
            <TableHead>Trade-in Vehicle</TableHead>

            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{`${request.firstName} ${request.lastName}`}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>
                  {request.product?.productId?.name || "N/A"}
                </TableCell>{" "}
                <TableCell>
                  {request.employment?.grossIncome || "N/A"}
                </TableCell>{" "}
                <TableCell>
                  {request.product?.tradeInVehicle
                    ? `${request.product.tradeInVehicle.year} ${request.product.tradeInVehicle.make} ${request.product.tradeInVehicle.model}`
                    : "No trade-in"}
                </TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {getStatusTag(request.status)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => viewRequestDetails(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No finance requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <FinanceRequestDialog
        open={detailsOpen}
        refetchData={refetchData}
        onOpenChange={setDetailsOpen}
        selectedRequest={selectedRequest}
      />
    </div>
  );
};

export default FinanceRequestTable;
