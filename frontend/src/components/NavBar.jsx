import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-black p-4 text-white">
      <Link to="/">Travel Planner</Link>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <p>{user.user.name}</p>

            <button
              onClick={logout}
              className="rounded bg-red-500 px-3 py-1"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;