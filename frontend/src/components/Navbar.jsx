import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseContext } from "../App";

export default function Navbar() {
  const { token } = useContext(UseContext);
  const navigate = useNavigate();

  const logout = () => {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      navigate("/");
      window.location.reload();
    })
  };

  return (
    <div>
      {token ? (
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">Admin</div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-blue-200">
                Home
              </Link>
              <Link to={`/admin/${token}`} className="text-white hover:text-blue-200">
                Admin
              </Link>
              <Link
                onClick={logout}
                className="text-red-300 hover:text-red-200"
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">MyApp</div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-blue-200">
                Home
              </Link>
              <Link to="/register" className="text-white hover:text-blue-200">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
