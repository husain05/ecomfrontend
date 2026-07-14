import axiosInstance from "./axiosInstance";


// send otp API
export const sendOtpAPI = async (email) => {
  const response = await axiosInstance.post("/send-otp", {
    email,
  });

  return response.data;
};

// Register
export const registerAPI = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);
  return response.data;
};

// Login
export const loginAPI = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};

// Logout
export const logoutAPI = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data;
};

// Refresh Token (if your backend has it)
export const refreshTokenAPI = async () => {
  const response = await axiosInstance.post("/refresh-token");
  return response.data;
};