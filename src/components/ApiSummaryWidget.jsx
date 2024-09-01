import React from 'react';
import { RefreshCw, FileText, Cloud, DollarSign, Youtube } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { SiOpenai } from 'react-icons/si';
import ReactVideo from '../assets/React_Video.mp4';

const BentoCard = ({ title, value, icon: Icon, darkMode }) => (
  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-30 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg`}>
    <Icon className="text-4xl mb-2" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm">{value}</p>
  </div>
);

const ApiSummaryWidget = ({ data, darkMode, isLoading, onRefresh }) => {
  if (isLoading) {
    return <div className="text-center text-white animate-pulse">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="text-center text-white">
        No data available. Please try refreshing.
      </div>
    );
  }

  const cardComponents = {
    news: FileText,
    youtube: Youtube,
    weather: Cloud,
    currency: DollarSign,
    calendar: FcGoogle,
    gemini: SiOpenai
  };

  return (
    <div className="relative">
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
      <div className="relative z-10 bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)] backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(data).map(([key, value]) => 
            value && (
              <BentoCard 
                key={key} 
                {...value}
                icon={cardComponents[key]}
                darkMode={darkMode} 
              />
            )
          )}
        </div>
        <button 
          className={`
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-purple-500 to-pink-500 text-white
            flex items-center justify-center
            transition duration-300 ease-in-out 
            relative overflow-hidden 
            focus:outline-none hover:from-purple-600 hover:to-pink-600
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          `}
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left shadow-glow"></div>
        </button>
      </div>
    </div>
  );
};

export default ApiSummaryWidget;