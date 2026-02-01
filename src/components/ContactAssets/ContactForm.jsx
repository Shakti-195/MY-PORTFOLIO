import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactForm() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // --- RE-VERIFIED & UPDATED IDs ---
    const SERVICE_ID = "service_8klsjsl";    // Your Active Service ID
    const TEMPLATE_ID = "template_fhp51j8";   // Your NEW Template ID
    const PUBLIC_KEY = "QwbUX9gWLFmZABxGb";   // Your Public Key

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log("SUCCESS!", result.text);
          setStatus('success');
          form.current.reset(); // Form clears on success
      }, (error) => {
          console.log("FAILED...", error.text);
          setStatus('error');
      })
      .finally(() => {
          setIsSending(false);
          // 5 seconds baad status message hide ho jayega
          setTimeout(() => setStatus(''), 5000);
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white/[0.01] backdrop-blur-[40px] border border-white/10 rounded-[4rem] p-10 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
    >
      <form ref={form} onSubmit={sendEmail} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Name */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-6">Full Name</label>
            <input 
              name="name" // Matches {{name}} in EmailJS template
              type="text" 
              required
              placeholder="Your Name" 
              className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 transition-all outline-none" 
            />
          </div>
          {/* User Email */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-6">Email Address</label>
            <input 
              name="email" // Matches {{email}} in EmailJS template
              type="email" 
              required
              placeholder="your@email.com" 
              className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 transition-all outline-none" 
            />
          </div>
        </div>
        
        {/* Subject */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-6">Subject</label>
          <input 
            name="title" // Matches {{title}} in EmailJS template
            type="text" 
            required
            placeholder="Regarding Project" 
            className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-8 py-5 text-white focus:outline-none focus:border-indigo-500/50 transition-all outline-none" 
          />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-6">Your Message</label>
          <textarea 
            name="message" // Matches {{message}} in EmailJS template
            required
            rows="5" 
            placeholder="Write your message here..." 
            className="w-full bg-white/[0.03] border border-white/5 rounded-[2.5rem] px-8 py-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none outline-none"
          ></textarea>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSending}
          type="submit"
          className={`w-full py-6 font-black uppercase tracking-[0.5em] text-[11px] rounded-[2rem] transition-all shadow-2xl ${
            isSending ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </motion.button>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-center text-emerald-400 text-xs font-bold uppercase tracking-widest mt-4">
            ✨ Message Sent Successfully!
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-center text-rose-400 text-xs font-bold uppercase tracking-widest mt-4">
            ❌ Error: Re-check IDs in Dashboard.
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}

export default ContactForm;