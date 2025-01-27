import "./HowItWorks.css"

function HowItWorks() {
    return (
        <div className="container HowItWorks">
            <h2 className="HowItWorksHeader mb-4">
                How It Works
            </h2>

            <ul className="HowItWorksList">
                <li>Create an account or log in</li>
                <li>Add flashcard sets based on topics</li>
                <li>Study flashcards or ask the AI additional questions for clarifications</li>
                <li>Additionally, ask the AI to create flashcard sets for you</li>
            </ul>

        </div>
    );
}

export default HowItWorks;