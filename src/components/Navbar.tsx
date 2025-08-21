import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="font-bold text-xl text-blue-600">ProfiBoost</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/analyzer" className="text-gray-700 hover:text-blue-600">Analyzer</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
