import axios from "axios";
import { useState } from "react";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [showShortUrl, setShowShortUrl] = useState(false);
  const [shortURL, setShortURL] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getDataFromBackend = async () => {
    try {
      const response = await axios.post(
        `https://tinyurl-sxyw.onrender.com/shorten`,
        {
          url,
        }
      );

      if (response?.data?.shortURL) {
        setShortURL(response.data.shortURL);
        setShowShortUrl(true);
      }
    } catch (error) {
      setShowShortUrl(false);
      console.log(error);
      alert("Failed to shorten the URL. Please try again.");
    }
  };

  const handleShortURL = () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }
    getDataFromBackend();
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortURL);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className={`p-2 px-5 mb-4 rounded-full ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div
        className={`rounded-lg shadow-md p-6 w-full max-w-xl ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="text-2xl font-semibold mb-4">Free URL Shortener</h1>
        <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
          RB.GY is a free tool to{" "}
          <a href="#" className="text-blue-500">
            shorten URLs
          </a>{" "}
          powered by Rebrandly. Create short & memorable links in seconds.
        </p>
        <span className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Enter link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full p-2 rounded-lg border ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <button
            onClick={handleShortURL}
            className="w-[30%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Shorten URL
          </button>
        </span>
        {showShortUrl && (
          <div className="mt-4 max-w-[80%] flex gap-2">
            <input
              type="text"
              readOnly
              value={shortURL}
              className={`outline-none w-full p-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            <button
              onClick={handleCopyUrl}
              className="w-full max-w-24 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        )}
        <p
          className={`text-sm mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          By clicking Shorten URL, you agree to Rebrandly&apos;s{" "}
          <a href="#" className="text-blue-500">
            Terms of Use
          </a>
          ,{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Cookie Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default UrlShortener;
