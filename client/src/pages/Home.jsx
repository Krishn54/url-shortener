import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import UrlResult from "../components/UrlResult";
import UrlList from "../components/UrlList";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Get all URLs
  const fetchUrls = async () => {
    try {
      setFetching(true);

      const response = await fetch(
        `${API_URL}/api/urls?page=${page}&limit=5&search=${searchQuery}&sort=${sort}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch URLs");
        return;
      }

      setUrls(data.urls);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page, searchQuery, sort]);

  // Create short URL
  const handleShorten = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          originalUrl: url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to shorten URL");
        return;
      }

      const generatedShortUrl = `${API_URL}/api/${data.shortCode}`;

      setShortUrl(generatedShortUrl);
      setUrl("");

      fetchUrls();
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Copy URL
  const handleCopy = async (shortCode) => {
    const link = `${API_URL}/api/${shortCode}`;

    try {
      await navigator.clipboard.writeText(link);
      alert("URL copied!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy URL");
    }
  };

  // Delete URL
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this URL?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/urls/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete URL");
        return;
      }

      setUrls((prev) => prev.filter((item) => item._id !== id));

      setShortUrl("");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">URL Shortener</h1>

            <p className="text-gray-500 mt-2">
              Create and manage your shortened URLs
            </p>
          </div>

          {/* Shorten URL Card */}
          <div className="bg-white p-8 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Shorten Your URL
            </h2>

            <UrlForm url={url} setUrl={setUrl} handleShorten={handleShorten} />

            {loading && (
              <p className="text-center mt-4 text-gray-500">
                Creating short URL...
              </p>
            )}
          </div>

          {/* Result */}
          {shortUrl && (
            <UrlResult
              shortUrl={shortUrl}
              handleCopy={() => {
                const shortCode = shortUrl.split("/").pop();
                handleCopy(shortCode);
              }}
            />
          )}

          {/* URLs */}
          <div className="bg-white p-8 rounded-xl shadow mt-6">
            <div className="mb-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Shortened URLs
                </h2>

                {!fetching && (
                  <span className="text-sm text-gray-500">
                    {urls.length} {urls.length === 1 ? "URL" : "URLs"}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search URLs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() => {
                    setSearchQuery(search);
                    setPage(1);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Search
                </button>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="clicks">Most Clicks</option>
                </select>
              </div>
            </div>

            {fetching ? (
              <p className="text-center text-gray-500 py-6">
                Loading your URLs...
              </p>
            ) : (
              <>
                <UrlList
                  urls={urls}
                  handleDelete={handleDelete}
                  handleCopy={handleCopy}
                />

                <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="font-semibold">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
