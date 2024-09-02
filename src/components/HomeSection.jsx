import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenWeatherMapWidget from './OpenWeatherMapWidget';
import QuickLinks from './QuickLinks';
import fetchAllData from './fetchAllData';

// Import video assets
import ReactVideo from '../assets/React_Video.mp4';
import Video1 from '../assets/React_Video1.mp4';
import Video2 from '../assets/React_Video2.mp4';
import Video3 from '../assets/React_Video3.mp4';
import Video14 from '../assets/React_Video4.mp4';

const videoSources = [
  { src: Video1, title: "Gemini AI", description: "Ask about what's in your mind and get the answers you need" },
  { src: Video2, title: "Integrated Weather", description: "Provides the overview of the weather forecast " },
  { src: Video3, title: "Currency Exchange ", description: "Check the current exchange rates for over 164 currencies" },
  { src: Video14, title: "Latest Updates", description: "Get the latest news, headlines, forums, and more..." }
];

const ApiOverviewCard = ({ title, apiName, imageUrl, darkMode }) => {
  return (
    <div className={`bg-opacity-20 backdrop-blur-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 hover:bg-opacity-30 transition-all duration-300`}>
      <div className="mb-4">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
        ) : (
          <div className="w-full h-40 bg-gray-700 bg-opacity-30 rounded-lg flex items-center justify-center">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No Image Available</span>
          </div>
        )}
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{apiName}</h3>
      <h4 className={`text-md font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{title}</h4>
    </div>
  );
};

const VideoMasonryGrid = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videoSources.map(({ src, title, description }, index) => (
        <div key={index} className={`bg-opacity-20 backdrop-blur-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out p-4`}>
          <div className={`w-full aspect-video flex items-center justify-center ${src === Video14 ? '' : 'px-8'}`}>
            <video 
              className="w-full h-full object-cover rounded-lg" 
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4">
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomeSection = ({ darkMode, weatherData, isLoading }) => {
  const navigate = useNavigate();
  const [bentoData, setBentoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData();
        setBentoData(data);
      } catch (error) {
        console.error('Error fetching bento data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMoreAboutClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="relative py-5 mb-4">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          onError={(event) => {
            console.error('Error loading video:', event);
            event.target.style.display = 'none';
          }}
        >
          <source src={ReactVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto relative z-10">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center text-white mt-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Discover Today's Trends
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-stretch">
          {/* Left Column (expanded) */}
          <div className="lg:w-2/3 flex flex-col p-4">
            <div className={`flex-grow bg-opacity-20 backdrop-blur-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4`}>
              {/* API Overview */}
              <div className="mt-4">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>API Overview</h2>
                {bentoData ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['currents', 'youtube'].map((key) => (
                      <ApiOverviewCard
                        key={key}
                        title={bentoData[key]?.title || 'N/A'}
                        apiName={bentoData[key]?.apiName || key.toUpperCase()}
                        imageUrl={bentoData[key]?.imageUrl || ''}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No API data available</div>
                )}
                
                {/* Featured Videos Masonry Grid */}
                <div className="mt-6">
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Featured Videos</h2>
                  <VideoMasonryGrid darkMode={darkMode} />
                </div>

                {/* More About API button */}
                <div className="text-center mt-6">
                  <button
                    onClick={handleMoreAboutClick}
                    className={`
                      px-6 py-3 rounded-xl
                      bg-gradient-to-r from-purple-500 to-pink-500
                      text-white
                      transition duration-300 ease-in-out
                      hover:from-purple-600 hover:to-pink-600
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                      shadow-md
                    `}
                  >
                    More About API
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (narrowed) */}
          <div className="lg:w-1/3 flex flex-col p-4">
            <div className={`flex-grow bg-opacity-20 backdrop-blur-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4`}>
              {isLoading ? (
                <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Loading weather data...</div>
              ) : (
                <>
                  <OpenWeatherMapWidget
                    darkMode={darkMode}
                    data={weatherData && weatherData.fullData ? weatherData.fullData : null}
                  />
                  {/* Today's Overview and 24 Hour Forecast */}
                  <div className={`mt-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {/* Add your Today's Overview and 24 Hour Forecast content here */}
                  </div>
                  {/* QuickLinks */}
                  <div className="mt-6">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Quick Links</h2>
                    <QuickLinks darkMode={darkMode} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeSection;