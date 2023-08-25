import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';

 function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav className="relative flex w-full flex-wrap justify-between items-center bg-[#FBFBFB] py-2 px-3 shadow-lg" data-te-navbar-ref>
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
          <button type="button" className="text-blue-600" onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-blue-600">Login</Link>
          <Link to="/register" className="text-blue-600">Sign Up</Link>
        </>
      )}
    </nav>
  );
 }

 export default Header