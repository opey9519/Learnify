import "./Header.css"

function Header() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="home">
                    <a className="tag" href="">Learnify</a>
                </div>
                <div className="tagsContainer">
                    <a className="tag" href="">My Flashcards</a>
                    <a className="tag" href="">AI Assistance</a>
                    <button id="dropdown" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span id="dropdownIcon" className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;