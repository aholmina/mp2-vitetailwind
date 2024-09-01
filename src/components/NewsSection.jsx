import React, { useState, useEffect } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const API_TOKEN = import.meta.env.VITE_CURRENT_API_TOKEN || 'MvNmDZsOa6sV0tpo6cRKn6iLqqKG_tcpdKD__jPiuGjIMBrX';
const API_URL = 'https://api.currentsapi.services/v1/latest-news';

const fetchNews = async (query = '') => {
  try {
    const url = query
      ? `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(query)}&apiKey=${API_TOKEN}&limit=9`
      : `${API_URL}?apiKey=${API_TOKEN}&limit=9`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

const NewsSection = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNews(searchQuery);
      setNewsData(data.news.slice(0, 9)); // Ensure we only use up to 9 results
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNewsData();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 via-pink-500 to-gray-800' : 'bg-gradient-to-br from-gray-700 via-pink-500 to-gray-700'} backdrop-blur-md border-t border-white/10 transition-all duration-300 ease-in-out relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-sky-400 uppercase tracking-wide">Latest News</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className={`flex-grow p-3 border-none focus:outline-none focus:ring-2 focus:ring-purple-400 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-400'}`}
            />
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 hover:from-purple-600 hover:to-pink-600 transition-colors duration-300">
              <Search size={24} />
            </button>
          </div>
        </form>

        {isLoading && <p className="text-center text-xl text-gray-300">Loading news...</p>}
        {error && <p className="text-center text-xl text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <div key={item.id} className={`rounded-lg overflow-hidden shadow-lg relative group ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-black hover:shadow-neon' : 'bg-gradient-to-br from-gray-100 via-pink-100 to-white hover:shadow-md'}`}>
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h2 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</h2>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{formatDate(item.published)}</p>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-500 hover:underline transition-colors duration-300"
                >
                  Read more <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left shadow-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;