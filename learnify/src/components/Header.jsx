import { useState, useEffect } from "react";
import "./Header.css"

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    let logged_in = false;

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

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
                        {logged_in ? <></> : <a className="tag hide" href="#">Log in</a>}
                        <a className="tag hide" href="">My Flashcards</a>
                        <a className="tag hide" href="">AI Assistance</a>
                    </div>

                    <button onClick={toggleNavbar} id="dropdown" className="navbarToggler" type="button">
                        <span className="navbar-toggler-icon" id="dropdownIcon"></span>

                        {/* <span id="dropdownIcon">≡</span> */}

                    </button>

                </div>

            </div>
            {isOpen ?
                <div className="dropdownContainer">
                    {logged_in ? <></> : <a className="tag" href="#">Log in</a>}
                    <a className="tag" href="#">My Flashcards</a>
                    <a className="tag" href="#">AI Assistance</a>
                </div>
                : <></>
            }
            {/* {isSmallScreen ? setIsOpen(!isOpen) : setIsOpen(isOpen)} */}
        </nav>
    );
}

export default Header;