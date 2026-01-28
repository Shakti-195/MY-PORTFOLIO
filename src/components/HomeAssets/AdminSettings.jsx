import { useState, useEffect, useCallback } from 'react';
import heic2any from 'heic2any';
import Cropper from 'react-easy-crop'; // Added for dynamic cropping

function AdminSettings({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // --- NEW CROPPER STATE ---
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const ADMIN_PASSWORD = 'Shakti9453@';

  // --- THEME MAPPING (Keep Original) ---
  const THEME_MAP = {
    "from-cyan-400 to-blue-500": "shadow-cyan-500/20",
    "from-blue-500 to-indigo-500": "shadow-blue-500/20",
    "from-indigo-500 to-purple-500": "shadow-purple-500/20",
    "from-purple-500 to-pink-500": "shadow-pink-500/20",
    "from-orange-400 to-red-500": "shadow-orange-500/20",
    "from-emerald-400 to-teal-500": "shadow-emerald-500/20"
  };

  // --- DEFAULT DATA (Keep Original) ---
  const defaultProfileData = {
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

  const defaultEducation = [
    { id: 1, type: "school", title: "10th Standard (PCM)", institution: "Shri Raghukul Vidya Peeth", period: "2019 – 2020", score: "75%", desc: "Built a strong foundation.", color: "from-cyan-400 to-blue-500", glow: "shadow-cyan-500/20" },
    { id: 2, type: "school", title: "12th Standard (PCM)", institution: "Shri Raghukul Vidya Peeth", period: "2021 – 2022", score: "68.8%", desc: "Specialized in Physics & Math.", color: "from-blue-500 to-indigo-500", glow: "shadow-blue-500/20" }
  ];

  // --- LOAD DATA (Keep Original) ---
  const [profileData, setProfileData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('profileData');
      return saved ? JSON.parse(saved) : defaultProfileData;
    }
    return defaultProfileData;
  });

  const [educationData, setEducationData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('educationTimeline');
      return saved ? JSON.parse(saved) : defaultEducation;
    }
    return defaultEducation;
  });

  const [profilePic, setProfilePic] = useState(null);
  const [resumePdf, setResumePdf] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfilePic(localStorage.getItem('profilePicture'));
      setResumePdf(localStorage.getItem('resumePdf'));
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password!');
      setPassword('');
    }
  };

  // --- NEW DYNAMIC CROP LOGIC (Fixes Deployment Storage Issue) ---
  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const createCroppedImage = async () => {
    try {
      setUploading(true);
      const image = new Image();
      image.src = imageToCrop;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set output size (Fixed 400x400 for perfect resolution vs storage balance)
      canvas.width = 400;
      canvas.height = 400;

      ctx.drawImage(
        image,
        croppedAreaPixels.x, croppedAreaPixels.y,
        croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0, 400, 400
      );

      // Deployment Fix: Compress to 0.7 quality to stay under LocalStorage limits
      const base64Image = canvas.toDataURL('image/jpeg', 0.7);
      localStorage.setItem('profilePicture', base64Image);
      setProfilePic(base64Image);
      setImageToCrop(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      setError("Crop Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let processedFile = file;
    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
      setUploading(true);
      try {
        const jpegBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 });
        processedFile = new File([jpegBlob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
      } catch (err) {
        setError('HEIC Conversion Failed');
        setUploading(false);
        return;
      }
    }
    
    // Instead of direct upload, trigger the Cropper
    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result);
      setUploading(false);
    };
    reader.readAsDataURL(processedFile);
  };

  // --- REMAINING LOGIC (Keep Original) ---
  const handleFileRead = (file, storageKey, stateSetter) => {
    setUploading(true);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        localStorage.setItem(storageKey, reader.result);
        stateSetter(reader.result);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (err) {
        setError('Browser Storage Full! File too large.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileRead(file, 'resumePdf', setResumePdf);
  };

  const removeProfilePic = () => {
    localStorage.removeItem('profilePicture');
    setProfilePic(null);
  };

  const saveAllData = () => {
    try {
      localStorage.setItem('profileData', JSON.stringify(profileData));
      localStorage.setItem('educationTimeline', JSON.stringify(educationData));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError('Failed to save data.');
    }
  };

  const addEducation = () => {
    const defaultColor = "from-cyan-400 to-blue-500";
    const newItem = { id: Date.now(), type: "school", title: "", institution: "", period: "", score: "", desc: "", color: defaultColor, glow: THEME_MAP[defaultColor] };
    setEducationData([newItem, ...educationData]);
  };

  const removeEducation = (id) => setEducationData(educationData.filter(item => item.id !== id));

  const updateEducation = (id, field, value) => {
    setEducationData(educationData.map(item => {
        if (item.id === id) {
            let updates = { [field]: value };
            if (field === 'color') { updates.glow = THEME_MAP[value] || "shadow-cyan-500/20"; }
            return { ...item, ...updates };
        }
        return item;
    }));
  };

  const moveItem = (index, direction) => {
    const newData = [...educationData];
    if (direction === 'up' && index > 0) { [newData[index], newData[index - 1]] = [newData[index - 1], newData[index]]; } 
    else if (direction === 'down' && index < newData.length - 1) { [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]]; }
    setEducationData(newData);
  };

  const updateArray = (arrName, idx, val, key) => {
    setProfileData(prev => ({
        ...prev,
        [arrName]: prev[arrName].map((item, i) => i === idx ? (key ? { ...item, [key]: val } : val) : item)
    }));
  };
  const addItem = (arrName, newItem) => setProfileData(prev => ({ ...prev, [arrName]: [...prev[arrName], newItem] }));
  const removeItem = (arrName, idx) => setProfileData(prev => ({ ...prev, [arrName]: prev[arrName].filter((_, i) => i !== idx) }));

  if (!isOpen) return null;

  const tabs = [
    { id: 'personal', label: 'Personal', icon: '👤' },
    { id: 'journey', label: 'Timeline', icon: '🚀' },
    { id: 'media', label: 'Media', icon: '📸' },
    { id: 'academic', label: 'Academic', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-6 animate-fade-in font-sans">
      <div className="relative w-full max-w-7xl h-full md:h-[90vh] flex flex-col md:flex-row bg-white dark:bg-slate-950 md:rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        
        {/* --- DYNAMIC CROP OVERLAY (The Fix) --- */}
        
        {imageToCrop && (
          <div className="absolute inset-0 z-[100] bg-slate-900 flex flex-col">
            <div className="p-4 flex justify-between items-center bg-slate-800">
              <h3 className="text-white font-bold">Crop Profile Picture</h3>
              <button onClick={() => setImageToCrop(null)} className="text-slate-400">Cancel</button>
            </div>
            <div className="relative flex-1 bg-black">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-6 bg-slate-900 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-white text-xs">Zoom</span>
                <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(e.target.value)} className="flex-1 accent-teal-500" />
              </div>
              <button onClick={createCroppedImage} className="w-full py-3 bg-teal-500 text-slate-900 font-bold rounded-xl">Save & Apply</button>
            </div>
          </div>
        )}

        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!isAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-900 text-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-teal-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                    <span className="text-4xl">🔒</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
                <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4 mt-6">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-teal-500 outline-none text-center" autoFocus />
                    <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">Unlock</button>
                </form>
                {error && <p className="mt-4 text-red-400 animate-pulse">{error}</p>}
            </div>
        ) : (
            <>
                <div className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-row md:flex-col shrink-0 overflow-x-auto md:overflow-visible">
                    <div className="p-6 hidden md:block">
                        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Control Panel</h2>
                        <p className="text-xs text-slate-500 mt-1">v2.0 Ultra Responsive</p>
                    </div>
                    <div className="flex md:flex-col gap-1 p-2 md:p-4 w-full">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                                <span className="text-lg">{tab.icon}</span>{tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-auto p-4 hidden md:block">
                        <button onClick={saveAllData} className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black rounded-xl shadow-lg flex items-center justify-center gap-2"><span>💾</span> Save Changes</button>
                    </div>
                </div>

                <div className="flex-1 bg-slate-50 dark:bg-slate-950 relative flex flex-col overflow-hidden">
                    <div className="md:hidden absolute bottom-6 right-6 z-50">
                        <button onClick={saveAllData} className="w-14 h-14 bg-teal-500 text-white rounded-full shadow-xl flex items-center justify-center text-2xl">💾</button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-24">
                        {uploading && <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-xl z-50 animate-bounce">Processing...</div>}
                        {showSuccess && <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-xl z-50 animate-fade-in">Saved Successfully!</div>}
                        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl">{error}</div>}

                        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                            {activeTab === 'personal' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Full Name" val={profileData.name} set={v => setProfileData({...profileData, name: v})} />
                                    <Input label="Tagline" val={profileData.tagline} set={v => setProfileData({...profileData, tagline: v})} />
                                    <Input label="College" val={profileData.college} set={v => setProfileData({...profileData, college: v})} />
                                    <Input label="Specialization" val={profileData.specialization} set={v => setProfileData({...profileData, specialization: v})} />
                                    <div className="md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Bio</label>
                                        <textarea className="w-full mt-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white outline-none focus:border-teal-500" rows="4" value={profileData.description} onChange={e => setProfileData({...profileData, description: e.target.value})} />
                                    </div>
                                    <Input label="Current Year" val={profileData.currentYear} set={v => setProfileData({...profileData, currentYear: v})} />
                                    <Input label="Semester" val={profileData.currentSemester} set={v => setProfileData({...profileData, currentSemester: v})} />
                                    <Input label="Latest SGPA" type="number" val={profileData.latestSGPA} set={v => setProfileData({...profileData, latestSGPA: v})} />
                                    <Input label="Total Projects" type="number" val={profileData.totalProjects} set={v => setProfileData({...profileData, totalProjects: v})} />
                                </div>
                            )}

                            {activeTab === 'journey' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Milestones</h3>
                                        <button onClick={addEducation} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all">+ Add New</button>
                                    </div>
                                    <div className="space-y-6">
                                        {educationData.map((item, idx) => (
                                            <div key={item.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-teal-500/50 transition-all group relative">
                                                <div className="absolute top-6 right-6 flex gap-2">
                                                    <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30">⬆️</button>
                                                    <button onClick={() => moveItem(idx, 'down')} disabled={idx === educationData.length - 1} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30">⬇️</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-16">
                                                    <Input label="Title" val={item.title} set={v => updateEducation(item.id, 'title', v)} />
                                                    <Input label="Institution" val={item.institution} set={v => updateEducation(item.id, 'institution', v)} />
                                                    <Input label="Period" val={item.period} set={v => updateEducation(item.id, 'period', v)} />
                                                    <div className="flex gap-2">
                                                        <Input label="Score" val={item.score} set={v => updateEducation(item.id, 'score', v)} />
                                                        <div className="flex-1">
                                                            <label className="text-xs font-bold text-slate-500 uppercase">Theme</label>
                                                            <select value={item.color} onChange={e => updateEducation(item.id, 'color', e.target.value)} className="w-full mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none text-xs">
                                                                {Object.keys(THEME_MAP).map(color => (
                                                                    <option key={color} value={color}>{color.split(' ')[1].replace('to-', '').toUpperCase()}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="text-xs font-bold text-slate-500 uppercase">Icon</label>
                                                            <select value={item.type} onChange={e => updateEducation(item.id, 'type', e.target.value)} className="w-full mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none text-xs">
                                                                <option value="school">School</option>
                                                                <option value="prep">Exam</option>
                                                                <option value="university">College</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <Input label="Description" val={item.desc} set={v => updateEducation(item.id, 'desc', v)} />
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-start">
                                                    <button onClick={() => removeEducation(item.id)} className="text-red-500 text-sm font-bold hover:underline">Delete Milestone</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'media' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-center hover:border-teal-500 transition-all">
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative border-2 border-teal-500/20">
                                            {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-4xl leading-[6rem]">📸</span>}
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Profile Photo</h4>
                                        <input type="file" id="pic" className="hidden" onChange={handleProfilePicChange} accept="image/*" />
                                        <label htmlFor="pic" className="mt-4 inline-block px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold cursor-pointer hover:opacity-90">Upload & Crop</label>
                                        {profilePic && <button onClick={removeProfilePic} className="block mx-auto mt-2 text-red-500 text-xs font-bold">Remove</button>}
                                        <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest">Supports HEIC & Auto-Optimization</p>
                                    </div>
                                    <div className="p-8 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-center hover:border-blue-500 transition-all">
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                                            <span className="text-4xl">📄</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Resume PDF</h4>
                                        <p className="text-xs text-slate-500 mb-4">{resumePdf ? '✅ Uploaded' : 'Free Size Upload'}</p>
                                        <input type="file" id="pdf" className="hidden" onChange={handleResumeChange} accept=".pdf" />
                                        <label htmlFor="pdf" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-bold cursor-pointer hover:bg-blue-700">Select PDF</label>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'academic' && (
                                <div className="space-y-8">
                                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Year-wise Records</h4>
                                        {profileData.yearData.map((y, i) => (
                                            <div key={i} className="flex gap-2 mb-2">
                                                <input className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border-none outline-none" value={y.year} onChange={e => updateArray('yearData', i, e.target.value, 'year')} />
                                                <input className="w-24 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border-none outline-none" type="number" value={y.cgpa} onChange={e => updateArray('yearData', i, e.target.value, 'cgpa')} />
                                                <button onClick={() => removeItem('yearData', i)} className="px-3 text-red-500 font-bold">×</button>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('yearData', { year: '', cgpa: '' })} className="text-sm font-bold text-teal-500 mt-2">+ Add Year</button>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Semester Records</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {profileData.semesterData.map((s, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white text-sm border-none outline-none" value={s.sem} onChange={e => updateArray('semesterData', i, e.target.value, 'sem')} />
                                                    <input className="w-20 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white text-sm border-none outline-none" type="number" value={s.sgpa} onChange={e => updateArray('semesterData', i, e.target.value, 'sgpa')} />
                                                    <button onClick={() => removeItem('semesterData', i)} className="px-2 text-red-500 font-bold">×</button>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => addItem('semesterData', { sem: '', sgpa: '' })} className="text-sm font-bold text-blue-500 mt-4">+ Add Semester</button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="space-y-6">
                                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.techStack.map((t, i) => (
                                                <div key={i} className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1">
                                                    <input className="bg-transparent outline-none w-24 text-sm dark:text-white" value={t} onChange={e => updateArray('techStack', i, e.target.value)} />
                                                    <button onClick={() => removeItem('techStack', i)} className="ml-2 text-red-500 font-bold">×</button>
                                                </div>
                                            ))}
                                            <button onClick={() => addItem('techStack', '')} className="bg-teal-500 text-white px-3 py-1 rounded-lg text-sm font-bold">+ Add</button>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Currently Learning</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.currentlyLearning.map((l, i) => (
                                                <div key={i} className="flex items-center bg-orange-50 dark:bg-orange-900/20 rounded-lg px-3 py-1">
                                                    <input className="bg-transparent outline-none w-24 text-sm dark:text-white" value={l} onChange={e => updateArray('currentlyLearning', i, e.target.value)} />
                                                    <button onClick={() => removeItem('currentlyLearning', i)} className="ml-2 text-red-500 font-bold">×</button>
                                                </div>
                                            ))}
                                            <button onClick={() => addItem('currentlyLearning', '')} className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold">+ Add</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

const Input = ({ label, val, set, type="text" }) => (
    <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
        <input type={type} value={val || ''} onChange={e => set(e.target.value)} className="w-full mt-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white outline-none focus:border-teal-500 transition-colors font-medium" />
    </div>
);

export default AdminSettings;