import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Receives data, profilePic, and resumePdf as props from Home.jsx
function Hero({ data, profilePic, resumePdf }) {
  
  // Use the cloud data passed from props, or fallback to default if loading
  const profileData = data || {
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
    yearData: [{ year: '1st Year', cgpa: 8.425 }, { year: '2nd Year', cgpa: 8.46 }],
    semesterData: [{ sem: '1st Sem', sgpa: 8.58 }, { sem: '2nd Sem', sgpa: 8.27 }, { sem: '3rd Sem', sgpa: 8.5 }, { sem: '4th Sem', sgpa: 8.42 }],
    techStack: ['Java', 'C', 'Python', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Git'],
    currentlyLearning: ['React', 'Tailwind CSS', 'Vite']
  };

  const downloadResume = () => {
    // Now pulls from the Firebase resumePdf prop
    const savedResume = resumePdf;
    
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
      alert('📄 No resume found on the cloud!\n\nPlease upload it via Admin Settings on your laptop.');
    }
  };

  const academicData = (profileData.yearData || []).map((year, idx) => ({
    ...year,
    gradient: idx === 0 ? 'from-blue-500 via-indigo-500 to-purple-500' : 'from-teal-500 via-cyan-500 to-blue-500'
  }));

  const semesterData = (profileData.semesterData || []).map((sem, idx) => ({
    ...sem,
    icon: ['📘', '📗', '📙', '📕', '📓', '📔'][idx % 6]
  }));

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-12 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black" id="home">
      
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white rounded-full text-sm font-bold shadow-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              🚀 OPEN TO OPPORTUNITIES
            </div>
            
            <div className="space-y-5">
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                    {profileData.name}
                  </span>
                </span>
              </h1>
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

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4">
              {[
                { value: Number(profileData.latestSGPA || 0).toFixed(2), label: 'Latest SGPA', icon: '📈', gradient: 'from-teal-500 to-cyan-600' },
                { value: profileData.totalProjects, label: 'Projects Deployed', icon: '🚀', gradient: 'from-indigo-500 to-purple-600' },
                { value: profileData.totalSkills, label: 'Tech Skills', icon: '💻', gradient: 'from-pink-500 to-orange-600' }
              ].map((stat, idx) => (
                <div key={idx} className="relative flex-1 min-w-[150px]">
                  <div className="relative flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl`}>
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
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="#contact" className="px-10 py-5 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl text-center text-lg">
                Get In Touch
              </a>
              <button onClick={downloadResume} className="px-10 py-5 bg-white dark:bg-slate-900 border-3 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-bold rounded-2xl shadow-xl text-center text-lg">
                Download Resume
              </button>
            </div>
          </motion.div>

          {/* Right Profile Card */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-[2rem] blur-2xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-black p-10 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800">
                
                <div className="flex flex-col items-center">
                  <div className="relative mb-8">
                    <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 p-1.5 shadow-2xl">
                      {profilePic ? (
                        <img src={profilePic} alt={profileData.name} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-teal-600 flex items-center justify-center text-7xl font-black text-white">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center space-y-4 w-full">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{profileData.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-lg">B.Tech CSE ({profileData.specialization})</p>
                    
                    <div className="pt-6 space-y-4">
                      <h4 className="text-base font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">📚 ACADEMICS</h4>
                      <div className="space-y-3">
                        {academicData.map((acad, idx) => (
                          <div key={idx} className={`bg-gradient-to-r ${acad.gradient} rounded-2xl p-4 text-white shadow-xl`}>
                            <p className="text-sm opacity-90 font-bold">{acad.year}</p>
                            <p className="text-3xl font-black">{acad.cgpa} <span className="text-lg">CGPA</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
      `}</style>
    </section>
  );
}

export default Hero;