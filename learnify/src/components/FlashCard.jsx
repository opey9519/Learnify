import { useState } from "react";

// Show User's flashcards- Front Question; Back Answer
function FlashCard({question, answer}) {
    const [isFlipped, setIsFlipped] = useState(false);
    
    return (
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="front">{question}</div>
            <div className="back">{answer}</div>
        </div>
    );
}

export default FlashCard;