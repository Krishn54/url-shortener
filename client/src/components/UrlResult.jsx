
import React from 'react'

const UrlResult = ({ shortUrl, handleCopy }) => {
  if (!shortUrl) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-3">
        Your Short URL
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          value={shortUrl}
          readOnly
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={handleCopy}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Copy
        </button>
      </div>
    </div>
  )
}

export default UrlResult