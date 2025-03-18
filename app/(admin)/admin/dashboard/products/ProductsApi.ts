import axios from "axios";

type ToastFn = (obj: {
  title: string;
  description: string;
  variant?: "default" | "destructive" | null | undefined;
}) => void;

export const handleAddProductAction = async ({
  newProduct,
  toast,
  fetchProducts,
  setNewProduct,
  setOpen,
}: {
  newProduct: any;
  toast: ToastFn;
  fetchProducts: () => Promise<void>;
  setNewProduct: (product: any) => void;
  setOpen: (open: boolean) => void;
}) => {
  // Basic validation
  if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
    toast({
      title: "Error",
      description: "Please fill all required fields",
      variant: "destructive",
    });
    return;
  }

  try {
    let imageUrls: string[] = [];
    // Check if images exist and are File objects.
    if (
      newProduct.images &&
      newProduct.images.length > 0 &&
      newProduct.images[0] instanceof File
    ) {
      const formData = new FormData();
      newProduct.images.forEach((file: File) => {
        formData.append("assets", file);
      });
      const uploadResponse = await axios.post("/api/ecom/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Assuming the response returns an array in uploadResponse.data.data
      imageUrls = uploadResponse.data.data.map((item: any) => item.serverPath);
    } else {
      // Otherwise, assume images are already URLs
      imageUrls = newProduct.images;
    }

    const payload = {
      name: newProduct.name,
      description: newProduct.description,
      brand: newProduct.brand,
      price: newProduct.price,
      stock: newProduct.stock,
      discount: newProduct.discount,
      category: newProduct.category,
      images: imageUrls,
      varients: newProduct.varients,
      features: newProduct.features,
    };

    await axios.post("/api/ecom/product/create", payload, {
      headers: { "Content-Type": "application/json" },
    });
    await fetchProducts();

    // Reset new product state
    setNewProduct({
      name: "",
      description: "",
      brand: "",
      price: 0,
      stock: 0,
      discount: {
        price: 0,
        startAt: "",
        endAt: "",
      },
      category: "",
      images: [],
      varients: {
        label: "",
        varient: [],
      },
      features: [],
    });
    setOpen(false);
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    toast({
      title: "Error",
      description: "Failed to add product",
      variant: "destructive",
    });
  }
};
