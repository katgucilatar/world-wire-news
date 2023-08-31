import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../context/CurrentUser";
import logo from "../../src/assets/WorldWire-Icon.png";
import { Accordion } from 'flowbite-react';


function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-2 navbar"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <Link to="/">
          <img src={logo} className="w-10" alt="WorldWire Icon"></img>
        </Link>
        {isLoggedIn() ? (
          <>
            <Link to="/homepage" className="text-blue-600 navlink">
              Homepage
            </Link>
            <Link to="/search-news" className="text-blue-600 mr-3 navlink">
                Search News
              </Link>
            <Link to="/dashboard" className="text-blue-600 navlink">
              Dashboard
            </Link>
            <button
              type="button"
              className="text-blue-600 navlink"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="py-2">
              <Link to="/search-news" className="text-blue-600 mr-3 navlink">
                Search News
              </Link>
              <Link to="/login" className="text-blue-600 mr-3 navlink">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 navlink">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
