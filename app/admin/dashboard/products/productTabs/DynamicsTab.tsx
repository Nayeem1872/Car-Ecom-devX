"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DynamicsTabProps {
  newProduct: any;
  setNewProduct: (product: any) => void;
}

const DynamicsTab: React.FC<DynamicsTabProps> = ({
  newProduct,
  setNewProduct,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="dynamicField">Dynamic Field</Label>
        <Input
          id="dynamicField"
          placeholder="Enter dynamic info..."
          value={newProduct.dynamicField || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, dynamicField: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default DynamicsTab;
