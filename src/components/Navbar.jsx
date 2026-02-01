import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(true);
  const notificationRef = useRef(null);

  // Informative Data for Activity Hub
  const activityLogs = [
    { id: 1, type: 'System', msg: 'Cloud Sync V3.0 Active', status: 'Live', color: 'text-emerald-400' },
    { id: 2, type: 'Identity', msg: 'Resume Data Refreshed', status: 'Synced', color: 'text-indigo-400' },
    { id: 3, type: 'Database', msg: 'Project Buffer Updated', status: 'Ready', color: 'text-cyan-400' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${
        isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-8'
      }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* --- DYNAMIC LOGO --- */}
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={(e) => smoothScroll(e, 'home')}
        >
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-all">
            <span className="text-white font-black text-2xl italic">S</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-indigo-400 opacity-80 group-hover:text-cyan-400 transition-colors">Portfolio of</span>
            <span className="text-2xl font-black italic tracking-tighter text-white uppercase">SHAKTI</span>
          </div>
        </div>

        {/* --- DESKTOP NAV --- */}
        <ul className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(e) => smoothScroll(e, link.id)}
                className={`px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeSection === link.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* --- RIGHT ACTION HUB --- */}
        <div className="hidden lg:flex items-center" ref={notificationRef}>
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setHasUpdate(false); }}
              className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                showNotifications ? 'bg-indigo-600 border-indigo-400 shadow-2xl' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <i className={`fa-solid fa-tower-broadcast text-lg ${showNotifications ? 'text-white' : 'group-hover:text-indigo-400'}`}></i>
                {hasUpdate && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-[#020617]"></span>
                  </span>
                )}
              </div>
            </button>

            {/* Premium Informative Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  className="absolute top-16 right-0 w-80 bg-slate-950/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden z-[210]"
                >
                  <div className="px-7 py-5 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Activity Console</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Online</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                  </div>
                  
                  <div className="p-3 space-y-1">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-white/[0.03] rounded-[1.8rem] transition-all group border border-transparent hover:border-white/5">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className={`text-[8px] font-black uppercase ${log.color}`}>{log.type}</span>
                            <span className="text-[8px] font-bold text-slate-600 tracking-tighter">{log.status}</span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight group-hover:text-white transition-colors">
                            {log.msg}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-7 py-4 bg-indigo-600/10 text-center border-t border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">
                      System Sync Active
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- MOBILE BURGER --- */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white/5 rounded-2xl border border-white/10 transition-all active:scale-90">
          <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#020617]/98 backdrop-blur-3xl border-l border-white/10 z-[250] p-12 flex flex-col"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end text-white text-4xl mb-16 hover:text-indigo-400">&times;</button>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={(e) => smoothScroll(e, link.id)}
                  className={`text-3xl font-black italic uppercase tracking-tighter transition-all ${activeSection === link.id ? 'text-indigo-500 pl-4' : 'text-slate-500'}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;