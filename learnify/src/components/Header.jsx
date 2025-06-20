import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import "./Header.css"
import AuthContext from "../AuthContext";
import { jwtDecode } from "jwt-decode";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const {user, logout} = useContext(AuthContext)
    const navigate = useNavigate()

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

    const handleLogout = async (e) => {
        e.preventDefault();
      
        try {
          const token = localStorage.getItem("token");

          const refresh_token = localStorage.getItem("token");
          const refreshJti = jwtDecode(refresh_token).jti
        //   console.log(token)
      
          const response = await fetch("http://127.0.0.1:5000/signout", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({refresh_jti: refreshJti})
          });
      
          if (response.ok) {
            logout();
            console.log(response.data)
            navigate('/') // Upon logging out, rerender to home
          } else {
            const data = await response.json();
            console.error("Logout failed:", data);
          }
        } catch (error) {
          console.log("Logout failed:", error);
        }
      };
    //   console.log(user)
      

    return (
        <nav id="nav" className="navbar">
            <div className="container">
                <div>
                    {/* <Link id="home" className="tag" to="/">Learnify</Link> */}
                    <a id="home" className="tag" href="/">Learnify</a>
                </div>
                <div className="tagsContainer navbarContainer">
                    <div className={`nav-links ${isOpen ? "show" : ""}`}>
                        {user ?
                            <button className="logout hide" onClick={handleLogout}>Log out</button>
                            :
                            <Link className="tag hide" to="/login">Log in</Link>
                        }

                        {/* <Link className="tag hide" to="#">My Flashcards</Link> */}
                        {/* <Link className="tag hide" to="#">AI Assistance</Link> */}
                    </div>

                    <button onClick={toggleNavbar} id="dropdown" className="navbarToggler" type="button">
                        <span className="navbar-toggler-icon" id="dropdownIcon"></span>

                        {/* <span id="dropdownIcon">≡</span> */}

                    </button>

                </div>

            </div>
            {isOpen ?
                <div className="dropdownContainer">
                    {
                      user ? 
                      (<button className="logout" onClick={handleLogout}>Log out</button>)
                      : 
                      (<Link className="tag" to="/login">Log in</Link>)
                    }
                    {/* <Link className="tag" to="#">My Flashcards</Link> */}
                    {/* <Link className="tag" to="#">AI Assistance</Link> */}
                </div>
                : <></>
            }
            {/* {isSmallScreen ? setIsOpen(!isOpen) : setIsOpen(isOpen)} */}
        </nav>
    );
}

export default Header;