import axios from 'axios';

console.log('All env variables:', import.meta.env);
console.log('VITE_CURRENTS_API_TOKEN:', import.meta.env.VITE_CURRENTS_API_TOKEN);
console.log('VITE_GNEWS_API_KEY:', import.meta.env.VITE_GNEWS_API_KEY);
console.log('VITE_VISUALCROSSING_API_KEY:', import.meta.env.VITE_VISUALCROSSING_API_KEY);
console.log('VITE_CURRENCY_APP_ID:', import.meta.env.VITE_CURRENCY_APP_ID);
console.log('VITE_YOUTUBE_API_KEY:', import.meta.env.VITE_YOUTUBE_API_KEY);
console.log('VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY);
console.log('MODE:', import.meta.env.MODE);

const CURRENTS_API_TOKEN = import.meta.env.VITE_CURRENTS_API_TOKEN || 'MvNmDZsOa6sV0tpo6cRKn6iLqqKG_tcpdKD__jPiuGjIMBrX';
const CURRENTS_API_URL = 'https://api.currentsapi.services/v1/latest-news';

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '620325099eac8848a4338f0ee846acc9';
const GNEWS_API_URL = 'https://gnews.io/api/v4/top-headlines';

const VISUALCROSSING_API_KEY = import.meta.env.VITE_VISUALCROSSING_API_KEY || 'WJQ87927G6LDHZL7MMABYGSUN';
const VISUALCROSSING_API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const CURRENCY_APP_ID = import.meta.env.VITE_CURRENCY_APP_ID || '1755cc46e0374909abec5c859c9a0f6a';
const CURRENCY_BASE_URL = 'https://openexchangerates.org/api';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY_2 || 'AIzaSyAITBXBREQk5iB9ascWPEsevLxSB98KfWU';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUsPd1SlVjJ03Tu8K5HQBEIRYAfgTEnsc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const apiEndpoints = {
  currents: CURRENTS_API_URL,
  gnews: GNEWS_API_URL,
  weather: VISUALCROSSING_API_URL,
  currency: CURRENCY_BASE_URL,
  youtube: YOUTUBE_API_URL,
  gemini: GEMINI_API_URL,
};

export const fetchData = async (url, options = {}) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchCurrentsNews = async () => {
  try {
    const url = `${CURRENTS_API_URL}?apiKey=${CURRENTS_API_TOKEN}`;
    const response = await axios.get(url);
    const news = response.data.news[0];
    return {
      title: news.title,
      description: news.description,
      image: news.image || 'https://via.placeholder.com/150?text=Currents News'
    };
  } catch (error) {
    console.error('Error fetching Currents news:', error);
    return { title: 'Currents News Unavailable', description: 'Failed to fetch news', image: 'https://via.placeholder.com/150?text=Currents News Error' };
  }
};

export const fetchGNews = async () => {
  try {
    const url = `${GNEWS_API_URL}?lang=en&token=${GNEWS_API_KEY}`;
    const response = await axios.get(url);
    const news = response.data.articles[0];
    return {
      title: news.title,
      description: news.description,
      image: news.image || 'https://via.placeholder.com/150?text=GNews'
    };
  } catch (error) {
    console.error('Error fetching GNews:', error);
    return { title: 'GNews Unavailable', description: 'Failed to fetch news', image: 'https://via.placeholder.com/150?text=GNews Error' };
  }
};

export const fetchWeather = async (city = 'Las Pinas City') => {
  try {
    const url = `${VISUALCROSSING_API_URL}/${city}?unitGroup=metric&key=${VISUALCROSSING_API_KEY}&contentType=json`;
    const response = await axios.get(url);
    const currentConditions = response.data.currentConditions;
    return {
      title: `${Math.round(currentConditions.temp)}°C, ${currentConditions.conditions}`,
      description: `${city}: ${currentConditions.conditions}`,
      image: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${currentConditions.icon}.png`
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return { title: 'Weather Unavailable', description: 'Failed to fetch weather data', image: 'https://via.placeholder.com/150?text=Weather Error' };
  }
};

export const fetchCurrencyWithHistory = async () => {
  try {
    const response = await axios.get(`${CURRENCY_BASE_URL}/latest.json?app_id=${CURRENCY_APP_ID}`);
    const usdToEur = response.data.rates.EUR;
    return {
      title: 'USD to EUR Exchange Rate',
      description: `$1 = €${usdToEur.toFixed(2)}`,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png'
    };
  } catch (error) {
    console.error('Error fetching currency data:', error);
    return { title: 'Currency unavailable', description: 'Unable to fetch exchange rates', image: 'https://via.placeholder.com/150?text=Currency Error' };
  }
};

export const fetchYouTube = async () => {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'snippet',
        q: 'trending',
        type: 'video',
        key: YOUTUBE_API_KEY,
        maxResults: 1
      }
    });
    const video = response.data.items[0];
    return {
      title: video.snippet.title,
      description: video.snippet.description,
      image: video.snippet.thumbnails.medium.url
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error.response ? error.response.data : error.message);
    return { 
      title: 'YouTube Unavailable', 
      description: 'Failed to fetch YouTube data', 
      image: 'https://via.placeholder.com/150?text=YouTube Error' 
    };
  }
};

export const fetchGeminiAI = async (prompt = "Give me a brief insight about today's global trends") => {
  try {
    const response = await axios.post(GEMINI_API_URL, 
      { contents: [{ parts: [{ text: prompt }] }] },
      { 
        params: { key: GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return {
      title: 'Gemini AI Insight',
      description: generatedText,
      image: 'https://via.placeholder.com/150?text=Gemini AI'
    };
  } catch (error) {
    console.error('Error fetching Gemini AI data:', error);
    return { 
      title: 'Gemini AI Unavailable', 
      description: 'Failed to fetch Gemini AI insight', 
      image: 'https://via.placeholder.com/150?text=Gemini AI Error' 
    };
  }
};

export const fetchAllData = async () => {
  try {
    const [currentsNews, gnews, weather, currency, youtube, gemini] = await Promise.all([
      fetchCurrentsNews(),
      fetchGNews(),
      fetchWeather('Las Pinas City'),
      fetchCurrencyWithHistory(),
      fetchYouTube(),
      fetchGeminiAI(),
    ]);

    return {
      currents: {
        title: currentsNews.title,
        image: currentsNews.image,
        apiName: 'Currents API',
        fullData: currentsNews
      },
      gnews: {
        title: gnews.title,
        image: gnews.image,
        apiName: 'GNews API',
        fullData: gnews
      },
      weather: {
        title: weather.title,
        image: weather.image,
        apiName: 'Visual Crossing API',
        fullData: weather
      },
      currency: {
        title: currency.title,
        image: currency.image,
        apiName: 'Currency Exchange API',
        fullData: currency
      },
      youtube: {
        title: youtube.title,
        image: youtube.image,
        apiName: 'YouTube API',
        fullData: youtube
      },
      gemini: {
        title: gemini.title,
        image: gemini.image,
        apiName: 'Gemini AI API',
        fullData: gemini
      },
    };
  } catch (error) {
    console.error('Error fetching all data:', error);
    return null;
  }
};

export default {
  fetchCurrentsNews,
  fetchGNews,
  fetchWeather,
  fetchCurrencyWithHistory,
  fetchYouTube,
  fetchGeminiAI,
  fetchAllData,
  apiEndpoints,
  fetchData,
};