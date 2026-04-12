// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api"; // ✅ import API instance

// function Checkout() {
//   const navigate = useNavigate();
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [country, setCountry] = useState("");

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must login first");
//       navigate("/login");
//       return;
//     }

//     const orderItems = cart.map((item) => ({
//       name: item.name,
//       qty: item.quantity, // ✅ backend expects qty
//       price: item.price,
//       product: item._id, // ✅ backend expects product id
//       image: item.image,
//     }));

//     try {
//       const { data } = await API.post(
//         "/orders",
//         {
//           orderItems,
//           shippingAddress: { address, city, postalCode, country },
//           paymentMethod: "Cash",
//           totalPrice,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Order response:", data);

//       alert("Order placed successfully!");
//       localStorage.removeItem("cart");
//       navigate("/myorders");
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Server error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Checkout
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <input
//             type="text"
//             placeholder="City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Postal Code"
//             value={postalCode}
//             onChange={(e) => setPostalCode(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Country"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <h3 className="text-xl font-semibold text-gray-700 mt-4">
//             Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
//           </h3>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300"
//           >
//             Place Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Checkout;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ==============================
  // 💰 OLD CASH ORDER (UNCHANGED)
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first");
      navigate("/login");
      return;
    }

    const orderItems = cart.map((item) => ({
      name: item.name,
      qty: item.quantity,
      price: item.price,
      product: item._id,
      image: item.image,
    }));

    try {
      const { data } = await API.post(
        "/orders",
        {
          orderItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod: "Cash",
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Cash Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/myorders");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  // ==============================
  // 💳 NEW RAZORPAY PAYMENT
  // ==============================
  const handlePayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.post("/payment/create-order", {
        amount: totalPrice,
      });

      const options = {
        key: "rzp_test_ScIAFYzK9Nd6M7",
        amount: data.amount,
        currency: "INR",
        name: "MERN Store",
        description: "Payment",
        order_id: data.id,

        handler: async function (response) {
          console.log("Payment Success:", response);

          const orderItems = cart.map((item) => ({
            name: item.name,
            qty: item.quantity,
            price: item.price,
            product: item._id,
            image: item.image,
          }));

          // save order as PAID
          await API.post(
            "/orders",
            {
              orderItems,
              shippingAddress: { address, city, postalCode, country },
              paymentMethod: "Razorpay",
              totalPrice,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          alert("Payment Successful 🎉");
          localStorage.removeItem("cart");
          navigate("/myorders");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <h3 className="text-xl font-semibold">
            Total: ₹{totalPrice}
          </h3>

          {/* CASH */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Place Order (Cash)
          </button>

          {/* RAZORPAY */}
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Pay Now (Razorpay)
          </button>

        </form>
      </div>
    </div>
  );
}

export default Checkout;
