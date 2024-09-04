import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBalanceScale, faFileContract, faHandshake } from '@fortawesome/free-solid-svg-icons';

const TermsOfService = ({ darkMode }) => {
  const BentoCard = ({ children, className }) => (
    <div 
      className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );

  return (
    <section className={`pt-24 pb-16 transition-all duration-300 w-full min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-l from-[hsla(197,100%,85%,0.603)] via-gray-500 to-gray-900 text-white' 
        : 'bg-gradient-to-l from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)] text-gray-900'
    } backdrop-blur-md overflow-hidden`}>
      <div className="container mx-auto px-4 relative">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-24 text-center text-white "
        >
          Terms of Service  
        </motion.h1>

        <div className="flex flex-col items-center gap-8">
          <BentoCard className="max-w-4xl w-full transform hover:scale-105 transition-all duration-300">
            <p className="text-white text-lg mb-6 italic">
              Welcome to Data HUB. By accessing or using our application, you agree to comply with and be bound by these Terms of Service. Our application provides weather information, news aggregation, AI-powered insights, YouTube content integration, currency conversion, and Google Calendar management. While we strive to ensure the accuracy and reliability of the information and services provided, we do not guarantee their completeness, timeliness, or accuracy. You use our application at your own risk and discretion.
            </p>
            <p className="text-white text-lg italic">
              You agree not to use our application for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. We reserve the right to modify, suspend, or terminate our services at any time without notice. Your use of third-party APIs (such as Weather API, News API, Gemini AI API, YouTube API, Currency Converter API, and Google Calendar API) through our application is also subject to the respective terms and conditions of these services. We are not responsible for any issues arising from the use of these third-party services.  
            </p>
          </BentoCard>
          
          <div className="flex justify-center gap-8">
            <BentoCard className="flex flex-col items-center p-4">
              <FontAwesomeIcon icon={faBalanceScale} size="2x" className="text-white mb-2" />  
              <p className="text-white text-center">Fair Use</p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center p-4">
              <FontAwesomeIcon icon={faFileContract} size="2x" className="text-white mb-2" />
              <p className="text-white text-center">Legal Compliance</p>   
            </BentoCard>
            <BentoCard className="flex flex-col items-center p-4"> 
              <FontAwesomeIcon icon={faHandshake} size="2x" className="text-white mb-2" />
              <p className="text-white text-center">Use at Own Risk</p>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;