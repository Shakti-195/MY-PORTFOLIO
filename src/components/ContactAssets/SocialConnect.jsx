import { motion } from 'framer-motion';

function SocialConnect() {
  const socials = [
    { 
      name: 'GitHub', 
      icon: 'fa-github', 
      link: 'https://github.com/Shakti-195', 
      color: 'hover:text-white hover:border-white/40' 
    },
    { 
      name: 'LinkedIn', 
      icon: 'fa-linkedin-in', 
      link: 'https://www.linkedin.com/in/shakti-singh-b9b6ba2a6/', 
      color: 'hover:text-cyan-400 hover:border-cyan-400/40' 
    },
    { 
      name: 'Twitter', 
      icon: 'fa-x-twitter', 
      link: 'https://x.com/Shakti_Singh195', 
      color: 'hover:text-blue-400 hover:border-blue-400/40' 
    },
    { 
      name: 'Instagram', 
      icon: 'fa-instagram', 
      link: 'https://www.instagram.com/er.shaktisingh_195?utm_source=qr', // ← Updated Link
      color: 'hover:text-pink-500 hover:border-pink-500/40' 
    },
    { 
  name: 'Facebook', 
  icon: 'fa-facebook-f', 
  link: 'https://www.facebook.com/people/Shakti-Singh/pfbid032L9wjQoZaKWoWcmM4hDjKTGfKhLint2di8pkMPtFu3tuMxSnRLTPwQwPzcctKWc5l/', 
  color: 'hover:text-blue-600 hover:border-blue-600/40' 
},
    { 
  name: 'Email', 
  icon: 'fa-envelope', 
  link: 'mailto:thakurshaktisingh195@gmail.com', // ← Updated with your official mail
  color: 'hover:text-indigo-400 hover:border-indigo-400/40' 
}
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {socials.map((social, i) => (
        <motion.a
          key={i}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.03)' }}
          className={`group p-8 bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 ${social.color}`}
        >
          <i className={`fab ${social.icon} text-3xl transition-transform group-hover:scale-110`}></i>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-inherit transition-colors">
            {social.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

export default SocialConnect;