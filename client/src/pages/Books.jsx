import React, { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // TODO: підключити реальний бекенд через fetch
    fetch("http://localhost:3000/books") // або твій Render URL
      .then(res => res.json())
      .then(data => setBooks(data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="space-y-2">
          {books.map(book => (
            <li key={book.id} className="p-2 border rounded shadow-sm">
              <h3 className="font-semibold">{book.title}</h3>
              <p>{book.description}</p>
              <p className="text-sm text-gray-500">
                Author: {book.authors?.name}, Category: {book.categories?.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
