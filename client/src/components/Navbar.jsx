import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Library</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/authors" className="hover:underline">Authors</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}
