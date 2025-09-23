import React, { useState, useEffect } from 'react';
import logo from '/images/Forsa-Digital-Solutions-Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll behavior for blur & auto-hide
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      // Only hide if scrolling down and not near the top
      setShowNavbar(currentY < lastScrollY || currentY < 50);
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
  ];

  const linkClass = (path) =>
    `relative group px-3 py-2 transition-all duration-300 ${
      location.pathname === path 
        ? 'text-primary-600 font-semibold' 
        : 'text-secondary-600 hover:text-primary-600'
    }`;

  return (
    <header
      className={`fixed w-full backdrop-blur-lg bg-white/95 shadow-md z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'backdrop-saturate-150' : ''
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'} transform`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand on the left (logo) */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src={logo}
                alt="Forsa Digital Solutions"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Nav on the right */}
          <nav className="hidden md:flex items-center space-x-4 ml-auto">
            {navLinks.map(({ name, path }) => (
              <Link key={name} to={path} className={linkClass(path) + ' text-base lg:text-lg'}>
                {name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl sm:text-2xl text-secondary-600 hover:text-primary-600 transition-colors duration-300 p-2"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-500 ease-in-out transform overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-4 py-3 space-y-1">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                location.pathname === path 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-primary-600'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
