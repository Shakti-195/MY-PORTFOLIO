import { useState, useEffect, useCallback } from 'react';
import heic2any from 'heic2any';
import Cropper from 'react-easy-crop';
import { db } from '../../firebase'; // Path to your firebase.js
import { ref, set, onValue } from "firebase/database";

// --- HELPER FOR LIVE ICON PREVIEW ---
const getLiveIcon = (url) => {
    if (!url) return 'fa-link text-slate-700';
    const link = url.toLowerCase();
    if (link.includes('github.com')) return 'fa-github text-white';
    if (link.includes('linkedin.com')) return 'fa-linkedin-in text-cyan-400';
    if (link.includes('instagram.com')) return 'fa-instagram text-pink-500';
    if (link.includes('twitter.com') || link.includes('x.com')) return 'fa-x-twitter text-white';
    if (link.includes('facebook.com')) return 'fa-facebook-f text-blue-600';
    if (link.includes('threads.net')) return 'fa-threads text-white';
    if (link.includes('whatsapp.com') || link.includes('wa.me')) return 'fa-whatsapp text-emerald-500';
    if (link.includes('youtube.com')) return 'fa-youtube text-red-600';
    return 'fa-link text-cyan-400';
};

function AdminSettings({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const ADMIN_PASSWORD = 'Shakti9453@';

  const THEME_MAP = {
    "from-cyan-400 to-blue-500": "shadow-cyan-500/20",
    "from-blue-500 to-indigo-500": "shadow-blue-500/20",
    "from-indigo-500 to-purple-500": "shadow-purple-500/20",
    "from-purple-500 to-pink-500": "shadow-pink-500/20",
    "from-orange-400 to-red-500": "shadow-orange-500/20",
    "from-emerald-400 to-teal-500": "shadow-emerald-500/20"
  };

  const defaultProfileData = {
    name: 'Shakti Singh',
    tagline: 'B.Tech Student | Coding Enthusiast',
    college: 'BBDU, Lucknow',
    specialization: 'IOTBC',
    location: 'Lucknow, India',
    contactNumbers: [{ label: 'Primary', number: '+91 63872298335' }],
    socialLinks: [
        { name: 'GitHub', url: 'https://github.com/Shakti-195' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/' }
    ],
    description: 'Pursuing B.Tech in Computer Science with specialization in IOTBC...',
    techStack: [],
    yearData: [],
    semesterData: []
  };

  const [profileData, setProfileData] = useState(defaultProfileData);
  const [educationData, setEducationData] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [resumePdf, setResumePdf] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const portfolioRef = ref(db, 'portfolioData');
      onValue(portfolioRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data.profileData) setProfileData(data.profileData);
          if (data.educationData) setEducationData(data.educationData);
          if (data.profilePic) setProfilePic(data.profilePic);
          if (data.resumePdf) setResumePdf(data.resumePdf);
        }
      });
    }
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { setIsAuthenticated(true); setError(''); }
    else { setError('Matrix Error: Unauthorized'); setPassword(''); }
  };

  // --- ARRAY HELPERS ---
  const addItem = (arrName, newItem) => {
    setProfileData(prev => ({ ...prev, [arrName]: prev[arrName] ? [...prev[arrName], newItem] : [newItem] }));
  };

  const removeItem = (arrName, idx) => {
    setProfileData(prev => ({ ...prev, [arrName]: prev[arrName].filter((_, i) => i !== idx) }));
  };

  const updateArray = (arrName, idx, val, key) => {
    setProfileData(prev => ({ 
        ...prev, 
        [arrName]: prev[arrName].map((item, i) => i === idx ? (key ? { ...item, [key]: val } : val) : item) 
    }));
  };

  const saveAllData = async () => {
    try {
      setUploading(true);
      await set(ref(db, 'portfolioData'), { profileData, educationData, profilePic, resumePdf });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) { setError('Sync Interrupted'); } finally { setUploading(false); }
  };

  // --- IMAGE & FILE LOGIC (Original) ---
  const onCropComplete = useCallback((_, pixels) => { setCroppedAreaPixels(pixels); }, []);
  const createCroppedImage = async () => {
    try {
      setUploading(true);
      const image = new Image(); image.src = imageToCrop;
      await new Promise((resolve) => (image.onload = resolve));
      const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
      canvas.width = 400; canvas.height = 400;
      ctx.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, 400, 400);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);
      setProfilePic(base64Image); setImageToCrop(null); setShowSuccess(true);
    } catch (e) { setError("Crop Failed"); } finally { setUploading(false); }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    let processedFile = file;
    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
      setUploading(true);
      try {
        const jpegBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 });
        processedFile = new File([jpegBlob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
      } catch (err) { setError('Format Error'); setUploading(false); return; }
    }
    const reader = new FileReader();
    reader.onload = () => { setImageToCrop(reader.result); setUploading(false); };
    reader.readAsDataURL(processedFile);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setResumePdf(reader.result);
        reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    const newItem = { id: Date.now(), title: "", institution: "", period: "", score: "", color: "from-cyan-400 to-blue-500", glow: THEME_MAP["from-cyan-400 to-blue-500"] };
    setEducationData([newItem, ...educationData]);
  };

  const updateEducation = (id, field, value) => {
    setEducationData(educationData.map(item => item.id === id ? { ...item, [field]: value, ...(field === 'color' && { glow: THEME_MAP[value] }) } : item));
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'personal', label: 'Identity', icon: '👤' },
    { id: 'journey', label: 'Timeline', icon: '🚀' },
    { id: 'media', label: 'Assets', icon: '📸' },
    { id: 'academic', label: 'Grades', icon: '🎓' },
    { id: 'skills', label: 'Arsenal', icon: '⚡' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[999] flex items-center justify-center p-0 md:p-10 font-sans">
      <div className="relative w-full max-w-7xl h-full md:h-[90vh] flex flex-col md:flex-row bg-[#020617]/80 md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl animate-fade-in">
        
        {/* --- CROPPER OVERLAY --- */}
        {imageToCrop && (
          <div className="absolute inset-0 z-[1000] bg-black flex flex-col">
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <h3 className="text-white text-2xl font-black uppercase italic">Avatar Sync</h3>
              <button onClick={() => setImageToCrop(null)} className="text-red-500 font-bold px-6 py-2 bg-red-500/10 rounded-full">Abort</button>
            </div>
            <div className="relative flex-1"><Cropper image={imageToCrop} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} /></div>
            <div className="p-10 bg-slate-900/50 backdrop-blur-2xl flex flex-col gap-6">
              <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(e.target.value)} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none accent-cyan-500" />
              <button onClick={createCroppedImage} className="w-full py-5 bg-cyan-500 text-black font-black rounded-3xl uppercase tracking-widest hover:bg-white transition-all shadow-xl">Apply Precision Crop</button>
            </div>
          </div>
        )}

        {/* --- SIDEBAR --- */}
        <div className="w-full md:w-80 bg-black/40 border-r border-white/5 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-10">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Console V3</h2>
            <div className={`h-1 w-20 mt-2 ${isAuthenticated ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
          </div>

          {isAuthenticated && (
            <div className="flex md:flex-col px-4 gap-2 pb-10">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all duration-500 ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-white'}`}>
                  <span className="text-xl">{tab.icon}</span>{tab.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-auto p-8">
            <button onClick={saveAllData} disabled={!isAuthenticated} className="w-full py-5 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-20">
              {uploading ? '📡 Syncing...' : '💾 Save to Cloud'}
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col bg-transparent relative overflow-hidden">
          <button onClick={onClose} className="absolute top-8 right-8 z-[50] text-slate-500 hover:text-white transition-all text-2xl">✕</button>

          <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
            {!isAuthenticated ? (
                /* Login Form */
                <div className="h-full flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-4xl mb-10 border border-white/10 shadow-inner">🔒</div>
                  <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ENTER MASTER KEY" className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-white font-black tracking-[0.5em] text-center outline-none focus:border-cyan-500 transition-all" autoFocus />
                    <button className="w-full py-6 bg-cyan-500 text-black font-black rounded-3xl uppercase text-xs tracking-widest hover:scale-[1.02] transition-all">Authorize Access</button>
                  </form>
                  {error && <p className="mt-6 text-red-500 font-black uppercase text-xs animate-bounce">{error}</p>}
                </div>
            ) : (
                /* Authenticated Content */
                <div className="max-w-4xl mx-auto space-y-12 pb-20">
                    
                    {/* PERSONAL / IDENTITY TAB */}
                    {activeTab === 'personal' && (
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic">
                                <Input label="Public Name" val={profileData.name} set={v => setProfileData({...profileData, name: v})} />
                                <Input label="Live Location" val={profileData.location} set={v => setProfileData({...profileData, location: v})} />
                                <Input label="Tagline" val={profileData.tagline} set={v => setProfileData({...profileData, tagline: v})} />
                                <Input label="Institution" val={profileData.college} set={v => setProfileData({...profileData, college: v})} />
                            </div>

                            {/* DYNAMIC CONTACT NUMBERS */}
                            <div className="space-y-6 border-l-2 border-emerald-500 pl-6 bg-white/[0.02] p-8 rounded-3xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Voice Connect (Numbers)</h4>
                                    <button onClick={() => addItem('contactNumbers', { label: '', number: '' })} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full">+ Add Number</button>
                                </div>
                                {profileData.contactNumbers?.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-end">
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <Input label="Label (e.g. WhatsApp)" val={item.label} set={v => updateArray('contactNumbers', idx, v, 'label')} />
                                            <Input label="Phone Number" val={item.number} set={v => updateArray('contactNumbers', idx, v, 'number')} />
                                        </div>
                                        <button onClick={() => removeItem('contactNumbers', idx)} className="mb-4 text-red-500 font-black px-2">✕</button>
                                    </div>
                                ))}
                            </div>

                            {/* DYNAMIC SOCIAL LINKS */}
                            <div className="space-y-6 border-l-2 border-cyan-500 pl-6 bg-white/[0.02] p-8 rounded-3xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xs font-black text-cyan-500 uppercase tracking-widest">Digital Pulse (Socials)</h4>
                                    <button onClick={() => addItem('socialLinks', { name: '', url: '' })} className="text-[10px] bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full">+ Add Social</button>
                                </div>
                                {profileData.socialLinks?.map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-end bg-black/20 p-6 rounded-2xl border border-white/5">
                                        {/* LIVE PREVIEW BOX */}
                                        <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                                            <i className={`fab ${getLiveIcon(item.url)} text-2xl`}></i>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                            <Input label="Platform Name" val={item.name} set={v => updateArray('socialLinks', idx, v, 'name')} />
                                            <Input label="Profile URL (Paste here)" val={item.url} set={v => updateArray('socialLinks', idx, v, 'url')} />
                                        </div>
                                        <button onClick={() => removeItem('socialLinks', idx)} className="mb-4 text-red-500 font-black px-2">✕</button>
                                    </div>
                                ))}
                            </div>

                            <div className="md:col-span-2 italic">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block">The Narrative (About Me)</label>
                                <textarea className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] text-white outline-none focus:border-cyan-500 transition-all min-h-[150px] resize-none" value={profileData.description} onChange={e => setProfileData({...profileData, description: e.target.value})} />
                            </div>
                        </div>
                    )}

                    {/* ACADEMIC TAB */}
                    {activeTab === 'academic' && (
                        <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 italic">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Annual Performance Data</h4>
                            {profileData.yearData?.map((y, i) => (
                                <div key={i} className="flex gap-4 mb-4">
                                    <input className="flex-1 p-4 bg-black/40 rounded-2xl border border-white/5 text-white outline-none focus:border-cyan-500" value={y.year} onChange={e => updateArray('yearData', i, e.target.value, 'year')} />
                                    <input className="w-24 p-4 bg-black/40 rounded-2xl border border-white/5 text-white outline-none focus:border-cyan-500" type="number" value={y.cgpa} onChange={e => updateArray('yearData', i, e.target.value, 'cgpa')} />
                                    <button onClick={() => removeItem('yearData', i)} className="text-red-500 font-black">✕</button>
                                </div>
                            ))}
                            <button onClick={() => addItem('yearData', { year: '', cgpa: '' })} className="text-cyan-400 font-bold text-xs mt-4 uppercase">+ Append Year</button>
                        </div>
                    )}

                    {/* SKILLS TAB */}
                    {activeTab === 'skills' && (
                        <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 italic">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 italic">Technical Arsenal</h4>
                            <div className="flex flex-wrap gap-3">
                                {profileData.techStack?.map((t, i) => (
                                    <div key={i} className="flex items-center bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-xl">
                                        <input className="bg-transparent outline-none text-cyan-400 font-bold w-20 text-sm" value={t} onChange={e => updateArray('techStack', i, e.target.value)} />
                                        <button onClick={() => removeItem('techStack', i)} className="ml-2 text-red-500 font-black">✕</button>
                                    </div>
                                ))}
                                <button onClick={() => addItem('techStack', '')} className="p-2 bg-white/10 rounded-xl text-white font-black hover:bg-white/20 transition-all">Add +</button>
                            </div>
                        </div>
                    )}

                    {/* MEDIA ASSETS TAB */}
                    {activeTab === 'media' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 italic">
                            <div className="p-10 border-2 border-dashed border-white/10 rounded-[3rem] text-center space-y-6 bg-white/[0.02] hover:border-cyan-500 transition-all">
                                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                                    {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="h-full bg-slate-900 flex items-center justify-center text-5xl">👤</div>}
                                </div>
                                <input type="file" id="pic" className="hidden" onChange={handleProfilePicChange} accept="image/*" />
                                <label htmlFor="pic" className="inline-block px-8 py-3 bg-cyan-500 text-black rounded-2xl font-black text-[10px] cursor-pointer tracking-widest uppercase italic">Update Avatar</label>
                            </div>
                            
                            <div className="p-10 border-2 border-dashed border-white/10 rounded-[3rem] text-center space-y-6 bg-white/[0.02] hover:border-blue-500 transition-all">
                                <div className="w-40 h-40 mx-auto rounded-[3rem] bg-slate-900 border border-white/5 flex items-center justify-center text-6xl italic">📄</div>
                                <input type="file" id="resume" className="hidden" accept=".pdf" onChange={handleResumeChange} />
                                <label htmlFor="resume" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] cursor-pointer tracking-widest uppercase italic">Upload Resume PDF</label>
                            </div>
                        </div>
                    )}
                    
                    {/* TIMELINE TAB */}
                    {activeTab === 'journey' && (
                        <div className="space-y-6">
                            <button onClick={addEducation} className="w-full py-4 border-2 border-dashed border-white/10 rounded-3xl text-cyan-400 font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">+ Add Milestone</button>
                            {educationData.map((item, idx) => (
                                <div key={item.id} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 relative group italic">
                                    <button onClick={() => setEducationData(educationData.filter(ed => ed.id !== item.id))} className="absolute top-8 right-8 text-red-500 opacity-0 group-hover:opacity-100 transition-all">✕</button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Title" val={item.title} set={v => updateEducation(item.id, 'title', v)} />
                                        <Input label="Institution" val={item.institution} set={v => updateEducation(item.id, 'institution', v)} />
                                        <Input label="Period" val={item.period} set={v => updateEducation(item.id, 'period', v)} />
                                        <Input label="Score" val={item.score} set={v => updateEducation(item.id, 'score', v)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
          </div>
        </div>

        {/* --- SUCCESS NOTIFICATION --- */}
        {showSuccess && (
          <div className="fixed bottom-12 right-12 bg-emerald-500 text-black px-10 py-5 rounded-[2rem] font-black tracking-widest uppercase text-xs shadow-2xl z-[9999] animate-bounce italic">
            ✨ Sync Successful
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const Input = ({ label, val, set, type="text" }) => (
  <div className="w-full">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block italic">{label}</label>
    <input type={type} value={val || ''} onChange={e => set(e.target.value)} className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500 transition-all italic font-medium" />
  </div>
);

export default AdminSettings;