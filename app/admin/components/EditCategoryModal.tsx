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
import { Edit } from "lucide-react";

interface CategoryFormData {
  name: string;
  description: string;
  parentCategory: string | null;
}

interface EditCategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: CategoryFormData;
  setCategory: (category: CategoryFormData) => void;
  handleEditCategory: () => void;
}

const EditCategoryModal = ({
  open,
  setOpen,
  category,
  setCategory,
  handleEditCategory,
}: EditCategoryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Edit className="mr-1 h-4 w-4" />
          Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the details of your category
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
              value={category.name}
              onChange={(e) =>
                setCategory({
                  ...category,
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
              value={category.description}
              onChange={(e) =>
                setCategory({
                  ...category,
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
              value={category.parentCategory ?? ""} // if null, show as empty string
              onChange={(e) =>
                setCategory({
                  ...category,
                  // if the input is cleared, store null; otherwise, store the input value
                  parentCategory: e.target.value === "" ? null : e.target.value,
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
          <Button onClick={handleEditCategory} className="red-gradient">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
