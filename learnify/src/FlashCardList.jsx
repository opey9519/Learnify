import "./FlashCardList.css"
import FlashCard from "./FlashCard";
import FlashCardUserCards from "./FlashCardUserCards";
import { useState } from "react";

// Web page portion to hold Flashcards
function FlashCardList({ question, answer }) {
    const [flashSetClicked, setFlashSetClicked] = useState(false);
    function clicked() {
        setFlashSetClicked(!flashSetClicked);
    };

    const tempData = {
        flashcard: "Animals",
        user: "Gavin",
        numCards: 2,
    }

    return (
        <div id="" className="container FlashCardList">
            <h2>Flashcards</h2>

            <div onClick={clicked} className="flashSet">
                {/* Calling flashcard */}
                <h3>{tempData.flashcard}</h3>
                {flashSetClicked ? <FlashCard question={question} answer={answer} /> : <></>}
                <FlashCardUserCards user={tempData.user} numCards={tempData.numCards} />
            </div>
        </div>
    );
}

export default FlashCardList;