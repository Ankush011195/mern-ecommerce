import axios from "axios";
import { useState } from 'react';

function Register(){
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register",{
        name,
        email,
        password,
      });
      setmessage(res.data.message ||"User registered successfully")
    } catch (error) {
      setmessage(error.response?.data?.message || "Something went wrong")
    }
  };

  return(
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
        placeholder="Enter Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

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
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-300"
      >
        Register
      </button>
    </form>

    {message && (
      <p className="text-center text-sm text-red-500 mt-4">{message}</p>
    )}

    <p className="text-center text-sm text-gray-600 mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-blue-600 hover:underline font-medium">
        Login
      </a>
    </p>
  </div>
</div>

  );

}

export default Register;
