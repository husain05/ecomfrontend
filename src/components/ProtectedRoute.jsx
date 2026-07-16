import { ROLES } from "@/utils/constants";
import { Navigate } from "react-router-dom";
import UnauthorizedRoute from "./UnauthorizedRoute";

const ProtectedRoute = ({ children, adminOnly = false }) => {
console.log("ProtectedRoute Rendered");
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("token",token)
  console.log(user)

  if (!token) { 
    return <Navigate to="/login" replace />; // 1-2-3 replace 3-2-1 , without replace 1-2-3 , 3-1
  }

  if (adminOnly && user?.role !== ROLES.ADMIN) {
    return <UnauthorizedRoute/>;
  }

  return children;
};

export default ProtectedRoute;