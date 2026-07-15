import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleProduct, updateProduct } from "@/services/productAPI";
import { getAllCategories } from "@/services/categoryAPI";
import Loader from "../components/Loader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    images: "",
    category: "",
  });

  async function fetchData() {
    try {
      const productResponse = await getSingleProduct(productId);

      const categoryResponse = await getAllCategories();

      const product = productResponse.data.data;

      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images[0],
        category: product.category._id,
      });

      setCategories(categoryResponse.data.data);
      
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch product");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: [formData.images],
    };

    try {
      await updateProduct(productId, productData);

      toast.success("Product Updated Successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update product"
      );
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <div>
          <Label>Title</Label>

          <Input
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label>Description</Label>

          <Textarea
            name="description"
            value={formData.description}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label>Price</Label>

          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label>Stock</Label>

          <Input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label>Image URL</Label>

          <Input
            name="images"
            value={formData.images}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label>Category</Label>

          <select
            className="w-full border rounded-md p-2"
            name="category"
            value={formData.category}
            onChange={changeHandler}
          >
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Button className="w-full" type="submit">
          Update Product
        </Button>
      </form>
    </div>
  );
}

export default EditProduct;