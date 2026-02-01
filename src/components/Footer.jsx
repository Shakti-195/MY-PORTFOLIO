import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { ref, onValue } from "firebase/database";

function Footer() {
  const [profile, setProfile] = useState({
    name: 'SHAKTI SINGH',
    contactNumbers: [],
    socialLinks: []
  });

  useEffect(() => {
    const rootRef = ref(db, 'portfolioData/profileData');
    const unsubscribe = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setProfile(data);
    });
    return () => unsubscribe();
  }, []);

  // Filter for Email and Primary Number
  const emailLink = profile.socialLinks?.find(s => s.name?.toLowerCase().includes('email'))?.url;
  // Sirf pehla number dikhayenge footer mein taaki clean rahe
  const primaryContact = profile.contactNumbers?.[0]; 

  return (
    <footer className="py-16 border-t border-white/5 bg-[#020617] text-center relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
            Available for new opportunities
          </p>
          <h2 className="text-white/20 text-4xl md:text-6xl font-black uppercase tracking-tighter select-none">
            Get In Touch
          </h2>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          {/* Email Link */}
          <a 
            href={emailLink ? (emailLink.includes('mailto:') ? emailLink : `mailto:${emailLink}`) : 'mailto:thakurshaktisingh195@gmail.com'} 
            className="text-xl md:text-3xl font-black italic text-white hover:text-indigo-400 transition-all duration-500 uppercase tracking-tighter decoration-indigo-500/30 underline underline-offset-8"
          >
            {emailLink || 'thakurshaktisingh195@gmail.com'}
          </a>

          {/* Primary Phone Number Only */}
          {primaryContact && (
            <a 
              href={primaryContact.label?.toLowerCase().includes('whatsapp') 
                ? `https://wa.me/${primaryContact.number.replace(/\D/g,'')}` 
                : `tel:${primaryContact.number}`} 
              className="group flex items-center gap-3 text-lg md:text-xl font-bold italic text-slate-400 hover:text-emerald-400 transition-all duration-300 tracking-tight"
            >
              <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:border-emerald-500/50 transition-colors uppercase not-italic font-black text-slate-500">
                {primaryContact.label}
              </span>
              {primaryContact.number}
            </a>
          )}
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            &copy; {new Date().getFullYear()} {profile.name}
          </div>
          
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700">
            Handcrafted with <span className="text-red-500/50">❤️</span> using React & Firebase
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;