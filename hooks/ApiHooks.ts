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
export const fetchProducts = async (
  page: number = 1,
  pageSize: number = 10,
  all: boolean = false
) => {
  const response = await axios.get(
    `/api/ecom/product/get?page=${page}&pageSize=${pageSize}&all=${all}`
  );
  return {
    products: response.data.data,
    pagination: response.data.pagination,
  };
};
export const fetchBanners = async () => {
  const response = await axios.get("/api/ecom/banner/get");
  return response.data.data;
};

export const fetchVendorUser = async () => {
  const response = await axios.get("/api/ecom/vendor/get");
  return response.data.vendors[0];
};

export const fetchContact = async (
  page: number = 1,
  pageSize: number = 10,
  all: boolean = false
) => {
  const response = await axios.get(
    `/api/ecom/contact-us/get?page=${page}&pageSize=${pageSize}&all=${all}`
  );
  return {
    products: response.data.data,
    pagination: response.data.pagination,
  };
};
