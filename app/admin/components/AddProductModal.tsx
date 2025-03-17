"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import GeneralTab from "../dashboard/products/productTabs/GeneralTab";
import DynamicsTab from "../dashboard/products/productTabs/DynamicsTab";
import VariantsTab from "../dashboard/products/productTabs/VariantsTab";

export interface AdditionalItem {
  fieldName: string;
  fieldLabel: string;
  type: "string" | "boolean";
  required: boolean;
  fieldValue: string | boolean;
  defaultValue: string | boolean;
}

export interface NewProduct {
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  discount: {
    price: number;
    startAt: string;
    endAt: string;
  };
  category: string;
  imageFiles: File[];
  images: string[];
  varients: {
    label: string;
    varient: string[];
  };
  featured: boolean;
  additionalItems?: AdditionalItem[];
  dynamicField?: string;
}

interface AddProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newProduct: NewProduct;
  setNewProduct: (product: NewProduct) => void;
  handleAddProduct: () => void;
  brands: any[];
  categories: any[];
}

const AddProductModal = ({
  open,
  setOpen,
  newProduct,
  setNewProduct,
  handleAddProduct,
  brands,
  categories,
}: AddProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card w-[90vw] max-w-[1500px] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to your inventory
          </DialogDescription>
        </DialogHeader>

        {/* Tabs with 3 sections */}
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3 gap-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="dynamics">Features</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
          </TabsList>

          {/* Tab 1: General */}
          <TabsContent value="general">
            <GeneralTab
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              brands={brands}
              categories={categories}
            />
          </TabsContent>

          {/* Tab 2: Dynamics */}
          <TabsContent value="dynamics">
            <DynamicsTab
              newProduct={newProduct}
              setNewProduct={setNewProduct}
            />
          </TabsContent>

          {/* Tab 3: Variants */}
          <TabsContent value="variants">
            <VariantsTab
              newProduct={newProduct}
              setNewProduct={setNewProduct}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} className="red-gradient">
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
