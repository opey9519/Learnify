import "./Header.css"

function Header() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="home">
                    <a href="">Learnify</a>
                </div>
                <div className="tags_container">
                    <a className="tag" href="">My Flashcards</a>
                    <a className="tag" href="">AI Assistance</a>
                </div>
            </div>
        </nav>
    );
}

export default Header;