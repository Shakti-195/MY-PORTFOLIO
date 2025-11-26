import Hero from '../components/HomeAssets/Hero';
import TechStack from '../components/HomeAssets/TechStack';
import Academics from '../components/HomeAssets/EducationalJourney';
import EducationalJourney from '../components/HomeAssets/EducationalJourney';

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <TechStack />
      <EducationalJourney />

      {/* Future sections - add one by one */}
      {/* <FeaturedProjects /> */}
      {/* <Statistics /> */}
      {/* <CallToAction /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
