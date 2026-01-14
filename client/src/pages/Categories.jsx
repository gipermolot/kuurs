import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // TODO: підключити реальний бекенд через fetch
    fetch("http://localhost:3000/categories") // або твій Render URL
      .then(res => res.json())
      .then(data => setCategories(data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id} className="p-2 border rounded shadow-sm">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">
                Books: {category.books?.map(book => book.title).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
