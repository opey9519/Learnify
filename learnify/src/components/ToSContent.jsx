import "./ToSContent.css"

function ToSContent() {
    return (
        <div className="container TermsOfService">
            <h1 className="termsHeader">Terms of Service</h1>

            <section>
                <h2 className="termsSubHeader">1. Introduction</h2>
                <p>
                    Welcome to Learnify! By using our app, you agree to the terms outlined in this Terms of Service (ToS) agreement. If you do not agree with these terms, you may not use the app.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">2. User Responsibilities</h2>
                <p>
                    Users must ensure that they use Learnify responsibly and in accordance with applicable laws. You agree not to misuse the app or its features, including attempting to hack, disrupt, or exploit its services.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">3. Account Policies</h2>
                <p>
                    You must be at least 13 years old to create an account. Users are responsible for maintaining the confidentiality of their account credentials and ensuring their account activity complies with this ToS.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">4. Intellectual Property</h2>
                <p>
                    All content, design, and code associated with Learnify are the property of Learnify. Unauthorized redistribution, modification, or reproduction is prohibited.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">5. AI Features Disclaimer</h2>
                <p>
                    Learnify uses AI to assist users with studying and creating flashcard sets. While we strive for accuracy, AI-generated content may not always be correct or comprehensive. Users should verify the information provided by the AI.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">6. User Data and Flashcards</h2>
                <p>
                    Users retain ownership of their created flashcard sets. By using Learnify, you grant us permission to store and process your flashcards to improve app functionality. For more details, see our <a href="/privacy-policy">Privacy Policy</a>.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">7. Limitation of Liability</h2>
                <p>
                    Learnify is not responsible for damages resulting from app usage, interruptions, or inaccuracies in content. Users assume all risks associated with using the app.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">8. Modifications</h2>
                <p>
                    We reserve the right to update this ToS at any time. Significant changes will be communicated via email or app notifications.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">9. Governing Law</h2>
                <p>
                    This agreement is governed by the laws of U.S. Any disputes must be resolved in the courts of U.S.
                </p>
            </section>

            <section>
                <h2 className="termsSubHeader">10. Contact Us</h2>
                <p>
                    For questions about these Terms of Service, please email us at <span>MessageLearnify@gmail.com</span>.
                </p>
            </section>
        </div>

    );
}

export default ToSContent;