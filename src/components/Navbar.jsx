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
                    ${darkMode 
                      ? 'bg-black bg-opacity-95 backdrop-filter backdrop-blur-lg border-b border-blue-500/30'
                      : 'bg-gradient-to-r from-blue-300 to-pink-300 shadow-lg'}
                    ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Globe className={`h-12 w-12 mr-3 transition-all duration-300 
                              ${darkMode ? 'text-blue-400' : 'text-blue-600'} 
                              group-hover:text-pink-400`} />
            <span className={`font-bold text-3xl transition-all duration-300 
                              ${darkMode 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400' 
                                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-700'}
                              group-hover:text-transparent group-hover:bg-clip-text 
                              group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-blue-400`}>
              Data HUB
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink to="/" currentPath={location.pathname} text="Home" darkMode={darkMode} />
            <NavLink to="/dashboard" currentPath={location.pathname} text="Dashboard" darkMode={darkMode} />
            <NavLink to="/about" currentPath={location.pathname} text="About" darkMode={darkMode} />
            <NavLink to="/contact" currentPath={location.pathname} text="Contact" darkMode={darkMode} />
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all duration-300
                                                        ${darkMode 
                                                          ? 'bg-blue-600 text-yellow-300 hover:bg-blue-700 hover:text-yellow-400 shadow-lg shadow-blue-500/50' 
                                                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}
                                                        transform hover:scale-110`}>
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{currentDateTime}</span>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all duration-300 mr-4
                                                        ${darkMode 
                                                          ? 'bg-blue-600 text-yellow-300 hover:bg-blue-700 hover:text-yellow-400 shadow-lg shadow-blue-500/50' 
                                                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}
                                                        transform hover:scale-110`}>
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button onClick={toggleMenu} className={`p-2 rounded-full transition-all duration-300 
                                                    ${darkMode ? 'text-white hover:bg-blue-700' : 'text-blue-700 hover:bg-blue-400'}
                                                    transform hover:scale-110`}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`lg:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" onClick={() => handleNavigation('/')} text="Home" darkMode={darkMode} />
            <MobileNavLink to="/dashboard" onClick={() => handleNavigation('/dashboard')} text="Dashboard" darkMode={darkMode} />
            <MobileNavLink to="/about" onClick={() => handleNavigation('/about')} text="About" darkMode={darkMode} />
            <MobileNavLink to="/contact" onClick={() => handleNavigation('/contact')} text="Contact" darkMode={darkMode} />
          </div>
          <div className={`pt-4 pb-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-center px-5">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{currentDateTime}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, currentPath, text, darkMode }) => (
  <Link 
    to={to} 
    className={`relative group px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out
                ${darkMode ? 'text-white' : 'text-gray-800'}
                backdrop-filter backdrop-blur-md
                bg-blue-300
                hover:bg-blue-300
                shadow-[0_0_15px_rgba(255,255,255,0.5)]
                transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]
                ${currentPath === to ? 'bg-opacity-100' : 'bg-opacity-70'}
                `}
  >
    {text}
    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
  </Link>
);

const MobileNavLink = ({ to, onClick, text, darkMode }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className={`block px-3 py-2 rounded-md text-base font-bold transition-all duration-300 ease-in-out
                ${darkMode ? 'text-white' : 'text-gray-800'}
                backdrop-filter backdrop-blur-md
                bg-blue-300 bg-opacity-70
                hover:bg-blue-300 hover:bg-opacity-100
                shadow-[0_0_15px_rgba(255,255,255,0.5)]
                transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]
                `}>
    {text}
  </Link>
);

export default Navbar;