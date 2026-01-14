import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Authors from "./pages/Authors.jsx";
import Books from "./pages/Books.jsx";
import Categories from "./pages/Categories.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
