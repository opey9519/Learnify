import "./Footer.css"
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="Footer">
            <div className="container">
                {/* CopyRight */}
                <p className="mb-2">© 2025 Learnify. All rights reserved.</p>

                {/* Mission Statement */}
                <p className="small mb-4">
                    Learn smarter, not harder—one flashcard at a time.
                </p>

                {/* Links */}
                <div className="mb-3 mediaLinks">
                    {/* Github Link */}
                    <a
                        href="https://github.com/opey9519"
                        className="text-light mx-2 mediaLink"
                        aria-label="GitHub"
                    >
                        <i className="fab fa-github">
                            <img id="githubPhoto" src="./images/github-mark.png" alt="" />
                            GitHub
                            </i>
                    </a>
                    {/* LinkedIn Link */}
                    <a
                        href="https://linkedin.com/in/gavin-wilson-ba6b67298/"
                        className="text-light mx-2 mediaLink"
                        aria-label="LinkedIn"
                    >
                        <i className="fab fa-linkedin">
                            <img id="linkedinPhoto" src="./images/LI-In-Bug.png" alt="" />
                            LinkedIn
                        </i>
                    </a>
                </div>

                {/* Nav */}
                <div className="navLinks">
                    <a href="/about" className="text-light text-decoration-none mx-3 specLinks">
                        About
                    </a>
                    <a href="/privacy-policy" className="text-light text-decoration-none mx-3 specLinks">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" className="text-light text-decoration-none mx-3 specLinks">
                        Terms of Service
                    </a>
                    <a href="/contact" className="text-light text-decoration-none mx-3 specLinks">
                        Contact
                    </a>
                </div>

                {/* Web App Version */}
                <p className="small mt-3">Version 1.0.0</p>
            </div>
        </footer>

    );
}

export default Footer;