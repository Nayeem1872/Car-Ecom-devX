"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AddProductModal from "./components/AddProductModal";
import ProductsTable, { Product } from "./components/ProductsTable";
import { fetchBrands, fetchCategories, fetchProducts } from "@/hooks/ApiHooks";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    description: "",
    brand: "",
    price: 0,
    stock: 0,
    discount: {
      price: 0,
      startAt: "",
      endAt: "",
    },
    category: "",
    images: [],
    imageFiles: [],
    varients: {
      label: "",
      varient: [],
    },
    featured: false,
  });
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching Brands:", error);
      }

      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      try {
        const { products: productsData, pagination } = await fetchProducts(
          currentPage,
          pageSize,
          false
        );
        setProducts(productsData);
        setTotalPages(pagination.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast, currentPage, pageSize]);

  const handleAddProduct = async () => {
    try {
      let imageUrls: string[] = [];

      if (newProduct.imageFiles && newProduct.imageFiles.length > 0) {
        const formData = new FormData();
        newProduct.imageFiles.forEach((file: File) => {
          formData.append("assets", file);
        });
        const uploadResponse = await axios.post("/api/ecom/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrls = uploadResponse.data.data.map(
          (item: any) => item.serverPath
        );
      } else {
        imageUrls = newProduct.images;
      }
      const featuresArray = newProduct.customFields
        ? Object.entries(newProduct.customFields).map(
            ([fieldName, fieldObj]: [string, any]) => ({
              fieldName,
              fieldLabel: fieldObj.fieldLabel,
              fieldType: fieldObj.fieldType,
              fieldValue: fieldObj.value,
            })
          )
        : [];

      const payload = {
        name: newProduct.name,
        description: newProduct.description,
        featured: newProduct.featured,
        brand: newProduct.brand,
        price: newProduct.price,
        stock: newProduct.stock,
        discount: {
          price: newProduct.discount.price,
          startAt: newProduct.discount.startAt,
          endAt: newProduct.discount.endAt,
        },
        category: newProduct.category,
        images: imageUrls,
        features: featuresArray,
        varients: newProduct.varients,
      };

      await axios.post("/api/ecom/product/craete", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setNewProduct({
        name: "",
        description: "",
        brand: "",
        price: 0,
        stock: 0,
        discount: {
          price: 0,
          startAt: "",
          endAt: "",
        },
        category: "",
        images: [],
        varients: {
          label: "",
          varient: [],
        },
        features: [],
      });
      setOpen(false);

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      // Re-fetch products after adding a new one.
      const { products: productsData, pagination } = await fetchProducts(
        currentPage,
        pageSize,
        false
      );
      setProducts(productsData);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof product.category === "string"
        ? product.category.toLowerCase()
        : product.category.name.toLowerCase()
      ).includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeStyles = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const refreshProducts = async () => {
    try {
      const { products: productsData, pagination } = await fetchProducts(
        currentPage,
        pageSize,
        false
      );
      setProducts(productsData);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error refreshing products:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Manage your product catalog and inventory
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>
                  View and manage your product listings
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8 glass-effect w-[180px] sm:w-[220px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AddProductModal
                  open={open}
                  setOpen={setOpen}
                  newProduct={newProduct}
                  brands={brands}
                  categories={categories}
                  setNewProduct={setNewProduct}
                  handleAddProduct={handleAddProduct}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-56 w-full">
                <div className="flex flex-col items-center gap-2">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Loading products...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <ProductsTable
                  products={filteredProducts}
                  getStatusBadgeStyles={getStatusBadgeStyles}
                  isLoading={false}
                  brands={brands}
                  categories={categories}
                  refreshProducts={refreshProducts}
                />
                {/* API Pagination Controls */}
                <div className="flex items-center justify-between p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                  >
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Products;
