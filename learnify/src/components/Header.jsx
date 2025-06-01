import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import "./Header.css"
import AuthContext from "../AuthContext";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const {user, logout} = useContext(AuthContext)

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
                    <Link id="home" className="tag" to="/">Learnify</Link>
                </div>
                <div className="tagsContainer navbarContainer">
                    <div className={`nav-links ${isOpen ? "show" : ""}`}>
                        {user ?
                            <button className="logout hide" onClick={logout}>Log out</button>
                            :
                            <Link className="tag hide" to="/login">Log in</Link>
                        }

                        <Link className="tag hide" to="#">My Flashcards</Link>
                        <Link className="tag hide" to="#">AI Assistance</Link>
                    </div>

                    <button onClick={toggleNavbar} id="dropdown" className="navbarToggler" type="button">
                        <span className="navbar-toggler-icon" id="dropdownIcon"></span>

                        {/* <span id="dropdownIcon">≡</span> */}

                    </button>

                </div>

            </div>
            {isOpen ?
                <div className="dropdownContainer">
                    {user ? <></> : <Link className="tag" to="/login">Log in</Link>}
                    <Link className="tag" to="#">My Flashcards</Link>
                    <Link className="tag" to="#">AI Assistance</Link>
                </div>
                : <></>
            }
            {/* {isSmallScreen ? setIsOpen(!isOpen) : setIsOpen(isOpen)} */}
        </nav>
    );
}

export default Header;