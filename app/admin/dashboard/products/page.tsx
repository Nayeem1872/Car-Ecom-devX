"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AddProductModal from "../../components/AddProductModal";
import ProductsTable, { Product } from "../../components/ProductsTable";
import { fetchBrands, fetchCategories } from "@/hooks/ApiHooks";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Modern Chair",
      category: "Furniture",
      price: 149.99,
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60",
      status: "in-stock",
    },
    {
      id: 2,
      name: "Desk Lamp",
      category: "Lighting",
      price: 89.99,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60",
      status: "low-stock",
    },
    {
      id: 3,
      name: "Sofa Set",
      category: "Furniture",
      price: 899.99,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
      status: "low-stock",
    },
    {
      id: 4,
      name: "Coffee Table",
      category: "Furniture",
      price: 249.99,
      stock: 0,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=60",
      status: "out-of-stock",
    },
    {
      id: 5,
      name: "Bookshelf",
      category: "Storage",
      price: 199.99,
      stock: 23,
      image:
        "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&auto=format&fit=crop&q=60",
      status: "in-stock",
    },
  ]);
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
    features: [],
  });
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const loadData = async () => {
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
    };

    loadData();
  }, [toast]);
  const handleAddProduct = async () => {
    // if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
    //   toast({
    //     title: "Error",
    //     description: "Please fill all required fields",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    try {
      let imageUrls: string[] = [];
      console.log("Image Files:", newProduct.imageFiles);
      console.log("Image Previews:", newProduct.images);
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
        imageUrls = newProduct.images; // fallback if they are already URLs
      }
      // Construct payload for product creation
      const payload = {
        name: newProduct.name,
        description: newProduct.description,
        featured: false, // Set to false by default or adjust as needed
        brand: newProduct.brand,
        price: newProduct.price,
        stock: newProduct.stock,
        discount: {
          price: newProduct.discount.price,
          startAt: newProduct.discount.startAt,
          endAt: newProduct.discount.endAt,
        },
        category: newProduct.category,
        images: imageUrls, // Array of image URLs from the upload process
        varients: {
          label: newProduct.varients.label,
          varient: newProduct.varients.varient,
        },
        features: newProduct.features,
      };

      await axios.post("/api/ecom/product/craete", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // await fetchProducts();

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
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            <ProductsTable
              products={filteredProducts}
              getStatusBadgeStyles={getStatusBadgeStyles}
            />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Products;
