import "./CreateFlashcardSet.css"
import AuthContext from "../AuthContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateFlashcardSet() {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [flashcardSetName, setFlashcardSetName] = useState("")
    console.log(flashcardSetName)

    const handleCreateFlashcardSet = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/createflashcardset', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: flashcardSetName
                })
            })

            if (response.ok) {
                console.log("Successfully Created flashcard set!")
                navigate('/')
            }
        } catch (error) {
            console.log("Failed to create flashcard set:", error)
        }
    }


    
    
    return (
        <div className="container CreateFlashcardSet">
            {
                user ? 
                (<>
                    <div className="createSet">
                        <label id="setNameLabel" htmlFor="">Set Name</label>
                        <input id="setName" type="text" onChange={(e) => setFlashcardSetName(e.target.value)} />
                        <button className="createFlashcardSetButton" onClick={handleCreateFlashcardSet}>Create</button>
                    </div>
                </>)
                :
                (<>
                    <div className="">

                    </div>
                </>)
            }
        </div>
    );
}

export default CreateFlashcardSet;