import Login from "@/pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";
import Products from "@/pages/Products"
import CreateProduct from "@/pages/CreateProduct";
import SingleProduct from "@/pages/SingleProduct";
import EditProduct from "@/pages/EditProduct";
import Categories from "@/pages/Categories";
import CreateCategory from "@/pages/CreateCategory";
import EditCategory from "@/pages/EditCategory";
import Cart from "@/pages/Cart";

function AppRoutes({ setUser,cart,setCart,updateQuantity, removeProduct,clearCart} ) {
    return (
        <Routes>
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} updateQuantity={updateQuantity} removeProduct={removeProduct} clearCart={clearCart}/>}/>
            <Route path="/edit-category/:id" element={<EditCategory/>}/>
            <Route path="/create-category" element={<CreateCategory/>}/>
            <Route path="/categories" element={<Categories />}/>
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />

        </Routes>
    )
}
export default AppRoutes