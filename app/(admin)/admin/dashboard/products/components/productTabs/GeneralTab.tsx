"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface GeneralTabProps {
  newProduct: any; // ideally typed as NewProduct
  setNewProduct: (product: any) => void;
  brands: any[];
  categories: any[];
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  newProduct,
  setNewProduct,
  brands,
  categories,
}) => {
  console.log("newProduct", newProduct);

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      {/* Product Name */}
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

      {/* Category */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category*</Label>
        <Select
          value={
            typeof newProduct.category === "object"
              ? newProduct.category._id
              : newProduct.category
          }
          onValueChange={(value) =>
            setNewProduct({ ...newProduct, category: value })
          }
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="brand">Brand*</Label>
        <Select
          value={
            typeof newProduct.brand === "object"
              ? newProduct.brand._id
              : newProduct.brand
          }
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

      {/* Price */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price ($)*</Label>
        <Input
          id="price"
          type="number"
          value={newProduct.price || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
        />
      </div>

      {/* Stock */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="stock">Stock*</Label>
        <Input
          id="stock"
          type="number"
          value={newProduct.stock || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: Number(e.target.value) })
          }
        />
      </div>

      {/* Discount Price */}
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

      {/* Discount Start */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="discountStartAt">Discount Start At</Label>
        <Input
          id="discountStartAt"
          type="date"
          value={
            newProduct.discount.startAt
              ? newProduct.discount.startAt.split("T")[0]
              : ""
          }
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              discount: { ...newProduct.discount, startAt: e.target.value },
            })
          }
        />
      </div>

      {/* Discount End */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="discountEndAt">Discount End At</Label>
        <Input
          id="discountEndAt"
          type="date"
          value={
            newProduct.discount.endAt
              ? newProduct.discount.endAt.split("T")[0]
              : ""
          }
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              discount: { ...newProduct.discount, endAt: e.target.value },
            })
          }
        />
      </div>

      {/* Feature Switch */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="active" className="flex-1">
          Feature
        </Label>
        <Switch
          id="active"
          checked={newProduct.featured}
          onCheckedChange={(checked) =>
            setNewProduct({ ...newProduct, featured: checked })
          }
        />
      </div>

      {/* Images */}
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
            setNewProduct({
              ...newProduct,
              imageFiles: fileArray,
              images: imagePreviews,
            });
          }}
        />
        {newProduct.images && newProduct.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {newProduct.images.map((img: any, index: number) => (
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

      {/* Description */}
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
  );
};

export default GeneralTab;
