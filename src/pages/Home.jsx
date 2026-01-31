import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import { motion } from 'framer-motion';
import Hero from '../components/HomeAssets/Hero';
import TechStack from '../components/HomeAssets/TechStack';
import EducationalJourney from '../components/HomeAssets/EducationalJourney';

function Home() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const portfolioRef = ref(db, 'portfolioData');
    
    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPortfolioData(data);
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="home-page"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
    >
      <motion.div variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}>
        <Hero 
          data={portfolioData?.profileData} 
          profilePic={portfolioData?.profilePic} 
          resumePdf={portfolioData?.resumePdf} // Added this to enable cloud resume downloads
        />
      </motion.div>
      <motion.div variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}>
        <TechStack 
          stack={portfolioData?.profileData?.techStack} 
          learning={portfolioData?.profileData?.currentlyLearning} 
        />
      </motion.div>
      <motion.div variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}>
        <EducationalJourney 
          education={portfolioData?.educationData} 
        />
      </motion.div>
    </motion.div>
  );
}

export default Home;