import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CURRENCY_APP_ID = import.meta.env.VITE_CURRENCY_APP_ID;
const BASE_URL = 'https://openexchangerates.org/api';

const CurrencyExchange = ({ darkMode }) => {
  const [rates, setRates] = useState({});
  const [historicalRates, setHistoricalRates] = useState({});
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      if (error.response && error.response.status === 401) {
        throw new Error('API key is invalid or unauthorized. Please check your API key.');
      }
      throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Validate API key format
        if (!CURRENCY_APP_ID || !/^[a-f0-9]{32}$/.test(CURRENCY_APP_ID)) {
          throw new Error('Invalid API key format. Please check your API key.');
        }

        const [ratesData, currenciesData, historicalData] = await Promise.all([
          fetchData(`${BASE_URL}/latest.json?app_id=${CURRENCY_APP_ID}`),
          fetchData(`${BASE_URL}/currencies.json`),
          fetchData(`${BASE_URL}/historical/${getOneMonthAgoDate()}.json?app_id=${CURRENCY_APP_ID}`)
        ]);
        
        setRates(ratesData.rates);
        setCurrencies(currenciesData);
        setHistoricalRates(historicalData.rates);
      } catch (error) {
        console.error('Error fetching all data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getOneMonthAgoDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  };

  const handleConvert = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  };

  const getFlag = (currencyCode) => {
    const countryCode = currencyCode.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w20/${countryCode}.png`;
  };

  const calculatePercentageChange = (currency) => {
    if (rates[currency] && historicalRates[currency]) {
      return ((rates[currency] - historicalRates[currency]) / historicalRates[currency] * 100).toFixed(2);
    }
    return 'N/A';
  };

  if (isLoading) {
    return <div className="text-white text-center">Loading currency data...</div>;
  }

  if (error) {
    return (
      <div className={`p-5 rounded-2xl bg-gradient-to-br from-gray-800 via-pink-500 to-gray-700 text-white shadow-lg h-full flex flex-col transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Currency Exchange Rates</h2>
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-white text-center mt-2">API Key: {CURRENCY_APP_ID ? 'Available' : 'Missing'}</p>
        <p className="text-white text-center mt-2">API Key Format: {/^[a-f0-9]{32}$/.test(CURRENCY_APP_ID) ? 'Valid' : 'Invalid'}</p>
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br from-gray-800 via-pink-500 to-gray-700 text-white shadow-lg h-full flex flex-col transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Currency Exchange Rates</h2>
      
      <div className="flex flex-wrap gap-2 mb-5">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-2 border border-white/20 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/25"
        />
        <select 
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-2 border border-white/20 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/25"
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>{code} - {name}</option>
          ))}
        </select>
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
          className="p-2 border border-white/20 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/25"
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>{code} - {name}</option>
          ))}
        </select>
        <button 
          onClick={handleConvert} 
          className="p-2 bg-pink-500 text-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-pink-600 hover:-translate-y-0.5 relative overflow-hidden group"
        >
          Convert
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
        {convertedAmount && (
          <p className="w-full mt-2 font-bold text-pink-300">{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
        )}
      </div>

      <div className="overflow-x-auto flex-grow">
        <h3 className="text-xl text-sky-300 mb-4">Exchange Rates (Base: USD)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {Object.entries(rates).map(([currency, rate]) => {
            const percentageChange = calculatePercentageChange(currency);
            const isIncrease = percentageChange > 0;
            const isDecrease = percentageChange < 0;
            return (
              <motion.div
                key={currency}
                className={`flex items-center gap-2 p-2 bg-black/20 rounded-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group
                  ${isIncrease ? 'bg-green-900/10' : ''} ${isDecrease ? 'bg-red-900/10' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={getFlag(currency)} alt={`${currency} flag`} className="w-5 h-4 object-cover rounded" />
                <span className="font-bold text-sky-300">{currency}</span>
                <span className="ml-auto">{rate.toFixed(4)}</span>
                <span className={`font-bold ${isIncrease ? 'text-green-400' : ''} ${isDecrease ? 'text-red-400' : ''}`}>
                  {percentageChange !== 'N/A' ? `${percentageChange}%` : 'N/A'}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;