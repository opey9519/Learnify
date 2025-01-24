import "./FlashCardSet.css"
import FlashCardUserCards from "./FlashCardUserCards"
import { useState } from "react";

// Displays Individual Flashcard Sets
function FlashCardSet() {
    const tempData = {
        flashcard: "Animals",
        user: "Gavin",
        numCards: 2,
    }

    // Control flashset clicked (Go into flashset)
    const [flashSetClicked, setFlashSetClicked] = useState(false);
    function clicked() {
        setFlashSetClicked(!flashSetClicked);
    };

    return (
        <div className="container Set">
            <div onClick={clicked} className="FlashCardSet">
                {/* Flash Card title (database) */}
                <div>
                    <h3>{tempData.flashcard}</h3>
                </div>

                <div>
                    <FlashCardUserCards user={tempData.user} numCards={tempData.numCards} />
                </div>
            </div>
        </div>
    );
}

export default FlashCardSet;