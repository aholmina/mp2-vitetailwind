import React from 'react';
import { Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const QuickLinks = ({ darkMode, websiteInfo }) => {
  const socialLinks = [
    { platform: "youtube", icon: Youtube, bgColor: "bg-[#FF0000]", url: "https://youtube.com" },
    { platform: "instagram", icon: Instagram, bgColor: "bg-[#E4405F]", url: "https://instagram.com" },
    { platform: "facebook", icon: Facebook, bgColor: "bg-[#1877F2]", url: "https://facebook.com" },
    { platform: "linkedin", icon: Linkedin, bgColor: "bg-[#0A66C2]", url: "https://linkedin.com" },
    { platform: "twitter", icon: Twitter, bgColor: "bg-[#1DA1F2]", url: "https://twitter.com" },
  ];

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Website Info Section */}
        <div className={`rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 ${darkMode 
          ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
          : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
        }`}>
          <div className="flex flex-col items-center space-y-4">
            <img 
              src={websiteInfo.image} 
              alt="Website" 
              className="w-full h-48 object-fill rounded-lg shadow-md"
            />
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2 text-sky-500">
                Data HUB
              </h3>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="italic">{websiteInfo.description}</p>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className={`rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 ${darkMode 
          ? 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] via-gray-500 to-gray-900'
          : 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] to-[hsla(323,57%,39%,0.603)]'
        }`}>
          <h4 className="text-2xl font-bold mb-4 text-sky-500">
            Follow us for more updates
          </h4>
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((link, index) => (
              <SocialLink 
                key={index}
                {...link} 
                darkMode={darkMode} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ platform, icon: Icon, bgColor, url, darkMode }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-12 h-12 rounded-full text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg ${bgColor} group overflow-hidden relative`}
    aria-label={`Follow us on ${platform}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff] via-[#8a2be2] to-[#87ceeb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
    <Icon size={24} className="relative z-10" />
  </a>
);

export default QuickLinks;