"use client";
import { useEffect, useState } from "react";
import { Plus, Tag, Hash, Info, SlidersHorizontal, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { fetchCategories } from "@/hooks/ApiHooks";

export interface FieldOption {
  value: string;
  label: string;
}

export interface CustomField {
  fieldName: string;
  fieldLabel: string;
  fieldType: string;
  options: FieldOption[];
  required: boolean;
  fieldValue: string;
  defaultValue: string;
}

export interface Feature {
  _id: string;
  name: string;
  description: string;
  // For editing we expect the category to be an object; we’ll store its _id internally
  category:
    | {
        _id: string;
        name: string;
      }
    | string;
  customFields: CustomField[];
}

interface EditFeatureDialogProps {
  feature: Feature;
  open: boolean;
  onClose: () => void;
  updateFeature: () => void;
}

const EditFeatureDialog: React.FC<EditFeatureDialogProps> = ({
  feature,
  updateFeature,
  open,
  onClose,
}) => {
  const { toast } = useToast();
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editedFeature, setEditedFeature] = useState({
    _id: feature._id,
    name: feature.name,
    description: feature.description,

    category:
      typeof feature.category === "object"
        ? feature.category._id
        : feature.category,
    customFields: feature.customFields,
  });

  // Manage custom field editing as in your add modal
  const [openCustomField, setOpenCustomField] = useState(false);
  const [editingCustomField, setEditingCustomField] = useState<CustomField>({
    fieldName: "",
    fieldLabel: "",
    fieldType: "text",
    options: [],
    required: false,
    fieldValue: "",
    defaultValue: "",
  });
  const [newOption, setNewOption] = useState<FieldOption>({
    value: "",
    label: "",
  });

  // Load categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setAvailableCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [toast]);

  // If the feature prop changes, update local state
  useEffect(() => {
    setEditedFeature({
      _id: feature._id,
      name: feature.name,
      description: feature.description,
      category:
        typeof feature.category === "object"
          ? feature.category._id
          : feature.category,
      customFields: feature.customFields,
    });
  }, [feature]);

  const handleUpdateFeature = async () => {
    if (!editedFeature.name || !editedFeature.category) {
      toast({
        title: "Error",
        description: "Name and category are required",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.patch(
        `/api/ecom/feature/update?id=${editedFeature._id}`,
        editedFeature
      );
      updateFeature();
      onClose();
      toast({
        title: "Success",
        description: "Feature updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive",
      });
    }
  };

  const handleAddCustomField = () => {
    if (!editingCustomField.fieldName || !editingCustomField.fieldLabel) {
      toast({
        title: "Error",
        description: "Field name and label are required",
        variant: "destructive",
      });
      return;
    }
    setEditedFeature({
      ...editedFeature,
      customFields: [...editedFeature.customFields, editingCustomField],
    });
    setEditingCustomField({
      fieldName: "",
      fieldLabel: "",
      fieldType: "text",
      options: [],
      required: false,
      fieldValue: "",
      defaultValue: "",
    });
    setOpenCustomField(false);
  };

  const handleAddOption = () => {
    if (!newOption.value || !newOption.label) {
      toast({
        title: "Error",
        description: "Option value and label are required",
        variant: "destructive",
      });
      return;
    }
    setEditingCustomField({
      ...editingCustomField,
      options: [...editingCustomField.options, newOption],
    });
    setNewOption({
      value: "",
      label: "",
    });
  };

  const handleRemoveCustomField = (index: number) => {
    const updatedCustomFields = [...editedFeature.customFields];
    updatedCustomFields.splice(index, 1);
    setEditedFeature({
      ...editedFeature,
      customFields: updatedCustomFields,
    });
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...editingCustomField.options];
    updatedOptions.splice(index, 1);
    setEditingCustomField({
      ...editingCustomField,
      options: updatedOptions,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
          <DialogDescription>
            Update product feature details and custom fields
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Name and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Tag size={16} />
                Name*
              </Label>
              <Input
                id="name"
                value={editedFeature.name}
                onChange={(e) =>
                  setEditedFeature({ ...editedFeature, name: e.target.value })
                }
                placeholder="Feature name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Hash size={16} />
                Category*
              </Label>
              <Select
                value={editedFeature.category}
                onValueChange={(value) =>
                  setEditedFeature({ ...editedFeature, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <Info size={16} />
              Description
            </Label>
            <Textarea
              id="description"
              value={editedFeature.description}
              onChange={(e) =>
                setEditedFeature({
                  ...editedFeature,
                  description: e.target.value,
                })
              }
              placeholder="Describe the feature"
              rows={3}
            />
          </div>
          {/* Custom Fields */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Custom Fields
              </Label>
              <Dialog open={openCustomField} onOpenChange={setOpenCustomField}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Field
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add Custom Field</DialogTitle>
                    <DialogDescription>
                      Define a custom field for this feature
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fieldName">Field Name*</Label>
                        <Input
                          id="fieldName"
                          value={editingCustomField.fieldName}
                          onChange={(e) =>
                            setEditingCustomField({
                              ...editingCustomField,
                              fieldName: e.target.value,
                            })
                          }
                          placeholder="e.g. width"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fieldLabel">Field Label*</Label>
                        <Input
                          id="fieldLabel"
                          value={editingCustomField.fieldLabel}
                          onChange={(e) =>
                            setEditingCustomField({
                              ...editingCustomField,
                              fieldLabel: e.target.value,
                            })
                          }
                          placeholder="e.g. Width"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fieldType">Field Type</Label>
                      <Select
                        value={editingCustomField.fieldType}
                        onValueChange={(value) =>
                          setEditingCustomField({
                            ...editingCustomField,
                            fieldType: value,
                            options:
                              value === "select"
                                ? editingCustomField.options
                                : [],
                          })
                        }
                      >
                        <SelectTrigger id="fieldType">
                          <SelectValue placeholder="Select a field type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defaultValue">Default Value</Label>
                      <Input
                        id="defaultValue"
                        value={editingCustomField.defaultValue}
                        onChange={(e) =>
                          setEditingCustomField({
                            ...editingCustomField,
                            defaultValue: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="required"
                        checked={editingCustomField.required}
                        onCheckedChange={(checked) =>
                          setEditingCustomField({
                            ...editingCustomField,
                            required: checked,
                          })
                        }
                      />
                      <Label htmlFor="required">Required field</Label>
                    </div>
                    {editingCustomField.fieldType === "select" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Options</Label>
                          {editingCustomField.options.length > 0 ? (
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Label</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {editingCustomField.options.map(
                                    (option, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{option.value}</TableCell>
                                        <TableCell>{option.label}</TableCell>
                                        <TableCell>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              handleRemoveOption(index)
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground py-2">
                              No options added yet
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-5 gap-2 items-end">
                          <div className="col-span-2 space-y-2">
                            <Label htmlFor="optionValue">Value</Label>
                            <Input
                              id="optionValue"
                              value={newOption.value}
                              onChange={(e) =>
                                setNewOption({
                                  ...newOption,
                                  value: e.target.value,
                                })
                              }
                              placeholder="e.g. red"
                            />
                          </div>
                          <div className="col-span-2 space-y-2">
                            <Label htmlFor="optionLabel">Label</Label>
                            <Input
                              id="optionLabel"
                              value={newOption.label}
                              onChange={(e) =>
                                setNewOption({
                                  ...newOption,
                                  label: e.target.value,
                                })
                              }
                              placeholder="e.g. Red"
                            />
                          </div>
                          <Button
                            className="col-span-1"
                            onClick={handleAddOption}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenCustomField(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddCustomField}>Add Field</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {editedFeature.customFields.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editedFeature.customFields.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell>{field.fieldName}</TableCell>
                        <TableCell>{field.fieldLabel}</TableCell>
                        <TableCell className="capitalize">
                          {field.fieldType}
                        </TableCell>
                        <TableCell>{field.required ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCustomField(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground py-2 border rounded-md p-4 text-center">
                No custom fields added yet. Click "Add Field" to create custom
                fields.
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateFeature}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFeatureDialog;
