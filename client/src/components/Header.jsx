import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../context/CurrentUser";
import logo from "../../src/assets/WorldWire-Icon.png";

function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-2"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <img src={logo} className="w-10" alt="WorldWire Icon"></img>
        </div>
        {isLoggedIn() ? (
          <>
            <Link to="/dashboard" className="text-blue-600">
              Dashboard
            </Link>
            <button
              type="button"
              className="text-blue-600"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="py-2">
              <Link to="/login" className="text-blue-600 mr-3">
                Login
              </Link>
              <Link to="/register" className="text-blue-600">
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
