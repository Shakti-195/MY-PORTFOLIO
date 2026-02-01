import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Hero({ data, profilePic }) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [showUI, setShowUI] = useState(true);

  const profile = data || {
    name: 'SHAKTI SINGH',
    tagline: 'B.TECH CSE (IOTBC)',
    location: 'LUCKNOW, U.P, INDIA',
    description: 'Pursuing B.Tech in Computer Science with specialization in IOTBC (collaboration with IBM). Passionate about web development, problem-solving, and building impactful real-world projects...',
    currentYear: '3rd Year',
    currentSemester: '6th Sem',
    latestSGPA: 8.42,
    totalProjects: 2,
    totalSkills: '10+',
    techStack: ['React', 'Python', 'Java', 'Tailwind', 'SQL', 'Git', 'HTML', 'CSS'],
    yearData: [
      { year: '1st Year', cgpa: 8.425 },
      { year: '2nd Year', cgpa: 8.46 }
    ]
  };

  return (
    <section className="relative w-full min-h-screen flex justify-center overflow-x-hidden bg-[#020617] selection:bg-cyan-500/30" id="home">
      
      {/* --- 1. DYNAMIC ANIME BACKGROUND --- */}
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

      {/* --- 2. EYE BUTTON (FIXED: Responsive Position to avoid Mobile Navbar Conflict) --- */}
      <div className="fixed top-20 md:top-8 left-6 md:left-8 z-[150]">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowUI(!showUI)}
          className="w-12 h-12 bg-black/40 backdrop-blur-3xl text-white rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 transition-all hover:bg-white/20 active:bg-cyan-500/40"
        >
          <span className="text-xl">{showUI ? '👁️' : '👤'}</span>
        </motion.button>
      </div>

      {/* --- 3. CRYSTAL DASHBOARD --- */}
      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-[92%] max-w-[1350px] mx-auto relative z-10 pt-[15vh] pb-24 h-auto"
          >
            <div className="bg-white/[0.01] backdrop-blur-[12px] border border-white/10 rounded-[3.5rem] p-8 md:p-12 lg:p-16 shadow-[0_0_80px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Info Column */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <div className="px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    {profile.location} 📍
                  </div>
                  <div className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest italic">
                    {profile.currentYear} • {profile.currentSemester}
                  </div>
                </div>

                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white italic uppercase leading-[0.9] tracking-tighter drop-shadow-2xl">
                  {profile.name}
                </h1>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {profile.techStack.map((skill, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="max-w-2xl mx-auto lg:mx-0 p-8 rounded-[2.5rem] bg-black/50 border-l-4 border-cyan-500 text-slate-100 text-base md:text-lg italic leading-relaxed shadow-xl">
                  "{profile.description}"
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
                      <p className="text-4xl text-white leading-none tracking-tighter">10+</p>
                      <p className="text-[10px] text-slate-500 tracking-widest mt-2">Skills</p>
                   </div>
                </div>
              </div>

              {/* Profile Photo Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative cursor-pointer group mb-12" onClick={() => setIsPhotoOpen(true)}>
                  <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 animate-spin-slow opacity-30 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute -inset-[3px] rounded-full bg-[#020617] z-10"></div>
                  <div className="relative z-20 w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-black shadow-2xl transition-transform group-hover:scale-105 duration-700">
                    {profilePic ? (
                      <img src={profilePic} className="w-full h-full object-cover" alt="Identity" />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-6xl font-black text-white italic">SS</div>
                    )}
                  </div>
                </div>

                <div className="w-full space-y-4 max-w-[420px]">
                  {profile.yearData.map((acad, idx) => (
                    <div key={idx} className="flex justify-between items-center p-6 bg-white/[0.03] rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all group">
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

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        html { scroll-behavior: smooth; }
      `}</style>
    </section>
  );
}

export default Hero;