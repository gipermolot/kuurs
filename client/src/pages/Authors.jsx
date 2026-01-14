import React, { useEffect, useState } from "react";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch authors з бекенду
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("http://localhost:3000/authors"); // або URL деплою
        const data = await res.json();
        setAuthors(data.data || []);
      } catch (err) {
        console.error("Помилка завантаження авторів:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <p>Завантаження авторів...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Список авторів</h1>
      {authors.length === 0 ? (
        <p>Автори відсутні</p>
      ) : (
        <ul className="space-y-2">
          {authors.map((author) => (
            <li key={author.id} className="border p-4 rounded shadow">
              <h2 className="font-semibold">{author.name}</h2>
              <p>Рік народження: {author.birth_year}</p>
              <p>Біографія: {author.bio}</p>
              <p>Кількість книг: {author.books.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Authors;
