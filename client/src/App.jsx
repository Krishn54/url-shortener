import React ,{ useState , useEffect } from "react";
import API from "./services/api";
import Navbar from "./components/Navbar";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const handleShorten = async () => {
  if (!url.trim()) {
    alert("Please enter a URL");
    return;
  }

  try {
    await API.post("/shorten", {
      originalUrl: url,
    });

    setUrl("");
    fetchUrls();
  } catch (error) {
    console.log(error);
  }
};
  const handleDelete = async (id) => {
  try {
    await API.delete(`/urls/${id}`);
    fetchUrls();
  } catch (error) {
    console.log(error);
  }
};

const handleCopy = async (shortCode) => {
  try {
    const shortUrl = `${import.meta.env.VITE_API_URL}/${shortCode}`;
    await navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  } catch (error) {
    console.log(error);
  }
};
  const fetchUrls = async () => {
  try {
    const response = await API.get("/urls");
    setUrls(response.data);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
  fetchUrls();
}, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <UrlForm url={url} setUrl={setUrl} handleShorten={handleShorten} />
        <UrlList urls={urls} handleDelete={handleDelete} handleCopy={handleCopy} /> 
      </div>
    </div>
  );
}

export default App;
        
        
    