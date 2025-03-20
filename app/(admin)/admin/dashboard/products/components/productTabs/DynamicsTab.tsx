"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DynamicsTabProps {
  newProduct: any;
  setNewProduct: (product: any) => void;
}

const DynamicsTab: React.FC<DynamicsTabProps> = ({
  newProduct,
  setNewProduct,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);

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
  const matchingFeatures = features.filter(
    (feature) =>
      feature.category && feature.category._id === newProduct.category
  );

  const customFields =
    matchingFeatures.length > 0 ? matchingFeatures[0].customFields : [];

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {newProduct.features && newProduct.features.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {newProduct.features.map((feature: any) => (
            <div key={feature._id} className="flex flex-col gap-1">
              <Label>{feature.fieldLabel}</Label>
              {feature.fieldType === "textarea" ? (
                <Textarea
                  placeholder={`Enter ${feature.fieldLabel}`}
                  value={feature.fieldValue || ""}
                  onChange={(e) => {
                    const updatedFeatures = newProduct.features.map((f: any) =>
                      f._id === feature._id
                        ? { ...f, fieldValue: e.target.value }
                        : f
                    );
                    setNewProduct({ ...newProduct, features: updatedFeatures });
                  }}
                />
              ) : (
                <Input
                  placeholder={`Enter ${feature.fieldLabel}`}
                  value={feature.fieldValue || ""}
                  onChange={(e) => {
                    const updatedFeatures = newProduct.features.map((f: any) =>
                      f._id === feature._id
                        ? { ...f, fieldValue: e.target.value }
                        : f
                    );
                    setNewProduct({ ...newProduct, features: updatedFeatures });
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {isLoading ? (
            <p>Loading custom fields...</p>
          ) : customFields.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {customFields.map((field: any) => (
                <div key={field._id} className="flex flex-col gap-1">
                  <Label className="mb-2">{field.fieldLabel}</Label>

                  {field.fieldType === "text" && (
                    <Input
                      placeholder={`Enter ${field.fieldLabel}`}
                      value={
                        (newProduct.customFields &&
                          newProduct.customFields[field.fieldName]?.value) ||
                        ""
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          customFields: {
                            ...newProduct.customFields,
                            [field.fieldName]: {
                              value: e.target.value,
                              fieldLabel: field.fieldLabel,
                              fieldType: field.fieldType,
                            },
                          },
                        })
                      }
                    />
                  )}

                  {field.fieldType === "number" && (
                    <Input
                      type="number"
                      placeholder={`Enter ${field.fieldLabel}`}
                      value={
                        (newProduct.customFields &&
                          newProduct.customFields[field.fieldName]?.value) ||
                        ""
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          customFields: {
                            ...newProduct.customFields,
                            [field.fieldName]: {
                              value: Number(e.target.value),
                              fieldLabel: field.fieldLabel,
                              fieldType: field.fieldType,
                            },
                          },
                        })
                      }
                    />
                  )}

                  {field.fieldType === "date" && (
                    <Input
                      type="date"
                      placeholder={`Select ${field.fieldLabel}`}
                      value={
                        (newProduct.customFields &&
                          newProduct.customFields[field.fieldName]?.value) ||
                        ""
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          customFields: {
                            ...newProduct.customFields,
                            [field.fieldName]: {
                              value: e.target.value,
                              fieldLabel: field.fieldLabel,
                              fieldType: field.fieldType,
                            },
                          },
                        })
                      }
                    />
                  )}

                  {field.fieldType === "textarea" && (
                    <Textarea
                      placeholder={`Enter ${field.fieldLabel}`}
                      value={
                        (newProduct.customFields &&
                          newProduct.customFields[field.fieldName]?.value) ||
                        ""
                      }
                      onChange={(e: any) =>
                        setNewProduct({
                          ...newProduct,
                          customFields: {
                            ...newProduct.customFields,
                            [field.fieldName]: {
                              value: e.target.value,
                              fieldLabel: field.fieldLabel,
                              fieldType: field.fieldType,
                            },
                          },
                        })
                      }
                    />
                  )}

                  {field.fieldType === "select" && (
                    <Select
                      value={
                        (newProduct.customFields &&
                          newProduct.customFields[field.fieldName]?.value) ||
                        ""
                      }
                      onValueChange={(value: string) =>
                        setNewProduct({
                          ...newProduct,
                          customFields: {
                            ...newProduct.customFields,
                            [field.fieldName]: {
                              value,
                              fieldLabel: field.fieldLabel,
                              fieldType: field.fieldType,
                            },
                          },
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={`Select ${field.fieldLabel}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option: any) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {field.fieldType === "radio" && (
                    <div className="flex flex-col gap-1">
                      {field.options.map((option: any) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-2"
                        >
                          <Input
                            type="radio"
                            name={field.fieldName}
                            value={option.value}
                            checked={
                              newProduct.customFields &&
                              newProduct.customFields[field.fieldName]
                                ?.value === option.value
                            }
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                customFields: {
                                  ...newProduct.customFields,
                                  [field.fieldName]: {
                                    value: e.target.value,
                                    fieldLabel: field.fieldLabel,
                                    fieldType: field.fieldType,
                                  },
                                },
                              })
                            }
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>No custom fields available for the selected category.</div>
          )}
        </>
      )}
    </div>
  );
};

export default DynamicsTab;
