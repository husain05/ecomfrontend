import axiosInstance from "./axiosInstance";

export const addCartAPI=async(productData)=>{
    const response=await axiosInstance.post('/add/cart')
    return response.data
}

// get cart
export const getCart=async()=>{
    const response=await axiosInstance.get('/get/cart')
    return response.data
}

// update quantity
export const updateQuantity=async(productId,userData)=>{
    const response=await axiosInstance.patch(`/update/quantity/${productId}`,userData)
    return response.data
}

// removeProductFromCart
export const removeProductFromCart=async(productId)=>{
    const response=await axiosInstance.delete(`/remove-product/cart/${productId}`)
    return response.data
}

//clear cart
export const clearCart=async()=>{
    const response=await axiosInstance.delete('/clear/cart')
    return response.data
}