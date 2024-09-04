// File: src/components/Weather.jsx

import React, { useState, useEffect } from 'react';
import { Search, Droplets, Wind, Thermometer, Sun, CloudRain, Cloud, CloudSnow } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingSpinner from './LoadingSpinner';

const API_KEY = import.meta.env.VITE_VISUALCROSSING_API_KEY;
const API_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const Weather = ({ darkMode }) => {
  const [city, setCity] = useState('Las Piñas City');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(cityName)}?unitGroup=metric&key=${API_KEY}&contentType=json`);
      if (!response.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(city);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Date not available';
    }
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZone: weatherData?.timezone || 'UTC'
    };
    return date.toLocaleString('en-US', options);
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="text-yellow-400" size={48} />;
      case 'rain':
        return <CloudRain className="text-blue-400" size={48} />;
      case 'cloudy':
        return <Cloud className={darkMode ? "text-gray-300" : "text-gray-600"} size={48} />;
      case 'snow':
        return <CloudSnow className="text-blue-200" size={48} />;
      default:
        return <Sun className="text-yellow-400" size={48} />;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  const hourlyData = weatherData ? weatherData.days[0].hours.concat(weatherData.days[1].hours).slice(0, 28).map(hour => ({
    ...hour,
    datetime: new Date(`${weatherData.days[0].datetime}T${hour.datetime}`).getTime()
  })) : [];

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              className={`flex-grow p-2 rounded-l-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
              <Search size={24} />
            </button>
          </div>
        </form>

        {weatherData && (
          <div>
            <div className={`rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 ${darkMode 
              ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
              : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
            }`}>
              <h2 className="text-3xl font-bold mb-2 text-sky-500">{weatherData.resolvedAddress}</h2>
              <p className="text-lg italic mb-4 text-gray-400">
                {formatDate(`${weatherData.days[0].datetime}T${weatherData.currentConditions.datetime}`)}
              </p>
              <div className="flex items-center mb-4">
                {getWeatherIcon(weatherData.currentConditions.conditions)}
                <span className="text-5xl ml-4">{Math.round(weatherData.currentConditions.temp)}°C</span>
              </div>
              <p className="text-xl  mb-2 text-sky-400">
                {weatherData.currentConditions.conditions}
              </p>
              <p className="mb-4 text-white-600 italic">{weatherData.description}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Thermometer className="mr-2 text-red-500" />
                  <p>Feels like: {Math.round(weatherData.currentConditions.feelslike)}°C</p>
                </div>
                <div className="flex items-center">
                  <Droplets className="mr-2 text-blue-500" />
                  <p>Humidity: {weatherData.currentConditions.humidity}%</p>
                </div>
                <div className="flex items-center">
                  <Wind className="mr-2 text-white-500" />
                  <p>Wind: {Math.round(weatherData.currentConditions.windspeed)} km/h</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">28-Hour Forecast</h3>
            <div className={`rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 ${darkMode 
              ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
              : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
            }`}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4a4a4a" : "#e0e0e0"} />
                  <XAxis 
                    dataKey="datetime" 
                    tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                    stroke={darkMode ? "#d6d6d6" : "#333"} 
                  />
                  <YAxis stroke={darkMode ? "#d6d6d6" : "#333"} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#2a2a2a' : '#fff', 
                      border: `1px solid ${darkMode ? '#6f42c1' : '#ddd'}`, 
                      borderRadius: '4px' 
                    }}
                    labelStyle={{ color: darkMode ? '#d6d6d6' : '#333' }}
                    itemStyle={{ color: darkMode ? '#d6d6d6' : '#333' }}
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                  />
                  <Line type="monotone" dataKey="temp" stroke="#ff69b4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h3 className="text-2xl font-bold mb-4">6-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {weatherData.days.slice(1, 7).map((day, index) => (
                <div key={index} className={`rounded-lg shadow-lg p-4 transition-all duration-300 ${darkMode 
                  ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
                  : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
                }`}>
                  <p className="font-bold text-center">{new Date(day.datetime).toLocaleDateString([], { weekday: 'long' })}</p>
                  <div className="flex justify-center mt-2">
                    {getWeatherIcon(day.conditions)}
                  </div>
                  <p className="text-center mt-2">{Math.round(day.tempmin)}°C - {Math.round(day.tempmax)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;