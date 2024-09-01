import React, { useState } from 'react';
import ContactImage from '../assets/Contact.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCommentDots, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ email: '', phoneNumber: '', message: '' });
  };

  const socialIcons = [
    { icon: faEnvelope, tooltip: 'Email', link: 'mailto:contact@example.com' },
    { icon: faGoogle, tooltip: 'Gmail', link: 'https://mail.google.com' },
    { icon: faVideo, tooltip: 'Video Call', link: '#' },
    { icon: faMicrosoft, tooltip: 'Microsoft Teams', link: 'https://teams.microsoft.com' },
  ];

  return (
    <section className={`py-16 transition-all duration-300 w-full min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-r from-[hsla(197,100%,85%,0.603)] via-gray-500 to-gray-900 text-white' 
        : 'bg-gradient-to-r from-[hsla(323,57%,39%,0.603)] to-[hsla(197,100%,85%,0.603)] text-gray-900'
    } backdrop-blur-md`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-center text-white">Contact Us</h1>
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          <div className="flex-1">
            <div className="p-8 rounded-2xl shadow-lg transition-all duration-300 bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-4 text-center text-white">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-white border-opacity-50 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 border border-white border-opacity-50 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <FontAwesomeIcon icon={faCommentDots} className="absolute left-3 top-4 text-white" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message"
                    rows="6"
                    className="w-full pl-10 pr-4 py-3 border border-white border-opacity-50 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 relative overflow-hidden group text-lg font-semibold"
                >
                  Send Message
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              </form>
            </div>
          </div>
          <div className="flex-1">
            <div className="p-8 rounded-2xl shadow-lg transition-all duration-300 bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 backdrop-blur-md h-full">
              <h3 className="text-2xl font-semibold mb-4 text-center text-white">Other Ways to Reach Us</h3>
              <div className="relative h-full">
                <img
                  src={ContactImage}
                  alt="Contact Us"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="grid grid-cols-2 gap-8 p-8">
                    {socialIcons.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-white hover:text-purple-300 transition-colors duration-300"
                      >
                        <FontAwesomeIcon icon={item.icon} className="text-4xl mb-2" />
                        <span className="text-sm font-semibold">{item.tooltip}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;