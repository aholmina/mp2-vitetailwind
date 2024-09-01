import React, { useState, useEffect } from 'react';
import OpenWeatherMapWidget from './OpenWeatherMapWidget';
import QuickLinks from './QuickLinks';
import BentoCards from './BentoCards';
import ReactVideo from '../assets/React_Video.mp4';
import fetchAllData from './fetchAllData';
import { useNavigate } from 'react-router-dom';

const ApiOverviewCard = ({ title, apiName, imageUrl, darkMode }) => {
  return (
    <div className={`bg-opacity-20 backdrop-blur-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} text-white rounded-lg p-4 hover:bg-opacity-30 transition-all duration-300`}>
      <div className="mb-4">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
        ) : (
          <div className="w-full h-40 bg-gray-700 bg-opacity-30 rounded-lg flex items-center justify-center">
            <span className="text-gray-300">No Image Available</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{apiName}</h3>
      <h4 className="text-md font-medium text-gray-200 mb-1">{title}</h4>
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
          {/* Left Column */}
          <div className="lg:w-1/2 flex flex-col p-4">
            <div className={`flex-grow bg-opacity-20 backdrop-blur-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4`}>
              <QuickLinks darkMode={darkMode} />

              {/* API Overview */}
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>API Overview</h2>
                {bentoData ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['currents', 'youtube', 'weather', 'currency'].map((key) => (
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
                  <div className="text-white text-center mb-6">No API data available</div>
                )}
                
                {/* More About API button */}
                <div className="text-center">
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

          {/* Right Column */}
          <div className="lg:w-1/2 flex flex-col p-4">
            <div className={`flex-grow bg-opacity-20 backdrop-blur-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4`}>
              {isLoading ? (
                <div className="text-white text-center">Loading weather data...</div>
              ) : (
                <>
                  <OpenWeatherMapWidget
                    darkMode={darkMode}
                    data={weatherData && weatherData.fullData ? weatherData.fullData : null}
                  />
                  {/* Today's Overview and 24 Hour Forecast */}
                  <div className="mt-6 text-white">
                   
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