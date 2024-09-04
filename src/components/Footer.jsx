import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Youtube, Instagram, Phone, Mail, MapPin, Twitter, Clock, User, FileText, ShieldCheck, Heart } from 'lucide-react';
import MapComponent from './MapComponent';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`w-full transition-all duration-300 ease-in-out
      ${darkMode 
        ? 'bg-black bg-opacity-95 backdrop-filter backdrop-blur-lg border-t border-purple-500/30'
        : 'bg-gradient-to-r from-blue-300 to-pink-300 shadow-lg'}
      shadow-[20px_20px_60px_rgba(0,0,0,0.3),-20px_-20px_60px_rgba(255,255,255,0.1)]`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative group">
            <h5 className={`text-xl font-bold mb-4 uppercase tracking-wide ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-blue-700 to-pink-700 text-transparent bg-clip-text'
            }`}>About Us</h5>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Data HUB is a provider of innovative data forecasting solutions, revolutionizing the way apps make decisions.</p>
            <div className="flex space-x-4">
              <SocialIcon href="#" Icon={Linkedin} label="LinkedIn" darkMode={darkMode} />
              <SocialIcon href="#" Icon={Facebook} label="Facebook" darkMode={darkMode} />
              <SocialIcon href="#" Icon={Youtube} label="Youtube" darkMode={darkMode} />
              <SocialIcon href="#" Icon={Instagram} label="Instagram" darkMode={darkMode} />
              <SocialIcon href="#" Icon={Twitter} label="Twitter" darkMode={darkMode} />
            </div>
            <AnimatedUnderline darkMode={darkMode} />
          </div>

          <div className="relative group">
            <h5 className={`text-xl font-bold mb-4 uppercase tracking-wide ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-blue-700 to-pink-700 text-transparent bg-clip-text'
            }`}>Contact Us</h5>
            <ContactInfo Icon={Phone} text="+1 (123) 456-7890" darkMode={darkMode} />
            <ContactInfo Icon={Mail} text="info@datahub.com" darkMode={darkMode} />
            <ContactInfo Icon={Clock} text="Mon-Fri: 9AM - 5PM" darkMode={darkMode} />
            <AnimatedUnderline darkMode={darkMode} />
          </div>

          <div className="relative group">
            <h5 className={`text-xl font-bold mb-4 uppercase tracking-wide ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-blue-700 to-pink-700 text-transparent bg-clip-text'
            }`}>Quick Links</h5>
            <QuickLink to="/about" Icon={User} text="About Us" darkMode={darkMode} />
            <QuickLink to="/privacy-policy" Icon={ShieldCheck} text="Privacy Policy" darkMode={darkMode} />
            <QuickLink to="/terms-of-service" Icon={FileText} text="Terms of Service" darkMode={darkMode} />
            <AnimatedUnderline darkMode={darkMode} />
          </div>

          <div className="relative group">
            <h5 className={`text-xl font-bold mb-4 uppercase tracking-wide ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text' 
                : 'bg-gradient-to-r from-blue-700 to-pink-700 text-transparent bg-clip-text'
            }`}>Location</h5>
            <ContactInfo Icon={MapPin} text="123 Data Street, Las Pinas City, Metro Manila, Philippines" darkMode={darkMode} />
            <div className="mt-4 h-64 w-full">
              <MapComponent />
            </div>
            <AnimatedUnderline darkMode={darkMode} />
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-purple-500/30 text-gray-300' : 'border-gray-200 text-gray-600'} text-center relative group`}>
          <p>&copy; 2024 Data HUB. All rights reserved. | Designed with <Heart className={`inline-block w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-pink-500'}`} /> by Data HUB Team</p>
          <p className={`mt-2 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>Data HUB is a registered trademark of Data Solutions Inc.</p>
          <AnimatedUnderline darkMode={darkMode} />
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, Icon, label, darkMode }) => (
  <a href={href} className={`${darkMode ? 'text-white hover:text-purple-300' : 'text-gray-800 hover:text-pink-500'} transition-colors duration-300 ease-in-out relative group`} aria-label={label}>
    <Icon className="w-6 h-6 mt-10" />
    <AnimatedUnderline darkMode={darkMode} />
  </a>
);

const ContactInfo = ({ Icon, text, darkMode }) => (
  <p className={`flex items-center mb-2 group cursor-pointer ${darkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-pink-500'} transition-all duration-300 ease-in-out transform hover:translate-x-2`}>
    <Icon className={`w-5 h-5 mr-2 ${darkMode ? 'text-white group-hover:text-purple-300' : 'text-gray-800 group-hover:text-pink-500'} transition-colors duration-300 ease-in-out`} />
    {text}
  </p>
);

const QuickLink = ({ to, Icon, text, darkMode }) => (
  <Link to={to} className={`flex items-center ${darkMode ? 'text-white hover:text-purple-300' : 'text-gray-800 hover:text-pink-500'} mb-2 transition-all duration-300 ease-in-out transform hover:translate-x-2`}>
    <Icon className="w-4 h-4 mr-2" />
    {text}
  </Link>
);

const AnimatedUnderline = ({ darkMode }) => (
  <div className={`absolute bottom-0 left-0 w-full h-0.5 ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-pink-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left`}></div>
);

export default Footer;