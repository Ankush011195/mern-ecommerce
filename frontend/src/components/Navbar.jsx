import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    if (user?._id) {
    localStorage.removeItem(`cart_${user._id}`);
  }
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Gadget Store
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
          >
            Products
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
              >
                Profile
              </Link>
              <Link
                to="/cart"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
              >
                Cart
              </Link>
               <Link to="/wishlist" className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition">Wishlist</Link>
               <Link to="/myorders" className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition">myOrders</Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white text-2xl font-bold">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
