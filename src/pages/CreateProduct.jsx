
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProductAPI } from "@/services/productAPI";
import { getAllCategories } from "@/services/categoryAPI";
import toast from "react-hot-toast";


function CreateProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    images: "",
    category: "",
  });

  async function fetchCategories() {
    try {
      const response = await getAllCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }1

  async function handleSubmit(event) {
    event.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: [formData.images],
    };

    try {
      await createProductAPI(productData);

      toast.success("Product Created Successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
    return (
        <div className="max-w-xl mx-auto mt-10">

        <h1 className="text-3xl font-bold mb-6">Create Product </h1>

        <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

         <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="descrition"
            value={formData.description}
            onChange={handleChange}
          />
        </div>


           <div>
          <Label htmlFor="price">Price</Label>

          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

         <div>
          <Label htmlFor="stock">Stock</Label>

          <Input
            type="number"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>



             <div>
          <Label htmlFor="images">Image URL</Label>

          <Input
            name="images" 
            id="images"
            value={formData.images}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>

          <select
            className="w-full border rounded-md p-2"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">
              Select Category
            </option>

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
          Create Product
        </Button>


        </form>

        </div>
    )
}

export default CreateProduct