import React from 'react'

const UrlList = ({ urls, handleDelete, handleCopy }) => {
  return (
    <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Shortened URLs
          </h2>

          <div className="space-y-4">
            { urls.length === 0 ? (
            <p className="text-center text-gray-500">
              No URLs found
              </p>
            ) : (
            urls.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4"
              >
                <p>
                  <span className="font-semibold">Original:</span>{" "}
                  {item.originalUrl}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Short:</span>{" "}
                  <a
                    href={`${import.meta.env.VITE_API_URL}/${item.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                  {`${import.meta.env.VITE_API_URL}/${item.shortCode}`}
                  </a>
                </p>
                
                <p className="mt-2">
                  <span className="font-semibold">Clicks:</span>{" "}
                  {item.clicks}
                </p>

                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleCopy(item.shortCode)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Copy
                  </button>

                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            )))}
          </div>
        </div>
  )
}

export default UrlList
