import "./WelcomeHome.css"
import { Link } from "react-router-dom";

function WelcomeHome() {
    return (
        <div id="root" className="container root">
            <div className="text">
                <h1 id="title">Welcome Home!</h1>
                <p>Welcome to Learnify – your ultimate study companion! Easily create, organize, and review flashcards to master any topic. Whether you're preparing for exams, learning new skills, or just exploring new ideas, we've got you covered. Ready to boost your learning? Let’s get started!</p>
            </div>
            <div className="selectButton">
                <button id="studyButton" className="btn">Start Studying</button>
                {/* <button id="cardButton" className="btn">Create Flashcard Sets</button> */}
                <Link id="cardButton" className="btn" to="/create-flashcard-set">Create Flashcard Sets</Link>
            </div>
        </div>
    );
}

export default WelcomeHome;