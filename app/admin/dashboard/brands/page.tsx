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
import { fetchBrands, fetchCategories } from "@/hooks/ApiHooks";
import { handleAddBrandAction, handleEditBrandAction } from "./brandActions";

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
  useEffect(() => {
    const loadData = async () => {
      try {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching Brands:", error);
        toast({
          title: "Error",
          description: "Failed to fetch Brands",
          variant: "destructive" as
            | "default"
            | "destructive"
            | null
            | undefined,
        });
      }

      try {
        const categoriesData = await fetchCategories();
        setAvailableCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      }
    };

    loadData();
  }, [toast]);

  const handleAddBrand = async () => {
    await handleAddBrandAction({
      newBrand,
      toast,
      fetchBrands: async () => {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
      },
      setNewBrand,
      setOpen,
    });
  };

  const handleEditBrand = async () => {
    await handleEditBrandAction({
      editBrand,
      toast,
      fetchBrands: async () => {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
      },
      setOpenEditModal,
      setEditBrand,
    });
  };

  const handleView = (brand: any) => {
    console.log("View", brand);
  };
  const handleEdit = (brand: any) => {
    setEditBrand(brand);
    setOpenEditModal(true);
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
              refreshBrands={fetchBrands}
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
