import React, { useState, useEffect } from 'react';
import { Search, Droplets, Wind, Thermometer, Sun, CloudRain, Cloud, CloudSnow, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'b2092399197c171bd41d857e35626b15';
const API_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_ONE_CALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

const CustomToolbar = ({ date, onNavigate, label }) => {
  return (
    <div className="flex justify-between items-center mb-2 mt-3">
      <button onClick={() => onNavigate('PREV')} className="text-white">
        <ChevronLeft size={20} />
      </button>
      <span className="text-white font-bold">{label}</span>
      <button onClick={() => onNavigate('NEXT')} className="text-white">
        <ChevronRight size={20} />
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

  useEffect(() => {
    if (data && data.fullData) {
      setWeatherData(data.fullData);
      setLoading(false);
    } else {
      fetchWeatherData(city);
    }
  }, [data]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
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
      setWeatherData({ ...oneCallData, name: cityDetails });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (event) => setCity(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== '') fetchWeatherData(city);
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className="text-sky-400" size={48} />;
      case 'rain': return <CloudRain className="text-sky-400" size={48} />;
      case 'clouds': return <Cloud className="text-sky-400" size={48} />;
      case 'snow': return <CloudSnow className="text-sky-400" size={48} />;
      default: return <Sun className="text-sky-400" size={48} />;
    }
  };

  const formatChartData = (hourlyData) => {
    return (hourlyData || []).slice(0, 24).map((hour) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: hour.temp,
    }));
  };

  if (loading) return <div className="text-center text-white">Loading weather data...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!weatherData || !weatherData.current) return <div className="text-center text-white">No weather data available</div>;

  return (
    <div className={`${darkMode ? 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] via-gray-500 to-gray-900' : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)]'} backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out`}>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-9">
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              className="flex-grow p-3 bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 hover:from-purple-600 hover:to-pink-600 transition-colors duration-300">
              <Search size={24} />
            </button>
          </div>
        </form>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">{weatherData.name}</h2>
          <div className="flex items-center justify-center mb-4">
            {getWeatherIcon(weatherData.current.weather[0].main)}
            <span className="text-5xl font-bold ml-2 mt-5">{Math.round(weatherData.current.temp)}°C</span>
          </div>
          <p className="text-2xl mb-4">{weatherData.current.weather[0].main}</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <Thermometer size={24} className="mb-2 text-sky-400" />
              <p className="text-sm">Feels like: {Math.round(weatherData.current.feels_like)}°C</p>
            </div>
            <div className="flex flex-col items-center">
              <Droplets size={24} className="mb-2 text-sky-400" />
              <p className="text-sm">Humidity: {weatherData.current.humidity}%</p>
            </div>
            <div className="flex flex-col items-center">
              <Wind size={24} className="mb-2 text-sky-400" />
              <p className="text-sm">Wind: {Math.round(weatherData.current.wind_speed)} km/h</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold mt-5 mb-5">Calendar</h3>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
            >
              {showCalendar ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
          {showCalendar && (
            <div className="h-80 overflow-hidden mb-2 bg-white bg-opacity-10 rounded-lg p-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4 mt-5">Today's Overview</h3>
            <p className="mb-2">{weatherData.daily[0].weather[0].description}</p>
            <p className="mb-2">
              High: {Math.round(weatherData.daily[0].temp.max)}°C, Low: {Math.round(weatherData.daily[0].temp.min)}°C
            </p>
            <p className="mb-2">Precipitation: {Math.round(weatherData.daily[0].pop * 100)}%</p>
            <p>UV Index: {weatherData.daily[0].uvi}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 mt-9">24-Hour Forecast</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={formatChartData(weatherData.hourly)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="time" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenWeatherMapWidget;