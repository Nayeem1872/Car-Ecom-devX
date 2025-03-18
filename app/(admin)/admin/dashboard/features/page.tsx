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
import AddFeatureDialog from "./components/AddFeatureDialog";
import FeatureTable from "./components/FeatureTable";
import axios from "axios";

const Features = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  useState(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  });
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/ecom/feature/get");
        setFeatures(response.data.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = (feature: any) => {
    const newFeature = {
      ...feature,
      id: features.length > 0 ? Math.max(...features.map((f) => f.id)) + 1 : 1,
    };
    setFeatures([...features, newFeature]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Features</h1>
        <p className="text-muted-foreground">
          Manage your product features and custom fields
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
                <CardTitle>Feature Management</CardTitle>
                <CardDescription>
                  Create and manage product features with custom fields
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search features..."
                    className="pl-8 glass-effect w-[180px] sm:w-[220px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AddFeatureDialog onAddFeature={handleAddFeature} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <FeatureTable
              features={features}
              isLoading={isLoading}
              searchTerm={searchTerm}
            />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Features;
