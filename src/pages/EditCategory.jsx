import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleCategory, updateCategory } from "@/services/categoryAPI";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Loader from "../components/Loader";
import toast from "react-hot-toast";

function EditCategory() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  async function fetchCategory() {
    try {
      const response = await getSingleCategory(id);

      setFormData({
        name: response.data.data.name,
        description: response.data.data.description,
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch category");
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCategory();
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

    if (!formData.name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    try {
      await updateCategory(id, formData);

      toast.success("Category Updated Successfully");

      navigate("/categories");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update category"
      );
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Edit Category
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >

        <div>
          <Label>Name</Label>

          <Input
            name="name"
            value={formData.name}
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

        <Button className="w-full" type="submit">
          Update Category
        </Button>

      </form>

    </div>
  );
}

export default EditCategory;