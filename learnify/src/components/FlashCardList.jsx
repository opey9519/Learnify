import "./FlashCardList.css"
import AuthContext from "../AuthContext"
import AddFlashSet from "./AddFlashSet"
import FlashCardSet from "./FlashCardSet";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Web page portion to hold Flashcards
function FlashCardList({ question, answer }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="container FlashCardList">
                <h1>Log in to see your flashcards</h1>
                <div className="LogInContainer">
                    <Link className="LogIn" to="/login">Log in</Link>
                </div>

            </div>
        )
    }

    return (
        <div className="container FlashCardList">
            <div className="flashTitle">
                <h2>Flashcard Sets</h2>
            </div>
            <div className="allFlashSets">
                <div>
                    <FlashCardSet question={question} answer={answer} />
                </div>

                {/* <div className="newFlashSetCard">
                    <AddFlashSet />
                </div> */}
            </div>
        </div>
    );
}

export default FlashCardList;