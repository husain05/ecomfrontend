import axiosInstance from "./axiosInstance";


// create product
export const createProductAPI= async(userData)=>{
const response= await axiosInstance.post('/create/product',userData)
return response.data 
}

//get all products
export const allProductAPI=async()=>{
    const response=await axiosInstance.get('/all/products')
    return response.data
}

// single product by productId
export const getSingleProductAPI=async(productId)=>{
    const response=await axiosInstance.get(`/single/product/${productId}`)
    return response.data
}

//update product

export const updateProductAPI=async(productId,userData)=>{
    const response=await axiosInstance.put(`/update/product/${productId}`,userData)
    return response.data
}

//delete product
export const deleteProductAPI=async(productId)=>{
    const response=await axiosInstance.delete(`/delete/product/${productId}`)
    return response.data
}


// get all product by query
export const getAllProductByQueryAPI=async (queryData)=>{
    const response=await axiosInstance.get(`/all-products-by-query`,{
        params:queryData
    })

    return response.data 
}