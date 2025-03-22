"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

export interface BannerData {
  id?: number; // optional id for existing banners
  name: string;
  image: File | string;
}

interface EditBannerDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentBanner: BannerData;
  setCurrentBanner: (banner: BannerData) => void;
  handleEditBanner: () => void;
}

const EditBannerDialog = ({
  open,
  setOpen,
  currentBanner,
  setCurrentBanner,
  handleEditBanner,
}: EditBannerDialogProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentBanner({ ...currentBanner, image: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button size="sm" variant="ghost">
          <Edit className="mr-1 h-4 w-4" />
          Edit Banner
        </Button> */}
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogDescription>
            Update the details for the promotional banner
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Name*
            </Label>
            <Input
              id="edit-name"
              className="col-span-3"
              value={currentBanner.name}
              onChange={(e) =>
                setCurrentBanner({ ...currentBanner, name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-image" className="text-right">
              Image
            </Label>
            <div className="col-span-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                {currentBanner.image ? (
                  typeof currentBanner.image === "object" ? (
                    <img
                      src={URL.createObjectURL(currentBanner.image)}
                      alt="Banner Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={currentBanner.image}
                      alt="Banner Preview"
                      className="h-full w-full object-cover"
                    />
                  )
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No img
                  </div>
                )}
              </div>
              <Input id="edit-image" type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditBanner} className="red-gradient">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBannerDialog;
