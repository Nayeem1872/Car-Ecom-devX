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
                      onClick={() => onDeleteRequest(request._id)}
                    >
                      <Trash2 className="h-4 w-4" />
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
    </div>
  );
};

export default FinanceRequestTable;
