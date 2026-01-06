import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import menuBar from "../assets/menu-bar.png";
import { logoutUser } from "../features/auth/authSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black border-b-2 border-b-gray-400 text-white relative z-50 shadow-lg h-16 flex justify-between items-center px-5 ">
      <div className=" cursor-pointer font-poppins font-bold text-3xl">
        TwinScan
      </div>

      {/* Hamburger menu */}
      <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? (
          <span className="text-2xl font-bold bg-white text-black">X</span>
        ) : (
          <img src={menuBar} className="h-10  bg-white" />
        )}
      </button>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col  md:flex-row absolute md:static top-full bg-black py-2 right-5 gap-3 px-3 font-gsans text-xl`}
      >
        {user ? (
          <>
            <button
              onClick={() => dispatch(logoutUser())}
              className="hover:bg-white hover:text-black px-4 py-1.5 "
            >
              Log out
            </button>
            
          </>
        ) : (
          <>
            <Link
              to="/"
              onClick={closeMenu}
              className="    hover:bg-linear-to-r from-indigo-500 to-blue-600
          hover:from-indigo-400 hover:to-blue-500
          transition-all duration-200 px-4 py-1.5 rounded-md "
            >
              Home
            </Link>
            <Link
              to="/signin"
              onClick={closeMenu}
              className="    hover:bg-linear-to-r from-indigo-500 to-blue-600
          hover:from-indigo-400 hover:to-blue-500
          transition-all duration-200 px-4 py-1.5 rounded-md "
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
