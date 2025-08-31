// src/pages/Home.jsx
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  // Example featured products (later you can fetch from backend)
  const featuredProducts = [
    { id: 1, name: "iPhone 15", price: "₹79,999", image: "/images/mobile.jpg" },
    { id: 2, name: "MacBook Air M2", price: "₹1,04,999", image: "/images/laptop.jpg" },
    { id: 3, name: "Gaming Headset", price: "₹4,999", image: "/images/gaming.jpg" },
  ];

  // Example reviews (can be dynamic later)
  const reviews = [
    {
      id: 1,
      user: "Amit Sharma",
      comment: "Amazing quality! Got my phone delivered in 2 days.",
    },
    {
      id: 2,
      user: "Sneha Kapoor",
      comment: "Customer support is really helpful, love the experience.",
    },
    {
      id: 3,
      user: "Rahul Verma",
      comment: "Best prices compared to other sites. Totally recommend!",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-2xl p-10 mb-8 shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyStore</h1>
        <p className="text-lg mb-6">
          Best place to buy mobiles, laptops, gaming accessories & more.
        </p>
        <a
          href="/products"
          className="bg-white text-green-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition shadow-md"
        >
          Shop Now
        </a>
      </div>

      {/* Categories Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md hover:shadow-xl transition p-4 text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">{product.price}</p>
            <a
              href={`/products/${product.id}`}
              className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              View Product
            </a>
          </div>
        ))}
      </div>

      {/* Customer Reviews */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <p className="italic text-gray-700">“{review.comment}”</p>
            <h4 className="mt-3 font-semibold text-green-600">
              - {review.user}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
