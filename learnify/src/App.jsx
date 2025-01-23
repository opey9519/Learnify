import "./App.css"
import Header from "./Header"
import WelcomeHome from "./WelcomeHome"
import Footer from "./Footer"
import FlashCardList from "./FlashCardList"

const tempFlashCard = {
  question: "What Animal lives in Africa?",
  answer: "Giraffe"
}

function App() {
  return (
    <div>
      <Header />
      <WelcomeHome />

      <FlashCardList question={tempFlashCard.question} answer={tempFlashCard.answer} />
      <Footer />
    </div>
  )
}

export default App
