import React from "react";
export default function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {books.map(book => (
        <div key={book.id} className="bg-white shadow rounded p-4">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-sm">{book.description}</p>
          <p className="text-gray-500 text-xs">{book.published_year}</p>
        </div>
      ))}
    </div>
  );
}