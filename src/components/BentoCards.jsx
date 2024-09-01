import React from 'react';

const BentoCard = ({ title, description, apiName, darkMode }) => (
  <div className={`${darkMode ? 'bg-gradient-to-r from-blue-200 via-pink-300 to-gray-900' : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)]'} backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out p-6`}>
    <h3 className="text-2xl font-semibold mb-2">{apiName}</h3>
    <h4 className="text-xl font-medium mb-1">{title}</h4>
    <p className="text-base">{description}</p>
  </div>
);

const BentoCards = ({ data, isLoading, darkMode }) => {
  if (isLoading) {
    return <div className="text-center text-white">Loading API data...</div>;
  }

  if (!data) {
    return <div className="text-center text-white">No API data available</div>;
  }

  const apiKeys = ['currents', 'weather', 'currency', 'youtube'];

  return (
    <div className="grid grid-cols-2 gap-6">
      {apiKeys.map((key) => (
        <BentoCard
          key={key}
          title={data[key]?.title || 'N/A'}
          description={data[key]?.description || 'No description available'}
          apiName={data[key]?.apiName || key.toUpperCase()}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default BentoCards;