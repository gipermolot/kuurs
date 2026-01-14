import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://kuurs.onrender.com/authors", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAuthors(data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Authors</h1>
        <ul className="space-y-4">
          {authors.map(author => (
            <li key={author.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold text-lg">{author.name}</h2>
              <p>Born: {author.birth_year}</p>
              <p>{author.bio}</p>
              <p className="mt-2 font-semibold">Books:</p>
              <ul className="ml-4 list-disc">
                {author.books.map(book => (
                  <li key={book.id}>{book.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
