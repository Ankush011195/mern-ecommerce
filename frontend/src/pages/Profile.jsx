// import { useState, useEffect } from "react";
// import API from "../api";

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = sessionStorage.getItem("token");

//         if (!token) {
//           setMessage("⚠️ You are not logged in");
//           return;
//         }

//         const { data } = await API.get("/users/profile",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("Fetched Profile Data:", data); // 👈 Check this

//         setUser(data);
//         setForm({ name: data.name, email: data.email, password: "" });
//       } catch (error) {
//         setMessage(error.response?.data?.message || "❌ Failed to load profile");
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = sessionStorage.getItem("token");
//       const { data } = await API.put("/users/profile",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Updated Profile Response:", data); // 👈 Check this

//       setUser(data);
//       setMessage("✅ Profile updated successfully!");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "❌ Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (message && !user)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-red-500 text-lg font-medium">{message}</p>
//       </div>
//     );

//   if (!user)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-500 text-lg">Loading profile...</p>
//       </div>
//     );

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           👤 My Profile
//         </h2>

//         {/* Current Info */}
//         <div className="space-y-2 mb-6">
//           <p>
//             <span className="font-semibold text-gray-700">Name:</span>{" "}
//             {user.name}
//           </p>
//           <p>
//             <span className="font-semibold text-gray-700">Email:</span>{" "}
//             {user.email}
//           </p>
//         </div>

//         {/* Update Form */}
//         <form onSubmit={handleUpdate} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Update name"
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Update email"
//           />
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="New password (optional)"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>

//         {message && (
//           <p className="mt-4 text-center text-sm text-green-600">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useState, useEffect } from "react";
import API from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) { setMessage("Please login first"); return; }
        const { data } = await API.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setForm({ name: data.name, email: data.email, password: "" });
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await API.put("/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setMsgType("success");
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMsgType("error");
      setMessage(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (!user && !message) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-10 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4"/>
        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto mb-2"/>
        <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto mb-8"/>
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-11 bg-gray-100 rounded-xl"/>)}
        </div>
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12"
         style={{ animation: "fadeIn 0.4s ease" }}>

      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-10"
           style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1)" }}>

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500
                         flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-medium text-gray-900 text-center">{user.name}</h2>
        <p className="text-sm text-gray-400 text-center mt-1 mb-6">{user.email}</p>

        {/* Info card */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-2">
          {[
            ["Account type", "Customer"],
            ["Status", "Active"],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between items-center py-1.5
                                         border-b border-gray-100 last:border-0">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-xs font-medium text-gray-900">{val}</span>
            </div>
          ))}
        </div>

        {/* Update form */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          Update Profile
        </p>
        <form onSubmit={handleUpdate} className="space-y-3">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Full name"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                         text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                         focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
            <input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                         text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                         focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
            <input
              type="password" name="password" value={form.password} onChange={handleChange}
              placeholder="New password (optional)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                         text-sm focus:outline-none focus:border-indigo-500 focus:bg-white
                         focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
          </div>

          <button
            type="submit" disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all
              ${loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:opacity-85 hover:scale-[1.01] active:scale-[0.98]"
              }`}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {message && (
          <div className={`mt-4 text-center text-sm px-4 py-3 rounded-xl
            ${msgType === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"}`}
               style={{ animation: "fadeUp 0.3s ease" }}>
            {message}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default Profile;
