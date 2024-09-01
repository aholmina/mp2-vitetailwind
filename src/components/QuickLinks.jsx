import React from 'react';
import { Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const QuickLinks = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 rounded-lg mt-4 mx-auto max-w-screen-lg">
      <SocialLink href="https://youtube.com" aria-label="YouTube" icon={Youtube} bgColor="bg-[#FF0000]" />
      <SocialLink href="https://instagram.com" aria-label="Instagram" icon={Instagram} bgColor="bg-[#E4405F]" />
      <SocialLink href="https://facebook.com" aria-label="Facebook" icon={Facebook} bgColor="bg-[#1877F2]" />      
      <SocialLink href="https://linkedin.com" aria-label="LinkedIn" icon={Linkedin} bgColor="bg-[#0A66C2]" />
      <SocialLink href="https://twitter.com" aria-label="Twitter" icon={Twitter} bgColor="bg-[#1DA1F2]" />
    </div>
  );
};

const SocialLink = ({ href, ariaLabel, icon: Icon, bgColor }) => (
  <a
    href={href}
    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 overflow-hidden relative ${bgColor} group`}  
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff] via-[#8a2be2] to-[#87ceeb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
    <Icon size={20} className="relative z-10 sm:scale-125" />
  </a>  
);

export default QuickLinks;