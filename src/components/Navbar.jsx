import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { ROLES } from "@/utils/constants";
import { logoutAPI } from "@/services/authAPI";
import { ShoppingCart } from 'lucide-react';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

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
            <Link to="/product/details" className="text-center font-semibold text-lg ">Welcome to Shop store</Link>
                <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <Link to="/cart">
                            <ShoppingCart size={32} color="black" />
                        </Link>

                        {user.role === ROLES.ADMIN && (
                            <Link to="/admin/dashboard">
                                <Button variant="outline">Admin Dashboard</Button>
                            </Link>
                        )}

                        <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user.firstName}</span>
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