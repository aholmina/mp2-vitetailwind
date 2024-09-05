import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Cloud, DollarSign, Youtube, Newspaper, RefreshCw } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { SiOpenai } from 'react-icons/si';

// Component imports
import Navbar from './components/Navbar';
import NewsSection from './components/NewsSection';
import Weather from './components/Weather';
import CurrencyExchange from './components/CurrrenExchange';
import GeminiAI from './components/GeminiAI';
import YouTubeComponent from './components/YouTubeComponent';
import GNewsComponent from './components/GNewsComponent';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import ErrorBoundary from './components/ErrorBoundary';
import QuickLinks from './components/QuickLinks';
import HomeSection from './components/HomeSection';

// API service import
import { fetchAllData } from './components/Api';

const BentoCard = React.memo(({ title, imageUrl, apiName, onSelect, isSelected, description, darkMode, icon: Icon }) => {
  return (
    <div
      onClick={onSelect}
      className={`
        ${darkMode
          ? 'bg-gray-900 bg-opacity-30 text-white border-b-4 border-purple-500'
          : 'bg-gradient-to-br from-white via-pink-100 to-blue-100 text-gray-800'}
        rounded-2xl p-6 transition-all duration-300 transform hover:scale-105
        backdrop-filter backdrop-blur-lg cursor-pointer
        ${isSelected ? 'ring-2 ring-pink-500' : ''}
        h-[220px] flex flex-col justify-between relative group overflow-hidden
        ${darkMode
          ? 'hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]'
          : 'shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]'}
        ${!darkMode && 'border-2 border-transparent hover:border-gradient-to-r from-blue-300 to-pink-300'}
        shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]
      `}
    >
      {imageUrl && <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl" />}
      <div className="relative z-10">
        {Icon && <Icon className={`text-4xl mb-4 ${darkMode ? 'text-purple-400' : 'text-blue-600'} group-hover:text-white transition-colors duration-300`} />}
        <h5 className={`text-lg font-bold mb-2 ${
          darkMode 
            ? 'text-purple-400 group-hover:text-purple-300'
            : 'text-blue-600 group-hover:text-blue-500'
        } transition-colors duration-300`}>{apiName}</h5>
        <h6 className={`text-xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-white transition-colors duration-300`}>{title}</h6>
        {description && <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} group-hover:text-white transition-colors duration-300`}>{description}</p>}
      </div>
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
          : 'bg-gradient-to-r from-blue-400 to-indigo-500'
      } opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-2xl`}></div>
    </div>
  );
});

