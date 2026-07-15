import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { ShoppingCart } from "lucide-react";
import { ROLES } from "@/utils/constants";
import { addCartAPI } from "@/services/cartAPI";
import toast from "react-hot-toast";

function ProductCard({ product, onDelete }) {

    const storedUser = localStorage.getItem("user");
    console.log("storedUser ? :", storedUser)
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log("user ? :", user)
    const isAdmin = user?.role === ROLES.ADMIN;
    console.log("isAdmin ? :", isAdmin)

    const [quantity, setQuantity] = useState(1);
    // for adding product to cart 
    const addToCart = async (productId) => {
        try {
            const response = await addCartAPI({
                productId,
                quantity,
            });
            toast.success(response.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to add product");
        }
    };

    return (
        <Card className="overflow-hidden">

            <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-60 object-cover"
            />

            <CardContent className="space-y-3 mt-4">

                <h2 className="text-2xl font-bold">
                    {product.title}
                </h2>

                <p className="text-gray-500">
                    {product.description}
                </p>

                <h3 className="font-semibold text-xl">
                    ₹ {product.price}
                </h3>

                <p>
                    Stock : {product.stock}
                </p>

                <p>
                    Category :
                    {" "}
                    {product.category?.name}
                </p>

                <div className="flex gap-2">

                    <Link
                        to={`/product/${product._id}`}
                    >
                        <Button type="submit">
                            View
                        </Button>
                    </Link>

                    {isAdmin && (
                        <>

                            <Link
                                to={`/edit-product/${product._id}`}
                            >
                                <Button variant="secondary">
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                variant="destructive"
                                onClick={() =>
                                    onDelete(product._id)
                                }
                            >
                                Delete
                            </Button>

                        </>
                    )
                    }

                    {!isAdmin && (
                        <>
                
                            <div className="flex items-center gap-2 my-2">

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        quantity > 1 && setQuantity(quantity - 1)
                                    }
                                >
                                    -
                                </Button>

                                <span className="w-8 text-center">
                                    {quantity}
                                </span>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        quantity < product.stock &&
                                        setQuantity(quantity + 1)
                                    }
                                >
                                    +
                                </Button>

                            </div>
                            {/* Add To Cart Button */}
                            <Button
                                onClick={() => addToCart(product._id)}
                               
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add To Cart
                            </Button>

                        </>
                    )}
                </div>

            </CardContent>

        </Card>
    );
}

export default ProductCard;