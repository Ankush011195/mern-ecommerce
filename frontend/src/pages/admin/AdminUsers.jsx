// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import API from "../../api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const { data } = await API.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const token = sessionStorage.getItem("token");
      await API.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (e) { console.log(e); }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-900 mb-8">
          All Users <span className="text-gray-400 text-lg font-normal">({users.length})</span>
        </h1>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Avatar","Name","Email","Role","Action"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, i) => (
                <tr key={user._id} className="hover:bg-gray-50 transition"
                    style={{ animation: `fadeUp 0.4s ${i*0.04}s both` }}>
                  <td className="px-5 py-4">
                    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center
                                     justify-center text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                      ${user.isAdmin
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "bg-gray-100 text-gray-600"}`}>
                      {user.isAdmin ? "👑 Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {!user.isAdmin && (
                      <button onClick={() => deleteUser(user._id)}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg
                                         border border-red-200 text-red-500
                                         hover:bg-red-50 transition">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default AdminUsers;