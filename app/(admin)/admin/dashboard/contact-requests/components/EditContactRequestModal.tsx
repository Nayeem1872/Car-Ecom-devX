"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ContactRequest } from "./ContactRequestsTable";

const TYPE_ENUM = ["TEST_DRIVE", "MORE_INFO", "BOOKING"] as const;

type TypeEnum = (typeof TYPE_ENUM)[number]; // Type will be one of "TEST_DRIVE" | "MORE_INFO" | "BOOKING"

interface EditContactRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: any | null;
  onSave: (contact: any) => void;
}

const EditContactRequestModal: React.FC<EditContactRequestModalProps> = ({
  open,
  onOpenChange,
  contact,
  onSave,
}) => {
  const [editedContact, setEditedContact] = useState<any | null>(null);

  useEffect(() => {
    if (contact) {
      setEditedContact(contact);
    }
  }, [contact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    index?: number,
    parentField?: string
  ) => {
    if (editedContact) {
      if (parentField) {
        // Handle nested fields like address
        setEditedContact({
          ...editedContact,
          [parentField]: {
            ...editedContact[parentField as keyof any],
            [field]: e.target.value,
          },
        });
      } else if (typeof index === "number" && field === "status") {
        // Handle status array change
        const updatedStatus = [...editedContact.status];
        updatedStatus[index] = {
          ...updatedStatus[index],
          [field]: e.target.value,
        };

        setEditedContact({
          ...editedContact,
          status: updatedStatus,
        });
      } else {
        // Handle simple fields
        setEditedContact({
          ...editedContact,
          [field]: e.target.value,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (editedContact) {
      onSave(editedContact);
      onOpenChange(false);
    }
  };

  if (!editedContact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Contact Request</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Type Field */}
          <div>
            <label className="text-sm">Type</label>
            <Select
              value={editedContact.type}
              onValueChange={(value) =>
                handleChange(
                  { target: { value } } as React.ChangeEvent<HTMLInputElement>,
                  "type"
                )
              }
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {TYPE_ENUM.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* First Name */}
          <div>
            <label className="text-sm">First Name</label>
            <Input
              value={editedContact.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              value={editedContact.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <Input
              value={editedContact.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm">Phone Number</label>
            <Input
              value={editedContact.phoneNumber}
              onChange={(e) => handleChange(e, "phoneNumber")}
            />
          </div>

          {/* Product */}
          <div>
            <label className="text-sm">Product</label>
            <Input
              value={editedContact.product}
              onChange={(e) => handleChange(e, "product")}
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="text-sm">Preferred Date</label>
            <Input
              value={editedContact.preferredDate}
              onChange={(e) => handleChange(e, "preferredDate")}
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label className="text-sm">Preferred Time</label>
            <Input
              value={editedContact.preferredTime}
              onChange={(e) => handleChange(e, "preferredTime")}
            />
          </div>

          {/* Address Section */}
          <div>
            <label className="text-sm">Street</label>
            <Input
              value={editedContact.address.street}
              onChange={(e) => handleChange(e, "street", undefined, "address")}
            />
          </div>

          <div>
            <label className="text-sm">City</label>
            <Input
              value={editedContact.address.city}
              onChange={(e) => handleChange(e, "city", undefined, "address")}
            />
          </div>

          <div>
            <label className="text-sm">Zip Code</label>
            <Input
              value={editedContact.address.zipCode}
              onChange={(e) => handleChange(e, "zipCode", undefined, "address")}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Status</label>
            <Select
              value={editedContact?.status?.[0]?.status || ""} // Use first status or empty string
              onValueChange={(value) =>
                handleChange(
                  { target: { value } } as React.ChangeEvent<HTMLInputElement>,
                  "status",
                  0 // Directly refer to the first item in status array
                )
              }
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactRequestModal;
