import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCartAPI,
  updateQuantityAPI,
  removeProductAPI,
  clearCartAPI,
} from "@/services/cartAPI";

import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCartAPI();

      setCart(response.data);



    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        setCart(null);
      }

      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      await updateQuantityAPI(productId, quantity);

      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Remove Product
  const removeProduct = async (productId) => {
    try {
      const response = await removeProductAPI(productId);

      toast.success(response.message);

      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      const response = await clearCartAPI();

      toast.success(response.message);

      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">
          Cart is Empty
        </h2>
        
        <Link to={'/products'}>
        
        
        <Button>BacK</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Cart
        </h1>

        <Button
          variant="destructive"
          onClick={clearCart}
        >
          Clear Cart
        </Button>

      </div>      

      {/* Cart Items */}

      <div className="space-y-6">

        {cart.items.map((item) => (

          <div
            key={item.product._id}
            className="border rounded-lg p    -4 flex gap-5"
          >

            <img
              src={item.product.images[0]}
              alt={item.product.title}
              className="w-36 h-36 object-cover rounded"
            />

            <div className="flex-1">

              <h2 className="text-2xl font-bold">
                {item.product.title}
              </h2>

              <p className="text-gray-500">
                ₹ {item.price}
              </p>

              <p>
                Stock : {item.product.stock}
              </p>

              <div className="flex gap-2 mt-4">

                <Button
                  variant="outline"
                  onClick={() =>
                    updateQuantity(
                      item.product._id,
                      item.quantity - 1
                    )
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </Button>

                <span className="text-xl font-bold mt-1">
                  {item.quantity}
                </span>

                <Button
                  variant="outline"
                  onClick={() =>
                    updateQuantity(
                      item.product._id,
                      item.quantity + 1
                    )
                  }
                  disabled={
                    item.quantity === item.product.stock
                  }
                >
                  +
                </Button>

              </div>

            </div>

            <div className="flex flex-col justify-between">

              <Button
                variant="destructive"
                onClick={() =>
                  removeProduct(item.product._id)
                }
              >
                Remove
              </Button>

            </div>

          </div>

        ))}

      </div>

      {/* Total */}

      <div className="mt-10 border-t pt-5 flex justify-between">

        <h2 className="text-2xl font-bold">
          Total
        </h2>

        <h2 className="text-2xl font-bold">
          ₹ {cart.totalPrice}
        </h2>

      </div>

        <Link to={'/products'} >
        <Button className="mt-3">BacK</Button>
        </Link>

    </div>
  );
}

export default Cart;