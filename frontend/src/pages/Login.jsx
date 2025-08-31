// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/users/login",
//         { email, password }
//       );

//       // data = {_id, name, email, token}
//       localStorage.setItem("token", data.token);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ _id: data._id, name: data.name, email: data.email })
//       );

//       setMessage("Login successful!");
//       navigate("/profile"); // redirect to profile
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: 400 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", margin: "8px 0", padding: "8px" }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ width: "100%", margin: "8px 0", padding: "8px" }}
//         />
//         <button type="submit" style={{ padding: "8px 12px" }}>
//           Login
//         </button>
//       </form>
//       {message && <p style={{ marginTop: 12 }}>{message}</p>}
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) { // receive setUser from App.jsx
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      // Save user and token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, name: data.name, email: data.email })
      );

      // Update global user state
      setUser({ _id: data._id, name: data.name, email: data.email });

      setMessage("Login successful!");
      navigate("/profile"); // redirect to profile
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
      >
        Login
      </button>
    </form>

    {message && (
      <p className="text-center text-sm text-red-500 mt-4">{message}</p>
    )}

    <p className="text-center text-sm text-gray-600 mt-6">
      Don’t have an account?{" "}
      <a href="/register" className="text-blue-600 hover:underline font-medium">
        Register
      </a>
    </p>
  </div>
</div>

  );
}

export default Login;

