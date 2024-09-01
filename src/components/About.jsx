import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faCloudSun, faBrain, faVideo, faMoneyBillWave, faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import creatorPhoto from '../assets/port34.jpg';

const About = ({ darkMode }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    { icon: faNewspaper, title: "Latest News", description: "Stay updated with real-time news from trusted sources across the globe." },
    { icon: faCloudSun, title: "Weather Forecasts", description: "Get accurate weather predictions and alerts for any location." },
    { icon: faBrain, title: "AI Insights", description: "Leverage the power of AI to gain deeper understanding and analysis." },
    { icon: faVideo, title: "YouTube Integration", description: "Discover and watch relevant YouTube content directly within our platform." },
    { icon: faMoneyBillWave, title: "Currency Exchange", description: "Access real-time currency exchange rates and convert between different currencies." },
    { icon: faCalendarAlt, title: "Google Calendar Integration", description: "Seamlessly integrate your Google Calendar to view and manage your schedule." },
  ];

  const creator = {
    name: "Alexa D Holmina",
    role: "Founder & Lead Developer",
    photo: creatorPhoto,
    projectJourney: `
      My journey in creating Data HUB began with a vision to centralize essential information for daily life. Here's how I brought this project to life:

      Conceptualization: Identified the need for a unified platform that brings together various data sources.
      Technology Stack: Chose React for the frontend, leveraging its component-based architecture. Used Tailwind CSS for styling.
      API Integration: Integrated News, Weather, YouTube, Currency Exchange, and Google Calendar APIs.
      AI Implementation: Utilized machine learning APIs for data analysis and personalized insights.
      User Experience: Created an intuitive interface with smooth transitions and interactive elements.
      Testing and Refinement: Ensured all components work harmoniously and refined based on user feedback.
      Deployment: Utilized modern techniques to ensure scalability and performance.

      This project represents my passion for creating tools that simplify and enhance daily life through technology.
    `
  };

  const getRadius = () => {
    if (windowWidth < 640) return 110;
    if (windowWidth < 1024) return 140;
    return 170;
  };

  const BentoCard = ({ children, className, onClick }) => (
    <div 
      className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  const FeatureCard = ({ feature, index, total }) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = getRadius();
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, x, y }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.1, zIndex: 10 }}
        className={`absolute w-20 sm:w-24 md:w-28 p-2 sm:p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer ${
          darkMode 
            ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.7)] to-[hsla(197,100%,85%,0.7)]' 
            : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.7)] to-[hsla(323,57%,39%,0.7)]'
        } backdrop-blur-md`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <FontAwesomeIcon icon={feature.icon} size="lg" className="text-white mb-2" />
        <h4 className="text-xs sm:text-sm font-semibold mb-1 text-white">{feature.title}</h4>
        <AnimatePresence>
          {hoveredCard === index && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-white text-xs overflow-hidden"
            >
              {feature.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const ResponsiveModal = ({ isOpen, onClose, children }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4 py-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-gradient-to-r from-[hsla(323,57%,39%,0.9)] to-[hsla(197,100%,85%,0.9)] backdrop-filter backdrop-blur-lg rounded-3xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className={`pt-24 pb-16 transition-all duration-300 w-full min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] via-gray-500 to-gray-900 text-white' 
        : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)] text-gray-900'
    } backdrop-blur-md overflow-hidden`}>
      <div className="container mx-auto px-4 relative">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-24 text-center text-white"
        >
          About Data HUB
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24">
          <div className="relative flex justify-center items-center w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} total={features.length} />
            ))}
          </div>
          
          <div className="flex flex-col gap-8 w-full max-w-md">
            <BentoCard className="transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-white">All-in-One Information Hub</h3>
              <p className="text-white text-center text-sm">
                Data HUB brings together news, weather, AI insights, YouTube content, currency exchange rates, and Google Calendar integration in one seamless experience.
              </p>
            </BentoCard>
            
            <div className="grid grid-cols-2 gap-4">
              <BentoCard className="col-span-1 row-span-1 flex items-center justify-center">
                <img src={creator.photo} alt={creator.name} className="w-full h-full object-cover rounded-2xl" />
              </BentoCard>
              <BentoCard className="col-span-1 row-span-1 flex flex-col justify-center">
                <h4 className="text-lg font-semibold text-white">{creator.name}</h4>
                <p className="text-sm text-white">{creator.role}</p>
              </BentoCard>
              <BentoCard 
                className="col-span-2 cursor-pointer transition-all duration-300 hover:shadow-2xl"
                onClick={() => setShowCreatorModal(true)}
              >
                <p className="text-white text-sm text-center">More About the Creator</p>
              </BentoCard>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveModal isOpen={showCreatorModal} onClose={() => setShowCreatorModal(false)}>
        <div className="flex flex-col items-center text-white">
          <img src={creator.photo} alt={creator.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2" />
          <h2 className="text-xl sm:text-2xl font-bold mb-1">{creator.name}</h2>
          <p className="text-sm sm:text-base mb-3">{creator.role}</p>
          <div className="text-xs sm:text-sm leading-relaxed space-y-2">
            {creator.projectJourney.split('\n\n').map((paragraph, index, array) => (
              <p key={index} className={index === array.length - 1 ? 'mb-6' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ResponsiveModal>
    </section>
  );
};

export default About;