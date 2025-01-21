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
      <Footer />
      <FlashCardList question={tempFlashCard.question} answer={tempFlashCard.answer}/>
    </div>
  )
}

export default App
