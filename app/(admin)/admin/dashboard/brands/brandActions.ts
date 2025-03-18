import axios from "axios";

type ToastVariant = "default" | "destructive" | null | undefined;
type ToastFn = (obj: {
  title: string;
  description: string;
  variant?: ToastVariant;
}) => void;

export const handleAddBrandAction = async ({
  newBrand,
  toast,
  fetchBrands,
  setNewBrand,
  setOpen,
}: {
  newBrand: any;
  toast: ToastFn;
  fetchBrands: () => Promise<void>;
  setNewBrand: (brand: any) => void;
  setOpen: (open: boolean) => void;
}) => {
  if (!newBrand.name || !newBrand.category || !newBrand.logo) {
    toast({
      title: "Error",
      description: "Please provide name, category, and logo",
      variant: "destructive",
    });
    return;
  }

  try {
    let logoUrl = "";
    if (newBrand.logo instanceof File) {
      const formData = new FormData();
      formData.append("assets", newBrand.logo);
      const uploadResponse = await axios.post("/api/ecom/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      logoUrl = uploadResponse.data.data[0].serverPath;
    } else {
      logoUrl = newBrand.logo;
    }

    const payload = {
      name: newBrand.name,
      category: newBrand.category,
      logo: logoUrl,
    };

    await axios.post("/api/ecom/brand/craete", payload, {
      headers: { "Content-Type": "application/json" },
    });
    await fetchBrands();

    setNewBrand({
      name: "",
      logo: null,
      category: "",
    });
    setOpen(false);
    toast({
      title: "Success",
      description: "Brand added successfully",
    });
  } catch (error) {
    console.error("Error adding brand:", error);
    toast({
      title: "Error",
      description: "Failed to add brand",
      variant: "destructive",
    });
  }
};

export const handleEditBrandAction = async ({
  editBrand,
  toast,
  fetchBrands,
  setOpenEditModal,
  setEditBrand,
}: {
  editBrand: any;
  toast: ToastFn;
  fetchBrands: () => Promise<void>;
  setOpenEditModal: (open: boolean) => void;
  setEditBrand: (brand: any) => void;
}) => {
  if (!editBrand) return;

  try {
    let logoUrl = editBrand.logo;

    if (editBrand.newLogoFile && editBrand.newLogoFile instanceof File) {
      const formData = new FormData();
      formData.append("assets", editBrand.newLogoFile);

      const uploadResponse = await axios.post("/api/ecom/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      logoUrl = uploadResponse.data.data[0].serverPath;
    }
  

    const payload = {
      name: editBrand.name,
      category:
        typeof editBrand.category === "object"
          ? editBrand.category._id
          : editBrand.category,
      logo: logoUrl,
    };

    await axios.patch(`/api/ecom/brand/edit?id=${editBrand._id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    await fetchBrands();
    setOpenEditModal(false);
    setEditBrand(null);

    toast({
      title: "Success",
      description: "Brand updated successfully",
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    toast({
      title: "Error",
      description: "Failed to update brand",
      variant: "destructive",
    });
  }
};
