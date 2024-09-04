import React from 'react';
import { RefreshCw, FileText, Cloud, DollarSign, Youtube } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { SiOpenai } from 'react-icons/si';

const BentoCard = ({ title, value, icon: Icon, darkMode }) => (
  <div className={`
    ${darkMode
      ? 'bg-gray-900 bg-opacity-80 text-white border-b-4 border-purple-500 hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]'
      : 'bg-gradient-to-br from-blue-100 to-pink-100 text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'}
    rounded-2xl p-6 transition-all duration-300 transform hover:scale-105
    backdrop-filter backdrop-blur-lg
    flex flex-col items-center justify-center
    shadow-[0_10px_20px_rgba(0,0,0,0.2)]
  `}>
    <Icon className={`text-5xl mb-4 ${darkMode ? 'text-purple-400' : 'text-blue-600'}
      group-hover:text-pink-500 transition-colors duration-300`} />
    <h3 className={`text-xl font-bold mb-2 italic ${darkMode ? 'text-white' : 'text-sky-800'}`}>{title}</h3>
    <p className={`text-sm font-bold italic ${darkMode ? 'text-white' : 'text-gray-600'}`}>{value}</p>
  </div>
);

const ApiSummaryWidget = ({ darkMode, data, isLoading, onRefresh }) => {
  if (isLoading) {
    return (
      <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-800'}
         animate-pulse text-2xl font-bold p-12 italic`}>
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-800'}
         text-xl font-semibold p-12 italic`}>
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
    <div className={`relative z-10 ${darkMode ? 'bg-black' : 'bg-gradient-to-r from-blue-100 to-pink-100'}
       bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-3xl
       overflow-hidden transition-all duration-300 ease-in-out p-8`}>
      <h2 className={`
        text-4xl font-extrabold mb-8 text-center italic
        ${darkMode
           ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
           : 'text-gray-800'}
      `}>
        API Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(data).map(([key, value]) =>
          value && (
            <BentoCard
              key={key}
              title={value.title || key}
              value={value.value || 'N/A'}
              icon={cardComponents[key] || FileText}
              darkMode={darkMode}
            />
          )
        )}
      </div>
      <div className="mt-12 text-center">
        <button
          className={`
            px-8 py-4 rounded-full text-lg font-bold mb-8
            ${darkMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]'
              : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg shadow-blue-500/50'}
            flex items-center justify-center mx-auto
            transition duration-300 ease-in-out
            hover:from-purple-700 hover:to-pink-700
            focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
            transform hover:scale-105
          `}
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw size={20} className={`mr-3 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default ApiSummaryWidget;