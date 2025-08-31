// src/components/CategoryCard.jsx
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link to={`/products?category=${category.slug}`}>
      <div className="border rounded-lg shadow-md hover:shadow-xl transition p-4 text-center">
        <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="mt-2 text-lg font-semibold">{category.name}</h2>
      </div>
    </Link>
  );
}

export default CategoryCard;
