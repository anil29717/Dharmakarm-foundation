import HeroSection from '../component/HeroSection';
import CTASection from '../component/CTASection';
import DonateSection from '../component/DonateSection';
import ImageSlider from '../component/ImageSlider';
import CounterSection from '../component/CounterSection';
import VolunteerSection from '../component/VolunteerSection';
import SocialSection from '../component/SocialSection';


function HomePage() {
    return (
        <>
            <HeroSection />
            <CTASection />
            <DonateSection />
            <ImageSlider />
            <CounterSection />
            <VolunteerSection />
            <SocialSection />
        </>
    );
}

export default HomePage;
