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

// import { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Login({ setUser }) { // receive setUser from App.jsx
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/users/login", { email, password });

//       // Save user and token in localStorage
//       sessionStorage.setItem("token", data.token);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ _id: data._id, name: data.name, email: data.email })
//       );

//       // Update global user state
//       setUser({ _id: data._id, name: data.name, email: data.email });

//       setMessage("Login successful!");
//       navigate("/profile"); // redirect to profile
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//    <div className="flex items-center justify-center min-h-screen bg-gray-100">
//   <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
    
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />
      
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />
      
//       <button
//         type="submit"
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
//       >
//         Login
//       </button>
//     </form>

//     {message && (
//       <p className="text-center text-sm text-red-500 mt-4">{message}</p>
//     )}

//     <p className="text-center text-sm text-gray-600 mt-6">
//         Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
//       {/* Don’t have an account?{" "}
//       <a href="/register" className="text-blue-600 hover:underline font-medium">
//         Register
//       </a> */}
//     </p>
//   </div>
// </div>

//   );
// }

// export default Login;


import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { signInWithGoogle} from "../firebase";


function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { data } = await API.post("/users/login", { email, password });
      sessionStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        _id: data._id, name: data.name, email: data.email, isAdmin: data.isAdmin }));
      setUser({ _id: data._id, name: data.name, email: data.email , isAdmin: data.isAdmin});
      setMsgType("success");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      setMsgType("error");
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithGoogle();
    const { displayName, email, uid } = result.user;

    // Tumhare backend ko bhejo
    const { data } = await API.post("/users/google-login", {
      name: displayName,
      email: email,
      googleId: uid,
    });

    // Same as normal login
    sessionStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
    }));
    setUser({ _id: data._id, name: data.name, email: data.email, isAdmin: data.isAdmin });
    setMsgType("success");
    setMessage("Login successful!");
    setTimeout(() => navigate("/profile"), 1000);

  } catch (err) {
    setMsgType("error");
    setMessage("Google login failed. Try again!");
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
         style={{ animation: "fadeIn 0.4s ease" }}>

      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-10"
           style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1)" }}>

       <Link to="/" className="flex items-center gap-2 justify-center mb-5">
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-gray-900">
          Gadget<span className="text-indigo-500">Store</span>
        </span>
      </Link>

        <h2 className="text-center text-2xl font-medium text-gray-900">Welcome back</h2>
        <p className="text-center text-sm text-gray-400 mt-1 mb-7">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         focus:outline-none focus:border-indigo-500 focus:bg-white
                         focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         focus:outline-none focus:border-indigo-500 focus:bg-white
                         focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-sm">
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-indigo-500 hover:opacity-70 transition">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all
              ${loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]"
              }`}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className={`mt-4 text-center text-sm px-4 py-3 rounded-xl
            ${msgType === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"}`}
               style={{ animation: "fadeUp 0.3s ease" }}>
            {message}
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* google */}
       <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-xl border border-gray-200 text-sm font-medium
                    flex items-center justify-center gap-2 hover:bg-gray-50
                    transition-all hover:scale-[1.01] active:scale-[0.98]">
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.8 13 18 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
            <path fill="#FBBC05" d="M10.8 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7L2.5 13.3A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.3-5.9z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6 0-11.1-4-12.9-9.4l-8 6.2C6.8 42.5 14.8 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 font-medium hover:underline">Create one</Link>
        </p>
      </div>

      {/* Global animations - index.css mein daal do */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Login;
