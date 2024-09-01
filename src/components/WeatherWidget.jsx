import React, { useState, useEffect } from 'react';
import { Search, Droplets, Wind, Thermometer, Sun, CloudRain, Cloud, CloudSnow } from 'lucide-react';

import ErrorBoundary from './ErrorBoundary';

console.log('All env variables:', import.meta.env);
console.log('VITE_OPENWEATHER_API_KEY:', import.meta.env.VITE_OPENWEATHER_API_KEY);
console.log('MODE:', import.meta.env.MODE);

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '91c55f5aa1c412f7068fa589ae99b46a';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

console.log('API_KEY being used:', API_KEY);

const WeatherWidget = ({ darkMode }) => {
  const [city, setCity] = useState('Las Pinas City');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Geocoding
        const geoResponse = await fetch(`${GEOCODING_API_URL}?q=${city},PH&limit=1&appid=${API_KEY}`);
        if (!geoResponse.ok) throw new Error('Failed to geocode city.');
        const geoData = await geoResponse.json();
        if (geoData.length === 0) throw new Error('City not found in the Philippines.');

        const { lat, lon, name, state } = geoData[0];

        // Weather data
        const weatherResponse = await fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data.');
        const weatherData = await weatherResponse.json();

        setWeatherData({ ...weatherData, city: { ...weatherData.city, name, state } });

        // Map URL
        setMapUrl(`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${lat}&lon=${lon}&zoom=8`);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== '') {
      setCity(city.trim());
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="text-yellow-300" size={48} />;
      case 'rain':
        return <CloudRain className="text-blue-300" size={48} />;
      case 'clouds':
        return <Cloud className={darkMode ? "text-gray-400" : "text-gray-600"} size={48} />;
      case 'snow':
        return <CloudSnow className="text-white" size={48} />;
      default:
        return <Sun className="text-yellow-300" size={48} />;
    }
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Manila',
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <ErrorBoundary>
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-gray-200 via-pink-200 to-white'} p-4 opacity-90 transition duration-300 ease-in-out`}>
        <div className="max-w-2xl mx-auto ">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex relative overflow-hidden">
              <input
                type="text"
                className={`flex-grow px-4 py-3 rounded-l-xl ${darkMode ? 'bg-gray-800 text-white focus:ring-2 focus:ring-purple-400' : 'bg-white text-gray-800 focus:ring-2 focus:ring-purple-400'} border border-transparent transition duration-300 ease-in-out`}
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city name in the Philippines"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-r-xl focus:outline-none hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out overflow-hidden relative"
                disabled={loading}
              >
                {loading ? 'Loading...' : <Search size={20} />}
              </button>
            </div>
          </form>

          {error && <div className="text-center text-red-500 mb-8">{error}</div>}

          {weatherData && (
            <div>
              <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-pink-400 via-purple-500 to-pink-400'} p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl`}>
                <div>
                  <h2 className={`text-3xl mb-4 ${darkMode ? 'text-white font-bold' : 'text-white font-bold'}`}>{weatherData.city.name}, {weatherData.city.state}</h2>
                  <p className="text-white mb-4">
                    {formatDate(currentTime)}
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    {getWeatherIcon(weatherData.list[0].weather[0].main)}
                    <span className="text-6xl ml-4 text-white">{Math.round(weatherData.list[0].main.temp)}°C</span>
                  </div>
                  <p className="text-2xl mb-4 text-white">
                    {weatherData.list[0].weather[0].main}
                  </p>
                  <div className="mb-4">
                    <p className="mb-2 text-white">Today's Overview:</p>
                    <p className="mb-0 text-gray-100">{weatherData.list[0].weather[0].description}</p>
                    <p className="mb-0 text-gray-100">
                      High: {Math.round(weatherData.list[0].main.temp_max)}°C,
                      Low: {Math.round(weatherData.list[0].main.temp_min)}°C
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-white">Tomorrow's Overview:</p>
                    <p className="mb-0 text-gray-100">{weatherData.list[8].weather[0].description}</p>
                    <p className="mb-0 text-gray-100">
                      High: {Math.round(weatherData.list[8].main.temp_max)}°C,
                      Low: {Math.round(weatherData.list[8].main.temp_min)}°C
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-pink-400 hover:bg-pink-500'} transition duration-300 ease-in-out`}>
                      <Thermometer className="text-white mb-2 mx-auto" size={24} />
                      <p className="mb-0 text-sm text-gray-100">
                        Feels like: {Math.round(weatherData.list[0].main.feels_like)}°C
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-pink-400 hover:bg-pink-500'} transition duration-300 ease-in-out`}>
                      <Droplets className="text-white mb-2 mx-auto" size={24} />
                      <p className="mb-0 text-sm text-gray-100">
                        Humidity: {weatherData.list[0].main.humidity}%
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-pink-400 hover:bg-pink-500'} transition duration-300 ease-in-out`}>
                      <Wind className="text-white mb-2 mx-auto" size={24} />
                      <p className="mb-0 text-sm text-gray-100">
                        Wind: {Math.round(weatherData.list[0].wind.speed)} km/h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Weather Map</h3>
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    title="Weather Map"
                  ></iframe>
                </div>
              </div>

            
              <div>
                <h3 className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>24-Hour Forecast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {weatherData.list.slice(0, 8).map((data, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${darkMode ? 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-pink-400 via-purple-500 to-pink-400'} shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out`}
                    >
                      <p className="text-sm mb-2 text-gray-100">{new Date(data.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
                      {getWeatherIcon(data.weather[0].main)}
                      <p className="text-lg mb-1 text-white">{Math.round(data.main.temp)}°C</p>
                      <p className="text-sm mb-0 text-gray-100">{data.weather[0].main}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default WeatherWidget;