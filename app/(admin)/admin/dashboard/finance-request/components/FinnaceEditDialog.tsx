// components/EditDialog.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useState } from "react";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  requestData: any;
  onSave: (updatedData: any) => void;
}

const EditDialog = ({
  open,
  onClose,
  requestData,
  onSave,
}: EditDialogProps) => {
  const [status, setStatus] = useState(requestData.status || "pending");
  const [firstName, setFirstName] = useState(requestData.firstName || "");
  const [lastName, setLastName] = useState(requestData.lastName || "");
  const [email, setEmail] = useState(requestData.email || "");

  const handleSave = () => {
    onSave({ ...requestData, status, firstName, lastName, email });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Finance Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* First Name Field */}
            <div className="flex flex-col">
              <Label htmlFor="firstName" className="text-right">
                First Name*
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col">
              <Label htmlFor="lastName" className="text-right">
                Last Name*
              </Label>
              <Input
                id="lastName"
                className="col-span-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <Label htmlFor="email" className="text-right">
                Email*
              </Label>
              <Input
                id="email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Status Select */}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
