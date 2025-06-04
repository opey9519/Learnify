import "./FlashCardQA.css"
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CreateFlashcard from "./CreateFlashcard";
// import GenerateFlashcard From "./GenerateFlashcard";

// Display FlashCard Question & Answer
function FlashCardQA() {
    // Retrieve passed data
    const { state } = useLocation(); // Destructure state from location 
    const flashcardSet = state.flashcardSet;
    const [numCards, setNumCards] = useState(flashcardSet.cards.length)
    const [flashcards, setFlashcards] = useState(flashcardSet.cards)
    const token = localStorage.getItem("token");
    // console.log(flashcardSet)
    useEffect(() => {
        const fetchFlashcards = async () => {
            const response = await fetch(`http://127.0.0.1:5000/createflashcard/${flashcardSet.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const newData = await response.json()
            console.log(newData)
            setNumCards(newData);
        };
    }, [])
    
    // const num_cards = flashcardSet.cards.length; // Keep track of total cards
    const [flashcardIndex, setFlashcardIndex] = useState(0); // Setting flashcard index to 0
    // console.log(flashcardIndex)
    const [isFlipped, setIsFlipped] = useState(false)

    // Creating/Generating flashcards
    const [isCreateFlashcard, setIsCreateFlashcard] = useState(false)
    const [isGenerateFlashcard, setIsGenerateFlashcard] = useState(false)
    const [userQuestion, setUserQuestion] = useState("")
    const [userAnswer, setUserAnswer] = useState("")
    const [userPrompt, setUserPrompt] = useState("")

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

    const handleCreateFlashcard = async () => {
        try {
            const data = {
                question: userQuestion,
                answer: userAnswer,
                set_id: flashcardSet.id
            }

            const response = await fetch("http://127.0.0.1:5000/createflashcard", {
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
            }
        } catch (error) {
            console.log("Failed to create flashcard:", error);
        }
    }

    const handleDeleteFlashcard = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/deleteflashcard/${flashcards[flashcardIndex].id}`, {
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
            }
        } catch (error) {
            console.log("Failed to delete flashcard", error)
        }
    }

    const handleFetchFlashcards = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/getflashcardset/${flashcardSet.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            setFlashcards(data.cards)
        } catch (error) {
            console.log("Failed to get flashcards", error)
        }
    }

    // Reveal/Hide create flashcard
    const handleGenerateClick = () => {
        setIsGenerateFlashcard(!isGenerateFlashcard)
    }

    return (
        <div className="container FlashCardQA">
            {flashcards.length > 0 ? (
                <>
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
                        <button onClick={handleDeleteFlashcard}>Delete</button>
                        {/* <button onAbort={handleCreateFlashcard}>Create</button> */}
                    </div>
                    
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
                </div>
            )}
        </div>
    );    
}

export default FlashCardQA;