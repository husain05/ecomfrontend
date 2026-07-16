import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token) {
    return user?.role === "Admin"
      ? <Navigate to="/categories" replace />
      : <Navigate to="/products" replace />;
  }

  return children;
};
export default PublicRoute