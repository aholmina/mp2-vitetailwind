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

// Import website image
import WebsiteImage from '../assets/Dashboard.jpg';

const videoSources = [
  { src: Video1, title: "Gemini AI", description: "Ask about what's in your mind and get the answers you need" },
  { src: Video2, title: "Integrated Weather", description: "Provides the overview of the weather forecast " },
  { src: Video3, title: "Currency Exchange ", description: "Check the current exchange rates for over 164 currencies" },
  { src: Video14, title: "Latest Updates", description: "Get the latest news, headlines, forums, and more..." }
];

const ApiOverviewCard = ({ title, apiName, imageUrl, darkMode }) => {
  return (
    <div className={`
      bg-opacity-30 text-white border-b-4 border-purple-500
      rounded-2xl p-4 transition-all duration-300 transform hover:scale-105
      backdrop-filter backdrop-blur-lg
      ${darkMode 
        ? 'bg-gray-900 hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]' 
        : 'bg-white hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]'}
      shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]
    `}>
      <div className="mb-2 overflow-hidden rounded-xl">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-110" />
        ) : (
          <div className="w-full h-20 bg-gray-700 bg-opacity-30 rounded-lg flex items-center justify-center">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No Image</span>
          </div>
        )}
      </div>
      <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{apiName}</h3>
      <h4 className={`text-sm font-bold italic ${darkMode ? 'text-white' : 'text-gray-700'}`}>{title}</h4>
    </div>
  );
};

const VideoCard = ({ src, title, description, darkMode }) => (
  <div className={`
    bg-opacity-30 text-white border-b-4 border-purple-500
    rounded-2xl overflow-hidden transition-all duration-300 ease-in-out mb-4 transform hover:scale-105
    backdrop-filter backdrop-blur-lg
    ${darkMode
      ? 'bg-gray-900 hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]'
      : 'bg-white hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]'}
    shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]
  `}>
    <div className="aspect-video">
      <video 
        className="w-full h-full object-fill" 
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="p-3">
      <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      <p className={`text-xs mt-1 font-bold italic ${darkMode ? 'text-white' : 'text-gray-600'}`}>{description}</p>
    </div>
  </div>
);

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

  const websiteInfo = {
    image: WebsiteImage,
    title: "Data HUB",
    description: "Discover a world of information at your fingertips. Our platform brings you the latest in weather, news, and more, all in one place."
  };

  return (
    <header className={`relative min-h-screen py-10 ${darkMode ? 'bg-black' : 'bg-gradient-to-r from-gray-100 via-pink-100 to-gray-100'}`}>
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          style={{ filter: darkMode ? 'brightness(0.3)' : 'brightness(0.8)' }}
        >
          <source src={ReactVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto relative z-10 px-4">
        {/* Main Heading */}
        <h1 className={`
          text-4xl md:text-5xl lg:text-8xl font-extrabold mb-8 text-center mt-10
          ${darkMode 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600' 
            : 'text-white'}
          transition-all duration-300 ease-in-out transform hover:scale-105
        `} style={{ textShadow: darkMode ? 'none' : '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Discover Today's Trends
        </h1>

        {/* Weather and Featured Videos */}
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8 mb-8">
          {/* Weather Widget */}
          <div className={`
            lg:w-1/2
            bg-opacity-30 rounded-3xl p-6 backdrop-filter backdrop-blur-lg
            transition-all duration-300 transform hover:scale-105
            ${darkMode
              ? 'bg-gray-900 hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]'
              : 'bg-white hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]'}
            shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]
          `}>
            {isLoading ? (
              <div className={`text-center ${darkMode ? 'text-white font-bold' : 'text-gray-800'}`}>Loading weather data...</div>
            ) : (
              <OpenWeatherMapWidget
                darkMode={darkMode}
                data={weatherData && weatherData.fullData ? weatherData.fullData : null}
                layout="row"
              />
            )}
          </div>

          {/* Featured Videos */}
          <div className="lg:w-1/2 space-y-4 text-white">
            <h1 className={`
              text-4xl font-extrabold mb-10 mt-10 text-center 
              ${darkMode ? 'text-white' : 'text-white-800'}
            `}>
              Welcome to Our Platform
            </h1>
            <h2 className={`
              text-2xl font-extrabold mb-10 mt-20 text-white
              ${darkMode ? 'text-white' : 'text-white-800'}
            `}>
              FEATURED VIDEOS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videoSources.map((video, index) => (
                <VideoCard key={index} {...video} darkMode={darkMode} />
              ))}
            </div>
          </div>
        </div>

        {/* API Overview and Quick Links */}
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8">
          {/* API Overview */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className={`
              text-2xl font-extrabold mb-10 mt-8 text-white
              ${darkMode ? 'text-white' : 'text-white-800'}
            `}>
              API OVERVIEW
            </h2>
            {bentoData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
              <div className={`text-center mb-4 ${darkMode ? 'text-white font-bold' : 'text-gray-800'}`}>No API data available</div>
            )}
            {/* More About API button */}
            <div className="text-center">
              <button
                onClick={handleMoreAboutClick}
                className={`
                  w-full sm:w-auto px-6 py-3 rounded-full text-base font-bold mt-8
                  bg-gradient-to-r from-sky-400 to-pink-400 text-white
                  transition duration-300 ease-in-out
                  hover:from-sky-500 hover:to-pink-500
                  focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50
                  transform hover:scale-105
                  ${darkMode
                    ? 'hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]'
                    : 'shadow-lg shadow-sky-500/50'}
                `}
              >
                More About API
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div className={`
              flex-grow 
              bg-opacity-30 rounded-3xl p-6 backdrop-filter backdrop-blur-lg
              ${darkMode
                ? 'bg-gray-900 hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]'
                : 'bg-white hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]'}
              shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]
            `}>
              <QuickLinks darkMode={darkMode} websiteInfo={websiteInfo} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeSection;