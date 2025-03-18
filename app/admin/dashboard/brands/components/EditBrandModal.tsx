"use client";
import { useState } from "react";
import axios from "axios";
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
import { useToast } from "@/hooks/use-toast";

export interface Brand {
  id: number;
  name: string;
  logo: string;
  category: string;
  newLogoFile?: File;
}

export interface EditBrandModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  brand: Brand;
  setBrand: (brand: Brand) => void;
  handleEditBrand: () => void;
  categories: { id: string; name: string }[];
}

const EditBrandModal = ({
  open,
  setOpen,
  brand,
  setBrand,
  handleEditBrand,
  categories,
}: EditBrandModalProps) => {
  const { toast } = useToast();
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewLogoFile(file);
    
      setBrand({ ...brand, newLogoFile: file });
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Edit className="mr-1 h-4 w-4" />
          Edit Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>
            Update the details of the brand.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Brand Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Name*
            </Label>
            <Input
              id="edit-name"
              className="col-span-3"
              value={brand.name}
              onChange={(e) => setBrand({ ...brand, name: e.target.value })}
            />
          </div>
          {/* Brand Logo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-logo" className="text-right">
              Logo
            </Label>
            <div className="col-span-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                {newLogoFile ? (
                  <img
                    src={URL.createObjectURL(newLogoFile)}
                    alt="New Logo Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={brand.logo}
                    alt="Logo Preview"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <Input id="edit-logo" type="file" onChange={handleFileChange} />
            </div>
          </div>
          {/* Brand Category as a Select */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-category" className="text-right">
              Category*
            </Label>
            <select
              id="edit-category"
              className="col-span-3 border p-2 rounded"
              value={
                typeof brand.category === "object" && brand.category !== null
                  ? (brand.category as { _id: string })._id
                  : brand.category
              }
              onChange={(e) => setBrand({ ...brand, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditBrand} className="red-gradient">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBrandModal;
