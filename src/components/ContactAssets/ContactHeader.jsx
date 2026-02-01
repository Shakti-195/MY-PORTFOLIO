import { motion } from 'framer-motion';

function ContactHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6 mb-12"
    >
      <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-[0.85]">
        Let's <span className="text-indigo-500">Talk.</span>
      </h2>
      <p className="text-slate-400 text-lg md:text-xl font-medium italic leading-relaxed max-w-md">
        Have a project in mind or just want to say hi? Drop a message or find me on my socials.
      </p>
    </motion.div>
  );
}

export default ContactHeader;