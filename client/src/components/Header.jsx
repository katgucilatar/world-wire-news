import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';
import logo from '../../src/assets/WorldWire-Icon.png'

 function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav className="relative h-14 w-full items-center bg-[#FBFBFB] py-2 px-3 shadow-lg" data-te-navbar-ref>
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
          <button type="button" className="text-blue-600" onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <img src={logo} className='absolute w-10 float-left'></img>
          <div className='float-right py-2'>
          <Link to="/login" className="text-blue-600 mr-3">Login</Link>
          <Link to="/register" className="text-blue-600">Sign Up</Link>
          </div>
        </>
      )}
    </nav>
  );
 }

 export default Header