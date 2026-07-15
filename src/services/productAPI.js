import axiosInstance from "./axiosInstance";


// create product
export const createProductAPI= async(userData)=>{
return await axiosInstance.post('/create/product',userData)

}

//get all products
export const getAllProducts=async()=>{
  return await axiosInstance.get('/all/products')
 
}

export const getSingleProduct = async (productId) => {
  return await axiosInstance.get(`/single/product/${productId}`);
};


//update product
export const updateProduct = async (productId, data) => {
  return await axiosInstance.put(
    `/update/product/${productId}`,
    data
  );
};
//delete product
export const deleteProduct=async(productId)=>{
    return await axiosInstance.delete(`/delete/product/${productId}`)

}


// get all product by query
export const getAllProductByQueryAPI=async (queryData)=>{
    const response=await axiosInstance.get(`/all-products-by-query`,{
        params:queryData
    })

    return response.data 
}