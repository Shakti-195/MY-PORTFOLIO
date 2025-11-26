import React, { useState, useEffect } from "react";

const EducationalJourney = () => {
  
  // --- 1. DEFAULT DATA (Fallback) ---
  const defaultJourney = [
    {
      id: 1,
      type: "school",
      title: "10th Standard (PCM)",
      institution: "Shri Raghukul Vidya Peeth",
      period: "2019 – 2020",
      score: "75%",
      desc: "Built a strong foundation in Science & Mathematics.",
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/20"
    },
    {
      id: 2,
      type: "school",
      title: "12th Standard (PCM)",
      institution: "Shri Raghukul Vidya Peeth",
      period: "2021 – 2022",
      score: "68.8%",
      desc: "Specialized in Physics, Chemistry, and Math.",
      color: "from-blue-500 to-indigo-500",
      glow: "shadow-blue-500/20"
    },
    {
      id: 3,
      type: "prep",
      title: "JEE Mains Preparation",
      institution: "Physics Wallah (Prayas 2.0)",
      period: "2022 – 2023",
      score: "71%ile",
      desc: "Intensive preparation year focused on analytical skills.",
      color: "from-indigo-500 to-purple-500",
      glow: "shadow-purple-500/20"
    },
    {
      id: 4,
      type: "university",
      title: "B.Tech CSE (IOTBC)",
      institution: "Babu Banarasi Das University",
      period: "2023 – Present",
      desc: "IOTBC Specialization (IBM Collab)",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-pink-500/20"
    },
  ];

  // --- 2. LOAD DATA FROM ADMIN PANEL ---
  const [journey, setJourney] = useState(defaultJourney);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('educationTimeline');
      if (savedData) {
        setJourney(JSON.parse(savedData));
      }
    }
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "university": 
        return (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case "prep": 
        return (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      default: 
        return (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans bg-slate-950">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Section */}
      <div className="text-center mb-24 animate-fade-in-down relative z-10">
        <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 drop-shadow-lg">
          My Academic Path
        </h2>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
          Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Timeline</span>
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full shadow-[0_0_15px_rgba(56,189,248,0.6)]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Center Gradient Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 md:-translate-x-1/2 h-full opacity-30"></div>

        <div className="space-y-16 md:space-y-24">
          {journey.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const glowClass = item.glow || "shadow-blue-500/20"; // Fallback if missing
            
            return (
              <div key={item.id} className={`relative flex items-center md:justify-between ${isEven ? 'flex-row-reverse' : ''} group`}>
                
                {/* Spacer for Desktop centering */}
                <div className="hidden md:block w-5/12"></div>

                {/* The Timeline Node (Center Icon) */}
                <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${item.color} shadow-[0_0_25px_rgba(255,255,255,0.2)] z-20 flex items-center justify-center border-[4px] border-slate-950 ring-1 ring-white/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                  {getIcon(item.type)}
                </div>

                {/* Content Card */}
                <div className="ml-20 md:ml-0 w-full md:w-5/12 relative perspective-1000">
                   <div className={`bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/60 hover:border-white/10 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden ${glowClass}`}>
                      
                      {/* Top Badge Row */}
                      <div className="flex flex-wrap justify-between items-center mb-5 relative z-10 gap-2">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                            {item.period}
                          </span>
                          
                          {/* Scored Badge (Only if score exists) */}
                          {item.score && (
                             <span className="text-[11px] font-bold text-slate-300 bg-slate-950/50 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-inner">
                               Scored <span className="text-cyan-300 text-sm">{item.score}</span>
                             </span>
                          )}
                      </div>

                      {/* Title & Institution */}
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm font-bold text-slate-400 mb-5 flex items-center gap-2 uppercase tracking-wide">
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                        {item.institution}
                      </p>

                      {/* Description */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-5 border-l-2 border-slate-700 pl-4 opacity-90">
                        {item.desc || item.info}
                      </p>

                      {/* Subtle Background Gradient Blob */}
                      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity duration-500`}></div>
                   </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default EducationalJourney;