import { Link } from "react-router-dom";

import { useState } from "react";
import { useAppSelector } from "../app/hooks";

const NavBar = () => {
  const { user} = useAppSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="relative z-50 shadow-lg px-6 py-3.5 flex items-center justify-between">
      <h1 className="text-2xl font-poppins font-medium">TwinScan</h1>

      {/* Hamburger (mobile only) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden text-gray-600 focus:outline-none"
      >
        {open ? (
          <span className="text-2xl font-bold">✕</span>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Menu */}
      <div
        className={`
          ${open ? "flex" : "hidden"}
          md:flex
          flex-col md:flex-row
          absolute md:static
          top-full left-0
          w-full md:w-auto
          bg-white md:bg-transparent
          gap-4
          p-5 md:p-0
          shadow-md md:shadow-none
          font-gsans text-lg
        `}
      >
        {user ? (
          
          <Link to="/profile" onClick={closeMenu}>
            <img
              src={`${user.profilePic}`}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
          </Link>
        ) : (
          <>
          <hr />
            <Link
              to="/"
              onClick={closeMenu}
              className="px-4 py-1.5 hover:bg-black hover:outline-1 hover:text-white rounded-lg"
            >
              Home
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="px-4 py-1.5  hover:bg-black hover:outline-1 hover:text-white rounded-lg"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
