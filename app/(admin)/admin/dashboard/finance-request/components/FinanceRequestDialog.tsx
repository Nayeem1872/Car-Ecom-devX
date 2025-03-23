import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
interface FinanceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: any | null;
}

const FinanceRequestDialog = ({
  open,
  onOpenChange,
  selectedRequest,
}: FinanceRequestDialogProps) => {
  console.log("selectedRequest", selectedRequest);
  const [status, setStatus] = useState(selectedRequest.status || "pending");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {selectedRequest && (
          <>
            <DialogHeader>
              <DialogTitle>Finance Request: {selectedRequest.id}</DialogTitle>
              <DialogDescription>
                Submitted on{" "}
                {new Date(selectedRequest.submittedAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-6 py-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p>{`${selectedRequest.firstName} ${selectedRequest.lastName}`}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <p>{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </p>
                    <p>{selectedRequest.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      SIN
                    </p>
                    <p>{selectedRequest.sin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Birthday
                    </p>
                    <p>{selectedRequest.birthday}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Gender
                    </p>
                    <p>{selectedRequest.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Marital Status
                    </p>
                    <p>{selectedRequest.maritalStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Treaty Card
                    </p>
                    <p>{selectedRequest.treatyCard ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      How did they hear about us
                    </p>
                    <p>{selectedRequest.heardAboutUs}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Country
                    </p>
                    <p>{selectedRequest.address.country}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Street Address
                    </p>
                    <p>{selectedRequest.address.streetAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      City
                    </p>
                    <p>{selectedRequest.address.city}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Postal Code
                    </p>
                    <p>{selectedRequest.address.postalCode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Housing Status
                    </p>
                    <p>{selectedRequest.address.housingStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Duration at Residence
                    </p>
                    <p>{selectedRequest.address.durationAtResidence}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Rent/Mortgage
                    </p>
                    <p>${selectedRequest.address.rentOrMortgage}/month</p>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Employer
                    </p>
                    <p>{selectedRequest.employment.employer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Position
                    </p>
                    <p>{selectedRequest.employment.position}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Gross Income
                    </p>
                    <p>
                      ${selectedRequest.employment.grossIncome.toLocaleString()}
                      /year
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Time Employed
                    </p>
                    <p>{selectedRequest.employment.timeEmployed}</p>
                  </div>
                </div>

                {selectedRequest.employment.additionalIncome.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Additional Income
                    </p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedRequest.employment.additionalIncome.map(
                          (income: any, index: any) => (
                            <TableRow key={index}>
                              <TableCell>{income.source}</TableCell>
                              <TableCell>
                                ${income.amount.toLocaleString()}/year
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full p-2 border rounded-md">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FinanceRequestDialog;
