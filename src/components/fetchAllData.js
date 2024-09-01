const fetchAllData = async () => {
  const apiKeys = ['currents', 'weather', 'currency', 'youtube'];
  const data = {};

  for (const key of apiKeys) {
    try {
      let summaryResponse, summaryData;

      switch (key) {
        case 'currents':
          summaryResponse = await fetch('https://api.currentsapi.services/v1/latest-news?language=en&apiKey=MvNmDZsOa6sV0tpo6cRKn6iLqqKG_tcpdKD__jPiuGjIMBrX');
          summaryData = await summaryResponse.json();
          if (summaryData.news && summaryData.news.length > 0) {
            data[key] = {
              title: summaryData.news[0].title || '',
              description: summaryData.news[0].description || '',
              apiName: 'Currents API',
              imageUrl: summaryData.news[0].image || '',
            };
          } else {
            throw new Error('No news found');
          }
          break;

        case 'weather':
          summaryResponse = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Las%20Pinas%20City?unitGroup=metric&key=WJQ87927G6LDHZL7MMABYGSUN&contentType=json');
          summaryData = await summaryResponse.json();
          data[key] = {
            title: `Weather in ${summaryData.address}`,
            description: summaryData.description || '',
            apiName: 'Visual Crossing Weather API',
            imageUrl: summaryData.currentConditions.icon === 'clear-day' ? '/path/to/sun-logo.png' : '/path/to/cloud-logo.png',
          };
          break;

        case 'currency':
          summaryResponse = await fetch('https://real-time-finance-data.p.rapidapi.com/currencies', {
            headers: {
              'x-rapidapi-key': 'eca1efd2c9msh6f47c703a1a5ff2p19aa90jsn3341ebea3870',
              'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
            },
          });
          summaryData = await summaryResponse.json();
          data[key] = {
            title: 'Currency Exchange Rates',
            description: 'Real-time currency exchange rates',
            apiName: 'Real-Time Finance Data API',
            imageUrl: '/path/to/us-flag.png',
          };
          break;

        case 'youtube':
          summaryResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=AIzaSyDjILBZ96SsOURt-undwkPWTSNsD2jnwkc`);
          summaryData = await summaryResponse.json();
          if (summaryData.items && summaryData.items.length > 0) {
            data[key] = {
              title: summaryData.items[0].snippet.title || '',
              description: summaryData.items[0].snippet.description || '',
              apiName: 'YouTube Data API',
              imageUrl: summaryData.items[0].snippet.thumbnails.high.url || '',
            };
          } else {
            throw new Error('No videos found');
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${key} data:`, error);
      data[key] = {
        title: 'N/A',
        description: 'Failed to fetch data',
        apiName: key.toUpperCase(),
        imageUrl: '',
      };
    }
  }

  return data;
};

export default fetchAllData;