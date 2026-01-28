import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import Hero from '../components/HomeAssets/Hero';
import TechStack from '../components/HomeAssets/TechStack';
import EducationalJourney from '../components/HomeAssets/EducationalJourney';

function Home() {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Connect to the 'portfolioData' node we created in AdminSettings
    const portfolioRef = ref(db, 'portfolioData');
    
    // This function runs automatically whenever you save in AdminSettings
    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPortfolioData(data);
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="home-page">
      {/* We pass the cloud data as 'props' to your sections */}
      <Hero 
        data={portfolioData?.profileData} 
        profilePic={portfolioData?.profilePic} 
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