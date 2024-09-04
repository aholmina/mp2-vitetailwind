const BentoCard = React.memo(({ title, imageUrl, apiName, onSelect, isSelected, description, fullDescription, darkMode, icon: Icon }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = (e) => {
    e.stopPropagation();
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      onClick={onSelect}
      className={`
        ${darkMode 
          ? 'bg-gray-900 bg-opacity-80 text-white border-b-4 border-purple-500 hover:shadow-[0_10px_20px_rgba(147,51,234,0.5)]' 
          : 'bg-gradient-to-br from-blue-100 to-pink-100 text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'}
        rounded-2xl p-6 transition-all duration-300 transform hover:scale-105
        backdrop-filter backdrop-blur-lg cursor-pointer
        ${isSelected ? 'ring-2 ring-purple-500' : ''}
        h-[220px] flex flex-col justify-between relative group overflow-hidden
      `}
    >
      {imageUrl && <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl" />}
      <div className="relative z-10">
        {Icon && <Icon className={`text-4xl mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'} group-hover:text-white transition-colors duration-300`} />}
        <h5 className={`text-lg font-bold mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'} group-hover:text-white transition-colors duration-300`}>{apiName}</h5>
        <h6 className={`text-xl font-extrabold mb-2 ${darkMode ? 'text-white italic' : 'text-gray-800 italic'} group-hover:text-white transition-colors duration-300`}>{title}</h6>
        <p className={`text-sm font-medium ${darkMode ? 'text-gray-300 italic' : 'text-gray-600 italic'} group-hover:text-white transition-colors duration-300`}>
          {showFullDescription ? fullDescription : description}
          {fullDescription && fullDescription !== description && (
            <button 
              onClick={toggleDescription}
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              {showFullDescription ? 'Show Less' : 'Show More'} 
            </button>
          )}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
});