import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import CategoryCard from "../components/CategoryCard";

import { getAllCategories, deleteCategory } from "@/services/categoryAPI";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchCategories() {
        try {
            const response = await getAllCategories();

            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch categories");
        }

        setLoading(false);
    }

    async function handleDelete(id) {
        // const confirmDelete = window.confirm(
        //   "Delete this category?"
        // );

        // if (!confirmDelete) return;

        try {
            await deleteCategory(id);

            toast.success("Category Deleted");

            fetchCategories();
        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-6xl mx-auto p-8">

            <div className="mb-5">

                <h2 className="text-gray-500">
                    Total Categories : {categories.length}
                </h2>

            </div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Categories
                </h1>

             
                 {/* <Link to="/create-category">
                    <Button>
                        Create Category
                    </Button>
                </Link> */}

                  {/* <Link to="/products">
                    <Button>
                        All Products
                    </Button>
                </Link>
             */}

            </div>

            {categories.length === 0 ? (
                <h2>No Categories Found</h2>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            category={category}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default Categories;