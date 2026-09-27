import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Logout failed");
        return;
      }

      alert("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="bg-cyan-400 text-white py-5 shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          URL Shortener
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;