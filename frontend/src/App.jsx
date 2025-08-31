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

function App() {  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
     
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
    </Routes>
    </>
  );
}

export default App
