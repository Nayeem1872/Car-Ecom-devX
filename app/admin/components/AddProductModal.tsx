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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
  imageFiles: File[];
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
  brands: any[];
  categories: any[];
}

const AddProductModal = ({
  open,
  setOpen,
  newProduct,
  setNewProduct,
  handleAddProduct,
  brands,
  categories,
}: AddProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card w-[90vw] max-w-[1500px] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] p-6">
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
            <Label htmlFor="category">Category*</Label>
            <Select
              value={newProduct.category}
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, category: value })
              }
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: any) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="brand">Brand*</Label>
            <Select
              value={newProduct.brand}
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, brand: value })
              }
            >
              <SelectTrigger id="brand" className="w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand: any) => (
                  <SelectItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="active" className="flex-1">
              Feature
            </Label>
            <Switch
              id="active"
              checked={newProduct.features.length > 0}
              onCheckedChange={(checked) =>
                setNewProduct({
                  ...newProduct,
                  features: checked ? ["Feature"] : [],
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                const fileArray = Array.from(files);
                const imagePreviews = fileArray.map((file) =>
                  URL.createObjectURL(file)
                );
                // Save both the file objects and their preview URLs
                setNewProduct({
                  ...newProduct,
                  imageFiles: fileArray,
                  images: imagePreviews,
                });
              }}
            />
            {newProduct.images && newProduct.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newProduct.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
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
