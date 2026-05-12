// import { Link, useNavigate } from "react-router-dom";

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     localStorage.removeItem("user");
//     if (user?._id) {
//     localStorage.removeItem(`cart_${user._id}`);
//   }
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-800 shadow-md sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-white">
//           Gadget Store
//         </Link>

//         {/* Nav Links */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link
//             to="/"
//             className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
//           >
//             Home
//           </Link>
//           <Link
//             to="/products"
//             className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
//           >
//             Products
//           </Link>

//           {user ? (
//             <>
//               <Link
//                 to="/profile"
//                 className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
//               >
//                 Profile
//               </Link>
//               <Link
//                 to="/cart"
//                 className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition"
//               >
//                 Cart
//               </Link>
//                <Link to="/wishlist" className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition">Wishlist</Link>
//                <Link to="/myorders" className="text-gray-200 hover:text-white px-3 py-2 rounded-lg transition">myOrders</Link>

//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button className="text-white text-2xl font-bold">☰</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    if (user?._id) localStorage.removeItem(`cart_${user._id}`);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50"
         style={{ animation: "fadeDown 0.4s ease" }}>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — Option 4 */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center
                          group-hover:rotate-[-6deg] group-hover:scale-105 transition-transform duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">
            Gadget<span className="text-indigo-500">Store</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900
                                   hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium text-gray-500 hover:text-gray-900
                                           hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
            Products
          </Link>
          {user && (
            <>
              <Link to="/profile" className="text-sm font-medium text-gray-500 hover:text-gray-900
                                              hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
                Profile
              </Link>
              <Link to="/myorders" className="text-sm font-medium text-gray-500 hover:text-gray-900
                                               hover:bg-gray-100 px-3 py-2 rounded-lg transition-all">
                My Orders
              </Link>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {/* Wishlist Icon */}
              <Link to="/wishlist"
                    className="w-9 h-9 flex items-center justify-center rounded-xl
                               text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </Link>

              {/* Cart Icon */}
              <Link to="/cart"
                    className="relative w-9 h-9 flex items-center justify-center rounded-xl
                               text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {/* Cart count badge — apna state se count dalo */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white
                                  text-[9px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <div className="w-px h-5 bg-gray-200 mx-1"></div>

              {/* User chip */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-gray-100 border border-gray-200">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center
                                 justify-content center text-white text-[10px] font-bold
                                 flex items-center justify-center">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-800">{user.name}</span>
              </div>

              {/* Logout */}
              <button onClick={handleLogout}
                      className="text-sm font-medium px-3 py-2 rounded-lg border border-red-200
                                 text-red-500 hover:bg-red-50 transition-all">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register"
                    className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200
                               text-gray-700 hover:bg-gray-50 transition-all">
                Register
              </Link>
              <Link to="/login"
                    className="text-sm font-medium px-4 py-2 rounded-lg bg-black text-white
                               hover:opacity-85 hover:scale-[1.02] transition-all active:scale-95">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                           hover:bg-gray-100 transition text-gray-700"
                onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-3 space-y-1 bg-white"
             style={{ animation: "fadeUp 0.2s ease" }}>
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            ...(user ? [
              { to: "/profile", label: "Profile" },
              { to: "/cart", label: "Cart" },
              { to: "/wishlist", label: "Wishlist" },
              { to: "/myorders", label: "My Orders" },
            ] : []),
          ].map(({ to, label }) => (
            <Link key={to} to={to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-600
                             hover:text-gray-900 hover:bg-gray-50 rounded-lg transition">
              {label}
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-100 flex gap-2">
            {user ? (
              <button onClick={handleLogout}
                      className="w-full py-2.5 text-sm font-medium rounded-lg border
                                 border-red-200 text-red-500 hover:bg-red-50 transition">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg
                                 bg-black text-white hover:opacity-85 transition">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg
                                 border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-10px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(-6px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
