import React, { useState } from 'react';
import "./EditToggle.css";

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdownBox">
            <button id='dropbutton' onClick={handleToggle}>
                ...
            </button>
            {isOpen && (
                <ul className="menu">
                    {/* <li>Bak=</li> */}
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;