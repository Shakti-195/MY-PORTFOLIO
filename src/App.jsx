import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AdminSettings from './components/HomeAssets/AdminSettings';
import Academics from './components/HomeAssets/EducationalJourney';
import TechStack from './components/HomeAssets/TechStack';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Premium Dark as Default
  const [showSettings, setShowSettings] = useState(false);

  // Sync Tailwind dark mode with state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Shortcut for Admin Settings (Ctrl+Shift+S)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setShowSettings(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-300">
      <Router>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <Routes>
          {/* Main Landing Page: Hero, Projects, and Contact all in one scroll */}
          <Route path="/" element={
            <main>
              <Home />
              {/* <About /> */}
              {/* <Projects /> */}
              <Contact /> 
            </main>
          } />

          {/* Individual Asset Routes */}
          <Route path="/academics" element={<Academics />} />
          <Route path="/techstack" element={<TechStack />} />
        </Routes>

        {/* --- PREMIUM FOOTER --- */}
        <footer className="py-16 border-t border-white/5 bg-[#020617] text-center relative z-10">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
              Get in touch directly at
            </p>
            <a 
              href="mailto:thakurshaktisingh195@gmail.com" 
              className="text-xl md:text-3xl font-black italic text-white hover:text-indigo-400 transition-all duration-300 uppercase tracking-tighter inline-block"
            >
              thakurshaktisingh195@gmail.com
            </a>
            <div className="pt-10 opacity-30 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
              &copy; 2026 SHAKTI SINGH • BUILT WITH REACT & PRECISION
            </div>
          </div>
        </footer>

        {/* Floating Settings Trigger */}
        <button
          onClick={() => setShowSettings(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-full shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-indigo-500/50 transition-all duration-500 flex items-center justify-center z-50 group"
          title="Settings (Ctrl+Shift+S)"
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <AdminSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </Router>
    </div>
  );
}

export default App;