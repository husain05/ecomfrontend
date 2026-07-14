import axiosInstance from "./axiosInstance";

// create category
export const createCategory =async(data)=>{
    const response =await axiosInstance.post('/create/category',data)
    return response.data
}
