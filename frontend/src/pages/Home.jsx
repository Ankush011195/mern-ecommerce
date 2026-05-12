// // src/pages/Home.jsx
// import { categories } from "../data/categories";
// import CategoryCard from "../components/CategoryCard";

// const Home = () => {
//   // Example featured products (later you can fetch from backend)
//   const featuredProducts = [
//     { id: 1, name: "iPhone 15", price: "₹79,999", image: "https://cdn.mos.cms.futurecdn.net/yDn3ZSXu9eSBxmXQDZ4PCF.jpg" },
//     { id: 2, name: "MacBook Air M2", price: "₹1,04,999", image: "https://i.ytimg.com/vi/HTiBSG7E474/maxresdefault.jpg" },
//     { id: 3, name: "Gaming Headset", price: "₹4,999", image: "https://kreo-tech.com/cdn/shop/files/Artboard_1_9.png?v=1753673089" },
//   ];

//   // Example reviews (can be dynamic later)
//   const reviews = [
//     {
//       id: 1,
//       user: "Amit Sharma",
//       comment: "Amazing quality! Got my phone delivered in 2 days.",
//     },
//     {
//       id: 2,
//       user: "Sneha Kapoor",
//       comment: "Customer support is really helpful, love the experience.",
//     },
//     {
//       id: 3,
//       user: "Rahul Verma",
//       comment: "Best prices compared to other sites. Totally recommend!",
//     },
//   ];

//   return (
//     <div className="container mx-auto p-6">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-2xl p-10 mb-8 shadow-lg text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to MyStore</h1>
//         <p className="text-lg mb-6">
//           Best place to buy mobiles, laptops, gaming accessories & more.
//         </p>
//         <a
//           href="/products"
//           className="bg-white text-green-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition shadow-md"
//         >
//           Shop Now
//         </a>
//       </div>

//       {/* Categories Section */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//         Shop by Category
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
//         {categories.map((category) => (
//           <CategoryCard key={category.slug} category={category} />
//         ))}
//       </div>

//       {/* Featured Products */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//         Featured Products
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
//         {featuredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg shadow-md hover:shadow-xl transition p-4 text-center"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-40 object-cover rounded-md"
//             />
//             <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
//             <p className="text-green-600 font-bold">{product.price}</p>
//             <a
//               href={`/products/${product.id}`}
//               className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               View Product
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Customer Reviews */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//         What Our Customers Say
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className="border rounded-lg p-4 shadow-sm bg-gray-50"
//           >
//             <p className="italic text-gray-700">“{review.comment}”</p>
//             <h4 className="mt-3 font-semibold text-green-600">
//               - {review.user}
//             </h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  const featuredProducts = [
    { id: 1, name: "iPhone 15", price: "₹79,999", image: "https://cdn.mos.cms.futurecdn.net/yDn3ZSXu9eSBxmXQDZ4PCF.jpg" },
    { id: 2, name: "MacBook Air M2", price: "₹1,04,999", image: "https://i.ytimg.com/vi/HTiBSG7E474/maxresdefault.jpg" },
    { id: 3, name: "Gaming Headset", price: "₹4,999", image: "https://kreo-tech.com/cdn/shop/files/Artboard_1_9.png?v=1753673089" },
  ];

  const reviews = [
    { id: 1, user: "Amit Sharma", comment: "Amazing quality! Got my phone delivered in 2 days." },
    { id: 2, user: "Sneha Kapoor", comment: "Customer support is really helpful, love the experience." },
    { id: 3, user: "Rahul Verma", comment: "Best prices compared to other sites. Totally recommend!" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-7xl mx-auto"
         style={{ animation: "fadeIn 0.4s ease" }}>

      {/* ── Hero ── */}
      <div className="relative bg-[#111] rounded-3xl px-10 py-16 text-center mb-12 overflow-hidden"
           style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
        {/* glow blobs */}
        <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 -top-20 -right-16 pointer-events-none"/>
        <div className="absolute w-48 h-48 rounded-full bg-indigo-500/10 -bottom-14 -left-10 pointer-events-none"/>

        <span className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-medium
                          px-3 py-1.5 rounded-full border border-indigo-500/30 mb-4">
          New arrivals just dropped ✦
        </span>
        <h1 className="text-4xl font-semibold text-white leading-tight mb-3">
          Tech that defines<br/>your lifestyle
        </h1>
        <p className="text-gray-400 text-base mb-8">
          Mobiles, Laptops, Gaming & Wearables — all in one place
        </p>
        <Link to="/products"
              className="inline-block bg-indigo-500 text-white px-8 py-3 rounded-xl
                         font-medium hover:bg-indigo-600 hover:scale-105 transition-all">
          Shop Now →
        </Link>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-10">
          {[["50K+","Happy Customers"],["1000+","Products"],["4.9★","Avg Rating"]].map(([num,label]) => (
            <div key={label} className="text-center">
              <div className="text-xl font-semibold text-white">{num}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {[["🚚","Free Delivery","On orders above ₹999"],
          ["↩️","Easy Returns","7-day return policy"],
          ["🔒","Secure Pay","100% safe checkout"],
          ["💬","24/7 Support","Always here for you"]
        ].map(([icon, title, sub], i) => (
          <div key={i}
               className="bg-white border border-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3"
               style={{ animation: `fadeUp 0.5s ${i * 0.07}s cubic-bezier(0.22,1,0.36,1) both` }}>
            <span className="text-2xl">{icon}</span>
            <div>
              <div className="text-sm font-medium text-gray-900">{title}</div>
              <div className="text-xs text-gray-400">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Categories ── */}
      <h2 className="text-lg font-medium text-gray-900 mb-5">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
        {categories.map((category, i) => (
          <div key={category.slug}
               style={{ animation: `fadeUp 0.5s ${i * 0.06}s cubic-bezier(0.22,1,0.36,1) both` }}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>

      {/* ── Featured Products ── */}
      <h2 className="text-lg font-medium text-gray-900 mb-5">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {featuredProducts.map((product, i) => (
          <div key={product.id}
               className="group bg-white border border-gray-100 rounded-2xl overflow-hidden
                          hover:-translate-y-1 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
               style={{ animation: `fadeUp 0.5s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1) both` }}>
            <div className="overflow-hidden aspect-video">
              <img src={product.image} alt={product.name}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-base font-bold text-indigo-500 mb-3">{product.price}</p>
              <Link to={`/products/${product.id}`}
                    className="block w-full text-center py-2.5 rounded-xl bg-black text-white
                               text-sm font-medium hover:opacity-85 transition-all">
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Reviews ── */}
      <h2 className="text-lg font-medium text-gray-900 mb-5">What customers say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review, i) => (
          <div key={review.id}
               className="bg-white border border-gray-100 rounded-2xl p-5"
               style={{ animation: `fadeUp 0.5s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1) both` }}>
            <div className="text-amber-400 text-sm mb-3">★★★★★</div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">"{review.comment}"</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center
                               text-white text-xs font-semibold">
                {review.user[0]}
              </div>
              <span className="text-sm font-medium text-gray-900">{review.user}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
};

export default Home;
