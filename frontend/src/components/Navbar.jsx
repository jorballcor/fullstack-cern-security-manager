// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Security Manager</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/logs" className="hover:underline">Logs</Link>
        <Link to="/users" className="hover:underline">Usuarios</Link>
        <Link to="/incidents" className="hover:underline">Incidentes</Link>
        <Link to="/login" className="hover:text-red-400">Salir</Link>
      </div>
    </nav>
  );
}
