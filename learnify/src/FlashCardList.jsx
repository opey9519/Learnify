import "./FlashCardList.css"
import FlashCard from "./FlashCard";
import { useState } from "react";

// Web page portion to hold Flashcards
function FlashCardList({ question, answer }) {
    const [flashSetClicked, setFlashSetClicked] = useState(false);
    function clicked() {
        setFlashSetClicked(!flashSetClicked);
    };

    const tempData = {
        flashcard: "Animals",
        numCards: 2,
    }

    return (
        <div id="" className="container FlashCardList">
            <h2>Flashcards</h2>

            <div onClick={clicked} className="FlashSet">
                {/* Calling flashcard */}
                <h3>{tempData.flashcard}</h3>
                {flashSetClicked ? <FlashCard question={question} answer={answer} /> : <></>}
                <div className="numCards">
                    <img id="flashCardImg" src="/images/flashcard1.png" alt="Image of Flashcard" />
                    <p>{tempData.numCards}</p>
                </div>

            </div>
        </div>
    );
}

export default FlashCardList;