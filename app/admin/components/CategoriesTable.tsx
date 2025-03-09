"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export interface Category {
  id: string;
  name: string;
  description: string;
  parentCategory: string | null;
  productsCount: number;
}

interface CategoriesTableProps {
  categories: Category[];
  onView: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoriesTable = ({
  categories,
  onView,
  onEdit,
  onDelete,
}: CategoriesTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] =
    useState<Category | null>(null);

  const handleDeleteClick = (category: Category) => {
    setSelectedCategoryForDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategoryForDelete) {
      try {
        await axios.delete(
          `/api/ecom/category/delete?id=${selectedCategoryForDelete.id}`
        );
        onDelete(selectedCategoryForDelete);
        setDeleteModalOpen(false);
        setSelectedCategoryForDelete(null);
      } catch (error) {
        console.error("Error deleting category:", error);
        // Optionally, show an error toast here
      }
    }
  };

  return (
    <>
      <div className="rounded-md border glass-effect overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.parentCategory || "—"}</TableCell>
                  <TableCell>{category.productsCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(category)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {deleteModalOpen && selectedCategoryForDelete && (
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete category "
                {selectedCategoryForDelete.name}"?
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

export default CategoriesTable;
