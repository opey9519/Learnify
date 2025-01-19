import "./WelcomeHome.css"

function WelcomeHome() {
    return (
        <div id="root" className="container root">
            <div className="text-primary-200">
                <h1>Welcome Home!</h1>
                <p>Welcome to Learnify – your ultimate study companion! Easily create, organize, and review flashcards to master any topic. Whether you're preparing for exams, learning new skills, or just exploring new ideas, we've got you covered. Ready to boost your learning? Let’s get started!</p>
            </div>
            <div className="selectButton">
                <button id="studyButton" className="btn">Start Studying</button>
                <button id="cardButton" className="btn">Create Flashcards</button>
            </div>
        </div>
    );
}

export default WelcomeHome;