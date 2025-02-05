import "./FlashCardQA.css"
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Display FlashCard Question & Answer
function FlashCardQA() {
    // Retrieve passed data
    const { state } = useLocation(); // Destructure state from location 
    const flashcardSet = state.flashcardSet;

    // If flashcard set data is not found - display message
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
            {/* Flashcard flipped - Apply necesssary styles */}
            <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
                {/* Need to find a way to not hardcode the index */}
                <div className="front">{flashcardSet.set_info.cards[0].question}</div>
                <div className="back">{flashcardSet.set_info.cards[0].answer}</div>
            </div>

            {/* Controls should navigate from one flashcard to another*/}
            <div className="controls">
                <button>←</button>
                <button>→</button>
            </div>
        </div>
    )
}

export default FlashCardQA;