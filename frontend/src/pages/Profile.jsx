import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("⚠️ You are not logged in");
          return;
        }

        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(data);
        setForm({ name: data.name, email: data.email, password: "" });
      } catch (error) {
        setMessage(error.response?.data?.message || "❌ Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data);
      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (message && !user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">{message}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          👤 My Profile
        </h2>

        {/* Current Info */}
        <div className="space-y-2 mb-6">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {user.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {user.email}
          </p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Update name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Update email"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="New password (optional)"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
