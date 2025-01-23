import "./FlashCardList.css"
import AddFlashSet from "./AddFlashSet"
import FlashCardSet from "./FlashCardSet";

// Web page portion to hold Flashcards
function FlashCardList({ question, answer }) {

    return (
        <div className="container FlashCardList">
            <div className="flashTitle">
                <h2>Flashcard Sets</h2>
            </div>
            <div className="allFlashSets">
                <div>
                    <FlashCardSet question={question} answer={answer} />
                </div>

                <div className="newFlashSetCard">
                    <AddFlashSet />
                </div>
            </div>
        </div>
    );
}

export default FlashCardList;