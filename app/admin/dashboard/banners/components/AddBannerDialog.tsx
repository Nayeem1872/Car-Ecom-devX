// AddBannerDialog.tsx
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
  image: string;
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
              Image URL*
            </Label>
            <div className="col-span-3 flex flex-col gap-3">
              <Input
                id="image"
                placeholder="Image URL"
                value={newBanner.image}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, image: e.target.value })
                }
              />
              {newBanner.image && (
                <div className="h-28 rounded-md overflow-hidden">
                  <img
                    src={newBanner.image}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
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