const HomePage = ({ darkMode, apiData, isLoading, dashboardRef, onRefresh }) => {
  const [mainCard, setMainCard] = useState('currents');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location, dashboardRef]);

  const handleCardHover = (cardId) => {
    setMainCard(cardId);
  };

  const renderMainCard = () => {
    switch(mainCard) {
      case 'currents':
        return <NewsSection darkMode={darkMode} data={apiData?.currents?.fullData} />;
      case 'gnews':
        return <GNewsComponent darkMode={darkMode} data={apiData?.gnews?.fullData} />;
      case 'youtube':
        return <YouTubeComponent darkMode={darkMode} data={apiData?.youtube?.fullData} />;
      case 'gemini':
        return <GeminiAI darkMode={darkMode} data={apiData?.gemini?.fullData} />;
      case 'currency':
        return <CurrencyExchange darkMode={darkMode} data={apiData?.currency?.fullData} />;
      case 'weather':
        return <Weather darkMode={darkMode} data={apiData?.weather?.fullData} />;
      default:
        return <NewsSection darkMode={darkMode} data={apiData?.currents?.fullData} />;
    }
  };

  const cardComponents = {
    currents: Newspaper,
    gnews: Newspaper,
    youtube: Youtube,
    weather: Cloud,
    currency: DollarSign,
    gemini: SiOpenai
  };

  if (isLoading) {
    return <div className="text-center text-2xl font-bold p-12 animate-pulse italic">Loading...</div>;
  }

  return (
    <section className={`transition-all duration-300 w-full min-h-screen ${
      darkMode ? 'bg-black' : 'bg-gradient-to-r from-sky-100 via-pink-100 to-sky-200'
    }`}>
      <HomeSection 
        darkMode={darkMode} 
        weatherData={apiData?.weather?.fullData} 
        isLoading={isLoading} 
      />
      <main className="container mx-auto px-4 " ref={dashboardRef}>
        <h1 className={`
          text-8xl font-extrabold mb-12 text-center mt-20 
          transition-all duration-300 ease-in-out transform hover:scale-105
          py-6 px-12 rounded-xl
        `}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500" 
                style={{
                  textShadow: darkMode 
                    ? '3px 3px 6px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.1)' 
                    : '3px 3px 6px rgba(255,255,255,0.5), -3px -3px 6px rgba(0,0,0,0.1)'
                }}>
            Dashboard HUB
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
          {['currents', 'gnews', 'youtube'].map(cardId => (
            <BentoCard
              key={cardId}
              title={apiData[cardId]?.title}
              imageUrl={apiData[cardId]?.image}
              apiName={apiData[cardId]?.apiName}
              onSelect={() => handleCardHover(cardId)}
              isSelected={mainCard === cardId}
              description={apiData[cardId]?.fullData?.description}
              darkMode={darkMode}
              icon={cardComponents[cardId]}
            />
          ))}
        </div>
        <div className={`
          ${darkMode
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-900'}
          backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 ease-in-out p-8 min-h-[400px] mb-6
          ${darkMode
            ? 'shadow-[0_0_30px_rgba(255,182,193,0.2),_0_0_60px_rgba(216,191,216,0.2)]'
            : 'shadow-[0_20px_50px_rgba(0,0,0,0.1)]'}
        `}>
          {renderMainCard()}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mt-10">
          {['weather', 'currency', 'gemini'].map(cardId => (
            <BentoCard
              key={cardId}
              title={apiData[cardId]?.title}
              imageUrl={apiData[cardId]?.image}
              apiName={apiData[cardId]?.apiName}
              onSelect={() => handleCardHover(cardId)}
              isSelected={mainCard === cardId}
              description={apiData[cardId]?.fullData?.description}
              darkMode={darkMode}
              icon={cardComponents[cardId]}
            />
          ))}
        </div>
        <div className="mt-10 pb-8 text-center">
          <button
            className={`
              px-8 py-4 rounded-full text-lg font-bold relative
              bg-gradient-to-r from-blue-500 to-pink-500 text-white
              flex items-center justify-center mx-auto
              transition duration-300 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed
              transform hover:scale-105 overflow-hidden
            `}
            onClick={onRefresh}
            disabled={isLoading}
          >
            <span className="relative z-10 flex items-center">
              <RefreshCw size={20} className={`mr-3 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </span>
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 opacity-0 hover:opacity-75 transition-opacity duration-300"
                    style={{
                      filter: 'blur(8px)',
                      transform: 'scale(1.2)',
                    }}></span>
            </span>
          </button>
        </div>
      </main>
    </section>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dashboardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllData();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <ErrorBoundary>
      <div className={`App min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <div className="flex-grow">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          {error ? (
            <div className={`text-center p-4 italic ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</div>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage darkMode={darkMode} apiData={apiData} isLoading={isLoading} dashboardRef={dashboardRef} onRefresh={refreshData} />} />
              <Route path="/dashboard" element={<HomePage darkMode={darkMode} apiData={apiData} isLoading={isLoading} dashboardRef={dashboardRef} onRefresh={refreshData} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy darkMode={darkMode} />} />
              <Route path="/terms-of-service" element={<TermsOfService darkMode={darkMode} />} />
              <Route path="/contact" element={<Contact darkMode={darkMode} />} />
            </Routes>
          )}
        </div>
        <Footer darkMode={darkMode} className={`transition-all duration-300 ${
          darkMode 
            ? 'bg-black' 
            : 'bg-gradient-to-r from-gray-100 via-pink-100 to-gray-100'
        } backdrop-blur-md`} />
      </div>
    </ErrorBoundary>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;