import { useState } from 'react';

function TechStack({ stack, learning }) {
  // Master Mapping: This ensures that when you type a name in Admin, 
  // the correct logo, category, and level/gradient are applied.
  const TECH_MAP = {
    'Python': { category: 'Language', level: 60, logo: 'python/python-original.svg', gradient: 'from-blue-400 to-blue-600' },
    'Java': { category: 'Language', level: 30, logo: 'java/java-original.svg', gradient: 'from-red-400 to-orange-600' },
    'JavaScript': { category: 'Language', level: 20, logo: 'javascript/javascript-original.svg', gradient: 'from-yellow-400 to-yellow-600' },
    'C': { category: 'Language', level: 25, logo: 'c/c-original.svg', gradient: 'from-blue-500 to-blue-700' },
    'HTML': { category: 'Web', level: 60, logo: 'html5/html5-original.svg', gradient: 'from-orange-400 to-red-600' },
    'CSS': { category: 'Web', level: 50, logo: 'css3/css3-original.svg', gradient: 'from-blue-400 to-indigo-600' },
    'React': { category: 'Web', level: 25, logo: 'react/react-original.svg', gradient: 'from-cyan-400 to-blue-600' },
    'Tailwind CSS': { category: 'Web', level: 30, logo: 'tailwindcss/tailwindcss-original.svg', gradient: 'from-teal-400 to-cyan-600' },
    'MySQL': { category: 'Database', level: 50, logo: 'mysql/mysql-original.svg', gradient: 'from-blue-500 to-indigo-600' },
    'Git': { category: 'Tools', level: 40, logo: 'git/git-original.svg', gradient: 'from-orange-500 to-red-600' },
    'GitHub': { category: 'Tools', level: 40, logo: 'github/github-original.svg', gradient: 'from-slate-600 to-slate-800' },
    'VS Code': { category: 'Tools', level: 40, logo: 'vscode/vscode-original.svg', gradient: 'from-blue-500 to-blue-700' },
    'Vite': { category: 'Tools', level: 25, logo: 'vitejs/vitejs-original.svg', gradient: 'from-purple-500 to-violet-600' }
  };

  // Convert the array of strings from props into the full object format
  const technologies = (stack || []).map(name => {
    const info = TECH_MAP[name] || { 
      category: 'Other', 
      level: 20, 
      logo: 'chrome/chrome-original.svg', 
      gradient: 'from-slate-400 to-slate-600' 
    };
    return { name, ...info, logo: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${info.logo}` };
  });

  const categories = ['All', 'Language', 'Web', 'Database', 'Tools'];
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
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden" id="skills">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 blur-xl opacity-50"></div>
            <span className="relative px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm font-bold shadow-xl">
              ✨ SKILLS & EXPERTISE
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6">
            My Tech <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">Arsenal</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`group relative px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category ? 'text-white shadow-2xl' : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-600 dark:text-slate-400 shadow-lg'
              }`}
            >
              {activeFilter === category && <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl"></div>}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTech.map((tech, idx) => {
            const skillInfo = getSkillLabel(tech.level);
            return (
              <div key={idx} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.gradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                <div className="relative h-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="w-16 h-16 p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-lg">
                      <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" />
                    </div>
                    <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${skillInfo.color} text-[10px] font-black text-white shadow-md`}>
                      {tech.level}%
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tech.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${skillInfo.textColor} bg-slate-100 dark:bg-slate-700 mb-6`}>
                    {skillInfo.text}
                  </span>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${skillInfo.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${tech.level}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Currently Exploring (Syncing Learning Props) */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl blur-2xl opacity-50"></div>
          <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-12 text-center">
            <h3 className="text-4xl font-black text-white mb-8">Currently Exploring</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {(learning || []).map((tech, idx) => (
                <div key={idx} className="relative px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold border-2 border-white/30 shadow-xl">
                  📚 {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;