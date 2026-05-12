// // import axios from "axios";
// import { useState } from 'react';
// import { Link } from "react-router-dom";
// import API from "../api";
// function Register(){
//   const [name, setname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setmessage] = useState();

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     if (!name || !email || !password) {
//       setmessage("Please fill all fields");
//       return;
//     }
//     try {
//       const res = await API.post("/users/register",{
//         name, 
//         email,
//         password,
//       });
//       setmessage(res.data.message ||"User registered successfully")
//     } catch (error) {
//       setmessage(error.response?.data?.message || "Something went wrong")
//     }
//   };

//   return(
//    <div className="flex items-center justify-center min-h-screen bg-gray-100">
//   <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
    
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setname(e.target.value)}
//         placeholder="Enter Name"
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />

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
//         className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-300"
//       >
//         Register
//       </button>
//     </form>

//     {message && (
//       <p className="text-center text-sm text-red-500 mt-4">{message}</p>
//     )}

//     <p className="text-center text-sm text-gray-600 mt-6">
//       {/* Already have an account?{" "} */}
//        Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium" >Login</Link>
//       {/* <a href="/login" className="text-blue-600 hover:underline font-medium">
//         Login
//       </a> */}
//     </p>
//   </div>
// </div>

//   );

// }

// export default Register;

import { useState } from 'react';
import { Link } from "react-router-dom";
import API from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [strength, setStrength] = useState(0);

  const checkStrength = (val) => {
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setStrength(score);
  };

  const strengthColors = ['', '#ef4444', '#f97316', '#eab308', '#16a34a'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMsgType("error");
      setMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await API.post("/users/register", { name, email, password });
      setMsgType("success");
      setMessage(res.data.message || "Account created! Please login.");
    } catch (error) {
      setMsgType("error");
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
         style={{ animation: "fadeIn 0.4s ease" }}>

      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-10"
           style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1)" }}>

        {/* Logo */}
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

        <h2 className="text-center text-2xl font-medium text-gray-900">Create account</h2>
        <p className="text-center text-sm text-gray-400 mt-1 mb-7">Join us — it's free</p>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Name */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         focus:outline-none focus:border-indigo-500 focus:bg-white
                         focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>

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
          <div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Create password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); checkStrength(e.target.value); }}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                           focus:outline-none focus:border-indigo-500 focus:bg-white
                           focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-sm">
                {showPwd ? "🙈" : "👁"}
              </button>
            </div>

            {/* Password strength bar */}
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                         style={{ background: i <= strength ? strengthColors[strength] : '#e5e7eb' }}/>
                  ))}
                </div>
                <p className="text-xs mt-1 transition-all"
                   style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all mt-2
              ${loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]"
              }`}>
            {loading ? "Creating account..." : "Create account"}
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

        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-medium hover:underline">Sign in</Link>
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Register;
