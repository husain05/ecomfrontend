import axiosInstance from "./axiosInstance";

// Add Product To Cart
export const addCartAPI = async (data) => {
  const response = await axiosInstance.post("/add/cart", data);
  return response.data;
};

// Get User Cart
export const getCartAPI = async () => {
  const response = await axiosInstance.get("/get/cart");
  return response.data;
};

// Update Quantity
export const updateQuantityAPI = async (productId, quantity) => {
  const response = await axiosInstance.patch(
    `/update/quantity/${productId}`,
    {
      quantity,
    }
  );

  return response.data;
};

// Remove Product
export const removeProductAPI = async (productId) => {
  const response = await axiosInstance.delete(
    `/remove-product/cart/${productId}`
  );

  return response.data;
};

// Clear Cart
export const clearCartAPI = async () => {
  const response = await axiosInstance.delete("/clear/cart");
  return response.data;
};