import { useState, useEffect } from 'react';

function Hero() {
  // Load ALL data from localStorage
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : {
      name: 'Shakti Singh',
      tagline: 'B.Tech Student | Coding Enthusiast',
      college: 'BBDU, Lucknow',
      specialization: 'IOTBC',
      description: 'Pursuing B.Tech in Computer Science with specialization in IOTBC (collaboration with IBM). Passionate about web development, problem-solving, and building impactful real-world projects.',
      currentYear: '3rd Year',
      currentSemester: '5th Sem',
      latestSGPA: 8.42,
      totalProjects: 2,
      totalSkills: '10+',
      yearData: [
        { year: '1st Year', cgpa: 8.425 },
        { year: '2nd Year', cgpa: 8.46 }
      ],
      semesterData: [
        { sem: '1st Sem', sgpa: 8.58 },
        { sem: '2nd Sem', sgpa: 8.27 },
        { sem: '3rd Sem', sgpa: 8.5 },
        { sem: '4th Sem', sgpa: 8.42 }
      ],
      techStack: ['Java', 'C', 'Python', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Git'],
      currentlyLearning: ['React', 'Tailwind CSS', 'Vite']
    };
  });

  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const savedPic = localStorage.getItem('profilePicture');
    if (savedPic) setProfilePic(savedPic);
  }, []);

  const downloadResume = () => {
    const savedResume = localStorage.getItem('resumePdf');
    
    if (savedResume) {
      const byteString = atob(savedResume.split(',')[1]);
      const mimeString = savedResume.split(',')[0].split(':')[1].split(';')[0];
      
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${profileData.name}-Resume.pdf`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
    } else {
      alert('📄 Please upload your resume first!\n\nPress Ctrl+Shift+A to open admin settings.');
    }
  };

  const academicData = profileData.yearData.map((year, idx) => ({
    ...year,
    gradient: idx === 0 ? 'from-blue-500 via-indigo-500 to-purple-500' : 'from-teal-500 via-cyan-500 to-blue-500'
  }));

  const semesterData = profileData.semesterData.map((sem, idx) => ({
    ...sem,
    icon: ['📘', '📗', '📙', '📕', '📓', '📔'][idx % 6]
  }));

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-12 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black" id="home">
      
      {/* Background (same as before) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white rounded-full text-sm font-bold shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              🚀 OPEN TO OPPORTUNITIES
            </div>
            
            <div className="space-y-5">
              <div className="relative">
                <h1 className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                  Hi, I'm{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                      {profileData.name}
                    </span>
                    <span className="absolute -bottom-3 left-0 w-full h-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-full blur-sm"></span>
                  </span>
                </h1>
              </div>
              
              <p className="text-3xl lg:text-4xl text-slate-700 dark:text-slate-200 font-bold">
                {profileData.tagline}
              </p>
              <p className="text-xl text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                {profileData.currentYear} ({profileData.currentSemester}) @ {profileData.college}
              </p>
            </div>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-light">
              {profileData.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { value: profileData.latestSGPA.toFixed(2), label: 'Latest SGPA', icon: '📈', gradient: 'from-teal-500 to-cyan-600' },
                { value: profileData.totalProjects, label: 'Projects Deployed', icon: '🚀', gradient: 'from-indigo-500 to-purple-600' },
                { value: profileData.totalSkills, label: 'Tech Skills', icon: '💻', gradient: 'from-pink-500 to-orange-600' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="group relative flex-1 min-w-[150px]"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                  <div className="relative flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href="#contact" 
                className="group relative px-10 py-5 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105 text-center overflow-hidden text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get In Touch
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <button
                onClick={downloadResume}
                className="group relative px-10 py-5 bg-white dark:bg-slate-900 border-3 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-bold rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-900/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center overflow-hidden text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download Resume
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l-3-3m3 3V10" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Tech Stack */}
            <div className="pt-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-bold uppercase tracking-wider">⚡ Tech Stack</p>
              <div className="flex flex-wrap gap-3">
                {profileData.techStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-sm font-bold border-2 border-slate-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400 hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div className="pt-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-bold uppercase tracking-wider">🎯 Currently Learning</p>
              <div className="flex flex-wrap gap-3">
                {profileData.currentlyLearning.map((learning, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 cursor-default animate-pulse"
                  >
                    📚 {learning}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Profile Card (same structure, using dynamic data) */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="relative group w-full max-w-md">
              
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-gradient"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000" style={{animationDelay: '0.5s'}}></div>
              
              <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-black p-10 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800">
                
                <div className="absolute -top-4 -right-4 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  CODING ENTHUSIAST
                </div>

                <div className="flex flex-col items-center">
                  
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 p-1.5 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      {profilePic ? (
                        <img 
                          src={profilePic} 
                          alt={profileData.name} 
                          className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center text-7xl font-black text-white border-4 border-white dark:border-slate-900">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl">
                      <div className="absolute inset-2 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="text-center space-y-4 w-full">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{profileData.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-lg">B.Tech CSE ({profileData.specialization})</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">🎓 {profileData.college}</p>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-lg">
                      {profileData.currentYear} ({profileData.currentSemester}) | Latest SGPA: {profileData.latestSGPA}
                    </div>
                    
                    <div className="pt-6 space-y-4">
                      <h4 className="text-base font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-center gap-2">
                        📚 ACADEMICS
                      </h4>
                      
                      <div className="space-y-3">
                        {academicData.map((data, idx) => (
                          <div 
                            key={idx}
                            className="relative group/card"
                          >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${data.gradient} rounded-2xl blur opacity-50 group-hover/card:opacity-100 transition`}></div>
                            <div className={`relative bg-gradient-to-r ${data.gradient} rounded-2xl p-4 text-white shadow-xl transform hover:scale-105 transition-transform`}>
                              <p className="text-sm opacity-90 font-bold">{data.year}</p>
                              <p className="text-3xl font-black">{data.cgpa} <span className="text-lg">CGPA</span></p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {semesterData.map((sem, idx) => (
                          <div 
                            key={idx}
                            className="group/sem relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-3 border-2 border-slate-200 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <p className="text-2xl mb-1">{sem.icon}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{sem.sem}</p>
                            <p className="text-xl font-black text-teal-600 dark:text-teal-400">{sem.sgpa}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-500">SGPA</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;
