import Header from "../components/Header";
import WelcomeHome from "../components/WelcomeHome";
import Footer from "../components/Footer";
import FlashCardList from "../components/FlashCardList";

function Home() {
    return (
        <div>
            <Header />
            <WelcomeHome />
            <FlashCardList />
            <Footer />
        </div>
    );
}

export default Home;