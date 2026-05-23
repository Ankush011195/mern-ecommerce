import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }) => {
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default AdminRoute;