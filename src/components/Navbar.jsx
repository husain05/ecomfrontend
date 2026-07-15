import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { ROLES } from "@/utils/constants";
import { logoutAPI } from "@/services/authAPI";
import { ShoppingCart } from 'lucide-react';
import { ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isCreatePage = location.pathname === `/create-product`
    const iscreateCategory=location.pathname==='/create-category'
    const isAllProduct=location.pathname==='/products'

    const handleLogout = async () => {
        try {
            const response = await logoutAPI();
            toast.success(response.data.message);
            setUser(null);
            navigate('/login');
        }
        catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <nav className="flex justify-between items-center px-6 h-16 border-b">
            <div className="text-center font-semibold text-lg flex gap-2 select-none"><ShoppingBag size={25} color="black" /> Welcome to Ecommerce Shop Application</div>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        {user.role !== ROLES.ADMIN && <Link to="/cart">
                            <ShoppingCart size={32} color="black" />
                        </Link>}

                        {user.role === ROLES.ADMIN && (


                            <div className="flex justify-between items-center gap-2">

                                <Button
                                    onClick={() =>
                                        isCreatePage
                                            ? navigate("/categories")
                                            : navigate("/create-product")
                                    }
                                >
                                    {isCreatePage ? "Cancel" : "Create Product"}
                                </Button>
                                
                                <Button
                                    onClick={() =>
                                        iscreateCategory
                                            ? navigate("/categories")
                                            : navigate("/create-category")
                                    }
                                >
                                    {iscreateCategory ? "Cancel" : "Create Category"}
                                    </Button>



                                    <Button
                                    onClick={() =>
                                        isAllProduct
                                            ? navigate("/categories")
                                            : navigate("/products")
                                    }
                                >
                                    {isAllProduct ? "Back to Categories" : "All Products"}
                                    </Button>

                                <Button variant="outline">Admin Panel</Button>
                            </div>




                        )}

                        <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user.firstname}</span>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Signup</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar