import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Youtube, Instagram, Phone, Mail, MapPin, Twitter, Clock, User, FileText, ShieldCheck, Heart } from 'lucide-react';
import MapComponent from './MapComponent';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`w-full transition-all duration-300 ease-in-out
                        bg-[hsla(323,57%,39%,0.603)] backdrop-blur-md
                        border-t border-white/10
                        shadow-[20px_20px_60px_rgba(0,0,0,0.3),-20px_-20px_60px_rgba(255,255,255,0.1)]`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative group">
            <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">About Us</h5>
            <p className="text-gray-300 mb-4">Data HUB is a provider of innovative data forecasting solutions, revolutionizing the way apps make decisions.</p>
            <div className="flex space-x-4">
              <SocialIcon href="#" Icon={Linkedin} label="LinkedIn" />
              <SocialIcon href="#" Icon={Facebook} label="Facebook" />
              <SocialIcon href="#" Icon={Youtube} label="Youtube" />
              <SocialIcon href="#" Icon={Instagram} label="Instagram" />
              <SocialIcon href="#" Icon={Twitter} label="Twitter" />
            </div>
            <AnimatedUnderline />
          </div>

          <div className="relative group">
            <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">Contact Us</h5>
            <ContactInfo Icon={Phone} text="+1 (123) 456-7890" />
            <ContactInfo Icon={Mail} text="info@datahub.com" />
            <ContactInfo Icon={Clock} text="Mon-Fri: 9AM - 5PM" />
            <AnimatedUnderline />
          </div>

          <div className="relative group">
            <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">Quick Links</h5>
            <QuickLink to="/about" Icon={User} text="About Us" />
            <QuickLink to="/privacy-policy" Icon={ShieldCheck} text="Privacy Policy" />
            <QuickLink to="/terms-of-service" Icon={FileText} text="Terms of Service" />
            <AnimatedUnderline />
          </div>

          <div className="relative group">
            <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">Location</h5>
            <ContactInfo Icon={MapPin} text="123 Data Street, Las Pinas City, Metro Manila, Philippines" />
            <div className="mt-4 h-64 w-full">
              <MapComponent />
            </div>
            <AnimatedUnderline />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center relative group">
          <p className="text-gray-300">&copy; 2024 Data HUB. All rights reserved. | Designed with <Heart className="inline-block w-4 h-4 text-pink-500" /> by Data HUB Team</p>
          <p className="text-gray-400 mt-2">Data HUB is a registered trademark of Data Solutions Inc.</p>
          <AnimatedUnderline />
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, Icon, label }) => (
  <a href={href} className="text-white hover:text-pink-300 transition-colors duration-300 ease-in-out relative group" aria-label={label}>
    <Icon className="w-6 h-6" />
    <AnimatedUnderline />
  </a>
);

const ContactInfo = ({ Icon, text }) => (
  <p className="flex items-center text-gray-300 mb-2 group cursor-pointer hover:text-pink-300 transition-all duration-300 ease-in-out transform hover:translate-x-2">
    <Icon className="w-5 h-5 mr-2 text-white group-hover:text-pink-300 transition-colors duration-300 ease-in-out" />
    {text}
  </p>
);

const QuickLink = ({ to, Icon, text }) => (
  <Link to={to} className="flex items-center text-white hover:text-pink-300 mb-2 transition-all duration-300 ease-in-out transform hover:translate-x-2">
    <Icon className="w-4 h-4 mr-2" />
    {text}
  </Link>
);

const AnimatedUnderline = () => (
  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></div>
);

export default Footer;