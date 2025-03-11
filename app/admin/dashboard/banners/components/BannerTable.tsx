"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

export interface Banner {
  id: number;
  name: string;
  image: string;
}

interface BannerTableProps {
  banners: Banner[];
  onView?: (banner: Banner) => void;
  onEdit?: (banner: Banner) => void;
  onDelete?: (banner: Banner) => void;
  refreshBanners?: () => void;
}

const BannerTable = ({
  banners,
  onView,
  onEdit,
  onDelete,
  refreshBanners,
}: BannerTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBannerForDelete, setSelectedBannerForDelete] = useState<
    any | null
  >(null);

  const handleDeleteClick = (banner: Banner) => {
    setSelectedBannerForDelete(banner);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedBannerForDelete) {
      try {
        await axios.delete(
          `/api/ecom/banner/delete?id=${selectedBannerForDelete._id}`
        );
        if (onDelete) onDelete(selectedBannerForDelete);
        if (refreshBanners) refreshBanners();
        setDeleteModalOpen(false);
        setSelectedBannerForDelete(null);
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="h-12 w-24 rounded-md overflow-hidden">
                    <img
                      src={banner.image}
                      alt={`${banner.name} Preview`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{banner.name}</TableCell>
                <TableCell className="truncate max-w-[200px]">
                  <span className="text-xs text-muted-foreground">
                    {banner.image}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => onView(banner)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => onEdit(banner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(banner)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No banners found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Always render the dialog, control visibility via the open prop */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        {selectedBannerForDelete && (
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Delete Banner</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the banner "
                {selectedBannerForDelete.name}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default BannerTable;
