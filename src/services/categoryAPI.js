import axiosInstance from "./axiosInstance";

export const getAllCategories = async () => {
  return await axiosInstance.get("/all/categories");
};

export const getSingleCategory = async (id) => {
  return await axiosInstance.get(`/single/category/${id}`);
};

export const createCategory = async (data) => {
  return await axiosInstance.post("/create/category", data);
};

export const updateCategory = async (id, data) => {
  return await axiosInstance.put(`/update/category/${id}`, data);
};

export const deleteCategory = async (id) => {
  return await axiosInstance.delete(`/delete/category/${id}`);
};


