"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface NewCategory {
  name: string;
  description: string;
  parentCategory: string;
}

interface AddCategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newCategory: NewCategory;
  setNewCategory: (category: NewCategory) => void;
  handleAddCategory: () => void;
}

const AddCategoryModal = ({
  open,
  setOpen,
  newCategory,
  setNewCategory,
  handleAddCategory,
}: AddCategoryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product category
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name*
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parentCategory" className="text-right">
              Parent Category
            </Label>
            <Input
              id="parentCategory"
              className="col-span-3"
              value={newCategory.parentCategory}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  parentCategory: e.target.value,
                })
              }
              placeholder="Leave empty for top-level category"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory} className="red-gradient">
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
