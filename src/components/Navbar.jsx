import { useState, useEffect } from 'react';

function Navbar({ isDarkMode, toggleDarkMode }) {  // ← Props receive karo
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Active section detection
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll function
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? isDarkMode
            ? 'bg-slate-950/95 backdrop-blur-md shadow-xl py-3'
            : 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : isDarkMode
          ? 'bg-slate-950 py-5'
          : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Title - High Contrast */}
        <a
          href="#home"
          onClick={(e) => smoothScroll(e, 'home')}
          className={`text-2xl font-bold tracking-tight transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Portfolio
        </a>

        {/* Desktop Menu - Optimized Contrast */}
        <ul className="hidden lg:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => smoothScroll(e, link.id)}
                className={`font-medium text-sm tracking-wide transition-all duration-300 relative group ${
                  activeSection === link.id
                    ? isDarkMode
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDarkMode
                    ? 'text-slate-200 hover:text-indigo-400'
                    : 'text-slate-700 hover:text-indigo-600'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 transform transition-transform duration-300 origin-left ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Social Icons + Dark Mode + CTA */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Social Media Icons - Better Visibility */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/Shakti-195"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/Shakti_Singh195"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>

          {/* Dark/Light Mode Toggle - Clear Icons */}
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Professional CTA Buttons - High Contrast */}
          <a
            href="/resume.pdf"
            download
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border ${
              isDarkMode
                ? 'border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-500'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
            }`}
          >
            Resume
          </a>

          <a
            href="#contact"
            onClick={(e) => smoothScroll(e, 'contact')}
            className={`px-6 py-2.5 font-medium text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
              isDarkMode
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-lg focus:outline-none transition-all duration-300"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isDarkMode ? 'bg-slate-200' : 'bg-slate-800'
              } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isDarkMode ? 'bg-slate-200' : 'bg-slate-800'
              } ${isMenuOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isDarkMode ? 'bg-slate-200' : 'bg-slate-800'
              } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu (Side Drawer) */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 transform transition-transform duration-500 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} shadow-2xl`}
      >
        <div className="p-6 space-y-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Menu
            </h2>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition ${
                isDarkMode 
                  ? 'hover:bg-slate-800 text-slate-300' 
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              aria-label="Close Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => smoothScroll(e, link.id)}
              className={`block text-base font-medium py-3 px-4 rounded-lg transition-all ${
                activeSection === link.id
                  ? isDarkMode
                    ? 'bg-indigo-900/40 text-indigo-400'
                    : 'bg-indigo-50 text-indigo-600'
                  : isDarkMode
                  ? 'text-slate-200 hover:bg-slate-800'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Social Icons in Mobile */}
          <div className={`flex space-x-4 pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <a 
              href="https://github.com/Shakti-195" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-3 rounded-lg transition ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-3 rounded-lg transition ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a 
              href="https://x.com/Shakti_Singh195" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-3 rounded-lg transition ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
            </a>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            <span className={isDarkMode ? 'text-amber-400' : 'text-slate-600'}>
              {isDarkMode ? '☀️' : '🌙'}
            </span>
          </button>

          {/* CTAs in Mobile */}
          <div className="space-y-3 pt-4">
            <a
              href="/resume.pdf"
              download
              className={`block text-center px-6 py-3 rounded-lg font-medium border transition ${
                isDarkMode 
                  ? 'border-slate-600 text-slate-200 hover:bg-slate-800' 
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, 'contact')}
              className={`block text-center px-6 py-3 font-medium rounded-lg shadow-sm transition ${
                isDarkMode
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
