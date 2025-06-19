import "./FlashCardSet.css"
import FlashCardUserCards from "./FlashCardUserCards"
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchFlashcards } from "../api";
import AuthContext from "../AuthContext"
import EditToggle from "./EditToggle"

// Displays Individual Flashcard Sets
function FlashCardSet() {
    const {user} = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login" />;
    }

    // State to dynamically display flashcard sets from backend
    const [flashcardSets, setFlashcardSets] = useState([])
    const refreshFlashcards = async () => {
        const data = await fetchFlashcards()
        setFlashcardSets(data)
    }
    useEffect(() => { // Async function to deal with awaiting flashcard data from backend API
        refreshFlashcards()
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
                <div className="FlashCardSet">
                    <div className="titleContent">
                        <div className="titleContent">
                            <h3>{setObj.title || "Untitled Set"}</h3> {/* Data from API */}  
                        </div>
                        <EditToggle set_id = {setObj} refreshFlashcards = {refreshFlashcards}/>
                    </div>
                    
                    <div key={index} className="navToSet">
                        {/* <div className="titleContent">
                            <h3>{setObj.title || "Untitled Set"}</h3> 
                        </div> */}
                        
                        
                        <FlashCardUserCards set_id={setObj} user={user.username} numCards={setObj.cards.length} /> {/* Component to show user & num_cards */}
                        <button onClick={() => handleClick(setObj)} id="navToSet">→</button>
                        
        
                    </div>
                </div>
                ))
            ) : (
                <div></div>
            )
            }
        </div>
    );
}

export default FlashCardSet;