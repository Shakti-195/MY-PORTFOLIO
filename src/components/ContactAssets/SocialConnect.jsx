import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase'; 
import { ref, onValue } from "firebase/database";

function SocialConnect() {
  const [socials, setSocials] = useState([]);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const rootRef = ref(db, 'portfolioData/profileData');
    const unsubscribe = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSocials(data.socialLinks ? Object.values(data.socialLinks) : []);
        setNumbers(data.contactNumbers ? Object.values(data.contactNumbers) : []);
      }
    });
    return () => unsubscribe();
  }, []);

  const getBrandDetails = (url, name) => {
    const link = url?.toLowerCase() || "";
    const platform = name?.toLowerCase() || "";

    // GMAIL / EMAIL SPECIAL CASE (Original Colorful Icon)
    if (link.includes('mailto:') || platform.includes('email') || platform.includes('gmail')) {
      return { isEmail: true, color: "group-hover:border-red-500/50", bg: "group-hover:bg-red-500/5", textColor: "group-hover:text-red-400" };
    }

    if (link.includes('github.com')) return { icon: 'fa-github', color: 'group-hover:border-white/50', bg: 'group-hover:bg-white/5', textColor: 'group-hover:text-white' };
    if (link.includes('linkedin.com')) return { icon: 'fa-linkedin-in', color: 'group-hover:border-blue-400/50', bg: 'group-hover:bg-blue-400/5', textColor: 'group-hover:text-blue-400' };
    if (link.includes('instagram.com')) return { icon: 'fa-instagram', color: 'group-hover:border-pink-500/50', bg: 'group-hover:bg-pink-500/5', textColor: 'group-hover:text-pink-500' };
    if (link.includes('twitter.com') || link.includes('x.com')) return { icon: 'fa-x-twitter', color: 'group-hover:border-white/50', bg: 'group-hover:bg-white/5', textColor: 'group-hover:text-white' };
    if (link.includes('facebook.com')) return { icon: 'fa-facebook-f', color: 'group-hover:border-blue-600/50', bg: 'group-hover:bg-blue-600/5', textColor: 'group-hover:text-blue-600' };
    if (link.includes('whatsapp.com') || link.includes('wa.me')) return { icon: 'fa-whatsapp', color: 'group-hover:border-emerald-500/50', bg: 'group-hover:bg-emerald-500/5', textColor: 'group-hover:text-emerald-400' };
    
    return { icon: 'fa-link', color: 'group-hover:border-cyan-400/50', bg: 'group-hover:bg-cyan-400/5', textColor: 'group-hover:text-cyan-400' };
  };

  return (
    <div className="space-y-16">
      {/* SOCIAL LINKS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {socials.map((social, i) => {
          const url = social.url || social.link;
          const brand = getBrandDetails(url, social.name);
          return (
            <motion.a key={i} href={url} target={brand.isEmail ? '_self' : '_blank'}
              className={`group p-8 bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 ${brand.color} ${brand.bg}`}
              whileHover={{ y: -10 }}
            >
              {brand.isEmail ? (
                /* ORIGINAL GMAIL ICON */
                <svg viewBox="0 0 48 48" className="w-12 h-12 transition-transform group-hover:scale-110">
                  <path fill="#4285F4" d="M45 16.2V38c0 2.2-1.8 4-4 4H14.6l-1.8-6.6L10 26.1l4.6-9.9L24 24l9.4-7.8z" />
                  <path fill="#34A853" d="M10 26.1l-6.5 6.7c-2.2-2.2-3.5-5.2-3.5-8.8V10c0-2.2 1.8-4 4-4h6z" />
                  <path fill="#FBBC05" d="M10 26.1V6h28c2.2 0 4 1.8 4 4v6.2l-18 15z" />
                  <path fill="#EA4335" d="M42 16.2V24c0 3.6-1.3 6.6-3.5 8.8l-14.5-16.6z" />
                </svg>
              ) : (
                <i className={`fa-brands ${brand.icon} text-4xl text-slate-500 transition-all ${brand.textColor}`}></i>
              )}
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ${brand.textColor}`}>{social.name}</span>
            </motion.a>
          );
        })}
      </div>

      {/* VOICE CONNECT NUMBERS */}
      <div className="pt-10 border-t border-white/5">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 mb-8 text-center italic">Voice Connect</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {numbers.map((n, i) => {
            const isWA = n.label?.toLowerCase().includes('whatsapp');
            return (
              <motion.a key={i} href={isWA ? `https://wa.me/${n.number.replace(/\D/g,'')}` : `tel:${n.number}`}
                className={`group p-8 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center justify-between transition-all duration-500 ${isWA ? 'hover:border-emerald-500/40 hover:bg-emerald-500/5' : 'hover:border-cyan-500/40 hover:bg-cyan-500/5'}`}
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-col">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isWA ? 'text-emerald-500' : 'text-slate-500 group-hover:text-cyan-400'}`}>{n.label}</span>
                  <span className="text-xl md:text-2xl font-black italic text-white tracking-tighter">{n.number}</span>
                </div>
                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-all ${isWA ? 'group-hover:bg-emerald-500' : 'group-hover:bg-cyan-400'} group-hover:text-black`}>
                  <i className={`${isWA ? 'fa-brands fa-whatsapp text-2xl' : 'fa-solid fa-phone-flip text-lg'}`}></i>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SocialConnect;