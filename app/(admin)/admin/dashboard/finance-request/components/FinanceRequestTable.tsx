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
import { toast } from "sonner";

interface FinanceRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  product: {
    type: string;
  };
  status: string;
  submittedAt: string;
}

interface FinanceRequestTableProps {
  requests: any[];
  onViewRequest: (request: any) => void;
  onDeleteRequest: (id: any) => void;
}

const FinanceRequestTable = ({
  requests,
  onViewRequest,
  onDeleteRequest,
}: FinanceRequestTableProps) => {
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{`${request.firstName} ${request.lastName}`}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.product.type}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(request.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewRequest(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteRequest(request.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No finance requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FinanceRequestTable;
