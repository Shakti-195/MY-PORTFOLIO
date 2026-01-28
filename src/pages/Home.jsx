import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
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
    <div className="home-page">
      <Hero 
        data={portfolioData?.profileData} 
        profilePic={portfolioData?.profilePic} 
        resumePdf={portfolioData?.resumePdf} // Added this to enable cloud resume downloads
      />
      <TechStack 
        stack={portfolioData?.profileData?.techStack} 
        learning={portfolioData?.profileData?.currentlyLearning} 
      />
      <EducationalJourney 
        education={portfolioData?.educationData} 
      />
    </div>
  );
}

export default Home;