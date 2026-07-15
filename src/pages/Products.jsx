import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

import { getAllProducts, deleteProduct} from "@/services/productAPI";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const response =
        await getAllProducts();

      setProducts(response.data.data);
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch products");
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {

    try {
      await deleteProduct(id);

      toast.success(
        "Product Deleted Successfully"
      );

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message
      );
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Products
        </h1>


      </div>

      <p className="mb-6 text-gray-500">
        Total Products :
        {" "}
        {products.length}
      </p>

      {products.length === 0 ? (
        <h2 className="text-center text-3xl">
          No Products Found
        </h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Products;