"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Feature {
  _id: string;
  name: string;
}

interface DeleteFeatureDialogProps {
  feature: Feature;
  open: boolean;
  onClose: () => void;
  onDelete: (deletedFeatureId: string) => void;
  updateFeature: () => void;
}

const DeleteFeatureDialog: React.FC<DeleteFeatureDialogProps> = ({
  feature,
  open,
  onClose,
  onDelete,
  updateFeature,
}) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/ecom/feature/delete?id=${feature._id}`);
      toast({
        title: "Success",
        description: "Feature deleted successfully",
      });
      onDelete(feature._id);
      updateFeature();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete feature",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Feature</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the feature "{feature.name}"? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFeatureDialog;
