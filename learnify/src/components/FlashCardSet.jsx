import "./FlashCardSet.css"
import FlashCardUserCards from "./FlashCardUserCards"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFlashcards } from "../api";

// Displays Individual Flashcard Sets
function FlashCardSet() {
    // State to dynamically display flashcard sets from backend
    const [flashcardSets, setFlashcardSets] = useState([])
    // Async function to deal with awaiting flashcard data from backend API
    useEffect(() => {
        async function loadData() {
            const data = await fetchFlashcards();
            console.log(data)
            setFlashcardSets(Array.isArray(data) ? data : [data]);
        }
        loadData();
    }, [])

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/flashcard-set")
    }

    return (
        <div className="container Set">
            {flashcardSets.length >= 0 ? (
                flashcardSets.map((setObj, index) => (
                    <div onClick={handleClick} key={index} className="FlashCardSet">
                        <h3>{setObj.set_info.set_title}</h3> {/* Data from API */}
                        <FlashCardUserCards user={setObj.set_info.user} numCards={setObj.set_info.num_cards} />
                    </div>
                ))
            ) : (
                <p>Loading Flashcards...</p>
            )
            }
        </div>
    );
}

export default FlashCardSet;