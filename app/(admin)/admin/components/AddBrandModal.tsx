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

export interface NewBrand {
  name: string;
  logo: File | null;
}

interface AddBrandModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newBrand: NewBrand;
  setNewBrand: (brand: NewBrand) => void;
  handleAddBrand: () => void;
}

const AddBrandModal = ({
  open,
  setOpen,
  newBrand,
  setNewBrand,
  handleAddBrand,
}: AddBrandModalProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewBrand({ ...newBrand, logo: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new brand
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Brand Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name*
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newBrand.name}
              onChange={(e) =>
                setNewBrand({ ...newBrand, name: e.target.value })
              }
            />
          </div>
          {/* Brand Logo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Logo
            </Label>
            <div className="col-span-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                {newBrand.logo ? (
                  <img
                    src={URL.createObjectURL(newBrand.logo)}
                    alt="Logo Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No img
                  </div>
                )}
              </div>
              <Input
                id="logo"
                type="file"
                // Note: Do not use a "value" prop for file inputs
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddBrand} className="red-gradient">
            Add Brand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBrandModal;
