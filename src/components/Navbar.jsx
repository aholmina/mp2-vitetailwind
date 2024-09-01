import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setCurrentDateTime(now.toLocaleDateString('en-US', options));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
                    bg-[hsla(323,57%,39%,0.603)] backdrop-blur-md
                    ${isScrolled ? 'py-2' : 'py-4'}
                    border-b border-white/10
                    shadow-[20px_20px_60px_rgba(0,0,0,0.3),-20px_-20px_60px_rgba(255,255,255,0.1)]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Globe className="h-10 w-10 mr-2 transition-all duration-300 text-white group-hover:text-pink-300" />
            <span className={`font-bold text-lg transition-all duration-300 text-white group-hover:text-pink-300
                              relative overflow-hidden px-4 py-2 rounded-xl
                              bg-[hsla(323,57%,39%,0.8)] backdrop-blur-sm
                              shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)]
                              hover:shadow-[8px_8px_15px_rgba(101,100,100,0.3),-8px_-8px_15px_rgba(255,255,255,0.1)]
                              hover:bg-[hsla(323,57%,39%,0.9)] hover:-translate-y-0.5`}>
              Data HUB
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink to="/" currentPath={location.pathname} text="Home" />
            <NavLink to="/dashboard" currentPath={location.pathname} text="Dashboard" />
            <NavLink to="/about" currentPath={location.pathname} text="About" />
            <NavLink to="/contact" currentPath={location.pathname} text="Contact" />
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors duration-300
                                                        ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-purple-600 text-yellow-400'}
                                                        hover:bg-pink-400 hover:text-white
                                                        shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)]
                                                        hover:shadow-[8px_8px_15px_rgba(101,100,100,0.3),-8px_-8px_15px_rgba(255,255,255,0.1)]`}>
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <span className="text-sm text-white">{currentDateTime}</span>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors duration-300 mr-4
                                                        ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-purple-600 text-yellow-400'}
                                                        hover:bg-pink-400 hover:text-white
                                                        shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)]
                                                        hover:shadow-[8px_8px_15px_rgba(101,100,100,0.3),-8px_-8px_15px_rgba(255,255,255,0.1)]`}>
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button onClick={toggleMenu} className="p-2 rounded-full transition-colors duration-300 text-white
                                                    hover:bg-pink-400 hover:text-white
                                                    shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)]
                                                    hover:shadow-[8px_8px_15px_rgba(101,100,100,0.3),-8px_-8px_15px_rgba(255,255,255,0.1)]">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" onClick={() => handleNavigation('/')} text="Home" />
            <MobileNavLink to="/dashboard" onClick={() => handleNavigation('/dashboard')} text="Dashboard" />
            <MobileNavLink to="/about" onClick={() => handleNavigation('/about')} text="About" />
            <MobileNavLink to="/contact" onClick={() => handleNavigation('/contact')} text="Contact" />
          </div>
          <div className="pt-4 pb-3 border-t border-white/10">
            <div className="flex items-center justify-center px-5">
              <span className="text-sm text-white">{currentDateTime}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, currentPath, text }) => (
  <Link 
    to={to} 
    className={`relative group px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out
                ${currentPath === to ? 'text-white bg-[hsla(323,57%,39%,0.8)]' : 'text-white hover:text-pink-300 hover:bg-[hsla(323,57%,39%,0.8)]'}
                backdrop-blur-sm
                shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)]
                hover:shadow-[8px_8px_15px_rgba(101,100,100,0.3),-8px_-8px_15px_rgba(255,255,255,0.1)]
                hover:bg-[hsla(323,57%,39%,0.9)] hover:-translate-y-0.5`}
  >
    {text}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
);

const MobileNavLink = ({ to, onClick, text }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out
                text-white hover:text-pink-300 hover:bg-[hsla(323,57%,39%,0.8)]
                backdrop-blur-sm
                shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)]
                hover:shadow-[8px_8px_15px_rgba(101,100,100,0.3),-8px_-8px_15px_rgba(255,255,255,0.1)]
                hover:bg-[hsla(323,57%,39%,0.9)]"
  >
    {text}
  </Link>
);

export default Navbar;