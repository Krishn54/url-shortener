import React from "react";
import UrlCard from "./UrlCard";

const UrlList = ({ urls, handleDelete, handleCopy }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Shortened URLs
      </h2>

      <div className="space-y-4">
        {urls.length === 0 ? (
          <p className="text-center text-gray-500">
            No URLs found
          </p>
        ) : (
          urls.map((item) => (
            <UrlCard
              key={item._id}
              item={item}
              handleDelete={handleDelete}
              handleCopy={handleCopy}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UrlList;