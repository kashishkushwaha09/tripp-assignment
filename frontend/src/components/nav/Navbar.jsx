import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
// dd
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          Travel Planner
        </Link>

       
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-400 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/upload"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
              >
                Upload Docs
              </Link>

              <Link
                to="/"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <p className="text-gray-300 font-medium">
                {user.name}
              </p>

              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

