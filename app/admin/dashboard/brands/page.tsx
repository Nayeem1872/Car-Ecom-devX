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
import AddBrandModal from "../../components/AddBrandModal";
import BrandsTable from "../../components/BrandsTable";
import axios from "axios";
import EditBrandModal from "./components/EditBrandModal";

const Brands = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [newBrand, setNewBrand] = useState<any>({
    name: "",
    logo: null,
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [editBrand, setEditBrand] = useState<any | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { toast } = useToast();
  const fetchBrands = async () => {
    try {
      const response = await axios.get("/api/ecom/brand/get");
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching Brands:", error);
      toast({
        title: "Error",
        description: "Failed to fetch Brands",
        variant: "destructive",
      });
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/ecom/category/get");
      const transformed = response.data.category.map((cat: any) => ({
        id: cat._id,
        name: cat.name,
      }));
      setAvailableCategories(transformed);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [toast]);

  const handleAddBrand = async () => {
    if (!newBrand.name || !newBrand.category || !newBrand.logo) {
      toast({
        title: "Error",
        description: "Please provide name, category, and logo",
        variant: "destructive",
      });
      return;
    }

    try {
      let logoUrl = "";
      if (newBrand.logo instanceof File) {
        const formData = new FormData();
        formData.append("assets", newBrand.logo);
        const uploadResponse = await axios.post("/api/ecom/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        logoUrl = uploadResponse.data.data[0].serverPath;
      } else {
        logoUrl = newBrand.logo;
      }

      const payload = {
        name: newBrand.name,
        category: newBrand.category,
        logo: logoUrl,
      };

      await axios.post("/api/ecom/brand/craete", payload, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchBrands();

      setNewBrand({
        name: "",
        logo: null,
        category: "",
      });
      setOpen(false);
      toast({
        title: "Success",
        description: "Brand added successfully",
      });
    } catch (error) {
      console.error("Error adding brand:", error);
      toast({
        title: "Error",
        description: "Failed to add brand",
        variant: "destructive",
      });
    }
  };

  const handleView = (brand: any) => {
    console.log("View", brand);
  };
  const handleEdit = (brand: any) => {
    setEditBrand(brand);
    setOpenEditModal(true);
  };
  const handleEditBrand = async () => {
    if (!editBrand) return;
    try {
      let logoUrl = editBrand.logo;
      if (editBrand.newLogoFile instanceof File) {
        const formData = new FormData();
        formData.append("assets", editBrand.newLogoFile);
        const uploadResponse = await axios.post("/api/ecom/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        logoUrl = uploadResponse.data.data[0].serverPath;
      }

      const payload = {
        name: editBrand.name,
        category: editBrand.category._id,
        logo: logoUrl,
      };

      await axios.patch(`/api/ecom/brand/edit?id=${editBrand.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchBrands();
      setOpenEditModal(false);
      setEditBrand(null);
      toast({
        title: "Success",
        description: "Brand updated successfully",
      });
    } catch (error) {
      console.error("Error updating brand:", error);
      toast({
        title: "Error",
        description: "Failed to update brand",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (brand: any) => {
    console.log("Delete", brand);
  };
  const filteredBrands = brands.filter((brand) => {
    if (!brand.name) return false;
    const categoryName =
      typeof brand.category === "object" && brand.category !== null
        ? brand.category.name
        : brand.category || "";
    return (
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Brands</h1>
        <p className="text-muted-foreground">Manage your product brands</p>
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
                <CardTitle>Brand Management</CardTitle>
                <CardDescription>
                  View and manage your product brands
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search brands..."
                    className="pl-8 glass-effect w-[180px] sm:w-[220px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AddBrandModal
                  open={open}
                  setOpen={setOpen}
                  newBrand={newBrand}
                  setNewBrand={setNewBrand}
                  handleAddBrand={handleAddBrand}
                  categories={availableCategories}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BrandsTable
              brands={filteredBrands}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </motion.div>
      {openEditModal && editBrand && (
        <EditBrandModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          brand={editBrand}
          setBrand={setEditBrand}
          handleEditBrand={handleEditBrand}
          categories={availableCategories}
        />
      )}
    </>
  );
};

export default Brands;
