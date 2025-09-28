import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Launch Pad', path: '/' },
    { name: 'Mission Brief', path: '/about' },
    { name: 'Mission Control', path: '/experience' },
    { name: 'Space Explorer', path: '/vacation' },
    { name: 'Ground Control', path: '/contact' }
  ];

  return (
    <>
      {/* True Dynamic Island Navbar */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
        scrolled ? 'scale-90 top-4' : 'scale-100'
      }`}>
        <div className={`relative backdrop-blur-2xl bg-gradient-to-r from-black/40 via-gray-900/30 to-black/40 border border-white/10 shadow-2xl transition-all duration-500 ${
          isOpen 
            ? 'rounded-[2rem] px-8 py-6 min-w-[20rem]' 
            : 'rounded-full px-6 py-3 hover:px-8 hover:shadow-3xl'
        }`}>
          
          {/* Animated background glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-60 animate-pulse"></div>
          
          <div className="relative flex items-center justify-between">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                <img 
                  src="/logo.jpg" 
                  alt="SUNRIZE" 
                  className="relative h-9 w-9 rounded-full ring-2 ring-white/40 group-hover:ring-white/70 transition-all duration-300 group-hover:scale-110" 
                />
              </div>
              <span className="text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-xl font-black tracking-wide group-hover:scale-105 transition-transform duration-300">
                SUNRIZE
              </span>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className={`hidden lg:flex items-center space-x-2 ml-6 transition-all duration-500 ${
              isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group overflow-hidden ${
                    location.pathname === item.path
                      ? 'text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 shadow-lg scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/15 hover:scale-105'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    transform: `translateY(${scrolled ? '2px' : '0px'})` 
                  }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-cyan-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-cyan-400/20 transition-all duration-500 rounded-full"></div>
                  
                  <span className="relative z-10 tracking-wide">{item.name}</span>
                  
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative p-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300 group backdrop-blur-sm border border-white/10"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-gradient-to-r from-white to-blue-200 rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-3' : 'top-2'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-gradient-to-r from-white to-purple-200 rounded-full top-3 transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-gradient-to-r from-white to-cyan-200 rounded-full transition-all duration-300 ${
                  isOpen ? '-rotate-45 top-3' : 'top-4'
                }`}></span>
              </div>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-700 ease-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
          }`}>
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                    location.pathname === item.path
                      ? 'text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 shadow-lg'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transform: `translateX(${isOpen ? '0px' : '20px'})`,
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300 rounded-2xl"></div>
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* NASA Mission Particles */}
        <div className="absolute -top-2 -left-2 w-1 h-1 bg-yellow-400/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-orange-400/60 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-red-400/60 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </nav>
    </>
  );
};

export default Navbar;