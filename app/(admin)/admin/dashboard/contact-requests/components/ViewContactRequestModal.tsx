"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactRequest } from "./ContactRequestsTable";

interface ContactRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: ContactRequest | null;
  formatDate: (date: string) => string;
  getStatusBadge: (status: ContactRequest["status"]) => React.ReactNode;
}

export default function ContactRequestModal({
  open,
  onOpenChange,
  contact,
  formatDate,
  getStatusBadge,
}: ContactRequestModalProps) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Contact Request Details</DialogTitle>
          <DialogDescription>
            Full information about this contact request.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Personal Info */}
          <div>
            <h3 className="font-medium text-sm">Personal Information</h3>
            <p>
              <strong>Name:</strong> {contact.firstName} {contact.lastName}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phoneNumber}
            </p>
          </div>

          {/* Request Details */}
          <div>
            <h3 className="font-medium text-sm">Request Details</h3>
            <p>
              <strong>Type:</strong> {contact.type.replace("_", " ")}
            </p>
            <p>
              <strong>Product:</strong> {contact.product}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(contact.preferredDate)}
            </p>
            <p>
              <strong>Time:</strong> {contact.preferredTime}
            </p>
            <p>
              <strong>Status:</strong> {getStatusBadge(contact.status)}
            </p>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <h3 className="font-medium text-sm">Address</h3>
            <p>
              {contact.address.street}, {contact.address.city},{" "}
              {contact.address.zipCode}
            </p>
          </div>

          {/* Comments */}
          <div className="col-span-2">
            <h3 className="font-medium text-sm">Additional Comments</h3>
            <p className="p-2 bg-muted rounded">
              {contact.additionalComments || "None"}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
