import React from "react";
import { useNavigate } from "react-router-dom";

const UrlCard = ({ item, handleDelete, handleCopy }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p>
        <span className="font-semibold">Original:</span>{" "}
        {item.originalUrl}
      </p>

      <p className="mt-2">
        <span className="font-semibold">Short:</span>{" "}
        <a
          href={`${import.meta.env.VITE_API_URL}/api/${item.shortCode}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          {`${import.meta.env.VITE_API_URL}/api/${item.shortCode}`}
        </a>
      </p>

      <p className="mt-2">
        <span className="font-semibold">Clicks:</span>{" "}
        {item.clicks}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleCopy(item.shortCode)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>

        <button
          onClick={() => navigate(`/analytics/${item._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Analytics
        </button>

        <button
          onClick={() => handleDelete(item._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UrlCard;