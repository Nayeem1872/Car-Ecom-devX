"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Variant {
  name: string;
  price: number;
  stock: number;
  description: string;
}

interface VariantsTabProps {
  newProduct: any;
  setNewProduct: (product: any) => void;
}

const VariantsTab: React.FC<VariantsTabProps> = ({
  newProduct,
  setNewProduct,
}) => {
  const logProductData = () => {
    console.log({
      label: newProduct.varients?.label,
      variant: newProduct.varients?.varient.map((variant: Variant) => ({
        name: variant.name,
        price: variant.price,
        stock: variant.stock,
        description: variant.description,
      })),
    });
  };
  const handleAddVariant = () => {
    const newVariant = {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      image: null,
    };
    setNewProduct((prevProduct: any) => {
      const updatedProduct = {
        ...prevProduct,
        varients: {
          ...prevProduct.varients,
          varient: [...prevProduct.varients.varient, newVariant],
        },
      };
      logProductData();
      return updatedProduct;
    });
  };

  const handleRemoveVariant = (index: number) => {
    const updatedVariants = newProduct.varients.varient.filter(
      (_: any, idx: any) => idx !== index
    );
    setNewProduct({
      ...newProduct,
      varients: {
        ...newProduct.varients,
        varient: updatedVariants,
      },
    });
  };

  const handleVariantChange = (index: number, key: string, value: any) => {
    if (key === "price" || key === "stock") {
      value = parseFloat(value); // Convert string to number
    }

    const updatedVariants = newProduct.varients.varient.map(
      (variant: any, idx: any) =>
        idx === index ? { ...variant, [key]: value } : variant
    );
    setNewProduct({
      ...newProduct,
      varients: {
        ...newProduct.varients,
        varient: updatedVariants,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {/* Variant Label */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="variantLabel">Variant Label</Label>
        <Input
          id="variantLabel"
          placeholder="e.g. Size"
          value={newProduct.varients?.label || ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              varients: {
                ...newProduct.varients,
                label: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="space-y-6">
        {newProduct.varients?.varient.map((variant: Variant, index: number) => (
          <div key={index} className="border p-4 rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Variant {index + 1}</h4>
              <Button
                variant="ghost"
                onClick={() => handleRemoveVariant(index)}
                size="icon"
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="e.g., Small"
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                />
              </div>

              <div className="col-span-2">
                <Label>Description</Label>
                <Input
                  placeholder="e.g., This variant is red."
                  value={variant.description}
                  onChange={(e) =>
                    handleVariantChange(index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Variant Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full mt-4"
        onClick={handleAddVariant}
      >
        Add New Variant
      </Button>
    </div>
  );
};

export default VariantsTab;
