import Header from "../components/Header";
import WelcomeHome from "../components/WelcomeHome";
import Footer from "../components/Footer";
import FlashCardList from "../components/FlashCardList";

const tempFlashCard = {
    question: "What Animal lives in Africa?",
    answer: "Giraffe"
}

function Home() {
    return (
        <div>
            <Header />
            <WelcomeHome />
            <FlashCardList question={tempFlashCard.question} answer={tempFlashCard.answer} />
            <Footer />
        </div>
    );
}

export default Home;