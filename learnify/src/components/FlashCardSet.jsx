import "./FlashCardSet.css"
import FlashCardUserCards from "./FlashCardUserCards"
import { useEffect, useState } from "react";
import { fetchFlashcards } from "../api";

// Displays Individual Flashcard Sets
function FlashCardSet() {
    const [flashcardSets, setFlashcardSets] = useState([])

    useEffect(() => {
        async function loadData() {
            const data = await fetchFlashcards();
            console.log(data)
            setFlashcardSets(Array.isArray(data) ? data : [data]);
        }
        loadData();
    }, [])



    return (
        <div className="container Set">
            {flashcardSets.length >= 0 ? (
                flashcardSets.map((setObj, index) => (
                    <div key={index} className="FlashCardSet">
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