import { useState } from "react";
import "./AddFlashSet.css"
import FlashCard from "./FlashCard";

function AddFlashSet({question, answer}) {
     // Add new flashset
     const [addSet, setAddSet] = useState(false);
     function newFlashSet() {
         setAddSet(!addSet);
     };

    return(
        <div className="AddFlashSet">
            <button onClick={newFlashSet} id="addButton">+</button>
            {
                addSet ? 
                <div className="newFlashSet">
                    <FlashCard question={question} answer={answer}/>
                </div>
                :
                <></>
                
            }
        </div>
    );
}

export default AddFlashSet;