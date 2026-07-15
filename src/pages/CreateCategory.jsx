import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { createCategory } from "@/services/categoryAPI";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

function CreateCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

 async function submitHandler(event) {
  event.preventDefault();

  console.log("Submit Clicked");

  try {
    setLoading(true);

    const response = await createCategory(formData);

    console.log("Success:", response.data);

    toast.success(response.data.message);

    navigate("/categories");
  } catch (error) {
    console.log("Catch Block Reached");
    console.log(error);
    console.log(error.response);

    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-xl mx-auto mt-10 p-5">

      <h1 className="text-3xl font-bold mb-8">
        Create Category
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <div>
          <Label>Name</Label>

          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Enter Category Name"
          />
        </div>

        <div>
          <Label>Description</Label>

          <Textarea
            name="description"
            value={formData.description}
            onChange={changeHandler}
            placeholder="Enter Description"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Category"}
        </Button>



     <Link to='/categories'>
        <Button
          type="submit"
          className="w-full "
          disabled={loading}
        >
          {loading
            ? "Cancelling..."
            : "Cancel"}
        </Button>

     </Link>

        

      </form>
    </div>
  );
}

export default CreateCategory;