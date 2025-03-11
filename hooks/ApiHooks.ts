import axios from "axios";

export const fetchBrands = async () => {
  const response = await axios.get("/api/ecom/brand/get");
  return response.data.data;
};

export const fetchCategories = async () => {
  const response = await axios.get("/api/ecom/category/get");
  return response.data.category.map((cat: any) => ({
    id: cat._id,
    name: cat.name,
  }));
};
