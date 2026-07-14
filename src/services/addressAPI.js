import axiosInstance from "./axiosInstance";

export const addAddressAPI=async(userData)=>{
    const response=await axiosInstance.post('/add/address',userData)
    return response.data;
}


// get all adDress 
export const allAddressAPI=async()=>{
    const response=await axiosInstance.get('/all/address')
    return response.data
}


//update address
export const updateAddressAPI=async(id,userData)=>{
    const response =await axiosInstance.put(`/update/address/${id}`,userData)
    return response.data
}

//delete address
export const deleteAddressAPI=async(id)=>{
    const response =await axiosInstance.delete(`/delete/address/${id}`)
    return response.data
}