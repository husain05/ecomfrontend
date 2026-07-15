import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { getSingleProduct } from "@/services/productAPI";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import toast from "react-hot-toast";

function SingleProduct() {
  const { id } = useParams();
console.log("Product ID:", id);
console.log("Current URL:", window.location.pathname);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    try {
      const response = await getSingleProduct(id);

      setProduct(response.data.data);
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to fetch product"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <h2 className="text-center text-3xl mt-10">
        Product Not Found
      </h2>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <Card>

        <CardContent className="grid md:grid-cols-2 gap-8 p-8">

          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />

          <div className="space-y-5">

            <h1 className="text-4xl font-bold">
              {product.title}
            </h1>

            <p className="text-gray-600">
              {product.description}
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              ₹ {product.price}
            </h2>

            <p className="text-lg">
              <strong>Stock :</strong> {product.stock}
            </p>

            <p className="text-lg">
              <strong>Category :</strong>{" "}
              {product.category?.name}
            </p>

            <p className="text-lg">
              <strong>Slug :</strong>{" "}
              {product.category?.slug}
            </p>

            <Button
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

export default SingleProduct;