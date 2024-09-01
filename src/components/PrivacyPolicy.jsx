import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faUserShield } from '@fortawesome/free-solid-svg-icons';

const PrivacyPolicy = ({ darkMode }) => {
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
          Privacy Policy
        </motion.h1>
        
        <div className="flex flex-col items-center gap-8">
          <BentoCard className="max-w-4xl w-full transform hover:scale-105 transition-all duration-300">
            <p className="text-white text-lg mb-6">
              We at Data HUB are committed to protecting your privacy. Our application collects and processes certain personal information to provide you with weather forecasts, news updates, AI-powered insights, YouTube content, currency conversion, and calendar management. This information may include your location data, search queries, and calendar events. We use industry-standard security measures to protect your data and do not sell or share your personal information with third parties except as required to provide our services or comply with legal obligations.
            </p>
            <p className="text-white text-lg">
              By using our application, you consent to the collection and use of your information as described in this policy. We may use aggregated, anonymized data for improving our services and analytics. You have the right to access, correct, or delete your personal data at any time. For more information about our data practices or to exercise your rights, please contact us at info@forecastfusion.com.
            </p>
          </BentoCard>

          <div className="flex justify-center gap-8">
            <BentoCard className="flex flex-col items-center p-4">
              <FontAwesomeIcon icon={faShieldAlt} size="2x" className="text-white mb-2" />
              <p className="text-white text-center">Secure Data Protection</p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center p-4">
              <FontAwesomeIcon icon={faLock} size="2x" className="text-white mb-2" />
              <p className="text-white text-center">Encrypted Communications</p>
            </BentoCard>
            <BentoCard className="flex flex-col items-center p-4">
              <FontAwesomeIcon icon={faUserShield} size="2x" className="text-white mb-2" />
              <p className="text-white text-center">Privacy Rights</p>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;