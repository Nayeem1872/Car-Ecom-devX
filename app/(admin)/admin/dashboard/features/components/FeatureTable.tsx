"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";

interface Feature {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  customFields: any[];
}

interface FeatureTableProps {
  features: Feature[];
  isLoading: boolean;
  searchTerm: string;
}

const FeatureTable: React.FC<FeatureTableProps> = ({
  features,
  isLoading,
  searchTerm,
}) => {
  // Filter features based on the search term
  const filteredFeatures = features.filter(
    (feature) =>
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border glass-effect overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Custom Fields</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature) => (
              <TableRow key={feature._id}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {feature.description}
                </TableCell>
                <TableCell>{feature.category.name}</TableCell>
                <TableCell>{feature.customFields.length}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No features found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeatureTable;
