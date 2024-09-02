// File: src/App.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Cloud, DollarSign, Youtube, Newspaper, RefreshCw } from 'lucide-react';

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
import ApiSummaryWidget from './components/ApiSummaryWidget';

// API service import
import { fetchAllData } from './components/Api';

const BentoCard = React.memo(({ title, imageUrl, apiName, onSelect, isSelected, description }) => {
  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ease-in-out relative hover:-translate-y-1 hover:shadow-lg
                  ${isSelected ? 'ring-2 ring-purple-500' : ''}
                  bg-white dark:bg-gray-800 cursor-pointer h-[220px] flex flex-col group`}
    >
      <div className="flex-grow p-6 flex flex-col justify-between relative">
        <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10">
          <h5 className="text-lg font-bold mb-2 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300">{apiName}</h5>
          <h6 className="text-xl font-extrabold text-gray-800 dark:text-white mb-2 group-hover:text-white transition-colors duration-300">{title}</h6>
          {description && <p className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300">{description}</p>}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
    </div>
  );
});

const HomePage = ({ darkMode, apiData, isLoading, dashboardRef }) => {
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

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <>
      <section className={`transition-all duration-300 w-full min-h-screen ${
        darkMode 
          ? 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] via-gray-500 to-gray-900 text-white' 
          : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)] text-gray-900'
      } backdrop-blur-md`}>
        <HomeSection 
          darkMode={darkMode} 
          weatherData={apiData?.weather?.fullData} 
          isLoading={isLoading} 
        />
        <main className="container mx-auto px-4" ref={dashboardRef}>
          <h2 className="text-5xl font-bold mb-12 text-center text-white mt-20">DASHBOARD HUB</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {['currents', 'gnews', 'youtube'].map(cardId => (
              <BentoCard
                key={cardId}
                title={apiData[cardId]?.title}
                imageUrl={apiData[cardId]?.image}
                apiName={apiData[cardId]?.apiName}
                onSelect={() => handleCardHover(cardId)}
                isSelected={mainCard === cardId}
                description={apiData[cardId]?.fullData?.description}
              />
            ))}
          </div>
          <div className="bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 rounded-2xl p-8 min-h-[400px] shadow-lg mb-6 backdrop-blur-md">
            {renderMainCard()}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {['weather', 'currency', 'gemini'].map(cardId => (
              <BentoCard
                key={cardId}
                title={apiData[cardId]?.title}
                imageUrl={apiData[cardId]?.image}
                apiName={apiData[cardId]?.apiName}
                onSelect={() => handleCardHover(cardId)}
                isSelected={mainCard === cardId}
                description={apiData[cardId]?.fullData?.description}
              />
            ))}
          </div>
          <div className="mt-6">
            <ApiSummaryWidget darkMode={darkMode} apiData={apiData} />
          </div>
        </main>
      </section>
    </>
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
            <div className="text-red-500 p-4 text-center">{error}</div>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage darkMode={darkMode} apiData={apiData} isLoading={isLoading} dashboardRef={dashboardRef} />} />
              <Route path="/dashboard" element={<HomePage darkMode={darkMode} apiData={apiData} isLoading={isLoading} dashboardRef={dashboardRef} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy darkMode={darkMode} />} />
              <Route path="/terms-of-service" element={<TermsOfService darkMode={darkMode} />} />
              <Route path="/contact" element={<Contact darkMode={darkMode} />} />
            </Routes>
          )}
        </div>
        <Footer darkMode={darkMode} className={`transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] via-gray-500 to-gray-900' 
            : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)]'
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