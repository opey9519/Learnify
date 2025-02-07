import { useState } from "react";
import "./Header.css"

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav id="nav" className="navbar">
            <div className="container">
                <div>
                    <a id="home" className="tag" href="/">Learnify</a>
                </div>
                <div className="tagsContainer navbarContainer">
                    <div className={`nav-links ${isOpen ? "show" : ""}`}>
                        <a className="tag hide" href="">My Flashcards</a>
                        <a className="tag hide" href="">AI Assistance</a>
                    </div>

                    <button onClick={toggleNavbar} id="dropdown" className="navbarToggler" type="button">
                        <span className="navbar-toggler-icon" id="dropdownIcon"></span>
                        
                        {/* <span id="dropdownIcon">≡</span> */}
                        
                    </button>
                    
                </div>
                
            </div>
            {isOpen ? <a className="tag" href="">My Flashcards</a> : <></>}
            {isOpen ? <a className="tag" href="">AI Assistance</a> : <></>}
        </nav>
    );
}

export default Header;