import { useState } from 'react';

function TechStack() {
  const technologies = [
    // Programming Languages
    { 
      name: 'Python', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      category: 'Language', 
      level: 60, 
      gradient: 'from-blue-400 to-blue-600' 
    },
    { 
      name: 'Java', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      category: 'Language', 
      level: 30, 
      gradient: 'from-red-400 to-orange-600' 
    },
    { 
      name: 'JavaScript', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      category: 'Language', 
      level: 20, 
      gradient: 'from-yellow-400 to-yellow-600' 
    },
    { 
      name: 'C', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      category: 'Language', 
      level: 25, 
      gradient: 'from-blue-500 to-blue-700' 
    },
    
    // Web Technologies
    { 
      name: 'HTML', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      category: 'Web', 
      level: 60, 
      gradient: 'from-orange-400 to-red-600' 
    },
    { 
      name: 'CSS', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      category: 'Web', 
      level: 50, 
      gradient: 'from-blue-400 to-indigo-600' 
    },
    { 
      name: 'React', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Web', 
      level: 25, 
      gradient: 'from-cyan-400 to-blue-600' 
    },
    { 
      name: 'Tailwind CSS', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      category: 'Web', 
      level: 30, 
      gradient: 'from-teal-400 to-cyan-600' 
    },
    
    // Database
    { 
      name: 'MySQL', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      category: 'Database', 
      level: 50, 
      gradient: 'from-blue-500 to-indigo-600' 
    },
    
    // Development
    { 
      name: 'Web Dev', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
      category: 'Development', 
      level: 40, 
      gradient: 'from-green-400 to-emerald-600' 
    },
    
    // Tools
    { 
      name: 'Git', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      category: 'Tools', 
      level: 40, 
      gradient: 'from-orange-500 to-red-600' 
    },
    { 
      name: 'GitHub', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      category: 'Tools', 
      level: 40, 
      gradient: 'from-slate-600 to-slate-800' 
    },
    { 
      name: 'VS Code', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      category: 'Tools', 
      level: 40, 
      gradient: 'from-blue-500 to-blue-700' 
    },
    { 
      name: 'Vite', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
      category: 'Tools', 
      level: 25, 
      gradient: 'from-purple-500 to-violet-600' 
    }
  ];

  const categories = ['All', 'Language', 'Web', 'Database', 'Development', 'Tools'];
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTech = activeFilter === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeFilter);

  const getSkillLabel = (level) => {
    if (level >= 60) return { text: 'Proficient', color: 'from-green-500 to-emerald-500', textColor: 'text-green-600 dark:text-green-400' };
    if (level >= 40) return { text: 'Intermediate', color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-600 dark:text-blue-400' };
    if (level >= 25) return { text: 'Learning', color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-600 dark:text-yellow-400' };
    return { text: 'Beginner', color: 'from-orange-500 to-red-500', textColor: 'text-orange-600 dark:text-orange-400' };
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 blur-xl opacity-50"></div>
            <span className="relative px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm font-bold shadow-xl">
              ✨ SKILLS & EXPERTISE
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            My Tech
            <br />
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light">
            An honest look at my current skills and continuous learning journey
          </p>
        </div>

        {/* Premium Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`group relative px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'text-white shadow-2xl'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 shadow-lg'
              }`}
            >
              {activeFilter === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl"></div>
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Premium Tech Grid with REAL LOGOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTech.map((tech, idx) => {
            const skillInfo = getSkillLabel(tech.level);
            return (
              <div
                key={idx}
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.gradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                
                {/* Card */}
                <div className="relative h-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl group-hover:-translate-y-2">
                  
                  {/* Percentage Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${skillInfo.color} shadow-lg`}>
                      <span className="text-xs font-black text-white">
                        {tech.level}%
                      </span>
                    </div>
                  </div>

                  {/* REAL TECH LOGO */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white dark:bg-slate-700 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 p-3">
                      <img 
                        src={tech.logo} 
                        alt={tech.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {tech.name}
                  </h3>

                  {/* Skill Level Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${skillInfo.textColor} bg-slate-100 dark:bg-slate-700`}>
                      {skillInfo.text}
                    </span>
                  </div>

                  {/* Premium Progress Bar */}
                  <div className="relative">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skillInfo.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                        style={{ width: `${tech.level}%` }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Legend */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { label: 'Proficient', range: '60%+', color: 'from-green-500 to-emerald-500' },
            { label: 'Intermediate', range: '40-59%', color: 'from-blue-500 to-cyan-500' },
            { label: 'Learning', range: '25-39%', color: 'from-yellow-500 to-orange-500' },
            { label: 'Beginner', range: '<25%', color: 'from-orange-500 to-red-500' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}></div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.range}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium "Currently Exploring" Section */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl blur-2xl opacity-50"></div>
          
          <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Currently Exploring
              </h3>
              <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
                Technologies I'm actively learning and improving every day
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {['React', 'Tailwind CSS', 'Vite', 'DSA with Java'].map((tech, idx) => (
                  <div 
                    key={idx}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition"></div>
                    <div className="relative px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all shadow-xl">
                      📚 {tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

export default TechStack;
