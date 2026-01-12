import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./features/booksSlice";
import Navbar from "./components/Navbar";

export default function App() {
  const dispatch = useDispatch();
  const books = useSelector(s => s.books.list);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(b => (
          <div key={b.id} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition">
            <h2 className="font-bold text-lg">{b.title}</h2>
            <p className="text-gray-600">{b.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}