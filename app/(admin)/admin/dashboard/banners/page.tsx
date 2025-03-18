"use client";
import { useState, useEffect } from "react";
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
import AddBannerDialog from "./components/AddBannerDialog";
import BannerTable from "./components/BannerTable";
import axios from "axios";
import { fetchBanners } from "@/hooks/ApiHooks";

export interface Banner {
  id: number;
  name: string;
  image: string;
}

const BannerManagement = () => {
  const [banners, setBanners] = useState<any[]>([]);

  const [newBanner, setNewBanner] = useState<any>({
    name: "",
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const brandsData = await fetchBanners();
        setBanners(brandsData);
      } catch (error) {
        console.error("Error fetching Brands:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);
  const handleAddBanner = async () => {
    if (!newBanner.name || !newBanner.image) {
      toast({
        title: "Error",
        description: "Please provide both name and image",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = "";
      if (newBanner.image instanceof File) {
        const formData = new FormData();
        formData.append("assets", newBanner.image);
        const uploadResponse = await axios.post("/api/ecom/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadResponse.data.data[0].serverPath;
      } else {
        imageUrl = newBanner.image;
      }

      const payload = {
        name: newBanner.name,
        image: imageUrl,
      };

      await axios.post("/api/ecom/banner/craete", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Optionally, update the local state.
      const newId =
        banners.length > 0 ? Math.max(...banners.map((b) => b.id)) + 1 : 1;
      setBanners([
        ...banners,
        { id: newId, name: newBanner.name, image: imageUrl },
      ]);
      setNewBanner({ name: "", image: "" });
      setOpen(false);

      toast({
        title: "Success",
        description: "Banner added successfully",
      });
    } catch (error) {
      console.error("Error adding banner:", error);
      toast({
        title: "Error",
        description: "Failed to add banner",
        variant: "destructive",
      });
    }
  };

  const filteredBanners = banners.filter((banner) =>
    banner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Banners</h1>
        <p className="text-muted-foreground">Manage your promotional banners</p>
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
                <CardTitle>Banner Management</CardTitle>
                <CardDescription>
                  View and manage your promotional banners
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search banners..."
                    className="pl-8 glass-effect w-[180px] sm:w-[220px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AddBannerDialog
                  open={open}
                  setOpen={setOpen}
                  newBanner={newBanner}
                  setNewBanner={setNewBanner}
                  handleAddBanner={handleAddBanner}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border glass-effect overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center h-56 w-full">
                  <div className="flex flex-col items-center gap-2">
                    <Loader className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Loading banners...
                    </p>
                  </div>
                </div>
              ) : (
                <BannerTable banners={filteredBanners} />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default BannerManagement;
