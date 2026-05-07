import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">

        <li>
            <NavLink to="/" className="hover:text-gray-400">Home</NavLink>
        </li>

        <li>
            <NavLink to="/list" className="hover:text-gray-400">List</NavLink>
        </li>

        <li>
            <NavLink to="/signup" className="hover:text-gray-400">Signup</NavLink>
        </li>

      </ul>
    </nav>
  );
}