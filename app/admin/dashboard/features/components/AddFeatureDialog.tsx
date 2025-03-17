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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  id: number;
  name: string;
  description: string;
  category: string;
  customFields: CustomField[];
}

interface AddFeatureDialogProps {
  onAddFeature: (feature: Omit<Feature, "id">) => void;
}

const AddFeatureDialog: React.FC<AddFeatureDialogProps> = ({
  onAddFeature,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openCustomField, setOpenCustomField] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newFeature, setNewFeature] = useState<Omit<Feature, "id">>({
    name: "",
    description: "",
    category: "",
    customFields: [],
  });

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
  const handleAddFeature = async () => {
    if (!newFeature.name || !newFeature.category) {
      toast({
        title: "Error",
        description: "Name and category are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("/api/ecom/feature/craete", newFeature);
      onAddFeature(newFeature);
      setNewFeature({
        name: "",
        description: "",
        category: "",
        customFields: [],
      });
      setOpen(false);

      toast({
        title: "Success",
        description: "Feature added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add feature",
        variant: "destructive",
      });
    }
  };

  console.log("availableCategories", availableCategories);

  const handleAddCustomField = () => {
    if (!editingCustomField.fieldName || !editingCustomField.fieldLabel) {
      toast({
        title: "Error",
        description: "Field name and label are required",
        variant: "destructive",
      });
      return;
    }

    setNewFeature({
      ...newFeature,
      customFields: [...newFeature.customFields, editingCustomField],
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
    const updatedCustomFields = [...newFeature.customFields];
    updatedCustomFields.splice(index, 1);
    setNewFeature({
      ...newFeature,
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Feature</DialogTitle>
          <DialogDescription>
            Define product features and add custom fields
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Tag size={16} />
                Name*
              </Label>
              <Input
                id="name"
                value={newFeature.name}
                onChange={(e) =>
                  setNewFeature({ ...newFeature, name: e.target.value })
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
                value={newFeature.category}
                onValueChange={(value) =>
                  setNewFeature({ ...newFeature, category: value })
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
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <Info size={16} />
              Description
            </Label>
            <Textarea
              id="description"
              value={newFeature.description}
              onChange={(e) =>
                setNewFeature({ ...newFeature, description: e.target.value })
              }
              placeholder="Describe the feature"
              rows={3}
            />
          </div>
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
            {newFeature.customFields.length > 0 ? (
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
                    {newFeature.customFields.map((field, index) => (
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddFeature}>Save Feature</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeatureDialog;
