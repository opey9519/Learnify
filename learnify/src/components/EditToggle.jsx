import "./EditToggle.css";
import React, { useState } from 'react';
import { fetchFlashcards } from "../api";



function EditToggle({set_id}) {
    const token = localStorage.getItem('token')
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [title, setTitle] = useState('');
    
    // Toggle dropwdown to edit and delete
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Request edit flashcard set through API
    const editFlashcardSet = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/editflashcardset/${set_id.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title
                })
            })
            if (response.ok) {
                fetchFlashcards()
                console.log("Successfully edited flashcard set")
            }
        } catch (error) {
            console.log("Failed to edit flashcard set", error)
        }
    }

    // Request delete flashcard set through API
    const deleteFlashcardSet = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/deleteflashcardset/${set_id.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                fetchFlashcards()
                setIsOpen(false)
                console.log("Successfully deleted flashcard set")
            }
        } catch (error) {
            console.log("Failed to delete flashcard set", error)
        }
    }

    const handleEditOpen = () => {
        setIsEditOpen(!isEditOpen)
        setIsOpen(false)
    }

    return (
        <div className="dropdownBox">
            <button id='dropbutton' onClick={handleToggle}>
                ...
            </button>
            {isOpen && (
                <ul className="menu">
                    <li onClick={handleEditOpen}>Edit</li>
                    <li onClick={deleteFlashcardSet}>Delete</li>
                </ul>
            )}

            {isEditOpen && (
                <div className="editBox">
                    <label id="newSetName" htmlFor="">Set Name</label>
                    <input id="newsetNameInput" onChange={(e) => setTitle(e.target.value)} type="text" />
                    <div className="buttons">
                        <button className="button" onClick={handleEditOpen}>Cancel</button>
                        <button className="button" onClick={editFlashcardSet}>Confirm</button>
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default EditToggle;