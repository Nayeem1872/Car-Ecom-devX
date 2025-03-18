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
import { Plus } from "lucide-react";

interface BannerData {
  name: string;
  image: File | string;
}

interface AddBannerDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newBanner: BannerData;
  setNewBanner: (banner: BannerData) => void;
  handleAddBanner: () => void;
}

const AddBannerDialog = ({
  open,
  setOpen,
  newBanner,
  setNewBanner,
  handleAddBanner,
}: AddBannerDialogProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewBanner({ ...newBanner, image: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="red-gradient text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Banner
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Add New Banner</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new promotional banner
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name*
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newBanner.name}
              onChange={(e) =>
                setNewBanner({ ...newBanner, name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                {newBanner.image ? (
                  typeof newBanner.image === "object" ? (
                    <img
                      src={URL.createObjectURL(newBanner.image)}
                      alt="Banner Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={newBanner.image}
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
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddBanner} className="red-gradient">
            Add Banner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBannerDialog;
