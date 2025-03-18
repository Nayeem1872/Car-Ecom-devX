"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface VariantsTabProps {
  newProduct: any;
  setNewProduct: (product: any) => void;
}

const VariantsTab: React.FC<VariantsTabProps> = ({
  newProduct,
  setNewProduct,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4">
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="variantValues">Variant Values (comma separated)</Label>
        <Input
          id="variantValues"
          placeholder="e.g. Small, Medium, Large"
          value={
            newProduct.varients?.varient
              ? newProduct.varients.varient.join(", ")
              : ""
          }
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              varients: {
                ...newProduct.varients,
                varient: e.target.value.split(",").map((val) => val.trim()),
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default VariantsTab;
