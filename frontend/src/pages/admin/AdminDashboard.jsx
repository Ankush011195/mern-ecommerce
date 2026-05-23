// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const { data } = await API.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const cards = stats ? [
    { label: "Total Users",    value: stats.totalUsers,    icon: "👥", to: "/admin/users",    color: "bg-blue-50 border-blue-200" },
    { label: "Total Orders",   value: stats.totalOrders,   icon: "🛒", to: "/admin/orders",   color: "bg-amber-50 border-amber-200" },
    { label: "Total Products", value: stats.totalProducts, icon: "📦", to: "/admin/products", color: "bg-purple-50 border-purple-200" },
    { label: "Revenue",        value: `₹${stats.revenue?.toLocaleString()}`, icon: "💰", to: "/admin/orders", color: "bg-green-50 border-green-200" },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back, Admin 👋</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="h-8 w-8 bg-gray-100 rounded-xl mb-4"/>
                <div className="h-7 bg-gray-100 rounded w-1/2 mb-2"/>
                <div className="h-4 bg-gray-100 rounded w-3/4"/>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {cards.map((card, i) => (
              <Link key={i} to={card.to}
                    className={`bg-white border rounded-2xl p-6 hover:-translate-y-1
                                hover:shadow-md transition-all duration-200 ${card.color}`}
                    style={{ animation: `fadeUp 0.5s ${i*0.08}s cubic-bezier(0.22,1,0.36,1) both` }}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="text-sm text-gray-500 mt-1">{card.label}</div>
              </Link>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { to: "/admin/products", icon: "📦", title: "Manage Products", sub: "Add, edit, delete products" },
            { to: "/admin/orders",   icon: "🛒", title: "Manage Orders",   sub: "View and deliver orders" },
            { to: "/admin/users",    icon: "👥", title: "Manage Users",    sub: "View and delete users" },
          ].map((item, i) => (
            <Link key={i} to={item.to}
                  className="bg-white border border-gray-100 rounded-2xl p-6
                             hover:-translate-y-1 hover:shadow-md hover:border-gray-200
                             transition-all duration-200"
                  style={{ animation: `fadeUp 0.5s ${i*0.08+0.3}s cubic-bezier(0.22,1,0.36,1) both` }}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-900">{item.title}</div>
              <div className="text-xs text-gray-400 mt-1">{item.sub}</div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default AdminDashboard;