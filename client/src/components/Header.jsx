import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Library</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/authors" className="hover:underline">Authors</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
