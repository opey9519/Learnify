import Header from "../components/Header";
import MissionStatement from "../components/MissionStatement";
import ProjectOverview from "../components/ProjectOverView";
import CoreFeatures from "../components/CoreFeatures";

function About() {
    return (
        <div>
            <Header />
            <ProjectOverview />
            <MissionStatement />
            <CoreFeatures />
        </div>
    );
}

export default About;