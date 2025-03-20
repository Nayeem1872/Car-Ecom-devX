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
import AddProductModal from "./AddProductModal";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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

  // New loader states
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleDeleteClick = (product: Product) => {
    setSelectedProductForDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProductForDelete) {
      try {
        setDeleting(true);
        const response = await axios.delete(
          `/api/ecom/product/delete?id=${selectedProductForDelete._id}`
        );
        if (response.status === 200) {
          toast({
            title: "Success",
            description: "Product deleted successfully",
            variant: "default",
            duration: 5000,
          });
          if (onDelete) onDelete(selectedProductForDelete);
          if (refreshProducts) refreshProducts();
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
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleViewClick = (product: any) => {
    setSelectedProductForView(product);
    setViewModalOpen(true);
  };

  const handleEditClick = (product: any) => {
    const newProductData: any = {
      _id: product._id,
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
      features: product.features,
      images: product.images,
      featured: product.featured,
      varients: product.varients,
    };
    setProductToEdit(newProductData);
    setEditModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    try {
      setUpdating(true);
      let imageUrls: string[] = [];
      if (productToEdit.imageFiles && productToEdit.imageFiles.length > 0) {
        const formData = new FormData();
        productToEdit.imageFiles.forEach((file: File) => {
          formData.append("assets", file);
        });
        const uploadResponse = await axios.post("/api/ecom/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrls = uploadResponse.data.data.map(
          (item: any) => item.serverPath
        );
      } else {
        imageUrls = productToEdit.images;
      }

      const featuresArray = productToEdit.customFields
        ? Object.entries(productToEdit.customFields).map(
            ([fieldName, fieldObj]: [string, any]) => ({
              fieldName,
              fieldLabel: fieldObj.fieldLabel,
              fieldType: fieldObj.fieldType,
              fieldValue: fieldObj.value,
            })
          )
        : [];

      const payload = {
        name: productToEdit.name,
        description: productToEdit.description,
        featured: productToEdit.featured,
        brand: productToEdit.brand._id,
        price: productToEdit.price,
        stock: productToEdit.stock,
        discount: {
          price: productToEdit.discount.price,
          startAt: productToEdit.discount.startAt,
          endAt: productToEdit.discount.endAt,
        },
        category:
          typeof productToEdit.category === "object"
            ? productToEdit.category._id
            : productToEdit.category,
        images: imageUrls,
        features: featuresArray,
        varients: productToEdit.varients,
      };

      await axios.patch(
        `/api/ecom/product/edit?id=${productToEdit._id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setProductToEdit({
        name: "",
        description: "",
        brand: "",
        price: 0,
        stock: 0,
        discount: { price: 0, startAt: "", endAt: "" },
        category: "",
        imageFiles: [],
        images: [],
        varients: { label: "", varient: [] },
        features: [],
        additionalItems: [],
        dynamicField: "",
      });
      setEditModalOpen(false);
      if (refreshProducts) {
        refreshProducts();
      }
      toast({
        title: "Success",
        description: "Product updated successfully",
        variant: "default",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
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
                const status =
                  product.status !== undefined
                    ? product.status
                    : product.stock === 0
                    ? "out-of-stock"
                    : product.stock < 10
                    ? "low-stock"
                    : "in-stock";

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
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* View Product Modal */}
      <ProductViewModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        product={selectedProductForView}
      />

      {/* Edit Product Modal */}
      {productToEdit && (
        <AddProductModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          newProduct={productToEdit}
          brands={brands}
          categories={categories}
          isSubmitting={updating}
          setNewProduct={setProductToEdit}
          handleAddProduct={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default ProductsTable;
