import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist.jsx";
import Chatbot from"./components/Chatbot.jsx";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";


function App() {  
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [user, setUser] = useState(() => {
  const token = sessionStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    return JSON.parse(storedUser);
  } else {
    localStorage.removeItem("user"); 
    return null;
  }
});
  return (
    <>
    <Navbar user={user} setUser={setUser}/>
    <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<PrivateRoute user={user}><Profile/></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute user={user}><Cart /></PrivateRoute>} />
         <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<PrivateRoute user={user}><Checkout /></PrivateRoute>} />
        <Route path="/myorders" element={<PrivateRoute user={user}><MyOrders /></PrivateRoute>}/>
        <Route path="/admin" element={<AdminRoute user={user}><AdminDashboard /></AdminRoute>}/>
        <Route path="/admin/products" element={<AdminRoute user={user}><AdminProducts /></AdminRoute>}/>
        <Route path="/admin/orders" element={<AdminRoute user={user}><AdminOrders /></AdminRoute>}/>
        <Route path="/admin/users" element={<AdminRoute user={user}><AdminUsers /></AdminRoute>}/>
    </Routes>
    <Chatbot />
    </>
  );
}

export default App
