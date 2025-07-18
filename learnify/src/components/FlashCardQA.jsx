import "./FlashCardQA.css"
import { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import CreateFlashcard from "./CreateFlashcard";
import { fetchFlashcards } from "../api";
import AuthContext from "../AuthContext";
// import GenerateFlashcard From "./GenerateFlashcard";

// Display FlashCard Question & Answer
function FlashCardQA() {
    // Retrieve passed data
    const { state } = useLocation(); // Destructure state from location 
    const flashcardSet = state.flashcardSet; 
    const [numCards, setNumCards] = useState(flashcardSet.cards.length)
    const [flashcards, setFlashcards] = useState(flashcardSet.cards) // flashcards updated upon requests
    const token = localStorage.getItem("token");
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    

    // console.log(flashcards)
    console.log(numCards)

    useEffect(() => {
        fetchFlashcards()
        console.log("new action")
        if (!user) {
            navigate('/')
        }
    }, [])
    
    const [flashcardIndex, setFlashcardIndex] = useState(0); // Setting flashcard index to 0
    const [isFlipped, setIsFlipped] = useState(false)

    // Creating/Generating flashcards
    const [isCreateFlashcard, setIsCreateFlashcard] = useState(false) // Toggle create flashcard window
    const [isGenerateFlashcard, setIsGenerateFlashcard] = useState(false) // Toggle generate flashcard window
    const [userQuestion, setUserQuestion] = useState("") // Question input textbox
    const [userAnswer, setUserAnswer] = useState("") // Answer input textbox
    const [userPrompt, setUserPrompt] = useState("") // Prompt input textbox
    const [userEdit, setUserEdit] = useState(false)
    const [promptNumCards, setPromptNumCards] = useState(0) // # of Cards input textbox

    // Handle Flipping of flashcards
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    // Next card
    const handleNext = () => {
        setIsFlipped(false)
        if (flashcardIndex < numCards - 1) {
            setFlashcardIndex(prevIndex => prevIndex + 1)
        }
    }

    // Prev card
    const handleprev = () => {
        setIsFlipped(false)
        if (flashcardIndex > 0) {
            setFlashcardIndex(prevIndex => prevIndex - 1)
        }
    }

    // Reveal/Hide create flashcard 
    const handleCreateClick = () => {
        setIsCreateFlashcard(!isCreateFlashcard)
    }

    const handleEditClick = () => {
        const card = flashcards[flashcardIndex]
        setUserQuestion(card.question)
        setUserAnswer(card.answer)
        setUserEdit(!userEdit)
    }

    // Calls Create Flashcard API
    const handleCreateFlashcard = async () => {
        try {
            const data = {
                question: userQuestion,
                answer: userAnswer,
                set_id: flashcardSet.id
            }

            const response = await fetch("https://learnify-backend-vgj2.onrender.com/createflashcard", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Successfully created flashcard");
                handleFetchFlashcards()
                setIsCreateFlashcard()
            }
        } catch (error) {
            console.log("Failed to create flashcard:", error);
        }
    }

    // Calls Delete Flashcard API
    const handleDeleteFlashcard = async () => {
        try {
            const response = await fetch(`https://learnify-backend-vgj2.onrender.com/deleteflashcard/${flashcards[flashcardIndex].id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })

            if (response.ok) {
                console.log("Successfully deleted flashcard")
                // setFlashcardIndex(prevIndex => prevIndex - 1)
                handleFetchFlashcards()
                handleprev()
            }
        } catch (error) {
            console.log("Failed to delete flashcard", error)
        }
    }

    // Calls Get Flashcards API
    const handleFetchFlashcards = async () => {
        try {
            const response = await fetch(`https://learnify-backend-vgj2.onrender.com/getflashcardset/${flashcardSet.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            setFlashcards(data.cards)
            setNumCards(data.cards.length)
        } catch (error) {
            console.log("Failed to get flashcards", error)
        }
    }

    // Calls Edit Flashcard API
    const handleEditFlashcard = async () => {
        try {
            const response = await fetch(`https://learnify-backend-vgj2.onrender.com/${flashcards[flashcardIndex].id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: userQuestion,
                    answer: userAnswer
                })
            })
            if (response.ok) {
                console.log("Successfully edited flashcard")
                handleFetchFlashcards()
                handleEditClick()
            }
        } catch (error) {
            console.log("Failed to edit flashcard", error)
        }
    }

    // Reveal/Hide create flashcard
    const handleGenerateClick = () => {
        setIsGenerateFlashcard(!isGenerateFlashcard)
    }

    // Calls Generate Flashcards API (AI)
    const handleGenerateFlashcards = async () => {
        try {
            const response = await fetch(`https://learnify-backend-vgj2.onrender.com/generateflashcards`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: userPrompt,
                    set_id: flashcardSet.id,
                    num_cards: promptNumCards
                })
            })

            if (response.ok) {
                console.log("Successfully generated flashcards")
                fetchFlashcards()
                navigate('/')
            }
        } catch (error) {
            console.log("Failed to generate flashcards", error)
        }
    }

    return (
        <div className="container FlashCardQA">
            {flashcards.length > 0 ? (
                <>

                    { userEdit ? 
                    (<>
                        <div className="editButtons">
                            <button className="edit createFlashcardsButton" onClick={handleEditClick}>←</button>
                            <button className="edit createFlashcardsButton" onClick={handleEditFlashcard}>Confirm</button>
                            {/* <button className="edit createFlashcardsButton" onClick={handleDeleteFlashcard}>Delete</button> */}
                        </div>
                        <div className="editFlashcardsBox">
                            <div className="questionBox">
                                    <label htmlFor="">Question</label>
                                    <textarea name="question" value={userQuestion} id="" cols="30" rows="2" onChange={(e) => setUserQuestion(e.target.value)}></textarea>
                            </div>
                            <div className="answerBox">
                                <label htmlFor="">Answer</label>
                                <textarea name="answer" value={userAnswer} id="" cols="30" rows="2" onChange={(e) => setUserAnswer(e.target.value)}></textarea>
                            </div>
                        </div>
                    </>)
                    :
                    (<>
                    <div>
                        <button className="edit createFlashcardsButton" onClick={handleCreateClick}>Create</button>
                        <button className="edit createFlashcardsButton" onClick={handleEditClick}>Edit</button>
                        <button className="edit createFlashcardsButton" onClick={handleDeleteFlashcard}>Delete</button>
                    </div>
                    
                        {/* Flashcard flipped - Apply necessary styles */}
                    <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
                        <div className="front">{flashcards[flashcardIndex].question}</div>
                        <div className="back">{flashcards[flashcardIndex].answer}</div>
                    </div>
    
                    {/* Controls to navigate flashcards */}
                    <div className="controls">
                        <button onClick={handleprev} disabled={flashcardIndex === 0}>←</button>
                        <span>{flashcardIndex + 1} / {flashcards.length}</span>
                        <button onClick={handleNext} disabled={flashcardIndex === numCards - 1}>→</button>
                        
                    </div>
                    {isCreateFlashcard ? 
                        (<div id="cardsAlreadyMade" className="createFlashcardsBox">
                            <div className="questionBox">
                                    <label htmlFor="">Question</label>
                                    <textarea name="question" id="" cols="30" rows="2" onChange={(e) => setUserQuestion(e.target.value)}></textarea>
                            </div>
                            <div className="answerBox">
                                <label htmlFor="">Answer</label>
                                <textarea name="answer" id="" cols="30" rows="2" onChange={(e) => setUserAnswer(e.target.value)}></textarea>
                            </div>

                            <div className="buttons">
                                <button className="createFlashcardsButton" id="createFlashcardsExit" onClick={handleCreateClick}>←</button>
                                <button className="createFlashcardsButton" id="createFlashcardExec" onClick={handleCreateFlashcard}>Create</button>
                            </div>
                            

                        </div>)
                        : 
                        (<></>)
                    }
                    </>)
                    
                    }
                    
                </>
            ) : (
                <div className="createFlashcards">
                    <div className="content">
                        <div>No Cards!</div>
                        <div className="FlashcardsBox">
                            <button className="createFlashcardsButton" onClick={handleCreateClick}>Create Flashcards</button>
                            <button className="createFlashcardsButton" onClick={handleGenerateClick}>Generate Flashcards</button>
                        </div>
                    </div>

                    {isCreateFlashcard ? 
                        (<div className="createFlashcardsBox">
                            <div className="questionBox">
                                    <label htmlFor="">Question</label>
                                    <textarea name="question" id="" cols="30" rows="2" onChange={(e) => setUserQuestion(e.target.value)}></textarea>
                            </div>
                            <div className="answerBox">
                                <label htmlFor="">Answer</label>
                                <textarea name="answer" id="" cols="30" rows="2" onChange={(e) => setUserAnswer(e.target.value)}></textarea>
                            </div>

                            <div className="buttons">
                                <button className="createFlashcardsButton" id="createFlashcardsExit" onClick={handleCreateClick}>←</button>
                                <button className="createFlashcardsButton" id="createFlashcardExec" onClick={handleCreateFlashcard}>Create</button>
                            </div>
                            

                        </div>)
                        : 
                        (<></>)
                    }

                    {isGenerateFlashcard ? 
                        (<div className="createFlashcardsBox">
                            <div className="questionBox promptBox">
                                    <label htmlFor="">Prompt</label>
                                    <textarea name="question" id="" cols="30" rows="2" onChange={(e) => setUserPrompt(e.target.value)}></textarea>
                            </div>
                            <div className="answerBox numCardsBox">
                                <label htmlFor="">Number of Cards</label>
                                {/* <textarea name="answer" id="" cols="30" rows="2" onChange={(e) => setUserAnswer(e.target.value)}></textarea> */}
                                <input type="number" max="20" onChange={(e) => setPromptNumCards(e.target.value)} />
                            </div>

                            <div className="buttons">
                                <button className="createFlashcardsButton" id="createFlashcardsExit" onClick={handleGenerateClick}>←</button>
                                <button className="createFlashcardsButton" id="createFlashcardExec" onClick={handleGenerateFlashcards}>Generate</button>
                            </div>
                            

                        </div>)
                        : 
                        (<></>)
                    }
                </div>
            )}
        </div>
    );    
}

export default FlashCardQA;