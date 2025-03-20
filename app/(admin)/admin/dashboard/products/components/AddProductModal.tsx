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
import GeneralTab from "./productTabs/GeneralTab";
import DynamicsTab from "./productTabs/DynamicsTab";
import VariantsTab from "./productTabs/VariantsTab";

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
  newProduct: any;
  setNewProduct: (product: any) => void;
  handleAddProduct: () => void;
  isSubmitting?: boolean;
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
  isSubmitting,
  categories,
}: AddProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!newProduct.name && (
          <DialogTrigger asChild>
            <Button size="sm" className="red-gradient text-white">
              <Plus className="mr-1 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
        )}
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
          <Button
            onClick={handleAddProduct}
            className="red-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
