import React, { useState, useEffect } from 'react';
import { Search, Droplets, Wind, Thermometer, Sun, CloudRain, Cloud, CloudSnow, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_ONE_CALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ date, onNavigate, label }) => {
  return (
    <div className="flex justify-between items-center mb-1 mt-1">
      <button onClick={() => onNavigate('PREV')} className="text-white">
        <ChevronLeft size={16} />
      </button>
      <span className="text-white text-sm font-bold">{label}</span>
      <button onClick={() => onNavigate('NEXT')} className="text-white">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const OpenWeatherMapWidget = ({ darkMode, data }) => {
  const [city, setCity] = useState('Las Piñas');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchWeatherData = async (cityName) => {
    try {
      const geoResponse = await fetch(`${API_GEO_URL}?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`);
      if (!geoResponse.ok) throw new Error('City not found. Please check the spelling and try again.');
      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error('City not found. Please check the spelling and try again.');
      const { lat, lon } = geoData[0];
      const cityDetails = [geoData[0].name, geoData[0].state, geoData[0].country].filter(Boolean).join(', ');

      const oneCallResponse = await fetch(`${API_ONE_CALL_URL}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`);
      if (!oneCallResponse.ok) {
        if (oneCallResponse.status === 429) throw new Error('API request limit exceeded. Please try again later.');
        throw new Error('Failed to fetch weather data. Please try again.');
      }
      const oneCallData = await oneCallResponse.json();
      return { ...oneCallData, name: cityDetails };
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (data && data.fullData) {
      setWeatherData(data.fullData);
      setLoading(false);
    } else {
      handleFetchWeatherData(city);
    }
  }, [data]);

  const handleFetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (event) => setCity(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== '') handleFetchWeatherData(city);
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className="text-yellow-400" size={48} />;
      case 'rain': return <CloudRain className="text-blue-400" size={48} />;
      case 'clouds': return <Cloud className="text-gray-300" size={48} />;
      case 'snow': return <CloudSnow className="text-blue-200" size={48} />;
      default: return <Sun className="text-yellow-400" size={48} />;
    }
  };

  const formatChartData = (hourlyData) => {
    return (hourlyData || []).slice(0, 24).map((hour) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: hour.temp,
    }));
  };

  if (loading) return <div className="text-center text-white text-sm">Loading weather data...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">{error}</div>;
  if (!weatherData || !weatherData.current) return <div className="text-center text-white text-sm">No weather data available</div>;

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)]'} backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out mt-5`}>
      <div className="p-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-lg shadow-lg p-4 transition-all duration-300 ${darkMode 
            ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
            : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
          }`}>
            <h2 className="text-2xl font-bold mb-2 text-sky-500">{weatherData.name}</h2>
            <div className="flex items-center justify-center mb-2">
              {getWeatherIcon(weatherData.current.weather[0].main)}
              <span className="text-4xl ml-4">{Math.round(weatherData.current.temp)}°C</span>
            </div>
            <p className="text-lg mb-2 text-sky-400">
              {weatherData.current.weather[0].main}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center text-sm">
                <Thermometer className="mr-1 text-red-400 flex-shrink-0" size={20} />
                <p>Feels like: {Math.round(weatherData.current.feels_like)}°C</p>
              </div>
              <div className="flex items-center text-sm">
                <Droplets className="mr-1  text-blue-400 flex-shrink-0" size={20} />
                <p>Humidity: {weatherData.current.humidity}%</p>
              </div>
              <div className="flex items-center text-sm ">
                <Wind className="mr-2 text-yellow-400 flex-shrink-0" size={20} />
                <p>Wind: {Math.round(weatherData.current.wind_speed)} km/h</p>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg shadow-lg p-4 transition-all duration-300 ${darkMode 
            ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
            : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
          }`}>
            <h3 className="text-xl font-bold mb-2 text-white">Today's Overview</h3>
            <p className="text-base mb-1 italic">{weatherData.daily[0].weather[0].description}</p>
            <p className="mb-1 mt-2 text-sm">
              High: {Math.round(weatherData.daily[0].temp.max)}°C, Low: {Math.round(weatherData.daily[0].temp.min)}°C
            </p>
            <p className="mb-1 text-sm">Precipitation: {Math.round(weatherData.daily[0].pop * 100)}%</p>
            <p className="text-sm">UV Index: {weatherData.daily[0].uvi}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-white">Calendar</h3>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              {showCalendar ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          {showCalendar && (
            <div className={`h-48 overflow-hidden mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-10'} rounded-lg p-1`}>
              <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                view="month"
                views={['month']}
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                style={{ height: '100%' }}
                components={{
                  toolbar: CustomToolbar,
                }}
              />
            </div>
          )}
        </div>

        <div className={`rounded-lg shadow-lg p-4 transition-all duration-300 ${darkMode 
          ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
          : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
        }`}>
          <h3 className="text-xl font-bold mb-4 text-white">24-Hour Forecast</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={formatChartData(weatherData.hourly)}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4a4a4a" : "rgba(255, 255, 255, 0.1)"} />
              <XAxis dataKey="time" stroke={darkMode ? "#d6d6d6" : "#fff"} tick={{ fontSize: 10 }} />
              <YAxis stroke={darkMode ? "#d6d6d6" : "#fff"} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#2a2a2a' : 'rgba(0, 0, 0, 0.8)', border: darkMode ? '1px solid #6f42c1' : 'none' }} />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OpenWeatherMapWidget;