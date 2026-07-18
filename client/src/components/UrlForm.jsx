import React from 'react'

const UrlForm = ({ url, setUrl, handleShorten }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Shorten Your URL
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {if (e.key === "Enter") {handleShorten()}}}
              className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg" onClick={handleShorten}>
              Shorten
            </button>
          </div>
        </div>
  )
}

export default UrlForm
