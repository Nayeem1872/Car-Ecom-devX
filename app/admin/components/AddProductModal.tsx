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
import { Textarea } from "@/components/ui/textarea";

export interface NewProduct {
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  discount: {
    price: number;
    startAt: string;
    endAt: string;
  };
  category: string;
  images: string[];
  varients: {
    label: string;
    varient: string[];
  };
  features: string[];
}

interface AddProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newProduct: NewProduct;
  setNewProduct: (product: NewProduct) => void;
  handleAddProduct: () => void;
}

const AddProductModal = ({
  open,
  setOpen,
  newProduct,
  setNewProduct,
  handleAddProduct,
}: AddProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card w-[1500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to your inventory
          </DialogDescription>
        </DialogHeader>
        {/* Two-column grid layout */}
        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Product Name*</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="brand">Brand*</Label>
            <Input
              id="brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price ($)*</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="stock">Stock*</Label>
            <Input
              id="stock"
              type="number"
              value={newProduct.stock || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="discountPrice">Discount Price</Label>
            <Input
              id="discountPrice"
              type="number"
              value={newProduct.discount.price || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  discount: {
                    ...newProduct.discount,
                    price: Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="discountStartAt">Discount Start At</Label>
            <Input
              id="discountStartAt"
              type="date"
              value={newProduct.discount.startAt}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  discount: {
                    ...newProduct.discount,
                    startAt: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="discountEndAt">Discount End At</Label>
            <Input
              id="discountEndAt"
              type="date"
              value={newProduct.discount.endAt}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  discount: {
                    ...newProduct.discount,
                    endAt: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category*</Label>
            <Input
              id="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="images">Images (comma separated)</Label>
            <Input
              id="images"
              type="file"
              value={newProduct.images.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  images: e.target.value.split(",").map((img) => img.trim()),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="varientsLabel">Varients Label</Label>
            <Input
              id="varientsLabel"
              value={newProduct.varients.label}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  varients: {
                    ...newProduct.varients,
                    label: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="varients">Varients (comma separated)</Label>
            <Input
              id="varients"
              value={newProduct.varients.varient.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  varients: {
                    ...newProduct.varients,
                    varient: e.target.value.split(",").map((v) => v.trim()),
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="features">Features (comma separated)</Label>
            <Input
              id="features"
              value={newProduct.features.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  features: e.target.value.split(",").map((f) => f.trim()),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} className="red-gradient">
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
