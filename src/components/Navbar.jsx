import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      {/* Premium Glass Container */}
      <div className={`max-w-7xl mx-auto px-6`}>
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 border ${
          isScrolled 
            ? 'bg-white/5 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
            : 'bg-transparent border-transparent'
        }`}>
          
          {/* Logo Section */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => smoothScroll(e, 'home')}
              className="group flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-black text-xl italic">S</span>
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white uppercase hidden sm:block">
                Portfolio
              </span>
            </a>
          </div>

          {/* Desktop Links - Floating Pill Style */}
          <ul className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => smoothScroll(e, link.id)}
                  className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeSection === link.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Hire Me CTA */}
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, 'contact')}
              className="hidden md:flex px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Hire Me
            </a>

            {/* Mobile Burger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/5 rounded-xl border border-white/10"
            >
              <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Glassmorphism) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-slate-950/80 backdrop-blur-3xl border-l border-white/10 z-50 lg:hidden p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-white font-black italic uppercase tracking-widest text-lg">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 text-2xl">&times;</button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => smoothScroll(e, link.id)}
                    className={`text-xl font-black italic uppercase tracking-tighter py-4 border-b border-white/5 transition-all ${
                      activeSection === link.id ? 'text-indigo-500 pl-4' : 'text-slate-400 pl-0'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                 <a href="/resume.pdf" download className="block w-full text-center py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-300">Resume</a>
                 <a href="#contact" className="block w-full text-center py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase text-white">Let's Talk</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;