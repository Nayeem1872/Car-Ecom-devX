"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  featured: boolean;
  brand: {
    _id: string;
    name: string;
    logo: string;
  };
  price: number;
  stock: number;
  category: string | { _id: string; name: string; description: string };
  images: string[];
  discount: {
    price: number;
    startAt: string;
    endAt: string;
  };
  varients: {
    label: string;
    varient: Array<{
      name: string;
      price: number;
      stock: number;
      description: string;
      images: string[];
      _id: string;
    }>;
  };
  vendor: {
    _id: string;
    vendorName: string;
    phoneNo: string[];
    serviceEmail: string;
  };
  features: Array<{
    fieldName: string;
    fieldLabel: string;
    fieldType: string;
    fieldValue: string;
    options: any[];
  }>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({
  open,
  onOpenChange,
  product,
}) => {
  if (!product) return null;

  const categoryName =
    typeof product.category === "object"
      ? product.category.name
      : product.category;

  const status =
    product.stock === 0
      ? "out-of-stock"
      : product.stock < 10
      ? "low-stock"
      : "in-stock";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Product Details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {/* Image */}
          <div>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 rounded-md object-cover"
              />
            ) : (
              <div className="w-64 h-64 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                No image available
              </div>
            )}
          </div>
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Category:</strong> {categoryName}
            </div>
            <div>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </div>
            <div>
              <strong>Stock:</strong> {product.stock}
            </div>
            <div>
              <strong>Status:</strong> {status.replace("-", " ")}
            </div>
          </div>
          {/* Discount */}
          <div>
            <strong>Discount:</strong> ${product.discount.price.toFixed(2)} from{" "}
            {new Date(product.discount.startAt).toLocaleDateString()} to{" "}
            {new Date(product.discount.endAt).toLocaleDateString()}
          </div>
          {/* Variants */}
          <div>
            <strong>Variant Label:</strong> {product.varients.label}
            <ul className="list-disc ml-6 mt-2">
              {product.varients.varient.map((v, index) => (
                <li key={index}>
                  {v.name} – ${v.price} (Stock: {v.stock}) – {v.description}
                </li>
              ))}
            </ul>
          </div>
          {/* Brand and Vendor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Brand:</strong>{" "}
              {product.brand ? product.brand.name : "N/A"}
            </div>
            <div>
              <strong>Vendor:</strong> {product.vendor.vendorName}
            </div>
            <div>
              <strong>Vendor Phone:</strong> {product.vendor.phoneNo.join(", ")}
            </div>
            <div>
              <strong>Vendor Email:</strong> {product.vendor.serviceEmail}
            </div>
          </div>
          {/* Features */}
          <div>
            <strong>Features:</strong>
            <ul className="list-disc ml-6 mt-2">
              {product.features.map((feature, index) => (
                <li key={index}>
                  {feature.fieldLabel}: {feature.fieldValue}
                </li>
              ))}
            </ul>
          </div>
          {/* Description */}
          <div>
            <strong>Description:</strong>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModal;
