"use client";
import React from "react";
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
import ContactRequestModal from "./ViewContactRequestModal";
import EditContactRequestModal from "./EditContactRequestModal";
import axios from "axios";

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

interface ContactRequestsTableProps {
  filteredRequests: ContactRequest[];
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: ContactStatus[] | undefined) => React.ReactNode;
  onView: (request: ContactRequest) => void;
  onEdit: (request: ContactRequest) => void;
  onDelete: (request: ContactRequest) => void;
}

const ContactRequestsTable: React.FC<ContactRequestsTableProps> = ({
  filteredRequests,
  formatDate,
  getStatusBadge,
  onView,
  onEdit,
  onDelete,
}) => {
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedContact, setSelectedContact] =
    React.useState<ContactRequest | null>(null);

  const handleView = (request: ContactRequest) => {
    setSelectedContact(request);
    setViewDialogOpen(true);
  };
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleEdit = (request: ContactRequest) => {
    setSelectedContact(request); // Set selected contact to edit
    setEditDialogOpen(true); // Open the edit modal
  };

  const handleSaveEdit = async (updatedContact: any) => {
    try {
      // Transform the data to match the desired format
      const transformedContact = {
        type: updatedContact.type || "TEST_DRIVE",
        product: updatedContact.product || "string",
        preferredDate: updatedContact.preferredDate || "string",
        preferredTime: updatedContact.preferredTime || "string",
        firstName: updatedContact.firstName || "string",
        lastName: updatedContact.lastName || "string",
        email: updatedContact.email || "user@example.com",
        phoneNumber: updatedContact.phoneNumber || "string",
        address: {
          street: updatedContact.address?.street || "string",
          city: updatedContact.address?.city || "string",
          zipCode: updatedContact.address?.zipCode || "string",
        },
        additionalComments: updatedContact.additionalComments || "string",
        status: [
          {
            status: Array.isArray(updatedContact.status)
              ? updatedContact.status[0]?.status || "Completed"
              : updatedContact.status || "Completed",
            note: updatedContact.note || "string",
          },
        ],
      };

      const response = await axios.patch(
        `/api/ecom/contact-us/edit?id=${updatedContact._id}`,
        transformedContact
      );

      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell className="font-medium">
                  {request.firstName} {request.lastName}
                </TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.type.replace("_", " ")}</TableCell>
                <TableCell>{request.product}</TableCell>
                <TableCell>{formatDate(request.createdAt)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleView(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(request)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {/* <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                      onClick={() => onDelete(request)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-muted-foreground"
              >
                No contact requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ContactRequestModal
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        contact={selectedContact}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
      />
      <EditContactRequestModal
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        contact={selectedContact}
        onSave={handleSaveEdit} // Handle the save action
      />
    </div>
  );
};

export default ContactRequestsTable;
