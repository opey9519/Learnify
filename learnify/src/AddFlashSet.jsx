import { useState } from "react";
import "./AddFlashSet.css"

function AddFlashSet() {
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
                    <p>new</p>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default AddFlashSet;