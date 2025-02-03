import "./FlashCardQA.css"
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Display FlashCard Question & Answer
function FlashCardQA() {
    // Retrieve passed data
    const { state } = useLocation();
    const flashcardSet = state.flashcardSet;

    if (!flashcardSet) {
        return <p>No FlashCards Found!</p>
    }

    // Handle Flipping of flashcards
    const [isFlipped, setIsFlipped] = useState(false)
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className="container FlashCardQA">
            <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
                <div className="front">{flashcardSet.set_info.cards[0].question}</div>
                <div className="back">{flashcardSet.set_info.cards[0].answer}</div>
            </div>

            <div className="controls">
                <button>Next</button>
                <button>Prev</button>
            </div>
        </div>
    )
}

export default FlashCardQA;