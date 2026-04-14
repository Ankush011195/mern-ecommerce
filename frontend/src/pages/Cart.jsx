import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const savedCart = localStorage.getItem(`cart_${user?._id}`);
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updatedCart);
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center md:justify-between bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4 w-full md:w-2/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
                <div className="mt-2">
                  Quantity:{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) => updateQuantity(item._id, e.target.value)}
                    className="border rounded px-2 py-1 w-16 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">
          Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </h3>
        <button
          onClick={handleCheckout}
          className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
