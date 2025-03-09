"use client";
import { useState } from "react";
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

const Brands = () => {
  const [brands, setBrands] = useState<any[]>([
    {
      id: 1,
      name: "Acme Co",
      logo: "https://api.dicebear.com/6.x/shapes/svg?seed=acme",
      category: "Furniture",
    },
    {
      id: 2,
      name: "TechGear",
      logo: "https://api.dicebear.com/6.x/shapes/svg?seed=techgear",
      category: "Electronics",
    },
    {
      id: 3,
      name: "GreenLeaf",
      logo: "https://api.dicebear.com/6.x/shapes/svg?seed=greenleaf",
      category: "Home Decor",
    },
  ]);
  const [newBrand, setNewBrand] = useState<any>({
    name: "",
    logo: "https://api.dicebear.com/6.x/shapes/svg?seed=default",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddBrand = () => {
    if (!newBrand.name || !newBrand.category) {
      toast({
        title: "Error",
        description: "Please provide both name and category",
        variant: "destructive",
      });
      return;
    }

    const brand: any = {
      ...newBrand,
      id: brands.length > 0 ? Math.max(...brands.map((b) => b.id)) + 1 : 1,
    };

    setBrands([...brands, brand]);
    setNewBrand({
      name: "",
      logo: "https://api.dicebear.com/6.x/shapes/svg?seed=default",
      category: "",
    });
    setOpen(false);

    toast({
      title: "Success",
      description: "Brand added successfully",
    });
  };

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (brand: any) => {
    console.log("View", brand);
  };
  const handleEdit = (brand: any) => {
    console.log("Edit", brand);
  };
  const handleDelete = (brand: any) => {
    console.log("Delete", brand);
  };

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
    </>
  );
};

export default Brands;
