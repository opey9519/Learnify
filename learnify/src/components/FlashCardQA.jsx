import "./FlashCardQA.css"
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Display FlashCard Question & Answer
function FlashCardQA() {
    // Retrieve passed data
    const { state } = useLocation(); // Destructure state from location 
    const flashcardSet = state.flashcardSet;
    // console.log(flashcardSet)


    // If flashcard set data is not found - display message
    if (!flashcardSet) {
        return <p>No FlashCards Found!</p>
    }


    const num_cards = flashcardSet.cards.length; // Keep track of total cards
    const [flashcardIndex, setFlashcardIndex] = useState(0); // Setting flashcard index to 0
    const [isFlipped, setIsFlipped] = useState(false)

    // Handle Flipping of flashcards
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    // Next card
    const handleNext = () => {
        setIsFlipped(false)
        if (flashcardIndex < num_cards - 1) {
            setFlashcardIndex(prevIndex => prevIndex + 1)
        }
    }

    // Prev card
    const handleprev = () => {
        setIsFlipped(false)
        if (flashcardIndex > 0) {
            setFlashcardIndex(prevIndex => prevIndex - 1)
        }
    }

    return (
        <div className="container FlashCardQA">
            {/* Flashcard flipped - Apply necesssary styles */}
            <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
                {/* Need to find a way to not hardcode the index */}
                <div className="front">{flashcardSet.cards[flashcardIndex].question}</div>
                <div className="back">{flashcardSet.cards[flashcardIndex].answer}</div>
            </div>

            {/* Controls should navigate from one flashcard to another*/}
            <div className="controls">
                <button onClick={handleprev} disabled={flashcardIndex === 0}>←</button>
                <span>{flashcardIndex + 1} / {num_cards}</span>
                <button onClick={handleNext} disabled={flashcardIndex === num_cards - 1}>→</button>
            </div>
        </div>
    )
}

export default FlashCardQA;