import Header from "../components/Header";
import MissionStatement from "../components/MissionStatement";
import ProjectOverview from "../components/ProjectOverView";
import CoreFeatures from "../components/CoreFeatures";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer"

function About() {
    return (
        <div>
            <Header />
            <ProjectOverview />
            <MissionStatement />
            <CoreFeatures />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default About;