import ContactHeader from '../components/ContactAssets/ContactHeader';
import SocialConnect from '../components/ContactAssets/SocialConnect';
import ContactForm from '../components/ContactAssets/ContactForm';

function Contact() {
  return (
    <section id="contact" className="relative w-full min-h-screen py-24 flex items-center justify-center bg-[#020617]">
      <div className="max-w-[1450px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <ContactHeader />
            <SocialConnect />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;