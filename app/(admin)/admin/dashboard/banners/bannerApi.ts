import axios from "axios";

export const handleAddBannerAction = async ({
  newBanner,

  fetchBanners,
  setNewBanner,
  setOpen,
}: {
  newBanner: any;

  fetchBanners: () => Promise<void>;
  setNewBanner: (banner: any) => void;
  setOpen: (open: boolean) => void;
}) => {
  if (!newBanner.name || !newBanner.image) {
    return;
  }

  try {
    let imageUrl = "";
    // Check if newBanner.image is a File; if so, upload it first
    if (newBanner.image instanceof File) {
      const formData = new FormData();
      formData.append("assets", newBanner.image);
      const uploadResponse = await axios.post("/api/ecom/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Assuming the response contains an array of uploaded assets
      imageUrl = uploadResponse.data.data[0].serverPath;
    } else {
      imageUrl = newBanner.image;
    }

    // Construct payload for banner creation
    const payload = {
      name: newBanner.name,
      image: imageUrl,
    };

    // Post the banner creation request
    await axios.post("/api/ecom/banner/craete", payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Refresh banner list after adding new banner
    await fetchBanners();

    // Reset the new banner state and close dialog/modal
    setNewBanner({ name: "", image: "" });
    setOpen(false);
  } catch (error) {
    console.error("Error adding banner:", error);
  }
};
