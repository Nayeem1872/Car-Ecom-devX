"use client";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

export interface Brand {
  id: number;
  name: string;
  logo: string;
  category: any;
}

interface BrandsTableProps {
  brands: Brand[];
  onView: (brand: Brand) => void;
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
  refreshBrands: () => void;
}

const BrandsTable = ({
  brands,
  onView,
  onEdit,
  onDelete,
  refreshBrands,
}: BrandsTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBrandForDelete, setSelectedBrandForDelete] = useState<
    any | null
  >(null);

  const handleDeleteClick = (brand: Brand) => {
    setSelectedBrandForDelete(brand);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedBrandForDelete) {
      try {
        await axios.delete(
          `/api/ecom/brand/delete?id=${selectedBrandForDelete._id}`
        );
        onDelete(selectedBrandForDelete);
        refreshBrands();
        setDeleteModalOpen(false);
        setSelectedBrandForDelete(null);
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };
  return (
    <>
      <div className="rounded-md border glass-effect overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-md overflow-hidden">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    {typeof brand.category === "object"
                      ? brand.category.name
                      : brand.category}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(brand)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(brand)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(brand)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No brands found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {deleteModalOpen && selectedBrandForDelete && (
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Delete Brand</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the brand "
                {selectedBrandForDelete.name}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BrandsTable;
