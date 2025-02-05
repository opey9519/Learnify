import "./FlashCardQA.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function FlashCardQA() {
    const { state } = useLocation();
    const flashcardSet = state?.flashcardSet;

    // If flashcard set data is not found - display message
    if (!flashcardSet || !flashcardSet.set_info || !flashcardSet.set_info.cards?.length) {
        return <p>No FlashCards Found!</p>;
    }

    const num_cards = flashcardSet.set_info.cards.length;
    
    // Ensure flashcardIndex is properly initialized
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false); // Reset flip state when changing cards
        if (flashcardIndex < num_cards - 1) {
            setFlashcardIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        setIsFlipped(false); // Reset flip state when changing cards
        if (flashcardIndex > 0) {
            setFlashcardIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <div className="container FlashCardQA">
            <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
                <div className="front">{flashcardSet.set_info.cards[flashcardIndex]?.question}</div>
                <div className="back">{flashcardSet.set_info.cards[flashcardIndex]?.answer}</div>
            </div>

            <div className="controls">
                <button onClick={handlePrev} disabled={flashcardIndex === 0}>←</button>
                <span>{flashcardIndex + 1} / {num_cards}</span>
                <button onClick={handleNext} disabled={flashcardIndex === num_cards - 1}>→</button>
            </div>
        </div>
    );
}

export default FlashCardQA;
