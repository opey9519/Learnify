import { useState } from "react";
import "./AddFlashSet.css"
import FlashCardSet from "./FlashCardSet";

function AddFlashSet() {
    // Add new flashset
    const [addSet, setAddSet] = useState(false);
    function newFlashSet() {
        setAddSet(!addSet);
    };

    return (
        <div className="AddFlashSet">
            {
                addSet ?
                    <div>
                        <FlashCardSet />
                    </div>
                    :
                    <></>
            }
            <div>
                <button onClick={newFlashSet} id="addButton">+</button>
            </div>

        </div>
    );
}

export default AddFlashSet;