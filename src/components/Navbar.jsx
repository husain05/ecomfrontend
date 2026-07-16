import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ROLES } from "@/utils/constants";
import { logoutAPI } from "@/services/authAPI";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { useContext } from "react";
import {CartContext} from "@/context/CartContext";

function Navbar({ user, setUser }) {
  const { cart } = useContext(CartContext);
  console.log("Navbar Cart:", cart);

  const navigate = useNavigate();
  const location = useLocation();

  const isCreatePage = location.pathname === "/create-product";
  const iscreateCategory = location.pathname === "/create-category";
  const isAllProduct = location.pathname === "/products";

  const handleLogout = async () => {
    try {
      const response = await logoutAPI();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setUser(null);

      toast.success(response.data.message);

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 h-16 border-b navbar">
      <div className="text-center font-semibold text-lg flex gap-2 select-none">
        <ShoppingBag size={25} color="red" />
        <i className="heading">Welcome to Ecommerce Shop Application</i>
      </div>

      <div className="flex items-center gap-3">

        {user ? (
          <>
            {user.role !== ROLES.ADMIN && (
            <Link to="/cart" className="relative inline-block">
  <ShoppingCart size={32} color="red" />

  {cart?.items?.length > 0 && (
    <span
      className="absolute -top-2 -right-2 bg-red-500 text-white
                 text-xs rounded-full w-5 h-5 flex items-center justify-center"
    >
      {cart.items.length}
    </span>
  )}
</Link>
            )}

            {user.role === ROLES.ADMIN && (
              <>
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
              </>
            )}

            <span className="text-sm text-muted-foreground hidden sm:inline">
              <b className="text-black">Hi, {user.firstname}</b>
            </span>

            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline" className="login">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button className="signup">
                Signup
              </Button>
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;