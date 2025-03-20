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
import ProductViewModal from "./ProductViewModal";
import AddProductModal, { NewProduct } from "./AddProductModal";

export interface Product {
  id: string;
  name: string;
  category: string | { _id: string; name: string };
  description: string;
  price: number;
  stock: number;
  images: string[];
  status?: "in-stock" | "low-stock" | "out-of-stock";
}

interface ProductsTableProps {
  products: Product[];
  getStatusBadgeStyles: (
    status: "in-stock" | "low-stock" | "out-of-stock"
  ) => string;
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  isLoading?: boolean;
  refreshProducts?: () => void;
  brands: any[];
  categories: any[];
}

const ProductsTable = ({
  products,
  getStatusBadgeStyles,
  brands,
  categories,
  onDelete,
  isLoading = false,
  refreshProducts,
}: ProductsTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductForDelete, setSelectedProductForDelete] = useState<
    any | null
  >(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProductForView, setSelectedProductForView] = useState<
    any | null
  >(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any | null>(null);

  const handleDeleteClick = (product: Product) => {
    setSelectedProductForDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProductForDelete) {
      try {
        const response = await axios.delete(
          `/api/ecom/product/delete?id=${selectedProductForDelete._id}`
        );
        if (response.status === 200) {
          if (onDelete) onDelete(selectedProductForDelete);
          if (refreshProducts) {
            refreshProducts();
          }
          setDeleteModalOpen(false);
          setSelectedProductForDelete(null);
        } else {
          console.error(
            "Deletion did not return a 200 status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  const handleViewClick = (product: any) => {
    setSelectedProductForView(product);
    setViewModalOpen(true);
  };

  const handleEditClick = (product: any) => {
    console.log("Editing product:", product);

    const newProductData: any = {
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      discount: {
        price: product.discount.price,
        startAt: product.discount.startAt,
        endAt: product.discount.endAt,
      },
      category:
        typeof product.category === "object"
          ? product.category
          : product.category,
      imageFiles: [],
      images: product.images,
      varients: {
        label: "",
        varient: [],
      },
      featured: product.featured,
      additionalItems: [],
      dynamicField: "",
    };
    setProductToEdit(newProductData);
    setEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-24">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border glass-effect overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => {
                // Compute fallback status if product.status is undefined.
                const status =
                  product.status !== undefined
                    ? product.status
                    : product.stock === 0
                    ? "out-of-stock"
                    : product.stock < 10
                    ? "low-stock"
                    : "in-stock";

                // If category is an object, extract its name; otherwise, use it directly.
                const categoryName =
                  typeof product.category === "object"
                    ? product.category.name
                    : product.category;

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-500">
                          No img
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{categoryName}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeStyles(
                          status
                        )}`}
                      >
                        {status.replace("-", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewClick(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        {selectedProductForDelete && (
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the product "
                {selectedProductForDelete.name}"?
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
        )}
      </Dialog>
      <ProductViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        product={selectedProductForView}
      />
      {productToEdit && (
        <AddProductModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          newProduct={productToEdit}
          brands={brands}
          categories={categories}
          setNewProduct={setProductToEdit}
          handleAddProduct={() => {
            console.log("Updated product:", productToEdit);
            setEditModalOpen(false);
            if (refreshProducts) refreshProducts();
          }}
        />
      )}
    </>
  );
};

export default ProductsTable;
