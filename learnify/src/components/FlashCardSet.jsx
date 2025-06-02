import "./FlashCardSet.css"
import FlashCardUserCards from "./FlashCardUserCards"
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchFlashcards } from "../api";
import AuthContext from "../AuthContext"

// Displays Individual Flashcard Sets
function FlashCardSet() {
    const {user} = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login" />;
    }

    // State to dynamically display flashcard sets from backend
    const [flashcardSets, setFlashcardSets] = useState([])
    useEffect(() => { // Async function to deal with awaiting flashcard data from backend API
        async function loadData() {
            const data = await fetchFlashcards(); // waiting for fetchflashcards to pull backend data
            console.log(data)
            // setFlashcardSets(Array.isArray(data) ? data : [data]); // Check if data is array, if not wrap data in array for mapping
        }
        loadData();
    }, [])


    const navigate = useNavigate();
    const handleClick = (setObj) => { // On click, navigate inside flashcard set with data passed through state object
        navigate("/flashcard-set", { state: { flashcardSet: setObj } });
    }

    
    return (
        <div className="container Set">
            {/* If flashcard set(s) exist, generate from backend data */}
            {flashcardSets.length > 0 ? (
                flashcardSets.map((setObj, index) => ( // Create new array of divs looping over backend data
                    <div onClick={() => handleClick(setObj)} key={index} className="FlashCardSet">
                        <h3>{setObj.set_info.set_title || "Untitled Set"}</h3> {/* Data from API */}
                        <FlashCardUserCards user={setObj.set_info.user} numCards={setObj.set_info.num_cards} /> {/* Component to show user & num_cards */}
                    </div>
                ))
            ) : (
                <p>Loading Flashcards...</p> // If no data...
            )
            }
        </div>
    );
}

export default FlashCardSet;