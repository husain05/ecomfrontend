import { useState,useEffect} from "react";
import { CartContext } from "./CartContext";
import { getCartAPI } from "@/services/cartAPI";
import toast from "react-hot-toast";

function CartProvider({children}){
   const [cart, setCart] = useState(null);
     const [loading, setLoading] = useState(true);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCartAPI();
       console.log("Fetch cart started");
       console.log("Response is :",response)

      setCart(response.data);



    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        setCart(null);
      }

      toast.error(error.response?.data?.message);
    } finally {
        console.log("Loading False")
      setLoading(false);
    }
  };

  useEffect(() => {
    const token=localStorage.getItem('accessToken')
    if(!token){
    return;
    }
    else{
        fetchCart();
    }
  }, []);

return (
  <CartContext.Provider value={{ cart, setCart,fetchCart,loading,
    setLoading,}}>
    {children}
  </CartContext.Provider>
);
}
    export default CartProvider