import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';
import logo from '../../src/assets/WorldWire-Icon.png';
import { Accordion } from 'flowbite-react';

function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  const handleHomepageClick = () => {
    window.location.href = '/homepage';
  };

  return (
    <nav
      className="relative flex w-full items-center justify-between bg-[#FBFBFB] py-3 h-20 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-2"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center ml-2">
            <img src={logo} className="w-10 sm:w-14" alt="WorldWire Icon" />
            <h1 className='ml-3 text-lg font-bold'>WORLD WIRE</h1>
          </Link>
        </div>

        {isLoggedIn() ? (
          <div className="mt-1 mr-3">
            <Link
              to="/homepage"
              className="text-blue-600 ml-3"
              onClick={handleHomepageClick}
            >
              Homepage
            </Link>
            <Link to="/dashboard" className="text-blue-600 ml-3">
              Dashboard
            </Link>
            <button
              type="button"
              className="text-blue-600 ml-3"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="py-2 mr-3">
            <Link to="/login" className="text-blue-600 mr-3">
              Login
            </Link>
            <Link to="/register" className="text-blue-600">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
