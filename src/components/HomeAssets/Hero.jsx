import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Hero({ data, profilePic, resumePdf }) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profile = data || {
    name: 'SHAKTI SINGH',
    tagline: 'B.TECH CSE (IOTBC)',
    location: 'LUCKNOW, U.P, INDIA',
    description: 'Pursuing B.Tech in Computer Science with specialization in IOTBC (collaboration with IBM). Passionate about web development, problem-solving, and building impactful real-world projects.',
    currentYear: '3rd Year', // 👈 Yeh raha Current Year
    currentSemester: '6th Sem', // 👈 Yeh raha Current Semester
    latestSGPA: 8.42,
    totalProjects: 2,
    totalSkills: '10+',
    techStack: ['React', 'Python', 'Java', 'Tailwind', 'SQL', 'Git', 'HTML', 'CSS'],
    yearData: [
      { year: '1st Year', cgpa: 8.425 },
      { year: '2nd Year', cgpa: 8.46 }
    ]
  };

  const handleDownloadResume = () => {
    if (!resumePdf) {
      window.open('/resume.pdf', '_blank');
      return;
    }
    try {
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = `${profile.name}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex justify-center overflow-x-hidden bg-[#020617] selection:bg-cyan-500/30" id="home">
      
      {/* --- 1. BACKGROUND ART --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <div 
            className="w-full h-full bg-cover bg-no-repeat opacity-65"
            style={{ 
              backgroundImage: `url('https://images.alphacoders.com/605/605592.png')`,
              backgroundPosition: 'center 5%',
              backgroundSize: 'cover'
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
      </div>

      {/* --- 2. EYE BUTTON --- */}
      <AnimatePresence>
        {!isScrolled && (
          <div className="fixed top-20 md:top-8 left-6 md:left-8 z-[250]">
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowUI(!showUI)}
              className="w-12 h-12 bg-black/60 backdrop-blur-3xl text-white rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 transition-all hover:bg-cyan-500/20 active:bg-cyan-500/40"
            >
              <span className="text-xl">{showUI ? '👁️' : '👤'}</span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* --- 3. CRYSTAL DASHBOARD --- */}
      <AnimatePresence mode="wait">
        {showUI && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="w-[92%] max-w-[1350px] mx-auto relative z-10 pt-[15vh] pb-24 h-auto"
          >
            <div className="bg-white/[0.01] backdrop-blur-[12px] border border-white/10 rounded-[3.5rem] p-8 md:p-12 lg:p-16 shadow-[0_0_80px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-[10px] font-black uppercase tracking-widest">
                  <div className="px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                    {profile.location} 📍
                  </div>
                  {/* --- CURRENT YEAR & SEMESTER BADGE --- */}
                  <div className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white italic">
                    {profile.currentYear} • {profile.currentSemester}
                  </div>
                </div>

                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter drop-shadow-2xl">
                  {profile.name}
                </h1>

                <div className="max-w-2xl mx-auto lg:mx-0 p-8 rounded-[2.5rem] bg-black/50 border-l-4 border-cyan-500 text-slate-100 text-base md:text-lg italic leading-relaxed shadow-xl">
                  "{profile.description}"
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                  <a href="#contact" className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95">
                    Hire Me
                  </a>
                  <button 
                    onClick={handleDownloadResume}
                    className="px-10 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3 group"
                  >
                    <i className="fa-solid fa-file-pdf text-red-500 text-lg group-hover:scale-110 transition-transform"></i>
                    Resume
                  </button>
                </div>

                <div className="flex justify-center lg:justify-start gap-12 py-8 border-y border-white/5 font-black uppercase italic">
                   <div className="text-center">
                      <p className="text-4xl text-cyan-400 leading-none tracking-tighter">{profile.latestSGPA}</p>
                      <p className="text-[10px] text-slate-500 tracking-widest mt-2">CGPA</p>
                   </div>
                   <div className="text-center">
                      <p className="text-4xl text-white leading-none tracking-tighter">{profile.totalProjects}</p>
                      <p className="text-[10px] text-slate-500 tracking-widest mt-2">Projects</p>
                   </div>
                   <div className="text-center">
                      <p className="text-4xl text-white leading-none tracking-tighter">{profile.totalSkills}</p>
                      <p className="text-[10px] text-slate-500 tracking-widest mt-2">Skills</p>
                   </div>
                </div>
              </div>

              {/* PHOTO SECTION */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative cursor-pointer group mb-12" 
                  onClick={() => setIsPhotoOpen(true)}
                >
                  <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 animate-spin-slow opacity-30 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative z-20 w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-black shadow-2xl">
                    {profilePic ? (
                      <img src={profilePic} className="w-full h-full object-cover" alt="Identity" />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-6xl font-black text-white italic">SS</div>
                    )}
                  </div>
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full">
                    <span className="text-white text-3xl">🔍</span>
                  </div>
                </motion.div>

                <div className="w-full space-y-4 max-w-[420px]">
                  {profile.yearData.map((acad, idx) => (
                    <div key={idx} className="flex justify-between items-center p-6 bg-white/[0.03] rounded-[2.5rem] border border-white/5 group hover:bg-white/10 transition-all">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">{acad.year}</span>
                      <span className="text-3xl font-black text-white italic tracking-tighter">
                        {acad.cgpa} <small className="text-[11px] text-cyan-400 uppercase font-black ml-1">CGPA</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 4. PHOTO MODAL --- */}
      <AnimatePresence>
        {isPhotoOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsPhotoOpen(false)}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="relative max-w-2xl w-full aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl"
            >
              <img src={profilePic || 'https://via.placeholder.com/800'} className="w-full h-full object-cover" alt="Identity Large" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </section>
  );
}

export default Hero;