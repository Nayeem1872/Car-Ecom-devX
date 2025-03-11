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

export interface Banner {
  id: number;
  name: string;
  image: string;
}

const BannerManagement = () => {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      name: "Summer Sale",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      name: "New Collection",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Holiday Special",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    },
  ]);

  const [newBanner, setNewBanner] = useState<Omit<Banner, "id">>({
    name: "",
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Simulate data loading (e.g., fetching from an API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddBanner = () => {
    if (!newBanner.name || !newBanner.image) {
      toast({
        title: "Error",
        description: "Please provide both name and image URL",
        variant: "destructive",
      });
      return;
    }

    const banner: Banner = {
      ...newBanner,
      id: banners.length > 0 ? Math.max(...banners.map((b) => b.id)) + 1 : 1,
    };

    setBanners([...banners, banner]);
    setNewBanner({ name: "", image: "" });
    setOpen(false);

    toast({
      title: "Success",
      description: "Banner added successfully",
    });
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
