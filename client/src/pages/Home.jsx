import React from "react";
import BookList from "../components/BookList";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://kuurs.onrender.com/books")
      .then(res => res.json())
      .then(data => setBooks(data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Library Books</h1>
      <BookList books={books} />
    </div>
  );
}