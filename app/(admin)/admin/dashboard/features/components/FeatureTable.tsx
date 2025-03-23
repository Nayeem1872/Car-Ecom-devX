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
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditFeatureDialog from "./EditFeatureDialog";
import { useToast } from "@/hooks/use-toast";
import DeleteFeatureDialog from "./DeleteFeatureDialog";

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
  onAddFeature: () => void;
}

const FeatureTable: React.FC<FeatureTableProps> = ({
  features,
  isLoading,
  searchTerm,
  onAddFeature,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState<Feature | null>(null);
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
  const handleEditClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (feature: Feature) => {
    setFeatureToDelete(feature);
    setDeleteModalOpen(true);
  };

  // Optionally update parent state after deletion.
  const handleDeleteFeature = (deletedFeatureId: string) => {
    // if (onDeleteFeature) {
    //   onDeleteFeature(deletedFeatureId);
    // } else {
    //   console.log("Feature deleted:", deletedFeatureId);
    // }
  };

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
                <TableCell>
                  {feature.category ? feature.category.name : ""}
                </TableCell>
                <TableCell>{feature.customFields.length}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button> */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(feature)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(feature)}
                    >
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
      {selectedFeature && (
        <EditFeatureDialog
          feature={selectedFeature}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          updateFeature={onAddFeature}
        />
      )}

      {featureToDelete && (
        <DeleteFeatureDialog
          feature={featureToDelete}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteFeature}
          updateFeature={onAddFeature}
        />
      )}
    </div>
  );
};

export default FeatureTable;
